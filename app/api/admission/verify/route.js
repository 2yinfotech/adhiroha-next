import { NextResponse, after } from "next/server";
import crypto from "crypto";
import {
  COURSES, computeFees, gatewayBreakdown, getBatches,
  markBookingsPaid, sendAdmissionMail, sendStudentConfirmation,
} from "@/lib/admission";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// POST /api/admission/verify
// Confirms a Razorpay payment. The HMAC signature is checked against our secret
// before anything is marked confirmed, so a forged client callback cannot turn a
// pending booking into a paid one.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!secret) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(String(razorpay_signature));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return NextResponse.json({ ok: false, error: "invalid_signature" }, { status: 400 });
  }

  // Signature is good. Recompute the amount server-side rather than trusting the
  // client, then record it against the bookings.
  const { course, batchId, sharing = "triple", addOns = [] } = body;
  const numStudents = Math.min(3, Math.max(1, Number(body.numStudents) || 1));
  const bookingIds = (Array.isArray(body.bookingIds) ? body.bookingIds : []).filter(Boolean);

  let fees = null, batch = null;
  try {
    if (COURSES[course]) {
      batch = (await getBatches(course)).find((x) => String(x.id) === String(batchId)) || null;
      fees = computeFees({ course, sharing, numStudents, addOns, isFirstBatch: batch?.isFirstBatch });
    }
  } catch (e) { /* fall through — payment is already verified */ }

  const acco = sharing === "double" ? "Double Sharing" : "Triple Sharing";
  const paid = fees ? gatewayBreakdown(fees.reg).razorpay.total : 0;

  try {
    await markBookingsPaid(bookingIds, {
      paid, method: "Razorpay", receipt: razorpay_payment_id, status: "confirmed",
      acco, room: body.room, balance: fees ? fees.balance / numStudents : null,
    });
  } catch (e) { /* payment succeeded; a DB hiccup must not fail the user */ }

  // Confirmation emails are sent after the response: SMTP takes seconds, and the
  // student is waiting on this call to be redirected to the thank-you page.
  const students = Array.isArray(body.students) ? body.students : [];
  after(async () => {
    await sendAdmissionMail({
      students, course, batch, acco, room: body.room, fees, addOns: fees?.addOns, stage: "paid",
    }).catch(() => null);
    for (const s of students) {
      await sendStudentConfirmation({ student: s, course, batch, acco, room: body.room, fees }).catch(() => null);
    }
  });

  return NextResponse.json({ ok: true, paymentId: razorpay_payment_id });
}
