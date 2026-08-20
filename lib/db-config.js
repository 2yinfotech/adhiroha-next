/**
 * One place that decides which MySQL server the app talks to.
 *
 * Three parts of the site read the database — the blog (`lib/articles.js`), the
 * admission panel (`lib/admission.js`) and the registration form
 * (`lib/registration.js`) — and each used to build its own connection config.
 * They are all pointed at the same database now, so the resolution lives here
 * and the failure message can name what it actually tried to reach.
 *
 * Two sets of variables are understood:
 *
 *   DB_HOST / DB_PORT / DB_USER / DB_PASSWORD / DB_NAME
 *   REG_DATABASE_HOST / REG_DB_PORT / REG_DB_USER / REG_DB_PASSWORD / REG_DB_NAME
 *
 * Setting either set alone is enough: whichever one is filled in is used. The
 * registration form prefers REG_*, everything else prefers DB_*, so the two can
 * still be split back onto separate databases later without a code change.
 */

// "localhost" can resolve to IPv6 "::1", which Hostinger's MySQL grants usually
// do not cover (Access denied for user …@'::1'). 127.0.0.1 matches the grant.
const DEFAULT_HOST = "127.0.0.1";

const pick = (...values) => values.find((v) => v != null && v !== "");

function resolve(preferReg) {
  const order = (site, reg) => (preferReg ? [reg, site] : [site, reg]);
  const e = process.env;
  return {
    host: pick(...order(e.DB_HOST, e.REG_DATABASE_HOST)) || DEFAULT_HOST,
    port: Number(pick(...order(e.DB_PORT, e.REG_DB_PORT))) || 3306,
    user: pick(...order(e.DB_USER, e.REG_DB_USER)),
    password: pick(...order(e.DB_PASSWORD, e.REG_DB_PASSWORD)),
    database: pick(...order(e.DB_NAME, e.REG_DB_NAME)),
  };
}

/**
 * Connection settings for the site's own data (blog, admission panel).
 * Prefers DB_*, falls back to REG_* when only that set is configured.
 */
export const siteDbConfig = () => resolve(false);

/**
 * Connection settings for the registration form. Prefers REG_*, so it can be
 * pointed at a different database from the rest of the site if that is ever
 * needed again.
 */
export const registrationDbConfig = () => resolve(true);

/** Pool options shared by all three callers. */
export const POOL_OPTIONS = {
  waitForConnections: true,
  connectionLimit: 5,
  charset: "utf8mb4",
};

/**
 * "u511577297_adhiroha at 127.0.0.1:3306" — safe to log and to show in a health
 * check. Never includes the password.
 */
export const describe = (cfg) =>
  `${cfg.database || "(no database set)"} at ${cfg.host}:${cfg.port} as ${cfg.user || "(no user set)"}`;

/**
 * Build a pool and prove it can actually reach the server.
 *
 * `createPool` never connects, so a wrong host or a database name that does not
 * exist only surfaces later as a raw ECONNREFUSED or ER_BAD_DB_ERROR inside
 * whatever page happened to query first. One `SELECT 1` up front turns that into
 * a log line naming the database it tried, which is the whole diagnosis. A pool
 * that fails the check is not returned, so the next request tries again instead
 * of reusing something built with bad credentials.
 */
export async function openPool(label, cfg) {
  const mysql = await import("mysql2/promise");
  const pool = mysql.createPool({ ...cfg, ...POOL_OPTIONS });
  try {
    await pool.query("SELECT 1");
  } catch (e) {
    await pool.end().catch(() => {});
    console.error(`[${label}] cannot reach ${describe(cfg)}: ${e.code || ""} ${e.message}`);
    throw e;
  }
  return pool;
}
