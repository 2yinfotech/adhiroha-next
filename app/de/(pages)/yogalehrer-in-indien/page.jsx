// German Unsere Lehrer page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-teachers-in-india/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-teachers-in-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, teacherSchemas, hreflangFor } from "@/lib/seo";

const DE = "/de/yogalehrer-in-indien/";
const EN = "/yoga-teachers-in-india/";

export const metadata = {
  title: "Unsere Yogalehrer in Rishikesh, Indien | Adhiroha",
  description: "Lerne die Yoga-Acharyas von Adhiroha in Rishikesh kennen, jeder ein Spezialist mit 9–20 Jahren Erfahrung in seinem eigenen Fach.",
  alternates: {
    canonical: DE,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "de_DE", url: `${SITE}${DE}`,
    title: "Unsere Yogalehrer in Rishikesh, Indien | Adhiroha", description: "Lerne die Yoga-Acharyas von Adhiroha in Rishikesh kennen, jeder ein Spezialist mit 9–20 Jahren Erfahrung in seinem eigenen Fach.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unsere Yogalehrer in Rishikesh, Indien | Adhiroha",
    description: "Lerne die Yoga-Acharyas von Adhiroha in Rishikesh kennen, jeder ein Spezialist mit 9–20 Jahren Erfahrung in seinem eigenen Fach.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  ...teacherSchemas("de"),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Unsere Lehrer", url: DE }])
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
