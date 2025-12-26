import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";

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

    // Get token from Authorization header
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify JWT
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
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

    const {
      title,
      description,
      amount,
      startDate,
      endDate,
      imageBase64,
      category,
    } = await req.json();

    // Individual field validation
    if (!title) {
      return NextResponse.json(
        { success: false, message: "All fields are required: title is missing" },
        { status: 400 }
      );
    }
    if (!description) {
      return NextResponse.json(
        { success: false, message: "All fields are required: description is missing" },
        { status: 400 }
      );
    }
    if (!amount) {
      return NextResponse.json(
        { success: false, message: "All fields are required: amount is missing" },
        { status: 400 }
      );
    }
    if (!category || !ALLOWED_CATEGORIES.includes(category.trim())) {
      return NextResponse.json(
        { success: false, message: "Invalid category" },
        { status: 400 }
      );
    }
    if (!startDate) {
      return NextResponse.json(
        { success: false, message: "All fields are required: startDate is missing" },
        { status: 400 }
      );
    }
    if (!endDate) {
      return NextResponse.json(
        { success: false, message: "All fields are required: endDate is missing" },
        { status: 400 }
      );
    }
    if (!imageBase64) {
      return NextResponse.json(
        { success: false, message: "All fields are required: imageBase64 is missing" },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
      folder: "campaigns",
      resource_type: "image",
    });

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const collection = db.collection("campaigns");

    const campaign = {
      title,
      description,
      category,
      status: "inprogress", // default status
      amount: Number(amount), // goal amount
      donatedAmount: 0, // default donated amount
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      imageUrl: uploadResponse.secure_url,
      volunteers: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(campaign);

    // Fetch the newly created campaign including _id
    const createdCampaign = await collection.findOne({
      _id: result.insertedId,
    });

    return NextResponse.json({
      success: true,
      message: "Campaign created!",
      campaign: createdCampaign, // full payload for frontend
    });
  } catch (err: any) {
    console.error("Campaign creation error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
