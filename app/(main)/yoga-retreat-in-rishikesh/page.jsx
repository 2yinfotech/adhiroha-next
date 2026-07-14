import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";

export const metadata = {
  title: "Yoga &amp; Ayurveda Wellness Retreat in Rishikesh | Adhiroha Yoga School",
  description: undefined,
  alternates: { canonical: "/yoga-retreat-in-rishikesh/" }
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
