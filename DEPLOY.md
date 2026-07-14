# Deploying to Hostinger (shared hosting / hPanel)

Your site is a **static export** — plain HTML/CSS/JS with no Node server needed.
You just upload the files to `public_html`.

## Build (whenever you change the site)

```bash
cd next-app
npm install          # first time only
npm run build        # produces the ./out folder + ./adhiroha-site.zip is made manually
```

The finished website is the **`out/`** folder. A ready-to-upload
**`adhiroha-site.zip`** (the contents of `out/`) is also in this folder.

To rebuild the zip after a new `npm run build`:

```bash
cd out && zip -r -X ../adhiroha-site.zip . -x '.DS_Store' && cd ..
```

## Upload — easiest way (hPanel File Manager)

1. Log in to **hPanel** → **Files → File Manager**.
2. Open **`public_html`**.
3. If there are old files there you don't need (e.g. a default `index.html`),
   delete them first.
4. Click **Upload** (top-right) and upload **`adhiroha-site.zip`**.
5. Right-click the uploaded zip → **Extract** → extract **into `public_html`**
   (so the files land directly in `public_html`, not in a sub-folder).
6. Delete the zip afterwards.
7. Visit your domain — done.

> Make sure `index.html` ends up directly at `public_html/index.html`, and the
> `.htaccess`, `img/`, `_next/`, `about-us/`, etc. are all directly inside
> `public_html`.

## Upload — alternative (FTP)

Use FileZilla with the FTP credentials from hPanel (**Files → FTP Accounts**):

- Host: your server / `ftp.yourdomain.com`
- Upload **everything inside `out/`** into `public_html`.
- Important: enable "show hidden files" in FileZilla so the **`.htaccess`**
  file is uploaded too (Server → *Force showing hidden files*).

## What the `.htaccess` does

- 301-redirects the old `*.html` URLs (e.g. `/about-us.html`) to the new clean
  URLs (`/about-us/`) so old links / search results keep working.
- Sets a long cache on static assets for speed.
- Serves the custom `404.html`.

## After it's live

- Update the domain in `app/sitemap.js`, `app/robots.js`, and `app/layout.jsx`
  (`metadataBase`) if it's not `https://www.adhiroha.com`, then rebuild.
- Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.

## Notes

- HTTPS: enable the free SSL in hPanel (**Security → SSL**) if not already on.
- This is a static site, so there is **no** contact-form backend. The contact
  form posts to `#` (same as the original). If you need it to actually send
  email, that requires a form handler (e.g. Hostinger's PHP mail, Formspree, or
  a small API) — ask and I can wire one up.
