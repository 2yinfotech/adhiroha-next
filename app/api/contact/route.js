import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Contact-form endpoint. Every contact form on the site POSTs here; the message
// is emailed to the ashram inbox over Gmail SMTP. Credentials come from env vars
// (see .env.example) so the app password is never committed.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email and message." },
      { status: 400 }
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER || "info@adhiroha.com";
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO || "info@adhiroha.com";

  if (!pass) {
    return NextResponse.json(
      {
        error: "mail_not_configured",
        message: "Set SMTP_PASS on the server to enable the contact form.",
      },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // SSL for 465, STARTTLS otherwise
    auth: { user, pass },
  });

  const esc = (s) =>
    String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
  const html = `
    <h2 style="font-family:sans-serif;color:#2c2723">New enquiry from the Adhiroha website</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      <tr><td style="padding:4px 12px 4px 0;color:#8a8078"><b>Name</b></td><td>${esc(name)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#8a8078"><b>Email</b></td><td>${esc(email)}</td></tr>
      ${phone ? `<tr><td style="padding:4px 12px 4px 0;color:#8a8078"><b>Phone</b></td><td>${esc(phone)}</td></tr>` : ""}
    </table>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px">${esc(message)}</p>`;

  try {
    await transporter.sendMail({
      from: `"Adhiroha Website" <${user}>`,
      to,
      replyTo: email,
      subject: `New website enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\n\nMessage:\n${message}`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: "send_failed", message: String(e?.message || e) },
      { status: 502 }
    );
  }
}
