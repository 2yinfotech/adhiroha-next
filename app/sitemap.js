export const dynamic = "force-static";

const BASE = "https://www.adhiroha.com";

const routes = [
  "",
  "about-us",
  "contact-us",
  "blogs",
  "yoga-gallery-india",
  "yoga-teachers-in-india",
  "yoga-retreat-in-rishikesh",
  "yoga-ashram-in-india-code-of-conduct",
  "safety-hygiene-in-rishikesh",
  "soon-after-message",
  "sadhana-immersion-programme",
  "sound-healing-ttc-rishikesh",
  "200-hour-yoga-teacher-training-course-rishikesh",
  "300-hour-yoga-teacher-training-course-rishikesh",
  "500-hour-yoga-teacher-training-course-rishikesh",
  "ashtanga-teacher-training-course-rishikesh",
  "hatha-teacher-training-course-rishikesh",
  "pranayama-teacher-training-course-rishikesh",
  "blog-200-hour-yoga-teacher-training-guide",
  "blog-300-vs-500-hour-yoga-teacher-training",
  "blog-500-hour-yoga-teacher-training-worth-it",
  "weather",
  "volunteer-opportunity-in-rishikesh",
  "apply-for-teacher-in-rishikesh",
  "faqs-of-yoga-school-in-india",
  "privacy-policy",
  "yoga-teacher-training-course-rishikesh-india",
];

export default function sitemap() {
  const now = new Date();
  return routes.map((r) => ({
    url: r === "" ? `${BASE}/` : `${BASE}/${r}/`,
    lastModified: now,
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
