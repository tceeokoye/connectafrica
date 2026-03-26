import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { donationReceiptTemplate } from "@/lib/emailTemplates";
import { getMailer } from "@/lib/mail/transport";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-03-25.dahlia" as any,
});

export async function POST(req: NextRequest) {
  let event: Stripe.Event;

  try {
    console.log("\n🔔 STRIPE WEBHOOK RECEIVED");
    
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
        (process.env.STRIPE_WEBHOOK_SECRET_CAMPAIGN || process.env.STRIPE_WEBHOOK_SECRET) as string
      );
    } catch (err: any) {
      console.error("❌ Signature verification failed - rejecting webhook:", err.message);
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 401 }
      );
    }

    console.log("📨 Event Type:", event.type);

    /* ================= Validate Event ================= */
    if (event.type !== "checkout.session.completed") {
      console.log("⏭️ Ignoring event type:", event.type);
      return NextResponse.json({ message: "Event type ignored" });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    if (!session || !session.id) {
      console.error("❌ Missing session data");
      return NextResponse.json(
        { success: false, message: "Missing session data" },
        { status: 400 }
      );
    }

    console.log("💳 Stripe Session ID:", session.id);

    /* ================= Find & Update Donation ================= */
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const donations = db.collection("donations");
    const campaigns = db.collection("campaigns");

    // Find the pending donation
    const donation = await donations.findOne({
      stripeSessionId: session.id,
      status: { $ne: "completed" },
    });

    console.log("🔍 Donation lookup result:", donation ? "✅ Found" : "❌ Not found");
    
    if (!donation) {
      console.error("❌ Donation not found or already processed. Session ID:", session.id);
      return NextResponse.json({
        success: true,
        message: "Donation not found but webhook processed",
      });
    }

    const amountPaid = session.amount_total ? session.amount_total / 100 : donation.amount;

    console.log("📋 Donation Details:", {
      stripeSessionId: donation.stripeSessionId,
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
      { stripeSessionId: session.id },
      {
        $set: {
          status: "completed",
          completedAt: new Date(),
          amountPaid: Number(amountPaid),
          stripeStatus: session.payment_status,
        },
      }
    );

    console.log("✅ Donation updated:", {
      modifiedCount: updateDonationResult.modifiedCount,
      matchedCount: updateDonationResult.matchedCount,
    });

    if (updateDonationResult.modifiedCount === 0) {
      console.error("❌ Failed to update campaign donation:", session.id);
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
      
      const transporter = getMailer();

      const { subject, html } = donationReceiptTemplate({
        name: donation.firstName
          ? `${donation.firstName} ${donation.lastName}`
          : "Friend",
        reference: donation.reference || session.id,
        amountPaid: Number(amountPaid),
        donationType: "one-time",
        designation: campaign.title,
      });

      await transporter.sendMail({
         from: `"Connect Africa" <support@connectwithafrica.org>`,
        to: donation.email,
        subject,
        html,
      });

      console.log("✅ Confirmation email sent successfully to:", donation.email);
    } catch (emailErr) {
      console.error("⚠️ Warning: Failed to send email:", emailErr);
    }

    console.log("\n✅ WEBHOOK PROCESSING COMPLETE");
    console.log("   Session ID:", session.id);
    console.log("   Amount: $" + amountPaid);
    console.log("   Campaign:", campaign.title);
    console.log("   New Total: $" + newDonatedAmount);
    console.log("\n");

    return NextResponse.json({
      success: true,
      message: "Campaign donation processed successfully",
      reference: session.id,
    });
  } catch (err: any) {
    console.error("\n❌ WEBHOOK ERROR:", err.message);
    console.error("Stack:", err.stack);
    return NextResponse.json(
      {
        success: false,
        message: "Webhook processing failed",
      },
      { status: 500 }
    );
  }
}
