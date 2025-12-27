import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

// allowed origins for CORS
const ALLOWED_ORIGINS = ["http://localhost:3000", "https://connectafrica-fawn.vercel.app"];

export async function GET(req: Request) {
  try {
    /* ================= CORS ================= */
    const origin = req.headers.get("origin");

// Allow same-origin (origin === null) and allowed origins
if (origin && !ALLOWED_ORIGINS.includes(origin)) {
  return NextResponse.json(
    { success: false, message: "CORS policy: Origin not allowed" },
    { status: 403 }
  );
}


    const client = await clientPromise;
    const db = client.db("connect_africa");
    const blogs = db.collection("blogs");

    const data = await blogs
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Convert _id from ObjectId to string
    const serializedData = data.map((blog) => ({
      ...blog,
      _id: blog._id.toString(),
    }));

    return NextResponse.json({
      success: true,
      blogs: serializedData,
    });
  } catch (error) {
    console.error("Fetch blogs error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
