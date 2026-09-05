"use client";

import { useState } from "react";

/**
 * Sign in with the same username and password as admin.adhiroha.com — the
 * credentials come from the shared `admin` table, so nobody needs a second
 * account for this.
 */
export default function LoginForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/leads-panel/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.get("username"),
          password: form.get("password"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.ok) {
        // A full reload rather than a client transition: the session is a
        // cookie the server reads, so the page has to be fetched again for the
        // gate to see it.
        window.location.reload();
        return;
      }
      setError(data.message || "Wrong username or password.");
    } catch {
      setError("Could not reach the server. Try again.");
    }
    setBusy(false);
  }

  return (
    <div className="cl-wrap">
      <form className="cl-card" onSubmit={submit}>
        <h1>Adhiroha Leads</h1>
        <p className="sub">Sign in with your admin panel details.</p>

        {error ? <div className="cl-error">{error}</div> : null}

        <div className="cl-field">
          <label htmlFor="u">Username</label>
          <input id="u" name="username" type="text" autoComplete="username" required autoFocus />
        </div>
        <div className="cl-field">
          <label htmlFor="p">Password</label>
          <input id="p" name="password" type="password" autoComplete="current-password" required />
        </div>

        <button className="btn primary wide" type="submit" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
