// Adhiroha Reviews — the page someone lands on when they search the school's
// name plus "reviews". Its job is to answer that search better than any third
// party can: every platform score with its count, the written Google reviews,
// every student review video on the channel, and the questions people ask
// before they trust a school they have only seen online.
//
// Built on the hub page's `tp-` design system (its stylesheets are imported
// from that directory); `reviews.css` adds only what this page needs.
//
// No Review or AggregateRating markup here: Google treats reviews a business
// publishes about itself as self-serving and will not show stars for them.
// The sitewide Organization node already carries the Google rating. This page
// adds what it can honestly claim: the videos, the FAQ and the breadcrumb.
import "../yoga-teacher-training-course-rishikesh-india/header.css";
import "../yoga-teacher-training-course-rishikesh-india/page-styles.css";
import "./reviews.css";
import { DRAWER_HTML, FOOTER_HTML, HEADER_HTML } from "@/components/chrome";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { PLATFORM_RATINGS, breadcrumbSchema, faqSchema, graph, videoSchema } from "@/lib/seo";
import scripts from "./scripts";
import {
  FAQS, GOOGLE_REVIEWS, GOOGLE_URL, THEMES, VIDEOS, YOGA_ALLIANCE_URL, YOUTUBE_URL,
} from "./data";
import { COURSE_URL, LEVEL, LEVELS, VOICES } from "../yoga-teacher-training-course-rishikesh-india/data";

const URL = "/adhiroha-reviews/";
const [GOOGLE, YA, TRIP] = PLATFORM_RATINGS;

export const metadata = {
  title: `Adhiroha Reviews | ${GOOGLE.value}★ from ${GOOGLE.count} Google Reviews & Student Videos`,
  description:
    `Read Adhiroha Yoga School reviews: ${GOOGLE.value} stars from ${GOOGLE.count} Google reviews, Yoga Alliance and Tripadvisor ratings, and ${VIDEOS.length} unscripted video reviews from graduates of our 200, 300 and 500 hour yoga teacher training in Rishikesh.`,
  keywords: [
    "adhiroha reviews",
    "adhiroha yoga school reviews",
    "adhiroha rishikesh reviews",
    "adhiroha yoga teacher training reviews",
    "adhiroha google reviews",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: `Adhiroha Reviews | ${GOOGLE.value}★ on Google · Student Video Reviews`,
    description:
      "What students say about Adhiroha Yoga School in Rishikesh: Google reviews, platform ratings and video reviews from graduates.",
    url: URL,
    type: "website",
    images: [{ url: "/img/adhiroha-og.jpg", width: 1200, height: 630, alt: "Adhiroha Yoga School" }],
  },
};

const pageSchema = graph(
  faqSchema(FAQS.map(([question, answer]) => ({ question, answer }))),
  breadcrumbSchema([{ name: "Adhiroha Reviews", url: URL }]),
  ...VIDEOS.map((v, i) => videoSchema({ ...v, n: i + 1 }))
);

const sections = [
  { label: "Top", target: "top" },
  { label: "Ratings", target: "ratings" },
  { label: "Google", target: "google-reviews" },
  { label: "Videos", target: "video-reviews" },
  { label: "Themes", target: "themes" },
  { label: "FAQ", target: "faq" },
];

const nn = (i) => String(i + 1).padStart(2, "0");
const thumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/* ---------- small inline marks ---------- */
const Arrow = () => (
  <svg width="18" height="10" viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 5h17M14 1l4 4-4 4" /></svg>
);
const Star = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#e6a23c"><path d="M12 2l2.95 6.36 6.96.6-5.27 4.6 1.57 6.8L12 16.77l-6.21 3.59 1.57-6.8-5.27-4.6 6.96-.6z" /></svg>
);
const Stars = ({ size }) => (
  <span className="rv-stars" aria-label="Five stars"><Star size={size} /><Star size={size} /><Star size={size} /><Star size={size} /><Star size={size} /></span>
);
const GoogleMark = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" /><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" /><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" /></svg>
);
const TripMark = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11.2" fill="#00AA6C" /><circle cx="7.7" cy="12" r="3.5" fill="#fff" /><circle cx="16.3" cy="12" r="3.5" fill="#fff" /><circle cx="7.7" cy="12" r="1.5" fill="#00AA6C" /><circle cx="16.3" cy="12" r="1.5" fill="#00AA6C" /></svg>
);
const Play = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="7 4.5 20 12 7 19.5" /></svg>
);

export default function Page() {
  return (
    <>
      <JsonLd data={pageSchema} />

      <div className="tp rv" id="rv">

        {/* ============================================================
            HERO
            ============================================================ */}
        <section className="c-hero" id="top">
          <img
            className="u-img"
            src="/gallery/opening-caremony/opening-014.webp"
            alt="Students gathered for the opening ceremony of a teacher training batch at Adhiroha, Rishikesh"
            width="1600" height="1064" loading="eager" fetchPriority="high"
          />
          <div dangerouslySetInnerHTML={{ __html: HEADER_HTML }} />
          <div dangerouslySetInnerHTML={{ __html: DRAWER_HTML }} />

          <div className="c-hero-inner">
            <div>
              <div className="c-crumbs">
                <a href="/">Home</a><i></i><a href="/about-us/">About Adhiroha</a><i></i><span>Adhiroha Reviews</span>
              </div>
              <span className="kicker">In our students&rsquo; own words</span>
              <h1>Adhiroha Reviews</h1>
              <p className="c-sub c-sub-lg">
                What students say about Adhiroha Yoga School in Upper Tapovan, Rishikesh: {GOOGLE.count} Google
                reviews averaging {GOOGLE.value}, our ratings on Yoga Alliance and Tripadvisor, and {VIDEOS.length} unscripted
                video reviews from graduates of the 200, 300 and 500 hour yoga teacher training.
              </p>
              <p className="c-sub c-sub-sm">
                {GOOGLE.value} stars from {GOOGLE.count} Google reviews, and {VIDEOS.length} video reviews from our graduates.
              </p>
              <div className="actions">
                <a className="btn-primary" href="#google-reviews">Read the reviews</a>
                <a className="btn-ghost" href="#video-reviews">Watch student videos <Arrow /></a>
              </div>
            </div>

            <aside className="book-card rv-hero-card">
              <div className="rv-hc-top">
                <GoogleMark size={30} />
                <span className="rv-hc-score tp-fig">{GOOGLE.value}</span>
                <span>
                  <Stars size={15} />
                  <b>{GOOGLE.count} Google reviews</b>
                </span>
              </div>
              <ul className="rv-hc-list">
                <li><img src="/img/RYS200.png" alt="" width="720" height="720" /><span>Yoga Alliance</span><b>{YA.value}</b><i>{YA.count} reviews</i></li>
                <li><TripMark /><span>Tripadvisor</span><b>{TRIP.value}</b><i>{TRIP.count} reviews</i></li>
                <li><span className="rv-yt"><Play size={13} /></span><span>YouTube</span><b>{VIDEOS.length}</b><i>video reviews</i></li>
              </ul>
              <a className="btn-primary" href={GOOGLE_URL} target="_blank" rel="noopener">Read all on Google</a>
              <div className="bc-note">3,000+ students from more than 70 countries have trained at Adhiroha.</div>
            </aside>
          </div>
        </section>

        {/* ============================================================
            RATINGS
            ============================================================ */}
        <section className="tp-sec tight tp-paper" id="ratings">
          <div className="tp-wrap">
            <div className="tp-head mid reveal">
              <span className="tp-eyebrow">Every platform, every count</span>
              <h2 className="tp-h2 wide">Adhiroha&rsquo;s ratings across the web</h2>
              <p className="tp-p">
                The scores below are the ones each platform shows today, with the number of reviews behind
                them. Click through and read them where they were written.
              </p>
            </div>
            <div className="rv-platforms reveal">
              <a className="rv-platform" href={GOOGLE_URL} target="_blank" rel="noopener">
                <GoogleMark />
                <span className="rv-p-score tp-fig">{GOOGLE.value}<small>/5</small></span>
                <Stars />
                <b>Google</b>
                <i>{GOOGLE.count} reviews</i>
                <span className="tp-link">Read on Google <Arrow /></span>
              </a>
              <a className="rv-platform" href={YOGA_ALLIANCE_URL} target="_blank" rel="noopener">
                <img src="/img/RYS200.png" alt="Yoga Alliance Registered Yoga School" width="720" height="720" loading="lazy" />
                <span className="rv-p-score tp-fig">{YA.value}<small>/5</small></span>
                <Stars />
                <b>Yoga Alliance</b>
                <i>{YA.count} reviews from graduates</i>
                <span className="tp-link">Verify on Yoga Alliance <Arrow /></span>
              </a>
              <div className="rv-platform">
                <TripMark />
                <span className="rv-p-score tp-fig">{TRIP.value}<small>/5</small></span>
                <Stars />
                <b>Tripadvisor</b>
                <i>{TRIP.count} reviews</i>
              </div>
              <a className="rv-platform" href={YOUTUBE_URL} target="_blank" rel="noopener">
                <span className="rv-yt big"><Play size={20} /></span>
                <span className="rv-p-score tp-fig">{VIDEOS.length}</span>
                <span className="rv-p-sub">unscripted</span>
                <b>YouTube</b>
                <i>student video reviews</i>
                <span className="tp-link">Open the channel <Arrow /></span>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================
            GOOGLE REVIEWS
            ============================================================ */}
        <section className="tp-sec" id="google-reviews">
          <div className="tp-wrap">
            <div className="tp-head reveal">
              <span className="tp-eyebrow">Google reviews</span>
              <h2 className="tp-h2 wide">Adhiroha Yoga School reviews on Google</h2>
              <p className="tp-p">
                A few of the {GOOGLE.count} reviews students have left on our Google profile, from the 200, 300 and
                500 hour courses. The full list, the good and the critical, is on Google itself.
              </p>
            </div>
            <div className="rv-greviews reveal">
              {GOOGLE_REVIEWS.map(([name, country, when, text]) => (
                <figure className="rv-greview" key={name}>
                  <figcaption className="rv-gr-head">
                    <span className="tp-avatar" aria-hidden="true">{name[0]}</span>
                    <span className="rv-gr-who">
                      <b>{name}</b>
                      <i>{country}</i>
                    </span>
                    <GoogleMark size={20} />
                  </figcaption>
                  <div className="rv-gr-meta"><Stars /><span>{when}</span></div>
                  <blockquote><p>{text}</p></blockquote>
                </figure>
              ))}
            </div>
            <div className="rv-more reveal">
              <a className="btn-primary" href={GOOGLE_URL} target="_blank" rel="noopener">Read all {GOOGLE.count} reviews on Google</a>
            </div>
          </div>
        </section>

        {/* ============================================================
            VIDEO REVIEWS
            ============================================================ */}
        <section className="tp-sec tp-dark" id="video-reviews">
          <div className="tp-wrap">
            <div className="tp-head reveal">
              <span className="tp-eyebrow">Student video testimonials</span>
              <h2 className="tp-h2 wide">{VIDEOS.length} graduates, on camera, unscripted</h2>
              <p className="tp-p">
                Every student review on the Adhiroha YouTube channel, recorded at the end of their course,
                in their own words. Pick any one to play it.
              </p>
            </div>

            <div className="tp-vmain rv-vmain reveal" id="rv-vmain" data-vid={VIDEOS[0].id} role="button" tabIndex={0} aria-label="Play student review 01">
              <img id="rv-vthumb" src={`https://i.ytimg.com/vi/${VIDEOS[0].id}/maxresdefault.jpg`} alt="Student review of the yoga teacher training at Adhiroha, Rishikesh" />
              <span className="tp-vplay"><Play /></span>
              <span className="tp-vlab" id="rv-vlab">Student review · 01 · {VIDEOS[0].length}</span>
            </div>

            <ul className="rv-vgrid reveal">
              {VIDEOS.map((v, i) => (
                <li key={v.id}>
                  <button type="button" className="rv-vcard" data-vid={v.id} data-n={nn(i)} data-len={v.length} aria-current={i === 0}>
                    <span className="rv-vthumb">
                      <img src={thumb(v.id)} alt="" loading="lazy" width="480" height="360" />
                      <span className="rv-vplay"><Play size={14} /></span>
                      <span className="rv-vlen">{v.length}</span>
                    </span>
                    <b>Student review · {nn(i)}</b>
                    <i>YTTC graduate · {v.uploadDate.slice(0, 4)}</i>
                  </button>
                </li>
              ))}
            </ul>
            <p className="rv-vfoot reveal">
              <a className="tp-link" href={YOUTUBE_URL} target="_blank" rel="noopener">More from Adhiroha on YouTube <Arrow /></a>
            </p>
          </div>
        </section>

        {/* ============================================================
            THEMES
            ============================================================ */}
        <section className="tp-sec tp-cream" id="themes">
          <div className="tp-wrap">
            <div className="tp-head mid reveal">
              <span className="tp-eyebrow">Read enough reviews and a pattern appears</span>
              <h2 className="tp-h2 wide">What students mention most</h2>
            </div>
            <div className="rv-themes reveal">
              {THEMES.map(([h, summary, quote, who], i) => (
                <div className="rv-theme" key={h}>
                  <span className="rv-theme-n tp-fig">{nn(i)}</span>
                  <h3 className="tp-h3">{h}</h3>
                  <p className="rv-theme-sum">{summary}</p>
                  <blockquote>
                    <p>&ldquo;{quote}&rdquo;</p>
                    <cite>{who}</cite>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            IN THEIR WORDS — lines from the video interviews
            ============================================================ */}
        <section className="tp-sec" id="in-their-words">
          <div className="tp-wrap">
            <div className="tp-head mid reveal">
              <span className="tp-eyebrow">From the interviews</span>
              <h2 className="tp-h2 wide">In their words</h2>
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
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            FAQ
            ============================================================ */}
        <section className="tp-sec tp-paper" id="faq">
          <div className="tp-wrap">
            <div className="tp-head mid reveal">
              <span className="tp-eyebrow">Before you trust a school online</span>
              <h2 className="tp-h2 wide">Questions about Adhiroha reviews</h2>
            </div>
            <div className="tp-faq reveal">
              {FAQS.map(([q, a], i) => (
                <details key={q} open={i < 2}>
                  <summary><h3>{q}</h3></summary>
                  <div className="ans"><p>{a}</p></div>
                </details>
              ))}
            </div>
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
                <h2>Come and write the next review yourself</h2>
                <p>
                  Every course begins on the 1st of the month. If you would like to hear from the school
                  directly before you decide, write to us on WhatsApp and a real person will reply.
                </p>
                <div className="tp-apply-actions">
                  <a className="btn-primary" href="/student-admission-panel/">Apply now</a>
                  <a className="btn-ghost" href="https://api.whatsapp.com/send?phone=919999048900" target="_blank" rel="noopener">Ask us on WhatsApp <Arrow /></a>
                </div>
              </div>
              <div className="tp-apply-sum reveal">
                <div className="lab">The courses they reviewed</div>
                {LEVELS.map((lv) => (
                  <a className={`tp-apply-row tp-lv${lv}`} href={COURSE_URL[lv]} key={lv}>
                    <span className="tp-fig">{lv}</span>
                    <span><b>{LEVEL[lv].name}</b><i>{LEVEL[lv].days} · {LEVEL[lv].credential}</i></span>
                    <span className="p">&euro;{LEVEL[lv].triple}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            KEEP EXPLORING
            ============================================================ */}
        <section className="rl-sec" aria-labelledby="rl-h">
          <div className="wrap">
            <span className="kicker">Keep Exploring</span>
            <h2 className="sec-h rl-h" id="rl-h">See What They Were Talking About</h2>
            <ul className="rl-grid">
              <li className="rl-card">
                <a className="rl-link" href="/yoga-teacher-training-course-rishikesh-india/">Yoga Teacher Training in India</a>
                <p className="rl-note">All three Yoga Alliance registered paths — 200, 300 and 500 hour — compared side by side.</p>
              </li>
              <li className="rl-card">
                <a className="rl-link" href="/yoga-teachers-in-india/">Our Yoga Teachers</a>
                <p className="rl-note">The teachers students name in their reviews, and what each one teaches.</p>
              </li>
              <li className="rl-card">
                <a className="rl-link" href="/ashram-food-rishikesh/">Sattvic Food at Adhiroha</a>
                <p className="rl-note">The daily vegetarian meals that come up in almost every review.</p>
              </li>
              <li className="rl-card">
                <a className="rl-link" href="/yoga-gallery-india/">Photo Gallery</a>
                <p className="rl-note">The school, the shala and the forest above Tapovan, as students see them.</p>
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
