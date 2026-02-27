import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ALLOWED_ORIGINS } from "@/config/cors";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json({ success: false, message: "CORS policy: Origin not allowed" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const skip = parseInt(searchParams.get("skip") || "0", 10);

    const client = await clientPromise;
    const db = client.db("connect_africa");
    const subscribers = db.collection("subscribers");

    const filter: any = {};
    if (email) filter.email = email.toLowerCase();

    const total = await subscribers.countDocuments(filter);
    const list = await subscribers.find(filter).sort({ subscribedAt: -1 }).skip(skip).limit(limit).toArray();

    return NextResponse.json({ success: true, data: list, pagination: { total, limit, skip, hasMore: skip + limit < total } });
  } catch (err: any) {
    console.error("Fetch subscribers error:", err);
    return NextResponse.json({ success: false, message: "Failed to fetch subscribers", error: err?.message }, { status: 500 });
  }
}
