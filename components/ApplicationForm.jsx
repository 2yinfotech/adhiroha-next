"use client";

import { useState } from "react";
import styles from "./AuxiliaryPage.module.css";

const FIELDS = {
  volunteer: [
    ["fullName", "Full name", "text"], ["whatsApp", "WhatsApp number", "tel"],
    ["email", "Email address", "email"], ["country", "Country", "text"],
    ["skills", "Skills", "textarea", true], ["experience", "Relevant experience", "textarea", true],
    ["availableFrom", "Available from", "date"], ["duration", "Volunteer duration", "text"],
  ],
  teacher: [
    ["fullName", "Full name", "text"], ["whatsApp", "WhatsApp number", "tel"],
    ["email", "Email address", "email"], ["country", "Nationality", "text"],
    ["styles", "Styles of yoga taught", "textarea", true], ["experience", "Years of teaching experience", "text"],
    ["certification", "Yoga certification", "textarea", true], ["philosophy", "Teaching philosophy", "textarea", true],
  ],
};

/* What the applicant reads once the application is in. The school's own
   wording, and different for the two roles, so nobody is thanked for applying
   to the wrong thing. */
const DONE = {
  volunteer: {
    heading: "Thank you for submitting your application for the volunteer position.",
    body:
      "We truly appreciate your interest in contributing to our team. We will review your " +
      "application and keep you updated. We will get in touch with you when a suitable " +
      "volunteer opportunity arises.",
  },
  teacher: {
    heading: "Thank you for submitting your application for the position of Teacher at Adhiroha.",
    body:
      "We sincerely appreciate your interest in joining our team. Your application will be " +
      "carefully reviewed, and we will keep you informed of any relevant opportunities. We " +
      "will contact you should a suitable position become available.",
  },
};

/**
 * The volunteer and teacher application forms.
 *
 * This used to hand off to `mailto:` — the page opened whatever mail client the
 * visitor had and asked them to attach their photo and CV themselves. On a
 * phone, or in webmail with no client configured, that is where the application
 * ended, and since nothing reached a server there was no record that anyone had
 * even tried. It now posts to /api/application/, which writes the row and the
 * two files to the database and emails the school afterwards.
 */
export default function ApplicationForm({ type }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("type", type);
    data.set("pagePath", window.location.pathname);

    try {
      const res = await fetch("/api/application/", { method: "POST", body: data });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.ok) {
        setError(json.error || "Something went wrong. Please try again, or email info@adhiroha.com.");
        setBusy(false);
        return;
      }

      // Fired only once the application is actually stored, so the count in
      // Analytics is applications received rather than attempts made. The old
      // event was called application_start because the mailto handoff was the
      // furthest it could honestly claim; this one can say submit.
      window.dataLayer = window.dataLayer || [];
      const email = String(data.get("email") || "").trim().toLowerCase();
      window.dataLayer.push({
        event: "application_submit",
        form_location: window.location.pathname,
        form_name: `${type}_application`,
        // Omitted entirely when blank: an empty string matches nothing and only
        // pollutes the enhanced-conversions match rate.
        ...(email ? { user_data: { email_address: email } } : {}),
      });

      setSent(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className={styles.form} role="status" aria-live="polite">
        <div className={styles.formDone}>
          <h3>{DONE[type].heading}</h3>
          <p>{DONE[type].body}</p>
          <p className={styles.formDoneSignoff}>
            Best Wishes,
            <br />
            The Adhiroha Team
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      {FIELDS[type].map(([name, label, fieldType, wide]) => (
        <div className={`${styles.field}${wide ? ` ${styles.fieldWide}` : ""}`} key={name}>
          <label htmlFor={`${type}-${name}`}>{label}</label>
          {fieldType === "textarea" ? <textarea id={`${type}-${name}`} name={name} required rows="4" /> : <input id={`${type}-${name}`} name={name} type={fieldType} required />}
        </div>
      ))}
      <div className={styles.field}>
        <label htmlFor={`${type}-image`}>Your image (JPG or PNG, up to 2 MB)</label>
        <input id={`${type}-image`} name="image" type="file" accept="image/jpeg,image/png" required />
      </div>
      <div className={styles.field}>
        <label htmlFor={`${type}-resume`}>Upload your resume (PDF only, up to 4 MB)</label>
        <input id={`${type}-resume`} name="resume" type="file" accept="application/pdf" required />
      </div>
      <div className={styles.formFooter}>
        <div>
          <p className={styles.formNote}>
            Your application and files are sent straight to our team. Nothing is shared with anyone else.
          </p>
          {error && <p className={styles.formStatus} role="alert">{error}</p>}
        </div>
        <button className={styles.submit} type="submit" disabled={busy}>
          {busy ? "Sending…" : "Submit application"}
        </button>
      </div>
    </form>
  );
}
