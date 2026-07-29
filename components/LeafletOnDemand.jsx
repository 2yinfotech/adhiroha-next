"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

// Leaflet used to load from the root layout on every page: a render-blocking
// stylesheet in <head> plus a beforeInteractive script. Only about half the
// pages have a map, and on those it sits just above the footer — so nothing
// needed it before first paint.
//
// Here we wait until the map is close to the viewport, inject the CSS and JS,
// then fire `adhiroha:leaflet`. Each page's own script listens for that event
// instead of window 'load' (see scripts.js), so the init code is unchanged
// beyond which event wakes it up.
//
// Keyed on the pathname so a client-side navigation onto a map page re-arms the
// observer — the root layout itself never remounts.
export default function LeafletOnDemand() {
  const pathname = usePathname();

  useEffect(() => {
    const el = document.getElementById("gmap");
    if (!el) return;

    const fire = () => window.dispatchEvent(new Event("adhiroha:leaflet"));

    // Already loaded (arrived from another map page): just wake the init up.
    if (window.L) { fire(); return; }

    let started = false;
    const load = () => {
      if (started) return;
      started = true;

      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = CSS;
      css.crossOrigin = "";
      document.head.appendChild(css);

      const js = document.createElement("script");
      js.src = JS;
      js.crossOrigin = "";
      js.onload = fire;
      document.head.appendChild(js);
    };

    // No IntersectionObserver (very old browsers): load straight away rather
    // than leaving the map permanently blank.
    if (!("IntersectionObserver" in window)) { load(); return; }

    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { io.disconnect(); load(); } },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
