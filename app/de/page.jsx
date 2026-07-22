// German (Deutsch) homepage — served at /de.
// A full, standalone translation of the English homepage. It deliberately reuses
// the English homepage's stylesheet and interaction script (../_home) so nothing
// but the visible copy differs — same layout, same header/footer behaviour, no
// extra CSS/JS to download or maintain.
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
  title: "Yogalehrer-Ausbildung in Rishikesh | 200/300/500-Stunden YTTC — Adhiroha",
  description:
    "Von Yoga Alliance zertifizierte 200-, 300- & 500-Stunden Yogalehrer-Ausbildung in Rishikesh, Indien. Kleine Gruppen, erfahrene indische Lehrer, Ashram-Unterkunft & Mahlzeiten inklusive.",
  alternates: { canonical: "/de/", languages: LANGUAGE_ALTERNATES },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "de_DE",
    url: `${SITE}/de/`,
    title: "Yogalehrer-Ausbildung in Rishikesh | 200/300/500-Stunden YTTC — Adhiroha",
    description:
      "Von Yoga Alliance zertifizierte 200-, 300- & 500-Stunden Yogalehrer-Ausbildung in Rishikesh, Indien. Kleine Gruppen, erfahrene indische Lehrer, Ashram-Unterkunft & Mahlzeiten inklusive.",
    images: [{ url: "/img/yoga-teacher-training-india-course.webp", width: 1200, height: 630, alt: "Adhiroha Yoga School, Upper Tapovan, Rishikesh" }],
  },
};

// The German FAQ block is a rich-result candidate too; read straight from the
// translated markup so schema and page can never disagree.
const pageSchema = graph(faqSchema(extractFaqs(content)));

export default function Page() {
  return (
    <div lang="de">
      {/* Preload the hero image: it is the LCP element, the same as on the English homepage. */}
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
