import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import jwt from "jsonwebtoken";

const ALLOWED_ORIGINS = ["http://localhost:3000", "https://connectafrica-fawn.vercel.app"];

export async function PUT(req: NextRequest) {
  try {
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json({ success: false, message: "CORS policy: Origin not allowed" }, { status: 403 });
    }

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("connect_africa");
    const blogs = db.collection("blogs");

    await blogs.updateMany({ featured: true }, { $set: { featured: false } });

    return NextResponse.json({ success: true, message: "Unset featured blog(s)" });
  } catch (error) {
    console.error("Unset featured error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
