"use client";

import { useEffect } from "react";

/**
 * Makes the (fixed) site header behave like the homepage on sub-pages:
 * adds `.stuck` once scrolled, and `.hide` when scrolling down / shows on up.
 */
export default function StickyHeader() {
  useEffect(() => {
    const hd = document.getElementById("hd");
    if (!hd) return;
    let lastY = window.pageYOffset || 0;
    const onScroll = () => {
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
