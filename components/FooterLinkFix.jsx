"use client";

import { useEffect } from "react";

const FOOTER_LINKS = {
  "https://adhiroha.com/weather.php": "/weather/",
  "https://www.adhiroha.com/weather.php": "/weather/",
  "https://adhiroha.com/volunteer-opportunity-in-rishikesh": "/volunteer-opportunity-in-rishikesh/",
  "https://www.adhiroha.com/volunteer-opportunity-in-rishikesh": "/volunteer-opportunity-in-rishikesh/",
  "https://adhiroha.com/apply-for-teacher-in-rishikesh": "/apply-for-teacher-in-rishikesh/",
  "https://www.adhiroha.com/apply-for-teacher-in-rishikesh": "/apply-for-teacher-in-rishikesh/",
};

// Older hand-built pages each contain a copy of the footer. Normalise these
// three legacy URLs after render so every site footer leads to the local pages.
export default function FooterLinkFix() {
  useEffect(() => {
    document.querySelectorAll("footer a[href]").forEach((link) => {
      const localPath = FOOTER_LINKS[link.href];
      if (localPath) link.setAttribute("href", localPath);
    });
  }, []);

  return null;
}
