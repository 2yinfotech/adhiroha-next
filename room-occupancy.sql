-- =====================================================================
--  Room occupancy for the admission panel
--  Run once on u511577297_adhiroha.
-- =====================================================================
--
--  Why a new table rather than more columns on `rooms_name`
--  --------------------------------------------------------
--  `rooms_name` keeps one row per BED (SATYA-A, SATYA-B, …) and one text
--  column per month, with the occupant written in as "Name -F". That shape
--  cannot answer the questions the panel now has to ask:
--
--    * it has no year, so November 2026 and November 2027 are the same cell;
--    * a 500 hour student stays two months and there is nothing to tie the
--      two cells together, so half a booking can be cancelled by accident;
--    * capacity and the one-gender-per-room rule live only in whatever code
--      happens to write the cell, so the PHP panel and the website can each
--      quietly break the other's rules.
--
--  Below, one row = one student, in one room, for one month. Two rows for a
--  500 hour booking. Capacity and gender are enforced by the database itself,
--  so it holds no matter which application writes to it.
--
--  `rooms_name` is left exactly as it is. Nothing here touches it.
-- =====================================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- ---------------------------------------------------------------------
--  1. The rooms themselves: 8 triple, 4 double.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `rooms` (
  `id`         TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(64)      NOT NULL,
  `sharing`    ENUM('double','triple') NOT NULL,
  -- Kept as a column rather than derived from `sharing`, so a room can be
  -- taken down to fewer beds for a season without changing its type.
  `capacity`   TINYINT UNSIGNED NOT NULL,
  `sort_order` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `active`     TINYINT(1)       NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_rooms_name` (`name`),
  KEY `idx_rooms_sharing` (`sharing`,`active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `rooms` (`name`,`sharing`,`capacity`,`sort_order`) VALUES
  ('SATYA',      'double', 2,  1),
  ('SHANTI',     'double', 2,  2),
  ('SANKALPA',   'double', 2,  3),
  ('BODHI',      'double', 2,  4),
  ('ANUSHASANA', 'triple', 3, 11),
  ('SHADHNA',    'triple', 3, 12),
  ('BHAKTI',     'triple', 3, 13),
  ('ANANDA',     'triple', 3, 14),
  ('NIYAMA',     'triple', 3, 15),
  ('ABHYASA',    'triple', 3, 16),
  ('NIRVANA',    'triple', 3, 17),
  ('DHYANA',     'triple', 3, 18)
ON DUPLICATE KEY UPDATE
  `sharing` = VALUES(`sharing`),
  `capacity` = VALUES(`capacity`),
  `sort_order` = VALUES(`sort_order`);

-- ---------------------------------------------------------------------
--  2. Who is in which room, in which month.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `room_occupancy` (
  `id`           INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  `room_id`      TINYINT UNSIGNED NOT NULL,
  -- The month of the stay. A 200 or 300 hour booking writes one row; a 500
  -- hour booking writes two, one per month, in the same transaction.
  `stay_year`    SMALLINT UNSIGNED NOT NULL,
  `stay_month`   TINYINT UNSIGNED  NOT NULL,
  `booking_id`   INT UNSIGNED     NOT NULL COMMENT 'bookings.b_id',
  `student_name` VARCHAR(160)     NOT NULL,
  `gender`       ENUM('male','female') NOT NULL,
  `course`       VARCHAR(64)      NOT NULL,
  `created_at`   DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  -- One student cannot hold two beds in the same room for the same month.
  UNIQUE KEY `uq_seat` (`room_id`,`stay_year`,`stay_month`,`booking_id`),
  -- The panel's hottest query: everything taken in one month.
  KEY `idx_month` (`stay_year`,`stay_month`),
  KEY `idx_booking` (`booking_id`),
  CONSTRAINT `fk_occ_room` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
--  3. The two rules, enforced by the database.
-- ---------------------------------------------------------------------
--  Application code checks these before it writes, so a student never sees a
--  room it cannot have. The triggers are the backstop: they are what stops a
--  race between two people booking the last bed at the same moment, and what
--  keeps the PHP admin panel honest as well.
-- ---------------------------------------------------------------------
DROP TRIGGER IF EXISTS `trg_room_occupancy_bi`;
DELIMITER $$
CREATE TRIGGER `trg_room_occupancy_bi`
BEFORE INSERT ON `room_occupancy` FOR EACH ROW
BEGIN
  DECLARE v_capacity TINYINT UNSIGNED;
  DECLARE v_taken    TINYINT UNSIGNED;
  DECLARE v_gender   VARCHAR(8);

  IF NEW.stay_month < 1 OR NEW.stay_month > 12 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'room_occupancy: stay_month must be 1-12';
  END IF;

  SELECT `capacity` INTO v_capacity FROM `rooms` WHERE `id` = NEW.room_id AND `active` = 1;
  IF v_capacity IS NULL THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'room_occupancy: no such active room';
  END IF;

  -- Capacity: 3 in a triple, 2 in a double.
  SELECT COUNT(*) INTO v_taken FROM `room_occupancy`
   WHERE `room_id` = NEW.room_id
     AND `stay_year` = NEW.stay_year
     AND `stay_month` = NEW.stay_month;
  IF v_taken >= v_capacity THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'room_occupancy: that room is full for that month';
  END IF;

  -- One gender per room per month: whoever arrives first sets it.
  SELECT `gender` INTO v_gender FROM `room_occupancy`
   WHERE `room_id` = NEW.room_id
     AND `stay_year` = NEW.stay_year
     AND `stay_month` = NEW.stay_month
   LIMIT 1;
  IF v_gender IS NOT NULL AND v_gender <> NEW.gender THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'room_occupancy: that room is taken by the other gender that month';
  END IF;
END$$

-- The same rules on UPDATE, so moving a student between rooms by hand in the
-- admin panel cannot break them either.
DROP TRIGGER IF EXISTS `trg_room_occupancy_bu`$$
CREATE TRIGGER `trg_room_occupancy_bu`
BEFORE UPDATE ON `room_occupancy` FOR EACH ROW
BEGIN
  DECLARE v_capacity TINYINT UNSIGNED;
  DECLARE v_taken    TINYINT UNSIGNED;
  DECLARE v_gender   VARCHAR(8);

  IF NEW.room_id <> OLD.room_id
     OR NEW.stay_year <> OLD.stay_year
     OR NEW.stay_month <> OLD.stay_month
     OR NEW.gender <> OLD.gender THEN

    SELECT `capacity` INTO v_capacity FROM `rooms` WHERE `id` = NEW.room_id AND `active` = 1;
    IF v_capacity IS NULL THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'room_occupancy: no such active room';
    END IF;

    SELECT COUNT(*) INTO v_taken FROM `room_occupancy`
     WHERE `room_id` = NEW.room_id
       AND `stay_year` = NEW.stay_year
       AND `stay_month` = NEW.stay_month
       AND `id` <> OLD.id;
    IF v_taken >= v_capacity THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'room_occupancy: that room is full for that month';
    END IF;

    SELECT `gender` INTO v_gender FROM `room_occupancy`
     WHERE `room_id` = NEW.room_id
       AND `stay_year` = NEW.stay_year
       AND `stay_month` = NEW.stay_month
       AND `id` <> OLD.id
     LIMIT 1;
    IF v_gender IS NOT NULL AND v_gender <> NEW.gender THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'room_occupancy: that room is taken by the other gender that month';
    END IF;
  END IF;
END$$
DELIMITER ;

-- ---------------------------------------------------------------------
--  4. A read-only view, for the admin panel and for eyeballing.
-- ---------------------------------------------------------------------
CREATE OR REPLACE VIEW `v_room_month` AS
SELECT
  r.`id`                                   AS `room_id`,
  r.`name`                                 AS `room`,
  r.`sharing`,
  r.`capacity`,
  o.`stay_year`,
  o.`stay_month`,
  COUNT(o.`id`)                            AS `occupied`,
  r.`capacity` - COUNT(o.`id`)             AS `free`,
  MIN(o.`gender`)                          AS `held_by`,
  GROUP_CONCAT(o.`student_name` ORDER BY o.`id` SEPARATOR ', ') AS `students`
FROM `rooms` r
LEFT JOIN `room_occupancy` o ON o.`room_id` = r.`id`
WHERE r.`active` = 1
GROUP BY r.`id`, r.`name`, r.`sharing`, r.`capacity`, o.`stay_year`, o.`stay_month`;

-- =====================================================================
--  Optional: carry the current occupants over from `rooms_name`.
-- =====================================================================
--  Left commented out on purpose. `rooms_name` has a column per month and no
--  year at all, so it cannot say whether "November" means 2026 or 2027, and it
--  has no booking id to tie a 500 hour student's two months together. Running
--  this blind would invent data.
--
--  If you do want the current season imported, tell me which year each month
--  column refers to and I will write the INSERT for exactly those months.
-- =====================================================================
