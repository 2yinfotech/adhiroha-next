import { NextResponse } from "next/server";
import {
  COURSES, computeFees, gatewayBreakdown, getBatches,
  markBookingsPaid, sendAdmissionMail, sendStudentConfirmation,
} from "@/lib/admission";
import { createPayPalOrder, capturePayPalOrder, completedCapture, paypalConfigured } from "@/lib/paypal";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Re-prices a booking from the selection alone. The client never sends an amount.
async function priceFrom(body) {
  const { course, batchId, sharing = "triple", addOns = [] } = body;
  const numStudents = Math.min(3, Math.max(1, Number(body.numStudents) || 1));
  if (!COURSES[course]) return { error: "Invalid course." };

  const batch = (await getBatches(course)).find((b) => String(b.id) === String(batchId));
  if (!batch) return { error: "Please choose a start date." };

  const fees = computeFees({ course, sharing, numStudents, addOns, isFirstBatch: batch.isFirstBatch });
  if (!fees) return { error: "Could not price that course." };

  return { batch, fees, numStudents, expected: gatewayBreakdown(fees.reg).paypal.total };
}

// POST /api/admission/paypal            → { action: "create" } creates the order
// POST /api/admission/paypal            → { action: "capture", orderID } captures it
export async function POST(request) {
  const body = await request.json().catch(() => ({}));

  if (!paypalConfigured()) {
    return NextResponse.json(
      {
        error: "paypal_not_configured",
        message: "PayPal isn't switched on yet. Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET on the server.",
      },
      { status: 503 }
    );
  }

  const priced = await priceFrom(body).catch(() => ({ error: "Could not verify your booking." }));
  if (priced.error) return NextResponse.json({ error: priced.error }, { status: 400 });

  const { batch, fees, numStudents, expected } = priced;
  const acco = body.sharing === "double" ? "Double Sharing" : "Triple Sharing";

  /* ---------- create ---------- */
  if (body.action === "create") {
    try {
      const order = await createPayPalOrder({
        amount: expected,
        currency: "EUR",
        reference: body.codes?.[0] || "adhiroha",
        description: `${body.course} registration — ${acco}`,
      });
      return NextResponse.json({ orderID: order.id, amount: expected });
    } catch (e) {
      return NextResponse.json({ error: "create_failed", message: String(e?.message || e) }, { status: 502 });
    }
  }

  /* ---------- capture ---------- */
  if (body.action === "capture") {
    if (!body.orderID) return NextResponse.json({ error: "missing_order" }, { status: 400 });

    let captured;
    try {
      const order = await capturePayPalOrder(body.orderID);
      captured = completedCapture(order);
    } catch (e) {
      return NextResponse.json({ error: "capture_failed", message: String(e?.message || e) }, { status: 502 });
    }
    if (!captured) {
      return NextResponse.json({ error: "not_completed", message: "PayPal did not complete this payment." }, { status: 400 });
    }
    // Guard against a mismatched capture (wrong order replayed, partial amount).
    if (Math.abs(captured.amount - expected) > 0.01 || captured.currency !== "EUR") {
      return NextResponse.json(
        { error: "amount_mismatch", message: "The captured amount didn't match this booking. Please contact us." },
        { status: 400 }
      );
    }

    const bookingIds = (Array.isArray(body.bookingIds) ? body.bookingIds : []).filter(Boolean);
    try {
      await markBookingsPaid(bookingIds, {
        paid: captured.amount, method: "Paypal", receipt: captured.id, status: "confirmed",
        acco, balance: fees.balance / numStudents,
      });
    } catch (e) { /* paid already; a DB hiccup must not fail the user */ }

    const students = Array.isArray(body.students) ? body.students : [];
    await sendAdmissionMail({
      students, course: body.course, batch, acco, room: "N/A",
      fees, addOns: fees.addOns, stage: "paid",
    }).catch(() => null);
    for (const s of students) {
      await sendStudentConfirmation({ student: s, course: body.course, batch, acco, room: "N/A", fees }).catch(() => null);
    }

    return NextResponse.json({ ok: true, paymentId: captured.id });
  }

  return NextResponse.json({ error: "unknown_action" }, { status: 400 });
}
