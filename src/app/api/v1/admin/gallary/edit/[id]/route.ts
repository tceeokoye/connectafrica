import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

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

export async function PUT(
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

    // --- PARAM ---
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid media ID" },
        { status: 400 }
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

    const client = await clientPromise;
    const db = client.db("connect_africa");
    const collection = db.collection("gallery");

    const existing = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Media not found" },
        { status: 404 }
      );
    }

    // --- CLOUDINARY ---
    let updatedSrc = existing.src;
    let updatedThumbnail = existing.thumbnail || null;

    if (type === "image" && imageBase64) {
      const upload = await cloudinary.uploader.upload(imageBase64, {
        folder: "gallery/images",
        resource_type: "image",
      });
      updatedSrc = upload.secure_url;
      updatedThumbnail = null;
    }

    if (type === "video") {
      if (videoUrl) updatedSrc = videoUrl;

      if (thumbnailBase64) {
        const thumbUpload = await cloudinary.uploader.upload(
          thumbnailBase64,
          {
            folder: "gallery/thumbnails",
            resource_type: "image",
          }
        );
        updatedThumbnail = thumbUpload.secure_url;
      }
    }

    // --- UPDATE ---
    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          category,
          type,
          src: updatedSrc,
          thumbnail: updatedThumbnail,
          updatedAt: new Date(),
        },
      }
    );

    const updatedMedia = await collection.findOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      success: true,
      message: "Media updated successfully",
      media: updatedMedia,
    });
  } catch (err: any) {
    console.error("Gallery update error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
