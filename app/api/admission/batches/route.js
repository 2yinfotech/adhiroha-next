import { NextResponse } from "next/server";
import { getBatches, getComboSoundHealingBatch } from "@/lib/admission";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// GET /api/admission/batches?course=200 Hour YTTC
//   → { batches: [...] }
// GET /api/admission/batches?course=200 Hour YTTC&comboFor=<batchId>
//   → { batches: [...], comboBatch } — the Sound Healing batch that pairs with
//     the given main-course batch (see getComboSoundHealingBatch).
export async function GET(request) {
  const p = request.nextUrl.searchParams;
  const course = p.get("course") || "";
  const comboFor = p.get("comboFor");

  try {
    const batches = await getBatches(course);
    if (!comboFor) return NextResponse.json({ batches });

    const main = batches.find((b) => String(b.id) === String(comboFor));
    const comboBatch = main ? await getComboSoundHealingBatch(course, main) : null;
    return NextResponse.json({ batches, comboBatch });
  } catch (e) {
    return NextResponse.json({ batches: [], error: "Could not load dates" }, { status: 500 });
  }
}
