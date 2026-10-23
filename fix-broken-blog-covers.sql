-- Replace blog cover images that 404 on the live site.
--
-- Run once in phpMyAdmin, against u511577297_adhiroha.
--
-- On 2026-10-23 every image on https://www.adhiroha.com/blogs/ was requested:
-- 16 cover files (11.jpg, 12.jpg, 13.jpg and 13 placeholder-*-cover.webp)
-- do not exist on the server, and 29 posts point at them. Each of those posts
-- gets its own landscape photo from the site's own gallery (public/gallery/),
-- which ships with every deploy.
--
-- Only these 29 rows change, and only while they still point at the missing
-- file (the LIKE condition): a post whose cover has since been fixed by hand
-- is left alone. Posts whose covers already load are not touched at all.

UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-033.webp' WHERE `slug` = 'yoga-for-sports-recovery-muscle-restoration' AND `cover_image` LIKE '%placeholder-resilience-guide-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-034.webp' WHERE `slug` = 'yoga-for-runners-endurance-athletes' AND `cover_image` LIKE '%placeholder-self-reflection-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-026.webp' WHERE `slug` = 'yoga-for-athletes-beginners-guide-performance-recovery' AND `cover_image` LIKE '%placeholder-life-changes-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/sound-healing/sound-005.webp' WHERE `slug` = 'mobility-vs-flexibility-athletic-performance' AND `cover_image` LIKE '%placeholder-hormonal-health-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-046.webp' WHERE `slug` = 'yoga-for-joint-mobility-flexibility-age' AND `cover_image` LIKE '%placeholder-digital-detox-breathwork-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-031.webp' WHERE `slug` = 'yoga-for-balance-fall-prevention-seniors' AND `cover_image` LIKE '%placeholder-social-media-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-047.webp' WHERE `slug` = 'yoga-for-healthy-aging-longevity-guide' AND `cover_image` LIKE '%placeholder-screen-fatigue-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-003.webp' WHERE `slug` = 'yoga-for-healthy-aging-longevity-senior-wellness' AND `cover_image` LIKE '%placeholder-digital-detox-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga-shala/yoga-shala-005.webp' WHERE `slug` = 'yoga-vs-gym-workouts' AND `cover_image` LIKE '%placeholder-morning-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-010.webp' WHERE `slug` = 'yoga-hormonal-health-emotional-balance-guide' AND `cover_image` LIKE '%placeholder-hormonal-health-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga-shala/yoga-shala-004.webp' WHERE `slug` = 'yoga-for-screen-fatigue-eye-strain' AND `cover_image` LIKE '%placeholder-screen-fatigue-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-027.webp' WHERE `slug` = 'morning-yoga-for-energy-and-focus' AND `cover_image` LIKE '%placeholder-morning-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-020.webp' WHERE `slug` = 'yoga-guide-navigating-life-changes-resilience' AND `cover_image` LIKE '%placeholder-resilience-guide-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-023.webp' WHERE `slug` = 'yoga-for-self-reflection-personal-growth' AND `cover_image` LIKE '%placeholder-self-reflection-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-019.webp' WHERE `slug` = 'yoga-for-major-life-changes-uncertainty' AND `cover_image` LIKE '%placeholder-life-changes-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-038.webp' WHERE `slug` = 'digital-detox-yoga-breathwork' AND `cover_image` LIKE '%placeholder-digital-detox-breathwork-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-017.webp' WHERE `slug` = 'yoga-for-social-media-stress-mental-overload' AND `cover_image` LIKE '%placeholder-social-media-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-037.webp' WHERE `slug` = 'yoga-for-digital-detox-mindfulness-modern-distractions' AND `cover_image` LIKE '%placeholder-digital-detox-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-014.webp' WHERE `slug` = 'yoga-mindfulness-guide-digital-detox' AND `cover_image` LIKE '%placeholder-mindfulness-guide-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-007.webp' WHERE `slug` = 'yoga-for-stress-and-anxiety' AND `cover_image` LIKE '%12.jpg';
UPDATE `articles` SET `cover_image` = '/gallery/sound-healing/sound-004.webp' WHERE `slug` = 'yoga-for-seniors-a-beginner-friendly-guide-to-getting-started' AND `cover_image` LIKE '%placeholder-mindful-lifestyle-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga-shala/yoga-shala-010.webp' WHERE `slug` = 'restorative-yoga-for-womens-wellness' AND `cover_image` LIKE '%placeholder-restorative-womens-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/sound-healing/sound-009.webp' WHERE `slug` = 'mindful-lifestyle-hyperconnected-world' AND `cover_image` LIKE '%placeholder-mindful-lifestyle-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-002.webp' WHERE `slug` = 'Traditional-Modern-Yoga' AND `cover_image` LIKE '%11.jpg';
UPDATE `articles` SET `cover_image` = '/gallery/sound-healing/sound-002.webp' WHERE `slug` = 'how-yoga-helps-prevent-sports-injuries' AND `cover_image` LIKE '%placeholder-restorative-womens-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-030.webp' WHERE `slug` = 'yoga-for-strength-independence-functional-movement-seniors' AND `cover_image` LIKE '%placeholder-mindfulness-digital-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-039.webp' WHERE `slug` = 'aging-myths-exercise-yoga-seniors' AND `cover_image` LIKE '%placeholder-mindfulness-guide-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga/yoga-025.webp' WHERE `slug` = 'mindfulness-practices-digital-age' AND `cover_image` LIKE '%placeholder-mindfulness-digital-cover.webp';
UPDATE `articles` SET `cover_image` = '/gallery/yoga-shala/yoga-shala-003.webp' WHERE `slug` = 'Yoga-for-Burnout' AND `cover_image` LIKE '%13.jpg';
