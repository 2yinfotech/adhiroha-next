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
