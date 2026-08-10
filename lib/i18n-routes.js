// The one canonical translation map for the site, keyed by page identity — the
// English URL of the page. Everything hreflang needs is derived from it.
//
// Why this file exists: the audit found the international setup was inert.
// The 26 English pages emitted no hreflang at all, and every translated page
// listed only three alternates (itself, English, x-default) out of the eleven
// languages that exist. Google discards any annotation that is not reciprocal,
// so a German page pointing at English while the English page pointed back at
// nobody meant the whole cluster was thrown away.
//
// The rule this file enforces: every page in a cluster points at every other
// page in that cluster, itself included, and all of them emit the identical
// set. Because the set is generated from one map rather than hand-written per
// page, it cannot drift out of reciprocity.
//
// A cluster only lists the languages that actually have that page. /privacy-policy/
// exists in English, German and French and nothing else, so its cluster is three
// entries — pointing at translations that do not exist is worse than omitting them.

export const SITE = "https://www.adhiroha.com";

// Every language the site publishes, English aside.
export const TRANSLATED_LOCALES = ["da", "de", "es", "fr", "it", "ja", "nl", "pl", "pt", "sv"];

// English path -> the same page in every language that has it.
export const TRANSLATIONS = {
  "/": {
    da: "/da/",
    de: "/de/",
    es: "/es/",
    fr: "/fr/",
    it: "/it/",
    ja: "/ja/",
    nl: "/nl/",
    pl: "/pl/",
    pt: "/pt/",
    sv: "/sv/",
  },
  "/200-hour-yoga-teacher-training-course-rishikesh/": {
    da: "/da/200-timers-yogalaereruddannelse-rishikesh/",
    de: "/de/200-stunden-yogalehrer-ausbildung-rishikesh/",
    es: "/es/200-horas-formacion-de-profesor-de-yoga-rishikesh/",
    fr: "/fr/200-heures-formation-professeur-de-yoga-rishikesh/",
    it: "/it/200-ore-formazione-insegnanti-yoga-rishikesh/",
    ja: "/ja/200-jikan-yoga-shidosha-yosei-rishikesh/",
    nl: "/nl/200-uur-yoga-docentenopleiding-rishikesh/",
    pl: "/pl/200-godzinny-kurs-nauczycielski-jogi-rishikesh/",
    pt: "/pt/200-horas-formacao-de-professor-de-yoga-rishikesh/",
    sv: "/sv/200-timmars-yogalararutbildning-rishikesh/",
  },
  "/300-hour-yoga-teacher-training-course-rishikesh/": {
    da: "/da/300-timers-yogalaereruddannelse-rishikesh/",
    de: "/de/300-stunden-yogalehrer-ausbildung-rishikesh/",
    es: "/es/300-horas-formacion-de-profesor-de-yoga-rishikesh/",
    fr: "/fr/300-heures-formation-professeur-de-yoga-rishikesh/",
    it: "/it/300-ore-formazione-insegnanti-yoga-rishikesh/",
    ja: "/ja/300-jikan-yoga-shidosha-yosei-rishikesh/",
    nl: "/nl/300-uur-yoga-docentenopleiding-rishikesh/",
    pl: "/pl/300-godzinny-kurs-nauczycielski-jogi-rishikesh/",
    pt: "/pt/300-horas-formacao-de-professor-de-yoga-rishikesh/",
    sv: "/sv/300-timmars-yogalararutbildning-rishikesh/",
  },
  "/500-hour-yoga-teacher-training-course-rishikesh/": {
    da: "/da/500-timers-yogalaereruddannelse-rishikesh/",
    de: "/de/500-stunden-yogalehrer-ausbildung-rishikesh/",
    es: "/es/500-horas-formacion-de-profesor-de-yoga-rishikesh/",
    fr: "/fr/500-heures-formation-professeur-de-yoga-rishikesh/",
    it: "/it/500-ore-formazione-insegnanti-yoga-rishikesh/",
    ja: "/ja/500-jikan-yoga-shidosha-yosei-rishikesh/",
    nl: "/nl/500-uur-yoga-docentenopleiding-rishikesh/",
    pl: "/pl/500-godzinny-kurs-nauczycielski-jogi-rishikesh/",
    pt: "/pt/500-horas-formacao-de-professor-de-yoga-rishikesh/",
    sv: "/sv/500-timmars-yogalararutbildning-rishikesh/",
  },
  "/about-us/": {
    da: "/da/om-os/",
    de: "/de/ueber-uns/",
    es: "/es/sobre-nosotros/",
    fr: "/fr/a-propos/",
    it: "/it/chi-siamo/",
    ja: "/ja/adhiroha-ni-tsuite/",
    nl: "/nl/over-ons/",
    pl: "/pl/o-nas/",
    pt: "/pt/sobre-nos/",
    sv: "/sv/om-oss/",
  },
  "/ashtanga-teacher-training-course-rishikesh/": {
    da: "/da/ashtanga-vinyasa-yogalaereruddannelse-rishikesh/",
    de: "/de/ashtanga-vinyasa-yogalehrer-ausbildung-rishikesh/",
    es: "/es/ashtanga-vinyasa-formacion-de-profesor-de-yoga-rishikesh/",
    fr: "/fr/ashtanga-vinyasa-formation-professeur-de-yoga-rishikesh/",
    it: "/it/ashtanga-vinyasa-formazione-insegnanti-yoga-rishikesh/",
    ja: "/ja/ashtanga-vinyasa-yoga-shidosha-yosei-rishikesh/",
    nl: "/nl/ashtanga-vinyasa-yoga-docentenopleiding-rishikesh/",
    pl: "/pl/ashtanga-vinyasa-kurs-nauczycielski-jogi-rishikesh/",
    pt: "/pt/ashtanga-vinyasa-formacao-de-professor-de-yoga-rishikesh/",
    sv: "/sv/ashtanga-vinyasa-yogalararutbildning-rishikesh/",
  },
  "/contact-us/": {
    da: "/da/kontakt/",
    de: "/de/kontakt/",
    es: "/es/contacto/",
    fr: "/fr/contact/",
    it: "/it/contatti/",
    ja: "/ja/otoiawase/",
    nl: "/nl/contact/",
    pl: "/pl/kontakt/",
    pt: "/pt/contato/",
    sv: "/sv/kontakt/",
  },
  "/faqs-of-yoga-school-in-india/": {
    de: "/de/faq-yogaschule-indien/",
    fr: "/fr/faq-ecole-de-yoga-inde/",
  },
  "/hatha-teacher-training-course-rishikesh/": {
    da: "/da/hatha-yin-yogalaereruddannelse-rishikesh/",
    de: "/de/hatha-yin-yogalehrer-ausbildung-rishikesh/",
    es: "/es/hatha-yin-formacion-de-profesor-de-yoga-rishikesh/",
    fr: "/fr/hatha-yin-formation-professeur-de-yoga-rishikesh/",
    it: "/it/hatha-yin-formazione-insegnanti-yoga-rishikesh/",
    ja: "/ja/hatha-yin-yoga-shidosha-yosei-rishikesh/",
    nl: "/nl/hatha-yin-yoga-docentenopleiding-rishikesh/",
    pl: "/pl/hatha-yin-kurs-nauczycielski-jogi-rishikesh/",
    pt: "/pt/hatha-yin-formacao-de-professor-de-yoga-rishikesh/",
    sv: "/sv/hatha-yin-yogalararutbildning-rishikesh/",
  },
  "/pranayama-teacher-training-course-rishikesh/": {
    da: "/da/pranayama-meditation-yogalaereruddannelse-rishikesh/",
    de: "/de/pranayama-meditation-yogalehrer-ausbildung-rishikesh/",
    es: "/es/pranayama-meditacion-formacion-de-profesor-de-yoga-rishikesh/",
    fr: "/fr/pranayama-meditation-formation-professeur-de-yoga-rishikesh/",
    it: "/it/pranayama-meditazione-formazione-insegnanti-yoga-rishikesh/",
    ja: "/ja/pranayama-meiso-shidosha-yosei-rishikesh/",
    nl: "/nl/pranayama-meditatie-yoga-docentenopleiding-rishikesh/",
    pl: "/pl/pranajama-medytacja-kurs-nauczycielski-jogi-rishikesh/",
    pt: "/pt/pranayama-meditacao-formacao-de-professor-de-yoga-rishikesh/",
    sv: "/sv/pranayama-meditation-yogalararutbildning-rishikesh/",
  },
  "/privacy-policy/": {
    de: "/de/datenschutz/",
    fr: "/fr/politique-de-confidentialite/",
  },
  "/sadhana-immersion-programme/": {
    da: "/da/sadhana-fordybelsesprogram/",
    de: "/de/sadhana-immersion-programm/",
    es: "/es/programa-inmersion-sadhana/",
    fr: "/fr/programme-immersion-sadhana/",
    it: "/it/programma-immersione-sadhana/",
    ja: "/ja/sadhana-immersion-program/",
    nl: "/nl/sadhana-immersie-programma/",
    pl: "/pl/program-immersji-sadhana/",
    pt: "/pt/programa-de-imersao-sadhana/",
    sv: "/sv/sadhana-fordjupningsprogram/",
  },
  "/safety-hygiene-in-rishikesh/": {
    da: "/da/sikkerhed-og-hygiejne-rishikesh/",
    de: "/de/sicherheit-hygiene-rishikesh/",
    es: "/es/seguridad-higiene-rishikesh/",
    fr: "/fr/securite-hygiene-rishikesh/",
    it: "/it/sicurezza-igiene-rishikesh/",
    ja: "/ja/anzen-to-eisei-rishikesh/",
    nl: "/nl/veiligheid-en-hygiene-rishikesh/",
    pl: "/pl/bezpieczenstwo-i-higiena-rishikesh/",
    pt: "/pt/seguranca-e-higiene-rishikesh/",
    sv: "/sv/sakerhet-och-hygien-rishikesh/",
  },
  "/soon-after-message/": {
    da: "/da/hilsner-fra-tidligere-elever/",
    de: "/de/willkommensnachricht/",
    es: "/es/mensaje-de-exalumnos/",
    fr: "/fr/message-des-anciens/",
    it: "/it/messaggi-degli-ex-studenti/",
    ja: "/ja/sotsugyosei-kara-no-message/",
    nl: "/nl/berichten-van-oud-studenten/",
    pl: "/pl/wiadomosci-od-absolwentow/",
    pt: "/pt/mensagens-de-ex-alunos/",
    sv: "/sv/halsningar-fran-tidigare-elever/",
  },
  "/sound-healing-ttc-rishikesh/": {
    da: "/da/lydhealing-uddannelse-rishikesh/",
    de: "/de/klangheilung-ausbildung-rishikesh/",
    es: "/es/formacion-sonoterapia-rishikesh/",
    fr: "/fr/formation-sonotherapie-rishikesh/",
    it: "/it/formazione-sonoterapia-rishikesh/",
    ja: "/ja/sound-healing-yosei-rishikesh/",
    nl: "/nl/klankhealing-opleiding-rishikesh/",
    pl: "/pl/kurs-terapii-dzwiekiem-rishikesh/",
    pt: "/pt/formacao-em-terapia-sonora-rishikesh/",
    sv: "/sv/ljudhealing-utbildning-rishikesh/",
  },
  "/yoga-ashram-in-india-code-of-conduct/": {
    da: "/da/adfaerdskodeks/",
    de: "/de/verhaltenskodex/",
    es: "/es/codigo-de-conducta/",
    fr: "/fr/code-de-conduite/",
    it: "/it/codice-di-condotta/",
    ja: "/ja/kodo-kihan/",
    nl: "/nl/gedragscode/",
    pl: "/pl/kodeks-postepowania/",
    pt: "/pt/codigo-de-conduta/",
    sv: "/sv/uppforandekod/",
  },
  "/yoga-gallery-india/": {
    da: "/da/yogagalleri-indien/",
    de: "/de/yoga-galerie-indien/",
    es: "/es/galeria-yoga-india/",
    fr: "/fr/galerie-yoga-inde/",
    it: "/it/galleria-yoga-india/",
    ja: "/ja/yoga-gallery-indo/",
    nl: "/nl/yoga-galerij-india/",
    pl: "/pl/galeria-jogi-indie/",
    pt: "/pt/galeria-de-yoga-india/",
    sv: "/sv/yogagalleri-indien/",
  },
  "/yoga-teacher-training-course-rishikesh-india/": {
    da: "/da/yogalaereruddannelse-i-indien/",
    de: "/de/yogalehrer-ausbildung-rishikesh-indien/",
    es: "/es/formacion-de-profesor-de-yoga-en-india/",
    fr: "/fr/formation-professeur-de-yoga-en-inde/",
    it: "/it/formazione-insegnanti-yoga-in-india/",
    ja: "/ja/indo-no-yoga-shidosha-yosei/",
    nl: "/nl/yoga-docentenopleiding-in-india/",
    pl: "/pl/kurs-nauczycielski-jogi-w-indiach/",
    pt: "/pt/formacao-de-professor-de-yoga-na-india/",
    sv: "/sv/yogalararutbildning-i-indien/",
  },
  "/yoga-teachers-in-india/": {
    da: "/da/yogalaerere-i-indien/",
    de: "/de/yogalehrer-in-indien/",
    es: "/es/profesores-de-yoga-en-india/",
    fr: "/fr/professeurs-de-yoga-en-inde/",
    it: "/it/insegnanti-di-yoga-in-india/",
    ja: "/ja/indo-no-yoga-koshi/",
    nl: "/nl/yogadocenten-in-india/",
    pl: "/pl/nauczyciele-jogi-w-indiach/",
    pt: "/pt/professores-de-yoga-na-india/",
    sv: "/sv/yogalarare-i-indien/",
  },};

// Reverse index: any URL on the site -> the English URL that identifies its
// cluster. Lets a page ask for its alternates without having to know that the
// key is the English path.
const IDENTITY = (() => {
  const map = new Map();
  for (const [en, cluster] of Object.entries(TRANSLATIONS)) {
    map.set(en, en);
    for (const localized of Object.values(cluster)) map.set(localized, en);
  }
  return map;
})();

/**
 * The full hreflang set for the cluster a page belongs to, ready to hand to
 * Next.js as `alternates.languages`. Pass any URL in the cluster — the English
 * one or any translation — and you get the same complete set back, self-
 * reference included, which is exactly what reciprocity requires.
 *
 * Returns undefined for a page with no translations, so pages outside a cluster
 * emit no hreflang rather than a pointless one-entry annotation.
 */
export function hreflangFor(url) {
  const en = IDENTITY.get(url);
  if (!en) return undefined;
  const cluster = TRANSLATIONS[en];
  const languages = { en: SITE + en };
  for (const locale of TRANSLATED_LOCALES) {
    if (cluster[locale]) languages[locale] = SITE + cluster[locale];
  }
  // English is the fallback for any language the site does not publish.
  languages["x-default"] = SITE + en;
  return languages;
}
