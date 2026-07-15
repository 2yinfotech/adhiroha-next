import "./globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://www.adhiroha.com"),
  title: "Adhiroha Yoga School",
  description:
    "Adhiroha Yoga School — Yoga Alliance certified teacher training courses and retreats in Rishikesh, India.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Leaflet CSS — used by the location maps that appear across the site. */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          crossOrigin=""
        />
      </head>
      <body>
        {children}
        {/* Reveal-on-scroll, run inline at parse time (before React hydration).
            The page-specific scripts also set this up, but they only run after
            hydration — on a slow connection that leaves every `.reveal` block
            (which defaults to opacity:0) blank for a long, visible window. This
            early copy reveals content as soon as it scrolls into view, and
            falls back to showing everything if IntersectionObserver is missing. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){function r(){var e=document.querySelectorAll('.reveal');if(!e.length)return;if(!('IntersectionObserver' in window)){for(var i=0;i<e.length;i++)e[i].classList.add('in');return;}var o=new IntersectionObserver(function(n){n.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');o.unobserve(x.target);}})},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});for(var j=0;j<e.length;j++)o.observe(e[j]);}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',r);}else{r();}window.addEventListener('load',function(){setTimeout(function(){var h=document.querySelectorAll('.reveal:not(.in)');for(var i=0;i<h.length;i++){if(h[i].getBoundingClientRect().top<window.innerHeight)h[i].classList.add('in');}},600);});})();",
          }}
        />
        {/* Leaflet must be present before the page 'load' handlers run their
            map init, so load it before the app becomes interactive. */}
        <Script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          strategy="beforeInteractive"
          crossOrigin=""
        />
      </body>
    </html>
  );
}
