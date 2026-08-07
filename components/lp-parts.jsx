// Shared ornaments for the landing page, lifted from the site's own visual
// language: a dotted flourish either side of the kicker, and the sunburst rule
// that sits under a centred heading. Without these the page reads like a
// generic template rather than like Adhiroha.

export function Kicker({ children, light = false }) {
  return (
    <span className={`lpk${light ? " lpk-light" : ""}`}>
      <Flourish />
      {children}
      <Flourish flip />
    </span>
  );
}

function Flourish({ flip = false }) {
  return (
    <svg className={`lpk-orn${flip ? " flip" : ""}`} width="34" height="8" viewBox="0 0 34 8"
         fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
      <path d="M1 4c5-4 10 4 15 0s10-4 17 0" />
      <circle cx="32" cy="4" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Sunburst() {
  return (
    <svg className="lp-sun" width="150" height="40" viewBox="0 0 150 40" fill="none"
         stroke="currentColor" strokeLinecap="round" aria-hidden="true">
      {/* rays */}
      <g strokeWidth="1.2">
        {Array.from({ length: 13 }, (_, i) => {
          const a = (Math.PI / 12) * i;
          const x = 75 - Math.cos(a) * 20, y = 30 - Math.sin(a) * 20;
          const x2 = 75 - Math.cos(a) * 29, y2 = 30 - Math.sin(a) * 29;
          return <line key={i} x1={x} y1={y} x2={x2} y2={y2} />;
        })}
      </g>
      {/* sun */}
      <path d="M60 30a15 15 0 0 1 30 0z" fill="currentColor" stroke="none" />
      {/* rule with end diamonds */}
      <line x1="8" y1="30" x2="57" y2="30" strokeWidth="1.1" />
      <line x1="93" y1="30" x2="142" y2="30" strokeWidth="1.1" />
      <path d="M5 30l3-3 3 3-3 3z" fill="currentColor" stroke="none" />
      <path d="M145 30l-3-3-3 3 3 3z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Tick() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
