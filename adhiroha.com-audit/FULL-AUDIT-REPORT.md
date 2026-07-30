# Full SEO Audit — adhiroha.com

**Audited:** 30 July 2026
**Target:** https://www.adhiroha.com
**Pages crawled:** 211 from `sitemap.xml` (100% returned HTTP 200) + 163 blog articles discovered via `/blogs/`
**Business type:** Local Service / Education — a physical yoga school in Upper Tapovan, Rishikesh, India, selling residential teacher-training courses internationally. Hybrid local + international informational/transactional intent.

## SEO Health Score: 57 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 55 | 12.1 |
| Content Quality | 23% | 57 | 13.1 |
| On-Page SEO | 20% | 65 | 13.0 |
| Schema / Structured Data | 10% | 72 | 7.2 |
| Performance (CWV) | 10% | 45 | 4.5 |
| AI Search Readiness | 10% | 40 | 4.0 |
| Images | 5% | 55 | 2.8 |
| **Total** | | | **56.7 → 57** |

> **Revised 30 July 2026 after a local-build audit.** The first pass of this report stated that the internal-linking work was "pending deploy". That was wrong — an automated commit (`637cd2f`) had already shipped it, and the live site was serving it at the time of the crawl. Content Quality and On-Page have been rescored accordingly (55→57 and 62→65), moving the total from 56 to 57. See `findings/local-build.md`.

### Scope and limitations

This audit was run with direct HTTP crawling, headless Chromium (Playwright) and the site's own source code. The bundled `claude-seo` Python toolchain **could not be used**: its runtime requires Python 3.10+ and this machine has only Python 3.9.6 (system) and Python 3.15.0b4 (beta, no compatible wheels), with no `brew`/`uv`/`pyenv` available to install another interpreter.

**Consequently these data sources are absent and no finding below depends on them:**

- **CrUX field data** — all Core Web Vitals numbers here are *lab* measurements from throttled Chromium, not real-user data.
- **Google Search Console** — no indexation status, impressions, clicks or query data. "Indexed" is inferred from crawlability, never verified.
- **GA4** — no organic traffic or conversion data.
- **Moz / Bing Webmaster / Common Crawl** — no backlink profile, domain authority, referring domains or anchor-text distribution. The Backlinks category is therefore **not scored**.
- **DataForSEO** — no live SERP positions, keyword volumes or AI-visibility checks.

To close these gaps, configure the credentials and re-run once a working Python 3.12/3.13 is installed.

**Deploy state:** the internal-linking work completed earlier today (contextual in-copy links + "Keep Exploring" bands) **is live** — commit `637cd2f` shipped automatically before this crawl ran. A subsequent local-build audit confirmed the deployed HTML matches the working tree on every SEO-relevant field, and found one rendering bug in that work which has since been fixed (`/blogs/` was dropping its band). Details in `findings/local-build.md`.

---

## Top 5 Critical / High Issues

1. **163 blog articles are entirely missing from `sitemap.xml`** — the sitemap lists 211 static routes; every DB-driven article at `/blog/<slug>/` is absent. That is 44% of the site's indexable URLs with no sitemap signal.
2. **27 near-duplicate article pairs (54 URLs, one third of the blog)** — measured 93.7%, 95.0% and 96.4% text-identical on sampled pairs, each self-canonicalising, so they compete with each other rather than consolidating.
3. **Open Graph metadata on 25 English subpages is the homepage's** — `og:url` reads `https://www.adhiroha.com/` and `og:title` reads the homepage title on the 200/300/500-hour course pages, `/about-us/`, `/contact-us/` and more. Every WhatsApp, Facebook and LinkedIn share of a course page previews as the homepage.
4. **hreflang is non-reciprocal and incomplete** — 26 English pages declare no hreflang at all while 175 localized pages point at them; and localized subpages declare only 3 annotations (self + en + x-default) instead of all 11. Google discards non-reciprocal annotations, so the ten translated sites are largely wasted.
5. **Non-www serves the entire site with HTTP 200** — `https://adhiroha.com/` returns 429 KB of content instead of a 301 to `www`. Canonical tags mitigate this, but the site is live on two hostnames.

## Top 5 Quick Wins

1. Add the 163 articles to `sitemap.xml` — one change in `app/sitemap.js`, unlocks discovery for 44% of the site.
2. Add `openGraph.url/title/description` per page (the pattern already exists in `app/(main)/yoga-teacher-training-course-rishikesh-india/page.jsx`, which is correct).
3. Add `srcset`/`sizes` to the hero and above-the-fold images — the mobile homepage currently downloads 2.31 MB of images, with a 416 KB 1500 px LCP image displayed at 390 px.
4. Trim 78 titles over 60 characters and 121 meta descriptions over 160 characters.
5. Redirect non-www → www with a 301 at Cloudflare (a single redirect rule).

---

## Technical SEO — 55/100

### What works

- HTTPS everywhere; `http://` → `https://` returns 301.
- Full security header set present: HSTS (`max-age=63072000; includeSubDomains; preload`), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Content-Security-Policy: upgrade-insecure-requests`.
- Trailing-slash policy consistent — `/about-us` → 308 → `/about-us/`.
- 404s return a real 404 status.
- **Canonicals are flawless on the static site**: 211/211 present, 211/211 self-referencing, 0 mismatches, 0 `noindex`.
- `robots.txt` valid and references the sitemap; `sitemap.xml` valid with `lastmod` on all 211 entries.
- All 211 crawled URLs returned 200 — no broken static routes, no redirect chains.

### Findings

| Severity | Finding | Evidence |
|---|---|---|
| **Critical** | 163 articles absent from sitemap | `sitemap.xml` contains 211 `<loc>` entries: 27 English + 184 localized static routes, plus `/blogs/` and 3 hardcoded `blog-*` pages. Zero `/blog/<slug>/` URLs. `/blogs/` links 163 live articles, all returning 200. |
| **High** | Non-www duplicate host | `curl -I https://adhiroha.com/` → `200`, 429,715 bytes. Expected 301 to `www`. `DEPLOY.md` states non-www must 301 at the server; it does not. Canonical on the non-www copy correctly points to `www`, which limits the damage. |
| **High** | hreflang non-reciprocal | 26 English pages have 0 `hreflang` links (`/about-us/`, `/200-hour-.../`, `/300-hour-.../`, `/500-hour-.../`, `/contact-us/`, `/blogs/`, all 3 `blog-*` pages, and 17 more). Meanwhile `/de/200-stunden-.../` declares `hreflang="en"` → `/200-hour-.../`. One-way annotations are ignored by Google. |
| **High** | hreflang incomplete on 175 pages | Localized subpages declare exactly 3 alternates (self, `en`, `x-default`). Only the 11 homepages declare the full 12. So `/de/200-stunden-.../` and `/fr/200-heures-.../` never reference each other — the ten language versions never form a cluster. Root cause: `LANGUAGE_ALTERNATES` in `lib/seo.js` maps homepages only. |
| **Medium** | `<html lang="en">` on all 211 pages | Every localized page ships `lang="en"` in the server-rendered HTML. `components/SetLang.jsx` sets it client-side in a `useEffect`, so it is correct only after hydration. Google ignores this attribute, but Bing reads it and screen readers pick a voice from it — a Japanese page announced as English is an accessibility defect. The code comment shows this was a deliberate trade-off; it is fixable properly (see Action Plan). |
| **Medium** | Broken link on `/blogs/` | `/blog/Yoga for Seniors: A Beginner-Friendly Guide to Getting Started/` — contains literal spaces and a colon, returns **404**. |
| **Low** | 21 mixed-case article slugs | e.g. `/blog/Bloated-Again/`, `/blog/Yoga-Helps-Your-Gut/`, `/blog/The-Honest-Truth/`. No case-insensitive collisions were found, so no active duplication — but mixed case is fragile and inconsistent with the other 142 slugs. |

---

## Content Quality — 55/100

### What works

- Money pages are genuinely substantial: median 2,423 words across all 211 pages, 75th percentile 6,474, max 8,860. The 200/300/500-hour course pages run 6,500–7,000 words each.
- Only 2 pages under 300 words site-wide (both Japanese translations, 264 and 289 words).
- **Zero duplicate titles and zero duplicate meta descriptions** across all 211 static pages — every page is individually written, including all 184 localized pages.
- Every page has exactly one H1 and at least one H2. No heading-hierarchy breaks found.
- Strong first-hand experience signals on money pages (founder's letter, named teachers, real photography, honest "not every school suits every person" framing) — good E-E-A-T for the Experience and Trust dimensions.

### Findings

| Severity | Finding | Evidence |
|---|---|---|
| **Critical** | 27 near-duplicate article pairs | Every pair is `slug` vs `slug1`. Measured text similarity: `yoga-for-thyroid-health` vs `…1` = **93.7%**; `yoga-for-pcos-hormonal-imbalance` vs `…1` = **95.0%**; `ganga-aarti-…-devotion` vs `…1` = **96.4%**. Word counts differ by ~10 words. Both URLs in each pair self-canonicalise, so neither consolidates. Full list in `findings/content.md`. |
| **High** | No author or date on 163 articles | Articles emit no `datePublished`, no `dateModified`, no `author` in schema and no visible byline. For YMYL-adjacent health topics — and 60+ of these articles are health claims (diabetes, thyroid, PCOS, menopause, heart disease) — missing authorship is a direct E-E-A-T weakness. |
| **High** | Health content without expertise signals | Articles such as `/blog/what-yoga-can-and-cannot-do-for-diabetes/`, `/blog/yoga-for-high-blood-pressure/`, `/blog/limits-of-yoga-in-heart-disease/` make medical claims with no named author, no credentials, no medical review and no citations. This is the highest-risk content on the site. |
| **Medium** | Thin articles | 40+ articles fall in the 740–920 word range, most of them the `…1` duplicates. Median article length 1,200 words vs 2,423 site-wide. |
| **Resolved** | Internal linking | Previously nav-label anchors only, with 8 pages holding zero editorial inbound links. Now live: **17 contextual in-copy links** and **92 "Keep Exploring" band links across 23 of 27 English pages** (96 across 24 after the `/blogs/` fix). Remaining gap: `/apply-for-teacher-in-rishikesh/`, `/volunteer-opportunity-in-rishikesh/` and `/weather/` have no band because they are component-based rather than `content.js`-driven. |

---

## On-Page SEO — 62/100

### What works

- 0 missing titles, 0 missing meta descriptions, 0 missing H1s across 211 pages.
- 0 duplicate titles, 0 duplicate descriptions.
- `viewport` meta present on 100% of pages.
- `twitter:card` present on 100% of pages.
- Descriptive, keyword-aligned URL slugs on all static routes.

### Findings

| Severity | Finding | Evidence |
|---|---|---|
| **High** | og:title / og:url / og:description wrong on 25 English subpages | 8 of 9 sampled English subpages return `og:url = https://www.adhiroha.com/` and `og:title = "Yoga Teacher Training in Rishikesh \| 200/300/500-Hr YTTC — Adhiroha"` — the homepage's values. Cause: those `page.jsx` files set `title`/`description`/`alternates` but no `openGraph`, so Next.js inherits the root layout's `openGraph` block verbatim, including its hardcoded `url`. `/yoga-teacher-training-course-rishikesh-india/` is the one page that sets `openGraph` and is correct. |
| **High** | og:image missing on 175 localized pages | Localized `page.jsx` files override `openGraph` with title/description/url but no `images`, which replaces the inherited array. Result: the English subpages have the image but the wrong title/url; the localized pages have the right title/url but no image. |
| **Medium** | 78 titles exceed 60 characters | 35 exceed 70 characters. Longest include the localized 500-hour course pages. These truncate in SERPs. |
| **Medium** | 121 meta descriptions exceed 160 characters | 57% of all pages. Google will rewrite or truncate them. |
| **Low** | 4 titles under 30 characters | Under-using available SERP real estate. |
| **Resolved** | Keyword anchor coverage was zero for 3 of 5 target keywords | Before: "yoga teacher training in Rishikesh" 3, "yoga teacher training in India" **0**, "best yoga school in Rishikesh" **0**, "200 hour yoga teacher training in Rishikesh" 3, "yoga TTC in Rishikesh" **0**. Measured on the **live** site after deploy: **45 / 16 / 14 / 19 / 12**. Local build after the `/blogs/` fix: 46 / 17 / 15 / 20 / 13. |

---

## Schema / Structured Data — 72/100

### What works

- JSON-LD present on **211/211** static pages, **0 invalid blocks** (all parsed cleanly).
- Rich and correct entity graph: `EducationalOrganization` + `LocalBusiness` (211), `PostalAddress` (211), `GeoCoordinates` (211), `ImageObject` (211), `WebSite` (211).
- `Course` + `CourseInstance` + `Offer` on 110 pages — correctly modelled for course rich results.
- `FAQPage` with `Question`/`Answer` on 135 pages, parsed from the page's own visible markup so schema and page cannot disagree.
- `BreadcrumbList` on 200 pages.
- `lib/seo.js` deliberately omits self-serving `aggregateRating`, with a documented rationale. That is the correct call and avoids a structured-data manual action.

### Findings

| Severity | Finding | Evidence |
|---|---|---|
| **High** | No `Article`/`BlogPosting` schema on 163 articles | Articles emit only the site-wide `EducationalOrganization`/`LocalBusiness`/`WebSite`/`ImageObject` graph. No `Article`, no `author`, no `datePublished`, no `dateModified`, no `BreadcrumbList`. This forfeits article rich results and Top Stories eligibility on 44% of the site's URLs. |
| **Low** | No `Review`/`AggregateRating` anywhere | Correctly avoided for now. To earn stars legitimately, surface real reviews with named reviewers and dates, then mark those up. |

---

## Performance (Core Web Vitals) — 45/100

Lab measurements, throttled Chromium. Mobile = 390×844, DPR 3, 4× CPU throttle, ~1.6 Mbps. **No CrUX field data was available**, so these are not real-user metrics.

| Page | Device | LCP | CLS | FCP | TTFB | Long tasks | Total KB | Image KB |
|---|---|---|---|---|---|---|---|---|
| Home | mobile | **4,432 ms** | 0.007 | 4,432 | 811 | 279 ms | 2,530 | 2,365 |
| Home | desktop | 1,288 ms | 0.004 | 1,056 | 686 | 0 | 2,968 | 2,861 |
| 200-hour | mobile | 3,412 ms | 0.001 | 3,412 | 2,011 | 142 ms | 1,085 | 930 |
| 200-hour | desktop | 1,576 ms | 0.009 | 1,452 | 1,075 | 0 | 1,279 | 1,180 |
| About | mobile | 3,436 ms | 0.002 | 3,436 | 1,984 | 190 ms | 1,405 | 1,250 |
| About | desktop | 2,544 ms | 0.026 | 2,372 | 1,737 | 0 | 1,507 | 1,408 |
| Retreat | mobile | 2,292 ms | 0.002 | 2,292 | 1,008 | 203 ms | 1,306 | 1,152 |
| Retreat | desktop | 2,164 ms | 0.035 | 1,924 | 1,587 | 0 | 1,678 | 1,579 |

### What works

- **CLS is excellent** — 0.001 to 0.035 across all eight runs, far inside the 0.1 "good" threshold. Despite 5,005 images lacking explicit `width`/`height`, the CSS reserves layout well.
- Long-task time is low (0–279 ms) — JavaScript is not the bottleneck.
- Images are already served as WebP.
- 46 of 56 homepage images use `loading="lazy"`; the LCP hero is correctly `fetchpriority="high"` and preloaded.

### Findings

| Severity | Finding | Evidence |
|---|---|---|
| **High** | Homepage mobile LCP 4.43 s — "poor" | Above Google's 4.0 s poor threshold. FCP equals LCP, so the delay is transfer time, not render-blocking work. |
| **High** | No responsive images anywhere | **0 of 56** homepage images use `srcset`; 0 use `sizes`; 0 `<picture>` elements. Mobile downloads desktop-resolution files: `img_shiva-adhiroha.webp` is 416 KB at 1500 px natural, displayed at 390 px. `img_dji-0921.webp` 480 KB, `yttc-004.webp` 467 KB, `home-arch.webp` 306 KB. Total 2.31 MB of images on a 390 px viewport. |
| **High** | TTFB 0.8–2.0 s on mobile | `cache-control: s-maxage=31536000` is set and Cloudflare fronts the site, but TTFB of 1,984 ms on `/about-us/` indicates frequent origin hits rather than edge cache. |
| **Medium** | Very large HTML documents | Median 246,648 bytes of HTML per page; max 440,932 bytes (`/es/500-horas-…/`). 100 of 211 pages exceed 250 KB. Median 15 inline `<script>` blocks and 4 stylesheet links per page. |

---

## Images — 55/100

### What works

- **0 of 9,357 images are missing an `alt` attribute.** That is unusually good.
- WebP throughout.
- Lazy loading applied to below-the-fold images (46/56 on the homepage).

### Findings

| Severity | Finding | Evidence |
|---|---|---|
| **High** | No `srcset`/`sizes` on any image | See Performance. Single largest available win. |
| **Medium** | 5,005 images lack `width`/`height` | Measured CLS is fine today, but this leaves no intrinsic-ratio safety net if CSS changes. |
| **Low** | 253 images have empty `alt=""` | Correct for purely decorative images; worth confirming none are content-bearing. |

---

## AI Search Readiness (GEO) — 40/100

### Findings

| Severity | Finding | Evidence |
|---|---|---|
| **High** | Every major AI crawler is blocked in `robots.txt` | Cloudflare's managed block disallows `GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`, `meta-externalagent` and `CloudflareBrowserRenderingCrawler`. `Content-Signal: search=yes, ai-train=no, use=reference`. Effect: the site cannot be cited by ChatGPT, Claude or Meta AI, and is excluded from Gemini grounding. Google Search indexing is unaffected. **This may well be intentional** — it is Cloudflare's default AI-blocking posture and a legitimate content-rights position. Flagged as a decision to make consciously, not an outright defect. |
| **Medium** | No `llms.txt` | `/llms.txt` returns 404. Note this is an emerging convention that Google Search ignores; low priority, and pointless while the AI crawlers above are blocked. |
| **Low** | No `Article` schema on articles | Reduces machine-readability of the 163 pages most likely to be cited in an AI answer. Same finding as Schema. |

### What works

- `FAQPage` schema on 135 pages with question/answer pairs lifted from visible markup — ideal passage-level citability.
- Clean heading hierarchy and direct, answer-first prose on money pages.
- Strong, consistent entity data (`LocalBusiness`, `PostalAddress`, `GeoCoordinates`, `sameAs` social profiles).

---

## Local SEO — not separately scored

`LocalBusiness` schema with full `PostalAddress` and `GeoCoordinates` is present on all 211 pages, with consistent NAP and `sameAs` links to Instagram, Facebook and YouTube. Google Business Profile signals, citation consistency, review velocity and geo-grid ranking **could not be assessed** — those require the DataForSEO or Google APIs listed under Scope and limitations.

## Backlinks — not scored

No backlink data source was reachable. Domain authority, referring domains, anchor-text distribution, toxic links and competitor link gaps are all unknown.
