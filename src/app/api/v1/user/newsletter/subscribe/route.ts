import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import nodemailer from "nodemailer";
import { newsletterConfirmationTemplate } from "@/lib/emailTemplates";

// allowed origins for CORS
const ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "https://connectafrica-fawn.vercel.app"];

export async function POST(req: NextRequest) {
  try {
    
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { success: false, message: "CORS policy: Origin not allowed" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { email } = body;

    // ------------------ Validation ------------------
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid email address is required" },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

   
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const subscribers = db.collection("subscribers");

   
    const existing = await subscribers.findOne({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json(
        { success: true, message: "You're already subscribed to our newsletter" },
        { status: 200 }
      );
    }

    // Insert new subscriber with pending status
    const verificationToken = Buffer.from(email + Date.now()).toString("base64");
    await subscribers.insertOne({
      email: normalizedEmail,
      subscribedAt: new Date(),
      status: "pending",
      verificationToken: verificationToken,
      unsubscribeToken: Buffer.from(email).toString("base64"),
    });

    // Send confirmation email using template
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const { subject, html } = newsletterConfirmationTemplate({ verificationToken: verificationToken });

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: normalizedEmail,
        subject,
        html,
      });
    } catch (emailErr) {
      console.error("Error sending confirmation email:", emailErr);
      // Continue even if email fails - subscription is still created
    }

    return NextResponse.json(
      { success: true, message: "Thank you for subscribing! Check your email to confirm your subscription." },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Newsletter subscription error:", err);
    return NextResponse.json(
      { success: false, message: "Subscription failed", error: err?.message },
      { status: 500 }
    );
  }
}
