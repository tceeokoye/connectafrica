import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

// allowed origins for CORS
const ALLOWED_ORIGINS = ["http://localhost:3000", "https://cohaaf2.vercel.app"];

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    /* ================= CORS ================= */
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { success: false, message: "CORS policy: Origin not allowed" },
        { status: 403 }
      );
    }

    // ⚡ Safe param access to avoid TypeScript ParamCheck error
    const { id } = await params as { id: string };

    /* ================= AUTH ================= */
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

    /* ================= BODY ================= */
    const {
      title,
      excerpt,
      content,
      author,
      readTime,
      category,
      imageBase64,
      tags,
      featured,
    } = await req.json();

    if (!title || !excerpt || !content || !author || !readTime || !category) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (tags && (!Array.isArray(tags) || !tags.every((t) => typeof t === "string"))) {
      return NextResponse.json(
        { success: false, message: "Tags must be an array of strings" },
        { status: 400 }
      );
    }

    /* ================= DB ================= */
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const collection = db.collection("blogs");

    /* ================= IMAGE ================= */
    let image = imageBase64;
    if (imageBase64?.startsWith("data:")) {
      const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
        folder: "blogs",
        resource_type: "image",
      });
      image = uploadResponse.secure_url;
    }

    /* ================= FEATURED ================= */
    if (featured) {
      // unset all other featured blogs
      await collection.updateMany({ featured: true }, { $set: { featured: false } });
    }

    const updatedBlog = {
      title,
      excerpt,
      content,
      author,
      readTime,
      category,
      image,
      tags: tags || [],
      featured: !!featured,
      updatedAt: new Date(),
    };

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedBlog }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (err: any) {
    console.error("Blog update error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
