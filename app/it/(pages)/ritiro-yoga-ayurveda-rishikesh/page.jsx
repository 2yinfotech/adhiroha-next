// Italian Ritiro Yoga & Ayurveda page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-retreat-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-retreat-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const IT = "/it/ritiro-yoga-ayurveda-rishikesh/";
const EN = "/yoga-retreat-in-rishikesh/";

export const metadata = {
  title: "Ritiro di Yoga e Ayurveda a Rishikesh | 6 Giorni — Adhiroha",
  description: "Un ritiro di benessere di 6 giorni tra Yoga e Ayurveda a Rishikesh. Yoga quotidiano, terapie ayurvediche, pasti sattvici e la quiete dell'Himalaya — da €510 tutto incluso.",
  alternates: {
    canonical: IT,
    languages: { it: `${SITE}${IT}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "it_IT", url: `${SITE}${IT}`,
    title: "Ritiro di Yoga e Ayurveda a Rishikesh | 6 Giorni — Adhiroha", description: "Un ritiro di benessere di 6 giorni tra Yoga e Ayurveda a Rishikesh. Yoga quotidiano, terapie ayurvediche, pasti sattvici e la quiete dell'Himalaya — da €510 tutto incluso.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritiro di Yoga e Ayurveda a Rishikesh | 6 Giorni — Adhiroha",
    description: "Un ritiro di benessere di 6 giorni tra Yoga e Ayurveda a Rishikesh. Yoga quotidiano, terapie ayurvediche, pasti sattvici e la quiete dell'Himalaya — da €510 tutto incluso.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({ name: "Ritiro di Benessere Yoga & Ayurveda a Rishikesh", description: metadata.description, url: IT, price: 510, days: 6, styles: "Hatha yoga, terapie ayurvediche, meditazione, benessere" }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Ritiro di Benessere Yoga & Ayurveda", url: IT }])
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
