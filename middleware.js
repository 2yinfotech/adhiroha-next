import { NextResponse } from "next/server";

/**
 * Answer requests for .php files immediately, with an empty 404.
 *
 * This site replaced a PHP one, and the scanners never stopped: /wp-login.php,
 * /xmlrpc.php, /wp-admin/setup-config.php and hundreds of variations arrive
 * constantly looking for a WordPress that is not here. Every one of them used
 * to fall through to Next.js and render the full 404 page — React, the layout,
 * the fonts — to a bot that reads none of it. Hostinger flagged the volume while
 * looking into the site-wide 429.
 *
 * `matcher` means this function is only reached for paths ending in .php.
 * Ordinary pages never enter middleware at all, so nothing is paid on the
 * traffic that matters.
 *
 * The two real PHP URLs are let through: Registration.php was a page on the old
 * site and links to it are still in students' inboxes, so next.config redirects
 * it to /registration/. Whether that redirect runs before or after middleware is
 * a Next.js internal detail this should not depend on, so they are named here.
 */
const REAL_OLD_PAGES = new Set(["/registration.php", "/Registration.php"]);

export function middleware(request) {
  if (REAL_OLD_PAGES.has(request.nextUrl.pathname)) return NextResponse.next();

  // No body and no page render — the cheapest answer this server can give.
  return new NextResponse(null, {
    status: 404,
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}

export const config = {
  matcher: "/(.*)\\.php",
};
