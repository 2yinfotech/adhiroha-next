import { NextResponse } from "next/server";
import { getBooking, saveRegistration, saveUpload, isIndian } from "@/lib/registration";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// POST /api/registration  (multipart/form-data)
//
// Completes the post-booking registration form. Takes the booking id from the
// body rather than trusting anything on the client, re-reads the booking, and
// refuses a booking that has already been submitted so a refresh or a second
// click cannot create a duplicate row. The PHP version had no such guard.

const str = (form, key, max = 255) => String(form.get(key) ?? "").trim().slice(0, max);

export async function POST(request) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "Could not read the form. Please try again." }, { status: 400 });
  }

  const bookingId = Number.parseInt(String(form.get("b_id") || ""), 10);
  if (!Number.isInteger(bookingId) || bookingId <= 0) {
    return NextResponse.json({ ok: false, message: "This registration link is not valid." }, { status: 400 });
  }

  const booking = await getBooking(bookingId).catch(() => null);
  if (!booking) {
    return NextResponse.json({ ok: false, message: "We could not find that booking." }, { status: 404 });
  }
  if (String(booking.b_reg || "").toLowerCase() === "submited") {
    return NextResponse.json(
      { ok: false, alreadyDone: true, message: "This registration has already been submitted. Please contact us if you need to change anything." },
      { status: 409 },
    );
  }

  const values = {
    r_name: str(form, "r_name"),
    r_email: str(form, "r_email"),
    r_insta: str(form, "r_insta"),
    r_dob: str(form, "r_dob", 32),
    r_whatsapp: str(form, "r_whatsapp", 64),
    r_country: str(form, "r_country"),
    r_gender: str(form, "r_gender", 32),
    r_ename: str(form, "r_ename"),
    r_econtact: str(form, "r_econtact", 64),
    r_relation: str(form, "r_relation", 64),
    r_hour: str(form, "r_hour"),
    r_ac: str(form, "r_ac", 32),
  };

  const required = ["r_name", "r_email", "r_dob", "r_whatsapp", "r_gender", "r_ename", "r_econtact", "r_relation", "r_hour"];
  const missing = required.filter((k) => !values[k]);
  if (missing.length) {
    return NextResponse.json({ ok: false, message: "Please fill in every required field." }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.r_email)) {
    return NextResponse.json({ ok: false, message: "That email address looks wrong." }, { status: 400 });
  }

  // Airport pickup. When it is not wanted the flight columns carry the same
  // placeholder values the PHP wrote, so the admin panel reads them the same.
  const wantsPickup = str(form, "r_flight", 32) === "pickup";
  Object.assign(values, wantsPickup
    ? {
        f_destination: str(form, "f_destination"),
        f_date: str(form, "f_date", 32),
        f_time: str(form, "f_time", 16),
        f_number: str(form, "f_number", 64),
        f_airline: str(form, "f_airline") || "N/A",
      }
    : { f_destination: "N/A", f_date: "1970-01-01", f_time: "00:00", f_number: "N/A", f_airline: "N/A" });

  if (wantsPickup && (!values.f_destination || !values.f_date || !values.f_time || !values.f_number)) {
    return NextResponse.json({ ok: false, message: "Please complete the flight details for your pickup." }, { status: 400 });
  }

  // Documents. Files are written before the insert so a rejected upload never
  // leaves a half-registered booking behind.
  try {
    values.r_idp = await saveUpload(form.get("r_idp"), "IDP", bookingId);
    values.r_visa = isIndian(booking.b_country)
      ? "n/a"
      : await saveUpload(form.get("r_visa"), "VISA", bookingId);
  } catch (e) {
    return NextResponse.json({ ok: false, message: e.message }, { status: 400 });
  }

  try {
    const { registrationId } = await saveRegistration(bookingId, values);
    return NextResponse.json({ ok: true, registrationId });
  } catch (e) {
    console.error("registration save failed", e);
    return NextResponse.json(
      { ok: false, message: "We could not save your registration. Please email info@adhiroha.com." },
      { status: 500 },
    );
  }
}
