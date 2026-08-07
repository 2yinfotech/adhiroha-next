"use client";

import { useState } from "react";

// Lead form for the paid-campaign landing page.
//
// It POSTs to the existing /api/contact endpoint rather than a new one: that
// route already talks to the ashram's SMTP inbox and is known to work, so the
// enquiry lands where every other enquiry lands. The extra fields are folded
// into the message body so nothing is lost.
const COURSES = [
  "200 Hour Yoga Teacher Training",
  "300 Hour Yoga Teacher Training",
  "500 Hour Yoga Teacher Training",
  "Hatha & Yin Teacher Training",
  "Ashtanga & Vinyasa Teacher Training",
  "Pranayama & Meditation Teacher Training",
  "Not sure yet",
];

export default function LeadForm({ id = "lead-form", compact = false }) {
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [note, setNote] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (state === "sending") return;
    const f = new FormData(e.currentTarget);
    const get = (k) => String(f.get(k) || "").trim();

    const name = get("name");
    const email = get("email");
    if (!name || !email) {
      setState("error");
      setNote("Please add your name and email so we can send the guide.");
      return;
    }

    setState("sending");
    setNote("");
    const message = [
      "Requested the course guide from the Google Ads landing page.",
      `Course of interest: ${get("course") || "-"}`,
      `Country: ${get("country") || "-"}`,
      `Planning to travel: ${get("month") || "-"}`,
    ].join("\n");

    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: get("phone"), message }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setState("done");
      } else {
        setState("error");
        setNote(json.message || json.error || "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setNote("Network error. Please check your connection and try again.");
    }
  }

  if (state === "done") {
    return (
      <div className="lf lf-done" id={id}>
        <span className="lf-tick" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
               strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        </span>
        <h3>Your guide is on its way</h3>
        <p>
          Check your inbox in the next few minutes. If it has not arrived, look in your
          promotions or spam folder. We will also reply personally with the upcoming dates
          for the course you chose.
        </p>
      </div>
    );
  }

  return (
    <form className={`lf${compact ? " lf-compact" : ""}`} id={id} onSubmit={onSubmit} noValidate>
      <h3 className="lf-h">Get the free course guide</h3>
      <p className="lf-sub">Curriculum, daily schedule, what is included and the upcoming dates.</p>

      <div className="lf-row">
        <label className="lf-field">
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" required placeholder="Full name" />
        </label>
        <label className="lf-field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
        </label>
      </div>

      <div className="lf-row">
        <label className="lf-field">
          <span>WhatsApp or phone <i>(optional)</i></span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+country code" />
        </label>
        <label className="lf-field">
          <span>Country <i>(optional)</i></span>
          <input name="country" type="text" autoComplete="country-name" placeholder="e.g. Germany" />
        </label>
      </div>

      <div className="lf-row">
        <label className="lf-field">
          <span>Course you are considering</span>
          <select name="course" defaultValue={COURSES[0]}>
            {COURSES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className="lf-field">
          <span>When you hope to travel <i>(optional)</i></span>
          <input name="month" type="text" placeholder="e.g. March next year" />
        </label>
      </div>

      <button className="lf-send" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send me the guide"}
      </button>

      {state === "error" && <p className="lf-err" role="alert">{note}</p>}

      {/* Stated inline rather than linked: this page carries no navigation, and a
          lead form still owes the visitor a plain word about what happens to
          their details. */}
      <p className="lf-privacy">
        We use your details only to send the guide and answer your enquiry about training
        at Adhiroha. We never sell or share them, and you can ask us to delete them at any
        time by replying to our email.
      </p>
    </form>
  );
}
