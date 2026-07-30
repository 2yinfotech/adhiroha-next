# Image Findings

| Check | Count |
|---|---|
| Total `<img>` across 211 pages | 9,357 |
| Missing `alt` attribute | **0** |
| Empty `alt=""` (decorative) | 253 |
| Missing `width`/`height` | 5,005 |
| Using `loading="lazy"` | 8,270 |
| Using `srcset` (homepage sample) | **0 of 56** |

Format is WebP throughout. Measured CLS stays under 0.04 despite the missing dimensions, so this is a robustness issue rather than an active one.
