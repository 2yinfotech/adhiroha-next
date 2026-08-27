import "./styles.css";
import LpEnquiryModal from "@/components/LpEnquiryModal";
import LpVideos from "@/components/LpVideos";
import LpCarousel from "@/components/LpCarousel";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Icon, GoogleMark } from "./icons";

// Paid-campaign landing page for the teacher trainings. One goal: an enquiry.
//
// Rules it keeps, and why:
//   - No navigation. Nothing on this page leads anywhere except the form, the
//     phone number and WhatsApp — all three of which are conversions.
//   - No fees anywhere. Price is the conversation we want to have by reply,
//     once someone has told us their month and their course.
//   - noindex (set on the layout) so it never competes with the course pages.
//
// Every fact is taken from the live site: the accreditations, the schedule
// times, what the ashram has, the review counts and the six graduate videos.
export const metadata = {
  title: "Yoga Teacher Training in Rishikesh, India | Adhiroha Yoga School",
  description:
    "Yoga Alliance registered 200, 300 and 500 hour teacher training in a three-acre Rishikesh ashram. Ministry of Ayush accredited. Ask for the next available dates.",
  alternates: { canonical: "/200-hour-yoga-teacher-training-rishikesh-apply/" },
};

/* Recognitions the school actually holds. The first three have logos on the
   homepage; the Yoga Certification Board sits under the Ministry of Ayush and
   is named on the course pages, so it is written rather than badged. */
const CREDS = [
  ["/img/logo-yoga-alliance.webp", "Yoga Alliance, USA", "RYS 200 · 300 · 500, since 2019"],
  ["/img/logo-ministry-of-ayush.webp", "Ministry of Ayush", "Government of India"],
  ["/img/logo-uttarakhand-tourism.webp", "Uttarakhand Tourism", "Acknowledged by the state"],
];

const USPS = [
  ["teacher", "One Acharya per subject"],
  ["ashram", "Three acres, not a rented hall"],
  ["lotus", "Hatha, Ashtanga & Yin"],
  ["seal", "A certificate that travels"],
];

const COURSES = [
  {
    hours: "200",
    name: "Hour Yoga Teacher Training",
    tag: "The foundation",
    img: "/gallery/yoga/yoga-041.webp",
    alt: "Students in a guided morning asana class in the Adhiroha yoga shala",
    for: "Your first teacher training. No teaching experience needed.",
    points: ["24 days at the ashram", "Hatha, Ashtanga Vinyasa & Yin", "Teaching practicum from week two", "RYT 200 on completion"],
  },
  {
    hours: "300",
    name: "Hour Yoga Teacher Training",
    tag: "Going deeper",
    img: "/gallery/yoga/yoga-012.webp",
    alt: "An adjustment and alignment class at Adhiroha Yoga School, Rishikesh",
    for: "For teachers who already hold a 200 hour certificate.",
    points: ["Advanced asana and adjustment", "Deeper pranayama and kriya", "Anatomy applied to real bodies", "RYT 500 once combined"],
  },
  {
    hours: "500",
    name: "Hour Yoga Teacher Training",
    tag: "The complete path",
    img: "/gallery/certification/certification-002.webp",
    alt: "A graduating group with their yoga teacher training certificates",
    for: "Both levels in one stay, without going home in between.",
    points: ["200 and 300 back to back", "One continuous immersion", "The full syllabus, start to finish", "RYT 500 in a single trip"],
  },
];

/* The ashram is the reason people choose this school over a studio in town, so
   it gets the photographs rather than a paragraph. */
const CAROUSEL = [
  { src: "/gallery/ashram/ashram-006.webp", alt: "The Adhiroha ashram from the air, set in forested hills above Rishikesh", cap: "Three acres above Upper Tapovan" },
  { src: "/gallery/yoga-shala/yoga-shala-005.webp", alt: "The open-sided yoga shala with mats laid out for a class", cap: "The shala, open on three sides" },
  { src: "/gallery/ashram/ashram-016.webp", alt: "The swimming pool in the ashram gardens", cap: "The pool, for the hours in between" },
  { src: "/gallery/accommodation/acco-002.webp", alt: "A clean twin room with mountain light at the ashram", cap: "Twin and triple rooms on site" },
  { src: "/gallery/dinning/dinning-005.webp", alt: "Fresh vegetarian food served buffet style in the ashram dining hall", cap: "Three sattvic meals a day" },
  { src: "/gallery/ashram/ashram-018.webp", alt: "A carved Buddha under a wooden pavilion in the ashram garden", cap: "Quiet corners, everywhere" },
  { src: "/gallery/excursion/excursion-011.webp", alt: "Students practising yoga on the Ganga ghat with Rishikesh behind them", cap: "Practice on the Ganga ghat" },
  { src: "/gallery/sound-healing/sound-005.webp", alt: "A candlelit sound healing session", cap: "Sound healing and kirtan evenings" },
  { src: "/gallery/ashram/ashram-003.webp", alt: "A stone path through the landscaped ashram gardens", cap: "Gardens you actually walk in" },
  { src: "/gallery/yoga-shala/yoga-shala-004.webp", alt: "The wooden floor of the yoga shala looking out onto forest", cap: "A sprung floor, forest on every side" },
];

/* Framed as what to check rather than as accusations: these are the questions
   worth asking any school in Rishikesh, and our answer to each. */
const COMPARE = [
  ["Who teaches each subject", "A separate Yoga Acharya per subject, 10–20 years each", "Often one or two teachers covering everything"],
  ["Where you practise", "Our own three-acre ashram and sprung-floor shala", "Frequently a rented hall or a hotel floor"],
  ["Where you sleep", "On the ashram, a walk from the shala", "Sometimes a guesthouse across town"],
  ["What is recognised", "Yoga Alliance RYS and Ministry of Ayush accreditation", "Yoga Alliance registration alone is common"],
  ["Food", "Three sattvic vegetarian meals a day, included", "Often a fixed allowance or eat-out"],
  ["Getting there", "Dehradun airport pickup included", "Usually arranged and paid for by you"],
  ["Beyond the mat", "Ganga aarti, kirtan, sound healing, two guided excursions", "Usually charged as extras, if offered"],
];

const DAY = [
  ["Morning", "5:45 – 8:45", [["5:45", "Shatkarma, gentle cleansing as the light comes up"], ["6:00", "Pranayama and breathwork, while the air is cool"], ["7:15", "A strong Hatha practice, to wake the body properly"], ["8:45", "Breakfast, warm and simple, eaten without hurry"]]],
  ["Mid-day", "9:30 – 13:00", [["9:30", "Philosophy and ethics, discussion more than lecture"], ["11:00", "Yin, and alignment work to refine the postures"], ["13:00", "Lunch, then a real rest through the warm hours"]]],
  ["Afternoon", "14:45 – 16:15", [["14:45", "Anatomy, the science behind what you practise"], ["16:15", "Ashtanga and Vinyasa flow as the day softens"]]],
  ["Evening", "18:00 – 19:30", [["18:00", "Bhakti chanting, then meditation"], ["19:30", "Dinner, and an early night, because dawn comes early"]]],
];

const INCLUDED = [
  ["plane", "Airport pickup from Dehradun"],
  ["bed", "Your room on the ashram, for the whole course"],
  ["bowl", "Three vegetarian meals a day, herbal tea and RO water"],
  ["book", "All study materials and a welcome kit"],
  ["river", "A practice on the Ganga ghat and a sound healing session"],
  ["path", "Two guided excursions and a kirtan evening"],
  ["wifi", "Unlimited high-speed WiFi across the ashram"],
];

const RATINGS = [["Google", "4.9", "383 reviews"], ["Yoga Alliance", "4.5", "20 reviews"], ["Tripadvisor", "4.3", "13 reviews"]];

const VIDEOS = [
  { id: "34JbOEe7Xn8", label: "A graduate on the 200 hour course" },
  { id: "3a0OhN0uC0U", label: "What the first week felt like" },
  { id: "-tB_WnA0jAo", label: "On the teachers and the shala" },
  { id: "V2mporw4k8Q", label: "Arriving with no teaching experience" },
  { id: "kfngfAxnIlg", label: "Life at the ashram, day to day" },
  { id: "TJsr8gATo9k", label: "What changed by day twenty-four" },
];

const FAQ = [
  ["Do I need to be advanced, or very flexible?",
   "No. Most people arrive having never taught a class, and plenty have only ever practised at home from videos. The course is built for beginners and gentle intermediates. It assumes nothing except that you turn up each morning and do the work."],
  ["What does the fee include, and how much is it?",
   "The fee covers the whole stay — your room, three meals a day, all study materials, the excursions and airport pickup. Flights, visa and personal spending are yours. Tell us your course and month in the form and we will send the current fee with the dates that are still open."],
  ["Where do I fly to?",
   "Dehradun is the nearest airport and our pickup is waiting there. Delhi is about 250 km away if the fare works out better for you."],
  ["Is the certificate recognised outside India?",
   "Yes. Adhiroha is a Registered Yoga School with Yoga Alliance and accredited by the Yoga Certification Board under the Ministry of Ayush. You leave with one certificate carrying both, which is what a studio anywhere will want to see."],
  ["When do batches run, and how do I hold a place?",
   "Every month, from the 1st to the 24th, arriving on the 30th or 31st of the month before. A registration fee reserves your seat and comes off the total; the balance is paid when you arrive."],
  ["Can I do the 300 hour if I trained somewhere else?",
   "Yes. The 300 hour is open to anyone holding a 200 hour certificate from any Yoga Alliance registered school. Mention where you trained in the form and we will confirm."],
];

const MODAL = {
  label: "Ask about the fees and details",
  sub: "Tell us where to write and we will send the fee, the dates still open and anything else you want to know — usually the same day.",
  points: [
    { icon: <Icon name="seal" />, text: "Yoga Alliance registered · Ministry of Ayush accredited" },
    { icon: <Icon name="ashram" />, text: "Our own three-acre ashram, not a rented hall" },
    { icon: <Icon name="bowl" />, text: "Room, three meals a day and airport pickup included" },
    { icon: <Icon name="teacher" />, text: "A separate Acharya for every subject" },
  ],
};

export default function Page() {
  return (
    <main className="lp">
      {/* ═══════════ HERO ═══════════ */}
      {/* The header sits inside the hero and over the photograph: no bar, no
          navigation, nothing but the mark. */}
      <section className="lp-hero">
        <header className="lp-top">
          <img className="lp-logo" src="/img/adhiroha-logo-14.png" alt="Adhiroha Yoga School" width="500" height="500" />
        </header>
        <img className="lp-hero-bg" src="/gallery/excursion/excursion-021.webp"
             alt="A student meditating on the rocks beside the Ganga at Rishikesh"
             width="1600" height="1067" fetchPriority="high" />
        <div className="lp-hero-in">
          <p className="lp-eyebrow">Upper Tapovan, Rishikesh · On the Ganga</p>
          <h1 className="lp-h1">
            Authentic Yoga Teacher<br />Training in Rishikesh
          </h1>
          <p className="lp-lede">
            200, 300 and 500 hour trainings in our own three-acre ashram above the river.
            Yoga Alliance registered, Ministry of Ayush accredited, and taught by Acharyas
            who have given their lives to this.
          </p>

          <ul className="lp-usps">
            {USPS.map(([icon, h]) => (
              <li key={h}>
                <span className="lp-usp-ic"><Icon name={icon} /></span>
                <span className="lp-usp-h">{h}</span>
              </li>
            ))}
          </ul>

          <div className="lp-hero-act" id="enquire">
            <LpEnquiryModal {...MODAL} />
            <p className="lp-hero-rating">
              <GoogleMark />
              <b>4.9</b>
              <span className="lp-stars" aria-hidden="true">★★★★★</span>
              <span>from 383 Google reviews</span>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ CREDENTIALS ═══════════ */}
      <section className="lp-creds">
        <div className="lp-in">
          <p className="lp-creds-lead">Registered, accredited and acknowledged</p>
          <ul className="lp-cred-row">
            {CREDS.map(([src, name, sub]) => (
              <li key={name}>
                <img src={src} alt={name} width="200" height="200" loading="lazy" />
                <span><b>{name}</b><em>{sub}</em></span>
              </li>
            ))}
            <li className="lp-cred-text">
              <span className="lp-cred-seal"><Icon name="seal" /></span>
              <span><b>Yoga Certification Board</b><em>Accredited under the Ministry of Ayush</em></span>
            </li>
          </ul>
        </div>
      </section>

      {/* ═══════════ COURSES ═══════════ */}
      <section className="lp-band lp-courses">
        <div className="lp-in">
          <div className="lp-sechead">
            <p className="lp-kick">Three trainings, one ashram</p>
            <h2>Choose where you are on the path</h2>
            <p className="lp-sub">
              Every course runs from the 1st to the 24th, in the same shala, with the same
              teachers. The only difference is how far you are already along.
            </p>
          </div>

          <ul className="lp-course-grid">
            {COURSES.map((c) => (
              <li key={c.hours} className="lp-course">
                <figure>
                  <img src={c.img} alt={c.alt} loading="lazy" width="900" height="600" />
                  <figcaption>{c.tag}</figcaption>
                </figure>
                <div className="lp-course-body">
                  <h3><b>{c.hours}</b> {c.name}</h3>
                  <p className="lp-course-for">{c.for}</p>
                  <ul>
                    {c.points.map((p) => (
                      <li key={p}><Icon name="tick" />{p}</li>
                    ))}
                  </ul>
                  <a className="lp-course-cta" href="#enquire">Ask about this course</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════ THE ASHRAM — carousel ═══════════ */}
      <section className="lp-band lp-ashram">
        <div className="lp-in">
          <div className="lp-sechead">
            <p className="lp-kick">Why people choose us</p>
            <h2>The ashram is the course</h2>
            <p className="lp-sub">
              Most schools in Rishikesh rent a hall and send you across town to sleep. We
              built our own place, on three acres of forested hillside, and you live inside it
              for the whole training. It is the single biggest difference in how the days feel.
            </p>
          </div>
          <LpCarousel slides={CAROUSEL} />
        </div>
      </section>

      {/* ═══════════ COMPARISON ═══════════ */}
      <section className="lp-band lp-vs">
        <div className="lp-in">
          <div className="lp-sechead">
            <p className="lp-kick">Adhiroha vs other schools</p>
            <h2>Seven things worth asking any school</h2>
            <p className="lp-sub">
              Choosing a training from the other side of the world is hard. These are the
              questions that actually separate one school from another — ask them of anyone
              you are considering, including us.
            </p>
          </div>

          <div className="lp-vs-wrap">
            <table className="lp-vs-table">
              <thead>
                <tr>
                  <th scope="col">What to ask</th>
                  <th scope="col" className="lp-vs-us">Adhiroha</th>
                  <th scope="col">What you often find elsewhere</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([q, us, them]) => (
                  <tr key={q}>
                    <th scope="row">{q}</th>
                    <td className="lp-vs-us"><Icon name="tick" /><span>{us}</span></td>
                    <td className="lp-vs-them"><span>{them}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════ THE DAY ═══════════ */}
      <section className="lp-band lp-day">
        <div className="lp-in lp-day-grid">
          <figure className="lp-day-photo">
            <img src="/gallery/yoga/yoga-023.webp"
                 alt="A student meditating in the ashram garden with the hills behind"
                 loading="lazy" width="900" height="1100" />
          </figure>
          <div>
            <div className="lp-sechead lp-sechead-dark">
              <p className="lp-kick">The part nobody shows you</p>
              <h2>One day, 5:45 to lights out</h2>
              <p className="lp-sub">
                This is the timetable, not a sample of it. The first two mornings are a shock.
                By the end of week one the rhythm carries you rather than the other way round.
              </p>
            </div>
            <ol className="lp-rail">
              {DAY.map(([block, span, rows]) => (
                <li key={block}>
                  <div className="lp-rail-head">
                    <span className="lp-rail-name">{block}</span>
                    <span className="lp-rail-span">{span}</span>
                  </div>
                  <ul>
                    {rows.map(([t, what]) => (
                      <li key={t}><b>{t}</b><span>{what}</span></li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ═══════════ INCLUDED ═══════════ */}
      <section className="lp-band lp-incl">
        <div className="lp-in lp-incl-grid">
          <div>
            <div className="lp-sechead">
              <p className="lp-kick">Handled before you land</p>
              <h2>What the course covers</h2>
              <p className="lp-sub">
                From the moment you step off the plane, the practical worries are already
                someone else's job. Flights, visa and personal spending are yours; everything
                below is ours.
              </p>
            </div>
            <ul className="lp-incl-list">
              {INCLUDED.map(([icon, text]) => (
                <li key={text}><span className="lp-incl-ic"><Icon name={icon} /></span>{text}</li>
              ))}
            </ul>
          </div>
          <div className="lp-incl-pics">
            <figure><img src="/gallery/dinning/dinning-002.webp" alt="Fresh vegetarian food being served in the ashram dining hall" loading="lazy" width="800" height="600" /></figure>
            <figure><img src="/gallery/accommodation/acco-005.webp" alt="A twin room at the ashram with warm evening light" loading="lazy" width="800" height="600" /></figure>
            <figure><img src="/gallery/excursion/excursion-026.webp" alt="Students practising together on the sand beside the Ganga" loading="lazy" width="800" height="600" /></figure>
            <figure><img src="/gallery/sound-healing/sound-003.webp" alt="A sound healing session with singing bowls" loading="lazy" width="800" height="600" /></figure>
          </div>
        </div>
      </section>

      {/* ═══════════ PROOF ═══════════ */}
      <section className="lp-band lp-proof">
        <div className="lp-in">
          <div className="lp-sechead">
            <p className="lp-kick">From the people who did it</p>
            <h2>Graduates, in their own words</h2>
          </div>

          <div className="lp-ratings">
            {RATINGS.map(([where, score, count]) => (
              <div key={where} className="lp-rating">
                {where === "Google" ? <GoogleMark /> : <span className="lp-rating-dot" aria-hidden="true" />}
                <b>{score}</b>
                <span className="lp-stars" aria-hidden="true">★★★★★</span>
                <span className="lp-rating-w">{where}</span>
                <span className="lp-rating-c">{count}</span>
              </div>
            ))}
          </div>

          <LpVideos videos={VIDEOS} />

          <blockquote className="lp-quote">
            <figure>
              <img src="/gallery/excursion/excursion-013.webp" alt="A student on the riverbank at Rishikesh" loading="lazy" width="400" height="400" />
            </figure>
            <div>
              <p>
                “The warm sun deepened my poses, the natural spring reminded me to stay
                hydrated, and the fresh breeze gave a turn to my perspective, while a small
                butterfly in the garden invited me to learn how to focus on something small.”
              </p>
              <cite>A graduate, written after going home</cite>
            </div>
          </blockquote>
        </div>
      </section>

      {/* ═══════════ CLOSE ═══════════ */}
      <section className="lp-band lp-close">
        <div className="lp-in lp-close-grid">
          <div>
            <div className="lp-sechead">
              <p className="lp-kick">Dates and holding a place</p>
              <h2>How it works</h2>
            </div>
            <ol className="lp-steps">
              <li><b>Batches run monthly</b><span>The 1st to the 24th. You arrive on the 30th or 31st of the month before.</span></li>
              <li><b>Tell us your course and month</b><span>We reply with the dates still open and the current fee — the popular months fill several batches ahead.</span></li>
              <li><b>A registration fee holds the seat</b><span>It comes off the total. The balance is paid on arrival at the ashram.</span></li>
            </ol>
            <LpEnquiryModal {...MODAL} />
            <p className="lp-cta-note">
              Or talk to us now — <a href="tel:+919999048900">+91 9999 048 900</a> · India{" "}
              <a href="tel:+916397328721">+91 6397 328 721</a>
            </p>
          </div>

          <div className="lp-faq">
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}<Icon name="chev" /></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="lp-foot">
        <img src="/img/adhiroha-logo-14.png" alt="" width="500" height="500" />
        <p>Adhiroha Yoga School · Upper Tapovan, Rishikesh, Uttarakhand, India</p>
        <p>info@adhiroha.com · +91 9999 048 900</p>
      </footer>

      {/* Both are conversions, not exits: WhatsApp is how most enquiries from
          this campaign actually arrive, and the bar puts the form one tap away
          once someone has scrolled past it. */}
      <FloatingWhatsApp />
      <a className="lp-sticky" href="#enquire">
        <b>Ask about the fees</b>
        <span>Dates &amp; details by reply</span>
      </a>
    </main>
  );
}
