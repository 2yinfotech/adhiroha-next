/**
 * The follow-up sequence: four emails over fourteen days.
 *
 *   Day 0   welcome, what the course actually is, the handbook
 *   Day 2   the practical questions — fees, dates, what is included
 *   Day 5   what past students say, and the ashram itself
 *   Day 10  a last, short nudge toward a real conversation
 *
 * After day 14 with no reply the lead goes cold and nothing further is sent.
 * A reply at any point stops the sequence immediately.
 *
 * Written as plain text with a light HTML wrapper rather than a designed
 * template: these are meant to read like a person at the ashram wrote them, and
 * a marketing layout undoes that. Every one of them asks a question, because a
 * reply is the entire point — it is also what takes the lead off the sequence.
 *
 * Facts here must stay true to the site: courses start on the 1st, the retreat
 * on the 24th, fees from €1275 / €1500 / €2700 triple-sharing, and Adhiroha is
 * a Registered Yoga School with Yoga Alliance at RYS 200, 300 and 500. Never
 * "affiliated", never "dual certification".
 */

const SITE = "https://www.adhiroha.com";
const WHATSAPP = "https://wa.me/919999048900";

const firstName = (lead) => (String(lead.l_name || "").trim().split(/\s+/)[0] || "there");

/** Pulls the course out of the message the landing page composed, if it is there. */
export function courseOf(lead) {
  const m = String(lead.l_message || "").match(/Yoga Program:\s*([^<\n]+)/i);
  return m ? m[1].trim() : "";
}

function monthOf(lead) {
  const m = String(lead.l_message || "").match(/Selected Month:\s*([^<\n]+)/i);
  return m ? m[1].trim() : "";
}

/* The wrapper. Deliberately plain — a table-based marketing layout would fight
   the tone of the writing, and plain HTML renders correctly everywhere. */
function wrap(bodyHtml) {
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:#2c2723;max-width:600px">
${bodyHtml}
<p style="margin:26px 0 0">Warmly,<br>
<strong>Adhiroha Yoga School</strong><br>
<span style="color:#6b7280;font-size:13.5px">Upper Tapovan, Rishikesh, Uttarakhand, India<br>
+91-9999-048-900 &middot; <a href="mailto:info@adhiroha.com" style="color:#b8342f">info@adhiroha.com</a></span></p>
<p style="margin:22px 0 0;padding-top:14px;border-top:1px solid #e8e3da;color:#9ca3af;font-size:12px">
Registered Yoga School with Yoga Alliance, USA &middot; RYS 200, RYS 300 and RYS 500<br>
You are receiving this because you enquired about a teacher training at Adhiroha.
Reply with &ldquo;stop&rdquo; and we will not write again.</p>
</div>`;
}

const p = (t) => `<p style="margin:0 0 14px">${t}</p>`;

export const SEQUENCE = [
  {
    step: 1,
    delayDays: 0,
    subject: (lead) => {
      const c = courseOf(lead);
      return c ? `Your ${c} enquiry — everything you asked for` : "Your yoga teacher training enquiry — Adhiroha, Rishikesh";
    },
    html: (lead) => {
      const c = courseOf(lead);
      const m = monthOf(lead);
      return wrap(
        p(`Hello ${firstName(lead)},`) +
        p(`Thank you for writing to us${c ? ` about the <strong>${c}</strong>` : ""}. I am glad you did.`) +
        (m ? p(`You mentioned <strong>${m}</strong>. That batch is open — our courses begin on the 1st of every month, and we keep each group small on purpose.`) : "") +
        p(`Here is the short version of what a month with us looks like: you live on the ashram in Upper Tapovan, above Rishikesh, with the Ganga below and the hills behind. Mornings begin with pranayama and asana while the air is still cool. Afternoons are anatomy, philosophy and teaching practice. Evenings soften into meditation. Three sattvic meals a day, your room, and the excursions are all inside the fee.`) +
        p(`The full details — day-by-day syllabus, dates and fees — are here:<br>
<a href="${SITE}/200-hour-yoga-teacher-training-course-rishikesh/" style="color:#b8342f">200 Hour</a> &nbsp;·&nbsp;
<a href="${SITE}/300-hour-yoga-teacher-training-course-rishikesh/" style="color:#b8342f">300 Hour</a> &nbsp;·&nbsp;
<a href="${SITE}/500-hour-yoga-teacher-training-course-rishikesh/" style="color:#b8342f">500 Hour</a>`) +
        p(`<strong>What would you like to know first?</strong> Most people ask about dates, visas, or whether they are fit enough — just reply and I will answer properly, not with a brochure.`)
      );
    },
  },

  {
    step: 2,
    delayDays: 2,
    subject: () => "The practical bits — fees, dates, what is included",
    html: (lead) =>
      wrap(
        p(`Hello ${firstName(lead)},`) +
        p(`I thought I would send the practical answers, since these are what most people want next.`) +
        p(`<strong>When:</strong> every course begins on the 1st of the month. The 200 hour runs 24 days, the 300 hour 30 days, the 500 hour two months back to back.`) +
        p(`<strong>Fees:</strong> from €1275 for the 200 hour, €1500 for the 300 hour and €2700 for the 500 hour, on triple-sharing. That figure is all-inclusive — your room, three meals a day, course materials, the excursions and your certificate. There is no second invoice when you arrive.`) +
        p(`<strong>Certificate:</strong> Adhiroha is a Registered Yoga School with Yoga Alliance, USA, at all three levels, and recognised by the Ministry of Ayush. You can <a href="https://app.yogaalliance.org/schoolpublicprofile?id=0013g000002pk6NAAQ&amp;sid=0013g000002npW5AAI&amp;name=Adhiroha" style="color:#b8342f">check our listing yourself</a>.`) +
        p(`<strong>Fitness:</strong> the 200 hour assumes nothing. Complete beginners finish it every month.`) +
        p(`Is there a particular month you are looking at? If you tell me, I will let you know how many places are left in it.`)
      ),
  },

  {
    step: 3,
    delayDays: 5,
    subject: () => "What it is actually like here",
    html: (lead) =>
      wrap(
        p(`Hello ${firstName(lead)},`) +
        p(`Rather than tell you we are good, here are people who have no reason to say so:`) +
        p(`<a href="${SITE}/soon-after-message/" style="color:#b8342f">Messages our graduates sent after they got home</a> — unedited, from students of more than 70 countries.`) +
        p(`And if you would like to see the place before you decide: <a href="${SITE}/yoga-gallery-india/" style="color:#b8342f">181 honest photographs</a> of the shala, the rooms and the food. Not styled, just what it looks like.`) +
        p(`One thing worth saying plainly: this is an ashram, not a resort. Early mornings, simple food, no alcohol. Most people find that is exactly why the month works on them.`) +
        p(`Would it help to speak to someone who has done the course? I can put you in touch.`)
      ),
  },

  {
    step: 4,
    delayDays: 10,
    subject: () => "Shall I keep a place for you?",
    html: (lead) =>
      wrap(
        p(`Hello ${firstName(lead)},`) +
        p(`I will stop writing after this one — I would rather be useful than persistent.`) +
        p(`If the timing is not right, that is completely fine. Our courses run every month and the door stays open.`) +
        p(`But if you are close to deciding and something specific is holding you back — the dates, the money, the flight, whether you are ready — tell me what it is. I have probably answered it before.`) +
        p(`The quickest way to talk is <a href="${WHATSAPP}" style="color:#b8342f">WhatsApp</a>, or simply reply to this email.`)
      ),
  },
];

/** How long after the first email the sequence gives up entirely. */
export const SEQUENCE_ENDS_AFTER_DAYS = 14;

export function stepDefinition(step) {
  return SEQUENCE.find((s) => s.step === step) || null;
}

export function renderStep(step, lead) {
  const def = stepDefinition(step);
  if (!def) return null;
  return { subject: def.subject(lead), html: def.html(lead) };
}
