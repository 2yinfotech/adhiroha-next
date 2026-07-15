import { NextResponse } from "next/server";
import { COURSES, saveBooking } from "@/lib/admission";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const RAZOR_PERCENT = 0.05; // Razorpay gateway fee added on top (as in the old panel)

export async function POST(request) {
  const body = await request.json();
  const course = COURSES[body.course];
  if (!course) return NextResponse.json({ error: "Invalid course" }, { status: 400 });

  const reg = course.reg;
  const fee = +(reg * RAZOR_PERCENT).toFixed(2);
  const total = +(reg + fee).toFixed(2);
  const code = "ADH" + Date.now().toString(36).toUpperCase() + Math.floor(Math.random() * 900 + 100);

  // Save a pending booking up-front (so the ashram is notified even if payment
  // is abandoned), mirroring the old panel.
  let bookingId = 0;
  try {
    const r = await saveBooking({
      ...body, ramount: reg, balance: Math.max(0, (course.from || 0) - reg),
      code, status: "pending", method: "Razorpay",
    });
    bookingId = r.id;
  } catch (e) { /* don't block payment start on a save error */ }

  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !secret) {
    return NextResponse.json({
      error: "payment_not_configured", bookingId, code, reg, fee, total,
      message: "Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET on the server to enable payment.",
    });
  }

  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(keyId + ":" + secret).toString("base64"),
    },
    body: JSON.stringify({
      amount: Math.round(total * 100), currency: "EUR", receipt: code,
      notes: { course: body.course, name: body.name || "", email: body.email || "" },
    }),
  });
  const order = await res.json();
  if (!res.ok) return NextResponse.json({ error: "order_failed", detail: order }, { status: 502 });

  return NextResponse.json({
    orderId: order.id, keyId, amount: order.amount, currency: order.currency,
    bookingId, code, reg, fee, total,
  });
}
