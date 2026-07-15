import { NextResponse } from "next/server";
import crypto from "crypto";
import { markBookingPaid } from "@/lib/admission";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId, amount } =
    await request.json();
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });

  const expected = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");
  if (expected !== razorpay_signature) {
    return NextResponse.json({ ok: false, error: "invalid_signature" }, { status: 400 });
  }
  try {
    await markBookingPaid(bookingId, {
      paid: amount, method: "Razorpay", receipt: razorpay_payment_id, status: "confirmed",
    });
  } catch (e) { /* payment succeeded; DB update failure shouldn't fail the user */ }
  return NextResponse.json({ ok: true });
}
