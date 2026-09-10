import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { query } from "@/lib/crm/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Volunteer and yoga-teacher applications.
 *
 * These two forms used to open the visitor's own mail client with the answers
 * pasted into the body, and ask them to attach their photo and CV by hand.
 * Anyone on a phone, or using webmail with no mail client set up, dropped out
 * there — and because nothing ever reached a server, none of it was recorded
 * and nobody could tell how many were lost.
 *
 * Now the row is written to `applications` (see applications.sql) first, and
 * the email is sent afterwards as a notification. That order is the point: the
 * application is safe before anything that can fail is attempted, so a bad SMTP
 * password costs a notification rather than a candidate.
 */

/* The two forms, and what each one is allowed to send. Anything not listed here
   is ignored rather than trusted — the column list is not driven by the request
   body. */
const FORMS = {
  volunteer: {
    title: "Volunteer opportunity application",
    fields: ["fullName", "whatsApp", "email", "country", "skills", "experience", "availableFrom", "duration"],
  },
  teacher: {
    title: "Yoga teacher role application",
    fields: ["fullName", "whatsApp", "email", "country", "styles", "experience", "certification", "philosophy"],
  },
};

const COLUMN = {
  fullName: "full_name", whatsApp: "whatsapp", email: "email", country: "country",
  skills: "skills", experience: "experience", availableFrom: "available_from",
  duration: "duration", styles: "styles", certification: "certification",
  philosophy: "philosophy",
};

const LABEL = {
  fullName: "Full name", whatsApp: "WhatsApp number", email: "Email address",
  country: "Country / nationality", skills: "Skills", experience: "Experience",
  availableFrom: "Available from", duration: "Duration", styles: "Styles of yoga taught",
  certification: "Yoga certification", philosophy: "Teaching philosophy",
};

/* Caps are deliberately modest. MySQL rejects any statement larger than
   max_allowed_packet, which on shared hosting is often 4 MB, and these files go
   into the row itself. A photo and a CV fit comfortably inside these. */
const LIMITS = {
  photo:  { bytes: 2 * 1024 * 1024, types: ["image/jpeg", "image/png"], label: "photo", say: "a JPG or PNG under 2 MB" },
  resume: { bytes: 4 * 1024 * 1024, types: ["application/pdf"],         label: "resume", say: "a PDF under 4 MB" },
};

async function readFile(value, spec) {
  if (!value || typeof value.arrayBuffer !== "function" || !value.name) return { ok: true, file: null };
  if (value.size === 0) return { ok: true, file: null };
  if (value.size > spec.bytes) return { ok: false, error: `Your ${spec.label} is too large. Please upload ${spec.say}.` };
  if (spec.types.length && !spec.types.includes(value.type)) {
    return { ok: false, error: `That ${spec.label} is not a supported file type. Please upload ${spec.say}.` };
  }
  return {
    ok: true,
    file: {
      name: String(value.name).slice(0, 255),
      type: String(value.type || "").slice(0, 100),
      buffer: Buffer.from(await value.arrayBuffer()),
    },
  };
}

export async function POST(request) {
  let form;
  try {
    form = await request.formData();
  } catch {
    // Almost always an upload larger than the server will accept, which arrives
    // as a broken body rather than as a readable size.
    return NextResponse.json(
      { error: "We could not read that upload. Please try again with a smaller photo and resume." },
      { status: 400 }
    );
  }

  const type = String(form.get("type") || "").trim();
  const spec = FORMS[type];
  if (!spec) return NextResponse.json({ error: "Unknown application form." }, { status: 400 });

  const value = (k) => String(form.get(k) ?? "").trim();
  const fullName = value("fullName");
  const email = value("email");

  if (!fullName || !email) {
    return NextResponse.json({ error: "Please fill in your name and email address." }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const photo = await readFile(form.get("image"), LIMITS.photo);
  if (!photo.ok) return NextResponse.json({ error: photo.error }, { status: 400 });
  const resume = await readFile(form.get("resume"), LIMITS.resume);
  if (!resume.ok) return NextResponse.json({ error: resume.error }, { status: 400 });

  /* ------------------------------------------------------------- the record */

  const columns = ["type", "page_path"];
  const values = [type, value("pagePath").slice(0, 255) || null];

  for (const field of spec.fields) {
    const col = COLUMN[field];
    if (!col) continue;
    let v = value(field);
    // An empty date is NULL, not "", which MySQL would store as 0000-00-00.
    if (col === "available_from") v = /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null;
    columns.push(col);
    values.push(v === "" ? null : v);
  }
  for (const [key, f] of [["photo", photo.file], ["resume", resume.file]]) {
    if (!f) continue;
    columns.push(`${key}_name`, `${key}_type`, key);
    values.push(f.name, f.type, f.buffer);
  }

  let id;
  try {
    const result = await query(
      `INSERT INTO \`applications\` (${columns.map((c) => `\`${c}\``).join(",")}) ` +
        `VALUES (${columns.map(() => "?").join(",")})`,
      values
    );
    id = result?.insertId;
  } catch (err) {
    console.error("application insert:", err?.code || "", err?.message || err);
    if (err?.code === "ER_NO_SUCH_TABLE") {
      return NextResponse.json(
        { error: "The application form is not finished being set up yet. Please email info@adhiroha.com." },
        { status: 503 }
      );
    }
    // Never tell someone their application went through when it did not.
    return NextResponse.json(
      { error: "We could not save your application just now. Please try again, or email info@adhiroha.com." },
      { status: 500 }
    );
  }

  /* ------------------------------------------------- the notification email */

  // Best effort, and only after the row exists. A failure here is recorded on
  // the row and reported to nobody: the application is already safe.
  let mailed = false;
  const pass = process.env.SMTP_PASS;
  if (pass) {
    try {
      const port = Number(process.env.SMTP_PORT || 465);
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port,
        secure: port === 465,
        auth: { user: process.env.SMTP_USER || "info@adhiroha.com", pass },
      });
      const esc = (s) => String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
      const rows = spec.fields
        .map((f) => (value(f) ? `<tr><td style="padding:4px 14px 4px 0;color:#8a8078"><b>${esc(LABEL[f] || f)}</b></td><td>${esc(value(f))}</td></tr>` : ""))
        .join("");
      await transporter.sendMail({
        from: `"Adhiroha website" <${process.env.SMTP_USER || "info@adhiroha.com"}>`,
        to: process.env.CONTACT_TO || "info@adhiroha.com",
        replyTo: email,
        subject: `${spec.title} — ${fullName}`,
        html:
          `<h2 style="font-family:sans-serif;color:#2c2723">${esc(spec.title)}</h2>` +
          `<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>` +
          `<p style="font-family:sans-serif;font-size:12px;color:#8a8078">Saved as application #${id}. ` +
          `The photo and resume are attached, and are also stored with the record.</p>`,
        attachments: [
          photo.file && { filename: photo.file.name, content: photo.file.buffer },
          resume.file && { filename: resume.file.name, content: resume.file.buffer },
        ].filter(Boolean),
      });
      mailed = true;
      await query("UPDATE `applications` SET `mail_sent` = 1 WHERE `id` = ?", [id]).catch(() => {});
    } catch (err) {
      console.error("application mail:", err?.message || err);
    }
  }

  return NextResponse.json({ ok: true, id, mailed });
}
