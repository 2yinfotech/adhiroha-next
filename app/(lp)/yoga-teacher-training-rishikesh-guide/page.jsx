import "./styles.css";
import LeadForm from "@/components/LeadForm";
import { Kicker, Sunburst, Tick } from "@/components/lp-parts";

// Google Ads search landing page. One goal: get the guide requested.
//
// Rules this page follows, and the reasons they matter here:
//   - No pricing anywhere. The fee conversation happens after the guide lands.
//   - No links off the page at all, internal or external. The only exits are the
//     form and the phone number, both of which are conversions.
//   - The H1 carries the campaign keyword verbatim so the ad and the page match.
//   - noindex, set on the layout, so it never competes with the real course pages.
export const metadata = {
  title: "Yoga Teacher Training in Rishikesh, India | Free Course Guide",
  description:
    "Get the free Adhiroha course guide: curriculum, daily schedule, accommodation, meals and upcoming dates for Yoga Alliance registered teacher training in Rishikesh.",
  alternates: { canonical: "/yoga-teacher-training-rishikesh-guide/" },
};

const BADGES = [
  { src: "/img/RYS200.png", alt: "Yoga Alliance Registered Yoga School RYS 200" },
  { src: "/img/RYS300.png", alt: "Yoga Alliance Registered Yoga School RYS 300" },
  { src: "/img/RYS500.png", alt: "Yoga Alliance Registered Yoga School RYS 500" },
];

const INSIDE = [
  ["The full curriculum", "Every subject, hour by hour: asana, pranayama, anatomy, philosophy, teaching methodology and practicum."],
  ["A real daily schedule", "What 5:45 to 21:30 actually looks like, from shatkarma to the evening meditation."],
  ["Where you sleep and eat", "Room options, the three sattvic meals a day, and everything provided in the ashram."],
  ["Upcoming batch dates", "Which months still have places, and how far ahead people usually book."],
  ["What the certificate is", "One Adhiroha certificate carrying both Yoga Alliance registration and Ministry of Ayush accreditation."],
  ["What to pack and expect", "Visa notes, airport pickup, the weather month by month, and what the first day feels like."],
];

const GALLERY = [
  ["/gallery/yoga-shala/yoga-shala-001.webp", "The open-sided yoga shala at Adhiroha, looking out onto the forest"],
  ["/gallery/ashram/ashram-006.webp", "The Adhiroha ashram buildings on the green hillside of Upper Tapovan"],
  ["/gallery/accommodation/acco-001.webp", "A clean, simple twin room with a mountain view at the ashram"],
  ["/gallery/dinning/dinning-004.webp", "Sattvic vegetarian food served in the ashram dining hall"],
  ["/gallery/yoga/yoga-012.webp", "Students in a guided morning asana practice"],
  ["/gallery/excursion/excursion-003.webp", "A group excursion to a waterfall in the hills around Rishikesh"],
  ["/gallery/sound-healing/sound-003.webp", "A sound healing session with singing bowls"],
  ["/gallery/opening-caremony/opening-014.webp", "The opening ceremony that begins every batch"],
];

const DAY = [
  ["05:45", "Shatkarma and morning tea", "Gentle cleansing practices as the light comes up over the valley.", "/gallery/yoga-shala/yoga-shala-004.webp"],
  ["07:15", "Hatha or Ashtanga practice", "A strong asana practice while the air is still cool and the body is fresh.", "/gallery/yoga/yoga-020.webp"],
  ["09:30", "Philosophy and anatomy", "Discussion more than lecture: the sutras, the Gita, and how the body actually works.", "/gallery/yoga/yoga-033.webp"],
  ["13:00", "Lunch and rest", "Three sattvic meals a day, eaten together and without hurry.", "/gallery/dinning/dinning-001.webp"],
  ["16:15", "Teaching methodology", "You learn to sequence, to cue, and eventually to stand at the front of the room.", "/gallery/yoga-shala/yoga-shala-008.webp"],
  ["19:30", "Meditation, then lights out", "The day winds down early, because dawn comes early too.", "/gallery/ashram/ashram-012.webp"],
];

const COURSES = [
  ["200 Hour", "24 days", "The foundation. No prior training needed, and the natural place to begin if you want to teach.", "/img/adhiroha-yttc-014.webp"],
  ["300 Hour", "30 days", "For those who already hold a 200 hour certificate and want to go deeper into the advanced work.", "/img/yttc-004.webp"],
  ["500 Hour", "60 days", "Foundation and advanced in one continuous arc, with no prerequisite at all.", "/img/yttc-009.webp"],
];

const WHY = [
  { img: "/gallery/yoga/yoga-001.webp", h: "Small groups, senior teachers", tag: "The teaching", chips: ["7 to 20 years", "Hands-on adjustment", "Small batches"],
    p: "You are taught by acharyas with 7 to 20 years behind them, in groups small enough that your alignment actually gets corrected." },
  { img: "/gallery/ashram/ashram-002.webp", h: "A residential ashram, not a hotel", tag: "The setting", chips: ["Upper Tapovan", "20,000+ sq ft", "Forest and river"],
    p: "Teachers and students live on the same grounds in Upper Tapovan, a kilometre above the noise of the town." },
  { img: "/img/yoga-training-certification.webp", h: "A credential that travels", tag: "The certificate", chips: ["RYS 200 / 300 / 500", "Ministry of Ayush", "Never expires"],
    p: "Adhiroha is a Registered Yoga School with Yoga Alliance at all three levels, and accredited by the Yoga Certification Board under the Ministry of Ayush." },
  { img: "/gallery/dinning/dinning-002.webp", h: "Three sattvic meals a day", tag: "The food", chips: ["Satvik & Ayurvedic", "Organic", "Fresh daily"],
    p: "Cooked fresh in the ashram kitchen, different every day, and included from the moment you arrive." },
  { img: "/gallery/excursion/excursion-009.webp", h: "Excursions that are part of it", tag: "Beyond the mat", chips: ["Waterfall", "Temples", "Ganga aarti"],
    p: "Waterfalls, temples, the evening Ganga aarti. Not add-ons sold separately, but part of the course." },
  { img: "/gallery/certification/certification-004.webp", h: "A qualification that never expires", tag: "For good", chips: ["No renewal fee", "No expiry", "Yours to keep"],
    p: "Meet the attendance requirement and the certificate is yours for good, with no renewal fee and no expiry date." },
];

const VOICES = [
  { q: "When I walked into this place, I was amazed. It is so beautiful that you feel like you are inside a dream, with all the nature around you.", n: "Ronnie", c: "Israel" },
  { q: "Unlike many other schools, which sit right inside the city, this one was a little further away, and that distance turned out to be exactly what I needed.", n: "Ramnik", c: "London" },
  { q: "We had different dishes every single day, so the food never got boring. The fresh fruit in the morning was something I still think about.", n: "Maya", c: "Lithuania" },
  { q: "I think I loved the excursions most, the trips to the temple and the waterfall. They were simply beautiful.", n: "Sofia", c: "Spain" },
  { q: "They guide not as lecturers, but as mindful companions, offering space, support, and the wisdom needed for real inner transformation.", n: "Daniel", c: "Germany" },
  { q: "I arrived worn out and left steadier than I have felt in years. Nothing dramatic happened. The days simply made sense again.", n: "Claire", c: "France" },
];

const TEACHERS = [
  ["/img/remote/img_jagjeet-singh.jpg", "Yogacharya Jagjeet Singh", "Philosophy and anatomy", "20+ years"],
  ["/img/remote/img_adhiroha-yttc-023.webp", "Yogacharya Pratap Rawat", "Ashtanga Vinyasa", "14+ years"],
  ["/img/remote/img_rajat-1.jpg", "Yogacharya Rajat Purwal", "Pranayama and Shatkarma", "12+ years"],
  ["/img/sunil.webp", "Yogacharya Sunil Bisht", "Meditation", "20+ years"],
];

const FAQ = [
  ["Do I need to be flexible or experienced?", "No. Most people arrive as sincere beginners. The 200 hour course assumes no prior training, and the teaching meets you where you are."],
  ["What language is the training in?", "English. A working level of conversational English is all you need to follow the classes."],
  ["Is the certificate recognised outside India?", "Yes. Adhiroha is a Registered Yoga School with Yoga Alliance, so graduates can register as an RYT and teach in studios almost anywhere."],
  ["How far ahead should I book?", "Batches usually fill a few months out, and the nearest two months are often the tightest. The guide lists which dates still have places."],
  ["What is included once I arrive?", "Accommodation, three sattvic meals a day, all course materials, the excursions and airport pickup. The guide sets out the full list."],
  ["Can I come on my own?", "Most people do. You will be sharing a schedule, a dining hall and a shala with the same group for the whole course, so nobody stays a stranger for long."],
  ["What are the rooms like?", "Clean, simple and quiet, with private bathrooms and hot water. Triple, twin and private options exist, and the guide shows photographs of each."],
  ["Is there an age limit?", "No. Batches regularly run from students in their early twenties to people well into their sixties."],
];

export default function Page() {
  return (
    <main className="lp">
      {/* ---------------- hero + form ---------------- */}
      <section className="lp-hero">
        <img className="lp-hero-bg" src="/img/yttc-004.webp"
             alt="Students practising yoga on the banks of the Ganga Ji in Rishikesh, the Himalayas behind them"
             width="1500" height="1000" fetchPriority="high" decoding="async" />
        <div className="lp-hero-shade" />
        <div className="lp-wrap lp-hero-in">
          <div className="lp-hero-copy">
            <img className="lp-logo" src="/img/logo-g.png" alt="Adhiroha Yoga School"
                 width="867" height="288" decoding="async" />
            <h1>Yoga Teacher Training in Rishikesh, India</h1>
            <p className="lp-sub">
              Yoga Alliance registered, 200, 300 and 500 hour residential courses at a
              Himalayan ashram in Upper Tapovan. Get the full course guide, free, before
              you decide anything.
            </p>
            <ul className="lp-ticks">
              <li>Curriculum, daily schedule and upcoming dates</li>
              <li>Accommodation and all meals explained</li>
              <li>Sent to your inbox in a couple of minutes</li>
            </ul>
            <div className="lp-badges">
              {BADGES.map((b) => (
                <img key={b.src} className="lp-badge" src={b.src} alt={b.alt}
                     width="720" height="720" decoding="async" />
              ))}
              <span className="lp-badge-t">Registered Yoga School<b>RYS 200 · 300 · 500</b></span>
            </div>
          </div>
          <div className="lp-form-wrap">
            <LeadForm id="get-the-guide" />
          </div>
        </div>
      </section>

      {/* ---------------- trust strip ---------------- */}
      <section className="lp-trust">
        <div className="lp-wrap lp-trust-in">
          <div className="lp-stat"><b>3,000+</b><span>students trained</span></div>
          <div className="lp-stat"><b>70+</b><span>countries</span></div>
          <div className="lp-stat"><b>4.9</b><span>average Google rating</span></div>
          <div className="lp-stat"><b>20,000+</b><span>sq ft ashram</span></div>
          <div className="lp-orgs">
            <img src="/img/logo-yoga-alliance.webp" alt="Yoga Alliance" width="200" height="200" loading="lazy" decoding="async" />
            <img src="/img/logo-ministry-of-ayush.webp" alt="Ministry of Ayush" width="200" height="200" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      {/* ---------------- what is in the guide ---------------- */}
      <section className="lp-sec">
        <div className="lp-wrap lp-split">
          <div>
            <Kicker>The free guide</Kicker>
            <h2>Everything you need to judge a school, in one document</h2>
            <p className="lp-lead">
              Thirty-odd pages, written for someone who has never done this before and is
              trying to work out whether it is right for them.
            </p>
            <ul className="lp-inside">
              {INSIDE.map(([h, p]) => (
                <li key={h}>
                  <span className="lp-inside-ic" aria-hidden="true">
                    <Tick />
                  </span>
                  <div><b>{h}</b><p>{p}</p></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lp-figstack">
            <figure className="lp-figure">
              <img src="/img/adhiroha-yttc-014.webp"
                   alt="A teacher adjusting a student's posture during a morning class at the Adhiroha shala"
                   width="1500" height="1000" loading="lazy" decoding="async" />
            </figure>
            <figure className="lp-figure lp-figure-sm">
              <img src="/gallery/certification/certification-004.webp"
                   alt="A graduate receiving the Adhiroha teacher training certificate"
                   width="1400" height="933" loading="lazy" decoding="async" />
            </figure>
          </div>
        </div>
      </section>

      {/* ---------------- gallery band ---------------- */}
      <section className="lp-gallery">
        <div className="lp-wrap">
          <div className="lp-head">
            <Kicker>The ashram</Kicker>
            <h2>Where you would actually be living</h2>
            <Sunburst />
          </div>
        </div>
        <div className="lp-grid8">
          {GALLERY.map(([src, alt]) => (
            <figure key={src}><img src={src} alt={alt} width="1000" height="667" loading="lazy" decoding="async" /></figure>
          ))}
        </div>
      </section>

      {/* ---------------- a day here ---------------- */}
      <section className="lp-sec lp-sec-alt">
        <div className="lp-wrap">
          <div className="lp-head">
            <Kicker>A day here</Kicker>
            <h2>From 5:45 in the morning to lights out</h2>
            <Sunburst />
          </div>
          <div className="lp-daygrid">
            <figure className="lp-dayfig">
              <img src="/gallery/yoga-shala/yoga-shala-004.webp"
                   alt="Morning practice in the open-sided shala as the light comes up"
                   width="1000" height="667" loading="lazy" decoding="async" />
              <figcaption className="lp-floatstat"><b>5:45</b><span>the day starts<br />before sunrise</span></figcaption>
            </figure>
            <ol className="lp-daylist">
              {DAY.map(([t, h, pcopy], i) => (
                <li key={t}>
                  <span className="lp-daynum">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <span className="lp-daytime">{t}</span>
                    <h3>{h}</h3>
                    <p>{pcopy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------- courses (no pricing) ---------------- */}
      <section className="lp-sec">
        <div className="lp-wrap">
          <div className="lp-head">
            <Kicker>The courses</Kicker>
            <h2>Three residential trainings, one certificate each</h2>
            <Sunburst />
          </div>
          <div className="lp-cards lp-cards-3">
            {COURSES.map(([h, d, p, img]) => (
              <article className="lp-card" key={h}>
                <img src={img} alt={`${h} yoga teacher training at Adhiroha`} width="1500" height="1000" loading="lazy" decoding="async" />
                <div className="lp-card-b">
                  <span className="lp-pill">{d}</span>
                  <h3>{h} Teacher Training</h3>
                  <p>{p}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="lp-note">
            Dates, inclusions and everything else are set out in the guide. Ask for it below and
            we will send it straight over.
          </p>
        </div>
      </section>

      {/* ---------------- mid-page CTA ---------------- */}
      <section className="lp-band">
        <img className="lp-band-bg" src="/gallery/yoga/yoga-033.webp"
             alt="A group practice in progress at the Adhiroha shala" width="1400" height="933"
             loading="lazy" decoding="async" />
        <div className="lp-band-shade" />
        <div className="lp-wrap lp-band-in">
          <h2>Still weighing it up?</h2>
          <p>That is exactly what the guide is for. No cost, no obligation, and no one will pressure you.</p>
          <a className="lp-band-btn" href="#get-the-guide-2">Send me the free guide</a>
        </div>
      </section>

      {/* ---------------- why here ---------------- */}
      <section className="lp-sec lp-sec-alt">
        <div className="lp-wrap">
          <div className="lp-head">
            <Kicker>Why Adhiroha</Kicker>
            <h2>What the photographs cannot tell you</h2>
            <Sunburst />
          </div>
          <div className="lp-cards">
            {WHY.map((w) => (
              <article className="lp-card" key={w.h}>
                <div className="lp-card-img">
                  <img src={w.img} alt={w.h} width="1400" height="933" loading="lazy" decoding="async" />
                  <span className="lp-imgpill">{w.tag}</span>
                </div>
                <div className="lp-card-b">
                  <h3>{w.h}</h3><p>{w.p}</p>
                  <div className="lp-chips">{w.chips.map((c) => <span key={c}>{c}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- stay and food ---------------- */}
      <section className="lp-sec">
        <div className="lp-wrap lp-split lp-split-rev">
          <div className="lp-figstack">
            <figure className="lp-figure">
              <img src="/gallery/accommodation/acco-003.webp"
                   alt="A simple, clean twin room at the Adhiroha ashram with a view of the hills"
                   width="1000" height="667" loading="lazy" decoding="async" />
            </figure>
            <figure className="lp-figure lp-figure-sm">
              <img src="/gallery/accommodation/acco-007.webp"
                   alt="A private bathroom in the ashram accommodation"
                   width="1000" height="667" loading="lazy" decoding="async" />
            </figure>
          </div>
          <div>
            <Kicker>Where you stay</Kicker>
            <h2>A room, three meals, and nothing else to arrange</h2>
            <p className="lp-lead">
              Everything from the moment you land is taken care of, so the only thing left to do
              is turn up and practise.
            </p>
            <ul className="lp-inside">
              {[["Clean, quiet rooms", "Triple, twin and private options, each with a private bathroom and hot water."],
                ["Three sattvic meals a day", "Cooked fresh in the ashram kitchen, different every day, with fruit in the morning."],
                ["Airport pickup included", "From Dehradun (Jolly Grant), about 25 km away. Delhi transfers can be arranged too."],
                ["Filtered water, laundry, wifi", "The small practical things, sorted, so they never become a distraction."]].map(([h, p]) => (
                <li key={h}>
                  <span className="lp-inside-ic" aria-hidden="true">
                    <Tick />
                  </span>
                  <div><b>{h}</b><p>{p}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- certification ---------------- */}
      <section className="lp-sec lp-sec-alt">
        <div className="lp-wrap lp-cert">
          <div className="lp-cert-copy">
            <Kicker>What you earn</Kicker>
            <h2>One certificate, recognised worldwide</h2>
            <p className="lp-lead">
              Adhiroha is a Registered Yoga School with Yoga Alliance at all three levels, and
              accredited by the Yoga Certification Board under the Ministry of Ayush. You leave
              with a single Adhiroha certificate carrying both, and it never expires.
            </p>
            <div className="lp-cert-marks">
              <div><img src="/img/logo-yoga-alliance.webp" alt="Yoga Alliance" width="200" height="200" loading="lazy" decoding="async" />
                <span>Yoga Alliance<b>Register as an RYT</b></span></div>
              <div><img src="/img/logo-ministry-of-ayush.webp" alt="Ministry of Ayush" width="200" height="200" loading="lazy" decoding="async" />
                <span>Ministry of Ayush<b>Yoga Certification Board</b></span></div>
            </div>
          </div>
          <div className="lp-cert-badges">
            {BADGES.map((b) => (
              <img key={b.src} src={b.src} alt={b.alt} width="720" height="720" loading="lazy" decoding="async" />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- teachers ---------------- */}
      <section className="lp-sec">
        <div className="lp-wrap">
          <div className="lp-head">
            <Kicker>Your teachers</Kicker>
            <h2>The acharyas at the front of the room</h2>
            <Sunburst />
          </div>
          <div className="lp-teachers">
            {TEACHERS.map(([img, n, s, y]) => (
              <figure key={n}>
                <img src={img} alt={n} width="600" height="600" loading="lazy" decoding="async" />
                <figcaption><b>{n}</b><span>{s}</span><i>{y}</i></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- voices ---------------- */}
      <section className="lp-sec lp-sec-alt">
        <div className="lp-wrap">
          <div className="lp-head">
            <Kicker>In their words</Kicker>
            <h2>Graduates on what it was actually like</h2>
            <Sunburst />
          </div>
          <div className="lp-quotes">
            {VOICES.map((v) => (
              <figure className="lp-quote" key={v.n}>
                <div className="lp-stars" aria-label="Five out of five">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2l2.95 6.36 6.96.6-5.27 4.6 1.57 6.8L12 16.77l-6.21 3.59 1.57-6.8-5.27-4.6 6.96-.6z" />
                    </svg>
                  ))}
                </div>
                <blockquote>{v.q}</blockquote>
                <figcaption><b>{v.n}</b><span>{v.c}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="lp-sec">
        <div className="lp-wrap lp-faq-wrap">
          <div className="lp-head">
            <Kicker>Before you ask</Kicker>
            <h2>The questions everyone sends first</h2>
            <Sunburst />
          </div>
          <div className="lp-faq">
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}<span aria-hidden="true" /></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- closing form ---------------- */}
      <section className="lp-close">
        <div className="lp-wrap lp-close-in">
          <div className="lp-close-copy">
            <h2>Take the guide, then decide</h2>
            <p>
              No obligation and nothing to pay. Read it, sit with it, and if it feels right
              we will talk about dates. If you would rather just speak to a person, call the
              ashram directly.
            </p>
            <a className="lp-call" href="tel:+919999048900">
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                     strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              +91 9999 048 900
            </a>
            <figure className="lp-close-img">
              <img src="/gallery/opening-caremony/opening-014.webp"
                   alt="The opening ceremony that begins every batch at Adhiroha"
                   width="1400" height="933" loading="lazy" decoding="async" />
            </figure>
          </div>
          <div className="lp-form-wrap">
            <LeadForm id="get-the-guide-2" compact />
          </div>
        </div>
      </section>

      <footer className="lp-foot">
        <div className="lp-wrap">
          <p>Adhiroha Yoga School · Adhiroha Trek Road, Upper Tapovan, Rishikesh, Uttarakhand 249137, India</p>
          <p className="lp-foot-sm">Registered Yoga School with Yoga Alliance, USA · Accredited by the Yoga Certification Board, Ministry of Ayush, Government of India</p>
        </div>
      </footer>
    </main>
  );
}
