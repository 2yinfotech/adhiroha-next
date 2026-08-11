"use client";

import { useState } from "react";
import { REGISTRATION_DONE_KEY } from "@/components/RegistrationDonePopup";

/**
 * The post-booking registration form.
 *
 * Field names match the `registration` table exactly, so the payload maps
 * straight onto the insert with no translation layer. Values that the booking
 * already knows are pre-filled but stay editable, because the booking was often
 * made months earlier by someone else in the family.
 */

const GENDERS = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const AIRPORTS = [
  { value: "Delhi International Airport", label: "Delhi International Airport" },
  { value: "Dehradun Airport", label: "Jolly Grant (Dehradun Airport)" },
];

// The booking stores gender in mixed case ("male", "Female"); match it to an option.
const matchGender = (g) => GENDERS.find((x) => x.value.toLowerCase() === String(g || "").toLowerCase())?.value || "";

export default function RegistrationForm({ booking, courseOptions, selectedCourse, indian, uploadRules }) {
  const [pickup, setPickup] = useState(false);
  const [ac, setAc] = useState("not-pickup"); // see the note on the AC block below
  const [agreed, setAgreed] = useState(false);
  const [terms, setTerms] = useState(false);
  const [state, setState] = useState("idle"); // idle | sending | done
  const [err, setErr] = useState("");

  const maxMb = Math.round(uploadRules.maxBytes / 1024 / 1024);
  const accept = uploadRules.extensions.map((e) => `.${e}`).join(",");

  async function onSubmit(e) {
    e.preventDefault();
    if (state === "sending") return;
    if (!agreed) { setErr("Please accept the terms and conditions before submitting."); return; }

    setState("sending"); setErr("");
    const data = new FormData(e.currentTarget);
    data.set("b_id", String(booking.b_id));
    data.set("r_flight", pickup ? "pickup" : "not-pickup");
    data.set("r_ac", ac);

    try {
      const res = await fetch("/api/registration/", { method: "POST", body: data });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        // Hand the confirmation to the homepage and send the student there,
        // rather than leaving them on a page with nowhere to go. The name is
        // passed in sessionStorage so it never appears in the URL.
        try { sessionStorage.setItem(REGISTRATION_DONE_KEY, booking.b_name || ""); } catch {}
        setState("done");
        window.location.assign("/");
      } else { setState("idle"); setErr(json.message || "Something went wrong. Please email info@adhiroha.com."); }
    } catch {
      setState("idle");
      setErr("Network error. Please check your connection and try again.");
    }
  }

  // Shown for the moment between a successful save and the browser leaving for
  // the homepage, where the confirmation popup takes over.
  if (state === "done") {
    return (
      <div className="rg-state">
        <svg className="rg-tick" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M8 12.5l2.6 2.6L16 9.5" />
        </svg>
        <h2 className="rg-h1">Thank you, {booking.b_name}</h2>
        <p>Taking you back to the site…</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      {/* ---------------------------------------------------------- student */}
      <section className="rg-card">
        <h2 className="rg-legend">Your details</h2>
        <p className="rg-note">The name you give first is the one printed on your certificate, so please write it exactly as you want it to appear.</p>
        <div className="rg-grid">
          <div className="rg-field wide">
            <label htmlFor="r_name">Name for the certificate</label>
            <input id="r_name" name="r_name" type="text" defaultValue={booking.b_name || ""}
                   placeholder="As it should appear on the certificate" required />
          </div>
          <div className="rg-field">
            <label htmlFor="r_hour">Course</label>
            <select id="r_hour" name="r_hour" defaultValue={selectedCourse} required>
              {courseOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="rg-field">
            <label htmlFor="r_email">Email address</label>
            <input id="r_email" name="r_email" type="email" defaultValue={booking.b_email || ""} required />
          </div>
          <div className="rg-field">
            <label htmlFor="r_whatsapp">WhatsApp number</label>
            <input id="r_whatsapp" name="r_whatsapp" type="tel" defaultValue={booking.b_number || ""}
                   placeholder="With country code" required />
          </div>
          <div className="rg-field">
            <label htmlFor="r_dob">Date of birth</label>
            <input id="r_dob" name="r_dob" type="date" required />
          </div>
          <div className="rg-field">
            <label htmlFor="r_gender">Gender</label>
            <select id="r_gender" name="r_gender" defaultValue={matchGender(booking.b_gender)} required>
              <option value="" disabled>Select</option>
              {GENDERS.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
            </select>
          </div>
          <div className="rg-field">
            <label htmlFor="r_country">Country</label>
            <input id="r_country" name="r_country" type="text" defaultValue={booking.b_country || ""} required />
          </div>
          <div className="rg-field wide">
            <label htmlFor="r_insta">Instagram <span className="opt">(optional)</span></label>
            <input id="r_insta" name="r_insta" type="text" placeholder="Your Instagram handle" />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- documents */}
      <section className="rg-card">
        <h2 className="rg-legend">Documents</h2>
        <p className="rg-note">
          {uploadRules.extensions.join(", ").toUpperCase()} up to {maxMb} MB each. These are kept for
          our records and shared with nobody.
        </p>
        <div className="rg-grid">
          <div className="rg-field">
            <label htmlFor="r_idp">{indian ? "Scan of your ID proof" : "Scan of your passport"}</label>
            <input id="r_idp" name="r_idp" type="file" accept={accept} required />
          </div>
          {!indian && (
            <div className="rg-field">
              <label htmlFor="r_visa">Scan of your visa</label>
              <input id="r_visa" name="r_visa" type="file" accept={accept} required />
            </div>
          )}
        </div>
      </section>

      {/* --------------------------------------------------------------- AC */}
      <section className="rg-card">
        <h2 className="rg-legend">Room</h2>
        {/* The stored values are "not-pickup" / "pickup" rather than something
            about air conditioning. That is how the old PHP form wrote them and
            the admin panel reads them, so they are kept as-is. */}
        <p className="rg-note alert">
          Air conditioning costs €36 per week per person for triple sharing, and €54 per week per
          person for double sharing.
        </p>
        <div className="rg-choice">
          <label className={`rg-opt${ac === "not-pickup" ? " on" : ""}`}>
            <input type="radio" name="ac_choice" checked={ac === "not-pickup"} onChange={() => setAc("not-pickup")} />
            <span>I am happy to stay in an air-conditioned room if my roommates would like one.</span>
          </label>
          <label className={`rg-opt${ac === "pickup" ? " on" : ""}`}>
            <input type="radio" name="ac_choice" checked={ac === "pickup"} onChange={() => setAc("pickup")} />
            <span>I would rather not have air conditioning at all.</span>
          </label>
        </div>
      </section>

      {/* ----------------------------------------------------------- pickup */}
      <section className="rg-card">
        <h2 className="rg-legend">Airport pickup</h2>
        <div className="rg-choice">
          <label className={`rg-opt${!pickup ? " on" : ""}`}>
            <input type="radio" name="pickup_choice" checked={!pickup} onChange={() => setPickup(false)} />
            <span>I will arrange my own transport.</span>
          </label>
          <label className={`rg-opt${pickup ? " on" : ""}`}>
            <input type="radio" name="pickup_choice" checked={pickup} onChange={() => setPickup(true)} />
            <span>Please pick me up from the airport.</span>
          </label>
        </div>

        {pickup && (
          <>
            <p className="rg-note alert" style={{ marginTop: 20 }}>
              Pickup from Delhi International Airport costs €120. From Dehradun (Jolly Grant) it is €20.
            </p>
            <div className="rg-grid">
              <div className="rg-field wide">
                <label htmlFor="f_destination">Arriving at</label>
                <select id="f_destination" name="f_destination" defaultValue="" required>
                  <option value="" disabled>Select the airport</option>
                  {AIRPORTS.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
                </select>
              </div>
              <div className="rg-field">
                <label htmlFor="f_date">Arrival date</label>
                <input id="f_date" name="f_date" type="date" required />
              </div>
              <div className="rg-field">
                <label htmlFor="f_time">Arrival time</label>
                <input id="f_time" name="f_time" type="time" required />
                <span className="rg-hint">Local Indian time, as printed on your ticket.</span>
              </div>
              <div className="rg-field">
                <label htmlFor="f_number">Flight number</label>
                <input id="f_number" name="f_number" type="text" placeholder="e.g. AI 812" required />
              </div>
              <div className="rg-field">
                <label htmlFor="f_airline">Airline <span className="opt">(optional)</span></label>
                <input id="f_airline" name="f_airline" type="text" />
              </div>
            </div>
          </>
        )}
      </section>

      {/* -------------------------------------------------------- emergency */}
      <section className="rg-card">
        <h2 className="rg-legend">Emergency contact</h2>
        <p className="rg-note">Someone we can reach if we need to, usually a parent or partner.</p>
        <div className="rg-grid">
          <div className="rg-field wide">
            <label htmlFor="r_ename">Name</label>
            <input id="r_ename" name="r_ename" type="text" required />
          </div>
          <div className="rg-field">
            <label htmlFor="r_econtact">Contact number</label>
            <input id="r_econtact" name="r_econtact" type="tel" placeholder="With country code" required />
          </div>
          <div className="rg-field">
            <label htmlFor="r_relation">Relationship to you</label>
            <input id="r_relation" name="r_relation" type="text" placeholder="e.g. Mother, Partner" required />
          </div>
        </div>

        <div className="rg-terms">
          <input id="terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <label htmlFor="terms">
            I have read and accept the{" "}
            <button type="button" onClick={() => setTerms(true)}>Adhiroha guidelines and code of conduct</button>.
          </label>
        </div>

        <button className="rg-submit" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Submitting…" : "Submit registration"}
        </button>
        {err && <p className="rg-err">{err}</p>}
      </section>

      {terms && <TermsDialog onClose={() => setTerms(false)} />}
    </form>
  );
}

/* The same guidelines the PHP form showed, unchanged in substance. */
function TermsDialog({ onClose }) {
  return (
    <div className="rg-modal" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="rg-modal-box" role="dialog" aria-modal="true" aria-label="Adhiroha guidelines">
        <h3>Adhiroha Guidelines</h3>
        <p>
          At Adhiroha the importance of discipline is emphasised in the practice of yoga. Motivation
          varies from moment to moment; discipline gives a steady foundation. The guidelines below
          create a supportive and focused environment for everyone staying with us.
        </p>

        <h4>The four principles</h4>
        <ul>
          <li><strong>Respect</strong> for fellow practitioners, teachers, staff and the ashram, including guidelines, traditions, personal boundaries and privacy.</li>
          <li><strong>Discipline</strong> in following the schedule and the instructions, and in practising consistently and punctually.</li>
          <li><strong>Community</strong>, an inclusive environment where people support each other on the path.</li>
          <li><strong>Greeting</strong>, "Aum Namaha Shivaya" with the Namaste mudra.</li>
        </ul>

        <h4>Fees and payment</h4>
        <ul>
          <li>The balance may be settled in cash or by card.</li>
          <li>We accept INR, USD, Euros, Pounds, Australian Dollars and Canadian Dollars.</li>
          <li>A 5% bank transaction charge applies to credit and debit card payments.</li>
          <li>All fees are non-refundable and non-transferable, whether paid in full or in part. A course may be rescheduled subject to availability, but cancellations cannot be refunded.</li>
          <li>Fees shown in Euros are for international reference. Invoices are issued in INR as required by Indian regulations.</li>
          <li>Bank transfers must go to the official business account. Please ask management for the banking details.</li>
          <li>Management reserves the right to modify programmes or activities without prior notice.</li>
        </ul>

        <h4>Attendance and timings</h4>
        <ul>
          <li>A minimum attendance of 90% is required to be eligible for a certificate.</li>
          <li>Classes run Thursday to Tuesday each week. Wednesday is a rest day.</li>
          <li>Students stay on the premises for the duration of the course.</li>
          <li>The gate closes daily at 21:00 IST.</li>
        </ul>

        <h4>Dress code</h4>
        <p>Tops with sleeves and full-length bottoms, in keeping with the modesty of the practice.</p>

        <h4>Zero tolerance</h4>
        <ul>
          <li>No shorts, sleeveless tops, crop tops or backless tops on the premises.</li>
          <li>No public displays of affection on the premises.</li>
          <li>No alcohol, non-vegetarian food, drugs or smoking on the premises, and no arriving intoxicated. This can carry legal consequences as well as expulsion.</li>
          <li>No harassment or conduct of a sexual nature during the course or any Adhiroha activity. Tell management immediately if you experience or witness it, and it will be acted on.</li>
        </ul>
        <p>Not following these guidelines may result in dismissal from the course.</p>

        <button type="button" className="rg-modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
