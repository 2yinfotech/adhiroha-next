import "../[slug]/styles.css"; // shared site chrome (header, drawer, footer) styling
import "./styles.css";
import { HEADER_HTML, DRAWER_HTML, FOOTER_HTML } from "@/components/chrome";
import ArticleScripts from "@/components/ArticleScripts";
import AdmissionForm from "@/components/AdmissionForm";

export const metadata = {
  title: "Student Admission — Reserve Your Seat | Adhiroha Yoga Ashram",
  description:
    "Register for a yoga teacher training or retreat at Adhiroha Yoga Ashram in Rishikesh. Choose your course and dates, pick your stay, and reserve your seat.",
  alternates: { canonical: "/student-admission-panel/" },
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: HEADER_HTML }} />
      <div dangerouslySetInnerHTML={{ __html: DRAWER_HTML }} />
      <main className="adm-page">
        <AdmissionForm />
      </main>
      <div dangerouslySetInnerHTML={{ __html: FOOTER_HTML }} />
      <ArticleScripts />
    </>
  );
}
