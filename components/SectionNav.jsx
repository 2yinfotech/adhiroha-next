"use client";

import { useEffect, useRef, useState } from "react";
import "./SectionNav.css";

/**
 * Floating in-page section navigator.
 *
 * Renders a fixed "compass" button (with a scroll-progress ring) that expands
 * into an animated menu of the page's main sections. Clicking an item smoothly
 * scrolls to that section; a scroll-spy keeps the current section highlighted.
 *
 * @param {{ sections: { label: string, target: string }[] }} props
 *   `target` is an element id, or the literal "top" to return to the page top.
 */
export default function SectionNav({ sections = [] }) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(sections[0]?.target ?? null);
  const rootRef = useRef(null);

  // Show the nav only after the reader has scrolled a little way down, and
  // keep the scroll-spy highlight in sync with the scroll position.
  useEffect(() => {
    if (!sections.length) return;

    const ids = sections
      .map((s) => s.target)
      .filter((t) => t && t !== "top");

    const onScroll = () => {
      const y = window.scrollY;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setReady(y > 320);

      // Scroll-spy: the active section is the last one whose top has crossed a
      // line ~a third of the way down the viewport.
      const line = window.innerHeight * 0.35;
      let current = sections[0]?.target ?? null;
      if (y < 200) {
        current = sections[0]?.target ?? null;
      } else {
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        }
        // Near the very bottom, force the last item active.
        if (max - y < 4) current = sections[sections.length - 1]?.target ?? current;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  // Close on Escape or when clicking outside the nav.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const go = (target) => {
    setOpen(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduce ? "auto" : "smooth";
    if (target === "top") {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior, block: "start" });
  };

  if (!sections.length) return null;

  return (
    <div
      ref={rootRef}
      className={`snav${ready ? " is-ready" : ""}${open ? " is-open" : ""}`}
    >
      {/* Wide screens: full horizontal bar docked bottom-centre. */}
      <nav className="snav-bar" aria-label="Jump to section">
        {sections.map((s) => (
          <button
            key={s.target}
            type="button"
            className={`snav-chip${active === s.target ? " is-active" : ""}`}
            aria-current={active === s.target ? "true" : undefined}
            onClick={() => go(s.target)}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* Narrow screens: a labelled pill that expands into a menu. */}
      <nav className="snav-fab" aria-label="Jump to section">
        <div className="snav-panel" role="menu" aria-hidden={!open}>
          <div className="snav-head">
            <b>Jump to Section</b>
            <span>Tap to scroll</span>
          </div>
          <ul className="snav-list">
            {sections.map((s, i) => (
              <li key={s.target} style={{ "--i": i }}>
                <button
                  type="button"
                  role="menuitem"
                  tabIndex={open ? 0 : -1}
                  className={`snav-link${active === s.target ? " is-active" : ""}`}
                  aria-current={active === s.target ? "true" : undefined}
                  onClick={() => go(s.target)}
                >
                  <span className="snav-dot" aria-hidden="true" />
                  <span className="snav-label">{s.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="snav-toggle"
          aria-expanded={open}
          aria-label={open ? "Close section menu" : "Open section menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="snav-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="snav-toggle-text">Sections</span>
        </button>
      </nav>
    </div>
  );
}
