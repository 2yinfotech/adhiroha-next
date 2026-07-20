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

  // The old site's language switcher links (/de, /fr, …) are already indexed by
  // Google, but those localized pages now live on the languages subdomain. Send
  // every language-code URL there permanently so the live links never 404.
  async redirects() {
    return [
      {
        source: "/:lang(da|de|es|fr|it|ja|nl|pl|pt|sv)",
        destination: "https://languages.adhiroha.com/:lang",
        permanent: true,
      },
      // Articles live at /blog/<slug>; send the bare /blog to the listing page.
      { source: "/blog", destination: "/blogs/", permanent: false },
    ];
  },
};

export default nextConfig;
