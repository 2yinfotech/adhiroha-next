-- Leads panel logins — its own table.
--
-- Run this once, in phpMyAdmin, against u511577297_adhiroha.
--
-- Why a separate table: the panel used to sign people in against the PHP
-- admin's `admin` table, whose rows are a mix of plain text and one old bcrypt
-- hash. That made logging in unreliable and meant the panel could not be given
-- its own accounts without touching a table the PHP side also writes to.
-- `crm_users` is owned by the panel alone; nothing else reads or writes it.
--
-- Passwords are stored as scrypt hashes (`scrypt$<salt>$<key>`). You can also
-- just type a new password into the `password` column as plain text — the next
-- successful sign-in replaces it with a hash automatically, so a password can
-- be reset from phpMyAdmin without needing to hash anything by hand.

CREATE TABLE IF NOT EXISTS `crm_users` (
  `id`         INT(11)      NOT NULL AUTO_INCREMENT,
  -- What you type into the login box. Either this or `email` works.
  `username`   VARCHAR(64)  NOT NULL,
  `email`      VARCHAR(191) NULL DEFAULT NULL,
  -- `scrypt$salt$key`, or plain text (auto-upgraded on next sign-in).
  `password`   VARCHAR(255) NOT NULL,
  -- Shown in the panel's header. Falls back to `username` when empty.
  `full_name`  VARCHAR(120) NULL DEFAULT NULL,
  -- 0 disables the account without deleting it or its history.
  `is_active`  TINYINT(1)   NOT NULL DEFAULT 1,
  `last_login` DATETIME     NULL DEFAULT NULL,
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  -- Two people cannot claim the same login name or address.
  UNIQUE KEY `uniq_username` (`username`),
  UNIQUE KEY `uniq_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- The first account.
--
--   username : adhiroha
--   email    : info@adhiroha.com   (either one signs in)
--   password : Adhiroha@Leads2026
--
-- The hash below is that password, already scrypt-hashed — the plain password
-- is never stored. Change it after the first sign-in: put the new password
-- into the `password` column as plain text and sign in once.
--
-- Re-running this file is safe: an existing row is left exactly as it is, so a
-- password you have already changed is not reset back to the one above.
-- ---------------------------------------------------------------------------
INSERT INTO `crm_users` (`username`, `email`, `password`, `full_name`, `is_active`)
VALUES (
  'adhiroha',
  'info@adhiroha.com',
  'scrypt$39beb57ddb7166501159e66d7aa8c085$4383bf836a312ef01e0a2ea07a5084c3e89fcaf86eb91eaa569be13c1e5987f9',
  'Adhiroha Admin',
  1
)
ON DUPLICATE KEY UPDATE `id` = `id`;
