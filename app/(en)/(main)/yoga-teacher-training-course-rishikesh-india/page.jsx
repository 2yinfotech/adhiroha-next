// Yoga Teacher Training in India — the hub page for the 200, 300 and 500 hour
// courses. Replaced the original content.js build on 2026-08-12.
//
// A note on the files in this directory: `styles.css`, `scripts.js` and
// `content.js` are the ORIGINAL page and must not be deleted. The ten
// translated versions of this page (app/de, app/fr, app/es, …) import this
// directory's `styles.css` and `scripts.js` directly, so removing them breaks
// ten routes. This page therefore ships its own `page-styles.css`,
// `page-scripts.js`, `header.css` and `data.js`; `content.js` is now unused by
// the English route and is kept only as the rollback.
//
// Why the page is shaped the way it is: it has to rank as well as read, so
// nothing is hidden. An earlier draft made the level a tab-like switch and put
// the ashram spaces behind tabs; both were removed. A crawler saw three
// near-identical heading outlines and a reader saw a third of the page.
// Everything here is in the HTML and visible on load.
//
//   H1  hero
//   H2  the ladder      the three courses drawn to scale on one 500-hour axis
//   H2  200 / 300 / 500 three full sections, each with its own H3s
//   H2  batch dates     one table, a column per course
//   ——  the shared spine — everything the three have in common, written once
//   H2  ashram, food, teachers, excursions, certificate, videos, voices, FAQ
//   H2  keep exploring  down into the three dedicated course pages
import "./header.css";
import "./page-styles.css";
import { DRAWER_HTML, FOOTER_HTML, HEADER_HTML } from "@/components/chrome";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbSchema, courseFacts, courseSchema, faqSchema, graph,
  hreflangFor, studentVideoSchemas,
} from "@/lib/seo";
import scripts from "./page-scripts";
import {
  ARC, COURSE_URL, DAY, EXCURSIONS, FAQS, INCLUDED, LEVEL, LEVELS,
  MOSAIC, NOT_INCLUDED, PILLAR_STEP, PILLARS, SPACES, TEACHERS, VIDEOS, VOICES, WHO,
} from "./data";

const URL = "/yoga-teacher-training-course-rishikesh-india/";

export const metadata = {
  title: "Yoga Teacher Training in India | 200, 300 & 500 Hour YTTC in Rishikesh | Adhiroha",
  description:
    "Yoga teacher training in India at Adhiroha, Rishikesh. Yoga Alliance registered 200, 300 and 500 hour residential courses from €1275, all-inclusive. Compare fees, syllabus and dates, and see the ashram you would be living in.",
  keywords: [
    "yoga teacher training in india",
    "yoga teacher training in rishikesh",
    "200 hour yoga teacher training india",
    "300 hour yoga teacher training",
    "500 hour yoga teacher training rishikesh",
    "yoga ttc india",
  ],
  alternates: { canonical: URL, languages: hreflangFor(URL) },
  openGraph: {
    title: "Yoga Teacher Training in India | 200, 300 & 500 Hour YTTC in Rishikesh",
    description:
      "Yoga Alliance registered 200, 300 and 500 hour residential yoga teacher training in Rishikesh, India. All-inclusive fees, internationally recognised certification.",
    url: URL,
    type: "website",
    images: [{ url: "/img/adhiroha-yttc-014.webp", width: 1600, height: 1064,
               alt: "Students practising in the shala at Adhiroha, Rishikesh" }],
  },
};

// A Course node per training, each pointing at that course's own page rather
// than at this one — the dedicated pages are the canonical home of each course,
// and this page is the overview that leads to them. Plus the FAQs, the student
// review videos and breadcrumbs.
const pageSchema = graph(
  courseSchema({
    name: "200 Hour Yoga Teacher Training in Rishikesh, India",
    description:
      "Residential 200 hour Yoga Alliance certified yoga teacher training course in Rishikesh, India, the beginner-friendly foundation in asana, pranayama, anatomy, philosophy and teaching practice.",
    url: COURSE_URL[200],
    price: 1275,
    days: 24,
    styles: "Hatha, Ashtanga Vinyasa and Yin yoga",
    ...courseFacts(COURSE_URL[200]),
  }),
  courseSchema({
    name: "300 Hour Yoga Teacher Training in Rishikesh, India",
    description:
      "Residential 300 hour advanced yoga teacher training course in Rishikesh, India for 200-hour graduates, completing the RYT 500 pathway.",
    url: COURSE_URL[300],
    price: 1500,
    days: 30,
    styles: "Hatha, Ashtanga Vinyasa and Alignment",
    ...courseFacts(COURSE_URL[300]),
  }),
  courseSchema({
    name: "500 Hour Yoga Teacher Training in Rishikesh, India",
    description:
      "Residential 500 hour yoga teacher training course in Rishikesh, India, the complete 60-day immersion combining the 200 and 300 hour syllabus, from beginner to master level.",
    url: COURSE_URL[500],
    price: 2790,
    days: 60,
    styles: "Hatha, Ashtanga, Yin and Alignment",
    ...courseFacts(COURSE_URL[500]),
  }),
  faqSchema(FAQS.map(([question, answer]) => ({ question, answer }))),
  breadcrumbSchema([{ name: "Yoga Teacher Training in India", url: URL }]),
  ...studentVideoSchemas()
);

const sections = [
  { label: "Top", target: "top" },
  { label: "The three paths", target: "the-path" },
  { label: "200 Hour", target: "c200" },
  { label: "300 Hour", target: "c300" },
  { label: "500 Hour", target: "c500" },
  { label: "Dates", target: "dates" },
  { label: "A day", target: "a-day" },
  { label: "The ashram", target: "ashram" },
  { label: "Teachers", target: "teachers" },
  { label: "Reviews", target: "videos" },
  { label: "FAQ", target: "faq" },
];

/* ---------- small inline marks ---------- */
const Arrow = () => (
  <svg width="18" height="10" viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 5h17M14 1l4 4-4 4" /></svg>
);
const Tick = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const Dash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
const Info = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
);
const Lotus = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21c-4.5-1.5-7-4.5-7-9 2 0 4 .8 5 2" /><path d="M12 21c4.5-1.5 7-4.5 7-9-2 0-4 .8-5 2" /><path d="M12 21c-2-2-3-5-3-8 0-3 1.5-6 3-8 1.5 2 3 5 3 8 0 3-1 6-3 8z" /></svg>
);
const Star = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#c99a63"><path d="M12 2l2.95 6.36 6.96.6-5.27 4.6 1.57 6.8L12 16.77l-6.21 3.59 1.57-6.8-5.27-4.6 6.96-.6z" /></svg>
);

/* One of the three full course sections. Same skeleton each time so the three
   are genuinely comparable; the accent, the photograph and the numerals are
   what tell them apart. */
function CourseSection({ lv, index }) {
  const L = LEVEL[lv];
  return (
    <section className={`tp-sec tp-course tp-lv${lv}${index % 2 ? " tp-paper" : ""}`} id={`c${lv}`}>
      <div className="tp-wrap">
        <figure className="tp-course-photo reveal">
          <img src={L.image} alt={`Students on the ${lv} hour yoga teacher training at Adhiroha, Rishikesh`} loading="lazy" />
          <figcaption><span className="tp-fig">{lv}</span> {L.name}</figcaption>
        </figure>

        <div className="tp-course-head">
          <div className="reveal">
            <span className="tp-eyebrow">{L.name} · {L.days} · {L.credential}</span>
            <h2 className="tp-h2 wide">{L.title} in Rishikesh</h2>
            <p className="tp-p">{L.blurb}</p>
            <p className="tp-p">
              Everything you need for the {L.days} is already inside the fee: your room on ashram, three
              meals a day, all training and materials, both excursions, airport pickup from Dehradun and
              your certificate.
            </p>
            <div className="tp-prereq">
              <Info />
              <span><b>Before you arrive:</b> {L.prereq}</span>
            </div>
            <a className="tp-link" href={COURSE_URL[lv]}>
              Everything about the {lv} hour course <Arrow />
            </a>
          </div>

          <aside className="tp-price-card reveal">
            <div className="tp-price-top">
              <div>
                <div className="tp-price-lab">Triple sharing · most chosen</div>
                <div className="tp-fig tp-price-big">&euro;{L.triple}</div>
                <div className="tp-price-sub">all-inclusive</div>
              </div>
              <div className="tp-price-alt">
                <span>Double sharing</span>
                <b>&euro;{L.double}</b>
              </div>
            </div>

            <dl className="tp-rows">
              <div className="tp-row"><dt>Duration</dt><dd>{L.days} · residential</dd></div>
              <div className="tp-row"><dt>Course runs</dt><dd>{L.span}</dd></div>
              <div className="tp-row"><dt>Level</dt><dd>{L.level}</dd></div>
              <div className="tp-row"><dt>Styles</dt><dd>Hatha, Ashtanga vinyasa, Yin, alignment</dd></div>
              <div className="tp-row"><dt>Certificate</dt><dd>{L.credential} + Ministry of Ayush</dd></div>
            </dl>

            <div className="tp-split">
              <div className="tp-split-h">How the payment works</div>
              <div className="tp-split-r"><b>&euro;{L.reserve}</b> reserves your seat</div>
              <div className="tp-split-r"><b>&euro;{L.balanceTriple}</b> on arrival, triple sharing</div>
              <div className="tp-split-r"><b>&euro;{L.balanceDouble}</b> on arrival, double sharing</div>
            </div>

            <a className="btn-primary" href="/student-admission-panel/">Apply for the {lv} hour</a>
            <div className="tp-fineprint">
              <Info />
              <span>The registration fee is part of the total, never an extra charge. {L.checkout}.</span>
            </div>
          </aside>
        </div>

        <div className="tp-course-body">
          <h3 className="tp-h3 reveal">What you learn on the {lv} hour</h3>
          <p className="tp-p reveal">
            Twelve subjects across {L.days}, each carried by a teacher who has lived it. They sort into
            four pillars that run from the body to the front of the room.
          </p>
          <div className="tp-pillars reveal">
            {PILLARS[lv].map(([h, sub, items], i) => (
              <div className="tp-pillar" key={h}>
                <div className="tp-pillar-n">{PILLAR_STEP[i]}</div>
                <h4>{h}</h4>
                <div className="sub">{sub}</div>
                <ul>
                  {items.map(([b, rest]) => <li key={b}><b>{b}</b>, {rest}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <h3 className="tp-h3 reveal">Who the {lv} hour is for</h3>
          <div className="tp-who reveal">
            {WHO[lv].map(([tag, h, p]) => (
              <div className="tp-who-item" key={h}>
                <span>{tag}</span>
                <b>{h}</b>
                <p>{p}</p>
              </div>
            ))}
          </div>

          <h3 className="tp-h3 reveal">How the {L.daysN} days unfold</h3>
          <div className="tp-arc reveal">
            {ARC[lv].map(([when, h, p]) => (
              <div className="tp-arc-step" key={h}>
                <div className="tp-arc-when">{when}</div>
                <h4>{h}</h4>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <JsonLd data={pageSchema} />

      <div className="tp" id="tp">

        {/* ============================================================
            HERO
            ============================================================ */}
        <section className="c-hero">
          <img
            className="u-img"
            src="/img/adhiroha-yttc-014.webp"
            alt="Students practising together in the open-sided shala at Adhiroha, Rishikesh"
            width="1600" height="1064" loading="eager" fetchPriority="high"
          />
          <div dangerouslySetInnerHTML={{ __html: HEADER_HTML }} />
          <div dangerouslySetInnerHTML={{ __html: DRAWER_HTML }} />

          <div className="c-hero-inner">
            <div>
              <div className="c-crumbs">
                <a href="/">Home</a><i></i><a href="/#courses">Courses</a><i></i><span>Yoga Teacher Training in India</span>
              </div>
              <span className="kicker">Root · Heart · Crown</span>
              <h1>Yoga Teacher Training in India</h1>
              <p className="c-sub c-sub-lg">
                Three Yoga Alliance registered trainings at our ashram in Upper Tapovan, Rishikesh, on
                one continuous path. Two hundred hours to begin teaching, three hundred more to teach
                with authority, or all five hundred in a single stretch above the Ganga Ji.
              </p>
              <p className="c-sub c-sub-sm">
                Three Yoga Alliance registered trainings at our ashram in Rishikesh, on one path.
              </p>
              <div className="c-meta">
                <span><Lotus /> Yoga Alliance RYS 200 · 300 · 500</span>
                <span><Info /> Starts the 1st of every month</span>
                <span><Tick /> Residential, all meals included</span>
              </div>
              <div className="actions">
                <a className="btn-primary" href="/student-admission-panel/">Apply Now</a>
                <a className="btn-ghost" href="#the-path">See the three courses <Arrow /></a>
              </div>
            </div>

            {/* All three prices in the hero. The fee is the first thing people
                look for, and there is no reason to make them click for two
                thirds of the answer. */}
            <aside className="book-card">
              <span className="bc-pill">Starts the 1st of every month</span>
              <div className="bc-lab">Course fees · triple sharing</div>
              <div className="tp-hero-levels">
                {LEVELS.map((lv) => (
                  <a className={`tp-hero-level tp-lv${lv}`} href={`#c${lv}`} key={lv}>
                    <span className="tp-fig hl-n">{lv}</span>
                    <span className="hl-t">
                      <b>{LEVEL[lv].name}</b>
                      <i>{LEVEL[lv].days} · {LEVEL[lv].credential}</i>
                    </span>
                    <span className="hl-p">&euro;{LEVEL[lv].triple}</span>
                  </a>
                ))}
              </div>
              <a className="btn-primary" href="/student-admission-panel/">Apply Now</a>
              <div className="bc-note">
                <Info />
                Double sharing from &euro;1650. A registration fee reserves your seat and is always part
                of the total, never an extra charge.
              </div>
            </aside>
          </div>
        </section>

        {/* ============================================================
            THE LADDER
            ============================================================ */}
        <section className="tp-sec tp-ladder" id="the-path">
          <div className="tp-wrap">
            <div className="tp-head reveal">
              <span className="tp-eyebrow">The path, to scale</span>
              <h2 className="tp-h2 wide">Five hundred hours, and where each course sits on them</h2>
              <p className="tp-p">
                The three trainings are not three separate products. They are one path measured out in
                hours. The 200 hour covers the first stretch of it, the 300 hour covers the rest, and the
                500 hour walks the whole thing in one go. If you are new to teacher training, the answer
                is almost always the 200 hour.
              </p>
            </div>

            <div className="tp-axis reveal" aria-hidden="true">
              <span className="a0"><i></i><b>0 hrs</b></span>
              <span className="a2"><i></i><b>200</b></span>
              <span className="a5"><i></i><b>500 hrs</b></span>
            </div>

            <div className="tp-runs reveal">
              {LEVELS.map((lv) => {
                const L = LEVEL[lv];
                return (
                  <a className={`tp-run tp-lv${lv}`} data-run={lv} href={`#c${lv}`} key={lv}>
                    <span className="tp-bar">
                      {lv === "300" && (
                        <span className="tp-prior">
                          <span>Your existing 200 hour, from us or any other school</span>
                        </span>
                      )}
                      <span className="tp-fill">
                        <span className="tp-fig tp-run-n">{lv}</span>
                        <span className="tp-run-t">
                          <b>{L.name}</b>
                          <i>{L.runLine}</i>
                        </span>
                        <span className="tp-run-meta">
                          <b>&euro;{L.triple}</b>
                          {L.days} · {L.credential}
                        </span>
                      </span>
                    </span>
                    <span className="tp-run-under">
                      <b>{lv} hour · {L.name}</b>
                      <i>{L.days} · &euro;{L.triple}</i>
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="tp-ladder-cap reveal">
              <span>The 300 hour cannot start at zero, and the picture says so before we have to.</span>
            </div>
          </div>
        </section>

        {/* ============================================================
            THE THREE COURSES, IN FULL
            ============================================================ */}
        {LEVELS.map((lv, i) => <CourseSection lv={lv} index={i} key={lv} />)}

        {/* ============================================================
            BATCH DATES — one table with a column per course.
            ============================================================ */}
        <section className="tp-sec tp-cream" id="dates">
          <div className="tp-wrap">
            <div className="tp-head reveal">
              <span className="tp-eyebrow">When you can come</span>
              <h2 className="tp-h2 wide">Upcoming batches, the next twelve months</h2>
              <p className="tp-p">
                Every course begins on the 1st of the month, whichever level you take, and you arrive on
                the 30th or 31st of the month before. The nearest batches fill first.
              </p>
            </div>
            <div className="tp-dates reveal">
              <div className="tp-dates-scroll">
                <table className="tp-table">
                  <caption className="tp-sr">Upcoming yoga teacher training batch dates at Adhiroha, Rishikesh</caption>
                  <thead>
                    <tr>
                      <th scope="col">Batch</th>
                      <th scope="col">200 hour</th>
                      <th scope="col">300 hour</th>
                      <th scope="col">500 hour</th>
                      <th scope="col">Seats</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody id="tp-dates-body"></tbody>
                </table>
              </div>
              <p className="tp-dates-note">
                <Info /> Fees are &euro;1275 for the 200 hour, &euro;1500 for the 300 and &euro;2790 for
                the 500, triple sharing and all-inclusive.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            THE SPINE
            ============================================================ */}
        <section className="tp-spine">
          <div className="tp-wrap">
            <div className="tp-spine-rule reveal" aria-hidden="true">
              <i></i><Lotus /><i></i>
            </div>
            <h2 className="reveal">From here on, all three courses are the same</h2>
            <p className="reveal">
              The same shala, the same teachers, the same kitchen, the same early mornings and the same
              two excursions. The level decides how long you stay and what you study. It does not decide
              how you live while you are here.
            </p>
            <div className="tp-spine-tags reveal">
              <span>Same ashram</span><span>Same faculty</span><span>Same three meals</span>
              <span>Same daily rhythm</span><span>Same excursions</span><span>Same certificate body</span>
            </div>
          </div>
        </section>

        {/* ============================================================
            THE DAY
            ============================================================ */}
        <section className="tp-sec" id="a-day">
          <div className="tp-wrap">
            <div className="tp-day-grid">
              <div className="reveal">
                <span className="tp-eyebrow">A day in the life</span>
                <h2 className="tp-h2">The rhythm of a course day</h2>
                <p className="tp-p">
                  It looks like a lot written down, and the first two days can feel that way. Then
                  something clicks, and by the end of the first week the rhythm carries you rather than
                  the other way round.
                </p>
                <div className="tp-hours">
                  {DAY.map((row, i) =>
                    row[0] === "part" ? (
                      <div className="tp-day-part" key={i}>{row[1]}</div>
                    ) : (
                      <div className="tp-hour" key={i}>
                        <time>{row[0]}</time>
                        <p><b>{row[1]}</b> — {row[2]}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="tp-day-media reveal">
                <figure><img src="/gallery/yoga-shala/yoga-shala-004.webp" alt="The shala at first light, before the morning practice" loading="lazy" /></figure>
                <figure><img src="/gallery/yoga/yoga-020.webp" alt="A student in a guided morning asana practice" loading="lazy" /></figure>
                <figure><img src="/gallery/dinning/dinning-001.webp" alt="Breakfast served in the open-air dining hall" loading="lazy" /></figure>
                <figure><img src="/gallery/sound-healing/sound-007.webp" alt="Students in candlelit evening meditation" loading="lazy" /></figure>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            THE ASHRAM
            ============================================================ */}
        <section className="tp-sec tp-paper" id="ashram">
          <div className="tp-wrap">
            <div className="tp-head reveal">
              <span className="tp-eyebrow">Where it happens</span>
              <h2 className="tp-h2 wide">Three acres in Upper Tapovan, a kilometre above the town</h2>
              <p className="tp-p">
                A practice takes on the shape of the space it happens in. The ashram spreads across three
                quiet acres beside a flowing brook, ringed by hills and forest, and every corner of it
                exists for a reason.
              </p>
            </div>

            {SPACES.map((s, i) => (
              <div className={`tp-space${i === 0 ? " first" : ""}${i % 2 ? " flip" : ""}`} key={s.tab}>
                <div className="tp-space-shots reveal">
                  {s.shots.map(([src, alt]) => (
                    <figure key={src}><img src={src} alt={alt} loading="lazy" /></figure>
                  ))}
                </div>
                <div className="tp-space-body reveal">
                  <span className="tp-eyebrow">{s.tab}</span>
                  <h3 className="tp-h3">{s.h}</h3>
                  <p className="tp-p">{s.p}</p>
                  <div className="tp-chips">{s.chips.map((c) => <span key={c}>{c}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            ROOMS + FOOD
            ============================================================ */}
        <section className="tp-sec" id="stay">
          <div className="tp-wrap">
            <div className="tp-head reveal">
              <span className="tp-eyebrow">Sleeping and eating</span>
              <h2 className="tp-h2 wide">Your room, and three meals a day you did not have to think about</h2>
            </div>
            <div className="tp-two reveal">
              <div className="tp-half">
                <div className="tp-half-img">
                  <img src="/gallery/accommodation/acco-001.webp" alt="A bright twin room with warm curtains and a mountain view" loading="lazy" />
                </div>
                <div className="tp-half-body">
                  <h3 className="tp-h3">Where you will stay</h3>
                  <p className="tp-p">
                    Clean, airy rooms full of natural light, most looking straight out at the mountains.
                    Students often say it was the best they had slept in years.
                  </p>
                  <ul className="tp-ticks">
                    <li><Tick /> Ensuite washrooms with dependable hot water, around the clock</li>
                    <li><Tick /> Simple, peaceful interiors that make it easy to rest and sit quietly</li>
                    <li><Tick /> High-speed WiFi and safe RO drinking water throughout the ashram</li>
                    <li><Tick /> Twin or triple sharing for the whole course, so you are never quite alone</li>
                  </ul>
                </div>
              </div>
              <div className="tp-half">
                <div className="tp-half-img">
                  <img src="/img/remote/img_food-thali-1.webp" alt="A fresh sattvic thali of rice, dal, vegetables and salad" loading="lazy" />
                </div>
                <div className="tp-half-body">
                  <h3 className="tp-h3">What you will eat</h3>
                  <p className="tp-p">
                    Three vegetarian meals a day, cooked the sattvic and Ayurvedic way, built around what
                    a body under a full practice load actually needs. Do not mistake simple for plain.
                  </p>
                  <ul className="tp-ticks">
                    <li><Tick /> Ingredients fresh from local organic farms, prepared without fuss</li>
                    <li><Tick /> Different dishes every day, so it never gets boring</li>
                    <li><Tick /> Herbal teas, detox water and fresh fruit in the mornings</li>
                    <li><Tick /> Desserts that have a small and vocal fan club</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            TEACHERS
            ============================================================ */}
        <section className="tp-sec tp-cream" id="teachers">
          <div className="tp-wrap">
            <div className="tp-head reveal">
              <span className="tp-eyebrow">Ten acharyas</span>
              <h2 className="tp-h2 wide">The people at the front of the room</h2>
              <p className="tp-p">
                A school is only ever as good as the people teaching in it. We never hand a whole course
                to one person, and we never put an intern at the front — every subject is led by someone
                who has lived it for years. You can read more about each of them on the{" "}
                <a href="/yoga-teachers-in-india/">yoga teachers page</a>.
              </p>
            </div>
          </div>
          <div className="tp-wrap">
            <div className="tp-rail reveal">
              {TEACHERS.map(([name, subject, years, img]) => (
                <div className="tp-teacher" key={name}>
                  <div className="tp-teacher-img"><img src={img} alt={`${name}, ${subject} teacher at Adhiroha`} loading="lazy" /></div>
                  <b>{name}</b>
                  <span className="subj">{subject}</span>
                  <span className="yrs">{years}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            EXCURSIONS
            ============================================================ */}
        <section className="tp-sec" id="excursions">
          <div className="tp-wrap">
            <div className="tp-head reveal">
              <span className="tp-eyebrow">Beyond the mat</span>
              <h2 className="tp-h2 wide">Two excursions, and the rituals in between</h2>
              <p className="tp-p">
                A real education never stops at the edge of the shala. Woven through every course are two
                guided excursions and a handful of small rituals that tie you to the culture around you.
                For many students these turn out to be the memories they hold onto longest.
              </p>
            </div>
            <div className="tp-cards reveal">
              {EXCURSIONS.map(([when, h, p, img, alt]) => (
                <article className="tp-card" key={h}>
                  <div className="tp-card-img"><img src={img} alt={alt} loading="lazy" /></div>
                  <div className="tp-card-body">
                    <div className="tp-card-when">{when}</div>
                    <h3>{h}</h3>
                    <p>{p}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            CERTIFICATE
            ============================================================ */}
        <section className="tp-sec tp-paper" id="certificate">
          <div className="tp-wrap">
            <div className="tp-head reveal">
              <span className="tp-eyebrow">What you earn</span>
              <h2 className="tp-h2 wide">One certificate, carrying both recognitions</h2>
              <p className="tp-p">
                Adhiroha is a Registered Yoga School with Yoga Alliance at all three levels, and
                accredited by the Yoga Certification Board under the Ministry of Ayush. Finish your
                course and you leave with a single certificate carrying both, which is all a studio in
                Berlin, a gym in Melbourne or a retreat in Costa Rica needs to see. To receive it you
                need a minimum of 90% attendance and a genuine effort through the final assessment.
                Meet that and the qualification is yours for good, with no renewal fee and no expiry.
              </p>
            </div>
            <div className="tp-certs reveal">
              {LEVELS.map((lv) => (
                <div className={`tp-cert-card tp-lv${lv}`} key={lv}>
                  <img src={`/img/RYS${lv}.png`} alt={`Yoga Alliance Registered Yoga School RYS ${lv}`} width="720" height="720" loading="lazy" />
                  <div className="school">Adhiroha Yoga School · Rishikesh</div>
                  <h3>Adhiroha {lv} hour certificate</h3>
                  <p>Meet the attendance requirement and you may register with Yoga Alliance as an {LEVEL[lv].credential}.</p>
                </div>
              ))}
            </div>
            <div className="tp-cert-marks reveal">
              <span>
                <img src="/img/logo-ministry-of-ayush.webp" alt="Ministry of Ayush" width="200" height="200" loading="lazy" />
                Ministry of Ayush · Yoga Certification Board
              </span>
              <a href="https://app.yogaalliance.org/schoolpublicprofile?id=0013g000002pk6NAAQ&amp;sid=0013g000002npW5AAI&amp;name=Adhiroha" target="_blank" rel="noopener">
                <img src="/img/logo-yoga-alliance.webp" alt="Yoga Alliance" width="200" height="200" loading="lazy" />
                Verify Adhiroha on the Yoga Alliance register
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================
            VIDEOS
            ============================================================ */}
        <section className="tp-sec tp-dark" id="videos">
          <div className="tp-wrap">
            <div className="tp-head reveal">
              <span className="tp-eyebrow">Hear it from them</span>
              <h2 className="tp-h2 wide">Student stories, on camera</h2>
              <p className="tp-p">
                Unscripted and unedited, students talking about the course in their own words, straight
                from the Adhiroha YouTube channel. Pick a story to play it.
              </p>
            </div>

            <div className="tp-vgrid reveal">
              <div className="tp-vmain" id="tp-vmain" data-vid={VIDEOS[0]} role="button" tabIndex={0} aria-label="Play student review 01">
                <img id="tp-vthumb" src={`https://i.ytimg.com/vi/${VIDEOS[0]}/maxresdefault.jpg`} alt="Student review of the yoga teacher training at Adhiroha" />
                <span className="tp-vplay">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><polygon points="7 4.5 20 12 7 19.5" /></svg>
                </span>
                <span className="tp-vlab" id="tp-vlab">Student review · 01</span>
              </div>
              <div className="tp-vlist">
                {VIDEOS.map((id, i) => (
                  <button key={id} type="button" className="tp-vrow" data-vid={id} aria-current={i === 0}>
                    <img src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`} alt="" loading="lazy" />
                    <span>
                      <b>Student review · {String(i + 1).padStart(2, "0")}</b>
                      <i>Graduate · Rishikesh</i>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            VOICES
            ============================================================ */}
        <section className="tp-sec tp-cream" id="voices">
          <div className="tp-wrap">
            <div className="tp-head mid reveal">
              <span className="tp-eyebrow">In their words</span>
              <h2 className="tp-h2 wide">What students say once they are home</h2>
            </div>

            <div className="tp-ratings reveal">
              <div className="tp-rating">
                <svg width="26" height="26" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" /><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" /><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" /></svg>
                <b>4.9</b><span>Google reviews</span>
              </div>
              <div className="tp-rating">
                <img src="/img/RYS200.png" alt="" width="720" height="720" loading="lazy" />
                <b>4.5</b><span>Yoga Alliance reviews</span>
              </div>
              <div className="tp-rating">
                <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11.2" fill="#00AA6C" /><circle cx="7.7" cy="12" r="3.5" fill="#fff" /><circle cx="16.3" cy="12" r="3.5" fill="#fff" /><circle cx="7.7" cy="12" r="1.5" fill="#00AA6C" /><circle cx="16.3" cy="12" r="1.5" fill="#00AA6C" /></svg>
                <b>4.3</b><span>Tripadvisor reviews</span>
              </div>
            </div>

            <div className="tp-quotes reveal">
              {VOICES.map(([name, place, quote]) => (
                <figure className="tp-quote" key={name}>
                  <div className="tp-quote-mark" aria-hidden="true">&ldquo;</div>
                  <p>{quote}</p>
                  <figcaption className="tp-quote-who">
                    <span className="tp-avatar" aria-hidden="true">{name[0]}</span>
                    <span>
                      <b>{name}</b>
                      <i>{place}</i>
                    </span>
                    <span className="tp-quote-stars" aria-label="Five stars">
                      <Star /><Star /><Star /><Star /><Star />
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            GALLERY
            ============================================================ */}
        <section className="tp-sec tight" id="gallery">
          <div className="tp-wrap">
            <div className="tp-head reveal">
              <span className="tp-eyebrow">The ashram, month by month</span>
              <h2 className="tp-h2 wide">What it actually looks like</h2>
              <p className="tp-p">
                A few frames from recent batches. There are hundreds more in the{" "}
                <a href="/yoga-gallery-india/">yoga gallery</a>.
              </p>
            </div>
            <div className="tp-mosaic reveal">
              {MOSAIC.map(([src, alt, cls]) => (
                <figure className={cls} key={src}><img src={src} alt={alt} loading="lazy" /></figure>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            INCLUDED
            ============================================================ */}
        <section className="tp-sec tp-paper" id="included">
          <div className="tp-wrap">
            <div className="tp-head reveal">
              <span className="tp-eyebrow">The fee, itemised</span>
              <h2 className="tp-h2 wide">What is covered, and what is not</h2>
              <p className="tp-p">
                The same list applies at every level. From the moment you land, the practical worries are
                already handled.
              </p>
            </div>
            <div className="tp-incl reveal">
              <div>
                <h3 className="tp-h3">Included in the fee</h3>
                <ul>{INCLUDED.map((t) => <li className="yes" key={t}><Tick />{t}</li>)}</ul>
              </div>
              <div>
                <h3 className="tp-h3">Not included</h3>
                <ul>{NOT_INCLUDED.map((t) => <li className="no" key={t}><Dash />{t}</li>)}</ul>
                <p className="note">We would rather say so plainly than bury it. Beyond this, what you see is what you pay.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            FAQ
            ============================================================ */}
        <section className="tp-sec" id="faq">
          <div className="tp-wrap">
            <div className="tp-head mid reveal">
              <span className="tp-eyebrow">Before you book</span>
              <h2 className="tp-h2 wide">Questions people ask us first</h2>
            </div>
            <div className="tp-faq reveal">
              {FAQS.map(([q, a], i) => (
                <details key={q} open={i < 3}>
                  <summary><h3>{q}</h3></summary>
                  <div className="ans"><p>{a}</p></div>
                </details>
              ))}
            </div>
            <p className="tp-faq-more reveal">
              More answers on the <a href="/faqs-of-yoga-school-in-india/">full FAQ page</a>, or write to
              us and a real person will reply.
            </p>
          </div>
        </section>

        {/* ============================================================
            APPLY
            ============================================================ */}
        <section className="tp-apply" id="apply">
          <img src="/gallery/ashram/ashram-006.webp" alt="" aria-hidden="true" loading="lazy" />
          <div className="tp-wrap">
            <div className="tp-apply-grid">
              <div className="reveal">
                <span className="tp-eyebrow">The next batch starts on the 1st</span>
                <h2>Pick your level, and we will hold you a seat</h2>
                <p>
                  Every course begins on the 1st of the month, and you arrive on the 30th or 31st before.
                  If you are still deciding between levels, write to us — we will tell you honestly which
                  one fits, even when it is the cheaper one.
                </p>
                <div className="tp-apply-actions">
                  <a className="btn-primary" href="/student-admission-panel/">Apply now</a>
                  <a className="btn-ghost" href="/contact-us/">Ask us a question <Arrow /></a>
                </div>
              </div>

              <div className="tp-apply-sum reveal">
                <div className="lab">The three courses</div>
                {LEVELS.map((lv) => (
                  <a className={`tp-apply-row tp-lv${lv}`} href={COURSE_URL[lv]} key={lv}>
                    <span className="tp-fig">{lv}</span>
                    <span>
                      <b>{LEVEL[lv].name}</b>
                      <i>{LEVEL[lv].days} · {LEVEL[lv].credential}</i>
                    </span>
                    <span className="p">&euro;{LEVEL[lv].triple}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            KEEP EXPLORING — the internal-link band the site uses on every
            page. Classes come from adhiroha.min.css.
            ============================================================ */}
        <section className="rl-sec" aria-labelledby="rl-h">
          <div className="wrap">
            <span className="kicker">Keep Exploring</span>
            <h2 className="sec-h rl-h" id="rl-h">Read Each Course in Full</h2>
            <p className="body-p rl-intro">
              This page is the overview. Each course has its own page with the full day-by-day syllabus,
              fees and dates.
            </p>
            <ul className="rl-grid">
              <li className="rl-card">
                <a className="rl-link" href={COURSE_URL[200]}>200 Hour Yoga Teacher Training in Rishikesh</a>
                <p className="rl-note">The 24-day RYT 200 foundation, and the course most students begin with.</p>
              </li>
              <li className="rl-card">
                <a className="rl-link" href={COURSE_URL[300]}>300 Hour Yoga Teacher Training in Rishikesh</a>
                <p className="rl-note">The advanced level for teachers who already hold a 200 hour certificate.</p>
              </li>
              <li className="rl-card">
                <a className="rl-link" href={COURSE_URL[500]}>500 Hour Yoga Teacher Training in Rishikesh</a>
                <p className="rl-note">Both levels in a single two-month immersion, ending at the RYT 500 standard.</p>
              </li>
              <li className="rl-card">
                <a className="rl-link" href="/about-us/">Why Adhiroha Is the Best Yoga School in Rishikesh</a>
                <p className="rl-note">The founder&rsquo;s letter, the accreditations, and what the ashram is actually like.</p>
              </li>
            </ul>
          </div>
        </section>
      </div>

      <div dangerouslySetInnerHTML={{ __html: FOOTER_HTML }} />
      <SectionNav sections={sections} />
      <PageScripts code={scripts} />
    </>
  );
}
