/**
 * Works out which country a request came from.
 *
 * Its own module rather than living inside the lead route so it can be tested
 * on its own and reused by any other form that needs the same answer.
 */

const str = (v, max) => String(v ?? "").trim().slice(0, max);

/* ------------------------------------------------------------------ country

   The country used to be whatever the browser sent, and the landing page's form
   sent the literal string "United States" for every lead — so every enquiry in
   the CRM claimed to be American regardless of where it came from. It is now
   derived here, from the request, and the client's value is ignored entirely: a
   visitor's own browser has no business deciding which country they are in.

   Two sources, in order of how much they can be trusted:

     1. `cf-ipcountry`. The site sits behind Cloudflare, which resolves the
        visitor's IP at the edge and adds this header. Free, instant, and it
        never leaves our own request.
     2. A geo-IP lookup on the forwarded client IP, used only when that header
        is missing (a direct origin hit, or Cloudflare IP Geolocation turned
        off). Given a short timeout and wrapped so that a slow or dead lookup
        can never delay or fail the lead itself — a saved lead with an unknown
        country beats a lost lead every time.
*/

// Cloudflare uses XX for "could not determine" and T1 for traffic off Tor. ZZ is
// CLDR's own "unknown region", which Intl happily renders as the words "Unknown
// Region" — a string that must never reach the CRM as if it were a country.
const NOT_A_COUNTRY = new Set(["XX", "T1", "ZZ"]);

export function countryName(code) {
  const upper = String(code || "").trim().toUpperCase();
  if (upper.length !== 2 || NOT_A_COUNTRY.has(upper)) return "";
  try {
    // fallback:"none" so an invalid code yields undefined rather than being
    // echoed straight back — "QQ" is not a country name.
    return new Intl.DisplayNames(["en"], { type: "region", fallback: "none" }).of(upper) || "";
  } catch {
    return "";
  }
}

/** The visitor's IP, as forwarded by Cloudflare and the origin's proxy. */
export function clientIp(headers) {
  const forwarded = (headers.get("x-forwarded-for") || "").split(",")[0].trim();
  return forwarded || headers.get("cf-connecting-ip") || headers.get("x-real-ip") || "";
}

// A lookup on any of these would be pointless — they are not routable, which is
// what every request looks like in local development.
const PRIVATE_IP =
  /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|::1$|fc|fd)/i;

export async function lookupCountry(ip) {
  if (!ip || PRIVATE_IP.test(ip)) return "";
  try {
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}?fields=success,country,country_code`, {
      signal: AbortSignal.timeout(1500),
      headers: { accept: "application/json" },
    });
    if (!res.ok) return "";
    const data = await res.json();
    if (!data || data.success === false) return "";
    return str(data.country, 255) || countryName(data.country_code);
  } catch {
    // Timed out, offline, rate-limited — all the same answer here.
    return "";
  }
}

export async function resolveCountry(headers) {
  const fromCloudflare = countryName(headers.get("cf-ipcountry"));
  if (fromCloudflare) return fromCloudflare;
  return (await lookupCountry(clientIp(headers))) || "Not Available";
}
