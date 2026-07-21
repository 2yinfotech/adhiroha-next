import "./_home/styles.css";
import content from "./_home/content";
import scripts from "./_home/scripts";
import PageScripts from "@/components/PageScripts";
import StickyHeader from "@/components/StickyHeader";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AnchorScroll from "@/components/AnchorScroll";
import JsonLd from "@/components/JsonLd";
import { graph, extractFaqs, faqSchema, LANGUAGE_ALTERNATES } from "@/lib/seo";

export const metadata = {
  title: "Yoga Teacher Training in Rishikesh | 200/300/500 Hr YTTC",
  description:
    "Yoga Alliance certified 200, 300 & 500 hour yoga teacher training in Rishikesh, India. Small batches, expert Indian teachers, ashram stay & meals included.",
  // Page-level `alternates` replaces the layout's, so the hreflang set has to be
  // declared here alongside the canonical — not inherited.
  alternates: { canonical: "/", languages: LANGUAGE_ALTERNATES }
};

// The homepage FAQ section is a strong rich-result candidate; the questions are
// read straight from the page markup so schema and page can never disagree.
const pageSchema = graph(faqSchema(extractFaqs(content)));

export default function Page() {
  return (
    <>
      {/* Preload the hero image: it is the LCP element, and the browser would
          otherwise only discover it after parsing the very large content blob. */}
      <link
        rel="preload"
        as="image"
        href="/img/remote/img_shiva-adhiroha.webp"
        type="image/webp"
        fetchPriority="high"
      />
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {/* Same dedicated header-scroll handler the sub-pages use, so the homepage
          header reliably gets its scrolled background and hides on scroll-down
          even if the page's own inline script blob fails to run. */}
      <StickyHeader />
      <FloatingWhatsApp />
      <AnchorScroll />
      <PageScripts code={scripts} />
    </>
  );
}
