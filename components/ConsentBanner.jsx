"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_COOKIE, CONSENT_MAX_AGE, CONSENT_EVENT, privacyUrlFor, stringsFor,
} from "@/lib/consent";

/* The banner's CSS ships with the component. Every per-page styles.css in this
   repo is a full copy of the same file, so a rule added "to the stylesheet" has
   to be added 121 times; a <style> next to the markup is one place instead. */
const CSS = `
.cc-banner{position:fixed;left:0;right:0;bottom:0;z-index:9999;
  background:#221d18;color:#f3ede4;border-top:1px solid rgba(201,154,99,.5);
  box-shadow:0 -8px 30px rgba(0,0,0,.28);
  font-family:Poppins,system-ui,sans-serif;
  animation:cc-rise .32s ease-out both}
@keyframes cc-rise{from{transform:translateY(100%)}to{transform:translateY(0)}}
@media (prefers-reduced-motion:reduce){.cc-banner{animation:none}}
.cc-inner{max-width:1340px;margin:0 auto;padding:16px 30px;
  display:flex;align-items:center;gap:22px;flex-wrap:wrap}
.cc-text{flex:1 1 380px;margin:0;font-size:13.5px;font-weight:300;line-height:1.6;color:#e8e0d4}
.cc-link{color:#c99a63;text-decoration:underline;text-underline-offset:3px;white-space:nowrap}
.cc-link:hover{color:#e0b878}
.cc-actions{display:flex;gap:10px;flex-wrap:wrap}
.cc-btn{font:inherit;font-size:12.5px;font-weight:500;letter-spacing:.06em;
  text-transform:uppercase;padding:10px 24px;border-radius:2px;cursor:pointer;
  border:1px solid #c99a63;background:transparent;color:#e8dcc8;
  transition:background .18s ease,color .18s ease}
.cc-btn:hover{background:rgba(201,154,99,.16)}
.cc-btn-accept{background:#c99a63;border-color:#c99a63;color:#231d17}
.cc-btn-accept:hover{background:#d8ab74;color:#231d17}
.cc-btn:focus-visible{outline:2px solid #f0d9b5;outline-offset:2px}
@media (max-width:760px){
  .cc-inner{padding:14px 18px;gap:14px}
  .cc-actions{width:100%}
  .cc-btn{flex:1 1 0;padding:11px 12px;text-align:center}
}
`;

const readCookie = () => {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : "";
  } catch { return ""; }
};

const writeCookie = (value) => {
  document.cookie =
    `${CONSENT_COOKIE}=${encodeURIComponent(value)};path=/;max-age=${CONSENT_MAX_AGE};SameSite=Lax` +
    (location.protocol === "https:" ? ";Secure" : "");
};

export default function ConsentBanner({ locale = "en" }) {
  const [open, setOpen] = useState(false);
  const t = stringsFor(locale);

  /* Rendered only after mount, and only when no choice is stored. Deciding this
     on the server would bake one visitor's answer into the static HTML that
     every other visitor is served. */
  useEffect(() => { if (!readCookie()) setOpen(true); }, []);

  /* "Cookie settings" belongs in the footer, but the footer is markup inside
     121 content.js files rather than a component. Injecting the link into the
     existing .ftr-legal nav reaches every page and every locale without
     touching any of them. */
  useEffect(() => {
    const nav = document.querySelector(".ftr-legal");
    if (!nav || nav.querySelector("[data-cc-settings]")) return;
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = t.settings;
    a.setAttribute("data-cc-settings", "");
    a.addEventListener("click", (e) => {
      e.preventDefault();
      // Withdrawing has to be as easy as giving: clear the record and ask again.
      document.cookie = `${CONSENT_COOKIE}=;path=/;max-age=0;SameSite=Lax`;
      setOpen(true);
    });
    nav.appendChild(a);
    return () => a.remove();
  }, [t.settings]);

  const choose = (value) => {
    const state = value === "granted" ? "granted" : "denied";
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: state, ad_user_data: state,
        ad_personalization: state, analytics_storage: state,
      });
    }
    writeCookie(state);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
    setOpen(false);
  };

  if (!open) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="cc-banner" role="region" aria-label={t.label}>
        <div className="cc-inner">
          <p className="cc-text">
            {t.body}{" "}
            <a className="cc-link" href={privacyUrlFor(locale)}>{t.privacy}</a>
          </p>
          <div className="cc-actions">
            {/* Reject first in the DOM and identical in size to Accept. */}
            <button type="button" className="cc-btn" onClick={() => choose("denied")}>
              {t.reject}
            </button>
            <button type="button" className="cc-btn cc-btn-accept" onClick={() => choose("granted")}>
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
