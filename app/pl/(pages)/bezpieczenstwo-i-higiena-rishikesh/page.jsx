// Polish safety & hygiene page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/safety-hygiene-in-rishikesh/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/safety-hygiene-in-rishikesh/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const PL = "/pl/bezpieczenstwo-i-higiena-rishikesh/";
const EN = "/safety-hygiene-in-rishikesh/";

export const metadata = {
  title: "Bezpieczeństwo i Higiena | Aśram Jogi Adhiroha, Riszikeś",
  description:
    "Monitoring 24/7, ogrodzony kampus, odbiór z lotniska w cenie i wsparcie dla kobiet podróżujących samotnie, jak Adhiroha dba o bezpieczeństwo i higienę w Riszikeś.",
  alternates: {
    canonical: PL,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pl_PL", url: `${SITE}${PL}`,
    title: "Bezpieczeństwo i Higiena | Aśram Jogi Adhiroha, Riszikeś",
    description: "Monitoring 24/7, ogrodzony kampus, odbiór z lotniska w cenie i wsparcie dla kobiet podróżujących samotnie, jak Adhiroha dba o bezpieczeństwo i higienę w Riszikeś.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bezpieczeństwo i Higiena | Aśram Jogi Adhiroha, Riszikeś",
    description: "Monitoring 24/7, ogrodzony kampus, odbiór z lotniska w cenie i wsparcie dla kobiet podróżujących samotnie, jak Adhiroha dba o bezpieczeństwo i higienę w Riszikeś.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Bezpieczeństwo i higiena", url: PL }])
);

export default function Page() {
  return (
    <div lang="pl">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
