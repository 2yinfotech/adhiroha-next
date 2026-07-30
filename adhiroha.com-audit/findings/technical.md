# Technical SEO Findings

## Crawl summary

- 211/211 sitemap URLs returned HTTP 200
- 0 redirect chains, 0 server errors
- 163 additional article URLs discovered via `/blogs/`, none in the sitemap

## Redirects & hosts

| Check | Result |
|---|---|
| `http://www.adhiroha.com/` | 301 -> `https://www.adhiroha.com/` |
| `https://adhiroha.com/` | **200 (should be 301)** — serves 429,715 bytes |
| `/about-us` (no slash) | 308 -> `/about-us/` |
| Nonexistent URL | 404 |

## Security headers (present on `/`)

```
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
x-frame-options: SAMEORIGIN
content-security-policy: upgrade-insecure-requests
server: cloudflare
```

## Pages with ZERO hreflang (26)

These are the English pages that 175 localized pages point at. Without reciprocal annotations Google discards the relationship.

- https://www.adhiroha.com/about-us/
- https://www.adhiroha.com/contact-us/
- https://www.adhiroha.com/blogs/
- https://www.adhiroha.com/yoga-gallery-india/
- https://www.adhiroha.com/yoga-teachers-in-india/
- https://www.adhiroha.com/yoga-retreat-in-rishikesh/
- https://www.adhiroha.com/yoga-ashram-in-india-code-of-conduct/
- https://www.adhiroha.com/safety-hygiene-in-rishikesh/
- https://www.adhiroha.com/soon-after-message/
- https://www.adhiroha.com/sadhana-immersion-programme/
- https://www.adhiroha.com/sound-healing-ttc-rishikesh/
- https://www.adhiroha.com/200-hour-yoga-teacher-training-course-rishikesh/
- https://www.adhiroha.com/300-hour-yoga-teacher-training-course-rishikesh/
- https://www.adhiroha.com/500-hour-yoga-teacher-training-course-rishikesh/
- https://www.adhiroha.com/ashtanga-teacher-training-course-rishikesh/
- https://www.adhiroha.com/hatha-teacher-training-course-rishikesh/
- https://www.adhiroha.com/pranayama-teacher-training-course-rishikesh/
- https://www.adhiroha.com/blog-200-hour-yoga-teacher-training-guide/
- https://www.adhiroha.com/blog-300-vs-500-hour-yoga-teacher-training/
- https://www.adhiroha.com/blog-500-hour-yoga-teacher-training-worth-it/
- https://www.adhiroha.com/weather/
- https://www.adhiroha.com/volunteer-opportunity-in-rishikesh/
- https://www.adhiroha.com/apply-for-teacher-in-rishikesh/
- https://www.adhiroha.com/faqs-of-yoga-school-in-india/
- https://www.adhiroha.com/privacy-policy/
- https://www.adhiroha.com/yoga-teacher-training-course-rishikesh-india/

## hreflang distribution

| Alternates declared | Pages |
|---|---|
| 12 (complete) | 11 — homepages only |
| 3 (self + en + x-default) | 174 |
| 0 | 26 |

## `<html lang>` 

All 211 pages serve `lang="en"`, including every `/de`, `/ja`, `/fr` page. Set client-side by `components/SetLang.jsx`.
