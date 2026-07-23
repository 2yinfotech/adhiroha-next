// German Pranayama & Meditation Yogalehrer-Ausbildung in Rishikesh — reuses the English course dir's CSS/JS unchanged.
import "../../(main)/pranayama-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../(main)/pranayama-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/de/pranayama-meditation-yogalehrer-ausbildung-rishikesh/";
const EN = "/pranayama-teacher-training-course-rishikesh/";

const sections = [
  { label: "Einführung", target: "top" },
  { label: "Gebühren", target: "course-glance" },
  { label: "Fächer", target: "curriculum" },
  { label: "Tagesablauf", target: "daily-rhythm" },
  { label: "Ausstattung", target: "amenities" },
  { label: "Unterkunft", target: "accommodation" },
  { label: "Lehrer", target: "your-teachers" },
  { label: "Umgebung", target: "finding-us" },
  { label: "Kontakt", target: "begin" }
];

export const metadata = {
  title: "Pranayama & Meditation Yogalehrer-Ausbildung in Rishikesh | Adhiroha",
  description: "12-tägige Pranayama- & Meditations-Yogalehrer-Ausbildung in Rishikesh, akkreditiert vom Ministry of Ayush. Kleine Gruppen, Ashram-Unterkunft, alle Mahlzeiten inklusive.",
  alternates: {
    canonical: DE,
    languages: { de: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "de_DE", url: `${SITE}${DE}`,
    title: "Pranayama & Meditation Yogalehrer-Ausbildung in Rishikesh | Adhiroha", description: "12-tägige Pranayama- & Meditations-Yogalehrer-Ausbildung in Rishikesh, akkreditiert vom Ministry of Ayush. Kleine Gruppen, Ashram-Unterkunft, alle Mahlzeiten inklusive.",
  },
};

const pageSchema = graph(
  courseSchema({ name: "Pranayama & Meditation Yogalehrer-Ausbildung in Rishikesh", description: metadata.description, url: DE, price: 790, days: 14, styles: "Pranayama, Kriya, Meditation, Yoga-Philosophie" }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Pranayama & Meditation Ausbildung", url: DE }])
);

export default function Page() {
  return (
    <div lang="de">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <SectionNav sections={sections} />
      <PageScripts code={scripts} />
    </div>
  );
}
