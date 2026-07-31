// Dutch teachers page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-teachers-in-india/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-teachers-in-india/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, teacherSchemas, hreflangFor } from "@/lib/seo";

const NL = "/nl/yogadocenten-in-india/";
const EN = "/yoga-teachers-in-india/";

export const metadata = {
  title: "Onze Yogadocenten in India | Acharya's van Adhiroha, Rishikesh",
  description:
    "Maak kennis met de 11 yoga-acharya's van Adhiroha in Rishikesh, masters in yogische wetenschap en doctors in natuurgeneeskunde, met meer dan 115 jaar gecombineerde leservaring.",
  alternates: {
    canonical: NL,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "nl_NL", url: `${SITE}${NL}`,
    title: "Onze Yogadocenten in India | Acharya's van Adhiroha, Rishikesh",
    description: "Maak kennis met de 11 yoga-acharya's van Adhiroha in Rishikesh, masters in yogische wetenschap en doctors in natuurgeneeskunde, met meer dan 115 jaar gecombineerde leservaring.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onze Yogadocenten in India | Acharya's van Adhiroha, Rishikesh",
    description: "Maak kennis met de 11 yoga-acharya's van Adhiroha in Rishikesh, masters in yogische wetenschap en doctors in natuurgeneeskunde, met meer dan 115 jaar gecombineerde leservaring.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  ...teacherSchemas("nl"),
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Onze docenten", url: NL }])
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
