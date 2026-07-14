# Adhiroha — Next.js

The Adhiroha Yoga School site rebuilt on **Next.js (App Router)**, preserving the
original design, markup, styles and behaviour exactly, while adding the SEO and
performance benefits of Next.js (static generation, clean URLs, per-page
metadata, a sitemap, and legacy-URL redirects).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
# or a production build:
npm run build && npm run start
```

## How it works

The original static HTML lives one directory up (`../*.html`) and is treated as
the **source of truth**. A generator reads those files and emits the Next.js
routes, so the conversion is reproducible rather than hand-copied.

On every page the shared navbar + mobile drawer are nested *inside* the page's
hero section, so each route renders its **full original `<body>`** (hero image,
navbar, drawer, content and footer) rather than hoisting a shared header into the
layout. This keeps every page pixel-identical to its source.

- `app/layout.jsx` — root layout. Holds `<html>`/`<body>`, global CSS, and loads
  Leaflet (used by the location maps) before the app becomes interactive.
- `app/(main)/layout.jsx` — imports `adhiroha.min.css`, shared by every page
  except the homepage. The homepage (`app/page.jsx`) ships its own styles.
- `app/(main)/<slug>/page.jsx` — one route per original page. Each renders its
  full original body markup (`content.js`) plus its inline styles (`styles.css`)
  and runs its original JavaScript (`scripts.js`) via `components/PageScripts.jsx`.
- `components/PageScripts.jsx` — runs a page's inline JS on mount, and cleans up
  window listeners + re-fires deferred (`load`-based) init on client navigation.
- `app/sitemap.js`, `app/robots.js` — SEO endpoints.
- `next.config.mjs` — 308-redirects every old `*.html` URL to its clean route.

### Regenerating

If you change the source HTML in the parent folder, re-run:

```bash
node scripts/generate.mjs
```

This rewrites the homepage files under `app/_home/` and every
`app/(main)/<slug>/` route (`content.js`, `styles.css`, `scripts.js`, `page.jsx`).

### Notes / possible follow-ups

- `metadataBase` and the sitemap/robots domain are set to
  `https://www.adhiroha.com` (`app/layout.jsx`, `app/sitemap.js`,
  `app/robots.js`). Change these if the domain differs.
- Static assets (`img/`, `gallery/`, `css/`, `js/`, root images) are copied into
  `public/`. Re-copy them if the originals change.
- Leaflet is currently loaded on every page (as the original site did). It could
  be scoped to only the 10 pages that render a map for a small perf win.
- Images use plain `<img>` for pixel-identical output. They could be migrated to
  `next/image` for further optimisation.
