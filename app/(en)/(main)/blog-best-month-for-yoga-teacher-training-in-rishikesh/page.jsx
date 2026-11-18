import "../blog-300-vs-500-hour-yoga-teacher-training/styles.css";
import "../blog-guide-faq.css";
import { withOpenGraph } from "@/lib/root-metadata";
import content from "./content";
import scripts from "../blog-300-vs-500-hour-yoga-teacher-training/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, ORG_ID } from "@/lib/seo";

const URL = "/blog-best-month-for-yoga-teacher-training-in-rishikesh/";

export const metadata = withOpenGraph({
  title: "Best Month for Yoga Teacher Training in Rishikesh",
  description:
    "When is the best month for yoga teacher training in Rishikesh? Temperatures, rain, festivals and what to pack for each season, so you can choose your batch.",
  alternates: { canonical: URL }
}, { type: "article" });

const pageSchema = graph(
  {
    "@type": "Article",
    headline: "Best Month for Yoga Teacher Training in Rishikesh: A Season-by-Season Guide",
    description: metadata.description,
    url: SITE + URL,
    image: SITE + "/gallery/yoga/yoga-025.webp",
    datePublished: "2026-11-18",
    dateModified: "2026-11-18",
    author: { "@type": "Person", name: "Guru Shankar Das" },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: SITE + URL,
  },
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Best Month for YTT in Rishikesh", url: URL }])
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
