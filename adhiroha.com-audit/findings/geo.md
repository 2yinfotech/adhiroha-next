# AI Search Readiness (GEO) Findings

## Blocked AI crawlers (`robots.txt`, Cloudflare managed block)

```
User-agent: CCBot                              Disallow: /
User-agent: ClaudeBot                          Disallow: /
User-agent: CloudflareBrowserRenderingCrawler  Disallow: /
User-agent: Google-Extended                    Disallow: /
User-agent: GPTBot                             Disallow: /
User-agent: meta-externalagent                 Disallow: /

Content-Signal: search=yes, ai-train=no, use=reference
```

Effect: not citable by ChatGPT, Claude or Meta AI; excluded from Gemini grounding. **Google Search indexing is unaffected.** Likely intentional (Cloudflare default) — treat as a business decision.

## Other

- `/llms.txt` returns 404. Emerging convention, ignored by Google Search; low priority and moot while the crawlers above are blocked.
- `FAQPage` schema on 135 pages with Q&A lifted from visible markup — strong passage-level citability.
- No `Article` schema on the 163 pages most likely to be cited.
