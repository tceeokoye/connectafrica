import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import crypto from "crypto";
import { ALLOWED_ORIGINS } from "@/config/cors";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-03-25.dahlia" as any, // Using expected type
});

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

    // Minimum donation amount
    if (Number(amount) < 1) {
      return NextResponse.json(
        { success: false, message: "Minimum donation amount is $1" },
        { status: 400 }
      );
    }

    const reference = `GEN_DON_${Date.now()}_${crypto.randomUUID()}`;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://connectwithafrica.org";

    // Create Stripe Session
    let session;
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${donationType} donation ${designation !== "where-most-needed" ? `for ${designation}` : ""}`,
              },
              unit_amount: Math.round(Number(amount) * 100), // Stripe amount is in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${backendUrl}/donate/success?reference=${reference}`,
        cancel_url: `${backendUrl}/donate`,
        client_reference_id: reference,
        customer_email: email,
      });
    } catch (error: any) {
      console.error("Stripe session creation error:", error);
      return NextResponse.json(
        { success: false, message: "Payment service unavailable: " + error.message },
        { status: 500 }
      );
    }

    if (!session.url) {
      return NextResponse.json(
        { success: false, message: "Failed to get Stripe checkout link" },
        { status: 400 }
      );
    }

    // Save pending donation
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
      stripeSessionId: session.id,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      reference: session.id, // Keep backward compatibility with frontend if it uses orderId
      message: "Payment initialized successfully",
    });
  } catch (error: any) {
    console.error("Donation error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}