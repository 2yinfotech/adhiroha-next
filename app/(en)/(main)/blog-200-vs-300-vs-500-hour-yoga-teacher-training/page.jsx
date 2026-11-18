import "../blog-300-vs-500-hour-yoga-teacher-training/styles.css";
import "../blog-guide-faq.css";
import { withOpenGraph } from "@/lib/root-metadata";
import content from "./content";
import scripts from "../blog-300-vs-500-hour-yoga-teacher-training/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, ORG_ID } from "@/lib/seo";

const URL = "/blog-200-vs-300-vs-500-hour-yoga-teacher-training/";

export const metadata = withOpenGraph({
  title: "200 vs 300 vs 500 Hour YTT: Which One Do You Need?",
  description:
    "200, 300 or 500 hour yoga teacher training? What each level covers, who it suits, how long it takes and what it costs, so you can pick the right course.",
  alternates: { canonical: URL }
}, { type: "article" });

const pageSchema = graph(
  {
    "@type": "Article",
    headline: "200 vs 300 vs 500 Hour Yoga Teacher Training: Which One Do You Need?",
    description: metadata.description,
    url: SITE + URL,
    image: SITE + "/gallery/yoga/yoga-012.webp",
    datePublished: "2026-11-18",
    dateModified: "2026-11-18",
    author: { "@type": "Person", name: "Guru Shankar Das" },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: SITE + URL,
  },
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "200 vs 300 vs 500 Hour YTT", url: URL }])
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
