-- Volunteer and yoga-teacher applications.
--
-- Run this once, in phpMyAdmin, against u511577297_adhiroha.
--
-- Until now these two forms did not reach a server at all: the page opened the
-- visitor's own mail client with the answers pasted into the body and asked
-- them to attach their photo and CV themselves. Anyone on a phone, or on
-- webmail with no mail client configured, simply fell out of the process, and
-- nothing was ever recorded. Now the form posts here and the row lands in this
-- table whether or not the notification email goes through.
--
-- The two application types share one table because they share most of their
-- questions; `type` says which form it came from, and the columns a given type
-- does not ask for are simply left NULL.

CREATE TABLE IF NOT EXISTS `applications` (
  `id`             INT(11)      NOT NULL AUTO_INCREMENT,
  -- 'volunteer' or 'teacher'.
  `type`           VARCHAR(16)  NOT NULL,

  -- Asked on both forms.
  `full_name`      VARCHAR(160) NOT NULL,
  `whatsapp`       VARCHAR(40)  NULL DEFAULT NULL,
  `email`          VARCHAR(191) NOT NULL,
  -- "Country" on the volunteer form, "Nationality" on the teacher one.
  `country`        VARCHAR(120) NULL DEFAULT NULL,
  -- Free text on the volunteer form, a number of years on the teacher one, so
  -- this stays TEXT rather than pretending to be an integer.
  `experience`     TEXT         NULL DEFAULT NULL,

  -- Volunteer only.
  `skills`         TEXT         NULL DEFAULT NULL,
  `available_from` DATE         NULL DEFAULT NULL,
  `duration`       VARCHAR(120) NULL DEFAULT NULL,

  -- Teacher only.
  `styles`         TEXT         NULL DEFAULT NULL,
  `certification`  TEXT         NULL DEFAULT NULL,
  `philosophy`     TEXT         NULL DEFAULT NULL,

  -- The photo and CV, kept in the row itself rather than on disk. Hostinger
  -- replaces the application directory on deploy, so an uploads folder there
  -- would lose every file the next time the site ships; a column is backed up
  -- with the rest of the database and survives.
  --
  -- Sizes are capped in the API route, not here: photo 2 MB, resume 4 MB. Those
  -- limits exist because MySQL refuses any single statement larger than
  -- max_allowed_packet, which on shared hosting is often only 4 or 16 MB.
  `photo_name`     VARCHAR(255) NULL DEFAULT NULL,
  `photo_type`     VARCHAR(100) NULL DEFAULT NULL,
  `photo`          LONGBLOB     NULL DEFAULT NULL,
  `resume_name`    VARCHAR(255) NULL DEFAULT NULL,
  `resume_type`    VARCHAR(100) NULL DEFAULT NULL,
  `resume`         LONGBLOB     NULL DEFAULT NULL,

  -- Which page it came from, and whether the notification email got out. A
  -- failed send must never lose the application, so it is recorded instead.
  `page_path`      VARCHAR(255) NULL DEFAULT NULL,
  `mail_sent`      TINYINT(1)   NOT NULL DEFAULT 0,
  -- 'new' until someone in the school moves it on.
  `status`         VARCHAR(24)  NOT NULL DEFAULT 'new',
  `created_at`     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  -- The only listing anyone wants: newest applications of one type.
  KEY `idx_type_created` (`type`, `created_at`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
