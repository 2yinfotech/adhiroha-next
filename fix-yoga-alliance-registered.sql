-- Say "Yoga Alliance registered" on the blog, never "certified" or "accredited".
--
-- Run once in phpMyAdmin, against u511577297_adhiroha.
--
-- Adhiroha is a Registered Yoga School (RYS 200/300/500) with Yoga Alliance.
-- Yoga Alliance registers schools; it does not certify or accredit them. The
-- website pages were corrected in code; these are the same phrases inside blog
-- posts and blog FAQs. REPLACE() is case-sensitive and a no-op when the phrase
-- is gone, so running this twice is safe.

UPDATE `articles` SET `content` = REPLACE(`content`, 'Graduating from Adhiroha with a Yoga Alliance certification', 'Graduating from Adhiroha, a Yoga Alliance registered school,')
WHERE `content` LIKE '%Graduating from Adhiroha with a Yoga Alliance certification%';

UPDATE `articles` SET `content` = REPLACE(`content`, 'Professional Opportunities with Yoga Alliance Certification', 'Professional Opportunities with a Yoga Alliance Registered School')
WHERE `content` LIKE '%Professional Opportunities with Yoga Alliance Certification%';

UPDATE `articles` SET `content` = REPLACE(`content`, 'Accredited by Yoga Alliance and India’s Ministry of Ayush', 'Registered with Yoga Alliance and recognised by India’s Ministry of Ayush')
WHERE `content` LIKE '%Accredited by Yoga Alliance and India’s Ministry of Ayush%';

UPDATE `articles` SET `content` = REPLACE(`content`, 'Yoga Alliance accredited', 'Yoga Alliance registered')
WHERE `content` LIKE BINARY '%Yoga Alliance accredited%';

UPDATE `articles` SET `content` = REPLACE(`content`, 'Yoga Alliance-certified', 'Yoga Alliance registered')
WHERE `content` LIKE BINARY '%Yoga Alliance-certified%';

UPDATE `articles` SET `content` = REPLACE(`content`, 'Yoga Alliance certified', 'Yoga Alliance registered')
WHERE `content` LIKE BINARY '%Yoga Alliance certified%';

UPDATE `articles` SET `content` = REPLACE(`content`, 'Yoga Alliance Certified', 'Yoga Alliance Registered')
WHERE `content` LIKE BINARY '%Yoga Alliance Certified%';

UPDATE `article_faqs` SET `answer` = REPLACE(`answer`, 'Yoga Alliance certification (e.g., Adhiroha)', 'a Yoga Alliance registered school (e.g., Adhiroha)')
WHERE `answer` LIKE '%Yoga Alliance certification (e.g., Adhiroha)%';

UPDATE `article_faqs` SET
  `question` = 'Is the course registered with Yoga Alliance?',
  `answer` = 'Yes. Adhiroha is a Registered Yoga School with Yoga Alliance (RYS 200, 300 and 500), so graduates can register as RYT.'
WHERE `question` = 'Is Yoga Alliance certification offered?';

-- Check: both should return 0.
SELECT COUNT(*) AS posts_left FROM `articles`
WHERE `content` LIKE BINARY '%Yoga Alliance accredited%' OR `content` LIKE BINARY '%Yoga Alliance certified%'
   OR `content` LIKE BINARY '%Yoga Alliance-certified%' OR `content` LIKE BINARY '%Yoga Alliance Certified%'
   OR `content` LIKE '%Accredited by Yoga Alliance%' OR `content` LIKE '%with a Yoga Alliance certification%';
SELECT COUNT(*) AS faqs_left FROM `article_faqs`
WHERE `answer` LIKE '%Yoga Alliance certification (e.g.%' OR `question` = 'Is Yoga Alliance certification offered?';
