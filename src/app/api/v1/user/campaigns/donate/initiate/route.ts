import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import crypto from "crypto";
import { ObjectId } from "mongodb";
import Stripe from "stripe";
import { ALLOWED_ORIGINS } from "@/config/cors";

export const dynamic = "force-dynamic";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-03-25.dahlia" as any,
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

    if (Number(amount) < 1) {
      return NextResponse.json(
        { success: false, message: "Minimum donation amount is $1" },
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

    // Fetch Campaign
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

    const reference = `CAM_${Date.now()}_${crypto.randomUUID()}`;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://www.connectwithafrica.org";

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
                name: `Campaign Donation: ${campaign.title}`,
              },
              unit_amount: Math.round(Number(amount) * 100), // Stripe amount is in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${backendUrl}/donate/success?reference=${reference}`,
        cancel_url: `${backendUrl}/campaigns`,
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
    const donations = db.collection("donations");

    try {
      const insertResult = await donations.insertOne({
        campaignId: new ObjectId(campaignId),
        reference,
        stripeSessionId: session.id,
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
      console.log("   Stripe Session ID:", session.id);
      console.log("   ID:", insertResult.insertedId);
      console.log("   Amount: $" + amount);
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
      checkoutUrl: session.url,
      reference: session.id,
    });
  } catch (err: any) {
    console.error("❌ Campaign donate init error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Payment initialization failed" },
      { status: 500 }
    );
  }
}
