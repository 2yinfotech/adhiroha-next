import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema } from "@/lib/seo";

export const metadata = {
  title: "FAQs | Yoga Teacher Training School in Rishikesh, India | Adhiroha",
  description:
    "Answers to the most common questions about Adhiroha's Yoga Teacher Training in Rishikesh — the course, travel and food, registration, certification and graduation.",
  alternates: { canonical: "/faqs-of-yoga-school-in-india/" }
};

// FAQs are parsed from the page's own markup so the listing can earn rich results.
const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "FAQs", url: "/faqs-of-yoga-school-in-india/" }])
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
