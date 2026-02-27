import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ALLOWED_ORIGINS } from "@/config/cors";

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest, { params } : { params: { email: string } }) {
  try {
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json({ success: false, message: "CORS policy: Origin not allowed" }, { status: 403 });
    }

    const emailParam = params.email;
    if (!emailParam) return NextResponse.json({ success: false, message: "Email required" }, { status: 400 });

    const email = decodeURIComponent(emailParam).toLowerCase();

    const client = await clientPromise;
    const db = client.db("connect_africa");
    const subscribers = db.collection("subscribers");

    const res = await subscribers.deleteOne({ email });
    if (res.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Subscriber not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Subscriber deleted" });
  } catch (err: any) {
    console.error("Delete subscriber error:", err);
    return NextResponse.json({ success: false, message: "Delete failed", error: err?.message }, { status: 500 });
  }
}
