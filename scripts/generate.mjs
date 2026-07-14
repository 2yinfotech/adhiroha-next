import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, "../.."); // original site root
const APP = path.resolve(__dirname, "../app");

// route slug  ->  source html file
const PAGES = {
  "about-us": "about-us.html",
  "contact-us": "contact-us.html",
  "blogs": "blogs.html",
  "yoga-gallery-india": "yoga-gallery-india.html",
  "yoga-teachers-in-india": "yoga-teachers-in-india.html",
  "yoga-retreat-in-rishikesh": "yoga-retreat-in-rishikesh.html",
  "yoga-ashram-in-india-code-of-conduct": "yoga-ashram-in-india-code-of-conduct.html",
  "safety-hygiene-in-rishikesh": "safety-hygiene-in-rishikesh.html",
  "soon-after-message": "soon-after-message.html",
  "sadhana-immersion-programme": "sadhana-immersion-programme.html",
  "sound-healing-ttc-rishikesh": "sound-healing-ttc-rishikesh.html",
  "200-hour-yoga-teacher-training-course-rishikesh": "200-hour-yoga-teacher-training-course-rishikesh.html",
  "300-hour-yoga-teacher-training-course-rishikesh": "300-hour-yoga-teacher-training-course-rishikesh.html",
  "500-hour-yoga-teacher-training-course-rishikesh": "500-hour-yoga-teacher-training-course-rishikesh.html",
  "ashtanga-teacher-training-course-rishikesh": "ashtanga-teacher-training-course-rishikesh.html",
  "hatha-teacher-training-course-rishikesh": "hatha-teacher-training-course-rishikesh.html",
  "pranayama-teacher-training-course-rishikesh": "pranayama-teacher-training-course-rishikesh.html",
  "blog-200-hour-yoga-teacher-training-guide": "blog-200-hour-yoga-teacher-training-guide.html",
  "blog-300-vs-500-hour-yoga-teacher-training": "blog-300-vs-500-hour-yoga-teacher-training.html",
  "blog-500-hour-yoga-teacher-training-worth-it": "blog-500-hour-yoga-teacher-training-worth-it.html",
};

// html file -> clean route (for rewriting internal links). Trailing slashes
// match the exported folder structure (<slug>/index.html) so static hosting
// serves them without an extra redirect hop.
const LINK_MAP = { "index.html": "/" };
for (const [slug, file] of Object.entries(PAGES)) LINK_MAP[file] = "/" + slug + "/";

const ROOT_IMAGES = ["background-1", "bg-living", "bohemian-sun", "om-logo"];

function rewritePaths(s) {
  // relative asset folders -> absolute (so they resolve under clean URLs)
  s = s.replace(/(["'(])(?:\.\/)?(img|gallery|css|js)\//g, "$1/$2/");
  // root-level png images referenced bare
  const re = new RegExp(`(["'(])(?:\\./)?(${ROOT_IMAGES.join("|")})\\.png`, "g");
  s = s.replace(re, "$1/$2.png");
  return s;
}

function rewriteLinks(s) {
  for (const [file, route] of Object.entries(LINK_MAP)) {
    const esc = file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(href=["'])${esc}((?:#|\\?)[^"']*)?(["'])`, "g");
    s = s.replace(re, (_m, p1, frag, p3) => `${p1}${route}${frag || ""}${p3}`);
  }
  return s;
}

function transform(s) {
  return rewriteLinks(rewritePaths(s));
}

function extractHead(html) {
  const pick = (re) => {
    const m = html.match(re);
    return m ? m[1].trim() : "";
  };
  return {
    title: pick(/<title>([\s\S]*?)<\/title>/i),
    description: pick(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i),
    ogTitle: pick(/<meta[^>]*property=["']og:title["'][^>]*content=["']([\s\S]*?)["']/i),
    ogDesc: pick(/<meta[^>]*property=["']og:description["'][^>]*content=["']([\s\S]*?)["']/i),
    ogImage: pick(/<meta[^>]*property=["']og:image["'][^>]*content=["']([\s\S]*?)["']/i),
  };
}

// concatenate every inline <style> in the document
function extractStyles(html) {
  const out = [];
  const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out.join("\n");
}

// concatenate every inline <script> (skip <script src=...>)
function extractScripts(html) {
  const out = [];
  const re = /<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    const attrs = m[1] || "";
    if (/\bsrc=/.test(attrs)) continue; // external script, handled globally
    out.push(m[2]);
  }
  return out.join("\n");
}

// Full <body> inner HTML with every <script> removed (scripts run via
// PageScripts). Keeps the page's original structure intact — including the
// hero section, the navbar/drawer nested inside it, and the footer.
function extractBody(html) {
  const start = html.indexOf(">", html.indexOf("<body")) + 1;
  const end = html.indexOf("</body>");
  const body = html.slice(start, end);
  return body.replace(/<script[\s\S]*?<\/script>/gi, "").trim();
}

function metaFile(head, route) {
  const esc = (v) => JSON.stringify(v || undefined);
  const canonical = route === "__home__" ? "/" : "/" + route + "/";
  const og = {};
  if (head.ogTitle) og.title = head.ogTitle;
  if (head.ogDesc) og.description = head.ogDesc;
  if (head.ogImage) og.images = [transform(head.ogImage)];
  const ogStr = Object.keys(og).length
    ? `,\n  openGraph: ${JSON.stringify(og, null, 2).replace(/\n/g, "\n  ")}`
    : "";
  return `export const metadata = {
  title: ${esc(head.title)},
  description: ${esc(head.description)},
  alternates: { canonical: ${esc(canonical)} }${ogStr}
};
`;
}

function pageSource(styleImport, metadata) {
  return `import "${styleImport}";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";

${metadata}
export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
`;
}

function emit(dir, { content, styles, scripts, page }) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "content.js"), `export default ${JSON.stringify(content)};\n`);
  fs.writeFileSync(path.join(dir, "styles.css"), styles);
  fs.writeFileSync(path.join(dir, "scripts.js"), `export default ${JSON.stringify(scripts)};\n`);
  fs.writeFileSync(path.join(dir, "page.jsx"), page);
}

function build(file, route) {
  const html = fs.readFileSync(path.join(SRC, file), "utf8");
  return {
    head: extractHead(html),
    content: transform(extractBody(html)),
    styles: transform(extractStyles(html)),
    scripts: transform(extractScripts(html)).trim(),
  };
}

function writePage(slug, file) {
  const { head, content, styles, scripts } = build(file, slug);
  emit(path.join(APP, "(main)", slug), {
    content,
    styles,
    scripts,
    page: pageSource("./styles.css", metaFile(head, slug)),
  });
  console.log(`  ✓ /${slug}  (content ${content.length}b, styles ${styles.length}b, scripts ${scripts.length}b)`);
}

function writeHome() {
  const { head, content, styles, scripts } = build("index.html", "__home__");
  const dir = path.join(APP, "_home");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "content.js"), `export default ${JSON.stringify(content)};\n`);
  fs.writeFileSync(path.join(dir, "styles.css"), styles);
  fs.writeFileSync(path.join(dir, "scripts.js"), `export default ${JSON.stringify(scripts)};\n`);
  fs.writeFileSync(path.join(APP, "page.jsx"), pageSource("./_home/styles.css", metaFile(head, "__home__")).replace('import content from "./content"', 'import content from "./_home/content"').replace('import scripts from "./scripts"', 'import scripts from "./_home/scripts"'));
  console.log(`  ✓ / (home)  (content ${content.length}b, styles ${styles.length}b, scripts ${scripts.length}b)`);
}

console.log("Writing homepage…");
writeHome();
console.log("Writing pages…");
for (const [slug, file] of Object.entries(PAGES)) writePage(slug, file);
console.log("Done.");
