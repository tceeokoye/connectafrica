import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import crypto from "crypto";
import { ObjectId } from "mongodb";

// allowed origins for CORS
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "https://connectafrica-fawn.vercel.app",
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

    const body = await req.json();

    const { campaignId, firstName, lastName, email, phone, amount } = body;

    // ------------------ Validation ------------------
    if (!campaignId || !firstName || !lastName || !email || !phone || !amount) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate amount
    if (Number(amount) <= 0) {
      return NextResponse.json(
        { success: false, message: "Amount must be greater than 0" },
        { status: 400 }
      );
    }

    if (Number(amount) < 10) {
      return NextResponse.json(
        { success: false, message: "Minimum donation amount is ₦10" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate phone (basic validation)
    if (phone.length < 10) {
      return NextResponse.json(
        { success: false, message: "Invalid phone number" },
        { status: 400 }
      );
    }

    // Validate campaignId is a valid MongoDB ObjectId
    if (!ObjectId.isValid(String(campaignId))) {
      return NextResponse.json(
        { success: false, message: "Invalid campaign ID format" },
        { status: 400 }
      );
    }

    // ------------------ Fetch Campaign ------------------
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const campaigns = db.collection("campaigns");

    const campaign = await campaigns.findOne({
      _id: new ObjectId(campaignId),
    });

    if (!campaign) {
      return NextResponse.json(
        { success: false, message: "Campaign not found" },
        { status: 404 }
      );
    }

    // Security: Check if campaign is still active
    const now = new Date();
    if (campaign.endDate && new Date(campaign.endDate) < now) {
      return NextResponse.json(
        { success: false, message: "This campaign has ended" },
        { status: 400 }
      );
    }

    // ------------------ Initialize Monnify ------------------
    const reference = `CAM_${Date.now()}_${crypto.randomUUID()}`;

    const auth = Buffer.from(
      `${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`
    ).toString("base64");

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

    const response = await fetch(
      `${process.env.MONNIFY_BASE_URL}/api/v1/merchant/transactions/init-transaction`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount),
          customerName: `${firstName} ${lastName}`,
          customerEmail: email,
          paymentReference: reference,
          paymentDescription: `Campaign Donation: ${campaign.title}`,
          currencyCode: "NGN",
          contractCode: process.env.MONNIFY_CONTRACT_CODE,
          redirectUrl: `${backendUrl}/donate/success?reference=${reference}`,
          failureRedirectUrl: `${backendUrl}/donate/failed`,
          paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],
          metadata: {
            campaignId,
            campaignTitle: campaign.title,
            donorName: `${firstName} ${lastName}`,
            phone,
          },
        }),
      }
    );

    const data = await response.json();

    if (!data.requestSuccessful) {
      return NextResponse.json(
        { success: false, message: data.responseMessage || "Payment initialization failed" },
        { status: 400 }
      );
    }

    // ------------------ Save Pending Donation ------------------
    const donations = db.collection("donations");

    try {
      const insertResult = await donations.insertOne({
        campaignId: new ObjectId(campaignId),
        reference,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        amount: Number(amount),
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log("💾 Donation saved successfully!");
      console.log("   Reference:", reference);
      console.log("   ID:", insertResult.insertedId);
      console.log("   Amount: ₦" + amount);
      console.log("   Email:", email.trim().toLowerCase());
    } catch (dbErr: any) {
      console.error("❌ Failed to save donation to database:", dbErr);
      return NextResponse.json(
        { success: false, message: "Failed to save donation record: " + dbErr.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: data.responseBody.checkoutUrl,
      reference,
    });
  } catch (err: any) {
    console.error("❌ Campaign donate init error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Payment initialization failed" },
      { status: 500 }
    );
  }
}
