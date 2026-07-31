// Polish "Kontakt" page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/contact-us/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/contact-us/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const PL = "/pl/kontakt/";
const EN = "/contact-us/";

export const metadata = {
  title: "Kontakt | Adhiroha, Szkoła Jogi w Riszikeś",
  description:
    "Napisz do aśramu jogi Adhiroha w Upper Tapovan w Riszikeś. WhatsApp, e-mail lub formularz, odpowiada prawdziwy człowiek, zwykle w ciągu doby.",
  alternates: {
    canonical: PL,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pl_PL", url: `${SITE}${PL}`,
    title: "Kontakt | Adhiroha, Szkoła Jogi w Riszikeś",
    description: "Napisz do aśramu jogi Adhiroha w Upper Tapovan w Riszikeś. WhatsApp, e-mail lub formularz, odpowiada prawdziwy człowiek, zwykle w ciągu doby.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt | Adhiroha, Szkoła Jogi w Riszikeś",
    description: "Napisz do aśramu jogi Adhiroha w Upper Tapovan w Riszikeś. WhatsApp, e-mail lub formularz, odpowiada prawdziwy człowiek, zwykle w ciągu doby.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Kontakt", url: PL }])
);

export default function Page() {
  return (
    <div lang="pl">
      <JsonLd data={pageSchema} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </div>
  );
}
