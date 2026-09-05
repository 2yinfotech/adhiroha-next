-- Leads CRM — the two tables the panel adds.
--
-- Run this once, in phpMyAdmin, against u511577297_adhiroha.
--
-- Nothing here touches `leads`. That table is shared with the existing PHP admin
-- panel, so the CRM reads it and writes only the columns that were always meant
-- to be edited (l_stage, lead_note, follow_date). Everything the follow-up
-- engine needs to remember lives in its own tables, keyed by l_id, so the two
-- systems cannot corrupt each other and this can be dropped without touching a
-- single lead.

-- ---------------------------------------------------------------------------
-- Where each lead is in its follow-up sequence.
-- One row per lead, created the moment the sequence starts.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `crm_lead_state` (
  `l_id`         INT(11)      NOT NULL,
  -- How many sequence emails have gone out. 0 = none yet, 4 = finished.
  `step`         TINYINT      NOT NULL DEFAULT 0,
  -- When the next one is due. NULL once the sequence is over or stopped.
  `next_due`     DATETIME     NULL DEFAULT NULL,
  -- active   : sequence running
  -- replied  : they answered, so it stopped itself
  -- stopped  : a human stopped it from the panel
  -- done     : all four sent, nobody replied
  -- bounced  : the address does not accept mail
  `status`       VARCHAR(16)  NOT NULL DEFAULT 'active',
  `replied_at`   DATETIME     NULL DEFAULT NULL,
  -- The message that told us they replied, for the timeline.
  `reply_snippet` VARCHAR(500) NULL DEFAULT NULL,
  `last_error`   VARCHAR(500) NULL DEFAULT NULL,
  `created_at`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`l_id`),
  -- The cron's only query is "what is due now", so it gets the index.
  KEY `idx_due` (`status`, `next_due`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Every email the panel sends, sequence or hand-written.
-- Append-only: this is the audit trail behind each lead's timeline, and the
-- record that stops a sequence email being sent twice.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `crm_email_log` (
  `id`         INT(11)      NOT NULL AUTO_INCREMENT,
  `l_id`       INT(11)      NOT NULL,
  -- 1-4 for a sequence email, 0 for one typed by a human in the panel.
  `step`       TINYINT      NOT NULL DEFAULT 0,
  `to_email`   VARCHAR(255) NOT NULL,
  `subject`    VARCHAR(500) NOT NULL,
  `body`       MEDIUMTEXT   NULL,
  -- sent | failed
  `status`     VARCHAR(16)  NOT NULL DEFAULT 'sent',
  `error`      VARCHAR(500) NULL DEFAULT NULL,
  `message_id` VARCHAR(255) NULL DEFAULT NULL,
  `sent_by`    VARCHAR(64)  NOT NULL DEFAULT 'system',
  `sent_at`    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- The step number, but only for a sequence email that actually went out.
  -- NULL for hand-written mail and for failures — and because MySQL lets NULLs
  -- repeat inside a UNIQUE index, that is what allows many manual emails to the
  -- same lead while still making it impossible for sequence step N to be sent
  -- to the same lead twice. A cron that retries after a crash cannot double-send.
  `seq_key`    TINYINT      AS (IF(`step` > 0 AND `status` = 'sent', `step`, NULL)) STORED,
  PRIMARY KEY (`id`),
  KEY `idx_lead` (`l_id`, `sent_at`),
  UNIQUE KEY `uq_lead_seq` (`l_id`, `seq_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
