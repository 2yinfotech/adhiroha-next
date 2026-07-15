import { NextResponse } from "next/server";
import { getBatches } from "@/lib/admission";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const course = request.nextUrl.searchParams.get("course") || "";
  try {
    const batches = await getBatches(course);
    return NextResponse.json({ batches });
  } catch (e) {
    return NextResponse.json({ batches: [], error: "Could not load dates" }, { status: 500 });
  }
}
