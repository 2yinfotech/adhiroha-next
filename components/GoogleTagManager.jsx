/**
 * Google Tag Manager container.
 *
 * The ID comes from NEXT_PUBLIC_GTM_ID so the container can be swapped (or left
 * out of a preview deploy) without a code change. When the variable is missing
 * nothing renders at all, which keeps local development free of tag noise.
 *
 * Every form on the site submits over fetch and calls preventDefault(), so GTM's
 * built-in "Form Submission" trigger never sees them. Conversions are instead
 * driven by the dataLayer events pushed from the form handlers themselves:
 *
 *   contact_form_submit  the sitewide enquiry form, on a confirmed 200 from the API
 *   lead_form_submit     the Google Ads landing page guide form, same condition
 *   application_start    teacher / volunteer application, when the email is composed
 *   booking_complete     an admission payment that reached /thank-you/
 *
 * Each carries a form_location and page_path so one trigger can serve every page
 * and the reporting can still be split by where the enquiry came from.
 */

/* The container ID is public by definition — it ships in the page HTML — so it
   is defaulted here rather than left to an environment variable. .env.local is
   gitignored, and a missing variable would fail silently: the tags would simply
   stop rendering on the deployed site with nothing to show for it. The env var
   still wins, so a staging container can be swapped in without a code change.

   Note there are two containers on this account. GTM-MXT62BFP is the one the
   conversion tags were built in; GTM-KC9BF3J must NOT also be added, or every
   conversion would be counted twice. */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MXT62BFP";

/* Sits in <head>, as high as possible: GTM needs to load before the page's own
   scripts so that anything pushed during load is not missed. The dataLayer is
   created first so a push that happens before GTM has parsed still queues. */
export function GoogleTagManagerHead() {
  if (!GTM_ID) return null;
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer=window.dataLayer||[];
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
      }}
    />
  );
}

/* The no-JavaScript fallback, which must be the first thing inside <body>. */
export function GoogleTagManagerBody() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
