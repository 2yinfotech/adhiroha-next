// Polish alumni-message page — reuses the English page's CSS/JS unchanged; only the copy differs.
import "../../../(en)/(main)/soon-after-message/styles.css";
import content from "./content";
import scripts from "../../../(en)/(main)/soon-after-message/scripts";
import PageScripts from "@/components/PageScripts";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema, extractFaqs, faqSchema, SITE, hreflangFor } from "@/lib/seo";

const PL = "/pl/wiadomosci-od-absolwentow/";
const EN = "/soon-after-message/";

export const metadata = {
  title: "Wiadomość od Naszych Absolwentów | Adhiroha, Riszikeś",
  description:
    "Absolwenci Adhiroha opisują swoimi słowami kurs nauczycielski jogi w Riszikeś, ogród, ołtarz ognia, pięć żywiołów kampusu i nauczycieli stojących za przemianą.",
  alternates: {
    canonical: PL,
    languages: hreflangFor(EN),
  },
  openGraph: {
    type: "website", siteName: "Adhiroha Yoga School", locale: "pl_PL", url: `${SITE}${PL}`,
    title: "Wiadomość od Naszych Absolwentów | Adhiroha, Riszikeś",
    description: "Absolwenci Adhiroha opisują swoimi słowami kurs nauczycielski jogi w Riszikeś, ogród, ołtarz ognia, pięć żywiołów kampusu i nauczycieli stojących za przemianą.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wiadomość od Naszych Absolwentów | Adhiroha, Riszikeś",
    description: "Absolwenci Adhiroha opisują swoimi słowami kurs nauczycielski jogi w Riszikeś, ogród, ołtarz ognia, pięć żywiołów kampusu i nauczycieli stojących za przemianą.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
};

const pageSchema = graph(
  faqSchema(extractFaqs(content)),
  breadcrumbSchema([{ name: "Wiadomości od absolwentów", url: PL }])
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
