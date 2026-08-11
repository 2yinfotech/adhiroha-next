import "server-only";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

/**
 * The post-booking registration form, ported from the old Registration.php.
 *
 * A student who has already booked gets a link carrying their booking id
 * (/registration/?view=123). The form pre-fills what the booking already knows,
 * collects the rest, writes one `registration` row, and marks the booking as
 * registered. Nothing on the public site links here; the link is sent by hand.
 *
 * Column names and stored values deliberately match the PHP version so the
 * existing admin panel keeps working against the same two tables.
 */

/**
 * This form talks to a different database from the rest of the site.
 *
 * The Next.js app runs on `u511577297_adhiroha_git` (articles, and the bookings
 * taken through the website's own admission panel). The PHP admin at
 * admin.adhiroha.com runs on `u511577297_adhiroha`, and that is where the
 * bookings this form belongs to live, so both the lookup and the insert have to
 * go there and not to the site's own database.
 *
 * Configured through REG_DB_*, falling back to the site's DB_* only so local
 * development works without a second set of credentials. On the server the
 * REG_DB_* values must be set, or this form would read the wrong bookings.
 */
let _pool = null;
async function getPool() {
  if (_pool) return _pool;
  const mysql = await import("mysql2/promise");
  _pool = mysql.createPool({
    host: process.env.REG_DB_HOST || process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.REG_DB_PORT || process.env.DB_PORT) || 3306,
    user: process.env.REG_DB_USER || process.env.DB_USER,
    password: process.env.REG_DB_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.REG_DB_NAME || process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
    charset: "utf8mb4",
  });
  return _pool;
}

/** Which database this form is actually pointed at, for the health check. */
export const registrationDbName = () => process.env.REG_DB_NAME || process.env.DB_NAME || "(unset)";

/* ---------------------------------------------------------------- uploads */

/**
 * Where the ID and visa scans land.
 *
 * On Hostinger this account holds two separate applications:
 *
 *   /home/u511577297/nodejs/       this Next.js app, serving adhiroha.com
 *   /home/u511577297/public_html/  the PHP admin, which reads the documents
 *
 * They do not share a working directory, so a relative path would drop the
 * files somewhere the admin panel never looks. The absolute path is the default
 * and the environment variable is only needed for local development.
 */
const HOSTINGER_UPLOAD_DIR = "/home/u511577297/public_html/admin/documents";

export const UPLOAD_DIR = process.env.REGISTRATION_UPLOAD_DIR || HOSTINGER_UPLOAD_DIR;

const ALLOWED_EXT = ["jpg", "jpeg", "png", "pdf", "webp"];
const ALLOWED_MIME = [
  "image/jpeg", "image/png", "image/webp", "application/pdf",
];
// The PHP had no size cap at all. 10 MB is generous for a passport scan and
// stops a single upload filling the disk.
const MAX_BYTES = 10 * 1024 * 1024;

export function describeUploadRules() {
  return { extensions: ALLOWED_EXT, maxBytes: MAX_BYTES };
}

/**
 * Saves one uploaded file and returns the stored filename.
 *
 * Keeps the PHP's `IDP_<booking>_<timestamp>` prefix so documents from both
 * systems sort together and anything matching on that prefix still works, but
 * appends a random token: `IDP_12_1765432100_a3f9c2d1e7b40518.pdf`.
 *
 * The reason is that admin.adhiroha.com serves this directory. Directory
 * listing is off, but individual files are not access-controlled, so a file is
 * readable by anyone who can work out its URL. The PHP name was a sequential
 * booking id plus a unix timestamp, which is guessable; 16 hex characters is
 * not. The admin panel is unaffected because it reads the filename out of the
 * database rather than reconstructing it.
 */
export async function saveUpload(file, prefix, bookingId) {
  if (!file || typeof file.arrayBuffer !== "function" || !file.size) {
    throw new Error(`Please attach the ${prefix === "VISA" ? "visa" : "ID"} document.`);
  }
  if (file.size > MAX_BYTES) {
    throw new Error(`That file is larger than ${Math.round(MAX_BYTES / 1024 / 1024)} MB. Please attach a smaller scan.`);
  }
  const ext = (file.name.split(".").pop() || "").toLowerCase();
  if (!ALLOWED_EXT.includes(ext) || (file.type && !ALLOWED_MIME.includes(file.type))) {
    throw new Error("Only PDF, JPG, PNG or WEBP files are accepted.");
  }

  const token = crypto.randomBytes(8).toString("hex");
  const filename = `${prefix}_${bookingId}_${Math.floor(Date.now() / 1000)}_${token}.${ext}`;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, filename), Buffer.from(await file.arrayBuffer()));
  return filename;
}

/* ---------------------------------------------------------------- reading */

// Only the columns the form actually needs. `b_reg` tells us whether this
// booking has already been through the form.
const BOOKING_FIELDS =
  "b_id,b_name,b_gender,b_country,b_number,b_email,b_course,b_acco,b_city,b_month,b_code,b_location,b_status,b_reg,c_name";

/**
 * Returns the booking, or null when the id is simply not in the table.
 *
 * A database that cannot be reached throws instead of returning null. The two
 * used to be indistinguishable, so a wrong host or password showed the student
 * "we could not find that booking" and there was no way to tell the difference
 * from the outside.
 */
export async function getBooking(bookingId) {
  const id = Number.parseInt(bookingId, 10);
  if (!Number.isInteger(id) || id <= 0) return null;
  try {
    const pool = await getPool();
    const [rows] = await pool.query(
      `SELECT ${BOOKING_FIELDS} FROM bookings WHERE b_id = ? LIMIT 1`,
      [id],
    );
    return rows[0] || null;
  } catch (e) {
    // Reset the pool so the next request retries the connection rather than
    // reusing a pool that was built with bad credentials.
    _pool = null;
    console.error(
      `[registration] database "${registrationDbName()}" at ` +
      `${process.env.REG_DB_HOST || process.env.DB_HOST || "127.0.0.1"} is unreachable: ` +
      `${e.code || ""} ${e.message}`,
    );
    const err = new Error("REGISTRATION_DB_UNREACHABLE");
    err.cause = e;
    throw err;
  }
}

/* ---------------------------------------------------------------- writing */

const REG_COLS = [
  "r_name", "r_email", "r_insta", "r_dob", "r_whatsapp", "r_country", "r_gender",
  "r_idp", "r_visa", "r_ename", "r_econtact", "r_relation", "r_hour",
  "f_destination", "f_date", "f_time", "f_number", "f_airline", "r_ac",
];

/**
 * Writes the registration and updates the booking, in one transaction.
 *
 * The PHP did these as three separate unguarded statements, so a failure between
 * them left a registration row with the booking still showing unregistered.
 */
export async function saveRegistration(bookingId, values) {
  const id = Number.parseInt(bookingId, 10);
  const pool = await getPool();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [res] = await conn.query(
      `INSERT INTO registration (${REG_COLS.join(",")}) VALUES (${REG_COLS.map(() => "?").join(",")})`,
      REG_COLS.map((c) => values[c] ?? ""),
    );
    // The certificate name lives on the booking so the admin panel can print
    // from one place, and b_reg is what marks the form as done.
    await conn.query("UPDATE bookings SET c_name = ?, b_reg = 'submited' WHERE b_id = ?", [
      values.r_name, id,
    ]);
    await conn.commit();
    return { ok: true, registrationId: res.insertId };
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

/* ---------------------------------------------------------------- courses */

/**
 * The values stored in `registration.r_hour`, kept identical to the PHP so old
 * and new rows read the same in the admin panel.
 *
 * The retreat is discontinued and is not offered here, but a booking made
 * before it closed still has to be able to submit this form, so whatever course
 * the booking carries is always included as an option.
 */
export const COURSE_OPTIONS = [
  { value: "200", label: "200 Hour YTTC" },
  { value: "300", label: "300 Hour YTTC" },
  { value: "500", label: "500 Hour YTTC" },
  { value: "Sound Healing TTC", label: "Sound Healing TTC" },
  { value: "Sadhana Immersion", label: "Sadhana Immersion Programme" },
  { value: "Hatha", label: "Hatha & Yin YTTC" },
  { value: "Ashtanga", label: "Ashtanga & Vinyasa YTTC" },
  { value: "Pranayama", label: "Pranayama & Meditation YTTC" },
];

// bookings.b_course uses long labels; registration.r_hour uses these short ones.
const COURSE_FROM_BOOKING = {
  "200 Hour YTTC": "200",
  "300 Hour YTTC": "300",
  "500 Hour YTTC": "500",
  "Sound Healing": "Sound Healing TTC",
  "Sound Healing TTC": "Sound Healing TTC",
  "Sadhana Immersion": "Sadhana Immersion",
  Hatha: "Hatha",
  Ashtanga: "Ashtanga",
  Pranayama: "Pranayama",
};

export function courseOptionsFor(bCourse) {
  const selected = COURSE_FROM_BOOKING[bCourse] || bCourse || "";
  const known = COURSE_OPTIONS.some((o) => o.value === selected);
  const options = known || !selected
    ? COURSE_OPTIONS
    : [...COURSE_OPTIONS, { value: selected, label: selected }];
  return { options, selected };
}

/** The old form asked for a passport from everyone outside India. */
export const isIndian = (country) => String(country || "").trim().toLowerCase() === "india";
