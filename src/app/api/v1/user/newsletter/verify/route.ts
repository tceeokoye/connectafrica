import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import nodemailer from "nodemailer";
import { newsletterWelcomeTemplate } from "@/lib/emailTemplates";
import { getMailer } from "@/lib/mail/transport";

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export const dynamic = "force-dynamic";

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
      const transporter =  getMailer()

      const { subject, html } = newsletterWelcomeTemplate({ unsubscribeToken: subscriber.unsubscribeToken });

     await transporter.sendMail({
        from: `"Connect with Africa" <support@connectwithafrica.org>`,
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
      message: "Email verified successfully! Welcome to Connect with Africa Newsletter.",
    });
  } catch (err: any) {
    console.error("Newsletter verification error:", err);
    return NextResponse.json(
      { success: false, message: "Verification failed", error: err?.message },
      { status: 500 }
    );
  }
}
