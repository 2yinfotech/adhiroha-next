"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The landing page's enquiry dialog.
 *
 * The hero asks for one thing — a name and an email — because a six-field form
 * in front of someone who has just arrived from an ad is a wall. Everything
 * else (course, month, phone) we ask for in the reply, when they are already
 * talking to us.
 *
 * It posts to /api/contact, the same route every other enquiry on the site
 * uses, and fires the conversion signals in exactly the same place the other
 * forms do: inside the confirmed-success branch, never on a failed send.
 */
export default function LpEnquiryModal({ label, sub, points }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [note, setNote] = useState("");
  const nameRef = useRef(null);
  const openerRef = useRef(null);

  // Focus goes into the dialog when it opens and back to the button that
  // opened it when it closes, so a keyboard never lands nowhere. `hasOpened`
  // matters: without it the restore branch also ran on first render, which
  // focused the button and scrolled the whole page down to it on load.
  const hasOpened = useRef(false);
  useEffect(() => {
    if (open) { hasOpened.current = true; nameRef.current?.focus(); return; }
    if (hasOpened.current) openerRef.current?.focus?.();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    // Stop the page behind from scrolling under the dialog.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  async function onSubmit(e) {
    e.preventDefault();
    if (state === "sending") return;
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    if (!name || !email) {
      setState("error");
      setNote("Please add your name and email so we can reply.");
      return;
    }
    setState("sending"); setNote("");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone: "",
          message: "Enquiry from the yoga teacher training landing page. Asked for the fees, the upcoming dates and course details.",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setState("done");
        // Conversions, only once the send is confirmed.
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "lead_form_submit",
          form_location: window.location.pathname,
          form_name: "lp_enquiry",
          ...(email ? { user_data: { email_address: email.toLowerCase() } } : {}),
        });
        if (window.fbq) window.fbq("track", "Lead");
      } else {
        setState("error");
        setNote(json.message || json.error || "Something went wrong. Please email info@adhiroha.com.");
      }
    } catch {
      setState("error");
      setNote("Network error. Please check your connection and try again.");
    }
  }

  return (
    <>
      <button type="button" className="lp-cta" ref={openerRef} onClick={() => setOpen(true)}>
        {label}
      </button>

      {open && (
        <div className="lp-modal" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="lp-modal-box" role="dialog" aria-modal="true" aria-label={label}>
            <button type="button" className="lp-modal-x" onClick={() => setOpen(false)} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {state === "done" ? (
              <div className="lp-modal-done">
                <span className="lp-modal-tick" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                       strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
                <h3>Thank you, we have your enquiry</h3>
                <p>
                  We will write back personally, usually within the day, with the fee, the dates
                  still open and anything else you want to know. If it has not arrived, check
                  your promotions folder.
                </p>
              </div>
            ) : (
              <>
                <h3 className="lp-modal-h">{label}</h3>
                <p className="lp-modal-sub">{sub}</p>

                <form onSubmit={onSubmit} noValidate>
                  <label className="lp-modal-field">
                    <span>Your name</span>
                    <input ref={nameRef} name="name" type="text" autoComplete="name" required placeholder="Full name" />
                  </label>
                  <label className="lp-modal-field">
                    <span>Email</span>
                    <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
                  </label>
                  <button className="lp-modal-send" type="submit" disabled={state === "sending"}>
                    {state === "sending" ? "Sending…" : "Send my enquiry"}
                  </button>
                  {state === "error" && <p className="lp-modal-err" role="alert">{note}</p>}
                </form>

                <ul className="lp-modal-usps">
                  {points.map(({ icon, text }) => (
                    <li key={text}><span className="lp-modal-ic">{icon}</span>{text}</li>
                  ))}
                </ul>

                <p className="lp-modal-privacy">
                  We use your details only to answer this enquiry. We never sell or share them.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
