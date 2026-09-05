// Root layout for the internal leads panel.
//
// Its own root layout, like the ads landing pages have: no SiteShell, no site
// header, footer, consent banner, Tag Manager or Meta pixel. This is a staff
// tool that shows customers' names, email addresses and phone numbers — loading
// advertising and analytics tags on those screens would send that data to third
// parties for no reason at all.
//
// noindex/nofollow is not the security boundary — the session cookie is — but it
// keeps the panel out of search results, and it is what keeps it out of
// sitemap.xml automatically, since the sitemap walker skips any route whose
// layout or page sets `index: false`.
import "../globals.css";
import "./panel.css";

export const metadata = {
  title: "Leads Panel · Adhiroha",
  robots: { index: false, follow: false, nocache: true,
            googleBot: { index: false, follow: false } },
};

export default function PanelLayout({ children }) {
  return (
    <html lang="en">
      <body className="crm">{children}</body>
    </html>
  );
}
