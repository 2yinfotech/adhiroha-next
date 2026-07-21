import { NextResponse, after } from "next/server";
import {
  COURSES, computeFees, gatewayBreakdown, saveBooking, generateStudentCode,
  sendAdmissionMail, getBatches, shortDateRange, updateBookingSelection,
} from "@/lib/admission";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// POST /api/admission/register
// Saves one `bookings` row per student as "pending" and emails the ashram —
// the same "student started registration" notification the old save_student.php
// sent. Called as soon as the student details are filled in (end of step 1), so
// an enquiry that never reaches the payment step is still followed up.
//
// Accommodation is picked on step 2, so the rows start with no sharing type and
// zero amounts. Posting again with `bookingIds` updates those rows in place
// instead of inserting a second set — no second email is sent.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { course, batchId, sharing = "", addOns = [] } = body;
  const students = Array.isArray(body.students) ? body.students.slice(0, 3) : [];
  const bookingIds = (Array.isArray(body.bookingIds) ? body.bookingIds : []).filter(Boolean);
  const codes = Array.isArray(body.codes) ? body.codes : [];

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

  // Fees can only be worked out once a sharing type is chosen on step 2.
  const fees = sharing
    ? computeFees({ course, sharing, numStudents: students.length, addOns, isFirstBatch: batch.isFirstBatch })
    : null;
  if (sharing && !fees) {
    return NextResponse.json({ error: "Could not price that course." }, { status: 400 });
  }

  const acco = !sharing ? "Not selected yet" : sharing === "double" ? "Double Sharing" : "Triple Sharing";
  // Room numbers are only tracked for the residential YTTC courses.
  const roomTracked = ["200 Hour YTTC", "300 Hour YTTC", "500 Hour YTTC"].includes(course);
  const room = roomTracked ? body.room || "N/A" : "N/A";

  // Per-student share of the group figures, so each row carries its own amount.
  const perReg = fees ? +(fees.reg / students.length).toFixed(2) : 0;
  const perBalance = fees ? +(fees.balance / students.length).toFixed(2) : 0;
  const remarks = fees?.addOns.length ? "Bundle: " + fees.addOns.join(", ") : "n/a";

  // Second and later posts only refresh the choices on the existing rows.
  if (bookingIds.length === students.length) {
    try {
      await updateBookingSelection(bookingIds, {
        acco, room, ramount: perReg, balance: perBalance, remarks, students,
      });
    } catch (e) {
      return NextResponse.json({ error: "We couldn't update your registration. Please try again." }, { status: 502 });
    }
    return NextResponse.json({
      ok: true,
      bookingIds,
      codes,
      batch,
      fees,
      gateways: fees ? gatewayBreakdown(fees.reg) : null,
    });
  }

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
        remarks,
      });
      saved.push({ id: r.id, code: r.code, ...s });
    }
  } catch (e) {
    return NextResponse.json(
      { error: "We couldn't save your registration. Please try again or contact us." },
      { status: 502 }
    );
  }

  // The notification email goes out *after* the response. Gmail SMTP regularly
  // takes 4-10s, and this endpoint now sits behind the Continue button on step 1 —
  // awaiting it would stall the wizard long enough that people assume it's broken.
  after(async () => {
    await sendAdmissionMail({
      students: saved, course, batch, acco, room, fees, addOns: fees?.addOns || addOns, stage: "started",
    }).catch(() => null);
  });

  return NextResponse.json({
    ok: true,
    bookingIds: saved.map((s) => s.id),
    codes: saved.map((s) => s.code),
    batch,
    fees,
    gateways: fees ? gatewayBreakdown(fees.reg) : null,
  });
}
