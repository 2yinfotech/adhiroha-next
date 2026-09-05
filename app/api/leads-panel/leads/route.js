import { NextResponse } from "next/server";
import { requireUser } from "@/lib/crm/auth";
import { query, ORDER_BY_NEWEST, LEAD_DATE } from "@/lib/crm/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * The lead list behind the panel's main table, plus the counts on the header.
 *
 * Filtering and paging are done in SQL rather than by loading the table and
 * slicing it in the browser: the `leads` table already has thousands of rows
 * and will only grow.
 */
export async function GET(request) {
  try {
    await requireUser();
  } catch {
    return NextResponse.json({ ok: false, message: "Not signed in" }, { status: 401 });
  }

  const url = new URL(request.url);
  const search = (url.searchParams.get("q") || "").trim();
  const status = (url.searchParams.get("status") || "").trim();
  const page = Math.max(1, Number(url.searchParams.get("page") || 1));
  const perPage = Math.min(100, Math.max(10, Number(url.searchParams.get("per") || 50)));

  const where = [];
  const params = [];

  if (search) {
    where.push("(l.`l_name` LIKE ? OR l.`l_email` LIKE ? OR l.`l_phone` LIKE ? OR l.`l_country` LIKE ? OR l.`l_source` LIKE ?)");
    for (let i = 0; i < 5; i++) params.push(`%${search}%`);
  }
  if (status) {
    // "new" means the CRM has not enrolled it yet, which is a NULL join rather
    // than a status value.
    if (status === "new") where.push("s.`l_id` IS NULL");
    else { where.push("s.`status` = ?"); params.push(status); }
  }

  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const rows = await query(
    `SELECT l.\`l_id\`, l.\`l_name\`, l.\`l_email\`, l.\`l_phone\`, l.\`l_country\`,
            l.\`l_source\`, l.\`l_date\`, l.\`l_stage\`, l.\`l_message\`,
            s.\`status\` AS crm_status, s.\`step\`, s.\`next_due\`, s.\`replied_at\`,
            (SELECT COUNT(*) FROM \`crm_email_log\` e WHERE e.\`l_id\` = l.\`l_id\` AND e.\`status\` = 'sent') AS emails_sent
       FROM \`leads\` l
       LEFT JOIN \`crm_lead_state\` s ON s.\`l_id\` = l.\`l_id\`
       ${clause}
       ${ORDER_BY_NEWEST.replace(/`l_date`/, "l.`l_date`").replace(/`l_id`/, "l.`l_id`")}
       LIMIT ? OFFSET ?`,
    [...params, perPage, (page - 1) * perPage]
  );

  const [{ total }] = await query(
    `SELECT COUNT(*) AS total FROM \`leads\` l LEFT JOIN \`crm_lead_state\` s ON s.\`l_id\` = l.\`l_id\` ${clause}`,
    params
  );

  const counts = await query(
    `SELECT COALESCE(s.\`status\`,'new') AS status, COUNT(*) AS n
       FROM \`leads\` l LEFT JOIN \`crm_lead_state\` s ON s.\`l_id\` = l.\`l_id\`
      GROUP BY COALESCE(s.\`status\`,'new')`
  );

  const today = await query(
    `SELECT COUNT(*) AS n FROM \`leads\` WHERE ${LEAD_DATE} >= CURDATE()`
  );

  return NextResponse.json({
    ok: true,
    rows,
    total: Number(total),
    page,
    perPage,
    counts: Object.fromEntries(counts.map((c) => [c.status, Number(c.n)])),
    today: Number(today[0]?.n || 0),
  });
}
