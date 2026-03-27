import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

const schema = z.object({
  name: z.string().min(2),
  message: z.string().min(10),
  rating: z.number().min(1).max(5),
});

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to fetch testimonials" }, { status: 400 });
  }
}

export async function POST(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = schema.parse(body);
    await connectDB();
    const testimonial = await Testimonial.create(data);
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error?.issues?.[0]?.message || error.message }, { status: 400 });
  }
}
