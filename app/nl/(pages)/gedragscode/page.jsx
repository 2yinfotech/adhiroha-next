// Dutch code-of-conduct page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-ashram-in-india-code-of-conduct/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-ashram-in-india-code-of-conduct/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const NL = "/nl/gedragscode/";
const EN = "/yoga-ashram-in-india-code-of-conduct/";

export const metadata = {
  title: "Gedragscode en Beleid | Yoga-ashram Adhiroha, Rishikesh",
  description:
    "De regels van de Adhiroha-ashram in Rishikesh, de vier pijlers, de gedragscode, het nultolerantiebeleid en alles over kosten, betalingen en verplaatsen.",
  alternates: {
    canonical: NL,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "nl_NL", url: `${SITE}${NL}`,
    title: "Gedragscode en Beleid | Yoga-ashram Adhiroha, Rishikesh",
    description: "De regels van de Adhiroha-ashram in Rishikesh, de vier pijlers, de gedragscode, het nultolerantiebeleid en alles over kosten, betalingen en verplaatsen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gedragscode en Beleid | Yoga-ashram Adhiroha, Rishikesh",
    description: "De regels van de Adhiroha-ashram in Rishikesh, de vier pijlers, de gedragscode, het nultolerantiebeleid en alles over kosten, betalingen en verplaatsen.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Gedragscode", url: NL }])
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
