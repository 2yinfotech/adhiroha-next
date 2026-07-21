import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema } from "@/lib/seo";

export const metadata = {
  title: "Yoga & Ayurveda Retreat in Rishikesh | 6 Days — Adhiroha",
  description:
    "A 6-day yoga and Ayurveda wellness retreat in Rishikesh. Daily yoga, Ayurvedic therapies, sattvic meals and Himalayan quiet — from €510 all inclusive.",
  alternates: { canonical: "/yoga-retreat-in-rishikesh/" }
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
    courseSchema({
      name: "Yoga & Ayurveda Wellness Retreat in Rishikesh",
      description: metadata.description,
      url: "/yoga-retreat-in-rishikesh/",
      price: 510,
      days: 6,
      styles: "Hatha yoga, Ayurvedic therapies, meditation, wellness",
    }),
    faqSchema(extractFaqs(content)),
    breadcrumbSchema([{ name: "Yoga & Ayurveda Wellness Retreat", url: "/yoga-retreat-in-rishikesh/" }])
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
