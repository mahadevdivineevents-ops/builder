import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import { defaultServices } from "@/data/site";
import Setting from "@/models/Setting";
import Service from "@/models/Service";

export async function GET() {
  try {
    await connectDB();
    const settings = await Setting.findOne();

    if (!settings?.serviceDefaultsSeeded) {
      const existingServices = await Service.find({}, "title").lean();
      const existingTitles = new Set(existingServices.map((service) => service.title));
      const missingServices = defaultServices.filter(
        (service) => !existingTitles.has(service.title),
      );

      if (missingServices.length) {
        await Service.insertMany(missingServices);
      }

      await Setting.findOneAndUpdate(
        {},
        { serviceDefaultsSeeded: true },
        { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
      );
    }

    const services = await Service.find().sort({ createdAt: 1 });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to fetch services" }, { status: 400 });
  }
}

export async function POST(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const price = formData.get("price")?.toString().trim();
    const imageFile = formData.get("image");

    if (!title || title.length < 3) {
      throw new Error("Service title must be at least 3 characters.");
    }

    if (!description || description.length < 10) {
      throw new Error("Description must be at least 10 characters.");
    }

    if (!price) {
      throw new Error("Price is required.");
    }

    if (!(imageFile instanceof File)) {
      throw new Error("Please select a valid image file.");
    }

    await connectDB();

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const upload = await uploadBufferToCloudinary(buffer, "mahadev-builders/services");
    const service = await Service.create({
      title,
      description,
      price,
      image: upload.url,
    });

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/admin");

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to add service" }, { status: 400 });
  }
}
