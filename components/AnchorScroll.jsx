"use client";

import { useEffect } from "react";

// Smooth in-page anchor scrolling that survives late layout shifts.
//
// The homepage lazy-loads images and reveals sections on scroll, so the content
// above a target can grow by hundreds of pixels *after* the browser has already
// jumped — leaving the target well below the fold. Native `scroll-behavior:
// smooth` has no way to correct for that, so we re-aim at the target for a
// short window until its position stops moving.
const HEADER_OFFSET = 86; // clear the sticky header
const SETTLE_MS = 1600;   // how long to keep correcting
const TOLERANCE = 4;      // px

export default function AnchorScroll() {
  useEffect(() => {
    const scrollToTarget = (el) => {
      const start = performance.now();
      let raf = 0;

      const step = () => {
        const top = el.getBoundingClientRect().top;
        const drift = top - HEADER_OFFSET;

        if (Math.abs(drift) > TOLERANCE) {
          window.scrollBy({ top: drift, behavior: "instant" in document.documentElement.style ? "instant" : "auto" });
        }
        if (performance.now() - start < SETTLE_MS) {
          raf = requestAnimationFrame(step);
        }
      };

      // First hop is smooth for the eye; the correction loop then holds it there.
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });

      // Start correcting once the smooth animation has had time to finish.
      const timer = setTimeout(() => { raf = requestAnimationFrame(step); }, 700);
      return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
    };

    let cleanup = null;

    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;

      const el = document.getElementById(hash.slice(1));
      if (!el) return;

      e.preventDefault();
      cleanup?.();
      cleanup = scrollToTarget(el);
      history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cleanup?.();
    };
  }, []);

  return null;
}
