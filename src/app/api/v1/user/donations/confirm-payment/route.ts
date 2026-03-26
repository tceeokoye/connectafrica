import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { donationReceiptTemplate } from "@/lib/emailTemplates";
import { ALLOWED_ORIGINS } from "@/config/cors";
import { getMailer } from "@/lib/mail/transport";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-03-25.dahlia" as any,
});

export async function POST(req: NextRequest) {
  try {
    /* ================= CORS ================= */
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { success: false, message: "CORS policy: Origin not allowed" },
        { status: 403 }
      );
    }

    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Reference is required" },
        { status: 400 }
      );
    }

    /* ================= Get Donation from DB ================= */
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const donations = db.collection("donations");
    const campaigns = db.collection("campaigns");

    const donation = await donations.findOne({ reference });

    if (!donation) {
      return NextResponse.json(
        { success: false, message: "Donation not found" },
        { status: 404 }
      );
    }

    // If already completed, return it
    if (donation.status === "completed") {
      console.log("✅ Donation already completed:", reference);
      return NextResponse.json({
        success: true,
        donation,
        alreadyProcessed: true,
      });
    }

    /* ================= Verify with Stripe ================= */
    // Since client can easily abuse this endpoint, we check Stripe directly
    if (!donation.stripeSessionId) {
      return NextResponse.json(
        { success: false, message: "No checkout session associated with this donation." },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(donation.stripeSessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { success: false, message: "Payment has not been completed yet." },
        { status: 400 }
      );
    }

    /* ================= Payment Confirmed - Mark as Completed ================= */
    console.log("✅ Payment successful! Updating donation to completed...");

    const amountPaid = session.amount_total ? session.amount_total / 100 : donation.amount;

    const updateDonationResult = await donations.updateOne(
      { reference },
      {
        $set: {
          status: "completed",
          completedAt: new Date(),
          amountPaid: amountPaid,
          stripeStatus: session.payment_status,
        },
      }
    );

    console.log("✅ Donation marked as completed:", {
      reference,
      amount: amountPaid,
      modified: updateDonationResult.modifiedCount,
    });

    // Get campaign and update it
    let campaign = null;
    if (donation.campaignId) {
      campaign = await campaigns.findOne({
        _id: new ObjectId(donation.campaignId),
      });

      if (campaign) {
        const newDonatedAmount = (campaign.donatedAmount || 0) + Number(amountPaid);
        const campaignStatus =
          newDonatedAmount >= campaign.amount ? "completed" : "inprogress";

        console.log("💵 Updating Campaign:", {
          title: campaign.title,
          previousAmount: campaign.donatedAmount || 0,
          newAmount: newDonatedAmount,
          newStatus: campaignStatus,
        });

        const updateResult = await campaigns.updateOne(
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

        console.log("✅ Campaign updated successfully, modified:", updateResult.modifiedCount);
      }
    }

    // Send confirmation email
    try {
      const transporter = getMailer();
      await transporter.verify();
      
      const { subject, html } = donationReceiptTemplate({
        name: donation.firstName ? `${donation.firstName} ${donation.lastName}` : (donation.name || "Friend"),
        reference: donation.reference,
        amountPaid: amountPaid,
        donationType: donation.donationType || "one-time",
        designation: campaign ? campaign.title : (donation.designation || "where-most-needed"),
      });

      await transporter.sendMail({
        from: `"Connect Africa" <support@connectwithafrica.org>`,
        to: donation.email,
        subject,
        html,
      });

      console.log("✅ Email sent successfully to " + donation.email);
    } catch (emailErr: any) {
      console.error("❌ Email sending failed:", emailErr.message);
      // Continue anyway - donation still processed
    }

    // Get updated donation
    const updatedDonation = await donations.findOne({ reference });

    console.log("✅ PAYMENT CONFIRMATION COMPLETE");
    console.log("\n");

    return NextResponse.json({
      success: true,
      donation: updatedDonation,
      paymentStatus: "SUCCESSFUL",
      message: "Payment confirmed and records updated",
    });
  } catch (err: any) {
    console.error("❌ Confirm payment error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Error confirming payment: " + err.message,
      },
      { status: 500 }
    );
  }
}
