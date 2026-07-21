import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema } from "@/lib/seo";

export const metadata = {
  title: "Complete Guide to 200 Hour Yoga Teacher Training",
  description:
    "What a 200 hour yoga teacher training really involves — the syllabus, daily schedule, costs and how to choose the right school in Rishikesh.",
  alternates: { canonical: "/blog-200-hour-yoga-teacher-training-guide/" }
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
    faqSchema(extractFaqs(content)),
    breadcrumbSchema([{ name: "200 Hour YTT Guide", url: "/blog-200-hour-yoga-teacher-training-guide/" }])
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
