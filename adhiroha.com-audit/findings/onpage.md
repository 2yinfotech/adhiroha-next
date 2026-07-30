# On-Page SEO Findings

## Coverage

| Check | Result |
|---|---|
| Missing title | 0 |
| Duplicate titles | 0 |
| Missing meta description | 0 |
| Duplicate descriptions | 0 |
| Missing H1 | 0 |
| Multiple H1 | 0 |
| Missing viewport | 0 |
| Missing canonical | 0 |
| Titles > 60 chars | 78 |
| Titles > 70 chars | 35 |
| Descriptions > 160 chars | 121 |
| Missing og:image | 175 |

## Open Graph defect

8 of 9 sampled English subpages return the homepage's `og:url` and `og:title`:

```
/200-hour-yoga-teacher-training-course-rishikesh/
  og:url    = https://www.adhiroha.com/          <-- wrong
  canonical = https://www.adhiroha.com/200-hour-yoga-teacher-training-course-rishikesh/
  og:title  = Yoga Teacher Training in Rishikesh | 200/300/500-Hr YTTC - Adhiroha   <-- homepage title
```

Only `/yoga-teacher-training-course-rishikesh-india/` sets its own `openGraph` and is correct.

## Longest titles

| Chars | URL |
|---|---|
| 95 | https://www.adhiroha.com/fr/formation-professeur-de-yoga-en-inde/ |
| 93 | https://www.adhiroha.com/es/formacion-de-profesor-de-yoga-en-india/ |
| 90 | https://www.adhiroha.com/pt/formacao-de-professor-de-yoga-na-india/ |
| 89 | https://www.adhiroha.com/de/yogalehrer-ausbildung-rishikesh-indien/ |
| 87 | https://www.adhiroha.com/it/formazione-insegnanti-yoga-in-india/ |
| 85 | https://www.adhiroha.com/yoga-teacher-training-course-rishikesh-india/ |
| 84 | https://www.adhiroha.com/pl/kurs-nauczycielski-jogi-w-indiach/ |
| 82 | https://www.adhiroha.com/sv/yogalararutbildning-i-indien/ |
| 82 | https://www.adhiroha.com/pt/ashtanga-vinyasa-formacao-de-professor-de-yoga-rishikesh/ |
| 82 | https://www.adhiroha.com/nl/yoga-docentenopleiding-in-india/ |
| 81 | https://www.adhiroha.com/fr/pranayama-meditation-formation-professeur-de-yoga-rishikesh/ |
| 81 | https://www.adhiroha.com/es/ |
| 80 | https://www.adhiroha.com/pt/pranayama-meditacao-formacao-de-professor-de-yoga-rishikesh/ |
| 80 | https://www.adhiroha.com/it/pranayama-meditazione-formazione-insegnanti-yoga-rishikesh/ |
| 80 | https://www.adhiroha.com/da/yogalaereruddannelse-i-indien/ |

## Keyword anchor-text coverage (sitewide, English)

| Keyword | Before | After local fix |
|---|---|---|
| yoga teacher training in Rishikesh | 3 | 47 |
| yoga teacher training in India | 0 | 17 |
| best yoga school in Rishikesh | 0 | 15 |
| 200 hour yoga teacher training in Rishikesh | 3 | 21 |
| yoga TTC in Rishikesh | 0 | 14 |

The "after" column is in the working tree, not yet deployed.
