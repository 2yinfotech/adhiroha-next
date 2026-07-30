# Action Plan — adhiroha.com

Ordered by impact per unit of effort. Every item cites the finding it closes; see `FULL-AUDIT-REPORT.md` for evidence.

---

## Phase 1 — Critical Fixes (Week 1)

### 1.1 Put the 163 blog articles in the sitemap — *Critical, ~1 hour*

`app/sitemap.js` emits 211 static routes and no `/blog/<slug>/` URLs. 44% of the site's indexable pages have no sitemap signal.

Make `sitemap.js` async, read the article slugs from the same source `/blogs/` uses, and append them. Give articles a `lastmod` from their DB row and a lower `priority` than the course pages.

Do this **after** 1.2, so the sitemap does not advertise the duplicates.

### 1.2 Resolve the 27 duplicate article pairs — *Critical, ~3 hours*

54 URLs, measured 93.7–96.4% identical, each self-canonicalising. Full list in `findings/content.md`.

For each `slug` / `slug1` pair, pick the better version (usually the non-`1`, which is consistently ~10 words longer) and then either:

- **preferred** — 301 the `…1` URL to the keeper and delete the DB row; or
- if the redirect cannot be done at the data layer, emit `<link rel="canonical">` on the `…1` page pointing at the keeper.

Also fix `/blog/Yoga for Seniors: A Beginner-Friendly Guide to Getting Started/` — the slug contains literal spaces and a colon and returns 404. Re-slug it to `yoga-for-seniors-beginner-friendly-guide` and correct the link on `/blogs/`.

### 1.3 Fix Open Graph on 25 English subpages — *High, ~1 hour*

`og:url` and `og:title` on the 200/300/500-hour course pages, `/about-us/`, `/contact-us/`, `/blogs/` and 19 others are the **homepage's** values, because those `page.jsx` files set no `openGraph` and inherit the root layout's block verbatim.

Every course-page share on WhatsApp — the dominant channel for this audience — currently previews as the homepage.

The correct pattern already exists in `app/(main)/yoga-teacher-training-course-rishikesh-india/page.jsx`. Better: build a small `pageMetadata({ title, description, path, image })` helper in `lib/seo.js` that always sets `openGraph.url` from `path`, and use it on every route. That closes the localized-page half of the bug too — those override `openGraph` without `images`, dropping the og:image on 175 pages.

### 1.4 301 non-www → www — *High, ~15 minutes*

`https://adhiroha.com/` serves the full site with HTTP 200 (429 KB). Add a Cloudflare redirect rule to 301 the apex to `www`. Canonicals already point to `www`, so this is cleanup rather than an emergency — but it is a 15-minute fix.

---

## Phase 2 — High-Impact Improvements (Weeks 2–3)

### 2.1 Rebuild hreflang properly — *High, ~4 hours*

Two defects: 26 English pages declare **no** hreflang while 175 localized pages point at them (non-reciprocal annotations are discarded by Google), and localized subpages declare only 3 alternates instead of 11, so the ten language versions never cluster.

Replace the homepage-only `LANGUAGE_ALTERNATES` in `lib/seo.js` with a **route-equivalence map**: one entry per logical page, listing its URL in all 11 languages. Generate the full `alternates.languages` set from that map on *every* page including the English ones. The translated slugs already exist in `app/<lang>/(pages)/` — the map can be derived from the directory structure rather than hand-written.

This is the highest-leverage item for the ten translated sites, which currently get little benefit from their hreflang.

### 2.2 Responsive images — *High, ~4 hours*

0 of 56 homepage images use `srcset`. Mobile pulls 2.31 MB, including a 416 KB / 1500 px LCP hero displayed at 390 px.

Generate 480/768/1200/1600 px WebP variants for the ~20 largest images and add `srcset` + `sizes`, starting with the LCP hero on each template. Expect roughly 1.5 MB saved on mobile and homepage LCP moving from 4.4 s toward the 2.5 s "good" threshold.

Note `next.config.mjs` sets `images: { unoptimized: true }`, so this needs either a build-time image pipeline or hand-generated variants — enabling the Next.js image optimizer on Hostinger is the other option and worth evaluating.

### 2.3 Add Article schema to the 163 articles — *High, ~2 hours*

Articles carry only the site-wide organization graph. Add `BlogPosting` with `headline`, `image`, `datePublished`, `dateModified`, `author` and `mainEntityOfPage`, plus a `BreadcrumbList`. Requires 2.4 to supply real author and date values — do not invent them.

### 2.4 Author and date bylines on articles — *High, ~4 hours + editorial*

No `datePublished`, no `author`, no visible byline on any of the 163 articles. 60+ of them make health claims (diabetes, thyroid, PCOS, menopause, heart disease) — the highest-E-E-A-T-risk content on the site.

Add author and publish/updated dates to the article schema and render them visibly. Attribute the health articles to a named teacher with stated credentials, and add a short reviewed-by line. If the dates are not in the DB, add the columns.

### 2.5 Trim titles and meta descriptions — *Medium, ~3 hours*

78 titles exceed 60 characters (35 exceed 70); 121 meta descriptions exceed 160 characters. Mostly mechanical — the localized course pages are the worst offenders.

### 2.6 Ship the `/blogs/` band fix and cover the last 3 pages — *Low, ~1 hour*

The internal-linking work is **already live** (commit `637cd2f`); sitewide keyword anchor coverage measured on production is 45/16/14/19/12 across the five target keywords, up from 3/0/0/3/0.

Two loose ends found by the local-build audit:

1. **`/blogs/` was silently dropping its band** — `app/(main)/blogs/page.jsx` splices `content.js` between the category grid and `<footer>`, and the band sits inside the discarded region. Fixed locally by slicing the tail from the band marker instead of `<footer>`; verified rendering with the 97-article grid intact. **Not yet deployed.**
2. **Three English pages have no band** — `/apply-for-teacher-in-rishikesh/`, `/volunteer-opportunity-in-rishikesh/` and `/weather/` are component-based rather than `content.js`-driven, so `scripts/related-links.mjs` skips them. Either render the band from a shared React component on those routes, or accept the gap (they are low-value utility pages).

---

## Phase 3 — Content & Authority (Month 2)

### 3.1 Decide the AI-crawler position — *Decision, ~30 minutes*

`robots.txt` blocks `GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended` and `meta-externalagent` via Cloudflare's managed rules. The site cannot be cited by ChatGPT, Claude or Meta AI and is excluded from Gemini grounding. Google Search indexing is unaffected.

This is a business decision, not a bug. For a school whose customers research heavily before booking, being citable in AI answers is likely worth more than the training-data concession — but that is the owner's call. If you want the visibility, unblock `GPTBot` and `Google-Extended` in the Cloudflare AI-crawler settings.

### 3.2 Fix `<html lang>` server-side — *Medium, ~2 hours*

All 211 pages ship `lang="en"`; `components/SetLang.jsx` corrects it only after hydration. Bing reads the served attribute and screen readers pick a voice from it, so Japanese and German pages are announced as English.

Give each language its own route-group `layout.jsx` that renders `<html lang="…">`, or read the locale in the root layout. Then delete `SetLang`.

### 3.3 Consolidate the thin health articles — *Medium, ongoing*

After 1.2 removes the duplicates, ~40 articles remain in the 740–920 word range on overlapping topics (six separate PCOS articles, five thyroid, seven diabetes). Merge each cluster into one authoritative 1,800–2,500 word guide and 301 the rest into it.

### 3.4 Normalise the 21 mixed-case slugs — *Low*

`/blog/Bloated-Again/`, `/blog/The-Honest-Truth/` and 19 others. No active collisions, so 301 them to lowercase when convenient.

### 3.5 Reduce HTML weight — *Medium*

Median 246 KB of HTML per page, max 441 KB, with 15 inline `<script>` blocks. Move repeated inline scripts into a shared external file so they can be cached across pages.

---

## Phase 4 — Monitoring & Iteration (Ongoing)

1. **Install a working Python 3.12/3.13** and re-run this audit with the `claude-seo` toolchain, then connect Search Console, GA4, CrUX and a backlink source. Roughly a third of a standard audit could not be performed without them — indexation status, real-user CWV, query data and the entire backlink profile are currently unknown.
2. **Verify in Search Console** after Phase 1: submit the updated sitemap and confirm the 163 articles get indexed; watch for the duplicate cluster shrinking.
3. **Re-test CWV** after 2.2, ideally against CrUX field data rather than lab numbers.
4. **Check the Facebook Sharing Debugger and WhatsApp preview** on three course pages after 1.3, and re-scrape to clear cached previews.
5. **Validate hreflang** after 2.1 with a reciprocity checker across all 11 language versions of three sample pages.
6. **Re-run the internal-link audit** after each content change — `scripts/internal-links.mjs` and `scripts/related-links.mjs` are idempotent and safe to re-run.
