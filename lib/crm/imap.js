import { ImapFlow } from "imapflow";
import { query } from "./db";
import { markReplied } from "./sequence";

/**
 * Reply detection.
 *
 * The panel cannot know a lead answered unless something reads the mailbox, so
 * this signs in to info@adhiroha.com over IMAP, looks at what has arrived
 * recently, and stops the sequence for anyone whose address appears as a
 * sender.
 *
 * Credentials are the SMTP ones — it is the same Google Workspace mailbox, and
 * the same app password works for IMAP. IMAP_HOST/PORT/USER/PASS override them
 * if the mailbox is ever moved somewhere else.
 *
 * Two things this is careful about:
 *
 *   · It only ever reads. No message is marked seen, moved or deleted, so a
 *     human working through the inbox sees exactly what they would have seen.
 *     `{ uid: true }` fetches without setting \Seen.
 *   · It matches on the envelope sender only. Matching on any address found in
 *     a message would let a forwarded thread, or a lead's address quoted inside
 *     someone else's email, silently cancel a live sequence.
 */

const config = () => ({
  host: process.env.IMAP_HOST || "imap.gmail.com",
  port: Number(process.env.IMAP_PORT || 993),
  secure: true,
  auth: {
    user: process.env.IMAP_USER || process.env.SMTP_USER || "info@adhiroha.com",
    pass: process.env.IMAP_PASS || process.env.SMTP_PASS,
  },
  logger: false,
});

/**
 * Scans the inbox and stops the sequence for every lead who has written in.
 *
 * `sinceDays` bounds the work: a sequence only runs for fourteen days, so
 * anything older than that cannot change a live one.
 */
export async function scanForReplies({ sinceDays = 21 } = {}) {
  const result = { checked: 0, matched: 0, replies: [], error: null };

  if (!config().auth.pass) {
    result.error = "No IMAP password set (SMTP_PASS or IMAP_PASS)";
    return result;
  }

  // Only leads whose sequence is still running can be stopped by a reply, so
  // that is the set to match against — a few dozen addresses, not the whole
  // leads table.
  const active = await query(
    `SELECT l.\`l_id\`, LOWER(TRIM(l.\`l_email\`)) AS email
       FROM \`crm_lead_state\` s
       JOIN \`leads\` l ON l.\`l_id\` = s.\`l_id\`
      WHERE s.\`status\` = 'active' AND l.\`l_email\` <> ''`
  );
  if (!active.length) return result;

  const byEmail = new Map(active.map((r) => [r.email, r.l_id]));

  let client;
  try {
    client = new ImapFlow(config());
    await client.connect();
    const lock = await client.getMailboxLock("INBOX");
    try {
      const since = new Date(Date.now() - sinceDays * 86400000);
      for await (const msg of client.fetch({ since }, { envelope: true, uid: true })) {
        result.checked++;
        const from = msg.envelope?.from?.[0]?.address;
        if (!from) continue;
        const lId = byEmail.get(String(from).toLowerCase().trim());
        if (!lId) continue;

        const snippet = String(msg.envelope?.subject || "").slice(0, 500);
        await markReplied(lId, {
          snippet: snippet || "(replied by email)",
          at: msg.envelope?.date ? new Date(msg.envelope.date) : null,
        });
        // Stop at the first reply per lead; the rest of their thread changes
        // nothing and would only overwrite the snippet with a later subject.
        byEmail.delete(String(from).toLowerCase().trim());
        result.matched++;
        result.replies.push({ l_id: lId, from, subject: snippet });
      }
    } finally {
      lock.release();
    }
  } catch (err) {
    result.error = String(err?.message || err).slice(0, 300);
  } finally {
    try { await client?.logout(); } catch { /* already gone */ }
  }

  return result;
}
