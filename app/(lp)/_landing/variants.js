/**
 * The seven paid-search landing pages, one per Google Ads ad group.
 *
 * Keywords come from the account's search keyword report (Sep–Oct 2024): for
 * each ad group, the terms with the most impressions and clicks are the ones
 * written into that page's title, H1, hero lines and section copy. Every fact
 * used here is already on the original page or in COURSE_FACTS (lib/seo.js) —
 * durations, RYS levels, the 200-hour prerequisite for the 300 — so nothing
 * is claimed that the rest of the site does not already say.
 *
 * Deliberately avoided, even where a keyword asks for it:
 *   · "retreat" — the yoga retreat no longer runs;
 *   · "certified school" / "affiliated" — the school is Yoga Alliance
 *     *registered*; graduates are eligible to *register* as RYT 200/300/500;
 *   · "ashram" as the name of the place — the site calls it a school. The one
 *     Rishikesh page uses the word as a comparison, the way the site does.
 */

/** The anchors every variant rewrites, in the original page's markup. */
const pairs = (v) => {
  const out = [
    ['leading-tight"> Yoga Teacher Training Course in <span class="authentic-text"> Rishikesh',
     `leading-tight"> ${v.h1} <span class="authentic-text"> ${v.h1Place}`],
    ["<span>Expert Teachers with Decades of Wisdom</span>", `<span>${v.bullet1}</span>`],
    ["<span>Holistic 200, 300, 500-Hour YTTC</span>", `<span>${v.bullet2}</span>`],
    ["200/300/500 Hour Yoga TTC </h3>", `${v.coursesHeading} </h3>`],
    ["Learn to Teach Yoga in India with our Internationally Certified Yoga Teacher Training Courses in India", v.coursesIntro],
    ['<span class="authentic-text">Any Other</span> Yoga School in Rishikesh </h2>',
     `<span class="authentic-text">Any Other</span> ${v.whyTail} </h2>`],
    ["Experience the perfect blend of traditional wisdom and modern comfort in the spiritual heart of Rishikesh", v.whyIntro],
    ["Gain a complete foundation in yoga practice and philosophy through our comprehensive curriculum", v.learnIntro],
  ];
  if (v.preselect) {
    // Open the enquiry form on the course this ad group was searching for.
    out.push([`<option value="${v.preselect}">`, `<option value="${v.preselect}" selected>`]);
  }
  return out;
};

const RAW = {
  // ── Ad group: Yoga in Rishikesh ─────────────────────────────────────────
  // yoga in rishikesh 464 · rishikesh yoga 346 · yoga school rishikesh 257 ·
  // yoga ashram in rishikesh 157 · rishikesh yoga teacher training 149 ·
  // yoga training course in rishikesh 147
  "yoga-in-rishikesh": {
    source: "Yoga in Rishikesh",
    title: "Yoga in Rishikesh | Yoga School & Teacher Training | Adhiroha",
    description:
      "Yoga in Rishikesh at Adhiroha, a Yoga Alliance registered yoga school in Upper Tapovan. Rishikesh yoga teacher training of 200, 300 & 500 hours, stay and meals included.",
    h1: "Yoga in", h1Place: "Rishikesh",
    bullet1: "Yoga School in Upper Tapovan, Rishikesh",
    bullet2: "Rishikesh Yoga Teacher Training · 200, 300, 500 Hr",
    coursesHeading: "Rishikesh Yoga Teacher Training",
    coursesIntro:
      "Yoga training courses in Rishikesh at a Yoga Alliance registered yoga school: study yoga in Rishikesh with the calm of an ashram and the structure of a school, on internationally recognised 200, 300 and 500 hour courses.",
    whyTail: "Yoga School in Rishikesh",
    whyIntro:
      "Rishikesh yoga as it is meant to be lived: traditional teaching, a quiet three-acre campus in Upper Tapovan and the Ganga a short walk away",
    learnIntro:
      "Every yoga training course in Rishikesh we run builds the same deep foundation in practice, teaching and philosophy",
  },

  // ── Ad group: Yoga in India ─────────────────────────────────────────────
  // yoga training india 513 · best yoga india 216 · best yoga teacher training
  // in india 109 · yoga courses in india 38 · best yoga schools in india 32
  "yoga-training-india": {
    source: "Yoga in India",
    title: "Yoga Training in India | Yoga Teacher Training Courses | Adhiroha",
    description:
      "Yoga training in India at Adhiroha, Rishikesh. Yoga Alliance registered 200, 300 & 500 hour yoga teacher training courses in India, with stay and meals included.",
    h1: "Yoga Training in", h1Place: "India",
    bullet1: "Yoga Teacher Training in India, Taught in Rishikesh",
    bullet2: "Yoga Courses in India · 200, 300, 500 Hr",
    coursesHeading: "Yoga Teacher Training Courses in India",
    coursesIntro:
      "Looking for the best yoga teacher training in India? Train where yoga began, in Rishikesh, on internationally recognised 200, 300 and 500 hour yoga courses at a Yoga Alliance registered school.",
    whyTail: "Yoga School in India",
    whyIntro:
      "Why students comparing the best yoga schools in India choose Rishikesh, and why they choose Adhiroha",
    learnIntro:
      "Yoga training in India with the full traditional syllabus, taught by specialist Indian teachers",
  },

  // ── Ad group: 300-hour-india ────────────────────────────────────────────
  // 300 hour yoga teacher training 315 · 300 hour yoga training india 59 ·
  // 300hr yoga teacher training india 40 · 300h yoga teacher training india 19
  "300-hour-yoga-teacher-training-india": {
    source: "300 Hour India",
    title: "300 Hour Yoga Teacher Training in India | Rishikesh | Adhiroha",
    description:
      "300 hour yoga teacher training in India: a 30-day advanced Yoga Alliance RYS 300 course in Rishikesh for teachers who already hold a 200 hour certificate. Stay and meals included.",
    h1: "300 Hour Yoga Teacher Training in", h1Place: "India",
    bullet1: "Advanced 30-Day 300 Hour YTTC",
    bullet2: "Yoga Alliance RYS 300 · Rishikesh, India",
    coursesHeading: "300 Hour Yoga Teacher Training",
    coursesIntro:
      "300 hour yoga training in India for teachers who already hold a 200 hour certificate: 30 days of advanced practice, teaching methodology and anatomy in Rishikesh, at a school registered with Yoga Alliance at the RYS 300 level.",
    whyTail: "300 Hour Yoga School in India",
    whyIntro:
      "What makes our 300 hour yoga teacher training in India different, in the spiritual heart of Rishikesh",
    learnIntro:
      "The 300 hour course takes your practice and your teaching well beyond the 200 hour foundation",
    preselect: "300 Hour Yoga TTC in Rishikesh",
  },

  // ── Ad group: Multi-style-Yoga ──────────────────────────────────────────
  // ashtanga yoga india 139 · hatha yoga teacher training 134 · ashtanga
  // teacher training india 36 · hatha yoga rishikesh 24 · rishikesh vinyasa yoga 22
  "hatha-ashtanga-yoga-teacher-training-india": {
    source: "Multi-style Yoga",
    title: "Hatha & Ashtanga Yoga Teacher Training in India | Rishikesh | Adhiroha",
    description:
      "Hatha and Ashtanga Vinyasa yoga teacher training in India. Multi-style 200, 300 & 500 hour Yoga Alliance courses in Rishikesh, taught by specialist Indian teachers.",
    h1: "Hatha &amp; Ashtanga Yoga Teacher Training in", h1Place: "India",
    bullet1: "Hatha &amp; Ashtanga Vinyasa, Taught Side by Side",
    bullet2: "Multi-Style 200, 300, 500-Hour YTTC in Rishikesh",
    coursesHeading: "Hatha &amp; Ashtanga Yoga Teacher Training",
    coursesIntro:
      "Ashtanga yoga in India meets the Hatha tradition of Rishikesh: every teacher training here combines Hatha and Ashtanga Vinyasa, with Yin in the 200 hour, so you learn to teach more than one way.",
    whyTail: "Hatha &amp; Ashtanga School in Rishikesh",
    whyIntro:
      "Hatha yoga in Rishikesh and Ashtanga yoga in India, each taught by teachers who specialise in it",
    learnIntro:
      "Hatha and Ashtanga Vinyasa practice, alongside the full traditional syllabus",
  },

  // ── Ad group: 200-hour-india ────────────────────────────────────────────
  // 200 hour yoga alliance certification 111 · 200 hour yoga teacher training
  // 136 · 200 hour yoga TTC in india 22
  "200-hour-yoga-teacher-training-india": {
    source: "200 Hour India",
    title: "200 Hour Yoga Teacher Training in India | Yoga Alliance | Adhiroha",
    description:
      "200 hour yoga teacher training in India: a 24-day Yoga Alliance RYS 200 course in Rishikesh, beginner-friendly, with stay and meals included.",
    h1: "200 Hour Yoga Teacher Training in", h1Place: "India",
    bullet1: "200 Hour Yoga Alliance Registered Course",
    bullet2: "24 Days in Rishikesh · Beginner-Friendly",
    coursesHeading: "200 Hour Yoga TTC in India",
    coursesIntro:
      "Complete our 200 hour yoga teacher training in 24 days in Rishikesh and graduate eligible to register with Yoga Alliance as an RYT 200, the 200 hour Yoga Alliance registration studios ask for worldwide. It is where most of our students begin.",
    whyTail: "Yoga School in Rishikesh",
    whyIntro:
      "Why so many teachers begin with our 200 hour yoga TTC in India, in the spiritual heart of Rishikesh",
    learnIntro:
      "The 200 hour course builds a complete foundation in practice, teaching and philosophy",
    preselect: "200 Hour Yoga TTC in Rishikesh",
  },

  // ── Ad group: 500-hour-india ────────────────────────────────────────────
  // 500 hour yoga teacher training 132 · 500 hour yoga alliance certification 8
  "500-hour-yoga-teacher-training-india": {
    source: "500 Hour India",
    title: "500 Hour Yoga Teacher Training in India | Rishikesh | Adhiroha",
    description:
      "500 hour yoga teacher training in India: a 60-day Yoga Alliance RYS 500 course in Rishikesh, foundation and advanced in one immersion. Stay and meals included.",
    h1: "500 Hour Yoga Teacher Training in", h1Place: "India",
    bullet1: "60-Day 500 Hour YTTC · Foundation to Advanced",
    bullet2: "Yoga Alliance RYS 500 · Rishikesh, India",
    coursesHeading: "500 Hour Yoga Teacher Training",
    coursesIntro:
      "The 500 hour yoga teacher training takes you from foundation to advanced in one 60-day immersion in Rishikesh, and you graduate eligible to register with Yoga Alliance at the RYT 500 level: the 500 hour Yoga Alliance registration in a single course.",
    whyTail: "500 Hour Yoga School in India",
    whyIntro:
      "Sixty days of 500 hour yoga teacher training in the spiritual heart of Rishikesh",
    learnIntro:
      "The 500 hour course covers the complete arc, from the foundation to advanced practice and teaching",
    preselect: "500 Hour Yoga TTC in Rishikesh",
  },

  // ── Ad group: yoga-certification-india ──────────────────────────────────
  // yoga instructor certification india 42 · yoga alliance international
  // india 14 · yoga alliance certified schools in india 5 · yoga certification india
  "yoga-instructor-certification-india": {
    source: "Yoga Certification India",
    title: "Yoga Instructor Certification in India | Yoga Alliance RYS | Adhiroha",
    description:
      "Yoga instructor certification in India at a Yoga Alliance registered school: RYS 200, 300 and 500 courses in Rishikesh, recognised by the Ministry of Ayush.",
    h1: "Yoga Instructor Certification in", h1Place: "India",
    bullet1: "Yoga Alliance Registered School · RYS 200, 300, 500",
    bullet2: "Recognised by the Ministry of Ayush",
    coursesHeading: "Yoga Certification Courses in India",
    coursesIntro:
      "Yoga instructor certification in India that counts at home: Adhiroha is registered with Yoga Alliance at RYS 200, 300 and 500 and recognised by India&rsquo;s Ministry of Ayush, so your yoga certification is recognised internationally.",
    whyTail: "Yoga School in India",
    whyIntro:
      "A certificate that counts when you get home, from a Yoga Alliance registered school in Rishikesh",
    learnIntro:
      "Every yoga certification course here covers the full traditional syllabus, taught by specialist Indian teachers",
  },
};

export const VARIANTS = Object.fromEntries(
  Object.entries(RAW).map(([slug, v]) => [slug, { ...v, content: pairs(v) }])
);
