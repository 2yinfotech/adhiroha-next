import { NextResponse } from "next/server";
import { consentRequiredFor } from "@/lib/consent";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Does this visitor have to be asked about cookies?
 *
 * The banner is a client component on statically generated pages, so it cannot
 * read request headers itself — and making the pages dynamic just to look at one
 * header would put every page render back on the origin, which is what got the
 * whole site rate-limited in the first place. One tiny JSON request instead,
 * made only by visitors who have no answer stored yet. Once they have chosen,
 * this is never called again.
 *
 * `cf-ipcountry` is Cloudflare's own geolocation of the connecting IP, added at
 * the edge. It is the same source lib/geo-country.js already trusts for lead
 * records, and a visitor's browser cannot influence it.
 *
 * The country itself is not returned. The client only needs the answer to the
 * question, and an endpoint that tells any caller where they appear to be is a
 * thing worth not building.
 */
export async function GET(request) {
  const country = request.headers.get("cf-ipcountry") || "";

  return NextResponse.json(
    { required: consentRequiredFor(country) },
    {
      // Per-visitor by definition. A cached answer here would show the banner to
      // the wrong half of the world.
      headers: { "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate" },
    }
  );
}
