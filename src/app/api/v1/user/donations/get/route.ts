import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";

// allowed origins for CORS
const ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "https://connectafrica-fawn.vercel.app"];

export async function GET(req: NextRequest) {
  try {
    /* ================= CORS ================= */
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { success: false, message: "CORS policy: Origin not allowed" },
        { status: 403 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const skip = parseInt(searchParams.get("skip") || "0", 10);

    // Connect to database
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const donations = db.collection("donations");

    // Build filter
    let filter: any = {};
    if (email) filter.email = email;
    if (status) filter.status = status;

    // Get total count
    const total = await donations.countDocuments(filter);

    // Fetch donations with pagination
    const donationsList = await donations
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .toArray();

    // Calculate summary stats
    const stats = await donations
      .aggregate([
        { $match: { ...filter, status: "completed" } },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
            totalCount: { $sum: 1 },
          },
        },
      ])
      .toArray();

    return NextResponse.json(
      {
        success: true,
        data: donationsList,
        pagination: {
          total,
          limit,
          skip,
          hasMore: skip + limit < total,
        },
        stats: stats[0] || { totalAmount: 0, totalCount: 0 },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Fetch donations error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch donations", error: err?.message },
      { status: 500 }
    );
  }
}
