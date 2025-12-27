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

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const client = await clientPromise;
    const db = client.db("connect_africa");
    const collection = db.collection("gallery");

    const query: any = {};
    if (category && category !== "all") {
      query.category = category;
    }

    const media = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      count: media.length,
      media,
    });
  } catch (err: any) {
    console.error("Fetch gallery error:", err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
