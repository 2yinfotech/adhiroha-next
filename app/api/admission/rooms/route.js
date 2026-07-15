import { NextResponse } from "next/server";
import { getRoomAvailability } from "@/lib/admission";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const p = request.nextUrl.searchParams;
  const month = p.get("month") || "";
  const gender = p.get("gender") || "";
  try {
    return NextResponse.json(await getRoomAvailability(month, gender));
  } catch (e) {
    return NextResponse.json(
      { availableRooms: [], doubleSharingBooked: true, tripleSharingBooked: true, error: "unavailable" },
      { status: 500 }
    );
  }
}
