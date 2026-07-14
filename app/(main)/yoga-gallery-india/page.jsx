import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";

export const metadata = {
  title: "Yoga Gallery | Photos of the Adhiroha Ashram, Shala &amp; Training &mdash; Rishikesh, India",
  description: undefined,
  alternates: { canonical: "/yoga-gallery-india/" }
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
