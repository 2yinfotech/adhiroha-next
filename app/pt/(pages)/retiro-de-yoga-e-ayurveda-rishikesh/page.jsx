// Portuguese yoga & Ayurveda retreat page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-retreat-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-retreat-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, courseFacts, hreflangFor } from "@/lib/seo";

const PT = "/pt/retiro-de-yoga-e-ayurveda-rishikesh/";
const EN = "/yoga-retreat-in-rishikesh/";

export const metadata = {
  title: "Retiro de Yoga e Ayurveda em Rishikesh | 6 Dias — Adhiroha",
  description:
    "Retiro de yoga e ayurveda de seis dias em Rishikesh, Índia — yoga suave, pranayama, terapias ayurvédicas personalizadas e comida sáttvica. A partir de € 510 com tudo incluído.",
  alternates: {
    canonical: PT,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pt_BR", url: `${SITE}${PT}`,
    title: "Retiro de Yoga e Ayurveda em Rishikesh | 6 Dias — Adhiroha",
    description: "Retiro de yoga e ayurveda de seis dias em Rishikesh, Índia — yoga suave, pranayama, terapias ayurvédicas personalizadas e comida sáttvica. A partir de € 510 com tudo incluído.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retiro de Yoga e Ayurveda em Rishikesh | 6 Dias — Adhiroha",
    description: "Retiro de yoga e ayurveda de seis dias em Rishikesh, Índia — yoga suave, pranayama, terapias ayurvédicas personalizadas e comida sáttvica. A partir de € 510 com tudo incluído.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  courseSchema({
    name: "Retiro de Yoga e Ayurveda em Rishikesh",
    description: metadata.description,
    url: PT,
    price: 510,
    days: 6,
    styles: "Hatha yoga, terapias ayurvédicas, meditação, bem-estar",
  ...courseFacts("/yoga-retreat-in-rishikesh/")}),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Retiro de yoga e ayurveda", url: PT }])
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
