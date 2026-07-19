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

const TITLES = { volunteer: "Volunteer opportunity application", teacher: "Yoga teacher role application" };

export default function ApplicationForm({ type }) {
  const [status, setStatus] = useState("");
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = FIELDS[type].map(([name, label]) => `${label}: ${data.get(name) || ""}`);
    const image = data.get("image");
    const resume = data.get("resume");
    if (image?.name) lines.push(`Image selected: ${image.name}`);
    if (resume?.name) lines.push(`Resume selected: ${resume.name}`);
    lines.push("\nPlease attach the selected image and resume to this email before sending.");
    setStatus("Your email app is opening. Please attach the selected files before sending your application.");
    window.location.href = `mailto:info@adhiroha.com?subject=${encodeURIComponent(TITLES[type])}&body=${encodeURIComponent(lines.join("\n"))}`;
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
        <label htmlFor={`${type}-image`}>Your image (JPG or PNG)</label>
        <input id={`${type}-image`} name="image" type="file" accept="image/jpeg,image/png" required />
      </div>
      <div className={styles.field}>
        <label htmlFor={`${type}-resume`}>Upload your resume (PDF only)</label>
        <input id={`${type}-resume`} name="resume" type="file" accept="application/pdf" required />
      </div>
      <div className={styles.formFooter}>
        <div>
          <p className={styles.formNote}>Your application is prepared in an email to our team. Files are attached from your email app for your privacy.</p>
          {status && <p className={styles.formStatus} role="status">{status}</p>}
        </div>
        <button className={styles.submit} type="submit">Continue by email</button>
      </div>
    </form>
  );
}
