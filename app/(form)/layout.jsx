// Root layout for the private, link-only forms.
//
// Deliberately not SiteShell: these pages are sent to one student by hand and
// have no place in the site's navigation. No header menu, no footer, no
// analytics, nothing to click except the form itself.
//
// noindex/nofollow because the page is meaningless without a booking id and
// must never appear in search results.
import "../globals.css";
import "./form.css";

export const metadata = {
  robots: { index: false, follow: false, nocache: true,
            googleBot: { index: false, follow: false } },
};

export default function FormLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="font" type="font/woff2" href="/fonts/playfair-display-600.woff2" crossOrigin="" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/poppins-300.woff2" crossOrigin="" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/poppins-500.woff2" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
