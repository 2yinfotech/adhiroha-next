"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { enquiryStrings, ENQUIRY_ONLY_PATHS } from "@/lib/enquiry";

/**
 * The enquiry modal for courses that are not running as scheduled batches.
 *
 * It activates itself only on those pages, by looking for the ".bc-pill.is-soon"
 * marker that the upcoming-course pages already carry, and takes the course name
 * from the page's own Course JSON-LD so the heading is in the page's language
 * without any per-page wiring.
 *
 * Rendered once from SiteShell. On a page without that marker it renders nothing
 * and attaches no listeners.
 */

/* Conversion CTAs only. Deliberately not .hd-link (the plain "Contact" nav item)
   or anything in the footer's legal row: someone asking for the contact page
   should still get the contact page. */
const CTA = "a.hd-cta, .hd-card a.gold, a.btn-primary, a.btn-outline, .ft-cta a";

const CSS = `
.ceq-scrim{position:fixed;inset:0;z-index:10000;background:rgba(24,17,11,.62);
  backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;padding:22px;
  animation:ceq-fade .2s ease-out both}
@keyframes ceq-fade{from{opacity:0}to{opacity:1}}
@keyframes ceq-rise{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.ceq-scrim,.ceq-box{animation:none}}
.ceq-box{position:relative;width:100%;max-width:452px;background:#fbf8f3;border-radius:6px;
  border:1px solid rgba(201,154,99,.42);box-shadow:0 30px 70px -18px rgba(20,14,8,.6);
  padding:34px 34px 30px;text-align:center;animation:ceq-rise .26s cubic-bezier(.22,.61,.36,1) both;
  max-height:90vh;overflow-y:auto}
.ceq-x{position:absolute;top:10px;right:12px;width:32px;height:32px;border:0;background:none;
  font-size:24px;line-height:1;color:#9c8b76;cursor:pointer;border-radius:50%}
.ceq-x:hover{background:rgba(201,154,99,.14);color:#5b4a34}
.ceq-orn{display:block;width:118px;height:10px;margin:0 auto 14px;color:#c99a63}
.ceq-h{font-family:'Playfair Display',Georgia,serif;font-size:25px;font-weight:600;
  color:#2c2318;margin:0 0 10px;line-height:1.25}
.ceq-p{font-size:13.5px;font-weight:300;line-height:1.62;color:#6b5c48;margin:0 0 20px}
.ceq-p b{font-weight:600;color:#3c3122}
.ceq-f{display:block;margin-bottom:12px;text-align:left}
.ceq-f span{display:block;font-size:10.5px;font-weight:600;letter-spacing:1.4px;
  text-transform:uppercase;color:#8a7860;margin-bottom:6px}
.ceq-f input{width:100%;font:inherit;font-size:14.5px;font-weight:300;color:#2c2318;
  padding:11px 13px;border:1px solid #ddd0bb;border-radius:3px;background:#fff}
.ceq-f input:focus{outline:0;border-color:#c99a63;box-shadow:0 0 0 3px rgba(201,154,99,.18)}
.ceq-send{width:100%;margin-top:6px;font:inherit;font-size:12.5px;font-weight:600;
  letter-spacing:1.4px;text-transform:uppercase;padding:13px 18px;border:0;border-radius:3px;
  background:#c1362f;color:#fff;cursor:pointer;transition:background .18s ease}
.ceq-send:hover{background:#a92c26}
.ceq-send[disabled]{opacity:.62;cursor:default}
.ceq-err{margin:12px 0 0;font-size:12.5px;font-weight:500;color:#c0392b;line-height:1.5}
.ceq-tick{display:block;width:46px;height:46px;margin:2px auto 14px;color:#2e7d32}
@media (max-width:520px){.ceq-box{padding:30px 20px 24px}.ceq-h{font-size:22px}}
`;

/* The page says what course it is about in its own structured data. */
function courseOnPage() {
  try {
    for (const tag of document.querySelectorAll('script[type="application/ld+json"]')) {
      const parsed = JSON.parse(tag.textContent || "{}");
      for (const node of parsed["@graph"] || [parsed]) {
        if (node && node["@type"] === "Course" && node.name) return node.name;
      }
    }
  } catch { /* malformed JSON-LD is not worth breaking the page over */ }
  return "";
}

export default function CourseEnquiryModal({ locale = "en" }) {
  const [course, setCourse] = useState("");   // "" until we know this is an upcoming-course page
  const [open, setOpen] = useState(false);
  const [state, setState] = useState("idle"); // idle | sending | done
  const [err, setErr] = useState("");
  const nameRef = useRef(null);
  const t = enquiryStrings(locale);

  /* Arm on the courses that are not running (they carry the upcoming marker) and
     on the ones that are arranged directly with the school. See ENQUIRY_ONLY_PATHS. */
  useEffect(() => {
    const path = window.location.pathname.replace(/\/?$/, "/");
    const enquiryOnly = ENQUIRY_ONLY_PATHS.includes(path);
    if (!enquiryOnly && !document.querySelector(".bc-pill.is-soon")) return;
    setCourse(courseOnPage() || " ");
  }, []);

  /* Capture-phase so the click never reaches the anchor's own navigation. */
  useEffect(() => {
    if (!course) return;
    const onClick = (e) => {
      const el = e.target.closest?.(CTA);
      if (!el || !el.closest("body")) return;
      e.preventDefault();
      e.stopPropagation();
      setState("idle"); setErr(""); setOpen(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [course]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    nameRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, close]);

  async function submit(e) {
    e.preventDefault();
    if (state === "sending") return;
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    if (!name || !email) { setErr(t.errRequired); return; }

    setState("sending"); setErr("");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone: "",
          message: `Enquiry from the ${course.trim()} page. This course is not running at the moment; the visitor asked to be told the upcoming dates.`,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setState("done");
        // Same event and form_name the course pages already send, so this shows
        // up as a course enquiry in Ads rather than as a separate thing.
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "lead_form_submit",
          form_location: window.location.pathname,
          form_name: "course_enquiry",
          course_interest: course.trim(),
          ...(email ? { user_data: { email_address: email.toLowerCase() } } : {}),
        });
        // Meta's matching conversion. Guarded because the pixel only exists once
        // the visitor has accepted cookies; when it does not, nothing is sent.
        if (window.fbq) window.fbq("track", "Lead");
      } else {
        setState("idle");
        setErr(json.message || json.error || t.errGeneric);
      }
    } catch {
      setState("idle");
      setErr(t.errNetwork);
    }
  }

  if (!course || !open) return null;

  const [before, after] = t.intro.split("{course}");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ceq-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="ceq-box" role="dialog" aria-modal="true" aria-label={t.title}>
          <button type="button" className="ceq-x" onClick={close} aria-label={t.close}>&times;</button>

          {state === "done" ? (
            <>
              <svg className="ceq-tick" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><path d="M8 12.5l2.6 2.6L16 9.5" />
              </svg>
              <h3 className="ceq-h">{t.doneTitle}</h3>
              <p className="ceq-p">{t.doneBody}</p>
            </>
          ) : (
            <>
              <svg className="ceq-orn" viewBox="0 0 120 10" fill="none" stroke="currentColor"
                   strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
                <line x1="2" y1="5" x2="46" y2="5" strokeDasharray="1 5" />
                <path d="M60 1 L64 5 L60 9 L56 5 Z" fill="currentColor" stroke="none" />
                <line x1="74" y1="5" x2="118" y2="5" strokeDasharray="1 5" />
              </svg>
              <h3 className="ceq-h">{t.title}</h3>
              <p className="ceq-p">{before}<b>{course.trim()}</b>{after}</p>
              <form onSubmit={submit} noValidate>
                <label className="ceq-f">
                  <span>{t.name}</span>
                  <input ref={nameRef} type="text" name="name" autoComplete="name" required />
                </label>
                <label className="ceq-f">
                  <span>{t.email}</span>
                  <input type="email" name="email" autoComplete="email" required />
                </label>
                <button className="ceq-send" type="submit" disabled={state === "sending"}>
                  {state === "sending" ? t.sending : t.send}
                </button>
                {err && <p className="ceq-err">{err}</p>}
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
