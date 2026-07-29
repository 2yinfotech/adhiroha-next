"use client";

import { useEffect } from "react";

// The App Router only lets the root layout render <html>, and that layout cannot
// know the pathname in a static build — so every translated page would otherwise
// ship <html lang="en"> while its canonical and hreflang say otherwise.
//
// Google ignores this attribute (it detects language from visible content), but
// screen readers use it to pick a voice, and Bing reads it. Setting it from the
// client covers both: assistive tech reads the live DOM, and Bing renders JS.
export default function SetLang({ lang }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    // Restore on unmount so a client-side navigation back to an English route
    // does not leave the document claiming to be, say, Danish.
    return () => { document.documentElement.lang = previous; };
  }, [lang]);

  return null;
}
