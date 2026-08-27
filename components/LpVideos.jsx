"use client";

import { useState } from "react";

/**
 * Student review videos, as click-to-play facades.
 *
 * A landing page lives or dies on how fast it paints, and six embedded YouTube
 * players would pull in several hundred KB of third-party JavaScript before the
 * visitor has decided to watch anything. So each card is just a thumbnail until
 * it is clicked; only then does an iframe replace it, and only that one.
 *
 * youtube-nocookie.com is used because the pixel and the cookie banner already
 * govern what this page is allowed to store — an embed that sets its own
 * tracking cookies on load would sit outside that.
 */
export default function LpVideos({ videos }) {
  const [playing, setPlaying] = useState(null);

  return (
    <ul className="lp-vids">
      {videos.map((v, i) => (
        <li key={v.id} className="lp-vid">
          {playing === v.id ? (
            <iframe
              className="lp-vid-frame"
              src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
              title={v.label}
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button type="button" className="lp-vid-face" onClick={() => setPlaying(v.id)}>
              <img
                src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                alt=""
                loading={i < 3 ? "eager" : "lazy"}
                width="480"
                height="360"
              />
              <span className="lp-vid-play" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="8 5 19 12 8 19" /></svg>
              </span>
              <span className="lp-vid-cap">{v.label}</span>
              <span className="sr-only">Play {v.label}</span>
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
