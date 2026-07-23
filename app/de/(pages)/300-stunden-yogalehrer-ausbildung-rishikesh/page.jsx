// German 300-hour course page — served at /de/300-stunden-yogalehrer-ausbildung-rishikesh.
// Reuses the English course page's stylesheet and script unchanged; only the copy differs.
import "../../../(main)/300-hour-yoga-teacher-training-course-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(main)/300-hour-yoga-teacher-training-course-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/de/300-stunden-yogalehrer-ausbildung-rishikesh/";
const EN = "/300-hour-yoga-teacher-training-course-rishikesh/";

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
  title: "300-Stunden Yogalehrer-Ausbildung in Rishikesh | Adhiroha",
  description:
    "Vertiefe deine Praxis mit unserer 300-Stunden Yogalehrer-Ausbildung in Rishikesh. 30 Tage fortgeschrittene Asana, Pranayama und Philosophie im Yoga-Alliance-Ashram.",
  alternates: {
    canonical: DE,
    languages: { de: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "de_DE",
    url: `${SITE}${DE}`,
    title: "300-Stunden Yogalehrer-Ausbildung in Rishikesh | Adhiroha",
    description:
      "Vertiefe deine Praxis mit unserer 300-Stunden Yogalehrer-Ausbildung in Rishikesh. 30 Tage fortgeschrittene Asana, Pranayama und Philosophie im Yoga-Alliance-Ashram.",
  },
};

const pageSchema = graph(
  courseSchema({
    name: "300-Stunden Yogalehrer-Ausbildung in Rishikesh",
    description: metadata.description,
    url: DE,
    price: 1500,
    days: 30,
    styles: "Fortgeschrittene Asana, Pranayama, Kriya, Yoga-Philosophie, Anatomie, fortgeschrittene Unterrichtsmethodik",
  }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "300-Stunden Yogalehrer-Ausbildung", url: DE }])
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
