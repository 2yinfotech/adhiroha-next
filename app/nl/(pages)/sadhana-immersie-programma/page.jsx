// Dutch Sadhana immersion page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/sadhana-immersion-programme/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/sadhana-immersion-programme/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const NL = "/nl/sadhana-immersie-programma/";
const EN = "/sadhana-immersion-programme/";

export const metadata = {
  title: "Sadhana-immersieprogramma in Rishikesh | 15 Dagen — Adhiroha",
  description:
    "Vijftiendaags Sadhana-immersieprogramma in Rishikesh — stilte, eigen beoefening, meditatie, karma yoga en de Bhagavad Gita in het traditionele ashramritme. Vanaf € 699 all-inclusive.",
  alternates: {
    canonical: NL,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "nl_NL", url: `${SITE}${NL}`,
    title: "Sadhana-immersieprogramma in Rishikesh | 15 Dagen — Adhiroha",
    description: "Vijftiendaags Sadhana-immersieprogramma in Rishikesh — stilte, eigen beoefening, meditatie, karma yoga en de Bhagavad Gita in het traditionele ashramritme. Vanaf € 699 all-inclusive.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sadhana-immersieprogramma in Rishikesh | 15 Dagen — Adhiroha",
    description: "Vijftiendaags Sadhana-immersieprogramma in Rishikesh — stilte, eigen beoefening, meditatie, karma yoga en de Bhagavad Gita in het traditionele ashramritme. Vanaf € 699 all-inclusive.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Sadhana-immersieprogramma in Rishikesh",
    description: metadata.description,
    url: NL,
    price: 699,
    days: 15,
    styles: "Hatha yoga, pranayama, meditatie, karma yoga, yogafilosofie",
  ...courseFacts("/sadhana-immersion-programme/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Sadhana-immersieprogramma", url: NL }])
);

export default function Page() {
  return (
    <div lang="nl">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
