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
  title: "Hatha & Yin Yoga Teacher Training in Rishikesh | Adhiroha",
  description:
    "A 14-day Hatha and Yin yoga teacher training in Rishikesh. Traditional alignment, long holds and restorative practice with experienced Indian teachers.",
  alternates: { canonical: "/hatha-teacher-training-course-rishikesh/" }
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
    courseSchema({
      name: "Hatha & Yin Yoga Teacher Training in Rishikesh",
      description: metadata.description,
      url: "/hatha-teacher-training-course-rishikesh/",
      price: 790,
      days: 14,
      styles: "Hatha yoga, Yin yoga, alignment, pranayama, meditation",
    }),
    faqSchema(extractFaqs(content)),
    breadcrumbSchema([{ name: "Hatha & Yin Yoga Teacher Training", url: "/hatha-teacher-training-course-rishikesh/" }])
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
