// Ping IndexNow so Bing, Yandex, Naver and Seznam pick up changes without
// waiting for a crawl. Google does not participate, so this is purely for the
// other engines — worth it because the articles are database-driven and can
// change between deploys.
//
//   node scripts/indexnow.mjs                     → submits every sitemap URL
//   node scripts/indexnow.mjs /blog/some-post/    → submits just those paths
//
// The key lives at public/<key>.txt and its contents must equal the key itself;
// that file is how the engines verify we own the host.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "www.adhiroha.com";
const ORIGIN = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function findKey() {
  const pub = path.join(root, "public");
  const candidates = fs.readdirSync(pub).filter((f) => /^[a-f0-9]{8,128}\.txt$/.test(f));
  for (const file of candidates) {
    const key = file.replace(/\.txt$/, "");
    if (fs.readFileSync(path.join(pub, file), "utf8").trim() === key) return key;
  }
  throw new Error("No IndexNow key file found in public/ (expected <key>.txt containing the key)");
}

// Read the route list straight out of app/sitemap.js so the two can never drift.
function sitemapUrls() {
  const src = fs.readFileSync(path.join(root, "app/sitemap.js"), "utf8");
  const body = src.slice(src.indexOf("const routes = ["), src.indexOf("];"));
  return [...body.matchAll(/"([^"]*)"/g)]
    .map((m) => m[1])
    .map((r) => (r === "" ? `${ORIGIN}/` : `${ORIGIN}/${r}/`));
}

const key = findKey();
const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((a) => (a.startsWith("http") ? a : ORIGIN + (a.startsWith("/") ? a : "/" + a)))
  : sitemapUrls();

// IndexNow accepts at most 10,000 URLs per request; batch defensively anyway.
const BATCH = 1000;
let sent = 0;

for (let i = 0; i < urlList.length; i += BATCH) {
  const urlList_ = urlList.slice(i, i + BATCH);
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key, keyLocation: `${ORIGIN}/${key}.txt`, urlList: urlList_ }),
  });
  // 200 = accepted, 202 = accepted but key still being validated.
  if (res.status !== 200 && res.status !== 202) {
    console.error(`IndexNow returned ${res.status} ${res.statusText}`);
    console.error(await res.text().catch(() => ""));
    process.exit(1);
  }
  sent += urlList_.length;
  console.log(`submitted ${urlList_.length} URLs (${res.status})`);
}

console.log(`done — ${sent} URLs submitted with key ${key}`);
