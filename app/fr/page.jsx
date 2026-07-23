// French (Français) homepage — served at /fr.
// A full, standalone translation of the English homepage that reuses the English
// homepage's stylesheet and interaction script (../_home) unchanged — only the
// visible copy differs.
import "../_home/styles.css";
import content from "./content";
import scripts from "../_home/scripts";
import PageScripts from "@/components/PageScripts";
import StickyHeader from "@/components/StickyHeader";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AnchorScroll from "@/components/AnchorScroll";
import JsonLd from "@/components/JsonLd";
import { graph, extractFaqs, faqSchema, SITE, LANGUAGE_ALTERNATES } from "@/lib/seo";

export const metadata = {
  title: "Formation de professeur de yoga à Rishikesh | 200/300/500 h YTTC — Adhiroha",
  description:
    "Formation de professeur de yoga certifiée Yoga Alliance à Rishikesh, Inde — 200, 300 & 500 heures. Petits groupes, professeurs indiens expérimentés, hébergement en ashram & repas inclus.",
  alternates: { canonical: "/fr/", languages: LANGUAGE_ALTERNATES },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "fr_FR",
    url: `${SITE}/fr/`,
    title: "Formation de professeur de yoga à Rishikesh | 200/300/500 h YTTC — Adhiroha",
    description:
      "Formation de professeur de yoga certifiée Yoga Alliance à Rishikesh, Inde — 200, 300 & 500 heures. Petits groupes, professeurs indiens expérimentés, hébergement en ashram & repas inclus.",
    images: [{ url: "/img/yoga-teacher-training-india-course.webp", width: 1200, height: 630, alt: "Adhiroha Yoga School, Upper Tapovan, Rishikesh" }],
  },
};

const pageSchema = graph(faqSchema(extractFaqs(content)));

export default function Page() {
  return (
    <div lang="fr">
      {/* Preload the hero image (LCP element), the same as on the English homepage. */}
      <link
        rel="preload"
        as="image"
        href="/img/remote/img_shiva-adhiroha.webp"
        type="image/webp"
        fetchPriority="high"
      />
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <StickyHeader />
      <FloatingWhatsApp />
      <AnchorScroll />
      <PageScripts code={scripts} />
    </div>
  );
}
