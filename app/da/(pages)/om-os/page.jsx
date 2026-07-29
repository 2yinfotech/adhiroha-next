// Danish "Om os" page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(main)/about-us/styles.css";
import content from "./content";
import scripts from "../../../(main)/about-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE } from "@/lib/seo";

const DA = "/da/om-os/";
const EN = "/about-us/";

export const metadata = {
  title: "Om Adhiroha | Yogaskole i Rishikesh, Indien",
  description:
    "Lær Adhiroha at kende — et Yoga Alliance-certificeret yogaashram i Upper Tapovan, Rishikesh, med et område på 20.000 kvadratfod og over 3.000 uddannede elever fra mere end 70 lande.",
  alternates: {
    canonical: DA,
    languages: { da: `${SITE}${DA}`, en: `${SITE}${EN}`, "x-default": `${SITE}${EN}` },
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "da_DK", url: `${SITE}${DA}`,
    title: "Om Adhiroha | Yogaskole i Rishikesh, Indien",
    description: "Lær Adhiroha at kende — et Yoga Alliance-certificeret yogaashram i Upper Tapovan, Rishikesh, med et område på 20.000 kvadratfod og over 3.000 uddannede elever fra mere end 70 lande.",
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
