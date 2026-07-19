import ApplicationForm from "@/components/ApplicationForm";
import AuxiliaryPage from "@/components/AuxiliaryPage";
import styles from "@/components/AuxiliaryPage.module.css";

export const metadata = {
  title: "Apply for Yoga Teacher in Rishikesh | Adhiroha",
  description: "Apply to teach yoga at Adhiroha Yoga Ashram in Rishikesh.",
  alternates: { canonical: "/apply-for-teacher-in-rishikesh/" },
};

export default function TeacherApplicationPage() {
  return (
    <AuxiliaryPage eyebrow="Join the teaching team" title="Apply for a Yoga Teacher Role in Rishikesh" description="Share your experience, teaching approach and love of yoga with the Adhiroha community.">
      <section className={styles.section}>
        <span className={styles.sectionLabel}>Application form</span>
        <h2 className={styles.sectionTitle}>Bring your teaching to Adhiroha</h2>
        <p className={styles.lead}>Please share your details below. Our team will review your application and get back to you shortly. We look forward to potentially welcoming you to our vibrant and dedicated community of yoga educators.</p>
        <div className={styles.applyPanel}>
          <h2>Teacher application</h2>
          <p>Please include the yoga styles you teach, your certification, experience and the teaching philosophy that guides your classes.</p>
          <ApplicationForm type="teacher" />
        </div>
      </section>
    </AuxiliaryPage>
  );
}
