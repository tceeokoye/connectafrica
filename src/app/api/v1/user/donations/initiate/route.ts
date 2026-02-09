import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import crypto from "crypto";

// allowed origins for CORS
const ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "https://connectafrica-fawn.vercel.app"];

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

    const { name, email, phone, amount, donationType = "one-time", designation = "where-most-needed" } = body;

    // ------------------ Validation ------------------
    if (!name || !email || !amount) {
      return NextResponse.json(
        { success: false, message: "Name, email, and amount are required" },
        { status: 400 }
      );
    }

    if (Number(amount) <= 0) {
      return NextResponse.json(
        { success: false, message: "Amount must be greater than 0" },
        { status: 400 }
      );
    }

    // ------------------ Initialize Monnify ------------------
    const reference = `GEN_DON_${Date.now()}_${crypto.randomUUID()}`;

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
          customerName: name,
          customerEmail: email,
          paymentReference: reference,
          paymentDescription: `${donationType} donation ${designation !== "where-most-needed" ? `for ${designation}` : ""}`,
          currencyCode: "NGN",
          contractCode: process.env.MONNIFY_CONTRACT_CODE,
          redirectUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/donate/success`,
          paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],
          metadata: {
            donorName: name,
            phone: phone || "N/A",
            donationType,
            designation,
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
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const donations = db.collection("donations");

    await donations.insertOne({
      name,
      email,
      phone: phone || null,
      amount: Number(amount),
      donationType,
      designation,
      reference,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: data.responseBody?.checkoutUrl || data.responseBody,
      reference,
      message: "Donation initiated successfully",
    });
  } catch (err: any) {
    console.error("General donation init error:", err);
    return NextResponse.json(
      { success: false, message: "Payment initialization failed", error: err?.message },
      { status: 500 }
    );
  }
}
