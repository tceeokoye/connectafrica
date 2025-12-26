import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

const ALLOWED_ORIGINS = ["http://localhost:3000", "https://cohaaf2.vercel.app"];

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { success: false, message: "CORS policy: Origin not allowed" },
        { status: 403 }
      );
    }
    type DeleteBlogParams = { id: string };
    const { id } = await params as DeleteBlogParams;

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db("connect_africa");
    const blogs = db.collection("blogs");

    const result = await blogs.deleteOne({ _id: new ObjectId(id) });
    if (!result.deletedCount)
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
