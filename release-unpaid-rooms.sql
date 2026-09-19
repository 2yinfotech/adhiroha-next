-- Release beds held by bookings that were never confirmed.
--
-- Run this ONCE, after deploying the change that moved room allocation from
-- the start of registration to the moment a booking is confirmed.
--
-- Why it is needed: beds used to be held at the end of step 2, before any
-- money changed hands, and nothing ever expired them. Every abandoned
-- registration is still sitting on a bed. Those rows will not clear
-- themselves — the new code simply stops adding more of them.
--
-- ---------------------------------------------------------------------------
-- STEP 1. Look before you delete.
--
-- Run this on its own first and read the output. It lists every bed that the
-- delete below would free, with the status of the booking holding it.
-- ---------------------------------------------------------------------------
SELECT
  o.`id`            AS occupancy_id,
  r.`name`          AS room,
  o.`stay_year`, o.`stay_month`,
  o.`student_name`,
  o.`booking_id`,
  COALESCE(b.`b_status`, '(no such booking)') AS booking_status
FROM `room_occupancy` o
LEFT JOIN `rooms`    r ON r.`id`  = o.`room_id`
LEFT JOIN `bookings` b ON b.`b_id` = o.`booking_id`
WHERE b.`b_id` IS NULL
   OR b.`b_status` <> 'confirmed'
ORDER BY o.`stay_year`, o.`stay_month`, r.`name`;

-- ---------------------------------------------------------------------------
-- STEP 2. Only once step 1 looks right.
--
-- READ THIS FIRST: the rule below is "anything not 'confirmed' loses its bed".
-- If the PHP admin panel writes some other status for a real, paid student —
-- or if someone was placed in a room by hand for a walk-in — those rows appear
-- in step 1 too, and this would free their beds as well. Check the
-- booking_status column above for any value you recognise as legitimate and
-- add it to the NOT IN list before running this.
-- ---------------------------------------------------------------------------
-- DELETE o
-- FROM `room_occupancy` o
-- LEFT JOIN `bookings` b ON b.`b_id` = o.`booking_id`
-- WHERE b.`b_id` IS NULL
--    OR b.`b_status` NOT IN ('confirmed');
