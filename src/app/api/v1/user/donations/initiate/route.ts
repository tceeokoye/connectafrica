import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import crypto from "crypto";
import { ALLOWED_ORIGINS } from "@/config/cors";

export const dynamic = "force-dynamic";

// allowed origins for CORSimport { ALLOWED_ORIGINS } from "@/config/cors";

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

    // Minimum donation amount (in USD for PayPal)
    if (Number(amount) < 1) {
      return NextResponse.json(
        { success: false, message: "Minimum donation amount is $1" },
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
    const reference = `GEN_DON_${Date.now()}_${crypto.randomUUID()}`;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://connectwithafrica.org";

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
              description: `${donationType} donation ${designation !== "where-most-needed" ? `for ${designation}` : ""}`,
              custom_id: reference,
            },
          ],
          payer: {
            name: {
              given_name: name.split(" ")[0],
              surname: name.split(" ").slice(1).join(" ") || "Donor",
            },
            email_address: email,
          },
          application_context: {
            return_url: `${backendUrl}/donate/success`,
            cancel_url: `${backendUrl}/donate`,
            brand_name: "Connect with Africa",
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
      paypalOrderId: orderData.id,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: approvalLink,
      reference: orderData.id,
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
     