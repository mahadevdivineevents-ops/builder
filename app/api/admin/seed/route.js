import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST() {
  try {
    await connectDB();
    const existingAdmin = await Admin.findOne();

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin already exists. Use existing credentials." },
        { status: 400 },
      );
    }

    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "Admin@12345";

    await Admin.create({
      username,
      password: await hashPassword(password),
    });

    return NextResponse.json({
      success: true,
      username,
      passwordHint: "Use ADMIN_PASSWORD from your environment or the default password you configured.",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to seed admin" }, { status: 400 });
  }
}
