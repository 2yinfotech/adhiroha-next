# Local-Build Audit — 30 July 2026

Run against `next start` of the working tree on `http://localhost:3987`, crawling the same 211 sitemap routes, then diffed field-by-field against the live crawl in `crawl.json`.

**Purpose:** confirm the working tree introduces no SEO regression, and verify the internal-linking work.

## Headline result: there was nothing pending

The live site **already had** the internal-linking work at the time of the original crawl. An automated commit — `637cd2f Update 2026-07-29T22:39:07.100Z` — had shipped it before the audit ran.

The first pass of `FULL-AUDIT-REPORT.md` described it as "pending deploy" and quoted pre-fix figures (homepage 14 editorial body links, 8 pages with zero editorial inbound) as if they were live. Those numbers came from the earlier pre-change local analysis, not from the live crawl. Corrected: Content Quality 55→57, On-Page 62→65, total **56→57**.

Verified directly on production:

```
https://www.adhiroha.com/200-hour-yoga-teacher-training-course-rishikesh/  ->  rl-sec / ctx-link present
https://www.adhiroha.com/                                                 ->  "Keep Exploring" present
```

## Regression check — local build vs live

211 comparable pages, zero live-only or local-only URLs.

| Check | Live | Local | Result |
|---|---|---|---|
| Missing title | 0 | 0 | OK |
| Missing meta description | 0 | 0 | OK |
| Missing H1 | 0 | 0 | OK |
| Multiple H1 | 0 | 0 | OK |
| Missing canonical | 0 | 0 | OK |
| Invalid JSON-LD blocks | 0 | 0 | OK |
| Pages without schema | 0 | 0 | OK |
| Images missing alt | 0 | 0 | OK |
| Titles > 60 chars | 78 | 78 | OK |
| Descriptions > 160 chars | 121 | 121 | OK |
| Missing og:image | 175 | 175 | OK |
| Pages with 0 hreflang | 26 | 26 | OK |

Field-level diff across all 211 pages: **0 titles changed, 0 descriptions changed, 0 canonicals changed, 0 schema type-sets changed, 0 H1s changed.**

No regression. The build is byte-equivalent to production on every SEO-relevant field.

The only link-count difference was `/blogs/` (243 live vs 177 local), which is a **data** difference — the local `.env.local` database holds 97 articles against production's 163 — not a code difference.

## Bug found and fixed: `/blogs/` was dropping its band

`scripts/related-links.mjs` reported writing a band into `app/(main)/blogs/content.js`, and the markup is present in the file — but the rendered page had **zero** `.rl-link` elements.

Cause: `app/(main)/blogs/page.jsx` splices the DB-driven article grid into the page by keeping `content.slice(0, cut)` and `content.slice(footer)`. The band is written between the last `</section>` and `<footer>`, i.e. inside the discarded middle region. `/blogs/` was the only page affected, because it is the only route that reassembles its `content.js`.

Fix applied — slice the tail from the band marker when one is present:

```js
const related = content.indexOf("<!-- ==  RELATED");
const tail = related !== -1 && related < footer ? related : footer;
const suffix = "\n  </div>\n</section>\n\n" + content.slice(tail);
```

Verified after rebuild: 4 band links render on `/blogs/` and the 97-article grid is intact. Screenshot in `screenshots/blogs-band.png`.

## Internal-linking coverage

| Metric | Live (deployed) | Local build (after fix) |
|---|---|---|
| Contextual in-copy links (`.ctx-link`) | 17 | 17 |
| "Keep Exploring" band links (`.rl-link`) | 92 | 96 |
| English pages carrying a band | 23 of 27 | 24 of 27 |

### Keyword anchor text, sitewide (English)

| Keyword | Before the work | Live now | Local build |
|---|---|---|---|
| yoga teacher training in Rishikesh | 3 | 45 | 46 |
| yoga teacher training in India | 0 | 16 | 17 |
| best yoga school in Rishikesh | 0 | 14 | 15 |
| 200 hour yoga teacher training in Rishikesh | 3 | 19 | 20 |
| yoga TTC in Rishikesh | 0 | 12 | 13 |

## Remaining gap

Three English pages have no band because they are component-based rather than `content.js`-driven, so `scripts/related-links.mjs` skips them:

- `/apply-for-teacher-in-rishikesh/`
- `/volunteer-opportunity-in-rishikesh/`
- `/weather/`

Either render the band from a shared React component on those routes, or accept the gap — they are low-value utility pages.

## Page-weight cost of the band

Measured across the 27 English pages:

- HTML: 6,102,487 → 5,976,798 bytes (**−2.06%**, −4,656 bytes/page)
- All 211 pages: 55,190,625 → 54,676,684 bytes (−0.93%)

The totals fell rather than rose because the local `/blogs/` page carries 66 fewer article links than production. Isolating the band itself, it adds roughly 1.5 KB of HTML per page — negligible against a 246 KB median document.

## What a local audit cannot check

These are server- and edge-level and were carried over unchanged from the live audit: TTFB and Cloudflare cache behaviour, the non-www 301, `robots.txt` AI-crawler blocks, real Core Web Vitals, and the 163 production articles (local has 97 from a different database snapshot).
