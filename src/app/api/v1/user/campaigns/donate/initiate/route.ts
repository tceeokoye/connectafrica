import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import crypto from "crypto";

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

    const body = await req.json();

    const { campaignId, firstName, lastName, email, phone, amount } = body;

    // ------------------ Validation ------------------
    if (!campaignId || !firstName || !lastName || !email || !phone || !amount) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // ------------------ Fetch Campaign ------------------
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const campaigns = db.collection("campaigns");

    const campaign = await campaigns.findOne({
      _id: new (require("mongodb").ObjectId)(campaignId),
    });

    if (!campaign) {
      return NextResponse.json(
        { success: false, message: "Campaign not found" },
        { status: 404 }
      );
    }

    // ------------------ Initialize Monnify ------------------
    const reference = `DON_${Date.now()}_${crypto.randomUUID()}`;

    const auth = Buffer.from(
      `${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`
    ).toString("base64");

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
          paymentDescription: `Donation for ${campaign.title}`,
          currencyCode: "NGN",
          contractCode: process.env.MONNIFY_CONTRACT_CODE,
          redirectUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/donate/success`,
          paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],
          metadata: {
            campaignId,
            donorName: `${firstName} ${lastName}`,
            phone,
          },
        }),
      }
    );

    const data = await response.json();

    if (!data.requestSuccessful) {
      return NextResponse.json(
        { success: false, message: data.responseMessage },
        { status: 400 }
      );
    }

    // ------------------ Save Pending Donation ------------------
    const donations = db.collection("donations");

    await donations.insertOne({
      campaignId,
      reference,
      firstName,
      lastName,
      email,
      phone,
      amount: Number(amount),
      status: "pending",
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: data.responseBody.checkoutUrl,
      reference,
    });
  } catch (err: any) {
    console.error("Donate init error:", err);
    return NextResponse.json(
      { success: false, message: "Payment initialization failed" },
      { status: 500 }
    );
  }
}
