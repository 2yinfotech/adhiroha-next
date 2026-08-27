/**
 * Meta (Facebook) Pixel — the pieces that are data rather than behaviour.
 *
 * The pixel ID is public by definition: it ships in the page HTML and in every
 * request to connect.facebook.net. It is defaulted in code for the same reason
 * the GTM container is — .env.local is gitignored, so a missing variable would
 * fail silently and the pixel would simply stop firing on the deployed site
 * with nothing to show for it. The env var still wins so a test pixel can be
 * swapped in without a code change.
 */
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "455990398998109";

/**
 * ViewContent: which course page a path belongs to.
 *
 * The content_name is deliberately the same English string on all eleven
 * locales. Meta's reporting groups by content_name, and using each page's own
 * translated title would split one course into eleven rows and make the
 * audiences unusable for retargeting. The locale is still visible in Meta
 * through the page URL.
 *
 * Keyed by path so a page can be identified without the page itself having to
 * carry any tracking markup.
 */
const COURSE = (name, category) => ({ content_name: name, content_category: category });

const YTT = "Yoga Teacher Training";

export const COURSE_PAGES = {
  // 200 hour
  "/200-hour-yoga-teacher-training-course-rishikesh/": COURSE("200 Hour YTT Rishikesh", YTT),
  "/da/200-timers-yogalaereruddannelse-rishikesh/": COURSE("200 Hour YTT Rishikesh", YTT),
  "/de/200-stunden-yogalehrer-ausbildung-rishikesh/": COURSE("200 Hour YTT Rishikesh", YTT),
  "/es/200-horas-formacion-de-profesor-de-yoga-rishikesh/": COURSE("200 Hour YTT Rishikesh", YTT),
  "/fr/200-heures-formation-professeur-de-yoga-rishikesh/": COURSE("200 Hour YTT Rishikesh", YTT),
  "/it/200-ore-formazione-insegnanti-yoga-rishikesh/": COURSE("200 Hour YTT Rishikesh", YTT),
  "/ja/200-jikan-yoga-shidosha-yosei-rishikesh/": COURSE("200 Hour YTT Rishikesh", YTT),
  "/nl/200-uur-yoga-docentenopleiding-rishikesh/": COURSE("200 Hour YTT Rishikesh", YTT),
  "/pl/200-godzinny-kurs-nauczycielski-jogi-rishikesh/": COURSE("200 Hour YTT Rishikesh", YTT),
  "/pt/200-horas-formacao-de-professor-de-yoga-rishikesh/": COURSE("200 Hour YTT Rishikesh", YTT),
  "/sv/200-timmars-yogalararutbildning-rishikesh/": COURSE("200 Hour YTT Rishikesh", YTT),

  // 300 hour
  "/300-hour-yoga-teacher-training-course-rishikesh/": COURSE("300 Hour YTT Rishikesh", YTT),
  "/da/300-timers-yogalaereruddannelse-rishikesh/": COURSE("300 Hour YTT Rishikesh", YTT),
  "/de/300-stunden-yogalehrer-ausbildung-rishikesh/": COURSE("300 Hour YTT Rishikesh", YTT),
  "/es/300-horas-formacion-de-profesor-de-yoga-rishikesh/": COURSE("300 Hour YTT Rishikesh", YTT),
  "/fr/300-heures-formation-professeur-de-yoga-rishikesh/": COURSE("300 Hour YTT Rishikesh", YTT),
  "/it/300-ore-formazione-insegnanti-yoga-rishikesh/": COURSE("300 Hour YTT Rishikesh", YTT),
  "/ja/300-jikan-yoga-shidosha-yosei-rishikesh/": COURSE("300 Hour YTT Rishikesh", YTT),
  "/nl/300-uur-yoga-docentenopleiding-rishikesh/": COURSE("300 Hour YTT Rishikesh", YTT),
  "/pl/300-godzinny-kurs-nauczycielski-jogi-rishikesh/": COURSE("300 Hour YTT Rishikesh", YTT),
  "/pt/300-horas-formacao-de-professor-de-yoga-rishikesh/": COURSE("300 Hour YTT Rishikesh", YTT),
  "/sv/300-timmars-yogalararutbildning-rishikesh/": COURSE("300 Hour YTT Rishikesh", YTT),

  // 500 hour
  "/500-hour-yoga-teacher-training-course-rishikesh/": COURSE("500 Hour YTT Rishikesh", YTT),
  "/da/500-timers-yogalaereruddannelse-rishikesh/": COURSE("500 Hour YTT Rishikesh", YTT),
  "/de/500-stunden-yogalehrer-ausbildung-rishikesh/": COURSE("500 Hour YTT Rishikesh", YTT),
  "/es/500-horas-formacion-de-profesor-de-yoga-rishikesh/": COURSE("500 Hour YTT Rishikesh", YTT),
  "/fr/500-heures-formation-professeur-de-yoga-rishikesh/": COURSE("500 Hour YTT Rishikesh", YTT),
  "/it/500-ore-formazione-insegnanti-yoga-rishikesh/": COURSE("500 Hour YTT Rishikesh", YTT),
  "/ja/500-jikan-yoga-shidosha-yosei-rishikesh/": COURSE("500 Hour YTT Rishikesh", YTT),
  "/nl/500-uur-yoga-docentenopleiding-rishikesh/": COURSE("500 Hour YTT Rishikesh", YTT),
  "/pl/500-godzinny-kurs-nauczycielski-jogi-rishikesh/": COURSE("500 Hour YTT Rishikesh", YTT),
  "/pt/500-horas-formacao-de-professor-de-yoga-rishikesh/": COURSE("500 Hour YTT Rishikesh", YTT),
  "/sv/500-timmars-yogalararutbildning-rishikesh/": COURSE("500 Hour YTT Rishikesh", YTT),

  // Sound Healing — the fourth course the admission panel actually sells, so it
  // is worth retargeting on the same terms. Its own category, because it is not
  // a yoga teacher training and mixing the two would blur both audiences.
  "/sound-healing-ttc-rishikesh/": COURSE("Sound Healing TTC Rishikesh", "Sound Healing"),
  "/da/lydhealing-uddannelse-rishikesh/": COURSE("Sound Healing TTC Rishikesh", "Sound Healing"),
  "/de/klangheilung-ausbildung-rishikesh/": COURSE("Sound Healing TTC Rishikesh", "Sound Healing"),
  "/es/formacion-sonoterapia-rishikesh/": COURSE("Sound Healing TTC Rishikesh", "Sound Healing"),
  "/fr/formation-sonotherapie-rishikesh/": COURSE("Sound Healing TTC Rishikesh", "Sound Healing"),
  "/it/formazione-sonoterapia-rishikesh/": COURSE("Sound Healing TTC Rishikesh", "Sound Healing"),
  "/ja/sound-healing-yosei-rishikesh/": COURSE("Sound Healing TTC Rishikesh", "Sound Healing"),
  "/nl/klankhealing-opleiding-rishikesh/": COURSE("Sound Healing TTC Rishikesh", "Sound Healing"),
  "/pl/kurs-terapii-dzwiekiem-rishikesh/": COURSE("Sound Healing TTC Rishikesh", "Sound Healing"),
  "/pt/formacao-em-terapia-sonora-rishikesh/": COURSE("Sound Healing TTC Rishikesh", "Sound Healing"),
  "/sv/ljudhealing-utbildning-rishikesh/": COURSE("Sound Healing TTC Rishikesh", "Sound Healing"),
};

/** The ViewContent payload for a path, or null if it is not a course page. */
export function courseContentFor(pathname) {
  if (!pathname) return null;
  const p = pathname.endsWith("/") ? pathname : pathname + "/";
  return COURSE_PAGES[p] || null;
}

/**
 * The same canonical names, reachable from the admission panel.
 *
 * ViewContent identifies a course by path; InitiateCheckout and Purchase know it
 * as the panel's course key, or as the label that travels to /thank-you/ on the
 * query string. All three have to resolve to one string or Meta reports the same
 * course under three different names and none of the funnels line up.
 */
export const CONTENT_NAME_BY_COURSE = {
  "200 Hour YTTC": "200 Hour YTT Rishikesh",
  "300 Hour YTTC": "300 Hour YTT Rishikesh",
  "500 Hour YTTC": "500 Hour YTT Rishikesh",
  "Sound Healing": "Sound Healing TTC Rishikesh",
};

/**
 * Resolve a course key, or the label used on the thank-you URL, to the canonical
 * name. The label arrives with any bundle appended ("200 Hour Yoga Teacher
 * Training + Sound Healing TTC"), so it is matched on its leading course.
 */
export function contentNameFor(courseOrLabel) {
  const v = String(courseOrLabel || "").trim();
  if (!v) return "";
  if (CONTENT_NAME_BY_COURSE[v]) return CONTENT_NAME_BY_COURSE[v];
  if (/^200\s*hour/i.test(v)) return CONTENT_NAME_BY_COURSE["200 Hour YTTC"];
  if (/^300\s*hour/i.test(v)) return CONTENT_NAME_BY_COURSE["300 Hour YTTC"];
  if (/^500\s*hour/i.test(v)) return CONTENT_NAME_BY_COURSE["500 Hour YTTC"];
  if (/sound\s*healing/i.test(v)) return CONTENT_NAME_BY_COURSE["Sound Healing"];
  return v;
}

/**
 * The completed-payment details on a /thank-you/ URL, or null when the page was
 * not reached by a payment.
 *
 * `pending=1` means the seat is held and the payment link is still to be sent —
 * no money has changed hands, so that is a Lead but never a Purchase.
 */
export function purchaseFrom(search) {
  const q = new URLSearchParams(search || "");
  if (q.get("pending") === "1") return null;
  const paid = Number(q.get("paid"));
  if (!paid || Number.isNaN(paid)) return null;
  const name = contentNameFor(q.get("course"));
  return { value: paid, currency: "EUR", ...(name ? { content_name: name } : {}) };
}
