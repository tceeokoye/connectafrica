import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import clientPromise from "@/lib/db";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://connectafrica-fawn.vercel.app",
];

function logError(err: any, context = "UNKNOWN") {
  console.error("========== API ERROR ==========");
  console.error("Context:", context);
  console.error("Name:", err?.name);
  console.error("Message:", err?.message);
  console.error("Stack:", err?.stack);
  console.error("Full Error:", err);
  console.error("================================");
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");

  try {
    /* ========== CORS CHECK ========== */
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      const error = new Error("CORS policy: Origin not allowed");
      logError(error, "CORS");
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 403 }
      );
    }

    /* ========== PARSE BODY ========== */
    let data;
    try {
      data = await req.json();
    } catch (err) {
      logError(err, "JSON_PARSE");
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    console.log("Contact form data:", data);

    /* ========== BASIC VALIDATION ========== */
    if (!data.name || !data.email || !data.subject || !data.message) {
      const error = new Error("Missing required fields");
      logError(error, "VALIDATION");
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 422 }
      );
    }

    /* ========== MONGODB ========== */
    let insertResult;
    try {
      const client = await clientPromise;
      const db = client.db("connect_africa");
      const collection = db.collection("Contacts");

      insertResult = await collection.insertOne({
        ...data,
        createdAt: new Date(),
      });

      console.log("Message saved to MongoDB:", insertResult.insertedId);
    } catch (err) {
      logError(err, "MONGODB");
      return NextResponse.json(
        { success: false, message: "Failed to save message" },
        { status: 500 }
      );
    }

    /* ========== EMAIL (NON-CRITICAL) ========== */
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Connect Africa" <${process.env.GMAIL_USER}>`,
        to: "tceeservices@gmail.com",
        replyTo: data.email,
        subject: `Contact Us - ${data.subject}`,
        html: `
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong> ${data.message}</p>
        `,
      });

      console.log("Email sent successfully");
    } catch (err) {
      // IMPORTANT: email failure should NOT break the request
      logError(err, "NODEMAILER");
    }

    /* ========== SUCCESS ========== */
    return NextResponse.json({
      success: true,
      message: "Message saved successfully",
    });
  } catch (err) {
    // Absolute fallback
    logError(err, "UNHANDLED");
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
