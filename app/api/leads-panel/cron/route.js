import { NextResponse } from "next/server";
import crypto from "crypto";
import { currentUser } from "@/lib/crm/auth";
import { enrolNewLeads, runDue } from "@/lib/crm/sequence";
import { scanForReplies } from "@/lib/crm/imap";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
// The IMAP scan and a run of sends can take a while; well under Hostinger's
// limit, but far beyond the default.
export const maxDuration = 120;

/**
 * The heartbeat. Everything automatic happens here and nowhere else.
 *
 * Three steps, deliberately in this order:
 *
 *   1. Scan the mailbox for replies. Anyone who has written in comes out of the
 *      sequence *before* step 2 can send them another email — the opposite
 *      order would mail somebody a follow-up minutes after they replied, which
 *      is exactly the thing that makes automated sequences feel robotic.
 *   2. Enrol leads that arrived since the last run.
 *   3. Send whatever is now due.
 *
 * Called two ways: by a scheduler with `?key=CRM_CRON_SECRET`, or by a signed-in
 * person pressing "Run now" in the panel. Nothing else can trigger it.
 */
export async function GET(request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key") || "";
  const secret = process.env.CRM_CRON_SECRET || "";

  const byKey =
    secret &&
    key.length === secret.length &&
    crypto.timingSafeEqual(Buffer.from(key), Buffer.from(secret));

  if (!byKey && !(await currentUser())) {
    return NextResponse.json({ ok: false, message: "Not authorised" }, { status: 401 });
  }

  const started = Date.now();
  const report = { ok: true, ranAt: new Date().toISOString() };

  // 1 — replies first, so nobody is followed up after they have answered.
  try {
    report.replies = await scanForReplies();
  } catch (err) {
    report.replies = { error: String(err?.message || err).slice(0, 300) };
  }

  // 2 — pick up anything new.
  try {
    report.enrolled = await enrolNewLeads();
  } catch (err) {
    report.enrolled = 0;
    report.enrolError = String(err?.message || err).slice(0, 300);
  }

  // 3 — send what is due.
  try {
    report.sequence = await runDue();
  } catch (err) {
    report.sequence = { error: String(err?.message || err).slice(0, 300) };
  }

  report.tookMs = Date.now() - started;
  return NextResponse.json(report);
}

export const POST = GET;
