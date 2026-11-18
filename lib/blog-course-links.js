/**
 * Course links for the blog posts that bring in the most search traffic.
 *
 * The aura, kundalini and chakra guides rank in the top ten for their topics
 * and send thousands of visitors a quarter, but the article body never pointed
 * at a course. For the posts listed below this adds two things at render time,
 * without touching the article rows in MySQL:
 *
 *   1. a short box above the article: "Learn this properly → <course>";
 *   2. one paragraph in the middle of the article with a keyword anchor to the
 *      course page.
 *
 * The wording only claims what the course page itself says is taught: the 200
 * hour syllabus has daily pranayama, meditation, shatkarma and mantra, and its
 * anatomy module covers "both the physical and the subtle body". Kundalini is
 * not taught as its own subject, so no copy here says it is.
 *
 * The list is the top posts by Search Console clicks, 17 Aug – 15 Nov 2026.
 */

const YTT200 = "/200-hour-yoga-teacher-training-course-rishikesh/";

const ENERGY = {
  course: YTT200,
  boxTitle: "Learn this properly, in person",
  boxText:
    "Pranayama, meditation and the subtle body are taught every day on our 200 Hour Yoga Teacher Training in Rishikesh, by teachers with decades of practice.",
  boxCta: "See the 200 Hour YTT",
  inline:
    'Reading about energy only takes you so far. Breathwork, meditation and the subtle body are practised and studied every day on our <a href="' +
    YTT200 +
    '">200 hour yoga teacher training in Rishikesh</a>, under teachers who have lived these practices for decades.',
};

const STYLES = {
  course: YTT200,
  boxTitle: "Learn this properly, in person",
  boxText:
    "Hatha, Ashtanga and Vinyasa are practised twice a day on our 200 Hour Yoga Teacher Training in Rishikesh, from the first posture to teaching your own class.",
  boxCta: "See the 200 Hour YTT",
  inline:
    'If one of these styles speaks to you, the best way to learn it is on the mat with a teacher. Hatha, Ashtanga and Vinyasa are the daily practice of our <a href="' +
    YTT200 +
    '">200 hour yoga teacher training in Rishikesh</a>, and by the final week you teach them yourself.',
};

export const COURSE_LINKS = {
  "kundalini-awakening-stages-symptoms-safety-complete-guide": ENERGY,
  "aura-colors-meanings-guide": ENERGY,
  "what-is-kundalini-energy-chakras-philosophy-explained": ENERGY,
  "aura-cleansing-protection-techniques": ENERGY,
  "how-to-see-read-auras-beginner-guide": ENERGY,
  "aura-expansion-strengthening-techniques": ENERGY,
  "what-is-7-types-of-yoga": STYLES,
  "kundalini-energy-healing-benefits-guide": ENERGY,
  "kundalini-yoga-beginners-safe-start-guide": ENERGY,
  "energy-healing-practices-techniques": ENERGY,
  "aura-chakras-connection-integrated-healing": ENERGY,
  "what-does-red-color-aura-mean": ENERGY,
};

const ARROW =
  '<svg width="16" height="9" viewBox="0 0 20 10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 5h17M14 1l4 4-4 4"/></svg>';

/** The box shown above the article, or "" for posts not in the list. */
export function courseBoxHtml(slug) {
  const c = COURSE_LINKS[slug];
  if (!c) return "";
  return (
    `<aside class="art-course-box" aria-label="Related course">` +
    `<span class="acb-k">${c.boxTitle}</span>` +
    `<p>${c.boxText}</p>` +
    `<a class="acb-link" href="${c.course}">${c.boxCta} ${ARROW}</a>` +
    `</aside>`
  );
}

/**
 * Insert the course paragraph roughly a third of the way into the article,
 * after a top-level paragraph that is not the first one. Posts not in the
 * list, or with too few paragraphs, come back unchanged.
 */
export function withInlineCourseLink(slug, html) {
  const c = COURSE_LINKS[slug];
  if (!c || !html) return html;
  const ends = [];
  const re = /<\/p>/gi;
  let m;
  while ((m = re.exec(html))) ends.push(m.index + m[0].length);
  if (ends.length < 4) return html;
  const at = ends[Math.max(2, Math.floor(ends.length / 3))];
  // Do not land inside a list, table, blockquote or figure.
  const before = html.slice(0, at);
  const open = (tag) =>
    (before.match(new RegExp(`<${tag}\\b`, "gi")) || []).length -
    (before.match(new RegExp(`</${tag}>`, "gi")) || []).length;
  if (["ul", "ol", "table", "blockquote", "figure", "details"].some((t) => open(t) > 0)) {
    const next = ends.find((e) => e > at && !["ul", "ol", "table", "blockquote", "figure", "details"].some((t) => {
      const b = html.slice(0, e);
      return (b.match(new RegExp(`<${t}\\b`, "gi")) || []).length > (b.match(new RegExp(`</${t}>`, "gi")) || []).length;
    }));
    if (!next) return html;
    return html.slice(0, next) + `<p class="art-course-inline">${c.inline}</p>` + html.slice(next);
  }
  return html.slice(0, at) + `<p class="art-course-inline">${c.inline}</p>` + html.slice(at);
}
