import "../blog-300-vs-500-hour-yoga-teacher-training/styles.css";
import "../blog-guide-faq.css";
import { withOpenGraph } from "@/lib/root-metadata";
import content from "./content";
import scripts from "../blog-300-vs-500-hour-yoga-teacher-training/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, ORG_ID } from "@/lib/seo";

const URL = "/blog-visa-for-yoga-teacher-training-in-india/";

export const metadata = withOpenGraph({
  title: "Visa for Yoga Teacher Training in India: e-Visa Guide",
  description:
    "Which Indian visa do you need for yoga teacher training in Rishikesh? The e-Tourist visa options by course length, how to apply, and the mistakes to avoid.",
  alternates: { canonical: URL }
}, { type: "article" });

const pageSchema = graph(
  {
    "@type": "Article",
    headline: "Visa for Yoga Teacher Training in India: A Practical e-Visa Guide",
    description: metadata.description,
    url: SITE + URL,
    image: SITE + "/gallery/excursion/excursion-002.webp",
    datePublished: "2026-11-18",
    dateModified: "2026-11-18",
    author: { "@type": "Person", name: "Guru Shankar Das" },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: SITE + URL,
  },
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Visa for Yoga Teacher Training in India", url: URL }])
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
