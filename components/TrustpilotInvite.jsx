"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_COOKIE, CONSENT_EVENT } from "@/lib/consent";

// Trustpilot's invitation script, the snippet from the Trustpilot business
// dashboard. On its own it only registers the integration key; review
// invitations are sent by tp('createInvitation', …) calls or from Trustpilot's
// side.
//
// It is a third-party script that sets its own storage, so like Hotjar it waits
// for the consent cookie: Consent Mode only governs Google's tags. Outside the
// EEA/UK/CH the banner never shows and the cookie is written as granted, so it
// loads there straight away.
const TRUSTPILOT_KEY = process.env.NEXT_PUBLIC_TRUSTPILOT_KEY || "tu56Qv10TUz6xSQm";

const TRUSTPILOT_SCRIPT = `
(function(w,d,s,r,n){w.TrustpilotObject=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)};
    a=d.createElement(s);a.async=1;a.src=r;a.type='text/java'+s;f=d.getElementsByTagName(s)[0];
    f.parentNode.insertBefore(a,f)})(window,document,'script', 'https://invitejs.trustpilot.com/tp.min.js', 'tp');
    tp('register', '${TRUSTPILOT_KEY}');
`;

export default function TrustpilotInvite() {
  const [granted, setGranted] = useState(false);
  useEffect(() => {
    const read = () => {
      try {
        const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=([^;]*)`));
        setGranted(!!m && decodeURIComponent(m[1]) === "granted");
      } catch { setGranted(false); }
    };
    read();
    window.addEventListener(CONSENT_EVENT, read);
    return () => window.removeEventListener(CONSENT_EVENT, read);
  }, []);

  if (!granted) return null;

  return (
    <Script
      id="trustpilot-invite"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{ __html: TRUSTPILOT_SCRIPT }}
    />
  );
}
