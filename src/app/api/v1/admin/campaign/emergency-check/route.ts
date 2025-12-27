import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("connect_africa");
    const collection = db.collection("campaigns");

    // Check for active emergency campaigns
    const activeEmergency = await collection.findOne({
      category: "Emergency",
      status: "inprogress",
    });

    return NextResponse.json({ exists: !!activeEmergency });
  } catch (err: any) {
    console.error("Emergency check error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
