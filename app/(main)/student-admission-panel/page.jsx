import "./styles.css";
import AdmissionForm from "@/components/AdmissionForm";

export const metadata = {
  title: "Student Admission — Reserve Your Seat | Adhiroha Yoga Ashram",
  description:
    "Register for a yoga teacher training or retreat at Adhiroha Yoga Ashram in Rishikesh. Choose your course and dates, pick your stay, and reserve your seat.",
  alternates: { canonical: "/student-admission-panel/" },
};

// The admission panel deliberately runs without the site header, drawer and
// footer: it is a focused checkout flow, so nothing competes with the form.
export default function Page() {
  return (
    <main className="adm-page">
      <AdmissionForm />
    </main>
  );
}
