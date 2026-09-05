import { NextResponse } from "next/server";
import { requireUser } from "@/lib/crm/auth";
import { one } from "@/lib/crm/db";
import { sendAndLog } from "@/lib/crm/mailer";
import { renderStep } from "@/lib/crm/templates";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Sends an email a person typed in the panel, or a sequence template on demand.
 *
 * Logged as step 0 so it never collides with the sequence's own numbering and
 * can never be mistaken for one of the four automated emails.
 */
export async function POST(request) {
  let user;
  try {
    user = await requireUser();
  } catch {
    return NextResponse.json({ ok: false, message: "Not signed in" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const lead = await one("SELECT * FROM `leads` WHERE `l_id` = ?", [body.l_id]);
  if (!lead) return NextResponse.json({ ok: false, message: "No such lead" }, { status: 404 });
  if (!lead.l_email) return NextResponse.json({ ok: false, message: "This lead has no email address" }, { status: 400 });

  let subject = String(body.subject || "").trim();
  let html = String(body.html || "").trim();

  // "Send template N" — render one of the sequence emails for this lead so the
  // wording is identical to what the automation would have sent.
  if (body.template) {
    const rendered = renderStep(Number(body.template), lead);
    if (!rendered) return NextResponse.json({ ok: false, message: "No such template" }, { status: 400 });
    subject = rendered.subject;
    html = rendered.html;
  } else if (html && !/<[a-z][\s\S]*>/i.test(html)) {
    // Typed as plain text in the panel; keep the line breaks the writer made.
    html = html.split(/\n{2,}/).map((para) =>
      `<p style="margin:0 0 14px">${para.replace(/\n/g, "<br>")}</p>`
    ).join("");
  }

  if (!subject || !html) {
    return NextResponse.json({ ok: false, message: "A subject and a message are both needed" }, { status: 400 });
  }

  const sent = await sendAndLog({ lead, step: 0, subject, html, sentBy: user.u || "panel" });
  if (!sent.ok) return NextResponse.json({ ok: false, message: sent.error }, { status: 502 });
  return NextResponse.json({ ok: true });
}
