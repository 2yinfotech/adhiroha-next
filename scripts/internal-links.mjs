/**
 * Adds contextual internal links to the English pages.
 *
 * The pages already say the target phrases in prose ("the 200 hour yoga teacher
 * training in Rishikesh", "a yoga teacher training in India", ...) but never
 * linked them, so the phrases carried no internal-link signal at all. This walks
 * every <p> in the page body and wraps the first unlinked occurrence of each
 * phrase in an anchor to the page that actually targets it.
 *
 * Body copy is never rewritten — only wrapped — so the reading experience and
 * the word count stay exactly as the writers left them.
 */
import fs from "fs";
import path from "path";

const MAIN = "app/(en)/(main)";

// Longest phrase first: "200 hour yoga teacher training in Rishikesh" has to win
// over the generic "yoga teacher training in Rishikesh" that it contains.
const RULES = [
  ["200[ ‑-]?hour yoga teacher training(?: course)? in rishikesh", "/200-hour-yoga-teacher-training-course-rishikesh/"],
  ["300[ ‑-]?hour yoga teacher training(?: course)? in rishikesh", "/300-hour-yoga-teacher-training-course-rishikesh/"],
  ["500[ ‑-]?hour yoga teacher training(?: course)? in rishikesh", "/500-hour-yoga-teacher-training-course-rishikesh/"],
  ["yoga teacher training(?: course)? in india", "/yoga-teacher-training-course-rishikesh-india/"],
  ["yoga teacher training(?: course)?s? in india", "/yoga-teacher-training-course-rishikesh-india/"],
  ["best yoga schools? in rishikesh", "/about-us/"],
  ["yoga ttc in rishikesh", "/faqs-of-yoga-school-in-india/"],
  ["hatha (?:&amp; |and )?yin(?: yoga)?(?: teacher)? training", "/hatha-teacher-training-course-rishikesh/"],
  ["ashtanga (?:&amp; |and )?vinyasa(?: yoga)?(?: teacher)? training", "/ashtanga-teacher-training-course-rishikesh/"],
  ["pranayama (?:&amp; |and )?meditation(?: teacher)? training", "/pranayama-teacher-training-course-rishikesh/"],
  ["sound healing(?: &amp; therapy)?(?: teacher)? training", "/sound-healing-ttc-rishikesh/"],
  ["sadhana immersion programme", "/sadhana-immersion-programme/"],
  // The yoga & ayurveda retreat rule is gone: that page is discontinued and
  // 301s to /sadhana-immersion-programme/, so linking the phrase would spend
  // an internal link on a redirect hop.
  ["yoga teacher training(?: course)? in rishikesh", "/"],
];

const MAX_PER_PAGE = 9;

const pages = [
  ["/", "app/_home/content.js"],
  ...fs
    .readdirSync(MAIN)
    .filter((d) => fs.existsSync(path.join(MAIN, d, "content.js")))
    .map((d) => [`/${d}/`, path.join(MAIN, d, "content.js")]),
];

// The header, the mobile drawer and the footer are navigation, not prose — the
// linker must not touch them.
function bodyRange(raw) {
  const start = raw.indexOf("</aside>");
  const end = raw.indexOf("<footer");
  return [start > -1 ? start + 8 : 0, end > -1 ? end : raw.length];
}

let grand = 0;
for (const [route, file] of pages) {
  const raw = fs.readFileSync(file, "utf8");
  const [lo, hi] = bodyRange(raw);
  const head = raw.slice(0, lo);
  const tail = raw.slice(hi);
  let body = raw.slice(lo, hi);

  const used = new Set([route]);
  let added = 0;
  const log = [];

  body = body.replace(/<p[^>]*>[\s\S]*?<\/p>/g, (para) => {
    if (added >= MAX_PER_PAGE) return para;
    if (/<a[\s>]/.test(para)) return para; // never nest a link inside a link
    let out = para;
    for (const [pattern, target] of RULES) {
      if (added >= MAX_PER_PAGE) break;
      if (used.has(target)) continue;
      const re = new RegExp(`(?<![\\w>])(${pattern})(?![\\w<])`, "i");
      const m = out.match(re);
      if (!m) continue;
      out = out.replace(re, `<a class=\\"ctx-link\\" href=\\"${target}\\">$1</a>`);
      used.add(target);
      added++;
      log.push(`"${m[1].replace(/\s+/g, " ")}" -> ${target}`);
      break; // at most one contextual link per paragraph
    }
    return out;
  });

  if (added) {
    fs.writeFileSync(file, head + body + tail);
    grand += added;
    console.log(`${route}  +${added}`);
    for (const l of log) console.log(`      ${l}`);
  } else {
    console.log(`${route}  +0`);
  }
}
console.log(`\nTotal contextual links added: ${grand}`);
