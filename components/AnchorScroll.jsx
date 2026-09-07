"use client";

import { useEffect } from "react";

// Smooth in-page anchor scrolling that survives late layout shifts, and leaves
// the address bar alone.
//
// The homepage lazy-loads images and reveals sections on scroll, so the content
// above a target can grow by hundreds of pixels *after* the browser has already
// jumped — leaving the target well below the fold. Native `scroll-behavior:
// smooth` has no way to correct for that, so we re-aim at the target for a
// short window until its position stops moving.
//
// The URL is deliberately left clean. Clicking "View course" or "Contact us"
// used to leave `#course-200` or `#reach-us` in the address bar, where it then
// stuck around through the rest of the visit and got copied, shared and pasted
// into ads. These anchors move people down one page; they are not addresses
// anyone needs to keep. The trade-off is that a section can no longer be linked
// to directly — if that is ever wanted, it should be a real URL, not a leftover
// from a button press.
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

    /** Drop the `#…` without adding a history entry or reloading anything. */
    const stripHash = () => {
      if (!window.location.hash) return;
      history.replaceState(null, "", window.location.pathname + window.location.search);
    };

    let cleanup = null;

    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash) return;

      // `href="#"` — a button that only exists to be clicked by its own script,
      // like "Cookie settings". Left alone it jumps the page to the top and
      // parks a bare "#" in the URL.
      if (hash === "#") {
        e.preventDefault();
        return;
      }

      const el = document.getElementById(hash.slice(1));
      if (!el) return;

      e.preventDefault();
      cleanup?.();
      cleanup = scrollToTarget(el);
    };

    document.addEventListener("click", onClick);

    // Arriving with a hash already in the URL — a link from another page, or a
    // bookmark from before this ran. The browser has jumped there natively and
    // is subject to exactly the drift described above, so re-aim properly and
    // then take the hash out of the address bar.
    let onLoadCleanup = null;
    if (window.location.hash && window.location.hash !== "#") {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) onLoadCleanup = scrollToTarget(el);
      stripHash();
    }

    return () => {
      document.removeEventListener("click", onClick);
      onLoadCleanup?.();
      cleanup?.();
    };
  }, []);

  return null;
}
