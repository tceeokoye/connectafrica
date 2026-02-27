import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

import { ALLOWED_ORIGINS } from "@/config/cors";

// Security: Rate limiting map (in-memory, would use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

export async function GET(req: NextRequest) {
  try {
    /* ================= CORS & Security ================= */
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { success: false, message: "CORS policy: Origin not allowed" },
        { status: 403 }
      );
    }

    // Rate limiting
    const ip = req.headers.get("x-forwarder-for") || req.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip, 20, 60000)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    /* ================= Validate Input ================= */
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Reference is required" },
        { status: 400 }
      );
    }

    // Security: Validate reference format (more lenient)
    if (typeof reference !== "string" || reference.length < 10) {
      return NextResponse.json(
        { success: false, message: "Invalid reference format" },
        { status: 400 }
      );
    }

    /* ================= Fetch Donation ================= */
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const donations = db.collection("donations");

    console.log("🔍 Verifying donation with reference:", reference);

    const donation = await donations.findOne({
      reference: reference,
    });

    if (!donation) {
      console.error("❌ Donation not found with reference:", reference);
      
      // Log all donations for debugging
      const allDonations = await donations.find({}).limit(5).toArray();
      console.log("Recent donations in DB:", allDonations.map(d => ({ reference: d.reference, status: d.status })));
      
      return NextResponse.json(
        { success: false, message: "Donation not found" },
        { status: 404 }
      );
    }

    console.log("✅ Donation found:", { reference: donation.reference, status: donation.status });

    /* ================= Security: Verify Donation Age ================= */
    // Only return donations created within the last 2 hours
    const createdAt = new Date(donation.createdAt).getTime();
    const now = Date.now();
    const twoHours = 2 * 60 * 60 * 1000;

    if (now - createdAt > twoHours) {
      return NextResponse.json(
        { success: false, message: "Donation reference expired" },
        { status: 400 }
      );
    }

    /* ================= Return Safe Data ================= */
    // Only return necessary fields, exclude sensitive data
    // Note: Status can be "pending" (awaiting webhook confirmation) or "completed" (webhook processed)
    const safeData = {
      firstName: donation.firstName,
      lastName: donation.lastName,
      email: donation.email,
      amount: donation.amount,
      status: donation.status || "pending",
      reference: donation.reference,
      createdAt: donation.createdAt,
    };

    console.log("📊 Returning donation data:", safeData);

    return NextResponse.json({
      success: true,
      donation: safeData,
    });
  } catch (err: any) {
    console.error("Verify donation error:", err);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
