# ACTION PLAN — adhiroha.com SEO Implementation Spec

**For:** Claude Code (VS Code) working in the adhiroha.com repository
**Derived from:** full SEO audit (2026-07-30), re-audit (2026-07-31), Google Search Console audit (2026-07-31), schema report, backlink report, competitor comparison
**Stack:** Next.js (pre-rendered / SSG) on Hostinger, fronted by Cloudflare. ~375 pages, 11 locales (en, de, fr, it, pl, pt, nl, sv, ja, da, es), 163 blog posts.

---

## 0. GROUND RULES — read before writing any code

These are non-negotiable. Violating them makes the site worse, not better.

1. **Never fabricate data.** No invented publish dates, no invented author names, no invented review counts, no invented medical reviewers. If the real value is not available in the CMS or content source, **omit the field entirely** and report it to me in your summary. A missing property is fine. A wrong property is a structured-data violation and a trust problem.
2. **Do not change `robots.txt` AI crawler rules without my explicit written approval.** See §6.1. This is a business decision, not a technical one.
3. **Do not delete content.** Where the plan says "remove a duplicate", implement the redirect and flag the CMS record for me to delete manually.
4. **Work in phases, in the order given.** Commit after each phase with a clear message. Do not batch unrelated phases into one commit.
5. **Detect before you assume.** This spec does not know whether the repo uses the App Router or the Pages Router, which CMS backs the blog, or whether the build is `output: 'export'`. Run Phase 1 recon first and adapt.
6. **Report what you could not do.** At the end of every phase, list anything you skipped and why. Do not silently work around a blocker.
7. **Do not "improve" content wording** on pages outside the specific fixes below. No rewriting of course descriptions, teacher bios, or existing article bodies unless a task explicitly says so.
8. **Preserve existing behaviour.** The site's technical foundation is genuinely good — clean canonicals, 100% image alt coverage, zero parse errors in schema, complete security headers. Do not regress any of it.

---

## PHASE 1 — Recon (do this first, write findings to `/seo-recon.md`)

Before any changes, establish the facts:

1. **Router type:** App Router (`app/` directory) or Pages Router (`pages/`)? Report which.
2. **Build mode:** check `next.config.js` for `output: 'export'`, `trailingSlash`, `i18n` config, image config.
3. **Blog data source:** where do the 163 posts come from? A headless CMS (which one, which SDK), local MDX/markdown files, or a JSON/API fetch at build time? Find the exact function/file that returns the list of all posts. **This is the single most important thing to find** — Phases 2, 3 and 5 all depend on it.
4. **Available fields per post:** enumerate every field on a blog post object. Specifically look for: `slug`, `title`, `excerpt`/`summary`/`description`, `body`/`content`, `publishedAt`/`createdAt`/`date`, `updatedAt`/`modifiedAt`, `author`, `category`/`tags`, `coverImage`/`heroImage`, `locale`. Report exactly which of these exist and which are missing or empty.
5. **The blog templates:** locate the blog post page component, the `/blogs/` hub component, and wherever `<head>` metadata is generated (`generateMetadata`, `next/head`, or a shared `<Seo>` component).
6. **Existing sitemap:** find how `sitemap.xml` is currently produced — a static file in `/public`, a script, `next-sitemap`, or a route handler.
7. **Existing schema:** locate the JSON-LD builder that emits the `EducationalOrganization` / `LocalBusiness` / `WebSite` graph.
8. **Image components:** are images raw `<img>` tags, a custom component, or `next/image`? Report the split.
9. **Rebuild trigger:** does the CMS have a deploy webhook configured? Check for any build hook config, Hostinger deploy script, or CI workflow.

**Stop after recon and show me `/seo-recon.md` before continuing.** If the blog data source turns out to have no date fields at all, Phase 5 changes shape significantly and I need to know.

---

## PHASE 2 — Blog metadata (HIGHEST PRIORITY — do this before anything else)

**Why this is first:** Google Search Console shows 487,422 impressions in 28 days converting at 0.88% CTR, against an expected 2–3%. All 162 blog posts currently serve the homepage's meta description. Non-blog pages on the same site at the same rankings convert at 4–12%. This is a ~3 hour fix with an estimated +4,400 to +7,900 clicks/month.

### 2.1 Unique meta description per blog post

Currently every blog post emits the homepage description:
> "Yoga Alliance certified 200, 300 & 500 hour yoga teacher training in Rishikesh, India. Small batches, expert Indian teachers, ashram stay & meals included."

Replace with a per-post description resolved in this priority order:

1. A dedicated SEO description field, if one exists in the CMS.
2. The post's `excerpt` / `summary` field, trimmed to ≤155 characters.
3. First ~155 characters of the post body's opening paragraph — strip all HTML/markdown, collapse whitespace, cut at the last complete word, append `…` only if truncated.

Implementation requirements:
- Write a single shared helper, e.g. `lib/seo/buildPostDescription.ts`, so every consumer (meta tag, Open Graph, schema, sitemap) uses the same value.
- Never emit the global/homepage description as a fallback on a blog post. If all three sources are empty, omit the description tag for that post and **log the slug** to a report file `/seo-missing-descriptions.md`.
- Cap hard at 160 characters. Target 150–155.
- Strip newlines, HTML entities, and markdown syntax (`**`, `##`, `[](...)`).

### 2.2 Per-page Open Graph and Twitter tags on blog posts

Currently `og:url` on blog posts points at the homepage, so every shared blog link on WhatsApp/Facebook/LinkedIn previews as the homepage. Same code path as 2.1 — do them together.

Emit on every blog post:

```
og:type          = "article"
og:url           = absolute canonical URL of THIS post (with trailing slash — see Phase 4)
og:title         = the post's own title
og:description   = the value from 2.1
og:image         = the post's hero image, absolute URL, 1200×630 if available;
                   fall back to the existing site default only if the post has no image
og:image:alt     = the hero image's alt text
og:site_name     = "Adhiroha Yoga School"   (keep existing value)
og:locale        = the actual route locale, correctly formatted (en_US, de_DE, fr_FR, …)
article:published_time = ISO 8601, only if a real date exists
article:modified_time  = ISO 8601, only if a real date exists
twitter:card        = "summary_large_image"
twitter:title       = as og:title
twitter:description = as og:description
twitter:image       = as og:image
```

Do **not** emit `article:published_time` with a fabricated or build-time date.

### 2.3 Blog title tags

- Every post must emit its **own** title, not a shared template value.
- Target under 60 characters including any suffix.
- **Drop the `| Adhiroha` suffix on blog posts** if it pushes the title past 60 characters. Keep the raw post title.

### 2.4 Verification for Phase 2

Build the site, then programmatically assert across all blog routes:
- Count of distinct meta descriptions on `/blog/*` == count of posts (allow a small number of legitimate duplicates only if the source data itself is duplicated).
- Zero blog posts carrying the homepage description string.
- Zero blog posts where `og:url` != the page's own canonical.
- No description exceeds 160 chars; no title exceeds 60 chars.

Write results to `/seo-verify-phase2.md`.

---

## PHASE 3 — Dynamic sitemap index (auto-updating, zero manual work)

**Current state:** `sitemap.xml` declares 211 URLs. The site has ~375. All 163 blog posts are absent. Separately, only 51 of the declared 211 are actually indexed.

**Requirement from the site owner:** the blog sitemap must be **fully dynamic** — adding a new blog post must never require editing a sitemap file by hand.

### 3.1 Architecture

Produce a sitemap **index** that references child sitemaps:

```
/sitemap.xml            → sitemap index (references the two below)
/sitemap-pages.xml      → the 211 main + locale pages
/sitemap-blog.xml       → all blog posts, generated from the blog data source
```

If the blog grows past 5,000 posts, split `sitemap-blog.xml` into paginated chunks (`sitemap-blog-1.xml`, etc.). Build the chunking logic now even though it won't trigger yet — a `MAX_URLS_PER_SITEMAP = 5000` constant and a chunking function.

### 3.2 How to make it dynamic

**The blog sitemap must derive its URL list by calling the same function that renders the blog listing** — never a hardcoded array, never a checked-in XML file. Find that function in Phase 1 recon and reuse it.

Choose the implementation based on what Phase 1 found:

**If App Router and NOT a static export:**
Use `app/sitemap.ts` with `generateSitemaps()` for the index, or hand-author route handlers at `app/sitemap-blog.xml/route.ts` returning `Content-Type: application/xml`. Add `export const revalidate = 3600` so the sitemap refreshes hourly without a rebuild.

**If Pages Router and NOT a static export:**
Create `pages/sitemap-blog.xml.tsx` with `getServerSideProps` that fetches all posts, writes the XML to `res`, and returns `{ props: {} }`. Set `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`.

**If the build IS a static export (`output: 'export'`):**
Runtime generation is impossible. Instead, generate the XML at build time in a `postbuild` script that imports the same post-fetching function and writes the files into the export output directory. Wire it into `package.json`:
```json
"scripts": { "postbuild": "node scripts/generate-sitemaps.mjs" }
```

### 3.3 The rebuild caveat — REPORT THIS TO ME

Be explicit in your summary about which mode you implemented:

- **Runtime/ISR mode:** new posts appear in the sitemap automatically within the revalidate window. Truly zero-touch.
- **Build-time mode:** new posts appear in the sitemap on the next build. No file editing needed, but **a build must run**. If Phase 1 recon found no CMS deploy webhook, tell me — I need to configure one so publishing a post triggers a rebuild. Without it, a new post won't reach the sitemap until the next unrelated deploy.

### 3.4 Content requirements for every sitemap entry

- **Absolute URLs on the `www` host**, matching the canonical form exactly, **with trailing slash** (see Phase 4). Any mismatch between sitemap URL form and canonical form is a defect.
- **`lastmod` must be the post's real `updatedAt`**, falling back to `publishedAt`. **Never a build timestamp** — a sitemap where all 163 posts share one `lastmod` is a false freshness signal that Google learns to ignore.
- Omit `lastmod` entirely for posts with no real date rather than inventing one.
- `changefreq` and `priority`: omit both. Google ignores them.
- **Exclusions:** do not include `/student-admission-panel/` (correctly `noindex`), the 25 `-1` duplicate slugs (Phase 6), or any post flagged `draft`/`unpublished`.
- Add hreflang `xhtml:link` alternates inside sitemap entries for pages that have translated equivalents — this reinforces the hreflang work already shipped.

### 3.5 Also fix

- `robots.txt` must declare the sitemap index: `Sitemap: https://www.adhiroha.com/sitemap.xml`
- **199 pages currently link to `/sitemap.xml/` (with a trailing slash) as if it were an HTML page.** Find that link — likely in the footer component — and either point it at `/sitemap.xml` with no slash or remove it.
- **211 pages link to `/cdn-cgi/l/email-protection/`, which returns 404.** This is Cloudflare's email obfuscation placeholder. It's harmless to users but registers as a sitewide broken internal link. Either render mailto links without the placeholder href, or leave it and note it as a known false positive — your call, but tell me which.

### 3.6 Verification for Phase 3

- Fetch all three sitemap URLs; assert valid XML and correct `Content-Type: application/xml`.
- Assert `sitemap-blog.xml` URL count == published post count.
- Assert every sitemap URL returns HTTP 200 with no redirect hop.
- Assert `lastmod` values are not all identical.
- Confirm total across child sitemaps ≈ 375.

---

## PHASE 4 — Canonical and trailing-slash consistency

**The problem (from GSC URL Inspection):** the site declares trailing-slash canonicals. Google honours that on some posts and overrides it on others.

| URL | Google's chosen canonical | Result |
|---|---|---|
| `/blog/aura-colors-meanings-guide` | with slash | working |
| `/blog/yoga-for-pcos-hormonal-imbalance/` | **without** slash | **not indexed** — "Google chose different canonical" |

When Google overrides a declared canonical, it drops the declared URL from the index. The usual cause is inconsistent internal linking.

### Tasks

1. **Pick the trailing-slash form** (the site already uses it). Set `trailingSlash: true` in `next.config.js` if not already set.
2. **Audit every URL-emitting surface** and make them all agree on the trailing-slash form:
   - `rel=canonical`
   - `og:url`
   - all `hreflang` href values
   - every internal `<Link href>` and `<a href>` — **especially the `/blogs/` hub, which links to all 163 posts**
   - sitemap entries
   - JSON-LD `url`, `@id`, `mainEntityOfPage`, and `BreadcrumbList item` values
3. **Write a shared URL builder** — e.g. `lib/seo/canonicalUrl.ts` — that takes a path and returns the absolute canonical form. Route every one of the above through it. No hand-concatenated URLs anywhere.
4. **Add redirects** so the non-slash form 301s to the slash form (Cloudflare rule or Next.js redirect, whichever the stack supports). Verify it is **path-preserving** — `/blog/foo` must go to `/blog/foo/`, not to `/`.
5. **Grep the codebase** for hardcoded `adhiroha.com` strings and normalise them all to `https://www.adhiroha.com` — the `www` host, HTTPS, no bare apex.

---

## PHASE 5 — BlogPosting schema, visible dates and bylines (E-E-A-T)

**Why this matters:** the blog covers diabetes, thyroid disorders, PCOS, menopause and immune conditions. These are YMYL (Your Money or Your Life) topics where Google applies a much higher expertise bar. Currently all 163 posts have **no visible date, no author, no modified date, and no article schema** — the worst possible profile for medical content. This is also the largest single lever for AI Overview citation (Phase 6).

### 5.1 Prerequisite — add `@id` to the existing `Person` entities

11 instructors are already marked up on `/yoga-teachers-in-india/` with `name`, `jobTitle`, `worksFor` and `image`, but **no stable `@id`**. Without an `@id`, blog author references cannot link to these entities.

Add before anything else, using a slug pattern:
```
https://www.adhiroha.com/yoga-teachers-in-india/#jagjeet-singh
```
Instructors: Yogacharya Jagjeet Singh, Pratap Rawat, Ashish Bangwal, Rajat Purwal, Anil Rayal, Ajay Pundir, Anil Singh, Jitendra Bhandari, Prashant, and the remaining two — read the actual names from the page, don't rely on this list.

Also add `hasCredential` where a real Yoga Alliance RYT/E-RYT designation is documented on the page. **Do not guess credentials.**

### 5.2 Visible dates and byline in the blog template

Render in the post header, visible to users (not just in schema):
- Publish date in a semantic `<time datetime="YYYY-MM-DD">` element
- "Last updated" date, but **only if it differs meaningfully from the publish date**
- Author name, linked to their anchor on `/yoga-teachers-in-india/`
- For YMYL health posts: a "Medically reviewed by …" line

**Handling missing data — read carefully:**
- If a post has **no real date** in the CMS: render no date, emit no `datePublished`, and add the slug to `/seo-missing-dates.md`. Do **not** use the file mtime, the build date, or today's date.
- If a post has **no author**: do not default to a random instructor. Report it. I will assign authors manually and you can re-run.
- If **no real medical reviewer has reviewed a post**: omit `reviewedBy` entirely. Never name someone who did not review it.

### 5.3 `BlogPosting` JSON-LD

Emit per post, **in addition to** (not replacing) the existing global organisation graph. Server-rendered in the HTML, never JS-injected.

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://www.adhiroha.com/blog/{slug}/#article",
  "headline": "{post title, under 110 chars}",
  "description": "{same value as the meta description from Phase 2}",
  "url": "https://www.adhiroha.com/blog/{slug}/",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.adhiroha.com/blog/{slug}/"
  },
  "datePublished": "{real ISO date — omit if unknown}",
  "dateModified": "{real ISO date — omit if unknown}",
  "inLanguage": "{actual route locale}",
  "author": {
    "@id": "https://www.adhiroha.com/yoga-teachers-in-india/#{author-slug}"
  },
  "publisher": { "@id": "https://www.adhiroha.com/#organization" },
  "image": {
    "@type": "ImageObject",
    "url": "{absolute hero image URL}",
    "width": 1200,
    "height": 630
  },
  "articleSection": "{category, if one exists}",
  "wordCount": "{computed from the actual body}",
  "isAccessibleForFree": true
}
```

For YMYL health posts, add `reviewedBy` with a real credentialed reviewer — only where one exists.

Reference templates are in `generated-schema.json` (`blogPosting` and `blogPosting_health_reviewed`). Treat every `[BRACKETED]` value there as a placeholder that must be filled from real data or omitted.

### 5.4 `BreadcrumbList` on blog posts

Currently present on 200 of 375 pages; the gap is essentially the whole blog. Add three-level breadcrumbs (Home → Blog → Post), both as visible navigation and as JSON-LD.

**Localise the position-1 label** — it currently emits English "Home" on every locale:
`en` Home · `de` Startseite · `fr` Accueil · `es` Inicio · `it` Home · `pt` Início · `nl` Home · `pl` Strona główna · `sv` Hem · `da` Hjem · `ja` ホーム

### 5.5 Author pages

If `/yoga-teachers-in-india/` uses anchors only, that is acceptable for now. But if individual instructor pages are cheap to add, they are more valuable — 11 credentialed teachers with individual pages are linkable assets. Propose an approach and ask me before building 11 new routes.

---

## PHASE 6 — AI search: AI Overviews and AI assistant citation

**This phase needs the most careful reading, because two commonly-conflated things are involved.**

### 6.1 The distinction that governs everything here

**Google AI Overviews are generated from the standard Google index via `Googlebot`, which the site already allows.** The `robots.txt` block on `Google-Extended` does **not** remove the site from AI Overviews. Neither does the `GPTBot` block affect ChatGPT's web search, which uses the separate `OAI-SearchBot` — also already allowed via `User-agent: *`. `PerplexityBot` is likewise allowed.

So: **no `robots.txt` change is required to improve AI Overview performance.** AI Overview eligibility is a content-and-structure problem, addressed in 6.2–6.5 below. Do that work regardless of any crawler decision.

**What the current block actually costs:** presence in AI training corpora, and retrieval by Claude/Anthropic. That is the whole scope of the loss.

**The crawler decision — DO NOT IMPLEMENT WITHOUT MY WRITTEN APPROVAL.**

Current state: `robots.txt` issues `Disallow: /` to `GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`, `Applebot-Extended`, `Bytespider`, `meta-externalagent`, `Amazonbot`, `CloudflareBrowserRenderingCrawler`. It also sends `Content-Signal: search=yes, ai-train=no, use=reference` — a deliberate content-protection stance, not a misconfiguration. Competitor `yogkulam.org` takes the opposite position and explicitly allowlists nine AI agents.

Prepare the change as a **separate branch or a commented-out block with a clear diff**, and present me these three options:

- **Option A — keep the block as-is.** Legitimate IP protection. Zero AI training presence, no Claude retrieval. Nothing is broken.
- **Option B (recommended middle path) — allow retrieval crawlers, keep training crawlers blocked.** Allow `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `Claude-User`, `Claude-SearchBot`, `ChatGPT-User`. Keep `GPTBot`, `CCBot`, `Google-Extended`, `Applebot-Extended`, `Bytespider`, `meta-externalagent` blocked. Keeps `ai-train=no` honest while making the site citable in AI answers.
- **Option C — open everything**, matching the competitor.

Note also that the block appears to be **Cloudflare-managed**, so the change may need to be made in the Cloudflare dashboard rather than in a repo file. Check and tell me where it actually lives.

### 6.2 Passage-level structure — the real AI Overview lever

AI systems extract *passages*, not pages. A page that answers a question in a single self-contained paragraph directly under a question-shaped heading is dramatically more extractable than the same information spread across three paragraphs.

For the top ~20 blog posts by GSC impressions (start with `aura-colors-meanings-guide`, `what-is-7-types-of-yoga`, `understanding-aura-energy-field-colors-meanings`, `what-is-kundalini-energy-chakras-philosophy-explained`, `kundalini-yoga-vs-other-styles-differences`):

1. **Add a direct answer block near the top.** Immediately after the H1 and byline, a 40–60 word paragraph that answers the post's core question completely, in plain language, with no preamble. No "in this article we will explore". Just the answer. Mark it up with a consistent class so it's identifiable, e.g. `<div class="answer-summary">`.
2. **Convert vague H2s into question form** where the underlying content already answers a question — "What Do Aura Colours Mean?" beats "Aura Colour Meanings". Keep exactly one H1 per page (already correct sitewide).
3. **Add extractable tables and definition lists.** Comparison content (kundalini vs other styles, the 7 types of yoga) should include an actual `<table>` or `<dl>`. These are heavily favoured for extraction.
4. **Keep paragraphs self-contained.** Avoid paragraphs whose meaning depends on the previous one ("As mentioned above…", "This is why…"). Each should stand alone.
5. **Do not rewrite the substance.** Restructure and add summaries. Do not change facts, claims, or citations. The existing citations to NIH, Harvard Health and peer-reviewed Ayurveda journals are a genuine asset — preserve every one.

Do these 20 posts only, and show me the first two as samples before proceeding with the rest.

### 6.3 Why Phase 5 is also an AI phase

Dates, authors and `BlogPosting` schema are among the strongest AI-citation signals, especially on health topics — AI systems weight freshness and author authority heavily. Phase 5 is therefore a prerequisite for this phase, not a parallel track. **Do not attempt 6.2 before Phase 5 ships.**

### 6.4 `llms.txt`

`/llms.txt` currently returns 404. Google Search ignores it entirely and its benefit is unconfirmed, but it is cheap and the site's structure is clean enough to describe well.

**Only create this if I approve Option B or C in 6.1** — publishing an AI-facing guide while blocking AI crawlers is incoherent.

If approved: generate it dynamically from real site data (never hardcode a page list that will go stale). Include a one-paragraph description of the school, the course catalogue with prices and durations, the location, the instructor list, the available locales, and links to the main content hubs.

### 6.5 Entity consistency

AI systems ground answers in entities. Two inconsistencies to fix:

- **Two phone numbers** appear in `tel:`/WhatsApp links (`+91 9999 048 900` and `+91 6397 328 721`) while schema declares only the first. Pick one canonical number for schema and NAP consistency; keep the second only as a secondary contact link.
- **`sameAs` is incomplete.** It covers Instagram and Facebook only. Add the **Google Business Profile URL** and the **Yoga Alliance directory listing URL** — the two highest-value entity links for a destination school. **Ask me for both URLs; do not guess or search for them.**

### 6.6 An honest note to include in your summary

AI Overviews frequently absorb the click rather than passing it on. GSC data shows a sustained ~20% drop in daily impressions from 2026-07-25 while average position simultaneously improved — consistent with AI Overviews expanding on exactly this site's informational cluster. Optimising for AI citation buys brand visibility and authority signals; it does not reliably buy traffic. Treat it as a defensive and brand play, not a click-growth play. The click growth is in Phase 2.

---

## PHASE 7 — Images (mobile is 73% of impressions)

Mobile carries 357,598 of 487,422 impressions and ranks 4.6 positions better than desktop. Every item here lands hardest on the majority of the audience.

### 7.1 `width` / `height` on all images

**5,947 of 10,623 images (56%) have no intrinsic dimensions.** This is the direct cause of CLS 0.209 / 0.114 on `/blogs/` — both above the 0.1 failing threshold. This is the **only** fix that will move that metric.

- Emit `width` and `height` attributes (or a CSS `aspect-ratio`) on every `<img>`.
- **Prioritise the `/blogs/` hero and card images.** The LCP element there is `gallery/ashram/ashram-014.webp`, loaded `eager` at natural 1000×667 into a 412×509 box with no reserved space.
- Where dimensions aren't known at render time, read them from the image files at build time and generate a dimensions manifest.

### 7.2 Responsive images

**`srcset` count is 0 on every page tested.** Every image is served at full resolution and downscaled by CSS.

| Image | Natural | Displayed |
|---|---|---|
| `img_shiva-adhiroha.webp` | 1500×1000 | 412 wide |
| `home-arch.webp` | 1200×803 | 368×390 |
| `yoga-training-certification.webp` | 1400×933 | 356×420 |
| `img_ram-3.webp` | 1000×667 | 356×420 |
| `logo-g.png` | 800×266 | 114×38 |

All 10 homepage images exceed 2× their displayed width. Homepage mobile transfer is **2,529 KB**, of which 806 KB is imagery.

- Migrate to `next/image` where the stack allows it, otherwise hand-author `srcset` + `sizes`.
- **If the build is `output: 'export'`**, `next/image` needs `unoptimized` or a custom loader — check what Cloudflare offers (Cloudflare Images / Polish) before choosing, and report the option you picked.
- Re-encode the three worst assets at delivery resolution: `img_nov_yttc-030.webp` (700 KB), `img_nov_yttc-013.webp` (419 KB), `img_nov_yttc-012.webp` (267 KB).
- Consider AVIF with WebP fallback for a further 20–30% saving.

### 7.3 Preserve what already works

- **Alt text is 100% covered across all 10,623 images** and is descriptive rather than keyword-stuffed. **Do not touch it.** If any migration risks dropping an `alt` attribute, stop and report.
- 253 images use empty `alt=""`. Correct if genuinely decorative — spot-check a sample and report anything that carries meaning, but don't bulk-edit.
- 8,047 images already use `loading="lazy"`. Keep it — but ensure the LCP image on each template is **not** lazy-loaded.
- Resource hints currently score 100/100 (6 preload hints, LCP candidate preloaded, `fetchpriority="high"`, Cloudflare speculation rules, no bfcache blockers). Do not regress this.

---

## PHASE 8 — Duplicates, titles and URL hygiene

### 8.1 The 25 duplicate `-1` page pairs

Pages exist as both `/blog/{slug}/` and `/blog/{slug}1/`, near-identical (e.g. 742 vs 732 words), both indexable with self-referencing canonicals.

**Severity note:** GSC URL Inspection found 5 of 6 sampled `-1` URLs are *unknown to Google* — never crawled. One, `yoga-for-menopause-womens-hormonal-aging1/`, **is indexed**. So this is High, not Critical, and must not jump ahead of Phase 2. But they are linked from `/blogs/`, so they will be crawled eventually.

Tasks:
1. Read the full list of 25 pairs from `findings/content.md`. Keep the non-`1` slug in every case.
2. Add path-preserving 301 redirects from each `-1` URL to its canonical twin.
3. Remove the `-1` slugs from the sitemap generator (Phase 3).
4. Remove internal links to `-1` URLs, especially from `/blogs/`.
5. **Do not delete the CMS records yourself.** Write the list to `/seo-cms-deletions.md` for me to action manually — otherwise they will regenerate on the next build.

### 8.2 78 duplicate blog titles

Only 115 unique titles across 162 posts:

| Title | Count |
|---|---|
| Yoga for Stress Management | 11 |
| How To Optimze Your Yoga Training | 7 |
| Tips for Healthy Life with Yoga | 4 |
| (28 further titles) | 2 each |

- **Fix the typo "Optimze" → "Optimize"** on all 7 pages. This is currently visible in Google results.
- For the remaining duplicates: read each post's body and propose unique, intent-specific titles under 60 characters. **Write the proposals to `/seo-title-proposals.md` and wait for my approval** before applying — these are editorial decisions, and 11 pages titled "Yoga for Stress Management" may need genuinely different angles, not just numbered variants.

### 8.3 Overlong titles and descriptions

147 titles exceed 60 characters (worst 93); 119 descriptions exceed 160 (worst 257). Concentrated in Romance and Slavic locales, where translated copy runs 20–30% longer than the English template it was built from.

- Drop the `| Adhiroha` suffix on translated pages.
- Implement a **per-locale character budget** rather than reusing the English template — a config map of locale → max title length and max description length, applied in the metadata builder.
- Do not machine-truncate mid-sentence. Where a locale's copy cannot fit, list it in `/seo-overlong.md` for manual rewriting.

### 8.4 URL hygiene

- **One malformed URL** with unencoded spaces and a colon: `/blog/Yoga for Seniors: A Beginner-Friendly Guide to Getting Started/`. It cannot be fetched programmatically. Slugify to something like `/blog/yoga-for-seniors-beginner-guide/` and 301 the old path.
- **21 blog slugs use uppercase** (e.g. `/blog/Yoga-for-Burnout/`). Lowercase them and 301 the old paths.
- Add a slugify guard in the CMS→route layer so future posts can never produce a slug containing spaces, colons, or uppercase characters.

---

## PHASE 9 — Internal linking: blog → course pages

**The business problem:** the informational cluster has ~45,000 impressions at positions 5–6. The commercial cluster has ~6,000 impressions at positions 15–26. The 200-hour course page sits at position **25.9**. The blog is not feeding the business.

**Important constraint:** blog posts already carry **51 internal links each**, above the 36.4 site average. Every additional link divides each page's authority further. More links is not better.

### Tasks

1. **First, audit where the existing 51 links point.** Classify them: navigation, footer, related-posts, in-body. Write the breakdown to `/seo-internal-links.md`. If a meaningful number already point at course pages, report that — the marginal value of this phase is then lower than assumed.
2. **Add 2–4 in-body contextual links per post**, not more. In-body links carry far more weight than sidebar or footer links, which Google treats as boilerplate.
3. **Prioritise topically close posts.** Kundalini, types-of-yoga, pranayama and philosophy posts → course pages. Aura-colour posts are topically distant and their links are worth less; add at most one there.
4. **Descriptive anchor text**, varied per post. "our 200-hour yoga teacher training in Rishikesh", "Pranayama Teacher Training course" — never "click here" or "learn more". Do not use the identical anchor on all 163 posts; that reads as a pattern.
5. **Sidebar CTA:** a single course CTA block in the blog sidebar is fine and useful for humans, but expect little ranking benefit — it will be treated as boilerplate. Keep it to one or two links, and rotate the target by post category if the template allows.
6. **Skip unindexed posts.** Links from pages Google hasn't indexed pass nothing. Phase 4 must ship first.

Show me the plan for the first 10 posts before applying to the rest.

---

## PHASE 10 — Remaining schema and locale fixes

### 10.1 `inLanguage` hardcoded to `"en"` on all 11 locales — HIGH, ~30 min

Both `WebSite.inLanguage` and `Course.inLanguage` return `"en"` on every locale, including `/de/200-stunden-yogalehrer-ausbildung-rishikesh/` which has a fully translated `name` and `teaches`. Same root cause as the already-fixed `<html lang>` bug — the locale isn't threaded into the schema builder. Derive it from the route locale.

### 10.2 `Course` missing recommended properties — MEDIUM

Currently present and valid: `name`, `description`, `provider`, `offers` (1275 EUR, `InStock`), `hasCourseInstance` (`courseMode: onsite`, `courseWorkload: P24D`, full location), `teaches`. Add:

- `image` — course rich results display imagery
- `educationalCredentialAwarded` — **ask me for the exact Yoga Alliance wording**; do not guess between "RYT 200" / "RYS 200" / "Yoga Alliance certified"
- `coursePrerequisites` — the FAQ already answers this ("assumes no prior teaching experience")
- `startDate` / `endDate` on `CourseInstance` — **ask me for the real batch dates**; the site runs monthly batches. Never invent dates.

### 10.3 `Review` / `AggregateRating` — MEDIUM, CONDITIONAL

The homepage displays "4.9 — Student Reviews from across the world" with named testimonials (Ronnie/Israel, Ramnik/London, Maya/Lithuania, Gonzalo/Spain), all unmarked.

**Three hard preconditions — do not implement until all three are met:**
1. **A count is mandatory.** Google requires `ratingCount` or `reviewCount` alongside `ratingValue`. The page shows "4.9" with **no count anywhere**. A real count must be published on the page first.
2. **Attach to `Course`, not `#organization`.** Google's review-snippet policy excludes reviews a business collects about itself when applied to `LocalBusiness`/`Organization`.
3. **The rating must be visible to users** on the same page as the markup.

**Do not invent a count to satisfy the requirement.** If I have not supplied a real count, skip this entirely and say so.

For individual `Review` markup: mark up only reviews genuinely submitted by those named people and visible on the page, using their verbatim text. If students did not give numeric star ratings, **omit `reviewRating`** rather than inventing one.

### 10.4 `LocalBusiness` additions — LOW

Merge into the existing `#organization` object: `openingHoursSpecification` (ask me for real office hours), `hasMap` (ask me for the GBP maps URL), `currenciesAccepted`, and the `sameAs` additions from §6.5. **Do not add `aggregateRating` here** — see 10.3 precondition 2.

### 10.5 `FAQPage` — NO ACTION

135 pages carry `FAQPage` markup. **Google retired FAQ rich results for all sites on 2026-05-07.** Any AI-citation benefit is unconfirmed.

- **Do not remove the existing markup.** Removal is explicitly not recommended and it costs nothing to keep.
- **Do not add `FAQPage` to new pages** expecting a SERP benefit.
- The FAQ *content* remains genuinely valuable to readers and is substantive and non-boilerplate across 135 pages. Keep writing it for users.

### 10.6 Locale landing pages — LOW

`/de/`, `/fr/`, `/it/`, `/es/`, `/pt/`, `/nl/`, `/sv/`, `/da/`, `/ja/`, `/pl/` expose 13 server-rendered internal links each (improved from 2), against a 36.4 site average. Server-render the full locale navigation and course grid so these hubs pass real authority into their own course pages.

### 10.7 Japanese thin content — MEDIUM

`/ja/` pages run 267–488 words where English equivalents run 3,000+ (`/ja/anzen-to-eisei-rishikesh/` at 267, `/ja/otoiawase/` at 293, `/ja/sotsugyosei-kara-no-message/` at 303, and others). Only 51 of 211 sitemap URLs are indexed, and the unindexed bulk is largely locale variants — this is a plausible cause.

**Do not write Japanese content.** Instead: list every `/ja/` page under 600 words in `/seo-thin-pages.md` with its word count, and add a `noindex` toggle mechanism I can flip per page. I will decide translate-vs-noindex myself.

### 10.8 Spanish and Portuguese blog gap — MEDIUM, report only

Blog posts carry **zero** hreflang tags (verified: 0 on `/blog/aura-colors-meanings-guide/` vs 12 on commercial pages). Meanwhile non-English aura queries already rank with no localised target: `aura farben bedeutung` at position 3.1 with 12.12% CTR, `significado de los colores del aura` at 5.6, `colores del aura y su significado` at 5.4. Mexico (12,901 impressions) and Brazil (10,066) are top-10 markets converting below average.

**Task:** build the hreflang plumbing so blog posts *can* carry alternates once translations exist, and report the opportunity. **Do not machine-translate anything.**

---

## PHASE 11 — Final verification

Write a single report to `/seo-implementation-report.md` covering:

**Per-phase results**
- What shipped, what was skipped, and why
- Every file created or modified

**Assertions to run and record**
1. Zero blog posts carry the homepage meta description
2. Distinct blog descriptions == published post count
3. Zero blog posts where `og:url` != own canonical
4. `sitemap.xml` is a valid index; child sitemaps total ≈ 375 URLs
5. `sitemap-blog.xml` count == published post count
6. `lastmod` values are not all identical
7. Every sitemap URL returns 200 with no redirect hop
8. Non-slash URLs 301 to slash form, path-preserving
9. `BlogPosting` JSON-LD present on every post, zero parse errors
10. Zero fabricated dates — cross-check a sample against the CMS
11. Images missing `width`/`height`: report the before/after count (was 5,947 of 10,623)
12. `srcset` count: report before/after (was 0)
13. `inLanguage` matches route locale on all 11 locales
14. Zero regressions: alt-text coverage still 100%, canonical still 1 per page, security headers unchanged, JSON-LD parse errors still 0
15. All 25 `-1` URLs 301 correctly and are absent from the sitemap

**Reports requiring my action**
- `/seo-missing-descriptions.md`
- `/seo-missing-dates.md`
- `/seo-cms-deletions.md`
- `/seo-title-proposals.md`
- `/seo-overlong.md`
- `/seo-thin-pages.md`
- `/seo-internal-links.md`

**Post-deploy steps for me** (list them, don't do them)
- Resubmit the sitemap index in Search Console
- Watch the 163 blog URLs enter the index over 2–4 weeks
- Re-check CLS on `/blogs/` from the GSC Core Web Vitals report (field data, not lab)
- Re-check impressions in 7 days to confirm or rule out the AI Overview hypothesis
- Decide the AI crawler policy (§6.1)
- Connect a backlink data source — free Moz API tier, 2,500 rows/month. This is a complete blind spot: 0 of 7 backlink factors are currently measurable, and Common Crawl suggests competitor `yogkulam.org` holds a materially stronger link position despite being the worse-built site. On-page fixes alone will not close a link-driven gap.
- Review the `bigw.com.au` outbound link on `/blog/why-stress-relief-yoga-should-be-a-part-of-very-workplace/` — an Australian retailer, almost certainly an editing error
- Verify the Facebook URL in `sameAs` manually in a browser (it returned HTTP 400 to automated requests, which Facebook routinely does — flagged unverifiable, not dead)

---

## Priority order (single source of truth)

| # | Phase | Effort | Note |
|---|---|---|---|
| 1 | **P2** Blog descriptions + og tags | 3 h | Largest measurable upside on the site. Do first. |
| 2 | **P4** Canonical / trailing-slash | 2–3 h | Gates Phases 5 and 9 |
| 3 | **P3** Dynamic sitemap index | 2–3 h | |
| 4 | **P5** BlogPosting + dates + bylines | 6–8 h | Add `Person` `@id` first |
| 5 | **P7.1** `width`/`height` on images | 3–4 h | Only fix that moves CLS |
| 6 | **P6** AI Overview structure work | — | Needs P5 shipped first |
| 7 | **P8.2** Titles + "Optimze" typo | 4–5 h | Proposals need my approval |
| 8 | **P7.2** `srcset` / responsive images | 8–12 h | Largest byte saving |
| 9 | **P8.1** 25 duplicate pairs | 3–4 h | |
| 10 | **P9** Internal linking | 3–4 h | Audit existing 51 links first |
| 11 | **P10** Remaining schema + locale | 6–8 h | Several items need data from me |

---

## Do-not-do list

- Do not fabricate dates, authors, reviewers, review counts, credentials, or batch dates
- Do not change AI crawler rules without written approval
- Do not delete CMS records — flag them
- Do not remove existing `FAQPage` markup
- Do not add `FAQPage` to new pages
- Do not add `aggregateRating` to `#organization`
- Do not machine-translate content
- Do not write Japanese content
- Do not touch existing alt text
- Do not use build timestamps as `lastmod` or `datePublished`
- Do not add more than 2–4 in-body course links per post
- Do not rewrite article substance or remove existing NIH / Harvard Health / journal citations
- Do not apply title rewrites without my approval
- Do not regress the security headers, resource hints, canonical tags, or schema hygiene — all currently clean
