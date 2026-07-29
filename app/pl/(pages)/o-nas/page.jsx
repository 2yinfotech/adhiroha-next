// Polish "O nas" page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/about-us/styles.css";
import content from "./content";
import scripts from "../../../(main)/about-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const PL = "/pl/o-nas/";
const EN = "/about-us/";

export const metadata = {
  title: "O Adhiroha | Szkoła Jogi w Riszikeś, Indie",
  description:
    "Poznaj Adhiroha — certyfikowany przez Yoga Alliance aśram jogi w Upper Tapovan w Riszikeś, z kampusem o powierzchni 20 000 stóp kw. i ponad 3000 uczniów z przeszło 70 krajów.",
  alternates: {
    canonical: PL,
    languages: { pl: `${SITE}${PL}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pl_PL", url: `${SITE}${PL}`,
    title: "O Adhiroha | Szkoła Jogi w Riszikeś, Indie",
    description: "Poznaj Adhiroha — certyfikowany przez Yoga Alliance aśram jogi w Upper Tapovan w Riszikeś, z kampusem o powierzchni 20 000 stóp kw. i ponad 3000 uczniów z przeszło 70 krajów.",
  },
  twitter: {
    card: "summary_large_image",
    title: "O Adhiroha | Szkoła Jogi w Riszikeś, Indie",
    description: "Poznaj Adhiroha — certyfikowany przez Yoga Alliance aśram jogi w Upper Tapovan w Riszikeś, z kampusem o powierzchni 20 000 stóp kw. i ponad 3000 uczniów z przeszło 70 krajów.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "O nas", url: PL }])
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
