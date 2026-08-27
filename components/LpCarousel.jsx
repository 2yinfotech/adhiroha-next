"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The ashram carousel.
 *
 * Scrolling is done by the browser — a scroll-snap track, so it is a native
 * swipe on a phone and keeps working with the keyboard and with JavaScript
 * still loading. The buttons only nudge that same track along, which is why
 * there is no transform or timer anywhere in here.
 *
 * It does not auto-advance. A slideshow that moves on its own takes the photo
 * away from someone who is still looking at it, and the ashram is the thing
 * this page is actually selling.
 */
export default function LpCarousel({ slides }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const scrollToCard = useCallback((i) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i];
    if (!card) return;
    // Clamped, so asking for a card near the end scrolls to the end of the
    // track rather than to a position the browser cannot reach.
    const max = track.scrollWidth - track.clientWidth;
    const target = Math.min(card.offsetLeft - track.offsetLeft, max);
    track.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  // Which card is under the left edge, so the dots and the disabled states stay
  // honest when someone swipes instead of pressing a button.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = track.scrollWidth - track.clientWidth;
        const left = track.scrollLeft;
        // The last card or two can never reach the left edge — the track runs
        // out of scroll first. Without this, their dots could never light up
        // and "next" looked broken at the end. At the end of the track, the
        // last card is the one being looked at.
        if (max - left < 2) { setActive(track.children.length - 1); return; }
        let nearest = 0, best = Infinity;
        for (let i = 0; i < track.children.length; i++) {
          const d = Math.abs(track.children[i].offsetLeft - track.offsetLeft - left);
          if (d < best) { best = d; nearest = i; }
        }
        setActive(nearest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); track.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div className="lp-car">
      <ul className="lp-car-track" ref={trackRef}>
        {slides.map((s, i) => (
          <li key={s.src} className="lp-car-card">
            <img src={s.src} alt={s.alt} loading={i < 2 ? "eager" : "lazy"} width="1200" height="800" />
            <span className="lp-car-cap">{s.cap}</span>
          </li>
        ))}
      </ul>

      <div className="lp-car-ctl">
        <button type="button" className="lp-car-btn" aria-label="Previous photo"
                onClick={() => scrollToCard(Math.max(0, active - 1))} disabled={active === 0}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <ol className="lp-car-dots">
          {slides.map((s, i) => (
            <li key={s.src}>
              <button type="button" className={i === active ? "on" : ""}
                      aria-label={`Photo ${i + 1} of ${slides.length}`} aria-current={i === active}
                      onClick={() => scrollToCard(i)} />
            </li>
          ))}
        </ol>
        <button type="button" className="lp-car-btn" aria-label="Next photo"
                onClick={() => scrollToCard(Math.min(slides.length - 1, active + 1))}
                disabled={active === slides.length - 1}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 6 6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
}
