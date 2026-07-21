import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema } from "@/lib/seo";

export const metadata = {
  title: "300 vs 500 Hour Yoga Teacher Training: Which to Pick?",
  description:
    "300 or 500 hour yoga teacher training? Compare the syllabus, duration, cost and career outcomes to pick the right advanced path for your practice.",
  alternates: { canonical: "/blog-300-vs-500-hour-yoga-teacher-training/" }
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
    faqSchema(extractFaqs(content)),
    breadcrumbSchema([{ name: "300 vs 500 Hour YTT", url: "/blog-300-vs-500-hour-yoga-teacher-training/" }])
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
