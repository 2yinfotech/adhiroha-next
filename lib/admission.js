// Server-only data layer for the student admission panel.
// Reads batch dates + room availability from the live MySQL database and saves
// bookings — the Next.js replacement for the old PHP panel. Uses the same DB as
// the blog articles (env: DB_HOST/DB_PORT/DB_USER/DB_PASSWORD/DB_NAME). Set
// ARTICLES_SOURCE=sqlfile to read batches from the bundled SQL dump for local dev.

const USE_SQL_FILE = process.env.ARTICLES_SOURCE === "sqlfile";

/* ---------- Course catalogue (from the old panel) ---------- */
// Registration deposit paid now (EUR); the balance is settled at the ashram.
export const COURSES = {
  "200 Hour YTTC": { label: "200 Hour Yoga Teacher Training", reg: 300, from: 1275, table: "rishikeshttc", type: "200" },
  "300 Hour YTTC": { label: "300 Hour Yoga Teacher Training", reg: 500, from: 1500, table: "rishikeshttc", type: "300" },
  "500 Hour YTTC": { label: "500 Hour Yoga Teacher Training", reg: 750, from: 2700, table: "rishikeshttc", type: "500" },
  "Sound Healing": { label: "Sound Healing Teacher Training", reg: 300, from: 510, table: "sound_healing_rishikesh" },
  "Yoga Retreat": { label: "Yoga & Ayurveda Wellness Retreat", reg: 300, from: 510, table: "yoga_retreats" },
};

const DOUBLE_ROOMS = ["SATYA", "SHANTI", "SANKALPA", "BODHI"];
const TRIPLE_ROOMS = ["ANUSHASANA", "SHADHNA", "BHAKTI", "ANANDA", "NIYAMA", "ABHYASA", "NIRVANA", "DHYANA"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

/* ---------- MySQL pool ---------- */
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

/* ---------- Date helpers ---------- */
function ordinal(n) {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
// Match full or 3-letter month names (dates are pre-formatted, e.g.
// "1st July 2026" or "1st Sep 2026").
const MONTH_RE = new RegExp("(" + MONTHS.map((m) => m.slice(0, 3)).join("|") + ")[a-z]*", "i");
// Batch dates in the DB are stored pre-formatted. Handle that, and fall back to
// a real SQL date if a column ever holds one.
function normDate(d) {
  const s = String(d == null ? "" : d).trim();
  const mm = s.match(MONTH_RE);
  const yy = s.match(/(20\d{2})/);
  if (mm) {
    const abbr = mm[1].slice(0, 3).toLowerCase();
    const month = MONTHS.find((m) => m.slice(0, 3).toLowerCase() === abbr) || "";
    return { display: s, month, year: yy ? yy[1] : "" };
  }
  const dt = new Date(s);
  if (!isNaN(dt))
    return {
      display: `${ordinal(dt.getUTCDate())} ${dt.toLocaleString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" })}`,
      month: MONTHS[dt.getUTCMonth()],
      year: String(dt.getUTCFullYear()),
    };
  return { display: s, month: "", year: "" };
}

/* ============================================================
   Batches
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
      : "SELECT t_id,t_sdate,t_cdate,b_status,t_month FROM `" + c.table + "` ORDER BY t_id";
    [rows] = await pool.query(sql, c.type ? [c.type] : []);
  }
  return rows.map((r) => {
    const s = normDate(r.t_sdate), c = normDate(r.t_cdate);
    return {
      id: r.t_id,
      month: s.month,
      monthYear: (s.month + " " + s.year).trim(),
      start_date: s.display,
      date_range: s.display + " – " + c.display,
      status: r.b_status || r.t_month || "",
    };
  });
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

  // Special rule: triple sharing is only offered to males if a male already
  // occupies a triple room.
  if (gender === "male" && !TRIPLE_ROOMS.some((r) => withMales.has(r))) {
    tripleFull = true;
    available = available.filter((r) => DOUBLE_ROOMS.includes(r));
  }

  return { availableRooms: [...new Set(available)], doubleSharingBooked: doubleFull, tripleSharingBooked: tripleFull };
}

/* ============================================================
   Save a booking (INSERT into bookings)
   ============================================================ */
export async function saveBooking(d) {
  const cols = [
    "b_name","b_gender","b_country","b_number","b_email","b_course","b_acco","b_ramount",
    "b_balance","b_city","b_month","bmonth_y","room_no","b_code","b_location","b_status",
    "b_stime","b_mail","a_paid","p_method","r_no","b_remarks","b_reg","b_source","c_form","c_name","b_ref_code",
  ];
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");
  const row = {
    b_name: d.name || "", b_gender: d.gender || "", b_country: d.country || "", b_number: d.number || "",
    b_email: d.email || "", b_course: d.course || "", b_acco: d.acco || "Triple Sharing",
    b_ramount: Number(d.ramount) || 0, b_balance: Number(d.balance) || 0, b_city: d.city || "",
    b_month: d.month || "", bmonth_y: d.monthYear || "N/A", room_no: d.room || "N/A", b_code: d.code || "",
    b_location: d.location || "Rishikesh", b_status: d.status || "pending", b_stime: now, b_mail: "1",
    a_paid: d.paid != null ? Number(d.paid) : null, p_method: d.method || "N/A", r_no: d.receipt || "N/A",
    b_remarks: d.remarks || "N/A", b_reg: d.reg || "N/A", b_source: "website",
    c_form: "Not-Uploaded", c_name: "", b_ref_code: d.refCode || "",
  };
  if (USE_SQL_FILE) return { id: 0, dryRun: true }; // no writes in local dev
  const pool = await getPool();
  const placeholders = cols.map(() => "?").join(",");
  const [res] = await pool.query(
    "INSERT INTO bookings (" + cols.join(",") + ") VALUES (" + placeholders + ")",
    cols.map((c) => row[c])
  );
  return { id: res.insertId };
}

// Mark a saved booking as paid after payment is verified.
export async function markBookingPaid(id, { paid, method, receipt, status = "confirmed" }) {
  if (USE_SQL_FILE || !id) return { ok: true, dryRun: true };
  const pool = await getPool();
  await pool.query(
    "UPDATE bookings SET a_paid=?, p_method=?, r_no=?, b_status=? WHERE b_id=?",
    [Number(paid) || 0, method || "N/A", receipt || "N/A", status, id]
  );
  return { ok: true };
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
  // column list
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
