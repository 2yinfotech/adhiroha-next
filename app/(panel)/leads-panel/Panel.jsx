"use client";

import { useCallback, useEffect, useState } from "react";
import LeadDrawer from "./LeadDrawer";

/**
 * The panel: counts, a filterable list, and a drawer for whichever lead is open.
 *
 * The list is paged and filtered on the server — `leads` already holds thousands
 * of rows, so fetching it whole and filtering in the browser would get slower
 * every month.
 */

const STATUSES = [
  ["", "All"],
  ["new", "New"],
  ["active", "In sequence"],
  ["replied", "Replied"],
  ["done", "Finished"],
  ["stopped", "Stopped"],
];

/** `l_date` is dd-mm-yyyy HH:MM:SS, which no Date constructor parses. */
function prettyDate(value) {
  const m = String(value || "").match(/^(\d{2})-(\d{2})-(\d{4})/);
  if (!m) return value || "—";
  const d = new Date(`${m[3]}-${m[2]}-${m[1]}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  const today = new Date();
  const days = Math.floor((today.setHours(0, 0, 0, 0) - d.getTime()) / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function Panel({ user }) {
  const [rows, setRows] = useState([]);
  const [counts, setCounts] = useState({});
  const [today, setToday] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [flash, setFlash] = useState(null);
  const [running, setRunning] = useState(false);

  const say = useCallback((message, bad = false) => {
    setFlash({ message, bad });
    setTimeout(() => setFlash(null), 3800);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), per: "50" });
      if (q.trim()) params.set("q", q.trim());
      if (status) params.set("status", status);
      const res = await fetch(`/api/leads-panel/leads/?${params}`);
      if (res.status === 401) { window.location.reload(); return; }
      const data = await res.json();
      if (data.ok) {
        setRows(data.rows);
        setTotal(data.total);
        setCounts(data.counts || {});
        setToday(data.today || 0);
      }
    } catch {
      say("Could not load leads.", true);
    }
    setLoading(false);
  }, [page, q, status, say]);

  // Debounced so typing in the search box does not fire a query per keystroke.
  useEffect(() => {
    const t = setTimeout(load, q ? 300 : 0);
    return () => clearTimeout(t);
  }, [load, q]);

  async function runNow() {
    setRunning(true);
    try {
      const res = await fetch("/api/leads-panel/cron/", { method: "POST" });
      const data = await res.json();
      const sent = data?.sequence?.sent ?? 0;
      const replies = data?.replies?.matched ?? 0;
      const bits = [`${sent} email${sent === 1 ? "" : "s"} sent`];
      if (replies) bits.push(`${replies} repl${replies === 1 ? "y" : "ies"} found`);
      if (data?.replies?.error) bits.push(`inbox: ${data.replies.error}`);
      say(bits.join(" · "), Boolean(data?.replies?.error));
      load();
    } catch {
      say("The run failed.", true);
    }
    setRunning(false);
  }

  async function signOut() {
    await fetch("/api/leads-panel/logout/", { method: "POST" });
    window.location.reload();
  }

  const pages = Math.max(1, Math.ceil(total / 50));

  return (
    <>
      <header className="cp-top">
        <div className="cp-brand">Adhiroha <span>· Leads</span></div>
        <div className="spacer" />
        <button className="btn sm" onClick={runNow} disabled={running}>
          {running ? "Running…" : "Run follow-ups now"}
        </button>
        <span className="cp-who">{user.name}</span>
        <button className="btn sm" onClick={signOut}>Sign out</button>
      </header>

      <div className="cp-body">
        <div className="cp-stats">
          <div className="cp-stat" onClick={() => { setStatus(""); setPage(1); }}>
            <b>{total}</b><span>{status || q ? "Matching" : "All leads"}</span>
          </div>
          <div className="cp-stat"><b>{today}</b><span>Today</span></div>
          {STATUSES.slice(1).map(([key, label]) => (
            <div
              key={key}
              className={`cp-stat${status === key ? " on" : ""}`}
              onClick={() => { setStatus(status === key ? "" : key); setPage(1); }}
            >
              <b>{counts[key] ?? 0}</b><span>{label}</span>
            </div>
          ))}
        </div>

        <div className="cp-tools">
          <input
            className="grow"
            type="search"
            placeholder="Search name, email, phone, country or source…"
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
          />
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} style={{ width: "auto" }}>
            {STATUSES.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>
          <button className="btn" onClick={load} disabled={loading}>{loading ? "…" : "Refresh"}</button>
        </div>

        <div className="cp-table-wrap">
          {loading && !rows.length ? (
            <div className="cp-empty">Loading…</div>
          ) : !rows.length ? (
            <div className="cp-empty">No leads match that.</div>
          ) : (
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Lead</th><th>Country</th><th>Source</th>
                  <th>Received</th><th>Follow-up</th><th>Sent</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const st = r.crm_status || "new";
                  return (
                    <tr key={r.l_id} onClick={() => setOpenId(r.l_id)}>
                      <td>
                        <div className="cp-name">{r.l_name || "—"}</div>
                        <div className="cp-sub">{r.l_email}</div>
                      </td>
                      <td className="cp-nowrap">{r.l_country || "—"}</td>
                      <td className="cp-sub">{r.l_source || "—"}</td>
                      <td className="cp-nowrap cp-sub">{prettyDate(r.l_date)}</td>
                      <td className="cp-nowrap">
                        <span className={`pill ${st}`}>
                          {st === "active" ? `Step ${r.step || 0}/4` : st}
                        </span>
                      </td>
                      <td className="cp-nowrap cp-sub">{r.emails_sent || 0}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {pages > 1 ? (
          <div className="cp-pager">
            <button className="btn sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
            <span>Page {page} of {pages}</span>
            <button className="btn sm" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        ) : null}
      </div>

      {openId ? (
        <LeadDrawer
          id={openId}
          onClose={() => setOpenId(null)}
          onChanged={load}
          say={say}
        />
      ) : null}

      {flash ? <div className={`cp-flash${flash.bad ? " bad" : ""}`}>{flash.message}</div> : null}
    </>
  );
}
