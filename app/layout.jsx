import "./globals.css";
import Script from "next/script";
import FooterLinkFix from "@/components/FooterLinkFix";
import ContactFormHandler from "@/components/ContactFormHandler";

export const metadata = {
  metadataBase: new URL("https://www.adhiroha.com"),
  title: "Adhiroha Yoga School",
  description:
    "Adhiroha Yoga School — Yoga Alliance certified teacher training courses and retreats in Rishikesh, India.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Leaflet CSS — used by the location maps that appear across the site. */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          crossOrigin=""
        />
      </head>
      <body>
        {children}
        <FooterLinkFix />
        <ContactFormHandler />
        {/* Leaflet must be present before the page 'load' handlers run their
            map init, so load it before the app becomes interactive. */}
        <Script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          strategy="beforeInteractive"
          crossOrigin=""
        />
      </body>
    </html>
  );
}
