// Retreat URL in each locale, and the Sadhana Immersion Programme page it now
// points at. Written out rather than derived from lib/i18n-routes.js, because
// the retreat has been removed from that map: hreflang must stop advertising a
// page that no longer exists, while these redirects have to keep working for as
// long as the old URLs are linked to anywhere on the web.
const RETREAT_REDIRECTS = [
  ["/yoga-retreat-in-rishikesh/", "/sadhana-immersion-programme/"],
  ["/da/yoga-og-ayurveda-retreat-rishikesh/", "/da/sadhana-fordybelsesprogram/"],
  ["/de/yoga-retreat-rishikesh/", "/de/sadhana-immersion-programm/"],
  ["/es/retiro-yoga-ayurveda-rishikesh/", "/es/programa-inmersion-sadhana/"],
  ["/fr/retraite-yoga-ayurveda-rishikesh/", "/fr/programme-immersion-sadhana/"],
  ["/it/ritiro-yoga-ayurveda-rishikesh/", "/it/programma-immersione-sadhana/"],
  ["/ja/yoga-ayurveda-retreat-rishikesh/", "/ja/sadhana-immersion-program/"],
  ["/nl/yoga-en-ayurveda-retraite-rishikesh/", "/nl/sadhana-immersie-programma/"],
  ["/pl/odosobnienie-jogi-i-ajurwedy-rishikesh/", "/pl/program-immersji-sadhana/"],
  ["/pt/retiro-de-yoga-e-ayurveda-rishikesh/", "/pt/programa-de-imersao-sadhana/"],
  ["/sv/yoga-och-ayurveda-retreat-rishikesh/", "/sv/sadhana-fordjupningsprogram/"],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hostinger's Next.js deployment runs `next build` followed by `next start`.
  // Do not use `output: "export"` here: static export mode cannot be started
  // by the Next.js server.

  // Keep the site's existing trailing-slash URLs (e.g. /about-us/).
  trailingSlash: true,

  reactStrictMode: true,

  images: {
    // The site uses original image assets; serve them as-is.
    unoptimized: true,
  },

  // Every language the old site published on the languages subdomain (/de, /es,
  // /fr, /it, /pl, /pt, /nl, /sv, /da, /ja) is now served natively from
  // app/<lang>, so there is no language redirect left — adding one back would
  // send a live localized route off-site.
  async redirects() {
    return [
      // Apex → www, 301, path and query preserved. Both hostnames used to answer
      // 200 with the full site, which splits crawl budget and inbound links
      // across two hosts even though every canonical points at www.
      //
      // This only fires when Next.js actually sees the public Host header. On
      // Hostinger the site sits behind an Apache reverse proxy that rewrites
      // Host to 127.0.0.1:3000 unless ProxyPreserveHost is on, so the same
      // redirect is also declared in hostinger-node.htaccess ahead of the proxy
      // rule — that copy is the one that does the work in production.
      //
      // Split in two so the trailing slash survives: with trailingSlash: true a
      // single `/:path*` rule would send /about-us/ to /about-us and cost a
      // second hop to put the slash back. `statusCode: 301` rather than
      // `permanent: true`, which emits 308 — equivalent to Google, but 301 is
      // what every checker and curl -I looks for.
      {
        source: "/",
        has: [{ type: "host", value: "adhiroha.com" }],
        destination: "https://www.adhiroha.com/",
        statusCode: 301,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "adhiroha.com" }],
        destination: "https://www.adhiroha.com/:path+/",
        statusCode: 301,
      },
      // Articles live at /blog/<slug>; send the bare /blog to the listing page.
      { source: "/blog", destination: "/blogs/", permanent: false },
      // The registration form used to be Registration.php on the old site, and
      // links carrying ?view=<booking id> are still in students' inboxes. Next
      // passes the query string through, so ?view= survives the hop. Both
      // capitalisations are listed because redirect sources are case-sensitive
      // and the old links were sent with a capital R.
      { source: "/Registration.php", destination: "/registration/", statusCode: 301 },
      { source: "/registration.php", destination: "/registration/", statusCode: 301 },
      // Four URLs that 404 but are still in Google's index and still taking
      // impressions. /500-hour-…-in-india in particular outranks the real 500
      // hour page on "500 hour yoga school in india" while returning nothing at
      // all, so the equity is being thrown away rather than passed on.
      {
        source: "/500-hour-yoga-teacher-training-course-in-india",
        destination: "/500-hour-yoga-teacher-training-course-rishikesh/",
        statusCode: 301,
      },
      {
        source: "/200-hour-yoga-teacher-training-course-in-rishikesh",
        destination: "/200-hour-yoga-teacher-training-course-rishikesh/",
        statusCode: 301,
      },
      // A truncated version of the 200 hour URL is in circulation — the slug is
      // cut off mid-word at "rishik". Somewhere it was linked or shared with the
      // tail missing, so it 404s instead of landing on the course page.
      {
        source: "/200-hour-yoga-teacher-training-course-rishik",
        destination: "/200-hour-yoga-teacher-training-course-rishikesh/",
        statusCode: 301,
      },
      {
        source: "/200-hour-yoga-teacher-training-course-in-india",
        destination: "/200-hour-yoga-teacher-training-course-rishikesh/",
        statusCode: 301,
      },
      {
        source: "/300-hour-yoga-teacher-training-course-in-india",
        destination: "/300-hour-yoga-teacher-training-course-rishikesh/",
        statusCode: 301,
      },
      // The Yoga Retreat is discontinued. Each locale's retreat URL goes to that
      // same locale's Sadhana Immersion Programme, which is the nearest thing we
      // still run and the course that replaced it in the admission panel. These
      // pages were indexed in eleven languages, so they are redirected rather
      // than dropped: a 301 carries the ranking over instead of throwing it away
      // and leaving every inbound link on a 404.
      ...RETREAT_REDIRECTS.map(([from, to]) => ({
        source: from.replace(/\/$/, ""),
        destination: to,
        statusCode: 301,
      })),
    ];
  },

  // Baseline security headers. No Content-Security-Policy yet: the site loads
  // Hotjar, Leaflet and Razorpay and runs several inline scripts, so a CSP needs
  // its own careful pass rather than a guess that breaks checkout.
  async headers() {
    return [
      {
        // Course and marketing pages change a few times a month, not a few
        // times a day. Without a Cache-Control header every request rebuilt the
        // page on the origin, which is why TTFB swung between 0.46s and 1.72s.
        // s-maxage lets Cloudflare and any CDN in front serve from the edge
        // while stale-while-revalidate keeps a refresh from ever being a miss.
        source: "/((?!api|student-admission-panel|registration|blog|blogs).*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
