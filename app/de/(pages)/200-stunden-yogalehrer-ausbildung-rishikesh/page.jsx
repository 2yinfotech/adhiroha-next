// German 200-hour course page — served at /de/200-stunden-yogalehrer-ausbildung-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(main)/200-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/200-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/de/200-stunden-yogalehrer-ausbildung-rishikesh/";
const EN = "/200-hour-yoga-teacher-training-course-rishikesh/";

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
  title: "200-Stunden Yogalehrer-Ausbildung in Rishikesh | Adhiroha",
  description:
    "Von Yoga Alliance zertifizierte 200-Stunden Yogalehrer-Ausbildung in Rishikesh. 24 Tage, kleine Gruppen, Himalaya-Ashram, alle Mahlzeiten und Ausflüge inklusive.",
  alternates: {
    canonical: DE,
    languages: { de: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "de_DE",
    url: `${SITE}${DE}`,
    title: "200-Stunden Yogalehrer-Ausbildung in Rishikesh | Adhiroha",
    description:
      "Von Yoga Alliance zertifizierte 200-Stunden Yogalehrer-Ausbildung in Rishikesh. 24 Tage, kleine Gruppen, Himalaya-Ashram, alle Mahlzeiten und Ausflüge inklusive.",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "200-Stunden Yogalehrer-Ausbildung in Rishikesh",
    description: metadata.description,
    url: DE,
    price: 1275,
    days: 24,
    styles: "Hatha Yoga, Ashtanga Vinyasa, Pranayama, Meditation, Yoga-Philosophie, Anatomie, Unterrichtsmethodik",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "200-Stunden Yogalehrer-Ausbildung", url: DE }])
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
