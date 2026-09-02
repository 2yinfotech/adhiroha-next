/**
 * Builds the "Keep Exploring" related-links band that sits between the final CTA
 * and the footer on every English page.
 *
 * The header and footer already link to nearly every page, but they do it with
 * two-word nav labels ("About Us", "Gallery", "Contact") — so no page was
 * receiving an internal link on the phrases it actually ranks for. This band is
 * curated per route and uses full keyword anchors instead.
 *
 * Idempotent: an existing band is stripped before the new one is written, so the
 * script can be re-run after the copy changes.
 */
import fs from "fs";
import path from "path";

const MAIN = "app/(en)/(main)";

// One entry per link target: the keyword anchor, and the line that explains it.
const L = {
  "/": [
    "Yoga Teacher Training in Rishikesh",
    "The whole school in one place — every course, the daily rhythm, the fees and the dates."
  ],
  "/yoga-teacher-training-course-rishikesh-india/": [
    "Yoga Teacher Training in India",
    "All three Yoga Alliance certified paths — 200, 300 and 500 hour — compared side by side."
  ],
  "/200-hour-yoga-teacher-training-course-rishikesh/": [
    "200 Hour Yoga Teacher Training in Rishikesh",
    "The 24-day RYT 200 foundation, and the course most students begin with."
  ],
  "/300-hour-yoga-teacher-training-course-rishikesh/": [
    "300 Hour Yoga Teacher Training in Rishikesh",
    "The advanced level for teachers who already hold a 200 hour certificate."
  ],
  "/500-hour-yoga-teacher-training-course-rishikesh/": [
    "500 Hour Yoga Teacher Training in Rishikesh",
    "Both levels in a single two-month immersion, ending at the RYT 500 standard."
  ],
  "/hatha-teacher-training-course-rishikesh/": [
    "Hatha &amp; Yin Yoga TTC in Rishikesh",
    "Twelve days on the two styles that teach you when to work and when to let go."
  ],
  "/ashtanga-teacher-training-course-rishikesh/": [
    "Ashtanga &amp; Vinyasa Yoga TTC in Rishikesh",
    "The primary series and the art of leading a breath-led flow, in twelve days."
  ],
  "/pranayama-teacher-training-course-rishikesh/": [
    "Pranayama &amp; Meditation Yoga TTC in Rishikesh",
    "Twelve days away from posture, turned entirely toward the breath and the mind."
  ],
  "/sound-healing-ttc-rishikesh/": [
    "Sound Healing TTC in Rishikesh",
    "Six days with singing bowls, gongs and the practice of sound therapy."
  ],
  "/sadhana-immersion-programme/": [
    "Sadhana Immersion Programme in Rishikesh",
    "A fifteen-day personal practice immersion, with no teaching syllabus to keep up with."
  ],
  "/about-us/": [
    "Why Adhiroha Is the Best Yoga School in Rishikesh",
    "The founder&rsquo;s letter, the accreditations, and what the ashram is actually like."
  ],
  "/yoga-teachers-in-india/": [
    "Our Yoga Teachers in India",
    "The acharyas who teach every subject — ten to twenty years of practice each."
  ],
  "/faqs-of-yoga-school-in-india/": [
    "Yoga TTC in Rishikesh: Your Questions Answered",
    "Visas, food, room-sharing, fitness levels and everything else students ask first."
  ],
  "/soon-after-message/": [
    "What Our Students Say",
    "Unedited messages from graduates of 70+ countries, written after they got home."
  ],
  "/yoga-gallery-india/": [
    "Inside the Ashram: Photo Gallery",
    "181 honest photographs of the shala, the rooms and the food — exactly as they are."
  ],
  "/safety-hygiene-in-rishikesh/": [
    "Safety &amp; Hygiene at Our Yoga School",
    "How we look after students who travel here alone, and often travel far."
  ],
  "/yoga-ashram-in-india-code-of-conduct/": [
    "Ashram Code of Conduct",
    "The handful of clear rules that keep the practice free for everyone."
  ],
  "/blogs/": [
    "The Yoga Teacher Training Blog",
    "Longer reads on choosing a course, arriving prepared and life after graduation."
  ],
  "/blog-200-hour-yoga-teacher-training-guide/": [
    "Complete Guide to 200 Hour Yoga Teacher Training",
    "What the 24 days feel like, what you learn, what it costs and how to arrive ready."
  ],
  "/blog-300-vs-500-hour-yoga-teacher-training/": [
    "300 vs 500 Hour Yoga Teacher Training",
    "Two roads lead to RYT 500 — an honest comparison of who each one suits."
  ],
  "/blog-500-hour-yoga-teacher-training-worth-it/": [
    "Is the 500 Hour Yoga Teacher Training Worth It?",
    "Sixty days is a serious commitment. Here is what actually happens across them."
  ],
  "/ashram-accommodation-rishikesh/": [
    "Ashram Accommodation in Rishikesh",
    "The rooms, the sharing options and what is actually included in the fee."
  ],
  "/ashram-food-rishikesh/": [
    "Ashram Food: What You Will Eat",
    "Three sattvic vegetarian meals a day, and how the kitchen handles allergies."
  ],
  "/excursions-rishikesh/": [
    "Excursions Around Rishikesh",
    "The waterfall, the Ganga aarti and the temple walks that come with the course."
  ],
  "/contact-us/": [
    "Contact Our Yoga School in Rishikesh",
    "Ask us anything about dates, travel or fees — we usually reply within a day."
  ]
};

// route -> [heading, intro, ...four link targets]
const PLAN = {
  "/": [
    "Read More Before You Choose Your Course",
    "Most students spend a week or two comparing schools before they book, and that is exactly as it should be. These pages answer the questions that come next.",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/500-hour-yoga-teacher-training-course-rishikesh/",
    "/yoga-teacher-training-course-rishikesh-india/"
  ],
  "/200-hour-yoga-teacher-training-course-rishikesh/": [
    "Where the 200 Hour Course Leads Next",
    "The foundation is the beginning of the path rather than the end of it. Here is what sits on either side of it.",
    "/yoga-teacher-training-course-rishikesh-india/",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/blog-200-hour-yoga-teacher-training-guide/",
    "/faqs-of-yoga-school-in-india/"
  ],
  "/300-hour-yoga-teacher-training-course-rishikesh/": [
    "Compare the Advanced Paths",
    "The 300 hour is one of two ways to reach the RYT 500 standard. Read both before you decide.",
    "/500-hour-yoga-teacher-training-course-rishikesh/",
    "/blog-300-vs-500-hour-yoga-teacher-training/",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/yoga-teacher-training-course-rishikesh-india/"
  ],
  "/500-hour-yoga-teacher-training-course-rishikesh/": [
    "Compare the Advanced Paths",
    "Two months is a serious commitment, and the 300 hour route exists for a reason. Both are set out honestly here.",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/blog-500-hour-yoga-teacher-training-worth-it/",
    "/blog-300-vs-500-hour-yoga-teacher-training/",
    "/yoga-teacher-training-course-rishikesh-india/"
  ],
  "/hatha-teacher-training-course-rishikesh/": [
    "The Other Specialised Trainings",
    "Each of our twelve-day trainings goes deep into one thing. If Hatha and Yin is not quite it, one of these will be.",
    "/ashtanga-teacher-training-course-rishikesh/",
    "/pranayama-teacher-training-course-rishikesh/",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/300-hour-yoga-teacher-training-course-rishikesh/"
  ],
  "/ashtanga-teacher-training-course-rishikesh/": [
    "The Other Specialised Trainings",
    "Each of our twelve-day trainings goes deep into one thing. If the flow is not what you are after, one of these will be.",
    "/hatha-teacher-training-course-rishikesh/",
    "/pranayama-teacher-training-course-rishikesh/",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/500-hour-yoga-teacher-training-course-rishikesh/"
  ],
  "/pranayama-teacher-training-course-rishikesh/": [
    "The Other Specialised Trainings",
    "Each of our twelve-day trainings goes deep into one thing. If you would rather move than sit, start with one of these.",
    "/hatha-teacher-training-course-rishikesh/",
    "/ashtanga-teacher-training-course-rishikesh/",
    "/sound-healing-ttc-rishikesh/",
    "/300-hour-yoga-teacher-training-course-rishikesh/"
  ],
  "/sound-healing-ttc-rishikesh/": [
    "Short Programmes at the Ashram",
    "Sound healing is one of several shorter stays we run for students who cannot take a whole month away.",
    "/sadhana-immersion-programme/",
    "/pranayama-teacher-training-course-rishikesh/",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/500-hour-yoga-teacher-training-course-rishikesh/"
  ],
  "/sadhana-immersion-programme/": [
    "Short Programmes at the Ashram",
    "The immersion is for practice rather than certification. These are the closest things to it that we run.",
    "/sound-healing-ttc-rishikesh/",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/500-hour-yoga-teacher-training-course-rishikesh/"
  ],
  "/about-us/": [
    "See the School for Yourself",
    "Words about a school only go so far. These pages let you check the claim from other angles.",
    "/yoga-teachers-in-india/",
    "/soon-after-message/",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/500-hour-yoga-teacher-training-course-rishikesh/"
  ],
  "/yoga-teachers-in-india/": [
    "More About the School",
    "The teachers are the reason people travel here. This is the rest of the picture.",
    "/about-us/",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/500-hour-yoga-teacher-training-course-rishikesh/"
  ],
  "/yoga-teacher-training-course-rishikesh-india/": [
    "Read Each Course in Full",
    "This page is the overview. Each course has its own page with the full day-by-day syllabus, fees and dates.",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/500-hour-yoga-teacher-training-course-rishikesh/",
    "/about-us/"
  ],
  "/faqs-of-yoga-school-in-india/": [
    "Still Deciding?",
    "If the answers above settled the practical questions, these pages cover the course itself.",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/500-hour-yoga-teacher-training-course-rishikesh/",
    "/yoga-teacher-training-course-rishikesh-india/"
  ],
  "/blogs/": [
    "Start With the Courses",
    "The articles are here to help you choose. When you are ready, the course pages have the detail.",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/500-hour-yoga-teacher-training-course-rishikesh/",
    "/yoga-teacher-training-course-rishikesh-india/"
  ],
  "/blog-200-hour-yoga-teacher-training-guide/": [
    "Read Next",
    "If the guide answered the first questions, these pages take it from there.",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/yoga-teacher-training-course-rishikesh-india/",
    "/faqs-of-yoga-school-in-india/"
  ],
  "/blog-300-vs-500-hour-yoga-teacher-training/": [
    "Read Next",
    "Both courses are set out in full on their own pages, with the day-by-day syllabus and the fees.",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/500-hour-yoga-teacher-training-course-rishikesh/",
    "/yoga-teacher-training-course-rishikesh-india/",
    "/about-us/"
  ],
  "/blog-500-hour-yoga-teacher-training-worth-it/": [
    "Read Next",
    "Two months is a long time to commit. Read the course in full, and the honest comparison with the 300 hour route.",
    "/500-hour-yoga-teacher-training-course-rishikesh/",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/blog-300-vs-500-hour-yoga-teacher-training/",
    "/yoga-teacher-training-course-rishikesh-india/"
  ],
  "/yoga-gallery-india/": [
    "Now Read the Courses",
    "You have seen the place. These pages tell you what happens inside it.",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/500-hour-yoga-teacher-training-course-rishikesh/",
    "/yoga-teacher-training-course-rishikesh-india/"
  ],
  "/soon-after-message/": [
    "Where These Students Trained",
    "Every message above was written by a graduate of one of these courses.",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/500-hour-yoga-teacher-training-course-rishikesh/",
    "/yoga-teacher-training-course-rishikesh-india/"
  ],
  "/safety-hygiene-in-rishikesh/": [
    "More Things Worth Knowing",
    "Practical questions rarely stop at hygiene. These pages cover the rest of them.",
    "/faqs-of-yoga-school-in-india/",
    "/yoga-ashram-in-india-code-of-conduct/",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/300-hour-yoga-teacher-training-course-rishikesh/"
  ],
  "/yoga-ashram-in-india-code-of-conduct/": [
    "More Things Worth Knowing",
    "The rules exist to protect the practice. These pages explain the rest of ashram life.",
    "/safety-hygiene-in-rishikesh/",
    "/faqs-of-yoga-school-in-india/",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/500-hour-yoga-teacher-training-course-rishikesh/"
  ],
  "/contact-us/": [
    "While You Wait for Our Reply",
    "Most questions are already answered somewhere on these pages.",
    "/faqs-of-yoga-school-in-india/",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/500-hour-yoga-teacher-training-course-rishikesh/"
  ],
  "/privacy-policy/": [
    "Back to the School",
    "The pages most visitors are looking for.",
    "/",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/about-us/",
    "/contact-us/"
  ],
  "/ashram-accommodation-rishikesh/": [
    "The Rest of Ashram Life",
    "Where you sleep is one part of the month. These pages cover the others.",
    "/ashram-food-rishikesh/",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/500-hour-yoga-teacher-training-course-rishikesh/"
  ],
  "/ashram-food-rishikesh/": [
    "The Rest of Ashram Life",
    "The kitchen is only half of it. These pages cover where you stay and what you study.",
    "/ashram-accommodation-rishikesh/",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/500-hour-yoga-teacher-training-course-rishikesh/"
  ],
  "/excursions-rishikesh/": [
    "What the Excursions Belong To",
    "The excursions come with a course. These are the courses they come with.",
    "/200-hour-yoga-teacher-training-course-rishikesh/",
    "/300-hour-yoga-teacher-training-course-rishikesh/",
    "/500-hour-yoga-teacher-training-course-rishikesh/",
    "/yoga-teacher-training-course-rishikesh-india/"
  ],
  "/thank-you/": [
    "While You Prepare to Travel",
    "Your seat is held. These pages will help you arrive ready.",
    "/faqs-of-yoga-school-in-india/",
    "/safety-hygiene-in-rishikesh/",
    "/yoga-ashram-in-india-code-of-conduct/",
    "/yoga-gallery-india/"
  ]
};

const OPEN = "<!-- ==  RELATED · INTERNAL LINKS  == -->";
const CLOSE = "<!-- ==  /RELATED  == -->";

function band(route) {
  const plan = PLAN[route];
  if (!plan) return null;
  const [heading, intro, ...targets] = plan;
  const items = targets
    .filter((t) => t !== route && L[t])
    .map((t) => {
      const [anchor, blurb] = L[t];
      return (
        `      <li class=\\"rl-card\\">\\n` +
        `        <a class=\\"rl-link\\" href=\\"${t}\\">${anchor}</a>\\n` +
        `        <p class=\\"rl-note\\">${blurb}</p>\\n` +
        `      </li>`
      );
    })
    .join("\\n");
  return (
    `\\n\\n${OPEN}\\n` +
    `<section class=\\"rl-sec\\" aria-labelledby=\\"rl-h\\">\\n` +
    `  <div class=\\"wrap\\">\\n` +
    `    <span class=\\"kicker\\">Keep Exploring</span>\\n` +
    `    <h2 class=\\"sec-h rl-h\\" id=\\"rl-h\\">${heading}</h2>\\n` +
    `    <p class=\\"body-p rl-intro\\">${intro}</p>\\n` +
    `    <ul class=\\"rl-grid\\">\\n${items}\\n    </ul>\\n` +
    `  </div>\\n` +
    `</section>\\n${CLOSE}`
  );
}

/**
 * Removes a band this script wrote on an earlier run, so it can be re-run after
 * the copy or the plan changes.
 *
 * Anchored on the <section class="rl-sec"> element rather than on the comment
 * markers. The markers alone were not enough: content.js files are serialised
 * with every non-ASCII character escaped, so the "·" in the opening marker is
 * "\\u00b7" on disk and never matched the literal marker searched for here. The
 * strip silently did nothing and a second band was appended below the first —
 * which is exactly what happened, on every page, before this was fixed.
 */
function stripBand(raw, file) {
  let out = raw;
  for (let guard = 0; guard < 10; guard++) {
    const at = out.indexOf('<section class=\\"rl-sec\\"');
    if (at < 0) break;
    const end = out.indexOf("</section>", at);
    if (end < 0) throw new Error(`${file}: unterminated rl-sec band`);
    let from = at;
    let to = end + "</section>".length;
    // Take the comment banner above it and the closing banner below, in either
    // the literal or the \\u-escaped spelling.
    for (const open of [OPEN, OPEN.replace("\u00b7", "\\u00b7")]) {
      const o = out.lastIndexOf(open, at);
      if (o > -1 && at - o < open.length + 8) from = o;
    }
    for (const close of [CLOSE, CLOSE.replace("\u00b7", "\\u00b7")]) {
      if (out.startsWith(close, to)) to += close.length;
      else if (out.startsWith("\\n" + close, to)) to += close.length + 2;
    }
    while (out.slice(from - 2, from) === "\\n") from -= 2;
    out = out.slice(0, from) + out.slice(to);
  }
  return out;
}

const pages = [
  ["/", "app/_home/content.js"],
  ...fs
    .readdirSync(MAIN)
    .filter((d) => fs.existsSync(path.join(MAIN, d, "content.js")))
    .map((d) => [`/${d}/`, path.join(MAIN, d, "content.js")])
];

let n = 0;
for (const [route, file] of pages) {
  const html = band(route);
  if (!html) {
    console.log(`${route}  — skipped (no plan)`);
    continue;
  }
  let raw = fs.readFileSync(file, "utf8");
  raw = stripBand(raw, file);
  const footerAt = raw.lastIndexOf("<footer");
  if (footerAt < 0) {
    console.log(`${route}  — SKIPPED, no <footer>`);
    continue;
  }
  // Land it straight after the last content <section>, so the comment banner that
  // introduces the footer stays attached to the footer.
  const lastSection = raw.lastIndexOf("</section>", footerAt);
  if (lastSection < 0) {
    console.log(`${route}  — SKIPPED, no </section> before footer`);
    continue;
  }
  const insertAt = lastSection + "</section>".length;
  fs.writeFileSync(file, raw.slice(0, insertAt) + html + raw.slice(insertAt));
  n++;
  const count = (html.match(/rl-link/g) || []).length;
  console.log(`${route}  + band (${count} links)`);
}
console.log(`\nBands written: ${n}`);
