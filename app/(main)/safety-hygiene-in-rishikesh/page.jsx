import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";

export const metadata = {
  title: "Safety &amp; Hygiene in Rishikesh | Adhiroha Yoga Ashram &mdash; Solo Traveller Friendly",
  description: undefined,
  alternates: { canonical: "/safety-hygiene-in-rishikesh/" }
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
