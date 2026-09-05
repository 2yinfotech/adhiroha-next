import crypto from "crypto";
import { cookies } from "next/headers";
import { query, one } from "./db";

/**
 * Login for the leads panel.
 *
 * Credentials live in `crm_users`, a table this panel owns outright (see
 * crm-users.sql). It used to sign people in against the PHP admin's `admin`
 * table, but those rows are a mix of plain text and one old bcrypt hash that
 * cannot be verified here, which is why signing in was unreliable. Nothing in
 * the panel reads `admin` any more.
 *
 * Passwords are stored as scrypt hashes. A row whose password is still plain
 * text — which is how you reset one from phpMyAdmin — is accepted once and
 * immediately rewritten as a hash, so it stops being plaintext on first use.
 *
 * Comparison is constant-time, nothing is ever logged, and the password never
 * leaves this module.
 *
 * The session itself is a signed cookie — no session table, nothing to clean
 * up, and it cannot be forged without CRM_SESSION_SECRET.
 */
const COOKIE = "crm_session";
const MAX_AGE = 60 * 60 * 12; // 12 hours: a working day, then sign in again.

// A session opened with the access link instead of a password. Deliberately
// long, because the whole point is not to be asked for anything again — the
// bookmark is the credential, and reopening it renews this.
const KEY_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

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

  // Plain text — how a password reset typed straight into phpMyAdmin arrives.
  // Correct password: let them in and hash it on the way through.
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

  // Matched on either column, because people typing into a login box reach for
  // whichever they remember — "adhiroha" and info@adhiroha.com both have to
  // work. Disabled accounts simply do not match, so they fail exactly like a
  // wrong password rather than announcing that the account exists.
  // A database that cannot be reached, or a `crm_users` table that has not been
  // created yet, must not look like a wrong password. Reporting both the same
  // way sends whoever is signing in to hunt for a credentials problem that does
  // not exist — which is exactly what happened while this table was still only
  // a .sql file waiting to be run.
  let user;
  try {
    user = await one(
      "SELECT `id`,`username`,`password`,`email`,`full_name` FROM `crm_users` " +
        "WHERE `is_active` = 1 AND (`username` = ? OR `email` = ?) LIMIT 1",
      [name, name]
    );
  } catch (err) {
    console.error("crm login: cannot read crm_users:", err?.code || "", err?.message || err);
    return {
      error: err?.code === "ER_NO_SUCH_TABLE" ? "no-table" : "unavailable",
      token: null,
    };
  }

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
      await query("UPDATE `crm_users` SET `password` = ? WHERE `id` = ?", [await hashPassword(pass), user.id]);
    } catch {
      // An upgrade that fails must never block a valid login.
    }
  }

  // Best-effort, and after the password is already accepted: knowing when
  // someone last signed in is useful, but a write that fails must never turn a
  // valid login into a rejected one.
  try {
    await query("UPDATE `crm_users` SET `last_login` = NOW() WHERE `id` = ?", [user.id]);
  } catch {
    /* ignored on purpose */
  }

  return {
    error: null,
    token: sign({
      uid: user.id,
      u: user.full_name || user.username,
      e: user.email,
      exp: Date.now() + MAX_AGE * 1000,
    }),
  };
}

/* ---------------------------------------------------------------- access link */

/**
 * The panel has no login page any more: it is opened with one long secret link
 * that you bookmark, and the first visit leaves a 90-day cookie behind so every
 * visit after that is just /leads-panel/.
 *
 * The key is derived from CRM_SESSION_SECRET rather than being a second
 * variable to set on the server, so there is nothing extra to configure and no
 * chance of the panel being left wide open because a variable was forgotten.
 * Set CRM_ACCESS_KEY to override it with a value of your own.
 *
 * To revoke a link that has gone somewhere it should not have — a forwarded
 * email, a lost phone — change CRM_SESSION_SECRET. That invalidates the key and
 * every cookie ever issued from it in one step.
 */
export function accessKey() {
  const override = process.env.CRM_ACCESS_KEY;
  if (override) return override;
  return crypto
    .createHmac("sha256", secret())
    .update("leads-panel-access")
    .digest("hex")
    .slice(0, 32);
}

/** Constant-time check of the `k` in the access link. */
export function keyMatches(supplied) {
  const given = String(supplied || "");
  if (!given) return false;
  try {
    return sameSecret(given, accessKey());
  } catch {
    // CRM_SESSION_SECRET missing: there is no correct key, so nothing matches.
    return false;
  }
}

/**
 * The cookie value for a session opened with the link. `via: "key"` records how
 * it was opened, so a password login and a link visit can be told apart later
 * without guessing.
 */
export function keySessionToken() {
  return sign({
    uid: 0,
    u: "Adhiroha",
    e: null,
    via: "key",
    exp: Date.now() + KEY_MAX_AGE * 1000,
  });
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
};

/** Same cookie, kept for 90 days rather than 12 hours. */
export const keyCookieOptions = { ...cookieOptions, maxAge: KEY_MAX_AGE };

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
