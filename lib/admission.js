// Server-only data layer for the student admission panel.
//
// This is the Next.js port of the old PHP panel (_student-admission-panel):
// index.php (fee tables + wizard logic), get_batches.php, get_batch_details.php,
// get_room_availability.php and save_student.php. Fee numbers, the Sound Healing
// combo rules and the room-availability algorithm are carried over verbatim so
// the new panel quotes exactly what the old one quoted.
//
// Env: DB_HOST/DB_PORT/DB_USER/DB_PASSWORD/DB_NAME, SMTP_*.
// Set ARTICLES_SOURCE=sqlfile to read from the bundled SQL dump (local dev).

const USE_SQL_FILE = process.env.ARTICLES_SOURCE === "sqlfile";

// Re-export the shared catalogue so API routes can import everything admission-
// related from this one module (the tables themselves live in admission-fees.js
// because the browser bundle needs them too).
export * from "./admission-fees";
import {
  COURSES, COURSE_TYPE_MAP, FEES, computeFees, gatewayBreakdown,
  DOUBLE_ROOMS, TRIPLE_ROOMS, MONTHS,
} from "./admission-fees";

/* ============================================================
   MySQL pool
   ============================================================ */
let _pool = null;
async function getPool() {
  if (_pool) return _pool;
  const mysql = await import("mysql2/promise");
  _pool = mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
    charset: "utf8mb4",
  });
  return _pool;
}

/* ============================================================
   Date helpers
   ============================================================ */
function ordinal(n) {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
const MONTH_RE = new RegExp("(" + MONTHS.map((m) => m.slice(0, 3)).join("|") + ")[a-z]*", "i");

// Batch dates in the DB are stored pre-formatted (e.g. "1st July 2026"); fall
// back to parsing a real SQL date if a column ever holds one.
function normDate(d) {
  const s = String(d == null ? "" : d).trim();
  const mm = s.match(MONTH_RE);
  const yy = s.match(/(20\d{2})/);
  const dd = s.match(/^(\d{1,2})/);
  if (mm) {
    const abbr = mm[1].slice(0, 3).toLowerCase();
    const month = MONTHS.find((m) => m.slice(0, 3).toLowerCase() === abbr) || "";
    return { display: s, month, year: yy ? yy[1] : "", day: dd ? Number(dd[1]) : 0 };
  }
  const dt = new Date(s);
  if (!isNaN(dt)) {
    return {
      display: `${ordinal(dt.getUTCDate())} ${dt.toLocaleString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" })}`,
      month: MONTHS[dt.getUTCMonth()],
      year: String(dt.getUTCFullYear()),
      day: dt.getUTCDate(),
    };
  }
  return { display: s, month: "", year: "", day: 0 };
}

// Abbreviates a formatted date range for storage in `bookings.b_month`, matching
// formatDateRange() in the old index.php ("1st Jul 2026 - 24th Jul 2026"). The
// admin reports parse this shape, so the odd 4-letter "Sept" is kept verbatim.
const SHORT_MONTHS = {
  January: "Jan", February: "Feb", March: "Mar", April: "Apr",
  May: "May", June: "Jun", July: "Jul", August: "Aug",
  September: "Sept", October: "Oct", November: "Nov", December: "Dec",
};
export function shortDateRange(range) {
  if (!range) return "N/A";
  return range
    .split(" - ")
    .map((part) => {
      const p = part.trim().split(" ");
      if (p.length !== 3) return part.trim();
      const month = p[1].replace(/[^a-zA-Z]/g, "");
      return `${p[0]} ${SHORT_MONTHS[month] || month} ${p[2]}`;
    })
    .join(" - ");
}

/* ============================================================
   Batches (ported from get_batches.php)
   ============================================================ */
export async function getBatches(course) {
  const c = COURSES[course];
  if (!c) return [];
  let rows;
  if (USE_SQL_FILE) {
    rows = loadTable(c.table).filter((r) => (c.type ? r.t_type === c.type : true));
  } else {
    const pool = await getPool();
    const sql = c.type
      ? "SELECT t_id,t_sdate,t_cdate,b_status FROM `" + c.table + "` WHERE t_type=? ORDER BY t_id"
      : "SELECT t_id,t_sdate,t_cdate,t_month FROM `" + c.table + "` ORDER BY t_id";
    [rows] = await pool.query(sql, c.type ? [c.type] : []);
  }
  return rows.map((r) => {
    const s = normDate(r.t_sdate), e = normDate(r.t_cdate);
    return {
      id: r.t_id,
      month: s.month,
      year: s.year,
      day: s.day,
      monthYear: (s.month + " " + s.year).trim(),
      start_date: s.display,
      end_date: e.display,
      date_range: s.display + " - " + e.display,
      status: r.b_status || r.t_month || "",
      // Sound Healing batches starting on the 1st are priced a tier higher.
      isFirstBatch: s.day === 1,
    };
  });
}

// Picks the Sound Healing batch that pairs with a main-course batch.
// From fetchSoundHealingBatch() in index.php: same month/year as the main course
// start, except 300 Hour YTTC which pairs with the *previous* month.
export async function getComboSoundHealingBatch(mainCourse, mainBatch) {
  const batches = await getBatches("Sound Healing");
  if (!batches.length) return null;

  let targetMonth = mainBatch?.month ? MONTHS.indexOf(mainBatch.month) : -1;
  const targetYear = mainBatch?.year ? Number(mainBatch.year) : null;
  if (targetMonth >= 0 && COURSE_TYPE_MAP[mainCourse] === "300") targetMonth -= 1;

  let picked = null;
  if (targetMonth >= 0 && targetYear) {
    picked = batches.find(
      (b) => MONTHS.indexOf(b.month) === targetMonth && Number(b.year) === targetYear && b.status !== "sold"
    );
  }
  return picked || batches.find((b) => b.status !== "sold") || batches[0];
}

/* ============================================================
   Room availability (ported from get_room_availability.php)
   ============================================================ */
export async function getRoomAvailability(month, gender) {
  month = month ? month.charAt(0).toUpperCase() + month.slice(1).toLowerCase() : "";
  if (!MONTHS.includes(month) || !["male", "female"].includes(gender)) {
    return { availableRooms: [], doubleSharingBooked: true, tripleSharingBooked: true };
  }
  let rooms;
  if (USE_SQL_FILE) {
    rooms = loadTable("rooms_name").map((r) => ({ ro_name: r.ro_name, occupants: r[month] || "" }));
  } else {
    const pool = await getPool();
    const [rows] = await pool.query("SELECT ro_name, `" + month + "` AS occupants FROM rooms_name");
    rooms = rows;
  }

  const occupancy = {}, withMales = new Set(), withFemales = new Set();
  for (const row of rooms) {
    const base = String(row.ro_name).replace(/-[A-Z]$/, "");
    const students = row.occupants ? String(row.occupants).split(",") : [];
    occupancy[base] = (occupancy[base] || 0) + students.length;
    for (const s of students) {
      if (s.includes("-M")) withMales.add(base);
      if (s.includes("-F")) withFemales.add(base);
    }
  }

  let available = [];
  for (const room of [...new Set([...DOUBLE_ROOMS, ...TRIPLE_ROOMS])]) {
    const count = occupancy[room] || 0;
    if (gender === "male" && withFemales.has(room)) continue;
    if (gender === "female" && withMales.has(room)) continue;
    if (DOUBLE_ROOMS.includes(room) && count < 2) available.push(room);
    if (TRIPLE_ROOMS.includes(room) && count < 3) available.push(room);
  }

  let doubleFull = !available.some((r) => DOUBLE_ROOMS.includes(r));
  let tripleFull = !available.some((r) => TRIPLE_ROOMS.includes(r));

  // Special rule from the PHP: triple sharing is only offered to males once a
  // male already occupies a triple room.
  if (gender === "male" && !TRIPLE_ROOMS.some((r) => withMales.has(r))) {
    tripleFull = true;
    available = available.filter((r) => DOUBLE_ROOMS.includes(r));
  }

  return { availableRooms: [...new Set(available)], doubleSharingBooked: doubleFull, tripleSharingBooked: tripleFull };
}

/* ============================================================
   Booking codes
   ============================================================ */
// 11-char alphanumeric code, same shape as generateStudentCode() in index.php.
export function generateStudentCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < 11; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
  return out;
}

/* ============================================================
   Save a booking (ported from save_student.php)
   ============================================================
   Every column in `bookings` is NOT NULL with no default, so all of them are
   written explicitly — the PHP used the string "n/a" for unknowns and we keep
   that so existing admin reports keep parsing.
*/
const BOOKING_COLS = [
  "b_name","b_gender","b_country","b_number","b_email","b_course","b_acco","b_ramount",
  "b_balance","b_city","b_month","bmonth_y","room_no","b_code","b_location","b_status",
  "b_stime","b_mail","a_paid","p_method","r_no","b_remarks","b_reg","b_inv","b_check_inv",
  "b_source","c_form","c_name","b_ref_code",
];

function nowStamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

export async function saveBooking(d) {
  const row = {
    b_name: d.name || "",
    b_gender: d.gender || "",
    b_country: d.country || "",
    b_number: d.number || "",
    b_email: d.email || "",
    b_course: d.course || "",
    b_acco: d.acco || "Triple Sharing",
    b_ramount: String(d.ramount ?? 0),
    b_balance: String(d.balance ?? 0),
    b_city: d.city || "",
    b_month: d.month || "",
    bmonth_y: d.monthYear || "N/A",
    room_no: d.room || "N/A",
    b_code: d.code || generateStudentCode(),
    b_location: d.location || "Rishikesh",
    b_status: d.status || "pending",
    b_stime: nowStamp(),
    b_mail: "1",
    a_paid: d.paid != null ? String(d.paid) : "n/a",
    p_method: d.method || "n/a",
    r_no: d.receipt || "n/a",
    b_remarks: d.remarks || "n/a",
    b_reg: d.reg || "n/a",
    b_inv: "0",
    b_check_inv: "0",
    b_source: d.source || "website",
    c_form: "Not-Uploaded",
    c_name: "",
    b_ref_code: d.refCode || "",
  };
  if (USE_SQL_FILE) return { id: 0, code: row.b_code, dryRun: true }; // no writes in local dev
  const pool = await getPool();
  const [res] = await pool.query(
    "INSERT INTO bookings (" + BOOKING_COLS.join(",") + ") VALUES (" + BOOKING_COLS.map(() => "?").join(",") + ")",
    BOOKING_COLS.map((c) => row[c])
  );
  return { id: res.insertId, code: row.b_code };
}

// Update the accommodation and amounts on rows that were saved before the
// student had chosen a room. Bookings are now written at the end of step 1, so
// the sharing type and the per-student split only become known on step 2.
// `students` is optional and positional — students[i] patches ids[i], so a typo
// corrected by stepping back through the wizard reaches the saved row too.
export async function updateBookingSelection(ids, { acco, room, ramount, balance, remarks, students = [] }) {
  const list = (Array.isArray(ids) ? ids : [ids]).filter(Boolean);
  if (USE_SQL_FILE || !list.length) return { ok: true, dryRun: true };

  const shared = [];
  const sharedVals = [];
  if (acco) { shared.push("b_acco=?"); sharedVals.push(acco); }
  if (room) { shared.push("room_no=?"); sharedVals.push(room); }
  if (ramount != null) { shared.push("b_ramount=?"); sharedVals.push(String(ramount)); }
  if (balance != null) { shared.push("b_balance=?"); sharedVals.push(String(balance)); }
  if (remarks) { shared.push("b_remarks=?"); sharedVals.push(remarks); }

  const pool = await getPool();
  const perRow = {
    b_name: "name", b_gender: "gender", b_email: "email", b_number: "number",
    b_country: "country", b_city: "city", b_source: "source", b_ref_code: "refCode",
  };

  for (const [i, id] of list.entries()) {
    const sets = [...shared];
    const vals = [...sharedVals];
    const s = students[i];
    if (s) {
      for (const [col, key] of Object.entries(perRow)) {
        if (String(s[key] ?? "").trim()) { sets.push(`${col}=?`); vals.push(String(s[key]).trim()); }
      }
    }
    if (!sets.length) continue;
    await pool.query(`UPDATE bookings SET ${sets.join(",")} WHERE b_id=?`, [...vals, id]);
  }
  return { ok: true };
}

// Mark saved bookings as paid once a payment is verified.
export async function markBookingsPaid(ids, { paid, method, receipt, status = "confirmed", acco, room, balance }) {
  const list = (Array.isArray(ids) ? ids : [ids]).filter(Boolean);
  if (USE_SQL_FILE || !list.length) return { ok: true, dryRun: true };
  const pool = await getPool();
  const sets = ["a_paid=?", "p_method=?", "r_no=?", "b_status=?"];
  const vals = [String(paid ?? 0), method || "n/a", receipt || "n/a", status];
  if (acco) { sets.push("b_acco=?"); vals.push(acco); }
  if (room) { sets.push("room_no=?"); vals.push(room); }
  if (balance != null) { sets.push("b_balance=?"); vals.push(String(balance)); }
  await pool.query(
    `UPDATE bookings SET ${sets.join(",")} WHERE b_id IN (${list.map(() => "?").join(",")})`,
    [...vals, ...list]
  );
  return { ok: true };
}

/* ============================================================
   Notification email (ported from the PHPMailer block in save_student.php)
   ============================================================ */
const esc = (s) => String(s ?? "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));

export async function sendAdmissionMail({ students, course, batch, acco, room, fees, addOns = [], stage = "started" }) {
  const user = process.env.SMTP_USER || "info@adhiroha.com";
  const pass = process.env.SMTP_PASS;
  if (!pass) return { ok: false, error: "mail_not_configured" };

  const nodemailer = (await import("nodemailer")).default;
  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const lead = students[0] || {};
  const paid = stage === "paid";
  const subject = paid
    ? `${lead.name} — Registration PAID on adhiroha.com`
    : `${lead.name} Started Registration on adhiroha.com`;

  const rows = (pairs) =>
    pairs.map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#8a8078;white-space:nowrap"><b>${esc(k)}</b></td><td style="padding:6px 0">${esc(v)}</td></tr>`).join("");

  const studentTables = students
    .map(
      (s, i) => `
      <h3 style="font-family:sans-serif;color:#2c2723;margin:22px 0 6px">Student #${i + 1}</h3>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
        ${rows([
          ["Name", s.name], ["Gender", s.gender], ["Email", s.email], ["WhatsApp", s.number],
          ["Country", s.country], ["City", s.city], ["Heard via", s.source || "website"],
          ["Referral code", s.refCode || "—"], ["Booking code", s.code || "—"],
        ])}
      </table>`
    )
    .join("");

  const html = `
    <h2 style="font-family:sans-serif;color:#2c2723">${esc(paid ? "Registration paid" : "New registration started")} on adhiroha.com</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows([
        ["Course", course + (addOns?.length ? " + " + addOns.join(" + ") : "")],
        ["Batch", batch?.date_range || "—"],
        ["Accommodation", acco + (room && room !== "N/A" ? ` — ${room}` : "")],
        ["Students", String(students.length)],
        ["Total fees", `EUR ${fees?.total ?? "—"}`],
        ["Registration fee", `EUR ${fees?.reg ?? "—"}`],
        ["Balance on arrival", `EUR ${fees?.balance ?? "—"}`],
        ["Status", paid ? "PAID" : "Pending payment"],
      ])}
    </table>
    ${studentTables}`;

  try {
    await transporter.sendMail({
      from: `"Adhiroha Yoga Centre" <${user}>`,
      // Admission notifications go to the ops inbox, not the public info@ address.
      to: process.env.ADMISSION_NOTIFY_TO || "2yinfotech@gmail.com",
      replyTo: lead.email || user,
      subject,
      html,
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e?.message || e) };
  }
}

// Confirmation sent to the student once payment is verified.
export async function sendStudentConfirmation({ student, course, batch, acco, room, fees }) {
  const user = process.env.SMTP_USER || "info@adhiroha.com";
  const pass = process.env.SMTP_PASS;
  if (!pass || !student?.email) return { ok: false, error: "mail_not_configured" };

  const nodemailer = (await import("nodemailer")).default;
  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port, secure: port === 465, auth: { user, pass },
  });

  const html = `
    <div style="font-family:sans-serif;color:#2c2723;max-width:560px">
      <h2 style="color:#2c2723">Namaste ${esc(student.name)},</h2>
      <p style="font-size:15px;line-height:1.7;color:#6b6660">
        Your seat at Adhiroha Yoga Ashram is reserved. We have received your registration fee
        and look forward to welcoming you in Rishikesh.
      </p>
      <table style="font-size:14px;border-collapse:collapse;margin:18px 0">
        <tr><td style="padding:6px 14px 6px 0;color:#8a8078"><b>Booking code</b></td><td>${esc(student.code)}</td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#8a8078"><b>Course</b></td><td>${esc(course)}</td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#8a8078"><b>Dates</b></td><td>${esc(batch?.date_range || "—")}</td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#8a8078"><b>Accommodation</b></td><td>${esc(acco)}${room && room !== "N/A" ? " — " + esc(room) : ""}</td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#8a8078"><b>Registration paid</b></td><td>EUR ${esc(fees?.reg)}</td></tr>
        <tr><td style="padding:6px 14px 6px 0;color:#8a8078"><b>Balance on arrival</b></td><td>EUR ${esc(fees?.balance)}</td></tr>
      </table>
      <p style="font-size:14px;color:#6b6660">
        Questions? Just reply to this email or write to info@adhiroha.com.
      </p>
      <p style="font-size:14px;color:#6b6660">— Adhiroha Yoga Centre, Rishikesh</p>
    </div>`;

  try {
    await transporter.sendMail({
      from: `"Adhiroha Yoga Centre" <${user}>`,
      to: student.email,
      replyTo: user,
      subject: "Your seat at Adhiroha is confirmed",
      html,
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e?.message || e) };
  }
}

/* ============================================================
   SQL-dump fallback parser (dev only)
   ============================================================ */
let _dump = null;
function loadDump() {
  if (_dump) return _dump;
  const fs = require("fs");
  const path = require("path");
  _dump = fs.readFileSync(path.join(process.cwd(), "u511577297_adhiroha_clean.sql"), "utf8");
  return _dump;
}
const _tableCache = {};
function loadTable(name) {
  if (_tableCache[name]) return _tableCache[name];
  const sql = loadDump();
  const m = new RegExp("CREATE TABLE `" + name + "` \\(([\\s\\S]*?)\\n\\)").exec(sql);
  const cols = m ? [...m[1].matchAll(/`([a-zA-Z_]+)`/g)].map((x) => x[1]) : [];
  const out = [];
  const re = new RegExp("INSERT INTO `" + name + "` \\([^)]*\\) VALUES\\s*([\\s\\S]*?);\\s*\\n", "g");
  let ins;
  while ((ins = re.exec(sql)) !== null) {
    for (const tuple of splitValues(ins[1])) {
      const f = parseFields(tuple);
      const o = {};
      cols.forEach((c, i) => (o[c] = unquote(f[i])));
      out.push(o);
    }
  }
  _tableCache[name] = out;
  return out;
}
function splitValues(s) {
  const rows = []; let d = 0, cur = "", q = false, e = false;
  for (let i = 0; i < s.length; i++) { const c = s[i];
    if (q) { cur += c; if (e) e = false; else if (c === "\\") e = true; else if (c === "'") q = false; }
    else if (c === "'") { q = true; cur += c; }
    else if (c === "(") { if (d === 0) cur = ""; else cur += c; d++; }
    else if (c === ")") { d--; if (d === 0) rows.push(cur); else cur += c; }
    else if (d > 0) cur += c;
  }
  return rows;
}
function parseFields(row) {
  const f = []; let cur = "", q = false, e = false;
  for (const c of row) {
    if (q) { cur += c; if (e) e = false; else if (c === "\\") e = true; else if (c === "'") q = false; }
    else if (c === "'") { q = true; cur += c; }
    else if (c === ",") { f.push(cur); cur = ""; }
    else cur += c;
  }
  f.push(cur); return f;
}
function unquote(x) {
  if (x == null) return null;
  x = x.trim();
  if (x === "NULL") return null;
  if (x.startsWith("'") && x.endsWith("'")) x = x.slice(1, -1);
  return x.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\r/g, "").replace(/\\\\/g, "\\");
}
