import { Suspense } from "react";
import "./styles.css";
import "./thankyou.css";
import { BEFORE, AFTER } from "./content";
import scripts from "./scripts";
import PageScripts from "@/components/PageScripts";
import BookingConfirmation from "@/components/BookingConfirmation";
import JsonLd from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Booking Confirmed | Adhiroha Yoga School, Rishikesh",
  description:
    "Your place on a yoga teacher training at Adhiroha Yoga School in Rishikesh is reserved. Here is your booking reference and what happens next.",
  alternates: { canonical: "/thank-you/" },
  // A per-booking confirmation page has no search value and must not be indexed.
  robots: { index: false, follow: true },
};

const pageSchema = graph(breadcrumbSchema([{ name: "Booking Confirmed", url: "/thank-you/" }]));

// Only runs for a real booking: without a payment id on the URL this is someone
// who opened the page directly, and there is nothing to attribute to them. The
// key is cleared after reading so a later refresh cannot re-announce the buyer.
const BOOKING_USER_DATA = `
(function(){
  try{
    if(location.search.indexOf('payment=')===-1)return;
    var e=sessionStorage.getItem('adhiroha:booking_email');
    if(!e)return;
    sessionStorage.removeItem('adhiroha:booking_email');
    e=e.trim().toLowerCase();
    if(!e)return;
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({user_data:{email_address:e}});
  }catch(x){}
})();
`;

export default function Page() {
  return (
    <>
      <JsonLd data={pageSchema} />
      {/* Enhanced conversions for the booking. The Ads tag reads user_data off
          the dataLayer, so the email has to be there before that tag fires —
          this is an inline script rather than an effect precisely because it
          must run during parse, not after hydration. The address was put in
          sessionStorage by the admission panel; see AdmissionForm.goToThankYou.
          No conversion event is pushed here: GTM fires the booking tag from the
          URL on its own. */}
      <script dangerouslySetInnerHTML={{ __html: BOOKING_USER_DATA }} />
      <div dangerouslySetInnerHTML={{ __html: BEFORE }} />
      {/* Reads the booking details from the query string, so it must be client-side
          and wrapped in Suspense for static rendering. */}
      <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
        <BookingConfirmation />
      </Suspense>
      <div dangerouslySetInnerHTML={{ __html: AFTER }} />
      <PageScripts code={scripts} />
    </>
  );
}
