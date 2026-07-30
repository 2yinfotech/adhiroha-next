# Performance Findings

Lab data, throttled headless Chromium. **No CrUX field data available** — these are not real-user metrics.

| Page | Device | LCP ms | CLS | FCP ms | TTFB ms | LongTask ms | Total KB | Image KB | Reqs | DOM nodes |
|---|---|---|---|---|---|---|---|---|---|---|
| home | mobile | 4432 | 0.007 | 4432 | 811 | 279 | 2530 | 2365 | 43 | 2057 |
| home | desktop | 1288 | 0.004 | 1056 | 686 | 0 | 2968 | 2861 | 41 | 2054 |
| 200hr | mobile | 3412 | 0.001 | 3412 | 2011 | 142 | 1085 | 930 | 39 | 2464 |
| 200hr | desktop | 1576 | 0.009 | 1452 | 1075 | 0 | 1279 | 1180 | 39 | 2462 |
| about | mobile | 3436 | 0.002 | 3436 | 1984 | 190 | 1405 | 1250 | 38 | 897 |
| about | desktop | 2544 | 0.026 | 2372 | 1737 | 0 | 1507 | 1408 | 37 | 895 |
| retreat | mobile | 2292 | 0.002 | 2292 | 1008 | 203 | 1306 | 1152 | 37 | 1352 |
| retreat | desktop | 2164 | 0.035 | 1924 | 1587 | 0 | 1678 | 1579 | 37 | 1350 |

## Images on mobile homepage (390px viewport, DPR 3)

| KB | File | Natural px | Displayed px |
|---|---|---|---|
| 480 | `/img/remote/img_dji-0921.webp` | 1500 | 334 |
| 467 | `/img/yttc-004.webp` | 1500 | 390 |
| 416 | `/img/remote/img_shiva-adhiroha.webp` | 1500 | 390 |
| 306 | `/img/home-arch.webp` | 1200 | 346 |
| 205 | `/img/yoga-training-certification.webp` | 1400 | 334 |

**Total 2.31 MB of images over 12 requests.** 0 of 56 images use `srcset`; 0 use `sizes`; 0 `<picture>` elements.

## HTML weight

- Median HTML: 246,648 bytes
- Max: 440,932 bytes (https://www.adhiroha.com/es/500-horas-formacion-de-profesor-de-yoga-rishikesh/)
- Pages over 250 KB: 100 of 211
- Median inline `<script>` blocks per page: 15
- Median stylesheet links per page: 4
