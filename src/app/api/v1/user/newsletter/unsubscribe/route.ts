import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";

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
        { success: false, message: "Invalid unsubscribe link" },
        { status: 400 }
      );
    }

    // Decode token to get email
    let email = "";
    try {
      email = Buffer.from(token, "base64").toString();
    } catch (e) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 400 }
      );
    }

    // Connect to database
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const subscribers = db.collection("subscribers");

    // Find and update subscriber status
    const result = await subscribers.updateOne(
      { email: email.toLowerCase().trim() },
      { $set: { status: "unsubscribed", unsubscribedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Email not found in newsletter" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "You have been unsubscribed from our newsletter",
    });
  } catch (err: any) {
    console.error("Newsletter unsubscribe error:", err);
    return NextResponse.json(
      { success: false, message: "Unsubscribe failed", error: err?.message },
      { status: 500 }
    );
  }
}
