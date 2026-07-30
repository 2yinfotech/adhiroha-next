/**
 * Threads the per-course facts (image, credential, prerequisites, batch dates)
 * from lib/seo.js into every courseSchema() call site.
 *
 * Resolution order for "which course is this call describing":
 *   1. the literal `url:` argument, when it is an English course slug
 *   2. the page's own `const EN = "…"`, for the localized course pages
 *   3. `days`, for the overview pages that describe 200/300/500 from one URL
 *
 * Idempotent: a call that already spreads courseFacts is left alone.
 */
import fs from "fs";
import { execSync } from "child_process";
import { COURSE_FACTS } from "../lib/seo.js";

const BY_DAYS = {
  24: "/200-hour-yoga-teacher-training-course-rishikesh/",
  30: "/300-hour-yoga-teacher-training-course-rishikesh/",
  60: "/500-hour-yoga-teacher-training-course-rishikesh/",
};

const dry = process.argv.includes("--dry");
const files = execSync('grep -rl "courseSchema(" app --include=page.jsx', { encoding: "utf8" })
  .trim().split("\n");

let changed = 0, calls = 0, skipped = 0;
const unresolved = [];

for (const f of files) {
  let src = fs.readFileSync(f, "utf8");
  const enConst = (/^const EN = "([^"]+)";/m.exec(src) || [])[1];
  let out = "", i = 0, touched = false;

  for (const m of src.matchAll(/courseSchema\(\{/g)) {
    // Walk to the matching close brace so nested objects cannot fool us.
    let d = 0, j = m.index + "courseSchema(".length;
    for (; j < src.length; j++) {
      if (src[j] === "{") d++;
      else if (src[j] === "}") { d--; if (!d) break; }
    }
    const body = src.slice(m.index, j + 1);
    calls++;
    if (body.includes("courseFacts")) { skipped++; continue; }

    const urlLit = (/url:\s*"([^"]+)"/.exec(body) || [])[1];
    const days = Number((/days:\s*(\d+)/.exec(body) || [])[1]);
    const key =
      (urlLit && COURSE_FACTS[urlLit] && urlLit) ||
      (enConst && COURSE_FACTS[enConst] && enConst) ||
      BY_DAYS[days];

    if (!key || !COURSE_FACTS[key]) { unresolved.push(`${f}  url=${urlLit ?? "(const)"} days=${days}`); continue; }

    out += src.slice(i, j) + `, ...courseFacts("${key}")`;
    i = j;
    touched = true;
  }
  out += src.slice(i);

  if (touched) {
    if (!/[,{]\s*courseFacts\b/.test(out) && !out.includes("courseFacts,")) {
      out = out.replace(/(import \{[^}]*?)(\} from "@\/lib\/seo";)/, "$1, courseFacts$2");
    }
    if (!dry) fs.writeFileSync(f, out);
    changed++;
  }
}

console.log(`${dry ? "[dry run] " : ""}files: ${files.length} | calls: ${calls} | files changed: ${changed} | already done: ${skipped} | unresolved: ${unresolved.length}`);
for (const u of unresolved.slice(0, 15)) console.log("   " + u);
