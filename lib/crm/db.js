import { siteDbConfig, openPool } from "@/lib/db-config";

/**
 * The CRM's database access.
 *
 * One pool for the whole panel, opened lazily and cached as a promise so two
 * simultaneous requests on a cold route cannot open two pools. Cleared on
 * failure so a database that was briefly down is retried rather than the route
 * staying broken until the next deploy.
 */
let poolPromise = null;

export function pool() {
  if (!poolPromise) {
    poolPromise = openPool("crm", siteDbConfig()).catch((err) => {
      poolPromise = null;
      throw err;
    });
  }
  return poolPromise;
}

export async function query(sql, params = []) {
  const db = await pool();
  const [rows] = await db.query(sql, params);
  return rows;
}

export async function one(sql, params = []) {
  const rows = await query(sql, params);
  return rows[0] || null;
}

/** MySQL DATETIME, in the server's own clock. */
export function mysqlDateTime(d = new Date()) {
  const p = (n) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ` +
    `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
  );
}

/**
 * `leads.l_date` is a varchar holding dd-mm-yyyy HH:MM:SS, which sorts
 * alphabetically into nonsense. Every list and chart in the panel needs real
 * chronological order, so the ordering is done on a parsed value rather than on
 * the string — and `l_id` breaks the tie, since it is the only strictly
 * increasing column the table has.
 */
export const ORDER_BY_NEWEST =
  "ORDER BY STR_TO_DATE(`l_date`, '%d-%m-%Y %H:%i:%s') DESC, `l_id` DESC";

/** The same parse, for use inside a WHERE clause. */
export const LEAD_DATE = "STR_TO_DATE(`l_date`, '%d-%m-%Y %H:%i:%s')";
