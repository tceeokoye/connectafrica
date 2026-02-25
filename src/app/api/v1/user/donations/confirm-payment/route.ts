import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";
import { donationReceiptTemplate } from "@/lib/emailTemplates";

import { ALLOWED_ORIGINS } from "@/config/cors";

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

    /* ================= Payment Confirmed - Mark as Completed ================= */
    console.log("✅ Payment successful! Updating donation to completed...");

    const updateDonationResult = await donations.updateOne(
      { reference },
      {
        $set: {
          status: "completed",
          completedAt: new Date(),
          amountPaid: donation.amount,
        },
      }
    );

    console.log("✅ Donation marked as completed:", {
      reference,
      amount: donation.amount,
      modified: updateDonationResult.modifiedCount,
    });

    // Get campaign and update it
    const campaign = await campaigns.findOne({
      _id: new ObjectId(donation.campaignId),
    });

    if (campaign) {
      // Use the stored amount as the confirmation
      const amountPaid = donation.amount;
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

      // Send confirmation email
      try {
        console.log("📧 Attempting to send confirmation email...");
        console.log("   To:", donation.email);
        console.log("   Gmail User:", process.env.GMAIL_USER);
        console.log("   Has Gmail Pass:", !!process.env.GMAIL_PASS);

        if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
          console.error("❌ Gmail credentials not configured");
          throw new Error("Email service not configured");
        }

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        });

        // Test connection
        await transporter.verify();
        console.log("✅ Gmail connection verified");

        const { subject, html } = donationReceiptTemplate({
          name: `${donation.firstName} ${donation.lastName}`,
          reference: donation.reference,
          amountPaid: donation.amount,
          donationType: "one-time",
          designation: campaign.title,
        });

        const mailResult = await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: donation.email,
          subject,
          html,
        });

        console.log("✅ Email sent successfully!");
        console.log("   Message ID:", mailResult.messageId);
        console.log("   Response:", mailResult.response);
      } catch (emailErr: any) {
        console.error("❌ Email sending failed:");
        console.error("   Error:", emailErr.message);
        console.error("   Code:", emailErr.code);
        console.error("   Full error:", emailErr);
        // Continue anyway - donation still processed
      }
    }

    // Get updated donation
    const updatedDonation = await donations.findOne({ reference });

    console.log("✅ PAYMENT CONFIRMATION COMPLETE");
    console.log("   Reference:", reference);
    console.log("   Amount: ₦" + donation.amount);
    console.log("   Campaign: " + campaign?.title);
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
