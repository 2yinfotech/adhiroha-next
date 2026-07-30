/**
 * Adds the Person and VideoObject nodes to the pages that actually show them:
 *   - teacherSchemas()      -> every localized version of the teachers page
 *   - studentVideoSchemas() -> every course page that embeds the review videos
 *
 * Membership is decided from each page's own content.js, not a hand-kept list,
 * so a page that stops embedding the videos stops emitting the markup.
 *
 * Idempotent.
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { STUDENT_VIDEOS } from "../lib/seo.js";

const dry = process.argv.includes("--dry");
const pages = execSync("find app -name page.jsx", { encoding: "utf8" }).trim().split("\n");
const VIDEO_IDS = STUDENT_VIDEOS.map((v) => v.id);

let vids = 0, tchs = 0, skipped = 0;

for (const p of pages) {
  const dir = path.dirname(p);
  const localContent = path.join(dir, "content.js");
  const src0 = fs.readFileSync(p, "utf8");
  if (!src0.includes("graph(")) continue;

  // Resolve the content blob this page renders — localized pages import their own.
  let html = "";
  if (fs.existsSync(localContent)) html = fs.readFileSync(localContent, "utf8");
  else {
    const imp = /import content from "([^"]+)"/.exec(src0);
    if (imp) {
      const f = path.resolve(dir, imp[1].endsWith(".js") ? imp[1] : imp[1] + ".js");
      if (fs.existsSync(f)) html = fs.readFileSync(f, "utf8");
    }
  }
  if (!html) continue;

  const wantVideo = VIDEO_IDS.some((id) => html.includes(id));
  const wantTeachers = html.includes("tch-grid") && /tch-tag/.test(html);
  if (!wantVideo && !wantTeachers) continue;

  let src = src0;
  const add = [];
  if (wantVideo && !src.includes("studentVideoSchemas")) add.push("studentVideoSchemas");
  if (wantTeachers && !src.includes("teacherSchemas")) add.push("teacherSchemas");
  if (!add.length) { skipped++; continue; }

  // Spread the node arrays into the existing graph(...) call.
  const locale = (/^app\/(da|de|es|fr|it|ja|nl|pl|pt|sv)\//.exec(p) || [, "en"])[1];
  const call = (a) => (a === "teacherSchemas" && locale !== "en" ? `${a}("${locale}")` : `${a}()`);
  src = src.replace(/graph\(/, `graph(\n  ...${add.map(call).join(",\n  ...")},`);
  src = src.replace(/(import \{[^}]*?)(\} from "@\/lib\/seo";)/, `$1, ${add.join(", ")} $2`);

  if (!dry) fs.writeFileSync(p, src);
  if (add.includes("studentVideoSchemas")) vids++;
  if (add.includes("teacherSchemas")) tchs++;
}

console.log(`${dry ? "[dry run] " : ""}video markup added to ${vids} pages | teacher markup added to ${tchs} pages | already done: ${skipped}`);
