/**
 * The Google tag (gtag.js) for Google Ads.
 *
 * Why this exists when the site already loads Tag Manager: Google Ads scans the
 * landing page for the Google tag itself, and a container-only install does not
 * satisfy that scan — the account reports "Google tag missing" and features that
 * depend on it (enhanced conversions, the conversion-value diagnostics, remarketing
 * audience checks) stay flagged. Loading the tag directly is what clears it.
 *
 * It does NOT fire any conversion. This is the base tag only — the `config` call
 * that identifies the account and sets the advertising cookies. Every conversion
 * on this site still fires from the Tag Manager container off the dataLayer
 * events, so nothing is counted twice. Adding a conversion event here as well is
 * the one change that WOULD double the numbers; if a conversion needs changing,
 * change it in GTM.
 *
 * Order matters and is enforced by where this is rendered: <ConsentDefaults />
 * must run first, because it creates window.gtag and declares the Consent Mode
 * defaults. This reuses that same gtag and the same dataLayer, so a visitor who
 * has not accepted cookies is covered by the denied defaults here too.
 */

// Public by definition — it ships in the page HTML on every ad landing page.
// Defaulted in code rather than left to an env var for the same reason the GTM
// container ID is: a missing variable would silently disable it on deploy.
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-761575090";

export default function GoogleAdsTag() {
  if (!ADS_ID) return null;
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];
if(!window.gtag){window.gtag=function(){dataLayer.push(arguments);};}
gtag('js',new Date());
gtag('config','${ADS_ID}',{allow_enhanced_conversions:true});`,
        }}
      />
    </>
  );
}
