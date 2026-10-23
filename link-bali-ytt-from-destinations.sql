-- Internal link: "10 Best Yoga Destinations in the World for 2026" -> the Bali
-- teacher-training guide, anchor "Best Yoga Teacher Training Schools in Bali".
--
-- Run once in phpMyAdmin, against u511577297_adhiroha.
--
-- Adds one sentence at the end of the post's "Ubud, Bali" section. It changes
-- nothing if the anchor text is not found, and the NOT LIKE guard stops a
-- second run from adding the link twice.

UPDATE `articles`
SET `content` = REPLACE(
  `content`,
  'a gentle entry point before something more traditional.</p></section>',
  'a gentle entry point before something more traditional.</p><p>Thinking of becoming a teacher there? Our guide to the <a href="/blog/best-yoga-teacher-training-schools-in-bali/">Best Yoga Teacher Training Schools in Bali</a> compares four programmes for 2027.</p></section>'
)
WHERE `slug` = '10-best-yoga-destinations-in-the-world-for-2026'
  AND `content` NOT LIKE '%best-yoga-teacher-training-schools-in-bali%';

-- Check: should return 1.
SELECT COUNT(*) AS link_added FROM `articles`
WHERE `slug` = '10-best-yoga-destinations-in-the-world-for-2026'
  AND `content` LIKE '%Best Yoga Teacher Training Schools in Bali</a>%';
