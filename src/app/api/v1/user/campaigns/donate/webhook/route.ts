import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";
import { donationReceiptTemplate } from "@/lib/emailTemplates";

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

    // Get PayPal access token to verify
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
    /* ================= Log Webhook Received ================= */
    console.log("\n🔔 PAYPAL WEBHOOK RECEIVED");
    
    /* ================= Verify Signature ================= */
    rawBody = await req.text();
    
    const isSignatureValid = await verifyPayPalWebhook(req, rawBody);
    console.log("Signature Valid:", isSignatureValid);
    
    // For testing in sandbox mode, allow unsigned requests
    const isSandbox = process.env.NODE_ENV === "development";
    if (!isSignatureValid && !isSandbox) {
      console.error("❌ Signature verification failed - rejecting webhook");
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(rawBody);
    console.log("📨 Event Type:", event.event_type);

    /* ================= Validate Event ================= */
    if (event.event_type !== "CHECKOUT.ORDER.COMPLETED") {
      console.log("⏭️ Ignoring event type:", event.event_type);
      return NextResponse.json({ message: "Event type ignored" });
    }

    const order = event.resource;
    if (!order || !order.id) {
      console.error("❌ Missing order data");
      return NextResponse.json(
        { success: false, message: "Missing order data" },
        { status: 400 }
      );
    }

    console.log("💳 PayPal Order ID:", order.id);

    /* ================= Find & Update Donation ================= */
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const donations = db.collection("donations");
    const campaigns = db.collection("campaigns");

    // Find the pending donation
    const donation = await donations.findOne({
      paypalOrderId: order.id,
      status: { $ne: "completed" },
    });

    console.log("🔍 Donation lookup result:", donation ? "✅ Found" : "❌ Not found");
    
    if (!donation) {
      console.error("❌ Donation not found or already processed. Order ID:", order.id);
      // Don't stop processing, return success so PayPal doesn't retry
      return NextResponse.json({
        success: true,
        message: "Donation not found but webhook processed",
      });
    }

    const amountPaid = order.purchase_units?.[0]?.amount?.value || donation.amount;

    console.log("📋 Donation Details:", {
      paypalOrderId: donation.paypalOrderId,
      status: donation.status,
      amount: donation.amount,
      campaignId: donation.campaignId,
    });

    // Security: Verify amount matches (with small tolerance for currency conversion)
    if (Math.abs(Number(amountPaid) - Number(donation.amount)) > 0.01) {
      console.error("❌ Amount mismatch:", {
        expected: donation.amount,
        received: amountPaid,
      });
      return NextResponse.json(
        { success: false, message: "Amount mismatch" },
        { status: 400 }
      );
    }

    // Verify campaign exists
    if (!donation.campaignId) {
      console.error("❌ Invalid campaign ID in donation");
      return NextResponse.json(
        { success: false, message: "Invalid campaign ID" },
        { status: 400 }
      );
    }

    const campaign = await campaigns.findOne({
      _id: new ObjectId(donation.campaignId),
    });

    console.log("🎯 Campaign lookup:", campaign ? `✅ Found: ${campaign.title}` : "❌ Not found");

    if (!campaign) {
      return NextResponse.json(
        { success: false, message: "Campaign not found" },
        { status: 404 }
      );
    }

    /* ================= Update Donation ================= */
    console.log("🔄 Updating donation status to completed...");
    
    const updateDonationResult = await donations.updateOne(
      { paypalOrderId: order.id },
      {
        $set: {
          status: "completed",
          completedAt: new Date(),
          amountPaid: Number(amountPaid),
          paypalStatus: order.status,
        },
      }
    );

    console.log("✅ Donation updated:", {
      modifiedCount: updateDonationResult.modifiedCount,
      matchedCount: updateDonationResult.matchedCount,
    });

    if (updateDonationResult.modifiedCount === 0) {
      console.error("❌ Failed to update campaign donation:", order.id);
      return NextResponse.json(
        { success: false, message: "Failed to update donation" },
        { status: 500 }
      );
    }

    /* ================= Update Campaign ================= */
    const newDonatedAmount = (campaign.donatedAmount || 0) + Number(amountPaid);
    const campaignStatus =
      newDonatedAmount >= campaign.amount ? "completed" : "inprogress";

    console.log("💵 Campaign Update:", {
      previousDonatedAmount: campaign.donatedAmount || 0,
      newDonation: Number(amountPaid),
      totalNow: newDonatedAmount,
      targetAmount: campaign.amount,
      newStatus: campaignStatus,
    });

    const updateCampaignResult = await campaigns.updateOne(
      { _id: campaign._id },
      {
        $set: {
          donatedAmount: newDonatedAmount,
          status: campaignStatus,
          updatedAt: new Date(),
        },
        $inc: { volunteers: 1 },
      }
    );

    console.log("✅ Campaign updated:", {
      modifiedCount: updateCampaignResult.modifiedCount,
      donatedAmount: newDonatedAmount,
    });


    /* ================= Send Confirmation Email ================= */
    try {
      console.log("📧 Sending confirmation email to:", donation.email);
      
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
          : "Friend",
        reference: donation.paypalOrderId || order.id,
        amountPaid: Number(amountPaid),
        donationType: "one-time",
        designation: campaign.title,
      });

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: donation.email,
        subject,
        html,
      });

      console.log("✅ Confirmation email sent successfully to:", donation.email);
    } catch (emailErr) {
      console.error("⚠️ Warning: Failed to send email:", emailErr);
      // Continue even if email fails - donor still received donation
    }

    console.log("\n✅ WEBHOOK PROCESSING COMPLETE");
    console.log("   Order ID:", order.id);
    console.log("   Amount: $" + amountPaid);
    console.log("   Campaign:", campaign.title);
    console.log("   New Total: $" + newDonatedAmount);
    console.log("\n");

    return NextResponse.json({
      success: true,
      message: "Campaign donation processed successfully",
      reference: order.id,
    });
  } catch (err: any) {
    console.error("\n❌ WEBHOOK ERROR:", err.message);
    console.error("Stack:", err.stack);
    return NextResponse.json(
      {
        success: true,
        message: "Webhook received",
      },
      { status: 200 }
    );
  }
}


