// Italian YTTC hub page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-teacher-training-course-rishikesh-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-teacher-training-course-rishikesh-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const IT = "/it/formazione-insegnanti-yoga-in-india/";
const EN = "/yoga-teacher-training-course-rishikesh-india/";

export const metadata = {
  title: "Formazione Insegnanti di Yoga in India | YTTC 200, 300 e 500 Ore a Rishikesh | Adhiroha",
  description:
    "Formazione insegnanti di yoga in India presso Adhiroha, Rishikesh — corsi residenziali certificati Yoga Alliance di 200, 300 e 500 ore. Oltre 3.000 studenti da 70+ paesi. Quota tutto incluso, certificazione riconosciuta a livello internazionale.",
  keywords: [
    "formazione insegnanti di yoga in india",
    "formazione insegnanti di yoga a rishikesh",
    "formazione insegnanti di yoga 200 ore india",
    "formazione insegnanti di yoga 300 ore",
    "formazione insegnanti di yoga 500 ore rishikesh",
    "yoga ttc india",
  ],
  alternates: {
    canonical: IT,
    languages: { it: `${SITE}${IT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "it_IT", url: `${SITE}${IT}`,
    title: "Formazione Insegnanti di Yoga in India | YTTC 200, 300 e 500 Ore a Rishikesh",
    description:
      "Formazione insegnanti di yoga certificata Yoga Alliance di 200, 300 e 500 ore a Rishikesh, India. Tutto incluso, certificazione riconosciuta a livello internazionale.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formazione Insegnanti di Yoga in India | YTTC 200, 300 e 500 Ore a Rishikesh",
    description: "Formazione insegnanti di yoga certificata Yoga Alliance di 200, 300 e 500 ore a Rishikesh, India. Tutto incluso, certificazione riconosciuta a livello internazionale.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Formazione Insegnanti di Yoga di 200 Ore a Rishikesh, India",
    description:
      "Corso residenziale di formazione insegnanti di yoga di 200 ore certificato Yoga Alliance a Rishikesh, India — la base per principianti in asana, pranayama, anatomia, filosofia e pratica di insegnamento.",
    url: "/it/200-ore-formazione-insegnanti-yoga-rishikesh/",
    price: 1275,
    days: 24,
    styles: "Hatha, Ashtanga Vinyasa e Yin yoga",
  }),
  courseSchema({
    name: "Formazione Insegnanti di Yoga di 300 Ore a Rishikesh, India",
    description:
      "Corso residenziale avanzato di formazione insegnanti di yoga di 300 ore a Rishikesh, India per diplomati delle 200 ore, a completamento del percorso RYT 500.",
    url: "/it/300-ore-formazione-insegnanti-yoga-rishikesh/",
    price: 1500,
    days: 30,
    styles: "Hatha, Ashtanga Vinyasa e Allineamento",
  }),
  courseSchema({
    name: "Formazione Insegnanti di Yoga di 500 Ore a Rishikesh, India",
    description:
      "Corso residenziale di formazione insegnanti di yoga di 500 ore a Rishikesh, India — l'immersione completa di 60 giorni che combina il programma delle 200 e 300 ore, dal livello principiante a master.",
    url: "/it/500-ore-formazione-insegnanti-yoga-rishikesh/",
    price: 2790,
    days: 60,
    styles: "Hatha, Ashtanga, Yin e Allineamento",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Formazione Insegnanti di Yoga in India", url: IT }])
);

export default function Page() {
  return (
    <div lang="it">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
