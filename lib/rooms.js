import "server-only";
import { openPool, siteDbConfig } from "@/lib/db-config";
import { MONTHS } from "@/lib/admission-fees";

/**
 * Room availability and room booking, against `rooms` / `room_occupancy`.
 * The schema and its triggers are in room-occupancy.sql.
 *
 * The rules, in one place:
 *
 *   - a triple room holds 3 people, a double holds 2;
 *   - a room is single-gender for a given month — whoever books first sets it;
 *   - a 200 or 300 hour stay occupies one month, a 500 hour stay occupies two
 *     consecutive months, and a 500 booking only fits a room that is free for
 *     both of them.
 *
 * Everything that decides *what a student may pick* is a pure function over
 * rows, so it can be reasoned about and tested without a database in front of
 * it. Only the three functions at the bottom talk to MySQL.
 */

/* ── months ─────────────────────────────────────────────────────────── */

export const MONTH_NUMBER = Object.fromEntries(MONTHS.map((m, i) => [m.toLowerCase(), i + 1]));

/** How many calendar months a course occupies. */
export const monthSpan = (course) => (String(course).startsWith("500") ? 2 : 1);

/**
 * The months a stay covers, as {year, month} pairs.
 *
 * A 500 hour course runs across two months, so December 2026 rolls into
 * January 2027 rather than month 13.
 */
export function stayMonths(course, year, month) {
  const start = typeof month === "number" ? month : MONTH_NUMBER[String(month).toLowerCase()];
  const y = Number(year);
  if (!start || !y) return [];
  const out = [];
  for (let i = 0; i < monthSpan(course); i++) {
    const m0 = start - 1 + i;
    out.push({ year: y + Math.floor(m0 / 12), month: (m0 % 12) + 1 });
  }
  return out;
}

export const monthLabel = ({ year, month }) => `${MONTHS[month - 1]} ${year}`;

/* ── availability, as a pure function ───────────────────────────────── */

/**
 * Work out what a student of this gender may book.
 *
 * `rooms`      rows from `rooms`
 * `occupancy`  rows from `room_occupancy` covering exactly `months`
 * `months`     the {year, month} pairs this stay needs, from stayMonths()
 *
 * A room is offered only when every month of the stay has a free bed and none
 * of those months is already held by the other gender.
 */
export function roomBoard({ rooms, occupancy, months, gender }) {
  const key = (roomId, y, m) => `${roomId}:${y}:${m}`;
  const taken = new Map();          // key -> { count, gender }
  for (const o of occupancy) {
    const k = key(o.room_id, o.stay_year, o.stay_month);
    const cur = taken.get(k) || { count: 0, gender: null };
    cur.count += 1;
    cur.gender = cur.gender || o.gender;
    taken.set(k, cur);
  }

  return rooms.map((r) => {
    let free = r.capacity;
    let heldBy = null;
    let blockedMonth = null;

    for (const { year, month } of months) {
      const cur = taken.get(key(r.id, year, month)) || { count: 0, gender: null };
      // The tightest month is the one that decides: a 500 hour student needs
      // the same bed in both, so one full month closes the room.
      free = Math.min(free, r.capacity - cur.count);
      if (cur.gender) {
        heldBy = cur.gender;
        if (cur.gender !== gender && !blockedMonth) blockedMonth = { year, month };
      }
    }

    const otherGender = heldBy && heldBy !== gender;
    const available = !!r.active && free > 0 && !otherGender;

    return {
      id: r.id,
      name: r.name,
      sharing: r.sharing,
      capacity: r.capacity,
      free: Math.max(0, free),
      heldBy,
      available,
      reason: available
        ? ""
        : !r.active ? "Not in use"
        : otherGender ? (heldBy === "male" ? "Men's room this month" : "Women's room this month")
        : "Full",
      blockedMonth: blockedMonth ? monthLabel(blockedMonth) : "",
    };
  });
}

/** Roll the per-room board up into the two sharing choices the panel shows. */
export function sharingFromBoard(board) {
  const open = (kind) => board.filter((r) => r.sharing === kind && r.available);
  return {
    double: { open: open("double").length, beds: open("double").reduce((n, r) => n + r.free, 0) },
    triple: { open: open("triple").length, beds: open("triple").reduce((n, r) => n + r.free, 0) },
  };
}

/* ── the database ───────────────────────────────────────────────────── */

let _pool = null;
async function pool() {
  if (_pool) return _pool;
  _pool = await openPool("rooms", siteDbConfig());
  return _pool;
}

export async function listRooms() {
  const [rows] = await (await pool()).query(
    "SELECT `id`,`name`,`sharing`,`capacity`,`active` FROM `rooms` ORDER BY `sort_order`, `name`"
  );
  return rows;
}

/**
 * Everything the panel needs for one course, month and gender: the months the
 * stay covers, each room's status, and the two sharing totals.
 */
export async function getRoomBoard({ course, year, month, gender }) {
  const months = stayMonths(course, year, month);
  if (!months.length || !["male", "female"].includes(gender)) {
    return { months: [], rooms: [], sharing: { double: { open: 0, beds: 0 }, triple: { open: 0, beds: 0 } } };
  }

  const rooms = await listRooms();
  const where = months.map(() => "(`stay_year` = ? AND `stay_month` = ?)").join(" OR ");
  const args = months.flatMap((m) => [m.year, m.month]);
  const [occupancy] = await (await pool()).query(
    "SELECT `room_id`,`stay_year`,`stay_month`,`gender` FROM `room_occupancy` WHERE " + where,
    args
  );

  const board = roomBoard({ rooms, occupancy, months, gender });
  return {
    months: months.map((m) => ({ ...m, label: monthLabel(m) })),
    rooms: board,
    sharing: sharingFromBoard(board),
  };
}

/**
 * Put one student in one room for the whole stay.
 *
 * Everything happens in a single transaction, and the room's row in `rooms` is
 * locked first: two people pressing pay on the last bed at the same moment
 * would otherwise both read "one free" and both be let in. A 500 hour booking
 * writes two rows, so if the second month is gone the first is rolled back too
 * and the student is never left holding half a stay.
 *
 * The triggers in room-occupancy.sql check the same rules again. That is
 * deliberate: this is not the only application that writes to the table.
 */
export async function assignRoom({ roomId, course, year, month, bookingId, studentName, gender }) {
  const months = stayMonths(course, year, month);
  if (!months.length) return { ok: false, error: "bad_month" };
  if (!["male", "female"].includes(gender)) return { ok: false, error: "bad_gender" };

  const conn = await (await pool()).getConnection();
  try {
    await conn.beginTransaction();
    const [[room]] = await conn.query(
      "SELECT `id`,`capacity`,`active` FROM `rooms` WHERE `id` = ? FOR UPDATE", [roomId]
    );
    if (!room || !room.active) { await conn.rollback(); return { ok: false, error: "no_such_room" }; }

    for (const m of months) {
      const [taken] = await conn.query(
        "SELECT `gender` FROM `room_occupancy` WHERE `room_id` = ? AND `stay_year` = ? AND `stay_month` = ?",
        [roomId, m.year, m.month]
      );
      if (taken.length >= room.capacity) {
        await conn.rollback();
        return { ok: false, error: "room_full", month: monthLabel(m) };
      }
      if (taken.length && taken[0].gender !== gender) {
        await conn.rollback();
        return { ok: false, error: "gender_locked", month: monthLabel(m), heldBy: taken[0].gender };
      }
      await conn.query(
        "INSERT INTO `room_occupancy` (`room_id`,`stay_year`,`stay_month`,`booking_id`,`student_name`,`gender`,`course`) " +
        "VALUES (?,?,?,?,?,?,?)",
        [roomId, m.year, m.month, bookingId, studentName, gender, course]
      );
    }

    await conn.commit();
    return { ok: true, months: months.map(monthLabel) };
  } catch (e) {
    await conn.rollback().catch(() => {});
    // The triggers raise SQLSTATE 45000 with a readable message; surface it
    // rather than a generic failure, because it says exactly what went wrong.
    return { ok: false, error: e?.sqlState === "45000" ? e.message : String(e?.message || e) };
  } finally {
    conn.release();
  }
}

/**
 * Put a whole group in one room, in one transaction.
 *
 * A booking can be up to three students and they share the room they picked,
 * so the beds have to be taken together: two of three succeeding would leave
 * one person in a room the others are not in. Re-running it for the same
 * booking ids is safe — the unique key on (room, year, month, booking) means a
 * repeat is ignored rather than double-booked, which matters because the panel
 * calls this again whenever someone steps back and forward.
 */
export async function reserveRoomForGroup({ roomId, course, year, month, students }) {
  const months = stayMonths(course, year, month);
  if (!months.length) return { ok: false, error: "bad_month" };
  if (!students?.length) return { ok: false, error: "no_students" };

  const conn = await (await pool()).getConnection();
  try {
    await conn.beginTransaction();
    const [[room]] = await conn.query(
      "SELECT `id`,`name`,`capacity`,`active` FROM `rooms` WHERE `id` = ? FOR UPDATE", [roomId]
    );
    if (!room || !room.active) { await conn.rollback(); return { ok: false, error: "no_such_room" }; }

    const bookingIds = students.map((s) => s.bookingId);
    for (const m of months) {
      // Everyone already in the room for this month, minus this group's own
      // rows, so stepping back and forward does not count them twice.
      const [held] = await conn.query(
        "SELECT `booking_id`,`gender` FROM `room_occupancy` " +
        "WHERE `room_id` = ? AND `stay_year` = ? AND `stay_month` = ?",
        [roomId, m.year, m.month]
      );
      const others = held.filter((h) => !bookingIds.includes(h.booking_id));
      if (others.length + students.length > room.capacity) {
        await conn.rollback();
        return { ok: false, error: "room_full", room: room.name, month: monthLabel(m) };
      }
      const clash = others.find((h) => h.gender !== students[0].gender)
        || students.find((s) => s.gender !== students[0].gender);
      if (clash) {
        await conn.rollback();
        return { ok: false, error: "gender_locked", room: room.name, month: monthLabel(m) };
      }
      for (const s of students) {
        await conn.query(
          "INSERT INTO `room_occupancy` (`room_id`,`stay_year`,`stay_month`,`booking_id`,`student_name`,`gender`,`course`) " +
          "VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE `student_name` = VALUES(`student_name`)",
          [roomId, m.year, m.month, s.bookingId, s.name, s.gender, course]
        );
      }
    }

    await conn.commit();
    return { ok: true, room: room.name, months: months.map(monthLabel) };
  } catch (e) {
    await conn.rollback().catch(() => {});
    return { ok: false, error: e?.sqlState === "45000" ? e.message : String(e?.message || e) };
  } finally {
    conn.release();
  }
}

/** Release every bed a booking holds — used when a booking is cancelled. */
export async function releaseBooking(bookingId) {
  const [res] = await (await pool()).query(
    "DELETE FROM `room_occupancy` WHERE `booking_id` = ?", [bookingId]
  );
  return { ok: true, released: res.affectedRows };
}
