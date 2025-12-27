import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";

const ALLOWED_CATEGORIES = [
  "Outreach",
  "Team",
  "Community",
  "Elderly",
  "Empowerment",
  "Children",
  "Education",
  "Healthcare",
  "Infrastructure",
  "Events",
  "Others",
];

// allowed origins for CORS
const ALLOWED_ORIGINS = ["http://localhost:3000", "https://connectafrica-fawn.vercel.app"];

export async function POST(req: NextRequest) {
  try {
    /* ================= CORS ================= */
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { success: false, message: "CORS policy: Origin not allowed" },
        { status: 403 }
      );
    }

    // --- AUTH ---
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

    // --- BODY ---
    const {
      title,
      category,
      type, // "image" | "video"
      imageBase64,
      videoUrl,
      thumbnailBase64,
    } = await req.json();

    // --- VALIDATION ---
    if (!title)
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );

    if (!category || !ALLOWED_CATEGORIES.includes(category))
      return NextResponse.json(
        { success: false, message: "Invalid category" },
        { status: 400 }
      );

    if (!type || !["image", "video"].includes(type))
      return NextResponse.json(
        { success: false, message: "Invalid media type" },
        { status: 400 }
      );

    if (type === "image" && !imageBase64)
      return NextResponse.json(
        { success: false, message: "Image file is required" },
        { status: 400 }
      );

    if (type === "video" && !videoUrl)
      return NextResponse.json(
        { success: false, message: "Video URL is required" },
        { status: 400 }
      );

    // --- CLOUDINARY ---
    let imageUrl: string | null = null;
    let thumbnailUrl: string | null = null;

    if (type === "image") {
      const upload = await cloudinary.uploader.upload(imageBase64, {
        folder: "gallery/images",
        resource_type: "image",
      });
      imageUrl = upload.secure_url;
    }

    if (type === "video" && thumbnailBase64) {
      const thumbUpload = await cloudinary.uploader.upload(thumbnailBase64, {
        folder: "gallery/thumbnails",
        resource_type: "image",
      });
      thumbnailUrl = thumbUpload.secure_url;
    }

    // --- DATABASE ---
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const collection = db.collection("gallery");

    const media = {
      title,
      category,
      type,
      src: type === "image" ? imageUrl : videoUrl,
      thumbnail: thumbnailUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(media);
    const createdMedia = await collection.findOne({
      _id: result.insertedId,
    });

    return NextResponse.json({
      success: true,
      message: "Media uploaded successfully",
      media: createdMedia,
    });
  } catch (err: any) {
    console.error("Gallery upload error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
