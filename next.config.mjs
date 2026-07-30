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
    ];
  },

  // Baseline security headers. No Content-Security-Policy yet: the site loads
  // Hotjar, Leaflet and Razorpay and runs several inline scripts, so a CSP needs
  // its own careful pass rather than a guess that breaks checkout.
  async headers() {
    return [
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
