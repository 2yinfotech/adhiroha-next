import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema } from "@/lib/seo";

export const metadata = {
  title: "Sound Healing Teacher Training in Rishikesh | Adhiroha",
  description:
    "Certified sound healing and therapy teacher training in Rishikesh. Learn singing bowls, gongs and mantra over 6 days at our Yoga Alliance registered ashram.",
  alternates: { canonical: "/sound-healing-ttc-rishikesh/" }
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
    courseSchema({
      name: "Sound Healing & Therapy Teacher Training in Rishikesh",
      description: metadata.description,
      url: "/sound-healing-ttc-rishikesh/",
      price: 690,
      days: 6,
      styles: "Singing bowls, gongs, mantra chanting, sound therapy",
    }),
    faqSchema(extractFaqs(content)),
    breadcrumbSchema([{ name: "Sound Healing Teacher Training", url: "/sound-healing-ttc-rishikesh/" }])
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
