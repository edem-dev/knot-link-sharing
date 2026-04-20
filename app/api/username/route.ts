import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB()
  .then(() => console.log("Connected to MongoDB"))
  return NextResponse.json({ message: "Connected" });
}