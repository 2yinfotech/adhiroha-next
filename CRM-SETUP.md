# Leads CRM — setup

Everything is built and tested. Three things have to happen on the server
before it works, and one of them is a decision only you can make.

## 1 · Create the two tables

Open phpMyAdmin, choose `u511577297_adhiroha`, and run `crm-schema.sql`.

It creates `crm_lead_state` and `crm_email_log` and **touches nothing else** —
your `leads` table and the existing PHP admin panel are untouched.

## 2 · Add four values to `.env` on the server

```
CRM_SESSION_SECRET=<a long random string, 32+ characters>
CRM_CRON_SECRET=<a different long random string>
IMAP_USER=info@adhiroha.com          # optional, defaults to SMTP_USER
IMAP_PASS=<the same Gmail app password as SMTP_PASS>   # optional, defaults to SMTP_PASS
```

Generate the two secrets with:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Without `CRM_SESSION_SECRET` nobody can sign in — that is deliberate, so the
panel cannot accidentally go live with a guessable session key.

## 3 · Add the cron job (Hostinger → Advanced → Cron Jobs)

Every 15 minutes:

```
curl -s "https://www.adhiroha.com/api/leads-panel/cron/?key=YOUR_CRM_CRON_SECRET" > /dev/null
```

This one job does all three automatic things, in this order:

1. reads the inbox and takes anyone who replied out of the sequence
2. enrols leads that arrived since the last run
3. sends whatever follow-up is now due

Nothing is automatic without it. There is also a **Run follow-ups now** button in
the panel, so you can always trigger it by hand.

## Using it

`https://www.adhiroha.com/leads-panel/` — sign in with your existing
admin.adhiroha.com username and password. It is noindex and kept out of
sitemap.xml.

## The sequence

| When | Email |
|---|---|
| immediately | Welcome, what the course is, links to the three course pages |
| day 2 | Fees, dates, certificate, fitness — the practical questions |
| day 5 | Student reviews and the photo gallery |
| day 10 | A short last nudge toward WhatsApp or a reply |
| day 14 | Sequence ends, lead marked `done` |

A reply at any point stops it immediately. So does **Stop** in the panel.

The wording lives in `lib/crm/templates.js` — plain English, easy to edit. If you
change it, keep the facts right: courses start on the 1st, fees from
€1275/€1500/€2700 triple-sharing, and Adhiroha is a *Registered Yoga School with
Yoga Alliance* at RYS 200/300/500 (never "affiliated", never "dual
certification").

## Two things worth knowing

**Passwords.** The `admin` table stores most passwords in plain text. This panel
cannot undo that, but it does upgrade each one to a scrypt hash the first time
that person signs in here. The old 2021 `Admin` account uses bcrypt and is
refused rather than guessed at — reset it if anyone still needs it.

**Reply matching** is on the sender address only. If a lead writes in from a
different address than the one they gave, the sequence keeps running — mark them
replied by hand in the panel.
