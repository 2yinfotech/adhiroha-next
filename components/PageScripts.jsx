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

    // The original pages hide `.reveal` elements until their own
    // IntersectionObserver marks them as visible. A browser without that API
    // uses the pages' fallback to reveal everything, but React/Next hydration
    // can still be adding the rest of the page when that fallback runs. Watch
    // for those late nodes and reveal them as well, so a page can never remain
    // blank below its hero in a non-supporting browser.
    let revealObserver;
    let revealFrame;
    let revealTimer;
    if (!("IntersectionObserver" in window)) {
      document.documentElement.classList.add("reveal-fallback");

      const reveal = (root) => {
        if (root instanceof Element && root.matches(".reveal")) {
          root.classList.add("in");
        }
        if (root instanceof Element || root instanceof Document) {
          root.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
        }
      };

      reveal(document);
      revealObserver = new MutationObserver((records) => {
        records.forEach((record) => record.addedNodes.forEach(reveal));
      });
      revealObserver.observe(document.body, { childList: true, subtree: true });

      // Also sweep after the current render and after streamed page content
      // settles; not every hydration update creates an observable element node.
      revealFrame = window.requestAnimationFrame(() => reveal(document));
      revealTimer = window.setTimeout(() => reveal(document), 500);
    }

    // Restore the real addEventListener immediately after execution.
    window.addEventListener = originalAdd;

    // If the page already finished loading (client-side navigation), the real
    // 'load' event won't fire again — dispatch one so deferred init runs once.
    if (document.readyState === "complete") {
      window.dispatchEvent(new Event("load"));
    }

    return () => {
      s.remove();
      revealObserver?.disconnect();
      if (revealFrame) window.cancelAnimationFrame(revealFrame);
      if (revealTimer) window.clearTimeout(revealTimer);
      document.documentElement.classList.remove("reveal-fallback");
      captured.forEach(([type, listener, options]) =>
        window.removeEventListener(type, listener, options)
      );
    };
  }, [code]);

  return null;
}
