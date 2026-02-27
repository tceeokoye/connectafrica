import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { donationReceiptTemplate } from "@/lib/emailTemplates";
import nodemailer from "nodemailer";

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export const dynamic = "force-dynamic";

// Verify PayPal webhook signature
async function verifyPayPalWebhook(
  req: NextRequest,
  rawBody: string
): Promise<boolean> {
  try {
    const transmissionId = req.headers.get("paypal-transmission-id");
    const transmissionTime = req.headers.get("paypal-transmission-time");
    const certUrl = req.headers.get("paypal-cert-url");
    const transmissionSig = req.headers.get("paypal-transmission-sig");
    const webhookId = process.env.PAYPAL_WEBHOOK_ID; 

    if (!transmissionId || !transmissionTime || !certUrl || !transmissionSig || !webhookId) {
      console.error("Missing PayPal webhook headers");
      return false;
    }

    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString("base64");

    const tokenResponse = await fetch(
      `${process.env.PAYPAL_API_URL}/v1/oauth2/token`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      }
    );

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Verify webhook with PayPal
    const verifyResponse = await fetch(
      `${process.env.PAYPAL_API_URL}/v1/notifications/verify-webhook-signature`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transmission_id: transmissionId,
          transmission_time: transmissionTime,
          cert_url: certUrl,
          auth_algo: "SHA256withRSA",
          transmission_sig: transmissionSig,
          webhook_id: webhookId,
          webhook_event: JSON.parse(rawBody),
        }),
      }
    );

    const verifyData = await verifyResponse.json();
    return verifyData.verification_status === "SUCCESS";
  } catch (error) {
    console.error("PayPal webhook verification error:", error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  let rawBody = "";
  try {
    /* ================= Verify Signature ================= */
    rawBody = await req.text();
    const isValid = await verifyPayPalWebhook(req, rawBody);

    if (!isValid) {
      console.error("Invalid PayPal webhook signature");
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(rawBody);

    /* ================= Validate Event ================= */
    // PayPal sends "CHECKOUT.ORDER.COMPLETED" event
    if (event.event_type !== "CHECKOUT.ORDER.COMPLETED") {
      console.log("Ignoring event type:", event.event_type);
      return NextResponse.json({ message: "Event type ignored" });
    }

    const order = event.resource;
    if (!order || !order.id) {
      return NextResponse.json(
        { success: false, message: "Missing order data" },
        { status: 400 }
      );
    }

    /* ================= Find & Update Donation ================= */
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const donations = db.collection("donations");

    // Find the pending donation by PayPal Order ID
    const donation = await donations.findOne({
      paypalOrderId: order.id,
      status: { $ne: "completed" },
    });

    if (!donation) {
      console.log("Donation not found or already processed:", order.id);
      return NextResponse.json({ message: "Donation not found or already processed" });
    }

    // Get the payout amount from the order
    const amount = order.purchase_units?.[0]?.amount?.value || donation.amount;

    // Update donation status to completed
    const updateResult = await donations.updateOne(
      { paypalOrderId: order.id },
      {
        $set: {
          status: "completed",
          completedAt: new Date(),
          amountPaid: Number(amount),
          paypalStatus: order.status,
        },
      }
    );

    if (updateResult.modifiedCount === 0) {
      console.error("Failed to update donation:", order.id);
      return NextResponse.json(
        { success: false, message: "Failed to update donation" },
        { status: 500 }
      );
    }

    /* ================= Update Campaign Amount ================= */
    if (donation.campaignId) {
      try {
        const campaigns = db.collection("campaigns");
        const { ObjectId } = require("mongodb");

        await campaigns.updateOne(
          { _id: new ObjectId(donation.campaignId) },
          {
            $inc: {
              donatedAmount: Number(amount),
              volunteers: 1, // Increment supporter count
            },
          }
        );
      } catch (campaignErr) {
        console.error("Error updating campaign:", campaignErr);
        // Continue even if campaign update fails
      }
    }

    /* ================= Send Confirmation Email ================= */
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const { subject, html } = donationReceiptTemplate({
        name: donation.firstName
          ? `${donation.firstName} ${donation.lastName}`
          : donation.name || "Friend",
        reference: order.id,
        amountPaid: Number(amount),
        donationType: donation.donationType || "one-time",
        designation: donation.designation || "where-most-needed",
      });

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: donation.email,
        subject,
        html,
      });

      console.log("Donation receipt email sent to:", donation.email);
    } catch (emailErr) {
      console.error("Error sending donation receipt email:", emailErr);
      // Continue even if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Donation processed successfully",
      reference: order.id,
    });
  } catch (err: any) {
    console.error("Donation webhook error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Webhook processing failed",
        error: err?.message,
      },
      { status: 500 }
    );
  }
}

