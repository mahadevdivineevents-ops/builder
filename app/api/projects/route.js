import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to fetch projects" }, { status: 400 });
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
    const category = formData.get("category")?.toString().trim();
    const imageFile = formData.get("image");

    if (!title || title.length < 3) {
      throw new Error("Project title must be at least 3 characters.");
    }

    if (!category || category.length < 3) {
      throw new Error("Please choose a valid category.");
    }

    if (!(imageFile instanceof File)) {
      throw new Error("Please select a valid image file.");
    }

    await connectDB();

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const upload = await uploadBufferToCloudinary(buffer, "mahadev-builders/projects");
    const project = await Project.create({
      title,
      category,
      image: upload.url,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to upload project" }, { status: 400 });
  }
}
