// German Yogalehrer-Ausbildung in Indien page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/yoga-teacher-training-course-rishikesh-india/styles.css";
import content from "./content";
import scripts from "../../../(main)/yoga-teacher-training-course-rishikesh-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DE = "/de/yogalehrer-ausbildung-rishikesh-indien/";
const EN = "/yoga-teacher-training-course-rishikesh-india/";

export const metadata = {
  title: "Yogalehrer-Ausbildung in Indien | 200, 300 & 500 Stunden YTTC in Rishikesh | Adhiroha",
  description: "Von Yoga Alliance zertifizierte 200-, 300- & 500-Stunden Yogalehrer-Ausbildung in Rishikesh, Indien. Mit Unterkunft und all-inclusive.",
  alternates: {
    canonical: DE,
    languages: { de: `${SITE}${DE}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "de_DE", url: `${SITE}${DE}`,
    title: "Yogalehrer-Ausbildung in Indien | 200, 300 & 500 Stunden YTTC in Rishikesh | Adhiroha", description: "Von Yoga Alliance zertifizierte 200-, 300- & 500-Stunden Yogalehrer-Ausbildung in Rishikesh, Indien. Mit Unterkunft und all-inclusive.",
  },
};

const pageSchema = graph(
  courseSchema({ name: "200-Stunden Yogalehrer-Ausbildung in Rishikesh, Indien", description: metadata.description, url: DE, price: 1275, days: 24, styles: "Hatha, Ashtanga Vinyasa und Yin Yoga" }),
  courseSchema({ name: "300-Stunden Yogalehrer-Ausbildung in Rishikesh, Indien", description: metadata.description, url: DE, price: 1500, days: 30, styles: "Fortgeschrittene Asana, Pranayama, Philosophie" }),
  courseSchema({ name: "500-Stunden Yogalehrer-Ausbildung in Rishikesh, Indien", description: metadata.description, url: DE, price: 2790, days: 60, styles: "Hatha, Ashtanga Vinyasa, fortgeschrittene Asana" }),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Yogalehrer-Ausbildung in Indien", url: DE }])
);

export default function Page() {
  return (
    <div lang="de">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
