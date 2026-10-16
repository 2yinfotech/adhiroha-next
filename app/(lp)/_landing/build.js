import baseContent from "../yoga-training-rishikesh/content";
import baseScripts from "../yoga-training-rishikesh/scripts";
import { VARIANTS } from "./variants";

/**
 * One ad group, one landing page — built from the /yoga-training-rishikesh/
 * page rather than copied from it.
 *
 * Google scores a landing page partly on how closely it matches the keywords
 * that sent the click, so each ad group gets a page whose title, H1, hero lines,
 * section headings and intro copy say what that group's searchers typed. The
 * design, images, reviews, form and script are the original page's, untouched.
 *
 * Every variant is a list of [find, replace] pairs applied to the original
 * markup. `find` is matched with any run of whitespace treated as equivalent,
 * because the source wraps lines inside headings. A pair that matches nothing
 * throws at build time: if somebody edits the original page and one of these
 * anchors moves, the build fails and says which one, instead of quietly
 * shipping a page that still talks about the wrong keyword.
 */

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const tolerant = (s) => new RegExp(s.trim().split(/\s+/).map(escape).join("\\s+"), "g");

function applyPairs(source, pairs, where, slug) {
  let out = source;
  for (const [find, replace] of pairs) {
    const rx = tolerant(find);
    if (!rx.test(out)) {
      throw new Error(`[landing:${slug}] ${where}: anchor not found — "${find.slice(0, 80)}"`);
    }
    out = out.replace(tolerant(find), () => replace);
  }
  return out;
}

export function buildLanding(slug) {
  const v = VARIANTS[slug];
  if (!v) throw new Error(`[landing] no variant called ${slug}`);
  return {
    content: applyPairs(baseContent, v.content, "content", slug),
    scripts: applyPairs(baseScripts, [
      // Leads from each page are labelled with their ad group in the CRM, so
      // which group actually produces enquiries is visible, not guessed.
      ["\"Modal - Yoga Training Rishikesh\"", JSON.stringify(`Modal - LP ${v.source}`)],
      ["\"Contact Form - Yoga Training Rishikesh\"", JSON.stringify(`Contact Form - LP ${v.source}`)],
    ], "scripts", slug),
  };
}

export function landingMetadata(slug) {
  const v = VARIANTS[slug];
  // No canonical and no hreflang: the (lp) layout marks these pages noindex.
  // Seven near-identical pages must never compete with the real course pages
  // in search; they exist for paid traffic only.
  return { title: v.title, description: v.description };
}
