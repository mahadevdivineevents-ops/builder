import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Setting from "@/models/Setting";

const schema = z.object({
  phone: z.string().min(10),
  email: z.string().email(),
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  bannerImage: z.string().optional(),
});

export async function GET() {
  try {
    await connectDB();
    const settings = await Setting.findOne();
    return NextResponse.json(settings || {});
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to fetch settings" }, { status: 400 });
  }
}

export async function PUT(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = schema.parse(body);
    await connectDB();

    const payload = { ...data };
    if (data.bannerImage) {
      const upload = await uploadToCloudinary(data.bannerImage, "mahadev-builders/banner");
      payload.bannerImage = upload.url;
    }

    const settings = await Setting.findOneAndUpdate({}, payload, {
      upsert: true,
      returnDocument: "after",
      setDefaultsOnInsert: true,
    });

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: error?.issues?.[0]?.message || error.message }, { status: 400 });
  }
}
