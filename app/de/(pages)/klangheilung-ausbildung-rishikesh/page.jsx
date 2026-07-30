// German Klangheilung-Ausbildung page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/sound-healing-ttc-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/sound-healing-ttc-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const DE = "/de/klangheilung-ausbildung-rishikesh/";
const EN = "/sound-healing-ttc-rishikesh/";

export const metadata = {
  title: "Klangheilung-Ausbildung in Rishikesh | Adhiroha",
  description: "6-tägige Klangheilung- & Therapie-Ausbildung in Rishikesh. Tibetische Klangschalen, Gongs und vedische Klangwissenschaft, akkreditiert vom Ministry of Ayush.",
  alternates: {
    canonical: DE,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "de_DE", url: `${SITE}${DE}`,
    title: "Klangheilung-Ausbildung in Rishikesh | Adhiroha", description: "6-tägige Klangheilung- & Therapie-Ausbildung in Rishikesh. Tibetische Klangschalen, Gongs und vedische Klangwissenschaft, akkreditiert vom Ministry of Ayush.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Klangheilung-Ausbildung in Rishikesh | Adhiroha",
    description: "6-tägige Klangheilung- & Therapie-Ausbildung in Rishikesh. Tibetische Klangschalen, Gongs und vedische Klangwissenschaft, akkreditiert vom Ministry of Ayush.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({ name: "Klangheilung- & Therapie-Ausbildung in Rishikesh", description: metadata.description, url: DE, price: 690, days: 6, styles: "Klangschalen, Gongs, Mantra-Singen, Klangtherapie" , ...courseFacts("/sound-healing-ttc-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Klangheilung-Ausbildung", url: DE }])
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
