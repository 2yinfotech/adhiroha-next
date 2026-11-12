import TurndownService from "turndown";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * A Markdown copy of any page, for AI agents.
 *
 * Agents pay per token, and a page here is ~490 KB of HTML (most of it the
 * Next.js hydration payload) for ~45 KB of words. This renders the page as
 * usual, drops the header, menus, footer, forms, scripts and icons, and returns
 * the rest as Markdown.
 *
 * Reached two ways:
 *  - directly, /api/markdown/?path=/about-us/, which every page advertises in
 *    its Link header;
 *  - through middleware.js, which rewrites a page request sent with
 *    `Accept: text/markdown` here. That only happens on a Cloudflare cache
 *    miss: Cloudflare caches pages by URL and ignores Accept, so the Link
 *    header is the dependable route.
 *
 * `no-store` matters: if Cloudflare ever stored a Markdown answer under a page
 * URL, every browser would be served Markdown.
 */
const PATH_OK = /^\/(?!\/)[A-Za-z0-9\-._~/%]*$/;

const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-" });
td.remove(["script", "style", "noscript", "svg", "header", "footer", "nav", "form", "iframe", "button", "template"]);
td.remove((node) => /\b(wa-float|hd-drawer|drawer)\b/.test(node.getAttribute?.("class") || ""));
// Images become their alt text: the picture costs tokens and tells an agent nothing.
td.addRule("imgAlt", {
  filter: "img",
  replacement: (_c, node) => {
    const alt = (node.getAttribute("alt") || "").trim();
    return alt ? `[Image: ${alt}]` : "";
  },
});

export async function GET(request) {
  const path = request.nextUrl.searchParams.get("path") || "/";
  if (!PATH_OK.test(path) || path.startsWith("/api/")) {
    return new Response("Bad path\n", { status: 400, headers: { "Content-Type": "text/plain" } });
  }

  let res;
  try {
    res = await fetch(new URL(path, request.nextUrl.origin), {
      headers: { Accept: "text/html" },
      redirect: "follow",
      cache: "no-store",
    });
  } catch {
    return new Response("Page could not be rendered\n", { status: 502, headers: { "Content-Type": "text/plain" } });
  }
  if (!res.ok || !(res.headers.get("content-type") || "").includes("text/html")) {
    return new Response("Not found\n", { status: res.status === 200 ? 404 : res.status, headers: { "Content-Type": "text/plain" } });
  }

  const html = await res.text();
  const title = (/<title>([^<]*)<\/title>/i.exec(html) || [])[1] || "";
  const desc = (/<meta name="description" content="([^"]*)"/i.exec(html) || [])[1] || "";
  const body = (/<body[^>]*>([\s\S]*)<\/body>/i.exec(html) || [, html])[1]
    // The React payload rides in <script> tags; drop it before parsing.
    .replace(/<script\b[\s\S]*?<\/script>/gi, "");

  const md = td.turndown(body).replace(/\n{3,}/g, "\n\n").trim();
  const canonical = `https://www.adhiroha.com${path}`;
  const head = [
    `# ${decode(title)}`,
    desc && `> ${decode(desc)}`,
    `Source: ${canonical}`,
  ].filter(Boolean).join("\n\n");

  return new Response(`${head}\n\n${md}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "no-store",
      Vary: "Accept",
      Link: `<${canonical}>; rel="canonical"`,
      "X-Robots-Tag": "noindex",
    },
  });
}

function decode(s) {
  return s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
