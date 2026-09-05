"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Everything about one lead: their details, where the sequence has got to, the
 * full history of what was sent, the notes, and a box to write to them.
 *
 * A drawer rather than a separate page so the list stays where it was — going
 * through a day's leads means opening and closing a lot of these.
 */

const STAGES = ["fresh", "contacted", "replied", "interested", "booked", "not interested", "cold"];

function when(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default function LeadDrawer({ id, onClose, onChanged, say }) {
  const [data, setData] = useState(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [stage, setStage] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    const res = await fetch(`/api/leads-panel/lead/${id}/`);
    if (!res.ok) { say("Could not open that lead.", true); onClose(); return; }
    const d = await res.json();
    setData(d);
    setNote(d.lead?.lead_note && d.lead.lead_note !== "Not Available" ? d.lead.lead_note : "");
    setStage(d.lead?.l_stage || "fresh");
  }, [id, onClose, say]);

  useEffect(() => { load(); }, [load]);

  // Escape closes, the way every drawer should.
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function patch(payload, okMessage) {
    setBusy(true);
    try {
      const res = await fetch(`/api/leads-panel/lead/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (d.ok) { say(okMessage); await load(); onChanged(); }
      else say(d.message || "That did not work.", true);
    } catch { say("That did not work.", true); }
    setBusy(false);
  }

  async function sendMail(template = null) {
    setBusy(true);
    try {
      const res = await fetch("/api/leads-panel/send/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          template ? { l_id: id, template } : { l_id: id, subject, html: message }
        ),
      });
      const d = await res.json();
      if (d.ok) {
        say("Email sent.");
        setSubject(""); setMessage("");
        await load(); onChanged();
      } else say(d.message || "The email did not send.", true);
    } catch { say("The email did not send.", true); }
    setBusy(false);
  }

  if (!data) {
    return (
      <>
        <div className="cd-scrim" onClick={onClose} />
        <aside className="cd"><div className="cd-scroll">Loading…</div></aside>
      </>
    );
  }

  const { lead, state, emails, sequence } = data;
  const status = state?.status || "new";

  return (
    <>
      <div className="cd-scrim" onClick={onClose} />
      <aside className="cd" role="dialog" aria-label="Lead details">
        <div className="cd-head">
          <div>
            <h2>{lead.l_name || "Unnamed lead"}</h2>
            <div className="meta">
              <a href={`mailto:${lead.l_email}`}>{lead.l_email}</a>
              {lead.l_phone ? ` · ${lead.l_phone}` : ""}
            </div>
          </div>
          <button className="cd-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="cd-scroll">
          <div className="cd-block">
            <h3>Follow-up</h3>
            <dl className="cd-kv">
              <dt>Status</dt><dd><span className={`pill ${status}`}>{status}</span></dd>
              <dt>Progress</dt><dd>{state ? `${state.step} of 4 sent` : "Not started"}</dd>
              <dt>Next due</dt><dd>{when(state?.next_due)}</dd>
              {state?.replied_at ? (<><dt>Replied</dt><dd>{when(state.replied_at)}</dd></>) : null}
              {state?.reply_snippet ? (<><dt>Their reply</dt><dd>{state.reply_snippet}</dd></>) : null}
              {state?.last_error ? (<><dt>Last error</dt><dd style={{ color: "var(--red)" }}>{state.last_error}</dd></>) : null}
            </dl>
            <div className="cd-actions" style={{ marginTop: 12 }}>
              {!state ? (
                <button className="btn sm primary" disabled={busy} onClick={() => patch({ action: "start" }, "Sequence started.")}>Start sequence</button>
              ) : null}
              {status === "active" ? (
                <>
                  <button className="btn sm" disabled={busy} onClick={() => patch({ action: "send_now" }, "Next email queued — it goes on the next run.")}>Send next now</button>
                  <button className="btn sm" disabled={busy} onClick={() => patch({ action: "stop" }, "Sequence stopped.")}>Stop</button>
                </>
              ) : null}
              {status === "stopped" || status === "done" ? (
                <button className="btn sm" disabled={busy} onClick={() => patch({ action: "resume" }, "Sequence resumed.")}>Resume</button>
              ) : null}
              {status !== "replied" ? (
                <button className="btn sm" disabled={busy} onClick={() => patch({ action: "mark_replied" }, "Marked as replied — sequence stopped.")}>Mark replied</button>
              ) : null}
            </div>
          </div>

          <div className="cd-block">
            <h3>Enquiry</h3>
            <dl className="cd-kv">
              <dt>Received</dt><dd>{lead.l_date || "—"}</dd>
              <dt>Country</dt><dd>{lead.l_country || "—"}</dd>
              <dt>Source</dt><dd>{lead.l_source || "—"}</dd>
              <dt>Reference</dt><dd>{lead.l_code || "—"}</dd>
            </dl>
            {lead.l_message ? (
              <div className="cd-msg" style={{ marginTop: 11 }}
                   dangerouslySetInnerHTML={{ __html: String(lead.l_message).replace(/<(?!br\s*\/?>)[^>]*>/gi, "") }} />
            ) : null}
          </div>

          <div className="cd-block">
            <h3>Stage &amp; notes</h3>
            <div className="cd-row">
              <select value={stage} onChange={(e) => setStage(e.target.value)}>
                {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button className="btn" disabled={busy} onClick={() => patch({ l_stage: stage, lead_note: note }, "Saved.")}>Save</button>
            </div>
            <textarea
              className="cd-note"
              placeholder="What was said, what they want, when to call back…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{ minHeight: 90 }}
            />
          </div>

          <div className="cd-block">
            <h3>History</h3>
            {emails.length ? (
              <ul className="tl">
                {emails.map((e) => (
                  <li key={e.id} className={e.status === "failed" ? "failed" : ""}>
                    <div className="t-sub">{e.subject}</div>
                    <div className="t-meta">
                      {e.step > 0 ? `Sequence ${e.step}/4` : `By ${e.sent_by}`} · {when(e.sent_at)}
                      {e.status === "failed" ? " · failed" : ""}
                    </div>
                    {e.error ? <div className="t-err">{e.error}</div> : null}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="cp-sub">Nothing sent yet.</div>
            )}
          </div>

          <div className="cd-block">
            <h3>Write to them</h3>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{ marginBottom: 8 }}
            />
            <textarea
              placeholder="Type the message. Plain text is fine — paragraphs are kept."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="cd-actions" style={{ marginTop: 10 }}>
              <button className="btn primary" disabled={busy || !subject.trim() || !message.trim()} onClick={() => sendMail()}>
                Send email
              </button>
              {sequence.map((s) => (
                <button key={s.step} className="btn sm" disabled={busy} onClick={() => sendMail(s.step)} title={s.subject}>
                  Send template {s.step}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
