import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import nodemailer from "nodemailer";
import { campaignNotificationTemplate } from "@/lib/emailTemplates";

export const dynamic = "force-dynamic";

// allowed origins for CORS
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

    // Check authorization (should be admin)
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { campaignTitle, campaignDescription, campaignImage, campaignId } = body;

    // Validate required fields
    if (!campaignTitle || !campaignDescription || !campaignId) {
      return NextResponse.json(
        { success: false, message: "Campaign title, description, and ID are required" },
        { status: 400 }
      );
    }

    // Connect to database
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const subscribers = db.collection("subscribers");

    // Get all active subscribers
    const activeSubscribers = await subscribers
      .find({ status: "active" })
      .toArray();

    if (activeSubscribers.length === 0) {
      return NextResponse.json(
        { success: true, message: "No active subscribers to notify", emailsSent: 0 },
        { status: 200 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const campaignLink = `${process.env.NEXT_PUBLIC_BACKEND_URL || "https://connectafrica.org"}/campaigns/${campaignId}`;
    let emailsSent = 0;
    let emailsFailed = 0;

    // Send email to each subscriber
    for (const subscriber of activeSubscribers) {
      try {
        const { subject, html } = campaignNotificationTemplate({
          campaignTitle,
          campaignDescription,
          campaignImage,
          campaignLink,
          unsubscribeToken: subscriber.unsubscribeToken,
        });

        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: subscriber.email,
          subject,
          html,
        });

        emailsSent++;
      } catch (err) {
        console.error(`Failed to send email to ${subscriber.email}:`, err);
        emailsFailed++;
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Campaign notification sent to ${emailsSent} subscribers`,
        emailsSent,
        emailsFailed,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Campaign notification error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to send campaign notification", error: err?.message },
      { status: 500 }
    );
  }
}
