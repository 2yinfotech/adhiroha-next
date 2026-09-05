import crypto from "crypto";
import { cookies } from "next/headers";
import { query, one } from "./db";

/**
 * Login for the leads panel.
 *
 * Credentials come from the existing `admin` table, so the staff who already
 * sign in to admin.adhiroha.com use the same username and password here rather
 * than being handed a second set.
 *
 * That table stores most of its passwords in plain text. That is not something
 * this panel can fix retroactively — the plaintext is already in the database
 * and in every backup of it — but it does not have to make it worse:
 *
 *   · A correct plaintext login is transparently upgraded to a scrypt hash, so
 *     the row stops being plaintext the first time that person signs in.
 *   · Comparison is constant-time, so a wrong password cannot be narrowed down
 *     by timing.
 *   · Nothing is ever logged, and the password never leaves this module.
 *
 * The one bcrypt row (`$2y$…`, the demo "Admin" account from 2021) cannot be
 * verified without a bcrypt dependency and is refused rather than guessed at.
 * It is not an account anyone uses; if it ever needs to work, reset it through
 * the panel and it becomes a scrypt row like the rest.
 *
 * The session itself is a signed cookie — no session table, nothing to clean
 * up, and it cannot be forged without CRM_SESSION_SECRET.
 */

const COOKIE = "crm_session";
const MAX_AGE = 60 * 60 * 12; // 12 hours: a working day, then sign in again.

function secret() {
  const s = process.env.CRM_SESSION_SECRET;
  if (!s || s.length < 16) {
    throw new Error(
      "CRM_SESSION_SECRET is missing or too short — set a long random value in .env"
    );
  }
  return s;
}

/* ----------------------------------------------------------------- passwords */

const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 32 };

function scryptHash(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, SCRYPT.keylen, { N: SCRYPT.N, r: SCRYPT.r, p: SCRYPT.p }, (err, key) =>
      err ? reject(err) : resolve(key.toString("hex"))
    );
  });
}

export async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  return `scrypt$${salt}$${await scryptHash(password, salt)}`;
}

/** Constant-time compare that tolerates different lengths. */
function sameSecret(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  if (x.length !== y.length) {
    // Still burn a comparison so the mismatch is not measurably faster.
    crypto.timingSafeEqual(x, x);
    return false;
  }
  return crypto.timingSafeEqual(x, y);
}

async function verifyPassword(stored, supplied) {
  if (!stored) return { ok: false, needsUpgrade: false };

  if (stored.startsWith("scrypt$")) {
    const [, salt, key] = stored.split("$");
    return { ok: sameSecret(key, await scryptHash(supplied, salt)), needsUpgrade: false };
  }

  // A bcrypt row. Refused rather than silently letting anyone in.
  if (/^\$2[aby]\$/.test(stored)) return { ok: false, needsUpgrade: false, unsupported: true };

  // Plain text, as most of these rows are. Correct password: let them in and
  // hash it on the way through.
  return { ok: sameSecret(stored, supplied), needsUpgrade: true };
}

/* ------------------------------------------------------------------ sessions */

function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const mac = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${mac}`;
}

function unsign(token) {
  if (!token || !token.includes(".")) return null;
  const [body, mac] = token.split(".");
  const expected = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  if (!sameSecret(mac, expected)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

/**
 * Checks a username and password and, if they are right, returns the session
 * cookie value to set. Returns null for every kind of failure — a wrong
 * password and an unknown user are deliberately indistinguishable.
 */
export async function login(username, password) {
  const name = String(username || "").trim();
  const pass = String(password || "");
  if (!name || !pass) return null;

  // Checked before anything else. Without it `sign()` throws at the very end,
  // after a *correct* password, and the caller reports "wrong username or
  // password" — which would send someone hunting for a credentials problem that
  // does not exist. A server that cannot issue sessions should say so.
  try {
    secret();
  } catch {
    return { error: "unconfigured", token: null };
  }

  // Matched on either column. The table's `username` values are names
  // ("adhiroha", "Sachin") while the addresses live in `email`, and people
  // typing into a login box reach for their email address — signing in with
  // info@adhiroha.com has to work, not just "adhiroha".
  const user = await one(
    "SELECT `id`,`username`,`password`,`email` FROM `admin` WHERE `username` = ? OR `email` = ? LIMIT 1",
    [name, name]
  );
  if (!user) {
    // Spend roughly the same time as a real verification would, so a valid
    // username cannot be discovered by how quickly the answer comes back.
    await scryptHash(pass, "decoy-salt-for-timing");
    return null;
  }

  const { ok, needsUpgrade, unsupported } = await verifyPassword(user.password, pass);
  if (!ok) return { error: unsupported ? "unsupported" : null, token: null };

  if (needsUpgrade) {
    try {
      await query("UPDATE `admin` SET `password` = ? WHERE `id` = ?", [await hashPassword(pass), user.id]);
    } catch {
      // An upgrade that fails must never block a valid login.
    }
  }

  return {
    error: null,
    token: sign({ uid: user.id, u: user.username, e: user.email, exp: Date.now() + MAX_AGE * 1000 }),
  };
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
};

export const COOKIE_NAME = COOKIE;

/** The signed-in user, or null. Used by every panel page and API route. */
export async function currentUser() {
  try {
    const jar = await cookies();
    return unsign(jar.get(COOKIE)?.value);
  } catch {
    return null;
  }
}

/** Throws unless someone is signed in — the guard for every write route. */
export async function requireUser() {
  const user = await currentUser();
  if (!user) {
    const err = new Error("Not signed in");
    err.status = 401;
    throw err;
  }
  return user;
}
