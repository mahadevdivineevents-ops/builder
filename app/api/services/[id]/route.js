import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";

const schema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.string().min(1).optional(),
  image: z.string().min(1).optional(),
});

export async function PUT(request, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const data = schema.parse(body);
    await connectDB();

    const payload = { ...data };
    if (data.image) {
      const upload = await uploadToCloudinary(data.image, "mahadev-builders/services");
      payload.image = upload.url;
    }

    const service = await Service.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    });
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: error?.issues?.[0]?.message || error.message }, { status: 400 });
  }
}

export async function DELETE(_, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectDB();
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to delete service" }, { status: 400 });
  }
}
