import { NextResponse } from "next/server";
import {
  COURSES, computeFees, gatewayBreakdown, saveBooking, generateStudentCode,
  sendAdmissionMail, getBatches, shortDateRange,
} from "@/lib/admission";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// POST /api/admission/register
// Saves one `bookings` row per student as "pending" and emails the ashram —
// the same "student started registration" notification the old save_student.php
// sent. Runs before payment so an abandoned checkout is still followed up.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { course, batchId, sharing = "triple", addOns = [] } = body;
  const students = Array.isArray(body.students) ? body.students.slice(0, 3) : [];

  if (!COURSES[course]) {
    return NextResponse.json({ error: "Please choose a course." }, { status: 400 });
  }
  if (!students.length) {
    return NextResponse.json({ error: "Please add at least one student." }, { status: 400 });
  }
  for (const [i, s] of students.entries()) {
    const missing = ["name", "gender", "email", "number", "country", "city"].filter((f) => !String(s?.[f] || "").trim());
    if (missing.length) {
      return NextResponse.json(
        { error: `Student #${i + 1}: please fill in ${missing.join(", ")}.` },
        { status: 400 }
      );
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email)) {
      return NextResponse.json({ error: `Student #${i + 1}: that email address looks wrong.` }, { status: 400 });
    }
  }

  // Resolve the batch server-side — never trust client-sent dates or prices.
  let batch = null;
  try {
    const batches = await getBatches(course);
    batch = batches.find((b) => String(b.id) === String(batchId)) || null;
  } catch (e) {
    return NextResponse.json({ error: "Could not verify the selected dates. Please try again." }, { status: 502 });
  }
  if (!batch) return NextResponse.json({ error: "Please choose a start date." }, { status: 400 });

  const fees = computeFees({
    course, sharing, numStudents: students.length,
    addOns, isFirstBatch: batch.isFirstBatch,
  });
  if (!fees) return NextResponse.json({ error: "Could not price that course." }, { status: 400 });

  const acco = sharing === "double" ? "Double Sharing" : "Triple Sharing";
  // Room numbers are only tracked for the residential YTTC courses.
  const roomTracked = ["200 Hour YTTC", "300 Hour YTTC", "500 Hour YTTC"].includes(course);
  const room = roomTracked ? body.room || "N/A" : "N/A";

  // Per-student share of the group figures, so each row carries its own amount.
  const perReg = +(fees.reg / students.length).toFixed(2);
  const perBalance = +(fees.balance / students.length).toFixed(2);

  const saved = [];
  try {
    for (const s of students) {
      const code = generateStudentCode();
      const r = await saveBooking({
        name: s.name, gender: s.gender, country: s.country, number: s.number,
        email: s.email, city: s.city, course, acco, room,
        ramount: perReg, balance: perBalance,
        month: shortDateRange(batch.date_range), monthYear: batch.monthYear,
        code, status: "pending", source: s.source || "website", refCode: s.refCode || "",
        remarks: fees.addOns.length ? "Bundle: " + fees.addOns.join(", ") : "n/a",
      });
      saved.push({ id: r.id, code: r.code, ...s });
    }
  } catch (e) {
    return NextResponse.json(
      { error: "We couldn't save your registration. Please try again or contact us." },
      { status: 502 }
    );
  }

  // Notification email — never block the booking if SMTP is down.
  const mail = await sendAdmissionMail({
    students: saved, course, batch, acco, room, fees, addOns: fees.addOns, stage: "started",
  }).catch(() => ({ ok: false }));

  return NextResponse.json({
    ok: true,
    bookingIds: saved.map((s) => s.id),
    codes: saved.map((s) => s.code),
    batch,
    fees,
    gateways: gatewayBreakdown(fees.reg),
    mailed: mail.ok,
  });
}
