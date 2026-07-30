// Root layout for every /fr/ route. It renders the document itself, so
// <html lang="fr"> is in the served HTML rather than being corrected by
// client-side JS after the page has already parsed as English.
import "../globals.css";
import SiteShell from "@/components/SiteShell";
import { rootMetadata } from "@/lib/root-metadata";

export const metadata = rootMetadata("fr");

export default function FrenchRootLayout({ children }) {
  return <SiteShell lang="fr">{children}</SiteShell>;
}
