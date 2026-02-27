import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import crypto from "crypto";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

// allowed origins for CORS
import { ALLOWED_ORIGINS } from "@/config/cors";

// Get PayPal access token
async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
  ).toString("base64");

  const response = await fetch(
    `${process.env.PAYPAL_API_URL}/v1/oauth2/token`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get PayPal access token");
  }

  const data = await response.json();
  return data.access_token;
}

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

    // Get PayPal access token
    let accessToken: string;
    try {
      accessToken = await getPayPalAccessToken();
    } catch (error) {
      console.error("PayPal auth error:", error);
      return NextResponse.json(
        { success: false, message: "Payment service unavailable" },
        { status: 500 }
      );
    }

    // Create PayPal Order
    const reference = `CAM_${Date.now()}_${crypto.randomUUID()}`;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

    const orderResponse = await fetch(
      `${process.env.PAYPAL_API_URL}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: String(Number(amount).toFixed(2)),
              },
              description: `Campaign Donation: ${campaign.title}`,
              custom_id: reference,
            },
          ],
          payer: {
            name: {
              given_name: firstName,
              surname: lastName,
            },
            email_address: email,
          },
          application_context: {
            return_url: `${backendUrl}/donate/success?reference=${reference}`,
            cancel_url: `${backendUrl}/campaigns`,
            brand_name: "Connect Africa",
            locale: "en-US",
            landing_page: "BILLING",
            user_action: "PAY_NOW",
          },
        }),
      }
    );

    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      console.error("PayPal order creation error:", orderData);
      return NextResponse.json(
        { success: false, message: orderData.message || "Payment initialization failed" },
        { status: 400 }
      );
    }

    // Find approval link
    const approvalLink = orderData.links?.find((link: any) => link.rel === "approve")?.href;

    if (!approvalLink) {
      return NextResponse.json(
        { success: false, message: "Failed to get PayPal checkout link" },
        { status: 400 }
      );
    }

    // Save pending donation
    const donations = db.collection("donations");

    try {
      const insertResult = await donations.insertOne({
        campaignId: new ObjectId(campaignId),
        reference,
        paypalOrderId: orderData.id,
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
      console.log("   PayPal Order ID:", orderData.id);
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
      checkoutUrl: approvalLink,
      reference: orderData.id,
    });
  } catch (err: any) {
    console.error("❌ Campaign donate init error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Payment initialization failed" },
      { status: 500 }
    );
  }
}
