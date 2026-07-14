"use client";

import { useEffect } from "react";

/**
 * Runs a page's original page-specific inline JavaScript (the code that
 * followed the shared chrome preamble in the source file). The code is injected
 * as a real <script> element so it executes exactly as it did originally, then
 * removed on unmount. Page-specific DOM lives inside the page content, which the
 * router remounts on navigation, so re-running on mount rebinds to fresh nodes.
 *
 * Two SPA-navigation hazards are handled here:
 *   1. Some scripts (e.g. the Leaflet map init) defer their work to a
 *      `window 'load'` event, which only fires on a genuine full page load.
 *      When we arrive via client-side navigation the document is already
 *      "complete", so we dispatch a synthetic load to run that work.
 *   2. Those same `load` listeners would otherwise accumulate across
 *      navigations and re-run on every future dispatch. We capture the
 *      `load` listeners this script registers and remove them on unmount.
 */
export default function PageScripts({ code }) {
  useEffect(() => {
    if (!code || !code.trim()) return;

    // Capture every window listener the injected script registers (scroll,
    // resize, load, …) so we can tear them down on unmount — otherwise they
    // leak across client-side navigations.
    const captured = [];
    const originalAdd = window.addEventListener.bind(window);
    window.addEventListener = function (type, listener, options) {
      captured.push([type, listener, options]);
      return originalAdd(type, listener, options);
    };

    const s = document.createElement("script");
    s.textContent = code;
    document.body.appendChild(s); // inline scripts execute synchronously here

    // Restore the real addEventListener immediately after execution.
    window.addEventListener = originalAdd;

    // If the page already finished loading (client-side navigation), the real
    // 'load' event won't fire again — dispatch one so deferred init runs once.
    if (document.readyState === "complete") {
      window.dispatchEvent(new Event("load"));
    }

    return () => {
      s.remove();
      captured.forEach(([type, listener, options]) =>
        window.removeEventListener(type, listener, options)
      );
    };
  }, [code]);

  return null;
}
