import nodemailer from "nodemailer";
import { query } from "./db";

/**
 * Sending, and the record of what was sent.
 *
 * Every email the panel sends — sequence or hand-written — goes through here,
 * so `crm_email_log` is a complete history rather than a partial one. A failure
 * is logged too: a lead whose mail bounced needs to be visible in the panel,
 * not silently skipped.
 */

let transporter = null;

function mailer() {
  if (transporter) return transporter;
  const pass = process.env.SMTP_PASS;
  if (!pass) throw new Error("SMTP_PASS is not set — the panel cannot send email");
  const port = Number(process.env.SMTP_PORT || 465);
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER || "info@adhiroha.com", pass },
    // The cron can send a run of emails in one go; one connection for all of
    // them is both faster and much less likely to trip Gmail's rate limits.
    pool: true,
    maxConnections: 1,
    maxMessages: 50,
  });
  return transporter;
}

const FROM = () => `Adhiroha Yoga School <${process.env.SMTP_USER || "info@adhiroha.com"}>`;

/** Crude but adequate HTML→text, so the multipart alternative is not empty. */
function toText(html) {
  return String(html)
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "$2 ($1)")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&middot;/g, "·")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Sends one email and records it.
 *
 * `step` is 1-4 for a sequence email and 0 for one a person typed. The database
 * has a unique index on (l_id, step) for sequence emails, so if a cron run
 * crashes half way and is retried, the duplicate insert fails and the email is
 * not sent twice — the log is what enforces that, not the caller's care.
 */
export async function sendAndLog({ lead, step = 0, subject, html, sentBy = "system" }) {
  const to = String(lead.l_email || "").trim();
  if (!to) throw new Error("lead has no email address");

  // Claim the slot first. If this row already exists the send is a duplicate
  // and must not happen at all.
  if (step > 0) {
    try {
      await query(
        "INSERT INTO `crm_email_log` (`l_id`,`step`,`to_email`,`subject`,`body`,`status`,`sent_by`,`sent_at`) VALUES (?,?,?,?,?,'sent',?,NOW())",
        [lead.l_id, step, to, subject, html, sentBy]
      );
    } catch (err) {
      if (err && err.code === "ER_DUP_ENTRY") {
        return { ok: true, skipped: true, reason: "already sent" };
      }
      throw err;
    }
  }

  try {
    const info = await mailer().sendMail({
      from: FROM(),
      to,
      subject,
      html,
      text: toText(html),
      replyTo: process.env.SMTP_USER || "info@adhiroha.com",
    });

    if (step > 0) {
      await query("UPDATE `crm_email_log` SET `message_id` = ? WHERE `l_id` = ? AND `step` = ? AND `status` = 'sent'", [
        info.messageId || null, lead.l_id, step,
      ]);
    } else {
      await query(
        "INSERT INTO `crm_email_log` (`l_id`,`step`,`to_email`,`subject`,`body`,`status`,`message_id`,`sent_by`,`sent_at`) VALUES (?,0,?,?,?,'sent',?,?,NOW())",
        [lead.l_id, to, subject, html, info.messageId || null, sentBy]
      );
    }
    return { ok: true, messageId: info.messageId };
  } catch (err) {
    const message = String(err?.message || err).slice(0, 500);
    // The claimed row would otherwise say "sent" for an email that never left.
    if (step > 0) {
      await query("DELETE FROM `crm_email_log` WHERE `l_id` = ? AND `step` = ? AND `status` = 'sent'", [lead.l_id, step]).catch(() => {});
    }
    await query(
      "INSERT INTO `crm_email_log` (`l_id`,`step`,`to_email`,`subject`,`body`,`status`,`error`,`sent_by`,`sent_at`) VALUES (?,?,?,?,?,'failed',?,?,NOW())",
      [lead.l_id, step, to, subject, html, message, sentBy]
    ).catch(() => {});
    return { ok: false, error: message };
  }
}
