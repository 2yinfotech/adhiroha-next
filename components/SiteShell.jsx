import Analytics from "@/components/Analytics";
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
        if(res.ok&&res.j.ok){form.reset();note(form,'Thank you! Your message has been sent. We\\u2019ll reply soon.',true);}
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
        {/* Attach the contact-form submit handler immediately, before hydration. */}
        <script dangerouslySetInnerHTML={{ __html: CONTACT_FORM_SCRIPT }} />
      </head>
      <body>
        {children}
        {/* Hotjar, minus the blog. See components/Analytics. */}
        <Analytics />
        {/* Fetches Leaflet only when a map is about to scroll into view. Must
            sit after {children} so the page's own scripts have registered their
            `adhiroha:leaflet` listener before this can dispatch it. */}
        <LeafletOnDemand />
      </body>
    </html>
  );
}
