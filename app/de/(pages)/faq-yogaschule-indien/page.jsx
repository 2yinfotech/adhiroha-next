// German FAQ page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/faqs-of-yoga-school-in-india/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/faqs-of-yoga-school-in-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const DE = "/de/faq-yogaschule-indien/";
const EN = "/faqs-of-yoga-school-in-india/";

export const metadata = {
  title: "FAQ | Yogalehrer-Ausbildungsschule in Rishikesh, Indien | Adhiroha",
  description: "Häufige Fragen zur Yogalehrer-Ausbildung in Rishikesh, zu Kurs, Anreise, Essen, Anmeldung und Abschluss, klar beantwortet.",
  alternates: {
    canonical: DE,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "de_DE", url: `${SITE}${DE}`,
    title: "FAQ | Yogalehrer-Ausbildungsschule in Rishikesh, Indien | Adhiroha", description: "Häufige Fragen zur Yogalehrer-Ausbildung in Rishikesh, zu Kurs, Anreise, Essen, Anmeldung und Abschluss, klar beantwortet.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Yogalehrer-Ausbildungsschule in Rishikesh, Indien | Adhiroha",
    description: "Häufige Fragen zur Yogalehrer-Ausbildung in Rishikesh, zu Kurs, Anreise, Essen, Anmeldung und Abschluss, klar beantwortet.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "FAQ", url: DE }])
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
