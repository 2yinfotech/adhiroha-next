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
  title: "300 Hour Yoga Teacher Training in Rishikesh | Adhiroha",
  description:
    "Advance your practice with our 300 hour yoga teacher training in Rishikesh. 30 days of deeper asana, pranayama and philosophy at a Yoga Alliance RYS ashram.",
  alternates: { canonical: "/300-hour-yoga-teacher-training-course-rishikesh/" }
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
    courseSchema({
      name: "300 Hour Yoga Teacher Training in Rishikesh",
      description: metadata.description,
      url: "/300-hour-yoga-teacher-training-course-rishikesh/",
      price: 1500,
      days: 30,
      styles: "Advanced asana, pranayama, kriya, yoga philosophy, anatomy, advanced teaching methodology",
    }),
    faqSchema(extractFaqs(content)),
    breadcrumbSchema([{ name: "300 Hour Yoga Teacher Training", url: "/300-hour-yoga-teacher-training-course-rishikesh/" }])
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
