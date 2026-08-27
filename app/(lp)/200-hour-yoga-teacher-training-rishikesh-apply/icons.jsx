/**
 * Line icons for the landing page, drawn to one grid: 24×24, 1.6 stroke, round
 * caps and joins, nothing filled. Keeping them in one file means they stay a
 * set rather than drifting apart as sections get added.
 *
 * They are drawn from the ashram's own vocabulary — a lotus, a seated figure,
 * the river, a singing bowl — rather than the usual stock symbols, because the
 * subject has its own iconography and borrowing a briefcase would say nothing.
 */

const PATHS = {
  // a seated teacher: head, folded legs, the shape everyone recognises
  teacher: <><circle cx="12" cy="5.4" r="2.4" /><path d="M12 8.4v5.2" /><path d="M4.5 19.2c1.4-2.6 4.3-4.2 7.5-4.2s6.1 1.6 7.5 4.2" /><path d="M6.6 19.2h10.8" /></>,
  // the shala roof over the hill it sits on
  ashram: <><path d="M3 10.5 12 4l9 6.5" /><path d="M5.4 10.2V20h13.2v-9.8" /><path d="M9.4 20v-5.2h5.2V20" /></>,
  lotus: <><path d="M12 20c-4.4 0-8-2.6-8-5.8 2 0 3.7.6 5 1.6" /><path d="M12 20c4.4 0 8-2.6 8-5.8-2 0-3.7.6-5 1.6" /><path d="M12 20c-2.6-2-4-4.3-4-6.6 0-2.6 1.5-4.9 4-6.9 2.5 2 4 4.3 4 6.9 0 2.3-1.4 4.6-4 6.6z" /></>,
  // a certificate seal with its ribbon
  seal: <><circle cx="12" cy="9.2" r="5.2" /><path d="M9.2 13.6 8 20.4l4-2 4 2-1.2-6.8" /></>,
  tick: <><path d="M20 6.5 9.4 17 4 11.6" /></>,
  chev: <><path d="m6 9.5 6 6 6-6" /></>,
  phone: <><path d="M21.4 16.9v2.7a1.8 1.8 0 0 1-2 1.8 17.8 17.8 0 0 1-7.8-2.8 17.6 17.6 0 0 1-5.4-5.4A17.8 17.8 0 0 1 3.4 5.4a1.8 1.8 0 0 1 1.8-2h2.7a1.8 1.8 0 0 1 1.8 1.6c.1.9.3 1.7.6 2.5a1.8 1.8 0 0 1-.4 1.9L8.7 10.5a14.4 14.4 0 0 0 5.4 5.4l1.1-1.2a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.5 2.5.6a1.8 1.8 0 0 1 1.6 1.8z" /></>,
  plane: <><path d="M3 13.2 21 5l-3.4 8.6L21 19l-6.6-2.4-3.4 3.4-.5-4.6z" /></>,
  bed: <><path d="M3 18.5v-9" /><path d="M3 12.6h18v5.9" /><path d="M6.6 12.6V9.4h5.2v3.2" /><path d="M14 12.6V9.4h5.2" /></>,
  // a singing bowl, which is also the ashram's dinner thali
  bowl: <><path d="M3.6 11.4h16.8c0 4.2-3.8 7.6-8.4 7.6s-8.4-3.4-8.4-7.6z" /><path d="M9 8.2c0-1.4 1.4-2.4 3-2.4s3 1 3 2.4" /></>,
  book: <><path d="M4 5.2h5.4c1.4 0 2.6 1 2.6 2.3V19c0-1-1-1.8-2.2-1.8H4z" /><path d="M20 5.2h-5.4c-1.4 0-2.6 1-2.6 2.3V19c0-1 1-1.8 2.2-1.8H20z" /></>,
  river: <><path d="M3 9c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0" /><path d="M3 14c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0" /><path d="M3 19c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0" /></>,
  path: <><path d="M8.5 21c0-4 7-5.4 7-9.4a3.5 3.5 0 0 0-7 0" /><circle cx="8.5" cy="4.4" r="2" /><path d="M5 21h14" /></>,
  wifi: <><path d="M3.6 9.4a13 13 0 0 1 16.8 0" /><path d="M6.9 13a8.4 8.4 0 0 1 10.2 0" /><path d="M10.1 16.4a3.6 3.6 0 0 1 3.8 0" /><circle cx="12" cy="19.6" r="0.6" /></>,
};

export function Icon({ name }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg className="lp-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {d}
    </svg>
  );
}

/**
 * Google's own four-colour G. Reproduced rather than approximated, because the
 * rating beside it is Google's — a grey circle would read as a generic star
 * rating and lose exactly the trust the mark is carrying.
 */
export function GoogleMark() {
  return (
    <svg className="lp-g" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12.1c-.2 2-1.6 5-4.5 7l6.9 5.4c4.1-3.8 6.6-9.4 6.6-15.7z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-7.1 5.5C8.1 41.1 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.5 28.4c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4l-7.1-5.6C2.9 16.9 2 20.3 2 24s.9 7.1 2.4 10.1z" />
      <path fill="#EA4335" d="M24 10.5c4.1 0 6.9 1.8 8.5 3.3l6.2-6C34.9 4.4 29.9 2 24 2 15.4 2 8.1 6.9 4.4 13.9l7.1 5.6c1.8-5.3 6.7-9 12.5-9z" />
    </svg>
  );
}
