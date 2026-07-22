"use client";

import { useEffect } from "react";

/**
 * Makes the (fixed) site header behave like the homepage on sub-pages:
 * adds `.stuck` once scrolled, and `.hide` when scrolling down / shows on up.
 */
export default function StickyHeader() {
  useEffect(() => {
    // The header is injected via dangerouslySetInnerHTML on the page, so on some
    // routes it may not be in the DOM the instant this effect runs. Re-query it
    // lazily (on the first scroll) instead of bailing out permanently — that
    // stopped the sticky background/auto-hide from ever attaching on some pages.
    let hd = document.getElementById("hd");
    let lastY = window.pageYOffset || 0;
    const onScroll = () => {
      if (!hd) hd = document.getElementById("hd");
      if (!hd) return;
      const y = window.pageYOffset || 0;
      hd.classList.toggle("stuck", y > 40);
      if (y > lastY + 5 && y > 220) hd.classList.add("hide");
      else if (y < lastY - 5) hd.classList.remove("hide");
      if (y < 120) hd.classList.remove("hide");
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
