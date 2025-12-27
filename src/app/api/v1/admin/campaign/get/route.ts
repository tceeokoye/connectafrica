import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";

// allowed origins for CORS
const ALLOWED_ORIGINS = ["http://localhost:3000", "https://connectafrica-fawn.vercel.app"];

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

    const client = await clientPromise;
    const db = client.db("connect_africa");
    const collection = db.collection("campaigns");

    // Fetch query params if needed, e.g., ?status=active
    const url = new URL(req.url);
    const status = url.searchParams.get("status"); // "active" for users

    let query = {};

    if (status === "active") {
      const now = new Date();
      query = { startDate: { $lte: now }, endDate: { $gte: now } };
    }

    const campaigns = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, campaigns });
  } catch (err: any) {
    console.error("Fetching campaigns error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
