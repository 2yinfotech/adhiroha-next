#!/usr/bin/env node
/**
 * Copy confirmed bookings into `students`.
 *
 * A Node port of the PHP cron that did the same job. Run it on a schedule:
 *
 *   node /home/u511577297/nodejs/scripts/sync-students.mjs
 *
 * It finds every `bookings` row that is confirmed and has no `students` row
 * yet, and writes one. Safe to run as often as you like — a booking already
 * copied is skipped.
 *
 * Flags
 *   --dry-run   say what would be written, write nothing
 *   --quiet     only print errors and the final count
 *
 * Exit codes: 0 = fine, 1 = something failed (so cron can mail you).
 *
 * Differences from the PHP, all deliberate:
 *   - prepared statements instead of escaped string building;
 *   - a MySQL named lock, so two overlapping cron runs cannot both insert the
 *     same booking. The PHP had a real race there: `students` has no unique
 *     key on `s_bid`, so a slow run overlapping the next one would duplicate;
 *   - `s_welcome` is written as '' rather than omitted, because the column is
 *     NOT NULL with no default and would be rejected under strict SQL mode.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

const DRY = process.argv.includes("--dry-run");
const QUIET = process.argv.includes("--quiet");

/* ── settings ────────────────────────────────────────────────────────── */

/**
 * The server's own environment wins. `.env.local` is read only to fill gaps,
 * because a cron job does not inherit the Node app's configured variables on
 * shared hosting, and forgetting that is the usual reason a cron "does
 * nothing" while the site is fine.
 */
function env(name, ...fallbackNames) {
  for (const n of [name, ...fallbackNames]) {
    if (process.env[n]) return process.env[n];
  }
  if (!env._file) {
    env._file = {};
    try {
      for (const line of fs.readFileSync(path.join(ROOT, ".env.local"), "utf8").split("\n")) {
        const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
        if (m) env._file[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
    } catch { /* no .env.local on the server, which is normal */ }
  }
  for (const n of [name, ...fallbackNames]) {
    if (env._file[n]) return env._file[n];
  }
  return "";
}

const DB = {
  host: env("DB_HOST", "REG_DATABASE_HOST") || "127.0.0.1",
  port: Number(env("DB_PORT", "REG_DB_PORT")) || 3306,
  user: env("DB_USER", "REG_DB_USER"),
  password: env("DB_PASSWORD", "REG_DB_PASSWORD"),
  database: env("DB_NAME", "REG_DB_NAME"),
};

const stamp = () => new Date().toLocaleString("sv-SE", { timeZone: "Asia/Kolkata" }).replace("T", " ");
const say = (msg) => { if (!QUIET) console.log(`${stamp()} : ${msg}`); };
const shout = (msg) => console.error(`${stamp()} : ${msg}`);

/* ── the three parsers, matching the PHP exactly ─────────────────────── */

const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];

/**
 * "1st Nov 2025" -> a Date. The stored dates use mixed abbreviations —
 * Jan, Feb, Sept, June, July — so the month is matched on its first three
 * letters, which is unambiguous for all twelve.
 */
function parseStayDate(text) {
  const m = /(\d{1,2})\s*(?:st|nd|rd|th)?\s+([A-Za-z]+)\.?\s+(\d{4})/.exec(String(text || ""));
  if (!m) return null;
  const idx = MONTHS.findIndex((full) => full.toLowerCase().startsWith(m[2].slice(0, 3).toLowerCase()));
  if (idx < 0) return null;
  return new Date(Number(m[3]), idx, Number(m[1]));
}

/**
 * "1st Nov 2025 - 24th Nov 2025"  ->  "November"
 * "1st Jul 2026 - 24th Aug 2026"  ->  "July - August"   (a 500 hour stay)
 *
 * Walks month by month from the start date to the end date, exactly as the PHP
 * did, so a stay that crosses a month boundary lists both.
 */
export function getCourseMonths(range) {
  const [a, b] = String(range || "").split("-");
  const start = parseStayDate(a);
  const end = parseStayDate(b);
  if (!start || !end) return "";

  const seen = [];
  const cur = new Date(start);
  // Guarded at 24 turns: a corrupt range must not spin forever in a cron.
  for (let i = 0; cur <= end && i < 24; i++) {
    const name = MONTHS[cur.getMonth()];
    if (!seen.includes(name)) seen.push(name);
    cur.setMonth(cur.getMonth() + 1);
  }
  return seen.join(" - ");
}

/** The first four-digit year in the range. */
export function getCourseYear(range) {
  return (/\d{4}/.exec(String(range || "")) || [""])[0];
}

/** "€1,275 " -> "1275" */
export function cleanAmount(amount) {
  return String(amount ?? "").replace(/[,€\s]/g, "");
}

/* ── the job ─────────────────────────────────────────────────────────── */

const LOCK = "adhiroha_sync_students";

async function main() {
  if (!DB.user || !DB.database) {
    shout("no database settings — set DB_USER / DB_PASSWORD / DB_NAME (or the REG_ equivalents)");
    process.exit(1);
  }

  const mysql = await import("mysql2/promise");
  let conn;
  try {
    conn = await mysql.createConnection({ ...DB, charset: "utf8mb4" });
  } catch (e) {
    shout(`cannot reach ${DB.database} at ${DB.host}:${DB.port} — ${e.code || ""} ${e.message}`);
    process.exit(1);
  }

  let held = false;
  try {
    // 0 = do not wait. If another run is still going, this one steps aside
    // rather than racing it.
    const [[lock]] = await conn.query("SELECT GET_LOCK(?, 0) AS got", [LOCK]);
    if (!lock.got) { say("another sync is already running, nothing to do"); return 0; }
    held = true;

    const [rows] = await conn.query(`
      SELECT b.*
        FROM bookings b
        LEFT JOIN students s ON s.s_bid = b.b_id
       WHERE b.b_status = 'confirmed'
         AND s.s_bid IS NULL
       ORDER BY b.b_id DESC
    `);

    if (!rows.length) { say("No new students"); return 0; }

    let inserted = 0, failed = 0;
    for (const b of rows) {
      const row = {
        s_name: b.b_name, s_gender: b.b_gender, s_email: b.b_email,
        s_whatsapp: b.b_number, s_country: b.b_country, s_course: b.b_course,
        s_accom: b.b_acco,
        s_rfees: cleanAmount(b.b_ramount),
        s_bfees: cleanAmount(b.b_balance),
        s_bid: String(b.b_id),
        s_month: getCourseMonths(b.b_month),
        s_year: getCourseYear(b.b_month),
        s_regdate: b.b_stime ?? "",
        s_welcome: "",
      };

      if (!row.s_month || !row.s_year) {
        shout(`SKIPPED -> ${b.b_name} (b_id ${b.b_id}): could not read dates from "${b.b_month}"`);
        failed++;
        continue;
      }

      if (DRY) { say(`would insert -> ${row.s_name} (b_id ${b.b_id}, ${row.s_month} ${row.s_year})`); continue; }

      try {
        const cols = Object.keys(row);
        await conn.execute(
          `INSERT INTO students (${cols.map((c) => `\`${c}\``).join(",")}) ` +
          `VALUES (${cols.map(() => "?").join(",")})`,
          cols.map((c) => row[c] ?? "")
        );
        inserted++;
        say(`Inserted -> ${row.s_name}`);
      } catch (e) {
        failed++;
        shout(`ERROR -> ${row.s_name} (b_id ${b.b_id}): ${e.message}`);
      }
    }

    console.log(DRY ? `Dry run: ${rows.length} would be inserted` : `Total Inserted: ${inserted}`);
    if (failed) shout(`${failed} row(s) failed`);
    return failed ? 1 : 0;
  } finally {
    if (held) await conn.query("SELECT RELEASE_LOCK(?)", [LOCK]).catch(() => {});
    await conn.end().catch(() => {});
  }
}

// Only run the job when this file is the thing being executed, so the parsers
// above can be imported by a test without the script connecting to anything.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main()
    .then((code) => process.exit(code))
    .catch((e) => { shout(`FATAL: ${e?.stack || e}`); process.exit(1); });
}
