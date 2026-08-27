import Analytics from "@/components/Analytics";
import { GoogleTagManagerHead, GoogleTagManagerBody } from "@/components/GoogleTagManager";
import ConsentDefaults from "@/components/ConsentDefaults";
import ConsentBanner from "@/components/ConsentBanner";
import MetaPixel from "@/components/MetaPixel";
import CourseEnquiryModal from "@/components/CourseEnquiryModal";
import RegistrationDonePopup from "@/components/RegistrationDonePopup";
import JsonLd from "@/components/JsonLd";
import LeafletOnDemand from "@/components/LeafletOnDemand";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo";

// The document shell every root layout renders.
//
// The App Router only lets a *root* layout render <html>, and a root layout has
// no way to read the pathname during a static build — so a single root layout
// could only ever hardcode one lang, which is how all 211 pages ended up
// claiming lang="en" including the 184 translated ones. The fix is one root
// layout per locale (app/(en), app/de, app/fr, …), each passing its own `lang`
// here, so the attribute is correct in the served HTML rather than patched in
// by client-side JS after paint.

// Contact-form handler as a plain inline script (NOT a React client component):
// the forms live in server-rendered HTML with action="#", and if we waited for
// React hydration to attach the submit listener, a fast submit on a heavy page
// (e.g. /contact-us with its map) would fall through to the default action and
// reload the page. A delegated listener attached on parse avoids that race.
const CONTACT_FORM_SCRIPT = `
(function(){
  function isContactForm(f){return !!(f.querySelector('input[name="email"]')&&f.querySelector('textarea[name="message"]'));}
  /* The same enquiry form is embedded on the course pages as well as on
     /contact-us/, and the two need to be told apart in Google Ads. Rather than
     tagging 121 copies of the markup, the page says what it is about already:
     every course page emits Course JSON-LD, and its "name" is the course, in
     that page's own language. A page with no Course node, /contact-us/ and the
     homepage among them, is a general enquiry and keeps its original event. */
  function courseOnThisPage(){
    try{
      var tags=document.querySelectorAll('script[type="application/ld+json"]');
      for(var i=0;i<tags.length;i++){
        var parsed=JSON.parse(tags[i].textContent||'{}');
        var nodes=parsed['@graph']||[parsed];
        for(var j=0;j<nodes.length;j++){
          if(nodes[j]&&nodes[j]['@type']==='Course'&&nodes[j].name){return nodes[j].name;}
        }
      }
    }catch(e){}
    return '';
  }
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
        if(res.ok&&res.j.ok){
          form.reset();
          note(form,'Thank you! Your message has been sent. We\\u2019ll reply soon.',true);
          // The conversion signal for Tag Manager. Fired here and nowhere else,
          // so a failed send or a bounced validation never counts as a lead.
          // The email is normalised for enhanced conversions, and omitted rather
          // than sent empty when the visitor left the field blank. Email only:
          // no name, phone or address goes into user_data.
          window.dataLayer=window.dataLayer||[];
          var course=courseOnThisPage();
          var payload=course
            ? {event:'lead_form_submit',form_location:window.location.pathname,form_name:'course_enquiry',course_interest:course}
            : {event:'contact_form_submit',form_location:window.location.pathname,form_name:'contact_us'};
          var em=(data.email||'').trim().toLowerCase();
          if(em){payload.user_data={email_address:em};}
          window.dataLayer.push(payload);
          /* Meta's matching conversion. Guarded: the pixel is only present once
             the visitor has accepted cookies, and this same block is the one
             place that knows the send actually succeeded. */
          if(window.fbq){window.fbq('track','Lead');}
        }
        else{note(form,(res.j&&(res.j.message||res.j.error))||'Something went wrong. Please email info@adhiroha.com.',false);}
      })
      .catch(function(){note(form,'Network error. Please email us at info@adhiroha.com.',false);})
      .finally(function(){if(btn){btn.disabled=false;btn.textContent=original;}});
  },true);
})();
`;

export default function SiteShell({ lang, children }) {
  return (
    <html lang={lang}>
      <head>
        {/* The fonts used to be base64-inlined into the route stylesheet, which
            meant no text could paint until ~420 KB of binary had downloaded.
            They are real files now, so preload the four faces that carry the
            visible page — Playfair for every heading, Poppins for body text —
            and let the rest arrive with font-display: swap. */}
        <link rel="preload" as="font" type="font/woff2" href="/fonts/playfair-display-600.woff2" crossOrigin="" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/playfair-display-500.woff2" crossOrigin="" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/poppins-300.woff2" crossOrigin="" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/poppins-500.woff2" crossOrigin="" />
        {/* Sitewide structured data: who we are, and the site itself. Per-page
            schema (Course, FAQPage, BreadcrumbList) is added by each page. */}
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        {/* Consent Mode v2 defaults. Must stay directly above the container:
            gtm.js has to load already knowing what it is allowed to do. */}
        <ConsentDefaults />
        {/* Tag Manager, ahead of the form handler so early pushes are not lost. */}
        <GoogleTagManagerHead />
        {/* Attach the contact-form submit handler immediately, before hydration. */}
        <script dangerouslySetInnerHTML={{ __html: CONTACT_FORM_SCRIPT }} />
      </head>
      <body>
        <GoogleTagManagerBody />
        {children}
        {/* Hotjar, minus the blog. See components/Analytics. */}
        <Analytics />
        {/* Meta Pixel: PageView everywhere, ViewContent on the course pages and
            Lead on a completed booking. Waits for cookie consent like Hotjar. */}
        <MetaPixel />
        <ConsentBanner locale={lang} />
        {/* Arms itself only on the courses that are not currently running. */}
        <CourseEnquiryModal locale={lang} />
        {/* Confirms the registration form to a student who has just been sent back here. */}
        <RegistrationDonePopup />
        {/* Fetches Leaflet only when a map is about to scroll into view. Must
            sit after {children} so the page's own scripts have registered their
            `adhiroha:leaflet` listener before this can dispatch it. */}
        <LeafletOnDemand />
      </body>
    </html>
  );
}
