import { NextResponse } from "next/server";
import { getRoomBoard } from "@/lib/rooms";
import { getRoomAvailability } from "@/lib/admission";

export const dynamic = "force-dynamic";

/**
 * What this student may book: the months their stay covers, every room's
 * status, and the two sharing totals.
 *
 * Needs `course` and `year` as well as month and gender, because a 500 hour
 * stay runs across two months and a room has to be free for both.
 *
 * Falls back to the old `rooms_name` reading when `rooms` / `room_occupancy`
 * are not there yet, so the panel keeps working on a server where
 * room-occupancy.sql has not been run. That fallback logs loudly — it is a
 * migration state, not a resting place.
 */
export async function GET(request) {
  const p = request.nextUrl.searchParams;
  const course = p.get("course") || "";
  const month = p.get("month") || "";
  const gender = p.get("gender") || "";
  const year = Number(p.get("year")) || new Date().getFullYear();

  try {
    const board = await getRoomBoard({ course, year, month, gender });
    const openIn = (kind) => board.rooms.filter((r) => r.sharing === kind && r.available);
    return NextResponse.json({
      ...board,
      // The shape the panel has always read, derived from the same board so the
      // two can never disagree.
      availableRooms: board.rooms.filter((r) => r.available).map((r) => r.name),
      doubleSharingBooked: openIn("double").length === 0,
      tripleSharingBooked: openIn("triple").length === 0,
      unavailableReason: { double: "", triple: "" },
    });
  } catch (e) {
    // Any failure to read the new tables falls back to the old rooms_name
    // reading, which also covers ARTICLES_SOURCE=sqlfile for local work. Room
    // selection is simply not offered until room-occupancy.sql has been run.
    console.error(
      `[rooms] could not read rooms/room_occupancy (${e?.code || "error"}: ${e?.message || e}). ` +
      "Falling back to the rooms_name reading — run room-occupancy.sql to enable room selection."
    );
    const legacy = await getRoomAvailability(month, gender).catch(() => null);
    if (legacy) return NextResponse.json({ ...legacy, months: [], rooms: [], legacy: true });

    return NextResponse.json(
      {
        months: [], rooms: [], availableRooms: [],
        doubleSharingBooked: true, tripleSharingBooked: true,
        unavailableReason: { double: "", triple: "" },
        error: "unavailable",
      },
      { status: 500 }
    );
  }
}
