// Root layout for paid-campaign landing pages.
//
// Deliberately not SiteShell: an ads landing page has one job, and the site
// chrome works against it. No header, no drawer, no footer, no navigation of
// any kind — the only thing a visitor can do here is convert or leave, which is
// what keeps the conversion rate and the Quality Score honest.
//
// These pages are noindex: they duplicate the course pages' subject matter and
// exist to receive paid traffic, so letting them into the organic index would
// only have them compete with the real pages.
import "../globals.css";
import Analytics from "@/components/Analytics";
import { GoogleTagManagerHead, GoogleTagManagerBody } from "@/components/GoogleTagManager";
import ConsentDefaults from "@/components/ConsentDefaults";
import ConsentBanner from "@/components/ConsentBanner";
import MetaPixel from "@/components/MetaPixel";
import { SITE } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE),
  robots: { index: false, follow: false, nocache: true,
            googleBot: { index: false, follow: false } },
};

export default function LandingLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="font" type="font/woff2" href="/fonts/playfair-display-600.woff2" crossOrigin="" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/poppins-300.woff2" crossOrigin="" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/poppins-500.woff2" crossOrigin="" />
        <ConsentDefaults />
        <GoogleTagManagerHead />
      </head>
      <body>
        <GoogleTagManagerBody />
        {children}
        <Analytics />
        {/* This layout does not use SiteShell, so the pixel has to be added
            here too — and this is the page paid traffic actually lands on. */}
        <MetaPixel />
        <ConsentBanner locale="en" />
      </body>
    </html>
  );
}
