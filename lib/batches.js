/**
 * Upcoming batches for the 200, 300 and 500 hour course pages.
 *
 * Every course starts on the 1st of every month. The table of the next twelve
 * batches used to be written into the page by JavaScript after load, so the
 * HTML that search engines and AI crawlers read had an empty <tbody>. It is now
 * rendered on the server from this file, in the page's own language, and the
 * course pages revalidate daily so the months roll forward on their own. The
 * old client-side filler in each course's scripts.js only runs if the server
 * left the table empty.
 *
 * The same dates feed the Course schema's dated CourseInstance nodes.
 */
import { FEES } from "@/lib/admission-fees";

// Last day of each course, counted from the 1st. 500 hours spans two months.
const SPAN = {
  200: { endMonthOffset: 0, endDay: 24 },
  300: { endMonthOffset: 0, endDay: 29 },
  500: { endMonthOffset: 1, endDay: 30 },
};

// "Filling fast" on the two nearest batches, as the client-side table always said.
const FEW = 2;

const T = {
  en: { intl: "en-GB", few: "Filling Fast", ok: "Seats Available", register: "Register" },
  de: { intl: "de-DE", few: "Wenige Plätze", ok: "Plätze frei", register: "Anmelden" },
  fr: { intl: "fr-FR", few: "Places limitées", ok: "Places disponibles", register: "S’inscrire" },
  es: { intl: "es-ES", few: "Últimas plazas", ok: "Plazas disponibles", register: "Inscribirse" },
  it: { intl: "it-IT", few: "Ultimi posti", ok: "Posti disponibili", register: "Iscriviti" },
  pt: { intl: "pt-BR", few: "Últimas vagas", ok: "Vagas disponíveis", register: "Inscrever-se" },
  nl: { intl: "nl-NL", few: "Bijna vol", ok: "Plaatsen vrij", register: "Inschrijven" },
  pl: { intl: "pl-PL", few: "Ostatnie miejsca", ok: "Wolne miejsca", register: "Zapisz się" },
  sv: { intl: "sv-SE", few: "Få platser kvar", ok: "Lediga platser", register: "Anmäl dig" },
  da: { intl: "da-DK", few: "Få pladser tilbage", ok: "Ledige pladser", register: "Tilmeld dig" },
  ja: { intl: "ja-JP", few: "残りわずか", ok: "空きあり", register: "申し込む" },
};

const pad = (n) => String(n).padStart(2, "0");
const iso = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

/**
 * The next `count` batches. A batch that starts today still counts; one that
 * started earlier this month does not (the course runs from the 1st).
 * Dates are taken in India time, where the school is.
 */
export function upcomingBatches(course, count = 12, now = new Date()) {
  const span = SPAN[course];
  if (!span) throw new Error(`No batch span for course ${course}`);
  const ist = new Date(now.getTime() + 330 * 60 * 1000);
  let y = ist.getUTCFullYear();
  let m = ist.getUTCMonth();
  if (ist.getUTCDate() > 1) m += 1;
  const out = [];
  for (let i = 0; i < count; i++) {
    const sm = m + i;
    const sy = y + Math.floor(sm / 12);
    const smi = ((sm % 12) + 12) % 12;
    const em = sm + span.endMonthOffset;
    const ey = y + Math.floor(em / 12);
    const emi = ((em % 12) + 12) % 12;
    // February has no 29th/30th: end on its last day instead.
    const lastDay = new Date(Date.UTC(ey, emi + 1, 0)).getUTCDate();
    out.push({
      year: sy,
      month: smi,
      startDate: iso(sy, smi, 1),
      endDate: iso(ey, emi, Math.min(span.endDay, lastDay)),
      few: i < FEW,
    });
  }
  return out;
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const ARROW =
  '<svg width="16" height="9" viewBox="0 0 20 10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M1 5h17M14 1l4 4-4 4"/></svg>';

/** The <tr> rows of the upcoming-batches table, as plain HTML. */
export function batchRowsHtml(course, locale = "en", now = new Date()) {
  const t = T[locale] || T.en;
  const fees = FEES[course];
  const monthFmt = new Intl.DateTimeFormat(t.intl, { month: "long", year: "numeric", timeZone: "UTC" });
  const rangeFmt = new Intl.DateTimeFormat(t.intl, { day: "numeric", month: "short", timeZone: "UTC" });
  const eur = (n) => `&euro;${n}`;
  return upcomingBatches(course, 12, now)
    .map((b) => {
      const start = new Date(`${b.startDate}T00:00:00Z`);
      const end = new Date(`${b.endDate}T00:00:00Z`);
      const label = monthFmt.format(start);
      const range = rangeFmt.formatRange(start, end);
      return (
        "<tr>" +
        `<td class="mo">${esc(label.charAt(0).toUpperCase() + label.slice(1))}</td>` +
        `<td><time datetime="${b.startDate}">${esc(range)}</time></td>` +
        `<td class="fee">${eur(fees.triple.total)}</td>` +
        `<td class="fee">${eur(fees.double.total)}</td>` +
        `<td class="fee">${eur(fees.single.total)}</td>` +
        `<td><span class="seat ${b.few ? "few" : "ok"}"><i></i>${esc(b.few ? t.few : t.ok)}</span></td>` +
        `<td><a class="course-link" href="/student-admission-panel/?course=${course}">${esc(t.register)} ${ARROW}</a></td>` +
        "</tr>"
      );
    })
    .join("");
}

/**
 * Put the rows into a course page's HTML. The content strings carry an empty
 * `<tbody id="dates-tbody"></tbody>`; a page without one is returned unchanged.
 */
export function withBatchTable(html, course, locale = "en", now = new Date()) {
  return html.replace(
    /<tbody id="dates-tbody"><\/tbody>/,
    `<tbody id="dates-tbody">${batchRowsHtml(course, locale, now)}</tbody>`
  );
}
