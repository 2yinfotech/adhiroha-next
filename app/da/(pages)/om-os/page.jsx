// Danish "Om os" page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/about-us/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/about-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const DA = "/da/om-os/";
const EN = "/about-us/";

export const metadata = {
  title: "Om Adhiroha | Yogaskole i Rishikesh, Indien",
  description:
    "Lær Adhiroha at kende, et Yoga Alliance-certificeret yogaashram i Upper Tapovan, Rishikesh, med et område på 20.000 kvadratfod og over 3.000 uddannede elever fra mere end 70 lande.",
  alternates: {
    canonical: DA,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "da_DK", url: `${SITE}${DA}`,
    title: "Om Adhiroha | Yogaskole i Rishikesh, Indien",
    description: "Lær Adhiroha at kende, et Yoga Alliance-certificeret yogaashram i Upper Tapovan, Rishikesh, med et område på 20.000 kvadratfod og over 3.000 uddannede elever fra mere end 70 lande.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Adhiroha | Yogaskole i Rishikesh, Indien",
    description: "Lær Adhiroha at kende, et Yoga Alliance-certificeret yogaashram i Upper Tapovan, Rishikesh, med et område på 20.000 kvadratfod og over 3.000 uddannede elever fra mere end 70 lande.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Om os", url: DA }])
);

export default function Page() {
  return (
    <div lang="da">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
