// Polish code-of-conduct page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-ashram-in-india-code-of-conduct/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-ashram-in-india-code-of-conduct/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const PL = "/pl/kodeks-postepowania/";
const EN = "/yoga-ashram-in-india-code-of-conduct/";

export const metadata = {
  title: "Kodeks Postępowania i Zasady | Aśram Jogi Adhiroha, Riszikeś",
  description:
    "Zasady obowiązujące w aśramie Adhiroha w Riszikeś, cztery filary, kodeks postępowania, zasady zerowej tolerancji oraz opłaty, płatności i zmiany terminu.",
  alternates: {
    canonical: PL,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pl_PL", url: `${SITE}${PL}`,
    title: "Kodeks Postępowania i Zasady | Aśram Jogi Adhiroha, Riszikeś",
    description: "Zasady obowiązujące w aśramie Adhiroha w Riszikeś, cztery filary, kodeks postępowania, zasady zerowej tolerancji oraz opłaty, płatności i zmiany terminu.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kodeks Postępowania i Zasady | Aśram Jogi Adhiroha, Riszikeś",
    description: "Zasady obowiązujące w aśramie Adhiroha w Riszikeś, cztery filary, kodeks postępowania, zasady zerowej tolerancji oraz opłaty, płatności i zmiany terminu.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Kodeks postępowania", url: PL }])
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
