import "./styles.css";
import AdmissionForm from "@/components/AdmissionForm";

export const metadata = {
  title: "Book Your Yoga Teacher Training | Adhiroha Admissions",
  description:
    "Reserve your place on a yoga teacher training at Adhiroha, Rishikesh. Choose your course and dates and secure your seat with the registration fee.",
  alternates: { canonical: "/student-admission-panel/" },
  // A transactional booking form, ~100 words of unique copy. It is reached from
  // the Register buttons across the site rather than from search, and indexing
  // it would only add a thin page to the index — so keep it out, but follow the
  // links so the course pages it points back to still benefit.
  robots: { index: false, follow: true },
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
