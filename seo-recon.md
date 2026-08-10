# SEO Recon — Phase 1 findings

**Date:** 2026-08-11
**Scope:** Phase 1 of `ACTION-PLAN.md` only. No application code was written.
**Base commit:** `b66b0ce` — working tree clean apart from untracked `ACTION-PLAN.md`, so per-phase commits can start from a clean base.

Everything below was verified by running commands against this repo, a local
production build (`next build` + `next start`), and — where noted — the live
site. Nothing here is inferred from the audit documents.

---

## 1. Router type

**App Router.** `app/` exists, `pages/` does not. 205 `page.jsx` files.
Next.js **15.1.6**, React **19.0.0**.

One structural detail the plan does not anticipate: **there is no `app/layout.jsx`.**
The site uses *eleven root layouts*, one per locale (`app/(en)/layout.jsx`,
`app/de/layout.jsx`, …), each rendering the shared `components/SiteShell.jsx`.
This is deliberate — a single root layout cannot vary `<html lang>` per locale
in a static build. Any task that says "edit the root layout" must be applied to
`SiteShell.jsx` (all locales) and separately to `app/(lp)/layout.jsx` (the ads
landing page, which does not use SiteShell).

## 2. Build mode

| Setting | Value |
|---|---|
| `output: 'export'` | **No.** Explicitly rejected in a code comment: Hostinger runs `next build` then `next start`. |
| `trailingSlash` | `true` |
| `i18n` key | **Absent.** Correct for App Router — locales are real route segments, not Next i18n config. |
| `images` | `{ unoptimized: true }` |
| `redirects()` | apex→www 301 (two rules), `/blog`→`/blogs/`, and 11 retreat 301s |
| `headers()` | HSTS, nosniff, Referrer-Policy, X-Frame-Options. No CSP. |

**This is not a static export.** Runtime route handlers are available, which
matters for Phase 3 — see §9.

## 3. Blog data source

**Live MySQL, not a headless CMS.** `lib/articles.js`, using `mysql2/promise`,
querying a single table `articles` (plus `article_faqs`).

There is no CMS SDK, no MDX, no build-time JSON fetch. Posts are presumably
edited through phpMyAdmin or a legacy PHP admin outside this repo.

**The functions Phases 2, 3 and 5 need:**

| Function | Returns | Used by |
|---|---|---|
| `getAllArticles()` | every post: `id, title, slug, published_date, modified_date, author, cover_image, title_tag, a_cat` (no body) | `/blogs/` hub, related-posts |
| `getArticleBySlug(slug)` | full row **including `content`** | post page |
| `getAllSlugs()` | slug list | — |
| `getFaqs(articleId)` | `question, answer` | post page |
| `getInternalOk()` | internal-link allowlist | post body rewriting |

`getAllArticles()` is the function the blog sitemap must reuse (§3.2).

A dev fallback exists: `ARTICLES_SOURCE=sqlfile` parses the checked-in
`articles.sql` instead of MySQL. **`.env.local` currently sets `sqlfile`**, and
`DB_HOST` is loopback, so **the production database is not reachable from this
machine.** See §10 — this is the main blocker.

## 4. Fields available per post

Authoritative column list from the `articles` schema:

| Plan's expected field | Actual column | Status |
|---|---|---|
| `slug` | `slug` | present |
| `title` | `title` | present |
| `excerpt` / `summary` / `description` | — | **DOES NOT EXIST** |
| `body` / `content` | `content` (HTML) | present |
| `publishedAt` | `published_date` (DATE) | present |
| `updatedAt` | `modified_date` (DATE) | present |
| `author` | `author` (varchar) | present, but see below |
| `category` / `tags` | `a_cat` | category only, no tags |
| `coverImage` | `cover_image` | present, nullable |
| `locale` | — | **DOES NOT EXIST** — blog is English-only |
| SEO title | `title_tag` | present (extra, not in the plan) |
| draft / status flag | — | **DOES NOT EXIST** — every row is live |

Field population, measured across the local `articles.sql` snapshot (97 posts):
no empty `published_date`, `modified_date`, `author`, `cover_image`, `title_tag`
or `a_cat`. `published_date` spans 2025-08-20 → 2026-05-15 across 20 distinct
dates; `published_date == modified_date` on 30 of 36 sampled.

**Three consequences for the plan:**

1. **§2.1's priority order collapses to step 3.** There is no SEO description
   field and no excerpt, so every description must be derived from the opening
   of `content`. `title_tag` exists but is a *title*, not a description.
2. **§5.2's "no author" branch is unlikely to fire, but the author value is not
   a person.** Every sampled row has `author = "Adhiroha"` — the organisation,
   not one of the 11 instructors. So `author` → `Person @id` linking (§5.3)
   cannot be done from existing data without you assigning real authors.
3. **§3.4's "exclude drafts" is a no-op.** There is no draft flag; if a row
   exists it is published.

## 5. Templates and where `<head>` metadata comes from

| Thing | File |
|---|---|
| Blog post page | `app/(en)/(main)/blog/[slug]/page.jsx` — `export const dynamic = "force-dynamic"` |
| `/blogs/` hub | `app/(en)/(main)/blogs/page.jsx` — also `force-dynamic` |
| Shared header/drawer/footer | `components/chrome.js` (escaped HTML strings) |
| Metadata defaults | `lib/root-metadata.js` → `rootMetadata(locale)`, consumed by the 11 root layouts |
| Document shell | `components/SiteShell.jsx` |

**The blog post's `generateMetadata` returns only two things:**

```js
return {
  title: article.title_tag || article.title,
  alternates: { canonical: `/blog/${article.slug}/` },
};
```

No description, no `openGraph`, no `twitter`. Next.js therefore inherits the
root layout's defaults. Verified on a real post, **local and production**:

```
meta description  = "Yoga Alliance certified 200, 300 & 500 hour yoga teacher training…"  (homepage)
og:title          = "Yoga Teacher Training in Rishikesh | 200/300/500-Hr YTTC | Adhiroha" (homepage)
og:url            = "https://www.adhiroha.com/"                                           (homepage)
og:type           = "website"
link rel=canonical= "https://www.adhiroha.com/blog/7-chakras-and-their-effects/"           (correct)
```

**Phase 2's premise is confirmed exactly.** The canonical is already right; the
description and the whole OG block are wrong. Both are fixed in one place.

## 6. Existing sitemap

`app/sitemap.js` — a Next.js metadata route with `export const dynamic = "force-static"`.
It is a **hardcoded array of route strings**, 216 lines.

- Live `sitemap.xml`: **200 `<loc>` entries** (the plan says 211 — see §10).
- Local build: also 200, after this session's retreat-page removal.
- **Zero blog posts.** Only `/blogs/` and the three hand-built `blog-*-guide`
  pages are listed.
- `robots.txt` already declares `Sitemap: https://www.adhiroha.com/sitemap.xml`,
  and that line **does survive to production** despite Cloudflare rewriting the
  rest of the file.

## 7. Existing schema

`lib/seo.js` is the single JSON-LD builder. Exports: `organizationSchema`,
`websiteSchema`, `courseSchema`, `personSchema` / `teacherSchemas`, `faqSchema`,
`breadcrumbSchema`, `videoSchema`, `schoolTourVideoSchema`, `graph`.
Emitted through `components/JsonLd.jsx`.

Sitewide graph (from `SiteShell`): `WebSite` + `["EducationalOrganization","LocalBusiness"]`
with nested `PostalAddress`, `GeoCoordinates`, `ImageObject`.

**On a blog post, that sitewide graph is all there is.** No `BlogPosting`, no
`Article`, no `BreadcrumbList`. Confirmed on production.

Two things relevant to later phases:

- **§5.1 confirmed:** `/yoga-teachers-in-india/` emits **11 `Person` nodes** with
  `name`, `jobTitle`, `worksFor` — and **no `@id` on any of them**.
- **§10.3 caution:** `lib/seo.js` already defines `REVIEW_COUNT = 300` and
  `RATING_VALUE = 5.0`. They are **deliberately not emitted**, with a comment
  explaining that a flat 5.0 with a round count and no `Review` nodes invites a
  manual action. I have not verified where 300 and 5.0 came from and I am
  treating both as unverified. Per ground rule 1 I will not emit them.

## 8. Images

**Zero `next/image` usage anywhere.** Every image is a raw `<img>` tag, mostly
inside the HTML strings in `content.js` / `chrome.js` / the MySQL article bodies.

Measured on a local production build:

| Page | `<img>` | has `width` | has `height` | has `srcset` | has `alt` | `loading="lazy"` |
|---|---|---|---|---|---|---|
| `/` | 68 | 68 | 68 | **0** | 68 | 22 |
| `/blogs/` | 104 | **7** | **7** | **0** | 104 | 100 |
| `/blog/{slug}/` | 8 | 5 | 5 | **0** | 8 | 4 |
| `/200-hour-…/` | 76 | **9** | **9** | **0** | 76 | 71 |

- `srcset` is **0 on every template** — matches the audit.
- `alt` coverage is **100% on every template** — matches the audit. Do not touch.
- `width`/`height` coverage is **not uniform**: the homepage is fully covered,
  but `/blogs/` is at 7 of 104 and the course pages at 9 of 76. §7.1 should
  target `/blogs/` and the course templates, not the homepage.

Because `images.unoptimized = true` and there is no `next/image`, §7.2 means
hand-authored `srcset`/`sizes` or a Cloudflare image pipeline — not a
`next/image` migration.

## 9. Rebuild trigger

**There is no CI and no deploy webhook.** No `.github/workflows`. `npm run push`
(`scripts/push-to-github.mjs`) simply does `git add -A`, commit, push. Hostinger
builds on push.

**But this matters less than the plan assumes**, because the blog is
`force-dynamic`: blog pages read MySQL at request time, so a newly published
post is live immediately with no rebuild.

That means for §3.3 we can have the **genuinely zero-touch option**: implement
`sitemap-blog.xml` as a dynamic route handler that calls `getAllArticles()` on
request (with a cache header), exactly like the blog pages already do. New posts
then appear in the sitemap with no build and no webhook. I recommend this over
the build-time `postbuild` script the plan describes as the fallback.

---

## 10. Where reality diverges from the plan — read this before Phase 2

These are not objections to the plan. They are places where acting on the
plan's stated numbers would produce wrong work.

### 10.1 Post count: the plan says 163, this repo yields 97 — BLOCKER

The checked-in `articles.sql` is a **stale snapshot** containing 97 posts.
Production is authoritative and I cannot reach it: `.env.local` points
`DB_HOST` at loopback, and the Hostinger MySQL user is almost certainly
localhost-only.

Everything the plan asks me to verify — "distinct descriptions == post count",
"sitemap-blog.xml count == published post count", the 78 duplicate titles, the
`-1` pairs — can only be measured against production.

**I need one of:** a fresh `articles.sql` export, remote MySQL credentials, or
an SSH tunnel. Without it I can still *write* Phase 2 and 3 correctly (the code
is data-agnostic), but I cannot run the Phase 2/3 verification assertions
honestly, and I would be reporting counts from a stale file.

### 10.2 Duplicate `-1` pairs: 25 vs 27 vs 2

The plan says 25. `adhiroha.com-audit/findings/content.md` lists **27 pairs**.
The local snapshot contains **2**. I will work from the audit's 27-row table,
but the real list must be re-derived from production.

Note also that the plan references `findings/content.md` and
`generated-schema.json` at the repo root; the first actually lives at
`adhiroha.com-audit/findings/content.md`, and **`generated-schema.json` does not
exist anywhere in the repo.** §5.3's "reference templates" are therefore
unavailable — I will build the `BlogPosting` object from the plan's inline JSON
instead.

### 10.3 "No visible date, no author" is no longer true

§P5 and the priority table state that all posts have no visible date and no
author. **The blog template already renders a byline** — category, publish date,
reading time and author — in `heroMeta`. Verified in the local build *and* on
the live site.

What is genuinely missing on blog posts is: `BlogPosting` JSON-LD,
`BreadcrumbList`, a "last updated" line, and any link from the author name to a
`Person` entity. Phase 5 is still worth doing; it is smaller than budgeted.

### 10.4 `robots.txt` is Cloudflare-managed — §6.1 cannot be done in this repo

`app/robots.js` emits four lines: `User-Agent: * / Allow: / / Sitemap: …`.
It contains **no AI crawler rules at all**.

The live `robots.txt` is wrapped in `# BEGIN Cloudflare Managed content` …
`# END Cloudflare Managed Content` and carries the `Content-Signal` header plus
`Disallow: /` for Amazonbot, Applebot-Extended, Bytespider, CCBot, ClaudeBot,
CloudflareBrowserRenderingCrawler, Google-Extended, GPTBot, meta-externalagent.

So the answer to the plan's "check and tell me where it actually lives" is:
**the Cloudflare dashboard, not the repo.** Whichever option you pick in §6.1,
I cannot implement it in code — I can only prepare the exact rule text for you
to paste into Cloudflare.

### 10.5 The two §3.5 link defects behave differently than described

- **`/sitemap.xml/` with a trailing slash:** I could not reproduce it. There is
  no `href="/sitemap.xml/"` anywhere in the repo, and both the local build and
  the live page link `href="/sitemap.xml"` correctly. `/sitemap.xml/` returns
  **308**, not 404, so even if a stale link exists it costs one redirect hop.
  I suggest treating this as already fixed unless you can point me at a page
  that still does it.
- **`/cdn-cgi/l/email-protection`:** appears **3 times on the live page and 0
  times in the local build.** It is injected by Cloudflare Email Obfuscation,
  not by our code. It cannot be fixed in the repo — it is a Scrape Shield
  toggle in Cloudflare. My recommendation: leave it on (it does suppress
  address harvesting) and record it as a known false positive.

### 10.6 Other confirmations

- `/llms.txt` → **404** confirmed.
- Blog posts carry **0 hreflang** tags; course pages carry **12**. §10.8 confirmed.
- The blog is **English-only** — no `/de/blog/` routes exist. Any blog hreflang
  work is plumbing for translations that do not yet exist.
- Live sitemap has **200** URLs, not 211. The delta is partly this session's
  removal of the 11 retreat pages.
- Internal blog links from `/blogs/` already use the **trailing-slash form**
  (97 of 97), so Phase 4's biggest stated risk is not present locally.
- Slug hygiene in the local snapshot: **20 uppercase slugs**, 2 `-1` twins, and
  **no** slug containing a space or colon. The plan's malformed
  `/blog/Yoga for Seniors: …/` URL does not exist in this snapshot — again,
  production must be re-checked.

---

## 11. What I need from you before Phase 2

**Blocking:**

1. **Production blog data** — a fresh `articles.sql` dump, remote DB
   credentials, or an SSH tunnel. Without this I can write Phase 2 but cannot
   verify it against the real 163 posts (§10.1).

**Not blocking Phase 2, needed later:**

2. **§6.1 AI crawler policy** — Option A / B / C. Note it must be applied in
   Cloudflare; I will hand you the rule text (§10.4).
3. **§8.2 blog title rewrites** — I will write proposals to
   `/seo-title-proposals.md` once I can read production titles.
4. **Data only you have:** real batch dates (§10.2), a real published review
   count (§10.3 — and please confirm whether 300 / 5.0 in `lib/seo.js` are real
   or placeholders), exact Yoga Alliance credential wording (§10.2), the Google
   Business Profile URL and Yoga Alliance directory URL (§6.5), and office
   hours (§10.4).
5. **Author assignment** — every post currently has `author = "Adhiroha"`. If
   you want `Person`-linked bylines (§5.3), you need to assign real instructors.
   Otherwise I will emit the organisation as author, which is honest and valid.

---

## 12. Recommended first move

Phase 2 is unblocked for **implementation** and is the highest-value item. The
description helper, the OG block and the title handling all live in one
`generateMetadata` in one file, and none of it depends on the post count.

I suggest: **let me build Phase 2 now**, and run its verification (§2.4) against
whatever data source you give me. If the production dump arrives first, the
verification numbers will be real on the first run.

Awaiting your review before writing any code.
