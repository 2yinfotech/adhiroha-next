import { NextResponse } from "next/server";
import { COURSES, computeFees, gatewayBreakdown, getBatches, WISE_LINKS } from "@/lib/admission";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// POST /api/admission/order
// Starts payment for an already-registered booking (see /api/admission/register).
//
// The amount is always recomputed here from the course catalogue — the client
// sends only the *selection* (course, batch, sharing, student count), never a
// price, so a tampered request cannot change what is charged.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { course, batchId, sharing = "triple", addOns = [], gateway = "razorpay" } = body;
  const numStudents = Math.min(3, Math.max(1, Number(body.numStudents) || 1));
  const bookingIds = Array.isArray(body.bookingIds) ? body.bookingIds : [];

  if (!COURSES[course]) return NextResponse.json({ error: "Invalid course." }, { status: 400 });
  if (!["wise", "razorpay"].includes(gateway)) {
    return NextResponse.json({ error: "Unknown payment method." }, { status: 400 });
  }

  let batch = null;
  try {
    batch = (await getBatches(course)).find((b) => String(b.id) === String(batchId)) || null;
  } catch (e) {
    return NextResponse.json({ error: "Could not verify the selected dates." }, { status: 502 });
  }
  if (!batch) return NextResponse.json({ error: "Please choose a start date." }, { status: 400 });

  const fees = computeFees({ course, sharing, numStudents, addOns, isFirstBatch: batch.isFirstBatch });
  if (!fees) return NextResponse.json({ error: "Could not price that course." }, { status: 400 });

  const g = gatewayBreakdown(fees.reg)[gateway];
  const acco = sharing === "double" ? "Double Sharing" : "Triple Sharing";
  const room = body.room || "N/A";
  const code = body.codes?.[0] || "";

  /* ---------- Wise: fixed payment link per registration amount ---------- */
  if (gateway === "wise") {
    const url = WISE_LINKS[fees.reg];
    if (!url) {
      return NextResponse.json({
        error: "wise_unavailable",
        message: `No Wise link is set up for a €${fees.reg} registration fee. Please use Razorpay or PayPal, or contact us.`,
      }, { status: 400 });
    }
    return NextResponse.json({ redirect: url, gateway, ...g, reg: fees.reg });
  }

  // PayPal is handled by /api/admission/paypal (Orders v2, captured server-side),
  // driven by the PayPal JS SDK buttons on the page.

  /* ---------- Razorpay: server-created order, verified on return ---------- */
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !secret) {
    return NextResponse.json({
      error: "payment_not_configured",
      message: "Online card payment isn't switched on yet. Set RAZORPAY_KEY_SECRET on the server.",
      gateway, ...g, reg: fees.reg,
    });
  }

  let order;
  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(keyId + ":" + secret).toString("base64"),
      },
      body: JSON.stringify({
        amount: Math.round(g.total * 100),
        currency: "EUR",
        // Razorpay receipts are capped at 40 chars.
        receipt: (code || "ADH" + Date.now().toString(36)).slice(0, 40),
        notes: { course, batch: batch.date_range, acco, students: String(numStudents), bookings: bookingIds.join(",") },
      }),
    });
    order = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: "order_failed", detail: order?.error?.description || "" }, { status: 502 });
    }
  } catch (e) {
    return NextResponse.json({ error: "order_failed", detail: String(e?.message || e) }, { status: 502 });
  }

  return NextResponse.json({
    gateway, orderId: order.id, keyId, amount: order.amount, currency: order.currency,
    ...g, reg: fees.reg,
  });
}
