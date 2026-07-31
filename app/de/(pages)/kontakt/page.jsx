// German Kontakt page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/contact-us/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/contact-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const DE = "/de/kontakt/";
const EN = "/contact-us/";

export const metadata = {
  title: "Adhiroha Yoga School kontaktieren | Rishikesh, Indien",
  description: "Nimm Kontakt mit Adhiroha in Rishikesh auf, WhatsApp, Telefon oder E-Mail. Jede Nachricht wird von einem echten Menschen beantwortet, meist innerhalb eines Tages.",
  alternates: {
    canonical: DE,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "de_DE", url: `${SITE}${DE}`,
    title: "Adhiroha Yoga School kontaktieren | Rishikesh, Indien", description: "Nimm Kontakt mit Adhiroha in Rishikesh auf, WhatsApp, Telefon oder E-Mail. Jede Nachricht wird von einem echten Menschen beantwortet, meist innerhalb eines Tages.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adhiroha Yoga School kontaktieren | Rishikesh, Indien",
    description: "Nimm Kontakt mit Adhiroha in Rishikesh auf, WhatsApp, Telefon oder E-Mail. Jede Nachricht wird von einem echten Menschen beantwortet, meist innerhalb eines Tages.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Kontakt", url: DE }])
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
