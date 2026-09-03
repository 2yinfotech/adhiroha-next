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

/* WhatsApp click, the second of the two GA4 key events the gap audit asked for.
   (The first, the enquiry-form submission, is pushed by the handler above.)

   WhatsApp is the school's busiest enquiry channel and none of it was being
   measured: every link is a plain outbound <a> to api.whatsapp.com, and an
   outbound click leaves the page without GA4 ever hearing about it. Delegated
   at the document level and attached on parse, so it covers the header, the
   footer, the mobile drawer, the floating button and any link written into page
   copy — in all eleven languages — without tagging a single one of them.

   `link_location` is derived from where the link sits, so the reporting can
   tell a floating-button tap from a considered click at the bottom of a course
   page. No listener is added to the links themselves: they must keep navigating
   normally, and preventing the default to wait for a beacon is how a tracked
   link ends up not opening WhatsApp at all. */
const WHATSAPP_CLICK_SCRIPT = `
(function(){
  function locationOf(a){
    if(a.closest('.wa-float'))return'floating_button';
    if(a.closest('header'))return'header';
    if(a.closest('aside'))return'mobile_drawer';
    if(a.closest('footer'))return'footer';
    return'page_body';
  }
  document.addEventListener('click',function(e){
    var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;
    if(!a)return;
    var href=a.getAttribute('href')||'';
    if(!/(?:api\\.whatsapp\\.com|wa\\.me|web\\.whatsapp\\.com)/.test(href))return;
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({
      event:'whatsapp_click',
      link_location:locationOf(a),
      page_path:window.location.pathname,
      link_url:href
    });
    /* Meta's equivalent, guarded — the pixel only exists once cookies are accepted. */
    if(window.fbq){window.fbq('track','Contact');}
  },true);
})();
`;

/* Header background and auto-hide, attached during parse.

   This logic already existed, but only inside <StickyHeader>, a React client
   component — so on every page except the homepage it could not run until the
   whole React bundle had downloaded, parsed and hydrated. Measured on a
   throttled mid-range phone against the live site, that was 6.2 seconds during
   which the fixed header sat fully transparent over the hero and did not hide
   on scroll. On desktop it hydrates fast enough that nobody notices, which is
   why it read as a phone-only bug.

   Nothing here needs React, a framework or even the header to exist yet: the
   element is re-queried lazily, because this script sits in <head> and the
   markup it looks for is parsed later. StickyHeader still ships as the failsafe
   and now skips its own scroll wiring when this has already bound, so the two
   can never fight over the same classes.

   Kept deliberately identical in behaviour to the homepage's inlined copy in
   app/_home/scripts.js — same thresholds, same class names — so the header
   behaves the same on every page of the site. */
const HEADER_SCROLL_SCRIPT = `
(function(){
  if(window.__adhHeaderBound)return;
  window.__adhHeaderBound=1;
  var hd=null,lastY=window.pageYOffset||0;
  function onScroll(){
    if(!hd)hd=document.getElementById('hd');
    if(!hd)return;
    var y=window.pageYOffset||0;
    hd.classList.toggle('stuck',y>40);
    if(y>lastY+5&&y>220){hd.classList.add('hide');}
    else if(y<lastY-5){hd.classList.remove('hide');}
    if(y<120){hd.classList.remove('hide');}
    lastY=y;
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  /* Run once as soon as the header exists: a reload part-way down the page must
     paint the header already styled rather than waiting for the first scroll. */
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',onScroll);}
  else{onScroll();}
  onScroll();
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
        {/* Outbound WhatsApp clicks, the site's other conversion signal. */}
        <script dangerouslySetInnerHTML={{ __html: WHATSAPP_CLICK_SCRIPT }} />
        {/* Header background / auto-hide, bound now rather than after hydration. */}
        <script dangerouslySetInnerHTML={{ __html: HEADER_SCROLL_SCRIPT }} />
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
