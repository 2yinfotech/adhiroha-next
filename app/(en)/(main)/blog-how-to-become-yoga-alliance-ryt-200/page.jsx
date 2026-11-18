import "../blog-300-vs-500-hour-yoga-teacher-training/styles.css";
import "../blog-guide-faq.css";
import { withOpenGraph } from "@/lib/root-metadata";
import content from "./content";
import scripts from "../blog-300-vs-500-hour-yoga-teacher-training/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, ORG_ID } from "@/lib/seo";

const URL = "/blog-how-to-become-yoga-alliance-ryt-200/";

export const metadata = withOpenGraph({
  title: "How to Become a Yoga Alliance RYT 200: Step by Step",
  description:
    "How to register as a Yoga Alliance RYT 200 after your teacher training: choosing a registered school, applying, fees, keeping it active and the next levels.",
  alternates: { canonical: URL }
}, { type: "article" });

const pageSchema = graph(
  {
    "@type": "Article",
    headline: "How to Become a Yoga Alliance RYT 200: A Step-by-Step Guide",
    description: metadata.description,
    url: SITE + URL,
    image: SITE + "/gallery/certification/certification-003.webp",
    datePublished: "2026-11-18",
    dateModified: "2026-11-18",
    author: { "@type": "Person", name: "Guru Shankar Das" },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: SITE + URL,
  },
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "How to Become an RYT 200", url: URL }])
);

export default function Page() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
