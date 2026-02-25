import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import nodemailer from "nodemailer";
import { newsletterWelcomeTemplate } from "@/lib/emailTemplates";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Invalid verification link" },
        { status: 400 }
      );
    }

    // Connect to database
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const subscribers = db.collection("subscribers");

    // Find subscriber with this verification token
    const subscriber = await subscribers.findOne({ verificationToken: token });

    if (!subscriber) {
      return NextResponse.json(
        { success: false, message: "Verification link expired or invalid" },
        { status: 404 }
      );
    }

    if (subscriber.status === "active") {
      return NextResponse.json(
        { success: false, message: "Email already verified" },
        { status: 400 }
      );
    }

    // Update subscriber status to active and clear verification token
    await subscribers.updateOne(
      { _id: subscriber._id },
      { 
        $set: { 
          status: "active", 
          verifiedAt: new Date(),
          verificationToken: null 
        } 
      }
    );

    // Send welcome email
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const { subject, html } = newsletterWelcomeTemplate({ unsubscribeToken: subscriber.unsubscribeToken });

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: subscriber.email,
        subject,
        html,
      });
    } catch (emailErr) {
      console.error("Error sending welcome email:", emailErr);
      // Continue even if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Email verified successfully! Welcome to Connect Africa Newsletter.",
    });
  } catch (err: any) {
    console.error("Newsletter verification error:", err);
    return NextResponse.json(
      { success: false, message: "Verification failed", error: err?.message },
      { status: 500 }
    );
  }
}
