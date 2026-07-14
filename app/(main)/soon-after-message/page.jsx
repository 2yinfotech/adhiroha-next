import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";

export const metadata = {
  title: "Soon After Message | What Our Alumni Say About Adhiroha &mdash; Yoga Teacher Training Rishikesh",
  description: undefined,
  alternates: { canonical: "/soon-after-message/" }
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
