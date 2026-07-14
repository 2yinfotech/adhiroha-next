import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";

export const metadata = {
  title: "Sadhana Immersion Programme in Rishikesh | 15-Day Yogic Living &mdash; Adhiroha",
  description: undefined,
  alternates: { canonical: "/sadhana-immersion-programme/" }
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
