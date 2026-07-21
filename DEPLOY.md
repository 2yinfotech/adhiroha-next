# Deploying Adhiroha to Hostinger

> **This is a Node app, not a static site.** Earlier versions of this file said
> to upload the `out/` folder as a static export. That is no longer true and will
> break the site: payments, the contact form, the admission panel and the
> DB-driven blogs are all **API routes**, and a static export contains none of
> them. `next.config.mjs` deliberately does not set `output: "export"`.
>
> The site must run as a **Hostinger Node.js application** (`next build` then
> `next start`), with `public_html/.htaccess` reverse-proxying to it — see
> `hostinger-node.htaccess` in this folder.

---

## 1. Environment variables (this is what makes payments work)

`.env.local` is gitignored and **never leaves your machine**. The live server has
none of these until you set them there. If they are missing:

- Razorpay / PayPal buttons do nothing, or report "payment isn't switched on"
- the contact form and admission emails silently fail
- blogs and batch dates cannot load

Set them in **hPanel → Advanced → Node.js app → Environment variables**, or as a
`.env.production` file in the app root on the server.

The full list, already filled in with the current values, is in
**`.env.production.example`** (gitignored — copy it across by hand, do not commit it).

### ⚠️ Two things that catch people out

**1. `NEXT_PUBLIC_*` variables are baked in at BUILD time, not read at runtime.**
`NEXT_PUBLIC_PAYPAL_CLIENT_ID`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` and
`NEXT_PUBLIC_HOTJAR_ID` are compiled into the browser bundle. Setting them and
restarting is **not enough** — you must set them and then run `npm run build`
again, in that order. This is the usual reason "the PayPal button is dead on
live but works locally".

**2. `ARTICLES_SOURCE` must NOT be set in production.**
`ARTICLES_SOURCE=sqlfile` makes the app read from the bundled SQL dump and turns
every database write into a no-op — registrations would appear to succeed and
save nothing. It exists only because local development cannot reach Hostinger's
MySQL. Leave it out entirely on the server.

Also use `DB_HOST=127.0.0.1`, not `localhost`: `localhost` can resolve to IPv6
`::1`, which the database grant does not cover, giving
`Access denied for user ...@'::1'`.

---

## 2. Deploy

```bash
# on the server, in the app folder
npm install --omit=dev
npm run build        # env vars must already be set — see the NEXT_PUBLIC note above
npm run start        # or let PM2 / the Hostinger Node app manager run it
```

The Node app listens on **port 3000**. Then put `hostinger-node.htaccess` at
`public_html/.htaccess` (renamed to `.htaccess`) so every request is proxied to it.

After deploying, **clear the Hostinger cache** — it serves stale HTML otherwise
and you will think your changes did not ship.

---

## 3. Verify it actually works on live

Do not assume — check each one:

```bash
# batches load from the live DB (not the SQL dump)
curl -s https://www.adhiroha.com/api/admission/batches/?course=200%20Hour%20YTTC | head -c 200

# Razorpay order creation — should return an orderId, not an error
curl -s -X POST https://www.adhiroha.com/api/admission/order/ \
  -H 'Content-Type: application/json' \
  -d '{"course":"200 Hour YTTC","batchId":"125","sharing":"triple","numStudents":1,"gateway":"razorpay"}'
```

Then in a browser (hard-refresh first — `Cmd/Ctrl+Shift+R`):

- `/student-admission-panel/` — PayPal buttons must render, Razorpay must open its
  modal. **Stop there; the keys are live and completing a payment charges real money.**
- `/contact-us/` — send a test message, confirm it arrives.
- View source on any page — `application/ld+json` and `<meta name="description">`
  must be present.

---

## 4. SEO: canonical host (server-level)

Every canonical URL points at `https://www.adhiroha.com` (`metadataBase` in
`app/layout.jsx`, `SITE` in `lib/seo.js`). The server must 301-redirect the
non-www host to www, or Google splits ranking signals between the two.

Add to `public_html/.htaccess`, **before** the proxy rule:

    RewriteEngine On
    RewriteCond %{HTTP_HOST} ^adhiroha\.com [NC]
    RewriteRule ^(.*)$ https://www.adhiroha.com/$1 [L,R=301]

Then confirm `https://www.adhiroha.com` is the tracked property in Google Search
Console and resubmit `sitemap.xml`.

To use the bare domain instead, flip both: change `metadataBase` and `SITE` to
`https://adhiroha.com` and redirect www → non-www.

---

## 5. Old URLs

The `.htaccess` also 301-redirects the old `*.html` URLs (`/about-us.html` →
`/about-us/`) so existing links and search results keep working.

If the old `admission.adhiroha.com` subdomain is still live, point it at
`https://www.adhiroha.com/student-admission-panel/` — the whole site now links to
the new panel, and the old one would otherwise keep taking bookings into a
system nobody is watching.

---

## Notes

- Enable free SSL in hPanel (**Security → SSL**) if it is not already on.
- `SMTP_PASS` is a Gmail **app password** for info@adhiroha.com, not the account
  password.
- Admission notifications go to `ADMISSION_NOTIFY_TO` (2yinfotech@gmail.com);
  the contact form goes to `CONTACT_TO` (info@adhiroha.com).
