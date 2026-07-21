import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema } from "@/lib/seo";

const sections = [
  { label: "Intro", target: "top" },
  { label: "Fees", target: "course-glance" },
  { label: "Subject", target: "curriculum" },
  { label: "Daily Schedule", target: "daily-rhythm" },
  { label: "Amenities", target: "amenities" },
  { label: "Accommodation", target: "accommodation" },
  { label: "Teachers", target: "your-teachers" },
  { label: "Surrounding", target: "finding-us" },
  { label: "Contact Us", target: "begin" }
];

export const metadata = {
  title: "Pranayama & Meditation TTC in Rishikesh | Adhiroha",
  description:
    "A 14-day pranayama and meditation teacher training in Rishikesh. Breathwork, kriya and meditation taught traditionally beside the Ganga at our ashram.",
  alternates: { canonical: "/pranayama-teacher-training-course-rishikesh/" }
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
    courseSchema({
      name: "Pranayama & Meditation Yoga Teacher Training in Rishikesh",
      description: metadata.description,
      url: "/pranayama-teacher-training-course-rishikesh/",
      price: 790,
      days: 14,
      styles: "Pranayama, kriya, meditation, yoga philosophy",
    }),
    faqSchema(extractFaqs(content)),
    breadcrumbSchema([{ name: "Pranayama & Meditation Teacher Training", url: "/pranayama-teacher-training-course-rishikesh/" }])
);


export default function Page() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <SectionNav sections={sections} />
      <PageScripts code={scripts} />
    </>
  );
}
