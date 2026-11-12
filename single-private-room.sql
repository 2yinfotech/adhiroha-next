-- =====================================================================
--  Sell the single private room on the website
--  Run once on u511577297_adhiroha, after room-occupancy.sql.
-- =====================================================================
--
--  The admission panel now offers Single Private next to triple and double
--  sharing for the 200, 300 and 500 hour courses. Until this runs, the room
--  is `bookable = 0` and the panel shows the single card as fully booked.
--
--  There is one single room, with capacity 1, so the same capacity and
--  gender rules as every other room apply: once one student has it for a
--  month, it closes for that month.
-- =====================================================================

UPDATE `rooms` SET `bookable` = 1 WHERE `sharing` = 'single';

-- Check: should list SINGLE PRIVATE with bookable = 1.
SELECT `id`, `name`, `sharing`, `capacity`, `active`, `bookable` FROM `rooms` WHERE `sharing` = 'single';
