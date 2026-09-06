# SCM SSOT — Local Copy

This is the "Supply Chain Management" Power Pages web page (Home page)
extracted from the exported site files and re-packaged as a plain
static site, so it can run outside of Power Pages / Dataverse.

Source of the original files:
`OneDrive_2026-08-25/SSOT shared with dev team/Last backup 19 aug/Supply Chain Single Source Of Truth/`

## What's here

- `index.html` — the page shell (`<head>` + the exact body markup exported from the `Home` webpage).
- `assets/css/` — `bootstrap.min.css`, `theme.css`, `portalbasictheme.css` (site-wide theme files) and `app.css` (the page's own custom CSS).
- `assets/js/app.js` — the page's custom JS (includes a bundled Chart.js — no CDN needed).
- `assets/img/` — logo/images from the site's web files.
- `avl.json`, `scm-overview.json`, `scm-masterdata.json`, `sec-sole-source.json`, `sec-avl-details.json`, `cost-structure.json` — the data files the page fetches. **These must stay at the project root** (same folder as `index.html`) — the JS fetches them by bare filename (e.g. `fetch('avl.json')`), so they resolve relative to wherever `index.html` is served from.
- `assets/js/dronahq-sso.js` — optional SSO hook, see below.

## Running it locally

Browsers block `fetch()` of local files when you just double-click
`index.html` (the `file://` origin has no CORS), so it needs to be
served over `http://`, not opened directly.

**Easiest:** double-click `start.bat`, then open `http://localhost:8080` in a browser.

Or manually, from this folder:

```
py -m http.server 8080
```

Then visit `http://localhost:8080`.

Any static server works the same way (`npx serve`, IIS, nginx, Apache, etc.) — just make sure the whole folder (including the root-level `.json` files) is served as-is.

## Deploying to a server

Copy this entire folder to the web root of any static host (IIS, nginx,
Apache, Netlify, S3+CloudFront, etc.). No build step, no server-side
code, no dependencies to install.

## SSO (DronaHQ container only)

`assets/js/dronahq-sso.js` implements the DronaHQ plugin-app SSO pattern:
if this page is ever embedded inside the DronaHQ container (i.e. deployed
through DronaHQ's own pipeline — uploaded to its S3/CloudFront storage and
registered as a plugin app, the same way the "Tender Workflow" app is
deployed per the internal UAT Deployment Guide), the container injects
`window.DronaHQ` and this script picks up the already-logged-in user via
`window.DronaHQ.user.getProfile()` — no separate login screen needed. The
profile ends up on `window.SCM_USER` and a `scm:sso-ready` DOM event fires
with it, for any future feature that wants to use it (e.g. showing who's
signed in).

**This only activates inside DronaHQ.** On any normal deployment (IIS,
nginx, Apache, Netlify, S3+CloudFront on its own) `window.DronaHQ` never
exists, so this script waits up to 5 seconds, logs one line to the
console, and does nothing else — it never blocks or breaks the rest of
the app. This app has no backend and doesn't use Docker/nginx/Entra ID —
those parts of the deployment guide belong to the unrelated "Tender
Workflow" app.

## Known differences vs. the live Power Pages site

The page was built to talk to Dataverse via the Web API (`/_api/...`)
and gracefully fall back when that's unavailable — which is exactly
what happens here, since there's no Dataverse behind this static copy:

- **Overview, AGC Approved Vendor List, SEC AVL Sole Source, Master Data, Cost Structure** — all render with **real data**, read from the bundled `.json` files (confirmed working: charts, KPIs, maps, filters).
- **Daily LME Alert** tab — the developer intentionally removed the built-in sample dataset for this tab (`window.LME_SAMPLE = null`, "served from Dataverse"). Without a live Dataverse connection it will show "no dates available" / a data-refreshing placeholder instead of prices. This is expected and matches how the page behaves whenever Dataverse is unreachable — it is **not** a bug in this copy.
- **SCM KPIs, Monthly Intelligence, SEC Approved Vendor List (Power BI)** and the **Power Transformers fact pack (SharePoint)** are embedded iframes to external Microsoft services — they'll load the same as on the live site, provided the browser is signed in with access, regardless of where this HTML is hosted.
- The heading/KPI font falls back to Segoe UI/Georgia unless the "Seaford" font is installed on the machine viewing the page — same as the original (the font was never web-embedded, only referenced by name).

Verified locally: served with `py -m http.server`, loaded in headless Chrome — Overview and AGC Approved Vendor List pages render pixel-correct with live JSON data and no console errors (one expected 404 to the Dataverse Web API before it falls back to `avl.json`).
