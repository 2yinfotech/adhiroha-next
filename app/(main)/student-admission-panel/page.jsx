import "./styles.css";
import AdmissionForm from "@/components/AdmissionForm";

export const metadata = {
  title: "Book Your Yoga Teacher Training | Adhiroha Admissions",
  description:
    "Reserve your place on a yoga teacher training or retreat at Adhiroha, Rishikesh. Choose your course and dates and secure your seat with the registration fee.",
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
