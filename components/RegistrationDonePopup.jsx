"use client";

import { useEffect, useState } from "react";

/**
 * The thank-you message for the registration form, shown on the homepage.
 *
 * The form now sends the student back to the site instead of leaving them on a
 * dead-end page, so the confirmation has to travel with them. It goes through
 * sessionStorage rather than the query string: the message carries the
 * student's name, and a name in a URL ends up in server logs, analytics and
 * anyone's shoulder view of the address bar.
 *
 * Rendered from SiteShell, so it will appear wherever the student lands. It
 * reads the key once, clears it immediately, and never shows twice.
 */

export const REGISTRATION_DONE_KEY = "adhiroha:registration_done";

const CSS = `
.rgd-scrim{position:fixed;inset:0;z-index:10001;background:rgba(24,17,11,.62);
  backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;padding:22px;
  animation:rgd-fade .2s ease-out both}
@keyframes rgd-fade{from{opacity:0}to{opacity:1}}
@keyframes rgd-rise{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.rgd-scrim,.rgd-box{animation:none}}
.rgd-box{position:relative;width:100%;max-width:452px;background:#fbf8f3;border-radius:6px;
  border:1px solid rgba(201,154,99,.42);box-shadow:0 30px 70px -18px rgba(20,14,8,.6);
  padding:36px 34px 30px;text-align:center;
  font-family:Poppins,system-ui,sans-serif;
  animation:rgd-rise .26s cubic-bezier(.22,.61,.36,1) both;max-height:90vh;overflow-y:auto}
.rgd-x{position:absolute;top:10px;right:12px;width:32px;height:32px;border:0;background:none;
  font-size:24px;line-height:1;color:#9c8b76;cursor:pointer;border-radius:50%}
.rgd-x:hover{background:rgba(201,154,99,.14);color:#5b4a34}
.rgd-tick{display:block;width:48px;height:48px;margin:0 auto 16px;color:#2e7d32}
.rgd-h{font-family:'Playfair Display',Georgia,serif;font-size:25px;font-weight:600;
  color:#2c2318;margin:0 0 10px;line-height:1.25}
.rgd-p{font-size:13.5px;font-weight:300;line-height:1.65;color:#6b5c48;margin:0}
.rgd-ok{margin-top:22px;font:inherit;font-size:12.5px;font-weight:600;letter-spacing:1.4px;
  text-transform:uppercase;padding:12px 34px;border:0;border-radius:3px;
  background:#c1362f;color:#fff;cursor:pointer}
.rgd-ok:hover{background:#a92c26}
`;

export default function RegistrationDonePopup() {
  const [name, setName] = useState(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(REGISTRATION_DONE_KEY);
      if (!stored) return;
      sessionStorage.removeItem(REGISTRATION_DONE_KEY);
      setName(stored);
    } catch { /* private browsing; the student still lands on the site */ }
  }, []);

  useEffect(() => {
    if (name === null) return;
    const onKey = (e) => { if (e.key === "Escape") setName(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [name]);

  if (name === null) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="rgd-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) setName(null); }}>
        <div className="rgd-box" role="dialog" aria-modal="true" aria-label="Registration received">
          <button type="button" className="rgd-x" onClick={() => setName(null)} aria-label="Close">&times;</button>
          <svg className="rgd-tick" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><path d="M8 12.5l2.6 2.6L16 9.5" />
          </svg>
          <h3 className="rgd-h">Thank you{name ? `, ${name}` : ""}</h3>
          <p className="rgd-p">
            Your registration is with us. We will be in touch before you travel with anything else
            you need. If you spot a mistake, write to info@adhiroha.com and we will correct it.
          </p>
          <button type="button" className="rgd-ok" onClick={() => setName(null)}>Close</button>
        </div>
      </div>
    </>
  );
}
