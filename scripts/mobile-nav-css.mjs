/**
 * Writes the mobile-nav stylesheet block into every page stylesheet that carries
 * the header rules. Each app/**\/styles.css is a full standalone copy of the site
 * CSS, so a header change has to be applied to all of them.
 *
 * Idempotent: the block is delimited by markers and replaced in place on re-run.
 */
import fs from "fs";
import { execSync } from "child_process";

const START = "/* == MOBILE NAV START ==";
const END = "/* == MOBILE NAV END == */";
const block = fs.readFileSync(process.argv[2], "utf8").trim();

const files = execSync("find app -name styles.css", { encoding: "utf8" }).trim().split("\n");
let written = 0, skipped = 0;
for (const f of files) {
  let css = fs.readFileSync(f, "utf8");
  if (!css.includes("hd-drawer")) { skipped++; continue; }   // not a chrome-bearing sheet
  const i = css.indexOf(START);
  if (i > -1) {
    const j = css.indexOf(END, i);
    css = css.slice(0, i) + css.slice(j + END.length);
  }
  fs.writeFileSync(f, css.replace(/\s*$/, "") + "\n\n" + block + "\n");
  written++;
}
console.log(`stylesheets written: ${written} | skipped (no header CSS): ${skipped}`);
