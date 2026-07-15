import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";

export const metadata = {
  title: "About Adhiroha Yoga Ashram | Best Yoga School in Rishikesh, India",
  description: undefined,
  alternates: { canonical: "/about-us/" }
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
