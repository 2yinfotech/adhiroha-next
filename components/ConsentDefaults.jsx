/**
 * Google Consent Mode v2 defaults.
 *
 * This must execute before gtm.js, or tags fire before consent is known and the
 * whole exercise is decorative. It is a bare inline <script> rendered directly
 * above <GoogleTagManagerHead /> rather than next/script with
 * strategy="beforeInteractive": an inline script in <head> runs at parse time,
 * in document order, with no framework scheduling in between. beforeInteractive
 * is hoisted by Next and its position relative to another raw inline script is
 * not something we would want to depend on for a legal control.
 *
 * The stored choice is read from document.cookie synchronously so a returning
 * visitor is neither shown the banner again nor loses the first page of
 * measurement while a client component decides what to do.
 */
import { CONSENT_REGIONS, CONSENT_COOKIE } from "@/lib/consent";

const SCRIPT = `
(function(){
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  window.gtag=gtag;

  var stored='';
  try{
    var m=document.cookie.match(/(?:^|;\\s*)${CONSENT_COOKIE}=([^;]*)/);
    if(m){stored=decodeURIComponent(m[1]);}
  }catch(e){}

  function all(v){
    return {ad_storage:v,ad_user_data:v,ad_personalization:v,analytics_storage:v,wait_for_update:500};
  }

  if(stored==='granted'||stored==='denied'){
    /* An explicit choice already made by this visitor. It travels with them,
       so no region split: their answer applies wherever they are. */
    gtag('consent','default',all(stored));
  }else{
    /* No choice yet. Denied across the EEA, the UK and Switzerland; granted
       elsewhere. The region-less call must come second so it acts as the
       fallback rather than overriding the regional one. */
    var eea=all('denied');
    eea.region=${JSON.stringify(CONSENT_REGIONS)};
    gtag('consent','default',eea);
    gtag('consent','default',all('granted'));
  }

  /* Keep the Google click identifiers usable while consent is denied, without
     writing advertising cookies. */
  gtag('set','ads_data_redaction',true);
  gtag('set','url_passthrough',true);
})();
`;

export default function ConsentDefaults() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
