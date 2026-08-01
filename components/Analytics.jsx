"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

// Hotjar (heatmaps + session recordings), everywhere except the blog.
//
// The 163 articles pull a lot of one-page organic traffic that burns recording
// quota without saying anything about the courses, which is what the recordings
// are for. Every internal link on this site is a plain <a>, so each navigation
// is a full document load and this path check runs fresh on every page — there
// is no case where Hotjar is already running when a reader lands on an article.
//
// The site id is public by design; override it per-environment with
// NEXT_PUBLIC_HOTJAR_ID.
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID || "5139050";

const HOTJAR_OFF = [/^\/blog(\/|$)/, /^\/blogs(\/|$)/];

const HOTJAR_SCRIPT = `
(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
`;

export default function Analytics() {
  const pathname = usePathname() || "";
  if (HOTJAR_OFF.some((re) => re.test(pathname))) return null;

  // Analytics must never compete with first paint. Loading it lazily still
  // records the whole session — Hotjar backfills events once it initialises —
  // but keeps it off the critical path.
  return (
    <Script
      id="hotjar"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{ __html: HOTJAR_SCRIPT }}
    />
  );
}
