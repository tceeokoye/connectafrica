import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

// allowed origins for CORS
const ALLOWED_ORIGINS = ["http://localhost:3000", "https://connectafrica-fawn.vercel.app"];

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    /* ================= CORS ================= */
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { success: false, message: "CORS policy: Origin not allowed" },
        { status: 403 }
      );
    }

    // 🔐 Auth check
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid media ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("connect_africa");
    const collection = db.collection("gallery");

    // 🔍 Find media first
    const media = await collection.findOne({ _id: new ObjectId(id) });

    if (!media) {
      return NextResponse.json(
        { success: false, message: "Media not found" },
        { status: 404 }
      );
    }

    // ☁️ Delete from Cloudinary if image/video exists
    if (media.publicId) {
      await cloudinary.uploader.destroy(media.publicId, {
        resource_type: media.type === "video" ? "video" : "image",
      });
    }

    // 🗑 Delete from MongoDB
    await collection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      message: "Media deleted successfully",
    });
  } catch (err: any) {
    console.error("Delete gallery error:", err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
