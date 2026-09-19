import "server-only";
import { openPool, siteDbConfig } from "@/lib/db-config";
import { MONTHS, ROOM_TRACKED_COURSES } from "@/lib/admission-fees";

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
      // Two words, on a room the student cannot have. "Full" on a room that is
      // actually held by the other gender would just be untrue, so the two
      // cases stay apart.
      reason: available
        ? ""
        : !r.active ? "Not in use"
        : otherGender ? (heldBy === "male" ? "Men only" : "Women only")
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

/**
 * Which room a group should be given.
 *
 * Pure, like roomBoard above, and for the same reason: this is the rule that
 * decides where somebody sleeps, so it should be readable and testable without
 * a database in front of it. reserveRoomForGroup calls it inside a transaction
 * with the candidate rooms locked.
 *
 * `candidates`  rooms of the wanted sharing type, in the order the school lists
 *               them ({ id, name, capacity })
 * `held`        room_occupancy rows for those rooms across `months`, with this
 *               group's own rows already removed
 * `groupSize`   how many beds are needed, together, in the same room
 *
 * First fit wins, in the school's own order, so the same rooms fill first and
 * the allocation is predictable rather than scattered. A room is only offered
 * when every month of the stay has space and nobody of the other gender is in
 * it — one full month closes the room for a 500 hour stay.
 */
export function pickRoom({ candidates, held, months, gender, groupSize }) {
  const at = new Map();
  for (const h of held) {
    const k = `${h.room_id}:${h.stay_year}:${h.stay_month}`;
    const cur = at.get(k) || { count: 0, gender: null };
    cur.count += 1;
    cur.gender = cur.gender || h.gender;
    at.set(k, cur);
  }

  let why = null;
  for (const room of candidates) {
    let fits = true;
    for (const m of months) {
      const cur = at.get(`${room.id}:${m.year}:${m.month}`) || { count: 0, gender: null };
      if (cur.gender && cur.gender !== gender) { fits = false; why = why || "gender_locked"; break; }
      if (cur.count + groupSize > room.capacity) { fits = false; why = why || "room_full"; break; }
    }
    if (fits) return { room, why: null };
  }
  return { room: null, why: why || "room_full" };
}

/* ── the database ───────────────────────────────────────────────────── */

let _pool = null;
async function pool() {
  if (_pool) return _pool;
  _pool = await openPool("rooms", siteDbConfig());
  return _pool;
}

/**
 * The rooms the admission panel may offer.
 *
 * `bookable = 0` rooms exist in the table and can be filled by hand from the
 * admin panel — the single private room is given out on walk-ins and as a
 * favour — but they are never shown on the website. Pass { all: true } to see
 * everything, which is what an occupancy board wants.
 */
export async function listRooms({ all = false } = {}) {
  const [rows] = await (await pool()).query(
    "SELECT `id`,`name`,`sharing`,`capacity`,`active`,`bookable` FROM `rooms` " +
    (all ? "" : "WHERE `bookable` = 1 ") +
    "ORDER BY `sort_order`, `name`"
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
 * A booking can be up to three students and they share one room, so the beds
 * have to be taken together: two of three succeeding would leave one person in
 * a room the others are not in.
 *
 * The room is normally chosen here rather than by the student. Pass `sharing`
 * and the first free room of that type is taken; pass `roomId` to name one
 * instead, which is what an admin filling a room by hand needs. Choosing inside
 * the transaction, with the candidate rooms locked, is the whole point: picking
 * on the client and sending the id back leaves a gap in which someone else can
 * take the last bed, and the student only finds out at the end.
 *
 * Any beds this group already holds for these months are released first, in the
 * same transaction. Without that, a group that went back and changed sharing
 * type would keep its old bed as well as the new one — the unique key is on
 * (room, year, month, booking), so nothing stopped the same booking holding a
 * bed in two rooms at once. Re-running for the same booking ids is therefore
 * safe, and lands them in the same room again unless it has filled up.
 */
export async function reserveRoomForGroup({ roomId = null, sharing = "", course, year, month, students }) {
  const months = stayMonths(course, year, month);
  if (!months.length) return { ok: false, error: "bad_month" };
  if (!students?.length) return { ok: false, error: "no_students" };
  if (!roomId && !sharing) return { ok: false, error: "no_room_or_sharing" };

  const gender = students[0].gender;
  // Men and women are never put in the same room, so a group that is not all
  // one gender cannot be placed at all — whichever room were chosen.
  if (students.some((s) => s.gender !== gender)) return { ok: false, error: "mixed_group" };

  const conn = await (await pool()).getConnection();
  try {
    await conn.beginTransaction();

    // Lock the rooms in play: the named one, or every room of this sharing type.
    const [candidates] = roomId
      ? await conn.query(
          "SELECT `id`,`name`,`capacity` FROM `rooms` WHERE `id` = ? AND `active` = 1 FOR UPDATE", [roomId])
      : await conn.query(
          "SELECT `id`,`name`,`capacity` FROM `rooms` " +
          "WHERE `sharing` = ? AND `active` = 1 AND `bookable` = 1 ORDER BY `sort_order`,`name` FOR UPDATE",
          [sharing]);

    if (!candidates.length) { await conn.rollback(); return { ok: false, error: "no_such_room" }; }

    const bookingIds = students.map((s) => s.bookingId);

    // Release whatever this group is already holding for these months, so its
    // own beds neither block it nor survive a move to a different room.
    for (const m of months) {
      await conn.query(
        "DELETE FROM `room_occupancy` WHERE `stay_year` = ? AND `stay_month` = ? AND `booking_id` IN (?)",
        [m.year, m.month, bookingIds]
      );
    }

    // Who else is in these rooms, in every month of the stay.
    const ids = candidates.map((r) => r.id);
    const where = months.map(() => "(`stay_year` = ? AND `stay_month` = ?)").join(" OR ");
    const [held] = await conn.query(
      "SELECT `room_id`,`stay_year`,`stay_month`,`gender` FROM `room_occupancy` " +
      "WHERE `room_id` IN (?) AND (" + where + ")",
      [ids, ...months.flatMap((m) => [m.year, m.month])]
    );

    const { room: chosen, why } = pickRoom({
      candidates, held, months, gender, groupSize: students.length,
    });

    if (!chosen) {
      await conn.rollback();
      return { ok: false, error: roomId ? (why || "room_full") : "none_free", month: monthLabel(months[0]) };
    }

    for (const m of months) {
      for (const s of students) {
        await conn.query(
          "INSERT INTO `room_occupancy` (`room_id`,`stay_year`,`stay_month`,`booking_id`,`student_name`,`gender`,`course`) " +
          "VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE `student_name` = VALUES(`student_name`)",
          [chosen.id, m.year, m.month, s.bookingId, s.name, s.gender, course]
        );
      }
    }

    await conn.commit();
    return { ok: true, roomId: chosen.id, room: chosen.name, months: months.map(monthLabel) };
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

/**
 * Give a confirmed booking its room.
 *
 * Called once the payment is in and `b_status` is confirmed — never before.
 * Beds used to be held at the end of step 2, which meant every abandoned
 * registration sat on a bed nobody was ever going to sleep in, with nothing to
 * expire it. Rooms filled up with people who had not paid.
 *
 * The cost of waiting is real and worth naming: two people can now pay for the
 * last bed in the same minute, and the second will not get a room. That is why
 * this returns the failure rather than throwing it — a paid booking must always
 * be confirmed, and the ashram is told in its notification so a room can be
 * sorted by hand. Better an occasional phone call than a wing of empty rooms
 * held by registrations that never completed.
 */
export async function allocateConfirmedRoom({ course, batch, sharing, bookingIds, students }) {
  if (!ROOM_TRACKED_COURSES.includes(course)) return { ok: false, error: "not_tracked" };
  if (!sharing || !batch?.month || !bookingIds?.length) return { ok: false, error: "missing_details" };

  const people = bookingIds
    .map((bookingId, i) => ({
      bookingId,
      name: students?.[i]?.name || "",
      gender: String(students?.[i]?.gender || "").toLowerCase(),
    }))
    .filter((p) => p.bookingId);
  if (!people.length) return { ok: false, error: "no_students" };

  return reserveRoomForGroup({
    sharing, course, year: batch.year, month: batch.month, students: people,
  }).catch((e) => ({ ok: false, error: String(e?.message || e) }));
}
