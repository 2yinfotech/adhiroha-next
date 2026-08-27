"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_COOKIE, CONSENT_EVENT } from "@/lib/consent";
import { META_PIXEL_ID, courseContentFor, isRealBooking } from "@/lib/meta-pixel";

/**
 * Meta (Facebook) Pixel.
 *
 * Held back until the visitor has accepted cookies, exactly like Hotjar in
 * components/Analytics. The pixel writes _fbp and sends the page URL to Meta,
 * so it is advertising storage in the Consent Mode sense. Google Consent Mode
 * only governs Google's own tags — a third-party pixel has to be gated in our
 * own code or it simply runs regardless of what the banner says.
 *
 * Everything the pixel fires lives here rather than being scattered through the
 * pages, so the ordering is guaranteed: the base snippet is injected first, then
 * PageView, then whatever this particular page warrants. A page-level snippet
 * could otherwise call fbq() before fbq existed and be silently lost.
 *
 * Events:
 *   PageView      every page, once the pixel is allowed to load
 *   ViewContent   the four course pages, in all eleven locales
 *   Lead          /thank-you/, and only when the URL carries a real booking
 */

const BASE_SNIPPET = `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
`;

export default function MetaPixel() {
  const pathname = usePathname() || "";
  const [granted, setGranted] = useState(false);
  // Every internal link on this site is a plain <a>, so a navigation is a full
  // document load and this component mounts fresh each time. The ref only
  // guards against a double-invoked effect in React strict mode.
  const fired = useRef(false);

  useEffect(() => {
    const read = () => {
      try {
        const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=([^;]*)`));
        setGranted(!!m && decodeURIComponent(m[1]) === "granted");
      } catch { setGranted(false); }
    };
    read();
    // Fires the moment the banner is answered, so a visitor who accepts is
    // measured from that point on without having to reload.
    window.addEventListener(CONSENT_EVENT, read);
    return () => window.removeEventListener(CONSENT_EVENT, read);
  }, []);

  useEffect(() => {
    if (!granted || fired.current) return;
    fired.current = true;

    if (!window.fbq) {
      const s = document.createElement("script");
      s.id = "meta-pixel";
      s.text = BASE_SNIPPET;
      document.head.appendChild(s);

      // The <noscript> beacon from Meta's snippet. It only does anything for a
      // visitor with JavaScript off, who by definition cannot have answered the
      // banner — but it costs nothing and keeps the install complete.
      const ns = document.createElement("noscript");
      ns.innerHTML =
        `<img height="1" width="1" style="display:none" alt="" ` +
        `src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1"/>`;
      document.body.appendChild(ns);
    }

    window.fbq("track", "PageView");

    // Retargeting: someone who read a course page but never enquired.
    const content = courseContentFor(pathname);
    if (content) window.fbq("track", "ViewContent", content);

    // A completed booking. Guarded on the query string so that opening
    // /thank-you/ directly, or refreshing it later, cannot count as one.
    if (/^\/thank-you\/?$/.test(pathname) && isRealBooking(window.location.search)) {
      window.fbq("track", "Lead");
    }
  }, [granted, pathname]);

  return null;
}
