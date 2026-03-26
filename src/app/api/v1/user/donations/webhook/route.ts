import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { donationReceiptTemplate } from "@/lib/emailTemplates";
import { getMailer } from "@/lib/mail/transport";
import Stripe from "stripe";

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, stripe-signature",
    },
  });
}

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-03-25.dahlia" as any,
});

export async function POST(req: NextRequest) {
  let event: Stripe.Event;
  
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      console.error("Missing Stripe signature");
      return NextResponse.json(
        { success: false, message: "Missing signature" },
        { status: 400 }
      );
    }

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        (process.env.STRIPE_WEBHOOK_SECRET_DONATION || process.env.STRIPE_WEBHOOK_SECRET) as string
      );
    } catch (err: any) {
      console.error("Stripe webhook verification error:", err.message);
      return NextResponse.json(
        { success: false, message: "Webhook signature verification failed" },
        { status: 400 }
      );
    }

    if (event.type !== "checkout.session.completed") {
      console.log("Ignoring event type:", event.type);
      return NextResponse.json({ message: "Event type ignored" });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    
    if (!session || !session.id) {
      return NextResponse.json(
        { success: false, message: "Missing session data" },
        { status: 400 }
      );
    }

    /* ================= Find & Update Donation ================= */
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const donations = db.collection("donations");

    // Find the pending donation by Stripe Session ID
    const donation = await donations.findOne({
      stripeSessionId: session.id,
      status: { $ne: "completed" },
    });

    if (!donation) {
      console.log("Donation not found or already processed:", session.id);
      return NextResponse.json({ message: "Donation not found or already processed" });
    }

    // Get the payout amount from the session (in cents, converting back to dollars/standard unit)
    const amount = session.amount_total ? session.amount_total / 100 : donation.amount;

    // Update donation status to completed
    const updateResult = await donations.updateOne(
      { stripeSessionId: session.id },
      {
        $set: {
          status: "completed",
          completedAt: new Date(),
          amountPaid: Number(amount),
          stripeStatus: session.payment_status,
        },
      }
    );

    if (updateResult.modifiedCount === 0) {
      console.error("Failed to update donation:", session.id);
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
      const transporter = getMailer()

      const { subject, html } = donationReceiptTemplate({
        name: donation.firstName
          ? `${donation.firstName} ${donation.lastName}`
          : donation.name || "Friend",
        reference: donation.reference || session.id,
        amountPaid: Number(amount),
        donationType: donation.donationType || "one-time",
        designation: donation.designation || "where-most-needed",
      });

      await transporter.sendMail({
        from: `"Connect Africa" <support@connectwithafrica.org>`,
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
      reference: session.id,
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
