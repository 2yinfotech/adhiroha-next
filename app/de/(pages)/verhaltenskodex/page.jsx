// German Verhaltenskodex page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/yoga-ashram-in-india-code-of-conduct/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/yoga-ashram-in-india-code-of-conduct/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const DE = "/de/verhaltenskodex/";
const EN = "/yoga-ashram-in-india-code-of-conduct/";

export const metadata = {
  title: "Verhaltenskodex & Richtlinien | Adhiroha, Rishikesh",
  description: "Der Verhaltenskodex und die Zulassungs- & Gebührenrichtlinien des Adhiroha Ashrams in Rishikesh, klar dargelegt, bevor du dich anmeldest.",
  alternates: {
    canonical: DE,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "de_DE", url: `${SITE}${DE}`,
    title: "Verhaltenskodex & Richtlinien | Adhiroha, Rishikesh", description: "Der Verhaltenskodex und die Zulassungs- & Gebührenrichtlinien des Adhiroha Ashrams in Rishikesh, klar dargelegt, bevor du dich anmeldest.",
    images: [{ url: "/img/adhiroha-og.jpg", width: 1200, height: 630, alt: "Adhiroha Yoga School" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verhaltenskodex & Richtlinien | Adhiroha, Rishikesh",
    description: "Der Verhaltenskodex und die Zulassungs- & Gebührenrichtlinien des Adhiroha Ashrams in Rishikesh, klar dargelegt, bevor du dich anmeldest.",
    images: ["/img/adhiroha-og.jpg"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Verhaltenskodex", url: DE }])
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
