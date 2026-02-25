export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import jwt from "jsonwebtoken";

import { ALLOWED_ORIGINS } from "@/config/cors";

export async function GET(req: NextRequest) {
  try {
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { success: false, message: "CORS policy: Origin not allowed" },
        { status: 403 },
      );
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token" },
        { status: 401 },
      );
    }

    const token = authHeader.split(" ")[1];
    let decoded: any;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 },
      );
    }

    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

    const client = await clientPromise;
    const db = client.db("connect_africa");

    // Get donations stats
    const donationsCollection = db.collection("donations");
    const donationStats = await donationsCollection
      .aggregate([
        { $match: { status: "completed" } },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
            totalCount: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const totalDonations = donationStats[0]?.totalAmount || 0;
    const totalDonationCount = donationStats[0]?.totalCount || 0;

    // Get this month's donations for comparison (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const monthlyDonationStats = await donationsCollection
      .aggregate([
        { $match: { status: "completed", createdAt: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: null,
            monthlyAmount: { $sum: "$amount" },
            monthlyCount: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const monthlyDonations = monthlyDonationStats[0]?.monthlyAmount || 0;

    // Get campaign stats
    const campaignsCollection = db.collection("campaigns");
    const now = new Date();

    // Active campaigns (current date is between startDate and endDate)
    const activeCampaigns = await campaignsCollection.countDocuments({
      startDate: { $lte: now },
      endDate: { $gte: now },
    });

    // Expired/ended campaigns (endDate < now)
    const expiredCampaigns = await campaignsCollection.countDocuments({
      endDate: { $lt: now },
    });

    const totalCampaigns = await campaignsCollection.countDocuments({});

    // Get subscribers count
    const subscribersCollection = db.collection("subscribers");
    const totalSubscribers = await subscribersCollection.countDocuments({});

    // Get this month's new subscribers
    const monthlySubscribers = await subscribersCollection.countDocuments({
      subscribedAt: { $gte: thirtyDaysAgo },
    });

    // Calculate growth percentages
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
    const previousMonthDonations = await donationsCollection
      .aggregate([
        {
          $match: {
            status: "completed",
            createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo },
          },
        },
        { $group: { _id: null, amount: { $sum: "$amount" } } },
      ])
      .toArray();

    const previousMonthAmount = previousMonthDonations[0]?.amount || 0;
    const donationGrowth =
      previousMonthAmount > 0
        ? (
            ((monthlyDonations - previousMonthAmount) / previousMonthAmount) *
            100
          ).toFixed(1)
        : 0;

    const previousMonthSubscribers = await subscribersCollection.countDocuments(
      {
        subscribedAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo },
      },
    );

    const subscriberGrowth =
      previousMonthSubscribers > 0
        ? (
            ((monthlySubscribers - previousMonthSubscribers) /
              previousMonthSubscribers) *
            100
          ).toFixed(1)
        : 0;

    return NextResponse.json({
      success: true,
      data: {
        totalDonations,
        totalDonationCount,
        activeCampaigns,
        expiredCampaigns,
        totalCampaigns,
        totalSubscribers,
        monthlyDonations,
        monthlySubscribers,
        donationGrowth: parseFloat(donationGrowth as string),
        subscriberGrowth: parseFloat(subscriberGrowth as string),
      },
    });
  } catch (err: any) {
    console.error("Dashboard stats error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard stats",
        error: err?.message,
      },
      { status: 500 },
    );
  }
}
