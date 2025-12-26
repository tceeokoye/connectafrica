import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";

// allowed categories
const ALLOWED_CATEGORIES = [
  "News",
  "Events",
  "Updates",
  "Projects",
  "Team",
  "Impact",
  "Stories",
];

// slug generator
function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// allowed origins for CORS
const ALLOWED_ORIGINS = ["http://localhost:3000", "https://cohaaf2.vercel.app"];

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
      tags, // optional array
      featured, // optional boolean
    } = await req.json();

    /* ================= VALIDATION ================= */
      if (!title)
        return NextResponse.json({ success: false, message: "Title is required" }, { status: 400 });

      // enforce title/excerpt length limits
      const TITLE_MAX = 100
      const EXCERPT_MAX = 300

      if (title.length > TITLE_MAX) {
        return NextResponse.json({ success: false, message: `Title must be ${TITLE_MAX} characters or fewer` }, { status: 400 });
      }

      if (!excerpt)
        return NextResponse.json({ success: false, message: "Excerpt is required" }, { status: 400 });

      if (excerpt.length > EXCERPT_MAX) {
        return NextResponse.json({ success: false, message: `Excerpt must be ${EXCERPT_MAX} characters or fewer` }, { status: 400 });
      }

    if (!content)
      return NextResponse.json({ success: false, message: "Content is required" }, { status: 400 });

    if (!imageBase64)
      return NextResponse.json({ success: false, message: "Image is required" }, { status: 400 });

    if (!category || !ALLOWED_CATEGORIES.includes(category))
      return NextResponse.json(
        {
          success: false,
          message: `Invalid category. Allowed: ${ALLOWED_CATEGORIES.join(", ")}`,
        },
        { status: 400 }
      );

    if (tags && (!Array.isArray(tags) || !tags.every((t) => typeof t === "string"))) {
      return NextResponse.json(
        { success: false, message: "Tags must be an array of strings" },
        { status: 400 }
      );
    }

    /* ================= IMAGE UPLOAD ================= */
    const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
      folder: "blogs",
      resource_type: "image",
    });

    /* ================= DB ================= */
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const blogs = db.collection("blogs");

    const slug = generateSlug(title);

    // prevent duplicate slugs
    const existing = await blogs.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Blog with same title already exists" },
        { status: 409 }
      );
    }

    // if featured is true, unset any existing featured blog
    if (featured) {
      await blogs.updateMany({ featured: true }, { $set: { featured: false } });
    }

    const blog = {
      slug,
      title,
      excerpt,
      content,
      image: uploadResponse.secure_url,
      author: author || "Admin",
      readTime: readTime || "3 min read",
      category,
      tags: tags || [],
      featured: !!featured,
      date: new Date().toDateString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await blogs.insertOne(blog);
    const createdBlog = await blogs.findOne({ _id: result.insertedId });

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      blog: createdBlog,
    });
  } catch (error) {
    console.error("Blog creation error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
