import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";


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

    // Get token from Authorization header
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
      );}

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
      "Emergency",
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
    if (!title) return NextResponse.json({ success: false, message: "Title is required" }, { status: 400 });
    if (!description) return NextResponse.json({ success: false, message: "Description is required" }, { status: 400 });
    if (!amount) return NextResponse.json({ success: false, message: "Amount is required" }, { status: 400 });
    if (!category || !ALLOWED_CATEGORIES.includes(category.trim())) {
      return NextResponse.json({ success: false, message: "Invalid category" }, { status: 400 });
    }
    if (!startDate) return NextResponse.json({ success: false, message: "Start date is required" }, { status: 400 });
    if (!endDate) return NextResponse.json({ success: false, message: "End date is required" }, { status: 400 });
    if (!imageBase64) return NextResponse.json({ success: false, message: "Image is required" }, { status: 400 });

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
      folder: "campaigns",
      resource_type: "image",
    });

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const collection = db.collection("campaigns");

    if (category === "Emergency") {
      
      await collection.updateMany(
        { category: "Emergency", status: "inprogress" },
        { $set: { status: "inactive" } }
      );
    } 

    const campaign = {
      title,
      description,
      category,
      priority: category === "Emergency",
      status: "inprogress",
      amount: Number(amount),
      donatedAmount: 0,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      imageUrl: uploadResponse.secure_url,
      volunteers: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(campaign);

    const createdCampaign = await collection.findOne({ _id: result.insertedId });

    return NextResponse.json({
      success: true,
      message: "Campaign created!",
      campaign: createdCampaign,
    });
  } catch (err: any) {
    console.error("Campaign creation error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
