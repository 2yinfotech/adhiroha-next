import localFont from "next/font/local";

/**
 * The landing pages' two typefaces, served from files in this folder.
 *
 * These used to come from next/font/google, which downloads the fonts from
 * Google while `next build` runs. Hostinger's build server stopped being able
 * to reach Google Fonts (the loader gets an unexpected reply and dies with
 * "Cannot read properties of null (reading '1')"), so every deploy from
 * 10 November 2026 on failed and the live site stayed on the 30 October build.
 * With the files in the repo the build needs no network at all.
 *
 * Montserrat is one variable file covering weights 400 to 800, latin subset.
 * Playfair Display is the same latin files as public/fonts.
 */
export const montserrat = localFont({
  src: [{ path: "./fonts/montserrat-latin.woff2", weight: "400 800", style: "normal" }],
  variable: "--font-montserrat",
  display: "swap",
});

export const playfair = localFont({
  src: [
    { path: "./fonts/playfair-display-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/playfair-display-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/playfair-display-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-playfair",
  display: "swap",
});
