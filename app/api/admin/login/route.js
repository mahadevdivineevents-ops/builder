import { NextResponse } from "next/server";
import { z } from "zod";
import { comparePassword, clearAdminCookie, setAdminCookie, signAdminToken } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = schema.parse(body);
    await connectDB();

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await comparePassword(password, admin.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signAdminToken({ id: admin._id.toString(), username: admin.username });
    const response = NextResponse.json({ success: true });
    response.cookies.set(setAdminCookie(token));
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error?.issues?.[0]?.message || error.message || "Unable to login" },
      { status: 400 },
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(clearAdminCookie());
  return response;
}
