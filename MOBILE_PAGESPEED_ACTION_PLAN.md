# Adhiroha.com — Mobile PageSpeed → 100 Action Plan

Target: `https://adhiroha.com/` · Form factor: **Mobile** · Framework: Next.js 15.1.6 (App Router), deployed on Hostinger (`next build` + `next start`).

This plan is ordered by **payoff-to-effort**. Do P0 first — those four items are responsible for the great majority of the mobile score loss. Everything after that is polish to reach a perfect/near-perfect score.

A realistic outcome: P0 alone should move mobile Performance from "poor/needs-improvement" into the 80s–90s. P0 + P1 gets you to green (90+) reliably. P2 + P3 close the last gap to 100 and lock in Best Practices / SEO / Accessibility.

---

## The root causes (what's actually slow)

| # | Problem | Evidence in your code | Lighthouse metric hit |
|---|---------|----------------------|-----------------------|
| 1 | **Fonts base64-inlined into render-blocking CSS** | `app/_home/styles.css` is **692 KB, of which 418 KB is base64 font data** across 8 `@font-face` blocks. `app/(main)/adhiroha.min.css` (397 KB) does the same. | FCP, LCP, Render-blocking |
| 2 | **Leaflet CSS + JS loaded on every page** | `app/layout.jsx` loads `leaflet.css` in `<head>` and `leaflet.js` with `strategy="beforeInteractive"` — globally, even on the homepage. | LCP, TBT, Render-blocking, "reduce unused JS/CSS" |
| 3 | **Hotjar loads in `<head>`** | Inline `HOTJAR_SCRIPT` in `app/layout.jsx` injects Hotjar synchronously on first paint. | TBT, "reduce third-party impact", Best Practices |
| 4 | **Oversized images** | Hero `img_shiva-adhiroha.webp` = 416 KB; `fevicon.png` = **1 MB**; `background-1.png` = 2.3 MB; `om-logo.png` = 1.4 MB; many 400–700 KB webp. `next.config.mjs` has `images: { unoptimized: true }`. | LCP, "properly size images", "efficiently encode" |
| 5 | **~418 KB of unused CSS + no critical-CSS split** | The full route stylesheet is a render-blocking `<link>`; most rules are for below-the-fold sections. | Render-blocking, "reduce unused CSS" |
| 6 | **Main-thread work from large inline HTML/script blobs** | `content.js` (176 KB HTML) via `dangerouslySetInnerHTML` + `scripts.js` inline. | TBT, "minimize main-thread work" |

Things you already did right (keep them): hero image is preloaded with `fetchpriority="high"`; 46 of 56 images use `loading="lazy"`; fonts use `font-display: swap`; pure-CSS reveal animation. The plan below builds on that.

---

## P0 — Do these first (≈80% of the win)

### P0.1 — Pull the fonts OUT of the CSS and self-host them as files

This is the **single highest-impact change.** Right now the browser cannot paint text until it downloads a **692 KB** stylesheet, 418 KB of which is font binary it doesn't even need to start rendering. Moving fonts to separate preloaded files drops the render-blocking CSS to **~274 KB** and lets fonts load in parallel.

**Steps:**

1. Extract each base64 `@font-face` `src` into a real `.woff2` file. Quick script (run once, locally):

   ```bash
   # For each "src:url(data:font/woff2;base64,XXXX)" block, decode to a file.
   # Example for one font — repeat per weight, or script the extraction:
   node -e '
     const fs=require("fs");
     const css=fs.readFileSync("app/_home/styles.css","utf8");
     const re=/base64,([A-Za-z0-9+\/=]+)/g; let m,i=0;
     while((m=re.exec(css))){fs.writeFileSync(`public/fonts/font-${i++}.woff2`,Buffer.from(m[1],"base64"));}
     console.log(i,"fonts written to public/fonts/");
   '
   ```

   You have Playfair Display (multiple weights) and Poppins. Name them properly, e.g. `public/fonts/playfair-400.woff2`, `poppins-400.woff2`, etc.

2. In `app/_home/styles.css` (and `adhiroha.min.css`), replace every `src:url(data:font/woff2;base64,…)` with a file URL and add `font-display: swap`:

   ```css
   @font-face{
     font-family:'Playfair Display';
     font-style:normal; font-weight:400;
     font-display:swap;
     src:url(/fonts/playfair-400.woff2) format('woff2');
   }
   ```

3. Preload only the **1–2 fonts used above the fold** (likely the hero heading weight) in `app/page.jsx`, next to the existing hero preload:

   ```jsx
   <link rel="preload" as="font" type="font/woff2"
         href="/fonts/playfair-700.woff2" crossOrigin="anonymous" />
   ```

   Do **not** preload all 8 — that just re-creates the blocking problem.

**Even better (recommended for a migrated site):** use `next/font/local`, which self-hosts, subsets, and auto-generates the preload + `size-adjust` fallback (kills font-swap layout shift, helping CLS):

```jsx
// app/fonts.js
import localFont from "next/font/local";
export const playfair = localFont({
  src: [{ path: "../public/fonts/playfair-400.woff2", weight: "400" },
        { path: "../public/fonts/playfair-700.woff2", weight: "700" }],
  variable: "--font-playfair", display: "swap",
});
```

Then apply `playfair.variable` to `<html>` in `layout.jsx` and reference `var(--font-playfair)` in CSS.

> Apply the same extraction to `app/(main)/adhiroha.min.css` (397 KB) — the sub-pages have the identical inlined-font problem.

**Expected impact:** render-blocking CSS 692 KB → ~274 KB (before P1 purge); large FCP/LCP improvement; fonts cache separately across pages instead of re-downloading inside each route's CSS.

---

### P0.2 — Stop loading Leaflet on pages that have no map

`app/layout.jsx` currently loads Leaflet **globally**: the CSS via a `<head>` `<link>` and the JS with `strategy="beforeInteractive"` (the most blocking strategy there is). The homepage's LCP waits on a map library it may not even use above the fold.

**Fix — remove both from `layout.jsx`:**

```jsx
// DELETE from app/layout.jsx <head>:
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossOrigin="" />

// DELETE from app/layout.jsx <body>:
<Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        strategy="beforeInteractive" crossOrigin="" />
```

**Load it only where a map actually exists, and lazily.** Create a small client component and drop it only into the pages that render a `#map` element:

```jsx
// components/LeafletLoader.jsx
"use client";
import Script from "next/script";
export default function LeafletLoader() {
  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="lazyOnload" />
    </>
  );
}
```

Even better: self-host `leaflet.js`/`leaflet.css` in `/public/vendor/leaflet/` so you drop the third-party `unpkg.com` origin entirely (removes a DNS+TLS+request from the critical path and a Best-Practices flag). If you keep unpkg, at minimum add `<link rel="preconnect" href="https://unpkg.com" crossOrigin="" />`.

Your map-init code in each `scripts.js` should guard on the element existing (`if (document.getElementById('map'))`) so lazy loading is safe.

**Expected impact:** removes a render-blocking stylesheet + a `beforeInteractive` script from every non-map page (including the homepage). Big TBT/LCP win.

---

### P0.3 — Defer Hotjar (and any analytics) off the critical path

Hotjar is injected inline in `<head>`, so it competes with first paint. It does not need to run until the page is interactive/idle.

**Fix in `app/layout.jsx`** — convert the inline `<script>` to `next/script` with `lazyOnload`:

```jsx
import Script from "next/script";
// ...replace the <script dangerouslySetInnerHTML={{__html: HOTJAR_SCRIPT}} /> with:
<Script id="hotjar" strategy="lazyOnload">{HOTJAR_SCRIPT}</Script>
```

`lazyOnload` fires after the window `load` event, so Hotjar no longer costs you FCP/LCP/TBT. Add `<link rel="preconnect" href="https://static.hotjar.com" />` if you want the recording to warm up a touch faster once it does load.

> Keep the `CONTACT_FORM_SCRIPT` inline as-is — it's tiny and intentionally parse-time. It's fine.

**Expected impact:** removes third-party main-thread work from initial load; direct TBT and Best-Practices improvement.

---

### P0.4 — Fix the images (this is a Core Web Vitals and payload issue)

Because your HTML is injected via `dangerouslySetInnerHTML`, Next's `<Image>` optimizer never runs (and `images.unoptimized:true` disables it anyway). So the fix is to **make the source files small and correctly sized**, plus serve responsive variants.

**a) The favicon is 1 MB.** `fevicon.png` (1042 KB) and `app/icon.png` (257 KB) are being shipped as-is. A favicon should be a few KB.

```bash
# Generate proper small icons (needs sharp or imagemagick)
npx sharp-cli -i fevicon.png -o public/favicon-32.png resize 32 32
# Keep app/icon.png for the 512 install icon but recompress it:
npx sharp-cli -i app/icon.png -o app/icon.png resize 512 512
```

Aim: favicon ≤ 10 KB, `icon.png` ≤ 40 KB, `apple-icon.png` is already fine (28 KB).

**b) Compress + right-size the hero (LCP element).** 416 KB is large for a mobile LCP. Re-encode at ~75–80 quality and generate a mobile-width variant, then serve with `srcset`:

```bash
npx sharp-cli -i public/img/remote/img_shiva-adhiroha.webp \
  -o public/img/remote/img_shiva-adhiroha-800.webp resize 800
```

In `content.js`, upgrade the hero `<img>` to responsive (keep `fetchpriority="high"` + width/height to protect CLS):

```html
<img class="u-img" src="/img/remote/img_shiva-adhiroha.webp"
     srcset="/img/remote/img_shiva-adhiroha-800.webp 800w,
             /img/remote/img_shiva-adhiroha.webp 1500w"
     sizes="100vw" width="1500" height="1000"
     alt="…" loading="eager" fetchpriority="high" decoding="async">
```

And update the preload in `page.jsx` to match (`imagesrcset`/`imagesizes`) so you don't preload the wrong size on mobile:

```jsx
<link rel="preload" as="image"
      href="/img/remote/img_shiva-adhiroha-800.webp"
      imageSrcSet="/img/remote/img_shiva-adhiroha-800.webp 800w, /img/remote/img_shiva-adhiroha.webp 1500w"
      imageSizes="100vw" type="image/webp" fetchPriority="high" />
```

**c) Bulk-shrink the oversized assets.** These are shipped from `/public` and are far bigger than needed:

| File | Now | Target |
|------|-----|--------|
| `public/background-1.png` | 2.3 MB | → webp, < 200 KB |
| `public/uploads/heart-002.webp` | 2.2 MB | resize + re-encode, < 200 KB |
| `public/om-logo.png` / `logo-black1.png` | 1.4 / 1.4 MB | → webp, < 60 KB |
| `public/img/**` many at 400–700 KB | — | re-encode q75, < 150 KB each |

One-liner to batch-recompress webp files in place (back them up first):

```bash
find public -iname '*.webp' -size +200k -exec npx sharp-cli -i {} -o {} --quality 75 \;
```

**d) Add `width`/`height` (or `aspect-ratio`) to every `<img>`** that lacks them, to eliminate CLS. Most of your images already have dimensions — audit the ~10 that don't.

**e) Lazy-load the remaining eager images.** You have 56 `<img>`, 46 are `loading="lazy"`, 1 is the eager hero. Add `loading="lazy"` to the other ~9 that are below the fold (do **not** lazy-load the hero).

**Expected impact:** the biggest single-page payload reduction; directly improves LCP and the "properly size images" / "efficiently encode" / "enormous network payloads" audits.

---

## P1 — Get to solid green (90+)

### P1.1 — Purge unused CSS and inline critical CSS
After P0.1 the homepage stylesheet is ~274 KB, but most of it styles below-the-fold sections. Run PurgeCSS against the rendered HTML (`content.js`) to drop unused rules, then inline the above-the-fold subset and load the rest non-blocking.

```bash
npx @fullhuman/postcss-purgecss # or the purgecss CLI
npx purgecss --css app/_home/styles.css --content app/_home/content.js --output app/_home/
```

Critical-CSS pattern (inline the small critical set, defer the rest):

```jsx
<style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
<link rel="preload" href="/styles/home.css" as="style" onLoad="this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="/styles/home.css" /></noscript>
```

Do the same for `adhiroha.min.css` on the sub-page routes. **Expected:** removes the "Eliminate render-blocking resources" and "Reduce unused CSS" opportunities almost entirely.

### P1.2 — Enable Brotli/Gzip + long-cache headers on Hostinger
Since you run `next start` behind Hostinger, add compression and immutable caching. If a reverse proxy/`.htaccess` fronts it, set:

```apache
# hostinger-node.htaccess — compress text assets, cache static hard
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/css application/javascript image/svg+xml application/json
</IfModule>
<IfModule mod_headers.c>
  <FilesMatch "\.(woff2|webp|avif|png|jpg|jpeg|svg|css|js)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>
```

Next already fingerprints `/_next/static`, so immutable caching there is safe. For `/img` and `/fonts`, immutable is fine as long as you version filenames when you change them. **Expected:** fixes "serve static assets with efficient cache policy" and "enable text compression".

### P1.3 — Trim main-thread work
`content.js` is a 176 KB HTML string and `scripts.js` runs inline. Where possible, move non-essential JS (carousels, accordions, map init) behind `requestIdleCallback` or intersection observers so it doesn't inflate TBT. Confirm nothing in `scripts.js` runs heavy work synchronously on load.

---

## P2 — Close the last gap to 100

- **Preconnect** any remaining third-party origins early: `unpkg.com` (if kept), `static.hotjar.com`. Remove them entirely by self-hosting for a cleaner Best-Practices score.
- **Convert PNGs to WebP/AVIF** wherever still used (`background-1.png`, logos). You already prefer webp — finish the job.
- **Verify no console errors** in production (Best Practices penalizes them) — the FooterLinkFix / map guards should be clean.
- **HTTP → HTTPS + www canonical**: confirm the 301 to `www.adhiroha.com` (noted in your DEPLOY.md) doesn't add a redirect hop on the tested URL; test the final canonical URL directly.

## P3 — Accessibility, SEO & Best-Practices to 100

These don't show in the raw payload but count toward the four category scores PageSpeed reports:

- **Tap targets ≥ 48px** and adequate spacing — check the top-bar mail/phone links and footer links on mobile.
- **Color contrast ≥ 4.5:1** for body text and the header links over the hero image (a hero overlay/scrim helps both contrast and LCP text legibility).
- **Every `<img>` has a meaningful `alt`** (your hero does — audit the gallery images).
- **One `<h1>` per page**, logical heading order — verify the injected `content.js` markup.
- **`lang` attribute** is set (`<html lang="en">` ✓; ensure `/de`, `/fr`, `/es` routes set their own).
- **Meta viewport, titles, descriptions, canonical, hreflang** — already strong in your metadata; keep it.

---

## Suggested execution order (checklist)

1. [ ] P0.1 Extract fonts from `styles.css` + `adhiroha.min.css`; self-host; preload 1–2.
2. [ ] P0.2 Remove Leaflet from `layout.jsx`; load lazily only on map pages (self-host it).
3. [ ] P0.3 Convert Hotjar to `next/script` `lazyOnload`.
4. [ ] P0.4 Shrink favicon (1 MB → ≤10 KB), compress hero + responsive `srcset`, batch-recompress `/public` images, lazy-load remaining eager imgs.
5. [ ] Rebuild (`next build`) and re-test on PageSpeed mobile — expect a large jump here.
6. [ ] P1.1 PurgeCSS + critical-CSS split.
7. [ ] P1.2 Compression + cache headers on Hostinger.
8. [ ] P1.3 Defer non-critical JS.
9. [ ] P2/P3 Preconnect cleanup, PNG→WebP, contrast/tap-target/a11y audit.
10. [ ] Final re-test; iterate on whatever specific audits remain.

**Re-measure after each P0 item** so you can see which change moved the needle — the PageSpeed URL you're using regenerates a fresh Lighthouse run on each load. A local `npx lighthouse https://adhiroha.com --form-factor=mobile --preset=perf` gives you a faster feedback loop between deploys.

---

### A note on realistically hitting exactly 100 on mobile
100/100 on **mobile** is achievable for this site but strict — Lighthouse mobile throttles to a slow 4G / low-end CPU profile, so TBT and LCP are unforgiving. The font extraction (P0.1), killing global Leaflet (P0.2), deferring Hotjar (P0.3), and the hero image work (P0.4) are what get you from "poor" to green. The last few points to a perfect 100 usually come from critical-CSS (P1.1) and shaving third-party JS (Hotjar is the main remaining cost — if a perfect score matters more than heatmaps, consider loading Hotjar only for a sampled % of sessions or removing it from the LCP-critical landing pages).
