// Portuguese Sadhana immersion page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/sadhana-immersion-programme/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/sadhana-immersion-programme/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const PT = "/pt/programa-de-imersao-sadhana/";
const EN = "/sadhana-immersion-programme/";

export const metadata = {
  title: "Programa de Imersão Sadhana em Rishikesh | 15 Dias — Adhiroha",
  description:
    "Programa de imersão Sadhana de quinze dias em Rishikesh — silêncio, prática pessoal, meditação, karma yoga e o Bhagavad Gita no ritmo tradicional do ashram. A partir de € 699 com tudo incluído.",
  alternates: {
    canonical: PT,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pt_BR", url: `${SITE}${PT}`,
    title: "Programa de Imersão Sadhana em Rishikesh | 15 Dias — Adhiroha",
    description: "Programa de imersão Sadhana de quinze dias em Rishikesh — silêncio, prática pessoal, meditação, karma yoga e o Bhagavad Gita no ritmo tradicional do ashram. A partir de € 699 com tudo incluído.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Programa de Imersão Sadhana em Rishikesh | 15 Dias — Adhiroha",
    description: "Programa de imersão Sadhana de quinze dias em Rishikesh — silêncio, prática pessoal, meditação, karma yoga e o Bhagavad Gita no ritmo tradicional do ashram. A partir de € 699 com tudo incluído.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Programa de Imersão Sadhana em Rishikesh",
    description: metadata.description,
    url: PT,
    price: 699,
    days: 15,
    styles: "Hatha yoga, pranayama, meditação, karma yoga, filosofia do yoga",
  ...courseFacts("/sadhana-immersion-programme/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Programa de imersão Sadhana", url: PT }])
);

export default function Page() {
  return (
    <div lang="pt">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
