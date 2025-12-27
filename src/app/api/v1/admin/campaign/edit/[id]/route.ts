import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

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

    const { id } = await params;

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const ALLOWED_CATEGORIES = [
      "Education",
      "Community",
      "Elderly",
      "Empowerment",
      "Children",
      "Healthcare",
      "Infrastructure",
      "Events",
      "Others",
      "Food",
    ];

    // Verify JWT
    jwt.verify(token, process.env.JWT_SECRET!);

    const {
      title,
      description,
      amount,
      startDate,
      endDate,
      imageBase64,
      category,
    } = await req.json();

    if (!title || !description || !amount || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!category || !ALLOWED_CATEGORIES.includes(category.trim())) {
      return NextResponse.json(
        { success: false, message: "Invalid category" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("connect_africa");
    const collection = db.collection("campaigns");

    // Upload image if it's a new base64 string
    let imageUrl = imageBase64;
    if (imageBase64.startsWith("data:")) {
      const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
        folder: "campaigns",
        resource_type: "image",
      });
      imageUrl = uploadResponse.secure_url;
    }

    const updatedCampaign = {
      title,
      description,
      category,
      amount: Number(amount),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      imageUrl,
      updatedAt: new Date(),
    };

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedCampaign }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Campaign not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Campaign updated!",
      campaign: updatedCampaign,
    });
  } catch (err: any) {
    console.error("Campaign update error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
