import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema } from "@/lib/seo";

export const metadata = {
  title: "Sadhana Immersion Programme in Rishikesh | 15 Days",
  description:
    "A 15-day Sadhana immersion in Rishikesh for a deeper personal practice — disciplined daily sadhana, silence and yogic living at our Himalayan ashram.",
  alternates: { canonical: "/sadhana-immersion-programme/" }
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
    courseSchema({
      name: "Sadhana Immersion Programme in Rishikesh",
      description: metadata.description,
      url: "/sadhana-immersion-programme/",
      price: 699,
      days: 15,
      styles: "Daily sadhana, meditation, silence, yogic living",
    }),
    faqSchema(extractFaqs(content)),
    breadcrumbSchema([{ name: "Sadhana Immersion Programme", url: "/sadhana-immersion-programme/" }])
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
