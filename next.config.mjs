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
};

export default nextConfig;
