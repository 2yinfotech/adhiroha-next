import { NextResponse } from "next/server";
import { keyMatches, keySessionToken, keyCookieOptions, COOKIE_NAME } from "@/lib/crm/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * The panel's front door.
 *
 * There is no login page any more. This is the link you bookmark:
 *
 *   /api/leads-panel/key/?k=<the access key>
 *
 * A correct key leaves a 90-day cookie behind and sends you on to the panel, so
 * from then on plain /leads-panel/ opens straight up. When that eventually runs
 * out, opening the bookmark again renews it — nothing is ever typed.
 *
 * A wrong or missing key gets a 404, exactly like any URL that does not exist.
 * Someone poking at the site learns nothing about what is here or whether they
 * were close, and a 401 would have confirmed there is something worth guessing.
 *
 * `k` is 128 bits, so guessing is not a threat worth rate-limiting: the far more
 * realistic way for this link to leak is a forwarded email or a shared screen.
 * Change CRM_SESSION_SECRET to revoke it and every cookie it has issued.
 */
export async function GET(request) {
  const key = request.nextUrl.searchParams.get("k");

  if (!keyMatches(key)) {
    return new NextResponse(null, { status: 404 });
  }

  // Redirected to the clean URL so the key does not sit in the address bar, in
  // the browser's history, or in the Referer header of anything the panel then
  // loads.
  //
  // A relative Location, built by hand rather than with NextResponse.redirect,
  // which insists on an absolute URL. On Hostinger the app sits behind an Apache
  // reverse proxy that rewrites Host to 127.0.0.1:3000, so an absolute URL built
  // from `request.url` would send the browser to an address only the server can
  // reach. Relative is what the proxy cannot get wrong.
  const res = new NextResponse(null, {
    status: 303,
    headers: { Location: "/leads-panel/" },
  });
  res.cookies.set(COOKIE_NAME, keySessionToken(), keyCookieOptions);
  return res;
}
