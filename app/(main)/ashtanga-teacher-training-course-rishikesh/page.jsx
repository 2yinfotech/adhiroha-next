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
  title: "Ashtanga Yoga Teacher Training in Rishikesh | Adhiroha",
  description:
    "Learn the primary series and vinyasa sequencing on our 14-day Ashtanga yoga teacher training in Rishikesh, taught in the Himalayan foothills at Upper Tapovan.",
  alternates: { canonical: "/ashtanga-teacher-training-course-rishikesh/" }
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
    courseSchema({
      name: "Ashtanga & Vinyasa Yoga Teacher Training in Rishikesh",
      description: metadata.description,
      url: "/ashtanga-teacher-training-course-rishikesh/",
      price: 790,
      days: 14,
      styles: "Ashtanga primary series, vinyasa sequencing, pranayama, meditation",
    }),
    faqSchema(extractFaqs(content)),
    breadcrumbSchema([{ name: "Ashtanga & Vinyasa Yoga Teacher Training", url: "/ashtanga-teacher-training-course-rishikesh/" }])
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
