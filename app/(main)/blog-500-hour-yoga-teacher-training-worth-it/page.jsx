import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema } from "@/lib/seo";

export const metadata = {
  title: "Is the 500 Hour Yoga Teacher Training Worth It?",
  description:
    "Is a 500 hour yoga teacher training worth two months and the fee? An honest look at what RYT-500 certification actually changes for a teacher.",
  alternates: { canonical: "/blog-500-hour-yoga-teacher-training-worth-it/" }
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
    faqSchema(extractFaqs(content)),
    breadcrumbSchema([{ name: "Is 500 Hour YTT Worth It", url: "/blog-500-hour-yoga-teacher-training-worth-it/" }])
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
