import { Montserrat, Playfair_Display } from "next/font/google";
import "./styles.css";

/**
 * Where a landing-page enquiry lands after it is saved.
 *
 * Under app/(lp)/ so it inherits that layout's noindex — a thank-you page must
 * never be indexed, or it turns up in search results for people who never filled
 * anything in and the conversion count stops meaning anything.
 *
 * It is also the conversion page: the enquiry form redirects here only after the
 * API has confirmed the row was written, so the conversion firing here means a
 * real, saved lead — not a submit button that was clicked.
 *
 * The event name `lead_form_submit` is not cosmetic. It is the one the GTM
 * container (GTM-MXT62BFP) already has a Google Ads conversion tag for. This
 * page originally pushed `generate_lead`, which reads better but which nothing
 * in the container listens for — so three real leads were captured and saved
 * while Google Ads recorded nothing at all. Verified by pushing each candidate
 * name into the live container and watching the network: `lead_form_submit` and
 * `contact_form_submit` each produce a request to
 * googleadservices.com/pagead/conversion/761575090/, `generate_lead` produces
 * none. Do not rename this without building the matching tag in GTM first.
 */

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "Thank You | Adhiroha Yoga Ashram",
  description: "Your enquiry has reached us. Our course counsellor will be in touch shortly.",
};

/* Fires the conversion, and only ever once.
 *
 * The enquiry form stashes the visitor's email and name in sessionStorage
 * immediately before redirecting here, purely so Google's enhanced conversions
 * can match the lead. Both are read once, pushed, and then cleared — a reload of
 * this page must not count a second conversion, and the details must not sit in
 * session storage for the rest of the visit.
 *
 * Inline rather than a client component for the same reason as the landing
 * page's own script: this runs during parse, so a visitor who closes the tab
 * after two seconds is still counted. */
const CONVERSION_SCRIPT = `
(function(){
  try{
    if(sessionStorage.getItem('lead_counted')==='1')return;
    var email=(sessionStorage.getItem('ec_email')||'').trim().toLowerCase();
    var name=(sessionStorage.getItem('ec_name')||'').trim();
    var payload={event:'lead_form_submit',form_name:'course_enquiry',form_location:'/yoga-training-rishikesh/'};
    if(email){payload.user_data={email_address:email};}
    if(name){payload.lead_name=name;}
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push(payload);
    if(window.fbq){window.fbq('track','Lead');}
    sessionStorage.setItem('lead_counted','1');
    sessionStorage.removeItem('ec_email');
    sessionStorage.removeItem('ec_name');
  }catch(e){}
})();
`;

export default function Page() {
  return (
    <div className={`tq-page ${montserrat.variable} ${playfair.variable}`}>
      <header className="tq-header">
        <img src="/lp/yoga-training/adhiroha-logo-14.png" alt="Adhiroha" width="150" height="50" />
      </header>

      <main className="tq-main">
        <div className="tq-card">
          <svg className="tq-tick" viewBox="0 0 52 52" aria-hidden="true">
            <circle cx="26" cy="26" r="25" />
            <path d="M15 27l8 8 15-16" />
          </svg>

          <h1>Thank You — We Have Your Enquiry</h1>
          <p>
            Your details are with our course counsellor in Rishikesh. You will hear
            from a real person, not an autoresponder.
          </p>
          <p>
            Please check your inbox — and your spam folder, where a first email from
            a new sender often lands.
          </p>

          <div className="tq-next">
            <h2>What happens next</h2>
            <ul>
              <li>Course details and the E-Handbook PDF arrive by email shortly.</li>
              <li>A counsellor replies personally, usually within one working day.</li>
              <li>
                Anything urgent — dates, visas, airport pickup — is fastest on
                WhatsApp.
              </li>
            </ul>
          </div>

          <div className="tq-actions">
            <a
              className="tq-btn tq-wa"
              href="https://wa.me/919999048900?text=Hi%2C%20I%20just%20enquired%20about%20your%20Yoga%20Teacher%20Training%20in%20Rishikesh."
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.52 3.48A11.91 11.91 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.18 1.6 6.01L0 24l6.19-1.58A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 21.5c-2.07 0-4.08-.54-5.85-1.57l-.42-.25-3.67.94.98-3.58-.27-.43A9.52 9.52 0 0 1 2.5 12c0-5.25 4.25-9.5 9.5-9.5s9.5 4.25 9.5 9.5-4.25 9.5-9.5 9.5zm5.41-7.85c-.3-.15-1.77-.87-2.04-.97-.27-.1-.46-.15-.65.15s-.75.97-.92 1.17c-.17.2-.34.22-.64.07s-1.25-.46-2.38-1.47c-.88-.78-1.47-1.74-1.65-2.03-.17-.29-.02-.45.13-.6.13-.13.3-.34.45-.51.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.65-1.56-.89-2.14-.23-.56-.47-.48-.65-.49h-.55c-.18 0-.48.07-.73.34s-.96.94-.96 2.3c0 1.36.98 2.67 1.12 2.86.15.2 1.93 2.95 4.68 4.14.65.28 1.16.45 1.55.58.65.21 1.24.18 1.71.11.52-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
              </svg>
              Message us on WhatsApp
            </a>
            <a className="tq-btn tq-home" href="/yoga-training-rishikesh/">
              Back to the course
            </a>
          </div>

          <p className="tq-meta">
            Prefer email? Write to <a href="mailto:info@adhiroha.com">info@adhiroha.com</a>{" "}
            or call <a href="tel:+919999048900">+91-9999-048-900</a>.
          </p>
        </div>
      </main>

      <footer className="tq-footer">
        <img src="/lp/yoga-training/adhiroha-logo-15.png" alt="Adhiroha" width="130" height="43" />
        <p>Adhiroha, Adhiroha Trek Road, Upper Tapovan, Rishikesh, Uttarakhand, Bharat (India) 249137</p>
        <p>+91-9999-048-900 &middot; info@adhiroha.com</p>
        <p>&copy; 2026 Adhiroha. All rights reserved.</p>
      </footer>

      <script dangerouslySetInnerHTML={{ __html: CONVERSION_SCRIPT }} />
    </div>
  );
}
