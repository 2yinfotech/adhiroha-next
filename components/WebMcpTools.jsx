"use client";

import { useEffect } from "react";

// WebMCP: tools an in-browser AI agent can call instead of scraping the page
// (navigator.modelContext, an early Chrome proposal). Read-only on purpose: an
// agent can look courses and contact details up, but nothing here books,
// submits or sends anything.
//
// Fees are left to the course pages, which are the only place they are kept;
// copying them here would let the two drift apart. Start days mirror
// COURSE_FACTS in lib/seo.js (not imported: it would ship the whole SEO module
// to every visitor's browser).
const COURSES = [
  ["200 hour yoga teacher training", "/200-hour-yoga-teacher-training-course-rishikesh/", [1]],
  ["300 hour yoga teacher training", "/300-hour-yoga-teacher-training-course-rishikesh/", [1]],
  ["500 hour yoga teacher training", "/500-hour-yoga-teacher-training-course-rishikesh/", [1]],
  ["Hatha & Yin teacher training", "/hatha-teacher-training-course-rishikesh/", [1]],
  ["Ashtanga & Vinyasa teacher training", "/ashtanga-teacher-training-course-rishikesh/", [1]],
  ["Pranayama & Meditation teacher training", "/pranayama-teacher-training-course-rishikesh/", [1]],
  ["Sound Healing & Therapy teacher training", "/sound-healing-ttc-rishikesh/", [24]],
  ["Sadhana Immersion Programme", "/sadhana-immersion-programme/", [1, 15]],
];

const SITE = "https://www.adhiroha.com";
const ordinal = (d) => d + (d === 1 ? "st" : d === 2 ? "nd" : d === 3 ? "rd" : "th");
const text = (value) => ({ content: [{ type: "text", text: JSON.stringify(value, null, 2) }] });

const TOOLS = [
  {
    name: "list_courses",
    description:
      "List the courses offered by Adhiroha, a Yoga Alliance registered yoga school in Upper Tapovan, Rishikesh, India, with each course's page and the day of the month batches start. Fees and syllabus are on each course page.",
    inputSchema: { type: "object", properties: {} },
    execute: async () =>
      text(
        COURSES.map(([name, path, days]) => ({
          name,
          url: SITE + path,
          batches_start: `${days.map(ordinal).join(" and ")} of every month`,
        }))
      ),
  },
  {
    name: "get_contact_details",
    description: "Get Adhiroha's address, phone, WhatsApp, email and the page for applying to a course.",
    inputSchema: { type: "object", properties: {} },
    execute: async () =>
      text({
        name: "Adhiroha",
        address: "Adhiroha Trek Road, Upper Tapovan, Rishikesh, Uttarakhand 249137, India",
        phone: "+91 99990 48900",
        whatsapp: "https://api.whatsapp.com/send?phone=919999048900",
        email: "info@adhiroha.com",
        apply: `${SITE}/student-admission-panel/`,
        contact_page: `${SITE}/contact-us/`,
      }),
  },
];

export default function WebMcpTools() {
  useEffect(() => {
    const mc = typeof navigator !== "undefined" ? navigator.modelContext : null;
    if (!mc) return;
    const done = [];
    try {
      if (typeof mc.registerTool === "function") {
        for (const tool of TOOLS) {
          const handle = mc.registerTool(tool);
          done.push(() => (handle?.unregister ? handle.unregister() : mc.unregisterTool?.(tool.name)));
        }
      } else if (typeof mc.provideContext === "function") {
        mc.provideContext({ tools: TOOLS });
      }
    } catch {
      /* the API is still a draft; a shape change must never break the page */
    }
    return () => done.forEach((undo) => { try { undo(); } catch {} });
  }, []);
  return null;
}
