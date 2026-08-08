/**
 * Consent Mode v2: the region list, the stored-choice contract, and the banner
 * copy for all eleven locales.
 *
 * The site has no string-table i18n. Page copy lives as translated HTML inside
 * each locale's content.js, so there was no existing table to add these to. This
 * file follows the one precedent that does exist for per-locale data in code,
 * lib/i18n-routes.js, and keeps the same shape: one object keyed by locale.
 */

/* EEA + UK + Switzerland. Consent is denied by default for these, granted
   elsewhere, per the brief and Google's EU User Consent Policy. */
export const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "NL", "NO", "PL",
  "PT", "RO", "SK", "SI", "ES", "SE", "GB", "CH",
];

/* The four Consent Mode v2 signals this site sets. */
export const CONSENT_SIGNALS = [
  "ad_storage", "ad_user_data", "ad_personalization", "analytics_storage",
];

export const CONSENT_COOKIE = "adh_consent";
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 182; // six months, in seconds

/* Dispatched on window the moment the banner is answered, so scripts held back
   for consent can start without waiting for the next page load. */
export const CONSENT_EVENT = "adhiroha:consent";

/* Only three locales have a privacy policy page. The rest fall back to the
   English one, which is the honest option: linking to a page that does not
   exist would be worse than linking to one in the wrong language. Those eight
   pages still need writing, and that is flagged separately. */
const PRIVACY_URLS = {
  en: "/privacy-policy/",
  de: "/de/datenschutz/",
  fr: "/fr/politique-de-confidentialite/",
};

export const privacyUrlFor = (locale) => PRIVACY_URLS[locale] || PRIVACY_URLS.en;

/* Deliberately plain and short. "Reject" is worded and styled with the same
   weight as "Accept": consent that is harder to refuse than to give is not
   consent. */
export const CONSENT_STRINGS = {
  en: {
    body: "We use cookies to measure our advertising and improve the site. You can accept or reject this.",
    accept: "Accept", reject: "Reject",
    privacy: "Privacy policy", settings: "Cookie settings",
    label: "Cookie consent",
  },
  da: {
    body: "Vi bruger cookies til at måle vores annoncering og forbedre hjemmesiden. Du kan acceptere eller afvise det.",
    accept: "Acceptér", reject: "Afvis",
    privacy: "Privatlivspolitik", settings: "Cookieindstillinger",
    label: "Samtykke til cookies",
  },
  de: {
    body: "Wir verwenden Cookies, um unsere Werbung zu messen und die Website zu verbessern. Sie können dem zustimmen oder ablehnen.",
    accept: "Zustimmen", reject: "Ablehnen",
    privacy: "Datenschutz", settings: "Cookie-Einstellungen",
    label: "Cookie-Einwilligung",
  },
  es: {
    body: "Usamos cookies para medir nuestra publicidad y mejorar el sitio. Puedes aceptarlas o rechazarlas.",
    accept: "Aceptar", reject: "Rechazar",
    privacy: "Política de privacidad", settings: "Configuración de cookies",
    label: "Consentimiento de cookies",
  },
  fr: {
    body: "Nous utilisons des cookies pour mesurer notre publicité et améliorer le site. Vous pouvez les accepter ou les refuser.",
    accept: "Accepter", reject: "Refuser",
    privacy: "Politique de confidentialité", settings: "Paramètres des cookies",
    label: "Consentement aux cookies",
  },
  it: {
    body: "Usiamo i cookie per misurare la nostra pubblicità e migliorare il sito. Puoi accettarli o rifiutarli.",
    accept: "Accetta", reject: "Rifiuta",
    privacy: "Informativa sulla privacy", settings: "Impostazioni cookie",
    label: "Consenso ai cookie",
  },
  ja: {
    body: "当サイトでは、広告効果の測定とサイト改善のために Cookie を使用しています。同意するか拒否するかをお選びいただけます。",
    accept: "同意する", reject: "拒否する",
    privacy: "プライバシーポリシー", settings: "Cookie の設定",
    label: "Cookie の同意",
  },
  nl: {
    body: "We gebruiken cookies om onze advertenties te meten en de site te verbeteren. U kunt dit accepteren of weigeren.",
    accept: "Accepteren", reject: "Weigeren",
    privacy: "Privacybeleid", settings: "Cookie-instellingen",
    label: "Cookietoestemming",
  },
  pl: {
    body: "Używamy plików cookie, aby mierzyć skuteczność naszych reklam i ulepszać stronę. Możesz to zaakceptować lub odrzucić.",
    accept: "Akceptuję", reject: "Odrzucam",
    privacy: "Polityka prywatności", settings: "Ustawienia plików cookie",
    label: "Zgoda na pliki cookie",
  },
  pt: {
    body: "Usamos cookies para medir nossa publicidade e melhorar o site. Você pode aceitar ou recusar.",
    accept: "Aceitar", reject: "Recusar",
    privacy: "Política de privacidade", settings: "Configurações de cookies",
    label: "Consentimento de cookies",
  },
  sv: {
    body: "Vi använder cookies för att mäta vår annonsering och förbättra webbplatsen. Du kan acceptera eller avvisa detta.",
    accept: "Acceptera", reject: "Avvisa",
    privacy: "Integritetspolicy", settings: "Cookie-inställningar",
    label: "Samtycke till cookies",
  },
};

export const stringsFor = (locale) => CONSENT_STRINGS[locale] || CONSENT_STRINGS.en;
