import "./styles.css";
import content from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";

export const metadata = {
  title: "Pranayama &amp; Meditation Yoga Teacher Training in Rishikesh | Adhiroha Yoga School",
  description: undefined,
  alternates: { canonical: "/pranayama-teacher-training-course-rishikesh/" }
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <PageScripts code={scripts} />
    </>
  );
}
