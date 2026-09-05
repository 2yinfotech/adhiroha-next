import { NextResponse } from "next/server";
import { requireUser } from "@/lib/crm/auth";
import { query, one } from "@/lib/crm/db";
import { enroll, setStatus, resume, dueNow, markReplied, stateOf } from "@/lib/crm/sequence";
import { SEQUENCE } from "@/lib/crm/templates";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const guard = async () => {
  try {
    return await requireUser();
  } catch {
    return null;
  }
};

/** One lead, with its sequence state and the full history of what was sent. */
export async function GET(_request, { params }) {
  if (!(await guard())) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await params;

  const lead = await one("SELECT * FROM `leads` WHERE `l_id` = ?", [id]);
  if (!lead) return NextResponse.json({ ok: false, message: "No such lead" }, { status: 404 });

  const state = await stateOf(id);
  const emails = await query(
    "SELECT `id`,`step`,`to_email`,`subject`,`status`,`error`,`sent_by`,`sent_at` FROM `crm_email_log` WHERE `l_id` = ? ORDER BY `sent_at` ASC, `id` ASC",
    [id]
  );

  return NextResponse.json({
    ok: true,
    lead,
    state,
    emails,
    sequence: SEQUENCE.map((s) => ({ step: s.step, delayDays: s.delayDays, subject: s.subject(lead) })),
  });
}

/**
 * Edits a lead, or moves its sequence.
 *
 * The three lead columns writable here — stage, note and follow-up date — are
 * the ones the old PHP panel has always used for exactly this, so both views
 * stay in agreement. Nothing else on `leads` is touched.
 */
export async function PATCH(request, { params }) {
  const user = await guard();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });

  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  const lead = await one("SELECT `l_id` FROM `leads` WHERE `l_id` = ?", [id]);
  if (!lead) return NextResponse.json({ ok: false, message: "No such lead" }, { status: 404 });

  const sets = [];
  const vals = [];
  if (typeof body.l_stage === "string") { sets.push("`l_stage` = ?"); vals.push(body.l_stage.slice(0, 255)); }
  if (typeof body.lead_note === "string") { sets.push("`lead_note` = ?"); vals.push(body.lead_note.slice(0, 5000)); }
  if (typeof body.follow_date === "string") { sets.push("`follow_date` = ?"); vals.push(body.follow_date.slice(0, 255)); }
  if (sets.length) {
    await query(`UPDATE \`leads\` SET ${sets.join(", ")} WHERE \`l_id\` = ?`, [...vals, id]);
  }

  switch (body.action) {
    case "stop":
      await setStatus(id, "stopped");
      break;
    case "resume":
      await enroll(id, { startNow: false });
      await resume(id);
      break;
    case "start":
      await enroll(id);
      break;
    case "mark_replied":
      await markReplied(id, { snippet: "Marked by " + user.u });
      break;
    case "send_now":
      // Bring the next follow-up forward so the cron picks it up on its next run.
      await dueNow(id);
      break;
    default:
      break;
  }

  return NextResponse.json({ ok: true });
}
