"""Point every page's share image at the logo.

Next.js replaces a parent's `openGraph` block wholesale rather than merging
into it, so the root layout's image never reaches a page that declares its own
block. 164 pages declared one without an `images` key and therefore shipped no
og:image at all — shared on WhatsApp they showed no picture. This writes the
image into every block, adding the key where it is missing.
"""
import re, sys, glob

OG = "/img/adhiroha-og.jpg"
ALT = "Adhiroha Yoga School"
IMAGES_OG = f'images: [{{ url: "{OG}", width: 1200, height: 630, alt: "{ALT}" }}],'
IMAGES_TW = f'images: ["{OG}"],'

def block(src, key):
    """The {...} after `key:`, by brace matching — the blocks contain nested
    objects, so a regex would stop at the first closing brace."""
    i = src.find(key + ":")
    if i == -1: return None
    j = src.find("{", i)
    if j == -1: return None
    depth = 0
    for k in range(j, len(src)):
        if src[k] == "{": depth += 1
        elif src[k] == "}":
            depth -= 1
            if depth == 0: return (j, k + 1)
    return None

IMAGES_RE = re.compile(r'images:\s*\[(?:[^\[\]]|\[[^\]]*\])*\],?')

def fix(src, key, replacement):
    span = block(src, key)
    if not span: return src, "no-block"
    a, b = span
    inner = src[a:b]
    if IMAGES_RE.search(inner):
        new_inner = IMAGES_RE.sub(replacement, inner, count=1)
        action = "replaced"
    else:
        # Insert just before the block's closing brace, matching its indent.
        m = re.search(r'\n(\s*)\}$', inner)
        indent = (m.group(1) + "  ") if m else "      "
        new_inner = inner[:-1].rstrip()
        if not new_inner.endswith(","): new_inner += ","
        new_inner += f"\n{indent}{replacement}\n" + (m.group(1) if m else "    ") + "}"
        action = "added"
    return src[:a] + new_inner + src[b:], action

if __name__ == "__main__":
    write = "--write" in sys.argv
    counts = {}
    for p in sorted(glob.glob("app/**/page.jsx", recursive=True)):
        src = open(p, encoding="utf-8").read()
        if "openGraph" not in src: continue
        out, a1 = fix(src, "openGraph", IMAGES_OG)
        out, a2 = fix(out, "twitter", IMAGES_TW)
        counts[f"og:{a1} tw:{a2}"] = counts.get(f"og:{a1} tw:{a2}", 0) + 1
        if write and out != src:
            open(p, "w", encoding="utf-8").write(out)
    for k, v in sorted(counts.items()): print(f"  {v:>4}  {k}")
