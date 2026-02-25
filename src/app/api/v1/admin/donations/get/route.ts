import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ALLOWED_ORIGINS } from "@/config/cors";

export async function GET(req: NextRequest) {
  try {
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json({ success: false, message: "CORS policy: Origin not allowed" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const skip = parseInt(searchParams.get("skip") || "0", 10);

    const client = await clientPromise;
    const db = client.db("connect_africa");
    const donations = db.collection("donations");

    const filter: any = {};
    if (email) filter.email = email.toLowerCase();
    if (status) filter.status = status;

    const total = await donations.countDocuments(filter);
    const list = await donations.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray();

    // quick stats
    const stats = await donations.aggregate([
      { $match: { ...filter, status: "completed" } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" }, totalCount: { $sum: 1 } } }
    ]).toArray();

    return NextResponse.json({ success: true, data: list, pagination: { total, limit, skip, hasMore: skip + limit < total }, stats: stats[0] || { totalAmount: 0, totalCount: 0 } });
  } catch (err: any) {
    console.error("Fetch donations error:", err);
    return NextResponse.json({ success: false, message: "Failed to fetch donations", error: err?.message }, { status: 500 });
  }
}
