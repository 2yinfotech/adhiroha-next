import "../blog-300-vs-500-hour-yoga-teacher-training/styles.css";
import "../blog-guide-faq.css";
import { withOpenGraph } from "@/lib/root-metadata";
import content from "./content";
import scripts from "../blog-300-vs-500-hour-yoga-teacher-training/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, ORG_ID } from "@/lib/seo";

const URL = "/blog-200-hour-yoga-teacher-training-cost-rishikesh/";

export const metadata = withOpenGraph({
  title: "200 Hour YTT Cost in Rishikesh: Fees & Extra Costs",
  description:
    "What a 200 hour yoga teacher training in Rishikesh really costs: the course fee by room type, what it includes, and the travel, visa and registration costs on top.",
  alternates: { canonical: URL }
}, { type: "article" });

const pageSchema = graph(
  {
    "@type": "Article",
    headline: "200 Hour Yoga Teacher Training Cost in Rishikesh: What You Will Really Pay",
    description: metadata.description,
    url: SITE + URL,
    image: SITE + "/gallery/accommodation/acco-004.webp",
    datePublished: "2026-11-18",
    dateModified: "2026-11-18",
    author: { "@type": "Person", name: "Guru Shankar Das" },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: SITE + URL,
  },
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "200 Hour YTT Cost in Rishikesh", url: URL }])
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
