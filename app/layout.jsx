import "./globals.css";
import Script from "next/script";
import FooterLinkFix from "@/components/FooterLinkFix";
import JsonLd from "@/components/JsonLd";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata = {
  // www is the canonical host — non-www must 301 to it at the server (see DEPLOY.md).
  metadataBase: new URL("https://www.adhiroha.com"),
  title: "Yoga Teacher Training in Rishikesh | 200/300/500-Hr YTTC — Adhiroha",
  description:
    "Yoga Alliance certified 200, 300 & 500 hour yoga teacher training in Rishikesh, India. Small batches, expert Indian teachers, ashram stay & meals included.",
  applicationName: "Adhiroha Yoga School",
  authors: [{ name: "Adhiroha Yoga School" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Adhiroha Yoga School",
    locale: "en_US",
    url: "https://www.adhiroha.com",
    title: "Yoga Teacher Training in Rishikesh | 200/300/500-Hr YTTC — Adhiroha",
    description:
      "Yoga Alliance certified 200, 300 & 500 hour yoga teacher training in Rishikesh, India. Small batches, expert Indian teachers, ashram stay & meals included.",
    images: [{ url: "/img/yoga-teacher-training-india-course.webp", width: 1200, height: 630, alt: "Adhiroha Yoga School, Upper Tapovan, Rishikesh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yoga Teacher Training in Rishikesh | 200/300/500-Hr YTTC — Adhiroha",
    description:
      "Yoga Alliance certified 200, 300 & 500 hour yoga teacher training in Rishikesh, India.",
    images: ["/img/yoga-teacher-training-india-course.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

// Hotjar (heatmaps + session recordings). Lives in <head> so it loads on every
// page in the app, which is what Hotjar's install check looks for. The site id
// is public by design; override it per-environment with NEXT_PUBLIC_HOTJAR_ID.
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID || "5139050";
const HOTJAR_SCRIPT = `
(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
`;

// Contact-form handler as a plain inline script (NOT a React client component):
// the forms live in server-rendered HTML with action="#", and if we waited for
// React hydration to attach the submit listener, a fast submit on a heavy page
// (e.g. /contact-us with its map) would fall through to the default action and
// reload the page. A delegated listener attached on parse avoids that race.
const CONTACT_FORM_SCRIPT = `
(function(){
  function isContactForm(f){return !!(f.querySelector('input[name="email"]')&&f.querySelector('textarea[name="message"]'));}
  function note(form,msg,ok){
    var el=form.querySelector('.cf-result');
    if(!el){el=document.createElement('p');el.className='cf-result';el.style.cssText='margin-top:14px;font-size:13.5px;font-weight:500;text-align:center;line-height:1.5';form.appendChild(el);}
    el.style.color=ok?'#2e7d32':'#c0392b';el.textContent=msg;
  }
  document.addEventListener('submit',function(e){
    var form=e.target;
    if(!form||form.tagName!=='FORM'||!isContactForm(form))return;
    e.preventDefault();
    var btn=form.querySelector('.cf-send')||form.querySelector('button[type="submit"]');
    var original=btn?btn.textContent:'';
    function v(n){var el=form.querySelector('[name="'+n+'"]');return el&&el.value?el.value.trim():'';}
    var data={name:v('name'),email:v('email'),phone:v('phone'),message:v('message')};
    if(btn){btn.disabled=true;btn.textContent='Sending…';}
    fetch('/api/contact/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
      .then(function(r){return r.json().catch(function(){return{};}).then(function(j){return{ok:r.ok,j:j};});})
      .then(function(res){
        if(res.ok&&res.j.ok){form.reset();note(form,'Thank you! Your message has been sent \\u2014 we\\u2019ll reply soon.',true);}
        else{note(form,(res.j&&(res.j.message||res.j.error))||'Something went wrong. Please email info@adhiroha.com.',false);}
      })
      .catch(function(){note(form,'Network error. Please email us at info@adhiroha.com.',false);})
      .finally(function(){if(btn){btn.disabled=false;btn.textContent=original;}});
  },true);
})();
`;

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
        {/* Sitewide structured data: who we are, and the site itself. Per-page
            schema (Course, FAQPage, BreadcrumbList) is added by each page. */}
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        {/* Hotjar Tracking Code for adhiroha.com */}
        <script dangerouslySetInnerHTML={{ __html: HOTJAR_SCRIPT }} />
        {/* Attach the contact-form submit handler immediately, before hydration. */}
        <script dangerouslySetInnerHTML={{ __html: CONTACT_FORM_SCRIPT }} />
      </head>
      <body>
        {children}
        <FooterLinkFix />
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
