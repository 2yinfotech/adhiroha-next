import ApplicationForm from "@/components/ApplicationForm";
import AuxiliaryPage from "@/components/AuxiliaryPage";
import styles from "@/components/AuxiliaryPage.module.css";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Volunteer in Rishikesh | Adhiroha Yoga School",
  description:
    "Volunteer at Adhiroha Yoga School in Rishikesh as a course coordinator — live at the ashram, support students and deepen your own practice.",
  alternates: { canonical: "/volunteer-opportunity-in-rishikesh/" },
};

// Structured data for this page — Course/FAQ/breadcrumbs so the listing
// can earn rich results. FAQs are parsed from the page's own markup.
const pageSchema = graph(
    breadcrumbSchema([{ name: "Volunteer Opportunity", url: "/volunteer-opportunity-in-rishikesh/" }])
);


const responsibilities = [
  ["Course planning and development", ["Assist with curriculum design and updates alongside senior instructors.", "Create and manage schedules around instructor and facility availability.", "Ensure yoga props, study materials and classroom spaces are prepared."]],
  ["Instructor coordination", ["Keep instructors informed of teaching schedules and course requirements.", "Collect feedback on course content, student performance and operational issues.", "Support training and development sessions for instructors."]],
  ["Student management", ["Conduct orientations for new students and explain school policies and expectations.", "Offer ongoing support, maintain attendance and assessment records.", "Serve as a dependable contact for student and instructor queries."]],
  ["Quality assurance", ["Review course effectiveness through feedback, observation and instructor input.", "Identify improvements and help implement changes that strengthen each course.", "Help uphold Adhiroha guidelines and professional standards."]],
  ["Event coordination", ["Organise workshops and special classes that enrich the student experience.", "Plan graduation ceremonies and help manage certification for course completers."]],
  ["Marketing and crisis support", ["Assist with course and school promotion across social media.", "Respond calmly to concerns and support emergency preparedness when needed."]],
];

export default function VolunteerPage() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <AuxiliaryPage
      eyebrow="Adhiroha opportunities"
      title="Volunteer Opportunity in Adhiroha"
      description="Join our course coordination team in Rishikesh and gain meaningful experience in a dedicated yoga learning environment."
    >
      <section className={styles.section}>
        <span className={styles.sectionLabel}>Course coordinator</span>
        <h2 className={styles.sectionTitle}>Work, learn and contribute to a living yoga community</h2>
        <p className={styles.lead}>We are seeking passionate volunteers who wish to work or learn at one of India&apos;s most reputed yoga schools. This role is a chance to contribute with care while becoming part of the daily life of the ashram.</p>
        <div className={styles.threeGrid}>
          <article className={styles.infoCard}><span className={styles.number}>01</span><h3>For motivated individuals</h3><p>Gain practical experience at a respected yoga institution and make a meaningful contribution behind the scenes.</p></article>
          <article className={styles.infoCard}><span className={styles.number}>02</span><h3>For Adhiroha students</h3><p>Extend your stay in Rishikesh while helping to create a steady, welcoming experience for the next group of students.</p></article>
          <article className={styles.infoCard}><span className={styles.number}>03</span><h3>For committed people</h3><p>Bring a positive attitude, organisation and a strong sense of responsibility to the role every day.</p></article>
        </div>
      </section>
      <section className={styles.sectionAlt}>
        <div>
          <span className={styles.sectionLabel}>What we offer</span>
          <h2 className={styles.sectionTitle}>A supportive place to grow</h2>
          <div className={styles.benefitGrid}>
            <article className={styles.benefitCard}><span className={styles.benefitIcon}>⌂</span><div><h3>Accommodation and meals</h3><p>Enjoy comfortable living arrangements and healthy meals during your contribution.</p></div></article>
            <article className={styles.benefitCard}><span className={styles.benefitIcon}>✦</span><div><h3>Positive work environment</h3><p>Work in a supportive, uplifting setting with a shared commitment to yoga education.</p></div></article>
            <article className={styles.benefitCard}><span className={styles.benefitIcon}>↗</span><div><h3>Personal growth</h3><p>Gain real-world experience and meaningful learning beyond financial compensation.</p></div></article>
            <article className={styles.benefitCard}><span className={styles.benefitIcon}>✓</span><div><h3>Certificate of work</h3><p>Receive recognition of your contributions and the experience you have developed.</p></div></article>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <span className={styles.sectionLabel}>Role responsibilities</span>
        <h2 className={styles.sectionTitle}>Key responsibility areas of a course coordinator</h2>
        <p className={styles.lead}>Course coordinators help ensure the smooth operation and quality delivery of every programme, spanning course planning, student care and day-to-day administration.</p>
        <div className={styles.responsibilityGrid}>
          {responsibilities.map(([heading, items]) => <article className={styles.responsibility} key={heading}><h3>{heading}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}
        </div>
        <div className={styles.notice}><span className={styles.noticeMark}>!</span><div><strong>Commitment matters</strong><p>Course coordinators are accountable to Adhiroha for their assigned responsibilities. This role needs sincerity, honesty and professional reliability; it is not suited to a casual stay focused solely on food and accommodation.</p></div></div>
      </section>
      <section className={styles.sectionAlt}>
        <div>
          <span className={styles.sectionLabel}>Apply now</span>
          <div className={styles.applyPanel}>
            <h2>Apply for the course coordinator role</h2>
            <p>Tell us about your skills, experience and availability. Your details will be prepared in an email addressed directly to our team.</p>
            <ApplicationForm type="volunteer" />
          </div>
        </div>
      </section>
    </AuxiliaryPage>
  </>
  );
}
