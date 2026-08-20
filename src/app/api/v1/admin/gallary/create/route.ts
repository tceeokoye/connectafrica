import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";
import { ALLOWED_ORIGINS } from "@/config/cors";

export const dynamic = "force-dynamic";

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
      year,
      imageBase64,
      imagesBase64,
      videoBase64,
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

    const hasImages =
      (Array.isArray(imagesBase64) && imagesBase64.length > 0) || !!imageBase64;

    if (type === "image" && !hasImages)
      return NextResponse.json(
        { success: false, message: "At least one image is required" },
        { status: 400 }
      );

    if (type === "video" && !videoBase64)
      return NextResponse.json(
        { success: false, message: "Video file is required" },
        { status: 400 }
      );

    // --- CLOUDINARY ---
    let imageUrl: string | null = null;
    let imagesList: string[] = [];
    let videoUrl: string | null = null;
    let thumbnailUrl: string | null = null;

    if (type === "image") {
      const toUpload = Array.isArray(imagesBase64) && imagesBase64.length > 0
        ? imagesBase64
        : imageBase64
        ? [imageBase64]
        : [];

      for (const imgBase64 of toUpload) {
        const upload = await cloudinary.uploader.upload(imgBase64, {
          folder: "gallery/images",
          resource_type: "image",
        });
        imagesList.push(upload.secure_url);
      }
      imageUrl = imagesList[0] || null;
    }

    if (type === "video") {
      // upload video
      const videoUpload = await cloudinary.uploader.upload(videoBase64, {
        folder: "gallery/videos",
        resource_type: "video",
      });
      videoUrl = videoUpload.secure_url;

      // upload optional thumbnail
      if (thumbnailBase64) {
        const thumbUpload = await cloudinary.uploader.upload(thumbnailBase64, {
          folder: "gallery/thumbnails",
          resource_type: "image",
        });
        thumbnailUrl = thumbUpload.secure_url;
      }
    }

    // --- DATABASE ---
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const collection = db.collection("gallery");

    // Determine creation date based on selected year
    const selectedYear = year ? String(year).trim() : String(new Date().getFullYear());
    const isCurrentYear = selectedYear === String(new Date().getFullYear());
    const createdAtDate = isCurrentYear
      ? new Date()
      : new Date(`${selectedYear}-06-15T12:00:00.000Z`);

    const media = {
      title,
      category,
      type,
      year: selectedYear,
      src: type === "image" ? imageUrl : videoUrl,
      images: type === "image" ? imagesList : undefined,
      thumbnail: thumbnailUrl,
      createdAt: createdAtDate,
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