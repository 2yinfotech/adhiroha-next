import "./styles.css";
import { withOpenGraph } from "@/lib/root-metadata";
import rawContent from "./content";
import { withBatchTable, upcomingBatches } from "@/lib/batches";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import SectionNav from "@/components/SectionNav";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, courseSchema, extractFaqs, faqSchema, courseFacts, studentVideoSchemas, hreflangFor } from "@/lib/seo";

// The batch table is rendered here, not by scripts.js after load, so the
// dates are in the HTML. Revalidated daily so the months roll forward.
export const revalidate = 86400;
const content = rawContent;
const renderedContent = () => withBatchTable(rawContent, "500", "en");

const sections = [
  { label: "Intro", target: "top" },
  { label: "Fees", target: "course-glance" },
  { label: "Compare", target: "compare-courses" },
  { label: "Subject", target: "curriculum" },
  { label: "Daily Schedule", target: "daily-rhythm" },
  { label: "Amenities", target: "amenities" },
  { label: "Accommodation", target: "accommodation" },
  { label: "Teachers", target: "your-teachers" },
  { label: "Surrounding", target: "finding-us" },
  { label: "Contact Us", target: "begin" }
];

export const metadata = withOpenGraph({
  title: "500 Hour Yoga Teacher Training in Rishikesh | RYT 500",
  description:
    "Complete your RYT-500 with our 500 hour yoga teacher training in Rishikesh, 60 days combining the 200 and 300 hour syllabus, stay and meals included.",
  alternates: { canonical: "/500-hour-yoga-teacher-training-course-rishikesh/", languages: hreflangFor("/500-hour-yoga-teacher-training-course-rishikesh/") }
}, { type: "article" });

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = () => graph(
  ...studentVideoSchemas(),
    courseSchema({
    batches: upcomingBatches("500", 6),
      name: "500 Hour Yoga Teacher Training in Rishikesh",
      description: metadata.description,
      url: "/500-hour-yoga-teacher-training-course-rishikesh/",
      price: 2790,
      days: 60,
      styles: "Hatha yoga, Ashtanga vinyasa, advanced asana, pranayama, meditation, philosophy, anatomy, teaching methodology",
    ...courseFacts("/500-hour-yoga-teacher-training-course-rishikesh/")}),
    faqSchema(extractFaqs(content)),
    breadcrumbSchema([{ name: "500 Hour Yoga Teacher Training", url: "/500-hour-yoga-teacher-training-course-rishikesh/" }])
);


export default function Page() {
  return (
    <>
      <JsonLd data={pageSchema()} />
      <div dangerouslySetInnerHTML={{ __html: renderedContent() }} />
      <SectionNav sections={sections} />
      <PageScripts code={scripts} />
    </>
  );
}
