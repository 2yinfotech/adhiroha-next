import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";

export const metadata = {
  title: "Yoga Teachers in India | Meet Our Expert Acharyas &mdash; Adhiroha, Rishikesh",
  description: undefined,
  alternates: { canonical: "/yoga-teachers-in-india/" }
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
