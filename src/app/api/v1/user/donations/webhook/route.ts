import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/db";
import { donationReceiptTemplate } from "@/lib/emailTemplates";
import nodemailer from "nodemailer";

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

  // Create HMAC-SHA512 hash
  const hash = crypto
    .createHmac("sha512", secretKey)
    .update(rawBody)
    .digest("hex");

  const isValid = signature === hash;
  if (!isValid) {
    console.error("Signature verification failed", { signature, hash });
  }
  return isValid;
}

export async function POST(req: NextRequest) {
  let rawBody = "";
  try {
    /* ================= Verify Signature ================= */
    rawBody = await req.text();
    if (!verifyMonnifySignature(req, rawBody)) {
      console.error("Invalid Monnify signature");
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(rawBody);

    /* ================= Validate Event ================= */
    if (event.eventType !== "SUCCESSFUL_TRANSACTION") {
      console.log("Ignoring event type:", event.eventType);
      return NextResponse.json({ message: "Event type ignored" });
    }

    const { paymentReference, amountPaid } = event.eventData;

    if (!paymentReference || !amountPaid) {
      return NextResponse.json(
        { success: false, message: "Missing required payment data" },
        { status: 400 }
      );
    }

    /* ================= Find & Update Donation ================= */
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const donations = db.collection("donations");

    // Find the pending donation
    const donation = await donations.findOne({
      reference: paymentReference,
      status: { $ne: "completed" }, // Only process non-completed donations
    });

    if (!donation) {
      console.log("Donation not found or already processed:", paymentReference);
      return NextResponse.json({ message: "Donation not found or already processed" });
    }

    // Security: Verify amount matches
    if (Number(amountPaid) !== Number(donation.amount)) {
      console.error("Amount mismatch for donation:", {
        expected: donation.amount,
        received: amountPaid,
      });
      return NextResponse.json(
        { success: false, message: "Amount mismatch" },
        { status: 400 }
      );
    }

    // Update donation status to completed
    const updateResult = await donations.updateOne(
      { reference: paymentReference },
      {
        $set: {
          status: "completed",
          completedAt: new Date(),
          amountPaid: Number(amountPaid),
        },
      }
    );

    if (updateResult.modifiedCount === 0) {
      console.error("Failed to update donation:", paymentReference);
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
              donatedAmount: Number(amountPaid),
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
        reference: paymentReference,
        amountPaid: Number(amountPaid),
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
      reference: paymentReference,
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

