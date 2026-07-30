# Schema / Structured Data Findings

JSON-LD present on **211/211** static pages. **0** invalid blocks.

## Types found

| Type | Pages |
|---|---|
| `EducationalOrganization` | 211 |
| `GeoCoordinates` | 211 |
| `ImageObject` | 211 |
| `LocalBusiness` | 211 |
| `PostalAddress` | 211 |
| `WebSite` | 211 |
| `BreadcrumbList` | 200 |
| `ListItem` | 200 |
| `Answer` | 135 |
| `FAQPage` | 135 |
| `Question` | 135 |
| `Course` | 110 |
| `CourseInstance` | 110 |
| `Offer` | 110 |
| `Place` | 110 |

## Gaps

- **No `Article`/`BlogPosting` on any of the 163 articles** — they carry only the site-wide `EducationalOrganization`/`LocalBusiness`/`WebSite`/`ImageObject` graph.
- No `author`, `datePublished` or `dateModified` anywhere.
- No `BreadcrumbList` on articles (present on 200 static pages).
- No `Review`/`AggregateRating` — deliberately omitted in `lib/seo.js` with a documented rationale. Correct call.
