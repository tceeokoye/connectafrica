import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

function verifyMonnifySignature(req: NextRequest, rawBody: string) {
  const signature = req.headers.get("monnify-signature");
  const hash = crypto
    .createHmac("sha512", process.env.MONNIFY_SECRET_KEY!)
    .update(rawBody)
    .digest("hex");

  return signature === hash;
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  if (!verifyMonnifySignature(req, rawBody)) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.eventType !== "SUCCESSFUL_TRANSACTION") {
    return NextResponse.json({ message: "Ignored" });
  }

  const { paymentReference, amountPaid } = event.eventData;

  const client = await clientPromise;
  const db = client.db("connect_africa");

  const donations = db.collection("donations");
  const campaigns = db.collection("campaigns");

  const donation = await donations.findOne({ reference: paymentReference });
  if (!donation) return NextResponse.json({ message: "Donation not found" });

  if (donation.status === "success")
    return NextResponse.json({ message: "Already processed" });

  // Update donation
  await donations.updateOne(
    { reference: paymentReference },
    { $set: { status: "success", paidAt: new Date() } }
  );

  // Update campaign
  const campaign = await campaigns.findOne({
    _id: new ObjectId(donation.campaignId),
  });

  if (!campaign) return NextResponse.json({ message: "Campaign not found" });

  const newDonatedAmount = campaign.donatedAmount + amountPaid;
  const status =
    newDonatedAmount >= campaign.amount ? "completed" : "inprogress";

  await campaigns.updateOne(
    { _id: campaign._id },
    {
      $set: {
        donatedAmount: newDonatedAmount,
        status,
        updatedAt: new Date(),
      },
      $inc: { volunteers: 1 },
    }
  );

  return NextResponse.json({ success: true });
}
