import { query, one, LEAD_DATE } from "./db";
import { SEQUENCE, SEQUENCE_ENDS_AFTER_DAYS, renderStep, stepDefinition } from "./templates";
import { sendAndLog } from "./mailer";

/**
 * The follow-up engine.
 *
 * A lead's position in the sequence lives in `crm_lead_state`. The rules:
 *
 *   · A new lead is enrolled at step 0, due immediately.
 *   · Each run sends whatever is due, advances the step and sets the next date.
 *   · A reply, a manual stop, or a hard bounce ends it.
 *   · Fourteen days after the first email it ends anyway, as 'done'.
 *
 * Nothing here decides *when* it runs — that is the cron route's job. This
 * module is written so that running it twice in the same minute is harmless:
 * the send is guarded by a unique index, and the state update is conditional on
 * the step it expected to find.
 *
 * ---------------------------------------------------------------------------
 * Every timestamp is written and compared by MySQL, never by Node.
 *
 * That is not a style choice. The first version generated `next_due` in
 * JavaScript and compared it against MySQL's NOW(), and on a machine where Node
 * ran in IST while the database ran in UTC the two were 5½ hours apart — so
 * `next_due <= NOW()` was false for five and a half hours and no follow-up was
 * ever sent on time. It failed silently: nothing errored, the emails were just
 * late, by however far apart the two clocks happened to be. Hostinger's Node
 * process and its MySQL server are not guaranteed to agree either, so the only
 * safe answer is that one clock decides, and it is the database's.
 * ---------------------------------------------------------------------------
 */

/** Puts a lead into the sequence. Safe to call twice — the second is a no-op. */
export async function enroll(lId, { startNow = true } = {}) {
  await query(
    `INSERT IGNORE INTO \`crm_lead_state\` (\`l_id\`,\`step\`,\`next_due\`,\`status\`)
     VALUES (?, 0, ${startNow ? "NOW()" : "NULL"}, 'active')`,
    [lId]
  );
}

/**
 * Enrols every lead that has never been seen by the CRM.
 *
 * This is what picks up leads the moment they arrive even if the lead route's
 * own enrolment failed — and it is also the backfill for leads captured before
 * this panel existed. `sinceDays` keeps that backfill from mailing somebody who
 * enquired months ago on the day the panel goes live.
 */
export async function enrolNewLeads({ sinceDays = 3 } = {}) {
  const rows = await query(
    `SELECT l.\`l_id\` FROM \`leads\` l
      LEFT JOIN \`crm_lead_state\` s ON s.\`l_id\` = l.\`l_id\`
      WHERE s.\`l_id\` IS NULL
        AND l.\`l_email\` <> ''
        AND ${LEAD_DATE} >= DATE_SUB(NOW(), INTERVAL ? DAY)`,
    [sinceDays]
  );
  for (const r of rows) await enroll(r.l_id);
  return rows.length;
}

export async function stateOf(lId) {
  return one("SELECT * FROM `crm_lead_state` WHERE `l_id` = ?", [lId]);
}

export async function setStatus(lId, status) {
  await query("UPDATE `crm_lead_state` SET `status` = ?, `next_due` = NULL WHERE `l_id` = ?", [status, lId]);
}

/** Restarts a stopped or finished sequence from wherever it left off. */
export async function resume(lId) {
  await query(
    "UPDATE `crm_lead_state` SET `status` = 'active', `next_due` = NOW() WHERE `l_id` = ? AND `status` IN ('stopped','done')",
    [lId]
  );
}

/** Brings the next follow-up forward so the next run picks it up. */
export async function dueNow(lId) {
  await query("UPDATE `crm_lead_state` SET `next_due` = NOW(), `status` = 'active' WHERE `l_id` = ?", [lId]);
}

/**
 * Sends every follow-up that is due.
 *
 * `limit` caps one run so a backlog is spread over several runs rather than
 * dumped into Gmail in one burst, which is the quickest way to get a sending
 * domain throttled.
 */
export async function runDue({ limit = 25 } = {}) {
  const due = await query(
    `SELECT s.\`step\` AS seq_step, s.\`status\` AS seq_status, l.*,
            (SELECT MIN(e.\`sent_at\`) FROM \`crm_email_log\` e
              WHERE e.\`l_id\` = l.\`l_id\` AND e.\`step\` > 0 AND e.\`status\` = 'sent') AS first_sent_at,
            (SELECT MIN(e.\`sent_at\`) < DATE_SUB(NOW(), INTERVAL ${Number(SEQUENCE_ENDS_AFTER_DAYS)} DAY)
               FROM \`crm_email_log\` e
              WHERE e.\`l_id\` = l.\`l_id\` AND e.\`step\` > 0 AND e.\`status\` = 'sent') AS expired
       FROM \`crm_lead_state\` s
       JOIN \`leads\` l ON l.\`l_id\` = s.\`l_id\`
      WHERE s.\`status\` = 'active'
        AND s.\`next_due\` IS NOT NULL
        AND s.\`next_due\` <= NOW()
        AND l.\`l_email\` <> ''
      ORDER BY s.\`next_due\` ASC
      LIMIT ?`,
    [limit]
  );

  const result = { considered: due.length, sent: 0, finished: 0, failed: 0, details: [] };

  for (const row of due) {
    const nextStep = row.seq_step + 1;
    const def = stepDefinition(nextStep);

    // Past the last email, or past the fourteen-day window: the sequence is over.
    if (!def || row.expired) {
      await query("UPDATE `crm_lead_state` SET `status` = 'done', `next_due` = NULL WHERE `l_id` = ?", [row.l_id]);
      result.finished++;
      continue;
    }

    const { subject, html } = renderStep(nextStep, row);
    const sent = await sendAndLog({ lead: row, step: nextStep, subject, html, sentBy: "sequence" });

    if (sent.ok) {
      const following = stepDefinition(nextStep + 1);
      // The gap between this email and the next, as the templates define it.
      const gap = following ? following.delayDays - def.delayDays : null;
      await query(
        `UPDATE \`crm_lead_state\`
            SET \`step\` = ?,
                \`next_due\` = ${gap === null ? "NULL" : "DATE_ADD(NOW(), INTERVAL ? DAY)"},
                \`status\` = ?,
                \`last_error\` = NULL
          WHERE \`l_id\` = ? AND \`step\` = ?`,
        gap === null
          ? [nextStep, following ? "active" : "done", row.l_id, row.seq_step]
          : [nextStep, gap, "active", row.l_id, row.seq_step]
      );
      // Mirror the next contact date onto the lead row the old PHP panel reads,
      // so both views agree about when this person is next being written to.
      await query(
        `UPDATE \`leads\` SET \`follow_date\` =
           ${gap === null ? "'Not Available'" : "DATE_FORMAT(DATE_ADD(NOW(), INTERVAL ? DAY), '%Y-%m-%d')"}
         WHERE \`l_id\` = ?`,
        gap === null ? [row.l_id] : [gap, row.l_id]
      ).catch(() => {});
      result.sent++;
      result.details.push({ l_id: row.l_id, step: nextStep, to: row.l_email });
    } else {
      // Try again tomorrow rather than burning the step. A permanent failure
      // keeps failing and stays visible in the log and on the lead.
      await query(
        "UPDATE `crm_lead_state` SET `next_due` = DATE_ADD(NOW(), INTERVAL 1 DAY), `last_error` = ? WHERE `l_id` = ?",
        [sent.error, row.l_id]
      );
      result.failed++;
      result.details.push({ l_id: row.l_id, step: nextStep, error: sent.error });
    }
  }

  return result;
}

/** Marks a lead as having replied, which takes it out of the sequence. */
export async function markReplied(lId, { snippet = null, at = null } = {}) {
  await query(
    `UPDATE \`crm_lead_state\`
        SET \`status\` = 'replied', \`next_due\` = NULL,
            \`replied_at\` = ${at ? "?" : "NOW()"},
            \`reply_snippet\` = ?
      WHERE \`l_id\` = ? AND \`status\` <> 'replied'`,
    at ? [at, snippet, lId] : [snippet, lId]
  );
  await query("UPDATE `leads` SET `l_stage` = 'replied' WHERE `l_id` = ?", [lId]).catch(() => {});
}

export { SEQUENCE };
