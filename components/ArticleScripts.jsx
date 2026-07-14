"use client";

import { useEffect } from "react";

/**
 * Client-side behaviour for a database-driven article page, mirroring what the
 * hand-built blog pages do inline:
 *   - mobile drawer open/close (burger, close button, scrim)
 *   - footer year
 *   - reveal-on-scroll for .reveal elements
 *   - reading-progress bar (#read-bar)
 *   - table-of-contents active-link highlight (.toc a → .on) via scroll spy
 */
export default function ArticleScripts() {
  useEffect(() => {
    // Footer year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile drawer
    const burger = document.getElementById("hd-burger");
    const drawer = document.getElementById("hd-drawer");
    const scrim = document.getElementById("hd-scrim");
    const close = document.getElementById("hd-close");
    const setDrawer = (open) => {
      if (drawer) drawer.classList.toggle("open", open);
      if (scrim) scrim.classList.toggle("open", open);
      document.documentElement.style.overflow = open ? "hidden" : "";
    };
    const openDrawer = () => setDrawer(true);
    const closeDrawer = () => setDrawer(false);
    burger?.addEventListener("click", openDrawer);
    close?.addEventListener("click", closeDrawer);
    scrim?.addEventListener("click", closeDrawer);

    // Reveal on scroll
    const reveals = Array.from(document.querySelectorAll(".reveal"));
    let revealIO;
    if ("IntersectionObserver" in window) {
      revealIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              revealIO.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
      reveals.forEach((el) => revealIO.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add("in"));
    }

    // Reading-progress bar
    const bar = document.getElementById("read-bar");
    const onScroll = () => {
      if (!bar) return;
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      bar.style.width = p * 100 + "%";
    };
    if (bar) window.addEventListener("scroll", onScroll, { passive: true });

    // TOC active-link scroll spy
    const toc = document.getElementById("toc");
    let tocIO;
    if (toc) {
      const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
      const pairs = [];
      links.forEach((l) => {
        const sec = document.querySelector(l.getAttribute("href"));
        if (sec) pairs.push([sec, l]);
      });
      if ("IntersectionObserver" in window && pairs.length) {
        tocIO = new IntersectionObserver(
          (entries) => {
            entries.forEach((x) => {
              if (x.isIntersecting) {
                links.forEach((l) => l.classList.remove("on"));
                const match = pairs.find((p) => p[0] === x.target);
                if (match) match[1].classList.add("on");
              }
            });
          },
          { rootMargin: "-20% 0px -65% 0px" }
        );
        pairs.forEach((p) => tocIO.observe(p[0]));
      }
    }

    return () => {
      burger?.removeEventListener("click", openDrawer);
      close?.removeEventListener("click", closeDrawer);
      scrim?.removeEventListener("click", closeDrawer);
      if (bar) window.removeEventListener("scroll", onScroll);
      revealIO?.disconnect();
      tocIO?.disconnect();
      document.documentElement.style.overflow = "";
    };
  }, []);

  return null;
}
