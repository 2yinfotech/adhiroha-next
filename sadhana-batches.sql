-- Yoga Retreat is discontinued. Its batch table is reused for the Sadhana
-- Immersion Programme, which now occupies that slot in the admission panel.
-- Batches run the 1st to the 14th and the 15th to the 28th of each month,
-- so February needs no special case and no batch ever lands on a 29th-31st.
--
-- Fees are the published Sadhana rates: triple 699, double 900 (EUR).
-- as_date is kept equal to t_sdate, which is the convention the existing
-- rows in this table already used.
--
-- Run as one transaction. The backup table is made first, so if anything
-- looks wrong afterwards the old rows can be put straight back:
--   INSERT INTO yoga_retreats SELECT * FROM yoga_retreats_backup_20260810;

START TRANSACTION;

CREATE TABLE IF NOT EXISTS `yoga_retreats_backup_20260810` LIKE `yoga_retreats`;
INSERT INTO `yoga_retreats_backup_20260810` SELECT * FROM `yoga_retreats`;

DELETE FROM `yoga_retreats`;
ALTER TABLE `yoga_retreats` AUTO_INCREMENT = 1;

INSERT INTO `yoga_retreats`
  (`t_sdate`, `as_date`, `t_cdate`, `t_triple`, `t_double`, `t_type`, `t_month`, `b_status`)
VALUES
  ('15th August 2026', '15th August 2026', '28th August 2026', '699', '900', 'Sadhana Immersion Programme', 'August', 'Register'),
  ('1st September 2026', '1st September 2026', '14th September 2026', '699', '900', 'Sadhana Immersion Programme', 'September', 'Register'),
  ('15th September 2026', '15th September 2026', '28th September 2026', '699', '900', 'Sadhana Immersion Programme', 'September', 'Register'),
  ('1st October 2026', '1st October 2026', '14th October 2026', '699', '900', 'Sadhana Immersion Programme', 'October', 'Register'),
  ('15th October 2026', '15th October 2026', '28th October 2026', '699', '900', 'Sadhana Immersion Programme', 'October', 'Register'),
  ('1st November 2026', '1st November 2026', '14th November 2026', '699', '900', 'Sadhana Immersion Programme', 'November', 'Register'),
  ('15th November 2026', '15th November 2026', '28th November 2026', '699', '900', 'Sadhana Immersion Programme', 'November', 'Register'),
  ('1st December 2026', '1st December 2026', '14th December 2026', '699', '900', 'Sadhana Immersion Programme', 'December', 'Register'),
  ('15th December 2026', '15th December 2026', '28th December 2026', '699', '900', 'Sadhana Immersion Programme', 'December', 'Register'),
  ('1st January 2027', '1st January 2027', '14th January 2027', '699', '900', 'Sadhana Immersion Programme', 'January', 'Register'),
  ('15th January 2027', '15th January 2027', '28th January 2027', '699', '900', 'Sadhana Immersion Programme', 'January', 'Register'),
  ('1st February 2027', '1st February 2027', '14th February 2027', '699', '900', 'Sadhana Immersion Programme', 'February', 'Register'),
  ('15th February 2027', '15th February 2027', '28th February 2027', '699', '900', 'Sadhana Immersion Programme', 'February', 'Register'),
  ('1st March 2027', '1st March 2027', '14th March 2027', '699', '900', 'Sadhana Immersion Programme', 'March', 'Register'),
  ('15th March 2027', '15th March 2027', '28th March 2027', '699', '900', 'Sadhana Immersion Programme', 'March', 'Register'),
  ('1st April 2027', '1st April 2027', '14th April 2027', '699', '900', 'Sadhana Immersion Programme', 'April', 'Register'),
  ('15th April 2027', '15th April 2027', '28th April 2027', '699', '900', 'Sadhana Immersion Programme', 'April', 'Register'),
  ('1st May 2027', '1st May 2027', '14th May 2027', '699', '900', 'Sadhana Immersion Programme', 'May', 'Register'),
  ('15th May 2027', '15th May 2027', '28th May 2027', '699', '900', 'Sadhana Immersion Programme', 'May', 'Register'),
  ('1st June 2027', '1st June 2027', '14th June 2027', '699', '900', 'Sadhana Immersion Programme', 'June', 'Register'),
  ('15th June 2027', '15th June 2027', '28th June 2027', '699', '900', 'Sadhana Immersion Programme', 'June', 'Register'),
  ('1st July 2027', '1st July 2027', '14th July 2027', '699', '900', 'Sadhana Immersion Programme', 'July', 'Register'),
  ('15th July 2027', '15th July 2027', '28th July 2027', '699', '900', 'Sadhana Immersion Programme', 'July', 'Register'),
  ('1st August 2027', '1st August 2027', '14th August 2027', '699', '900', 'Sadhana Immersion Programme', 'August', 'Register'),
  ('15th August 2027', '15th August 2027', '28th August 2027', '699', '900', 'Sadhana Immersion Programme', 'August', 'Register'),
  ('1st September 2027', '1st September 2027', '14th September 2027', '699', '900', 'Sadhana Immersion Programme', 'September', 'Register'),
  ('15th September 2027', '15th September 2027', '28th September 2027', '699', '900', 'Sadhana Immersion Programme', 'September', 'Register'),
  ('1st October 2027', '1st October 2027', '14th October 2027', '699', '900', 'Sadhana Immersion Programme', 'October', 'Register'),
  ('15th October 2027', '15th October 2027', '28th October 2027', '699', '900', 'Sadhana Immersion Programme', 'October', 'Register'),
  ('1st November 2027', '1st November 2027', '14th November 2027', '699', '900', 'Sadhana Immersion Programme', 'November', 'Register'),
  ('15th November 2027', '15th November 2027', '28th November 2027', '699', '900', 'Sadhana Immersion Programme', 'November', 'Register'),
  ('1st December 2027', '1st December 2027', '14th December 2027', '699', '900', 'Sadhana Immersion Programme', 'December', 'Register'),
  ('15th December 2027', '15th December 2027', '28th December 2027', '699', '900', 'Sadhana Immersion Programme', 'December', 'Register');

COMMIT;

-- 33 batches inserted, 15th August 2026 through 28th December 2027.
