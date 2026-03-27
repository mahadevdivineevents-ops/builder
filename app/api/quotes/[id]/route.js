import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import QuoteRequest from "@/models/QuoteRequest";

const schema = z.object({
  status: z.enum(["new", "contacted", "closed"]),
});

export async function PATCH(request, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const data = schema.parse(body);
    await connectDB();
    const quote = await QuoteRequest.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
    if (!quote) {
      return NextResponse.json({ error: "Quote request not found" }, { status: 404 });
    }
    return NextResponse.json(quote);
  } catch (error) {
    return NextResponse.json({ error: error?.issues?.[0]?.message || error.message }, { status: 400 });
  }
}
