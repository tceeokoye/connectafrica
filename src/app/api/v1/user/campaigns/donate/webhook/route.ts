import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";
import { donationReceiptTemplate } from "@/lib/emailTemplates";

// Security: Webhook signature verification
function verifyMonnifySignature(req: NextRequest, rawBody: string): boolean {
  const signature = req.headers.get("monnify-signature");
  if (!signature) {
    console.error("No signature header found");
    return false;
  }

  const secretKey = process.env.MONNIFY_SECRET_KEY;
  if (!secretKey) {
    console.error("MONNIFY_SECRET_KEY not configured");
    return false;
  }

  const hash = crypto
    .createHmac("sha512", secretKey)
    .update(rawBody)
    .digest("hex");

  const isValid = signature === hash;
  if (!isValid) {
    console.error("Signature verification failed");
  }
  return isValid;
}

export async function POST(req: NextRequest) {
  let rawBody = "";
  try {
    /* ================= Log Webhook Received ================= */
    console.log("\n🔔 WEBHOOK RECEIVED");
    console.log("Headers:", Object.fromEntries(req.headers));
    
    /* ================= Verify Signature ================= */
    rawBody = await req.text();
    console.log("Raw Body:", rawBody.substring(0, 200), "...");
    
    const isSignatureValid = verifyMonnifySignature(req, rawBody);
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
    console.log("📨 Event Type:", event.eventType);
    console.log("📨 Event Data:", event.eventData);

    /* ================= Validate Event ================= */
    if (event.eventType !== "SUCCESSFUL_TRANSACTION") {
      console.log("⏭️ Ignoring event type:", event.eventType);
      return NextResponse.json({ message: "Event type ignored" });
    }

    const { paymentReference, amountPaid } = event.eventData;

    if (!paymentReference || !amountPaid) {
      console.error("❌ Missing payment data");
      return NextResponse.json(
        { success: false, message: "Missing required payment data" },
        { status: 400 }
      );
    }

    console.log("💳 Payment Reference:", paymentReference);
    console.log("💰 Amount Paid:", amountPaid);

    /* ================= Find & Update Donation ================= */
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const donations = db.collection("donations");
    const campaigns = db.collection("campaigns");

    // Find the pending donation
    const donation = await donations.findOne({
      reference: paymentReference,
      status: { $ne: "completed" },
    });

    console.log("🔍 Donation lookup result:", donation ? "✅ Found" : "❌ Not found");
    
    if (!donation) {
      console.error("❌ Donation not found or already processed. Reference:", paymentReference);
      // Don't stop processing, return success so Monnify doesn't retry
      return NextResponse.json({
        success: true,
        message: "Donation not found but webhook processed",
      });
    }

    console.log("📋 Donation Details:", {
      reference: donation.reference,
      status: donation.status,
      amount: donation.amount,
      campaignId: donation.campaignId,
    });

    // Security: Verify amount matches
    if (Number(amountPaid) !== Number(donation.amount)) {
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
      { reference: paymentReference },
      {
        $set: {
          status: "completed",
          completedAt: new Date(),
          amountPaid: Number(amountPaid),
        },
      }
    );

    console.log("✅ Donation updated:", {
      modifiedCount: updateDonationResult.modifiedCount,
      matchedCount: updateDonationResult.matchedCount,
    });

    if (updateDonationResult.modifiedCount === 0) {
      console.error("❌ Failed to update campaign donation:", paymentReference);
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
        reference: paymentReference,
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
    console.log("   Reference:", paymentReference);
    console.log("   Amount: ₦" + amountPaid);
    console.log("   Campaign:", campaign.title);
    console.log("   New Total: ₦" + newDonatedAmount);
    console.log("\n");

    return NextResponse.json({
      success: true,
      message: "Campaign donation processed successfully",
      reference: paymentReference,
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

