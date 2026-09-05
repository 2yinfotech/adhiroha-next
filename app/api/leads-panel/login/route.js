import { NextResponse } from "next/server";
import { login, cookieOptions, COOKIE_NAME } from "@/lib/crm/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/* Deliberately slow to brute-force: one attempt per address per two seconds,
   held in memory. Not a substitute for a real rate limiter, but enough that a
   dictionary attack against a plaintext-password table is not free. The map is
   swept so a long-running process does not accumulate every IP that ever
   guessed wrong. */
const attempts = new Map();
const WINDOW = 2000;

function tooFast(ip) {
  const now = Date.now();
  if (attempts.size > 500) {
    for (const [k, t] of attempts) if (now - t > 60000) attempts.delete(k);
  }
  const last = attempts.get(ip);
  attempts.set(ip, now);
  return last && now - last < WINDOW;
}

export async function POST(request) {
  const ip =
    (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    request.headers.get("cf-connecting-ip") ||
    "unknown";

  if (tooFast(ip)) {
    return NextResponse.json({ ok: false, message: "Too many attempts. Wait a moment." }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const result = await login(body.username, body.password).catch((err) => {
    console.error("crm login:", err?.message || err);
    return null;
  });

  if (!result || !result.token) {
    // One message for every failure, so the response cannot be used to work out
    // which usernames exist.
    if (result?.error === "unconfigured") {
      console.error("crm login: CRM_SESSION_SECRET is missing or too short");
      return NextResponse.json(
        { ok: false, message: "The panel is not finished being set up: CRM_SESSION_SECRET is missing on the server." },
        { status: 503 }
      );
    }
    // A server-side problem is told apart from a bad password on purpose. These
    // two say nothing about whether the account exists, so they give an
    // attacker nothing — but they stop a database outage or a missing table
    // from being mistaken for the wrong password.
    if (result?.error === "no-table") {
      return NextResponse.json(
        { ok: false, message: "The panel is not finished being set up: the crm_users table does not exist yet. Run crm-users.sql." },
        { status: 503 }
      );
    }
    if (result?.error === "unavailable") {
      return NextResponse.json(
        { ok: false, message: "Cannot reach the database right now. Try again in a moment." },
        { status: 503 }
      );
    }

    const message =
      result?.error === "unsupported"
        ? "This account's password needs to be reset before it can be used here."
        : "Wrong username or password.";
    return NextResponse.json({ ok: false, message }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, result.token, cookieOptions);
  return res;
}
