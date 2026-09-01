# Prompt for building the room occupancy board in the admin panel

Copy everything below the line into the other AI. It is written to be handed
over cold — it assumes the reader has never seen this project.

---

I have a PHP admin panel at `admin.adhiroha.com` (Hostinger shared hosting,
`/home/u511577297/public_html/admin/`). It talks to a MySQL database called
`u511577297_adhiroha`. I want to add a **room occupancy board** to it.

## The business

Adhiroha is a yoga school in Rishikesh. Students come for a residential
teacher training and live on the ashram for the whole course.

- **13 rooms**: 8 triple (3 beds), 4 double (2 beds), 1 single private (1 bed).
- Courses run **the 1st to the 24th of a month**. A **200 hour** or **300 hour**
  student occupies their bed for **one month**. A **500 hour** student stays for
  **two consecutive months**.
- A room is **single-gender for a given month**. Whoever books first sets it: if
  a man is in NIYAMA in March, NIYAMA is closed to women for March. It can be a
  women's room again in April.
- The **single private room is not sold on the website**. It is given to
  walk-ins and as a favour, and is only ever filled by hand from this admin
  panel.

## The tables (already created — do not change their shape)

```sql
CREATE TABLE `rooms` (
  `id`         TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(64)      NOT NULL,               -- 'NIYAMA', 'SATYA', 'SINGLE PRIVATE'
  `sharing`    ENUM('single','double','triple') NOT NULL,
  `capacity`   TINYINT UNSIGNED NOT NULL,               -- 1, 2 or 3
  `sort_order` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `active`     TINYINT(1)       NOT NULL DEFAULT 1,     -- in use at all
  `bookable`   TINYINT(1)       NOT NULL DEFAULT 1,     -- offered on the website
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_rooms_name` (`name`)
) ENGINE=InnoDB;

CREATE TABLE `room_occupancy` (
  `id`           INT UNSIGNED      NOT NULL AUTO_INCREMENT,
  `room_id`      TINYINT UNSIGNED  NOT NULL,
  `stay_year`    SMALLINT UNSIGNED NOT NULL,            -- 2027
  `stay_month`   TINYINT UNSIGNED  NOT NULL,            -- 1-12
  `booking_id`   INT UNSIGNED      NOT NULL,            -- bookings.b_id
  `student_name` VARCHAR(160)      NOT NULL,
  `gender`       ENUM('male','female') NOT NULL,
  `course`       VARCHAR(64)       NOT NULL,            -- '200 Hour YTTC' etc.
  `created_at`   DATETIME          NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_seat` (`room_id`,`stay_year`,`stay_month`,`booking_id`),
  KEY `idx_month` (`stay_year`,`stay_month`),
  KEY `idx_booking` (`booking_id`),
  CONSTRAINT `fk_occ_room` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`)
) ENGINE=InnoDB;
```

**One row = one student, in one room, for one month.**

- A 200 or 300 hour booking has **one** row.
- A 500 hour booking has **two** rows, same `booking_id`, consecutive months.
- Existing bookings live in the `bookings` table, keyed by `b_id`. Useful
  columns there: `b_name`, `b_gender`, `b_course`, `b_acco`, `b_month`,
  `b_status`, `room_no`, `b_code`.

There are already `BEFORE INSERT` and `BEFORE UPDATE` triggers on
`room_occupancy` that raise `SQLSTATE 45000` if a move would break capacity or
the one-gender rule. **Do not remove them.** Your code should check the rules
before it writes so the user gets a friendly message, but expect the trigger to
fire anyway on a race and show its message rather than a stack trace.

There is also a helper view:

```sql
SELECT * FROM v_room_month WHERE stay_year = 2027 AND stay_month = 3;
```
giving `room_id, room, sharing, capacity, bookable, stay_year, stay_month,
occupied, free, held_by, students`.

## What I want you to build

### 1. The board

A page showing **one month at a time**, with previous/next month navigation and
a month picker. For the chosen month, show every active room as a card:

- room name, and whether it is triple / double / single;
- one slot per bed — `capacity` slots, filled ones showing the student's name
  and an M/F marker, empty ones shown as an empty slot;
- the room tinted by who holds it that month: one colour for men, another for
  women, neutral when empty;
- a clear marker on the single private room that it is not sold online;
- a small summary at the top: beds filled / total, and how many rooms are
  still free.

Sort rooms by `sort_order`.

### 2. Drag and drop

I want to move a student from one room to another by dragging their name from
one bed slot onto a free slot in another room.

Use the HTML5 drag-and-drop API or SortableJS — your call, but it must work
with a mouse on desktop. Touch support is a bonus, not a requirement.

On drop, before writing anything, check **all** of these and refuse with a
readable message if any fails:

1. The target room has a free bed **for every month of that booking**.
2. The target room is empty that month, or already holds the same gender.
3. The student is not already in the target room for that month.

Then write the move inside **one transaction**.

### 3. The rule that is easy to get wrong

**A 500 hour student has two rows, and both must move together.**

If you drag a 500 hour student in March, you are moving their March *and* their
April row. If the target room is free in March but full in April, the move must
be **refused entirely** — you must not move March and leave April behind, or the
student ends up in two different rooms mid-course.

So: look up every row with that `booking_id`, check the target room for every
one of their months, and update them all in one transaction, or none.

```sql
-- the months this student actually occupies
SELECT id, stay_year, stay_month FROM room_occupancy WHERE booking_id = ?;
```

### 4. Also useful, if it is not much more work

- **Add a student by hand**: pick an existing `bookings` row (search by name or
  `b_code`), pick a room, and it writes the right number of month rows for that
  booking's course. This is how the single private room gets filled.
- **Remove from a room**: delete every row for that `booking_id` (frees all
  their months at once), with a confirm.
- **A year view**: rooms down the side, twelve months across, each cell showing
  filled/total, so you can see the season at a glance.
- **Export the month to CSV**.

## How to build it

- Plain PHP + MySQLi or PDO, matching whatever the rest of the admin panel
  already uses — look at the existing files first and follow their pattern for
  the DB connection, the session/auth check and the page layout. Do not
  introduce a framework.
- **Use prepared statements everywhere.** No string-concatenated SQL.
- The drag-and-drop should post to a small JSON endpoint (e.g.
  `room_move.php`) that returns `{"ok":true}` or `{"ok":false,"message":"..."}`,
  and the page should show the message inline rather than reloading.
- Wrap the move in `START TRANSACTION` / `COMMIT`, with `SELECT ... FOR UPDATE`
  on the target room's `rooms` row first, so two people moving students at the
  same time cannot both take the last bed.
- Every page must keep the panel's existing login check. This shows students'
  names — it must not be reachable logged out.

## What not to do

- **Do not touch the `rooms_name` table.** It is the old bed-per-row table and
  something else still reads it. This feature uses `rooms` and
  `room_occupancy` only.
- Do not drop or alter the triggers.
- Do not change `bookings`. Read from it; the room truth lives in
  `room_occupancy`.
- Do not add a "force" or "override" button that skips the capacity or gender
  checks. If a room genuinely needs four people in it for one month, I will
  change that room's `capacity` instead.

## How I will test it

1. Open March, drag a student from ANUSHASANA to DHYANA — both should update.
2. Try dragging a woman into a room that already has a man that month — it must
   refuse, and say why.
3. Try dragging a 500 hour student into a room that is free this month but full
   next month — it must refuse and move nothing.
4. Fill a triple with three people, then try to drag a fourth in — refuse.
5. Reload the page — every move must still be there.
