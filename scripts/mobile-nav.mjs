/**
 * Moves the language switcher out of the mobile drawer and into the header bar.
 *
 * On phones the top strip (`.hd-top`) that holds the desktop language dropdown is
 * hidden, so the only way to change language was to open the burger menu and
 * scroll past six nav items to a "Language · English" accordion. This lifts it
 * into the bar itself as a compact chip next to the burger, and drops the
 * accordion from the drawer.
 *
 * The chip is a plain <details> element: no JavaScript is required for it to
 * open, which matters because the header markup is inlined into 200+ standalone
 * HTML blobs that each ship their own script.
 *
 * Language labels are lifted from the page's own existing `.hd-langs` card, so
 * every localized site keeps its own wording (Inglese/Anglais/Englisch …).
 *
 * Idempotent: a page that already has the chip is skipped.
 */
import fs from "fs";
import { execSync } from "child_process";

const CODES = {
  en: "EN", de: "DE", fr: "FR", es: "ES", it: "IT", pl: "PL",
  pt: "PT", nl: "NL", sv: "SV", da: "DA", ja: "JA"
};
const HREF = { en: "/", de: "/de", fr: "/fr", es: "/es", it: "/it", pl: "/pl",
  pt: "/pt", nl: "/nl", sv: "/sv", da: "/da", ja: "/ja" };

const GLOBE =
  '<svg width=\\"14\\" height=\\"14\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.6\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><circle cx=\\"12\\" cy=\\"12\\" r=\\"10\\"/><line x1=\\"2\\" y1=\\"12\\" x2=\\"22\\" y2=\\"12\\"/><path d=\\"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z\\"/></svg>';
const CHEV =
  '<svg class=\\"chev\\" width=\\"9\\" height=\\"6\\" viewBox=\\"0 0 11 7\\" fill=\\"none\\"><path d=\\"M1 1l4.5 4.5L10 1\\" stroke=\\"currentColor\\" stroke-width=\\"1.6\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"/></svg>';

const files = [
  ...execSync("find app -name content.js", { encoding: "utf8" }).trim().split("\n"),
  "components/chrome.js"
];

const localeOf = (p) => (p.match(/^app\/(de|fr|es|it|pl|pt|nl|sv|da|ja)\//) || [, "en"])[1];

// The language card is written with either `class=\"…\"` or `class= \"…\"`
// depending on which generation of the page blob it came from.
const LANGS = /hd-langs\\?"\s*>([\s\S]*?)<\/div>/;
const LINK = /href\s*=\s*\\?"([^"\\]+)\\?"\s*>([^<]+)</g;

function chip(links, locale) {
  const here = HREF[locale];
  const self = links.find(([h]) => h.replace(/\/$/, "") === here.replace(/\/$/, ""));
  const label = self ? self[1] : CODES[locale];
  const items = links
    .map(([h, t]) => {
      const on = h.replace(/\/$/, "") === here.replace(/\/$/, "");
      return `          <a${on ? ' class=\\"on\\"' : ""} href=\\"${h}\\">${t}</a>`;
    })
    .join("\\n");
  return (
    `<details class=\\"hd-langm\\">\\n` +
    `        <summary aria-label=\\"${label}\\">${GLOBE}<span>${CODES[locale]}</span>${CHEV}</summary>\\n` +
    `        <div class=\\"hd-langm-panel\\">\\n${items}\\n        </div>\\n` +
    `      </details>\\n        `
  );
}

let done = 0, skipped = 0, failed = [];
for (const f of files) {
  let raw = fs.readFileSync(f, "utf8");
  if (raw.includes("hd-langm")) { skipped++; continue; }

  const lm = raw.match(LANGS);
  const links = lm ? [...lm[1].matchAll(LINK)].map((m) => [m[1], m[2].trim()]) : [];
  const burger = raw.search(/<button[^>]*hd-burger/);
  if (links.length !== 11 || burger < 0) {
    failed.push(`${f}  (langs=${links.length}, burger=${burger > -1})`);
    continue;
  }

  // 1. Drop the language accordion from the drawer — it is the last <details>
  //    before the contact block.
  const ci = raw.indexOf("hdw-contact");
  if (ci > -1) {
    const ds = raw.lastIndexOf("<details", ci);
    const de = raw.indexOf("</details>", ds);
    if (ds > -1 && de > -1 && de < ci) {
      const blk = raw.slice(ds, de);
      if (blk.includes("/ja") && blk.includes("/sv")) {
        raw = raw.slice(0, ds) + raw.slice(de + "</details>".length).replace(/^(\\n)*\s*/, "");
      }
    }
  }

  // 2. Insert the chip immediately before the burger, so it sits inside .hd-in.
  const at = raw.search(/<button[^>]*hd-burger/);
  raw = raw.slice(0, at) + chip(links, localeOf(f)) + raw.slice(at);

  fs.writeFileSync(f, raw);
  done++;
}

console.log(`chip added: ${done} | already had it: ${skipped} | could not process: ${failed.length}`);
for (const x of failed) console.log("   " + x);
