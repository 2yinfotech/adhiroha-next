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
  title: "200 Hour Yoga Teacher Training in Rishikesh | Adhiroha",
  description:
    "Yoga Alliance certified 200 hour yoga teacher training in Rishikesh. 24 days, small groups, Himalayan ashram stay, all meals and excursions included.",
  alternates: { canonical: "/200-hour-yoga-teacher-training-course-rishikesh/" }
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
    courseSchema({
      name: "200 Hour Yoga Teacher Training in Rishikesh",
      description: metadata.description,
      url: "/200-hour-yoga-teacher-training-course-rishikesh/",
      price: 1275,
      days: 24,
      styles: "Hatha yoga, Ashtanga vinyasa, pranayama, meditation, yoga philosophy, anatomy, teaching methodology",
    }),
    faqSchema(extractFaqs(content)),
    breadcrumbSchema([{ name: "200 Hour Yoga Teacher Training", url: "/200-hour-yoga-teacher-training-course-rishikesh/" }])
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
