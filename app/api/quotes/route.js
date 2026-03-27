import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import QuoteRequest from "@/models/QuoteRequest";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal("")),
  service: z.string().min(2),
  message: z.string().min(10),
});

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const quotes = await QuoteRequest.find().sort({ createdAt: -1 });
    return NextResponse.json(quotes);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to fetch quote requests" }, { status: 400 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    await connectDB();
    const quote = await QuoteRequest.create({
      ...data,
      email: data.email || undefined,
    });
    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error?.issues?.[0]?.message || error.message }, { status: 400 });
  }
}
