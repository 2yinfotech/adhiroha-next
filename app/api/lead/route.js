import { NextResponse } from "next/server";
import { siteDbConfig, openPool } from "@/lib/db-config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Lead capture for the paid landing pages — the replacement for save_lead.php.
 *
 * It writes one row to the same `leads` table the old PHP endpoint wrote to and
 * the CRM already reads, with the same columns, so a lead captured here appears
 * in the admin panel's pipeline exactly like one captured before. That table is
 * all `varchar` (dates included), which is why the values below are formatted
 * strings rather than real dates: matching the existing rows matters more than
 * the column types being right, and changing the schema would break the panel.
 *
 * The response shape is `{ success, message }` because that is what the page's
 * form handler already checks for.
 */

const COLUMNS = [
  "l_name", "last_name", "l_email", "l_phone", "l_message", "l_country",
  "l_code", "l_source", "l_date", "follow_date", "lead_note", "l_codes",
  "l_stage", "l_pdf", "c_date", "l_location", "sent_date",
];

// The in-flight promise is cached, not the resolved pool: two enquiries landing
// at the same moment on a cold route would otherwise each open their own pool.
// Cleared on failure so a database that was briefly down is retried.
let poolPromise = null;
function getPool() {
  if (!poolPromise) {
    poolPromise = openPool("leads", siteDbConfig()).catch((err) => {
      poolPromise = null;
      throw err;
    });
  }
  return poolPromise;
}

const str = (v, max) => String(v ?? "").trim().slice(0, max);

// dd-mm-yyyy and dd-mm-yyyy HH:MM:SS in IST, the format already in the table.
function istNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  }).formatToParts(new Date());
  const g = (t) => parts.find((p) => p.type === t)?.value || "";
  const date = `${g("day")}-${g("month")}-${g("year")}`;
  return { date, dateTime: `${date} ${g("hour")}:${g("minute")}:${g("second")}` };
}

function randomCode(len = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));

  const name = str(body.l_name, 255);
  const email = str(body.l_email, 255);

  if (!name || !email) {
    return NextResponse.json(
      { success: false, message: "Please enter your name and email." },
      { status: 400 }
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const { date, dateTime } = istNow();

  // Every field the client may send is re-derived or bounded here. The dates,
  // the code and the stage in particular are set server-side: a lead's own
  // browser must not be able to decide when it arrived or what stage it is in.
  const row = {
    l_name: name,
    last_name: str(body.last_name, 255),
    l_email: email,
    l_phone: str(body.l_phone, 255),
    l_message: str(body.l_message, 5000),
    l_country: str(body.l_country, 255) || "Not Available",
    l_code: randomCode(),
    l_source: str(body.l_source, 255) || "Website",
    l_date: dateTime,
    follow_date: "Not Available",
    lead_note: "Not Available",
    l_codes: "1",
    l_stage: "fresh",
    l_pdf: "pending",
    c_date: date,
    l_location: str(body.l_location, 255) || "Rishikesh",
    sent_date: null,
  };

  try {
    const db = await getPool();
    await db.query(
      `INSERT INTO \`leads\` (${COLUMNS.map((c) => `\`${c}\``).join(",")})
       VALUES (${COLUMNS.map(() => "?").join(",")})`,
      COLUMNS.map((c) => row[c])
    );
    return NextResponse.json({ success: true, message: "Submitted Successfully!" });
  } catch (err) {
    // The visitor must never see a stack trace, and must never be told their
    // enquiry was saved when it was not.
    console.error("lead insert failed:", err?.message || err);
    return NextResponse.json(
      { success: false, message: "Could not save your enquiry. Please try again or email info@adhiroha.com." },
      { status: 500 }
    );
  }
}
