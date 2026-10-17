# Rheriene Mabamidje & Co. — Website (v8)

A static website for **Rheriene Mabamidje & Co. (Chartered Accountants)**, Warri, Delta State, Nigeria — built as a port of the **Bizen** business-consulting template (theme-village.com/bizen) restyled to the firm's brand.

## Pages

| File | Bizen base | Purpose |
| --- | --- | --- |
| `index.html` | `index-3.html` | Home: hero slider, values, firm intro, services overview, stats, sectors, CTA |
| `about.html` | `about.html` | Firm story (1993), values, approach, strengths, managing partner |
| `services.html` | `services.html` | The seven core services as cards |
| `contact.html` | `contact.html` | Contact cards (address, phone, hours), enquiry form, embedded map |
| `login.html` | `login.html` | Client login form (demonstration only, no authentication) |

All five pages share one header/nav, canvas menu, search overlay, footer and script set.

## Stack

- **Bootstrap 5**, **jQuery 3.7**, **Swiper**, **GSAP + ScrollTrigger**, **jarallax**, **Fancybox**, **nice-select**, **Isotope**, **WOW.js** and **Lenis** — all vendored under `css/` and `js/`. No build step, no CDN at runtime.
- **Font Awesome** (free) via `css/all.min.css`, with the webfonts in `webfonts/`.
- Fonts: **DM Sans** + **Sora** loaded from Google Fonts (the template's own pairing).
- Icons on the services cards are inline SVG carried over from the template.

## Brand

- Source of truth for colour is the logo: blue `#3576a2` and grey `#999999` on white.
- `css/rmc.css` is loaded **after** `css/style.css` and maps the Bizen palette to RMC:
  - primary `#3576a2` (hover `#2a5d82`), secondary/headings `#0e2a47`, light `#f4f7fa`, body `#5b6673`.
  - Overrides Bizen's hard-coded `.btn-primary`, `.btn-secondary`, `.bg-primary`, `.bg-secondary`, `.text-primary` in addition to the `:root` custom properties.
  - Constrains logo height in the navbar, canvas menu and off-canvas header.
- Logos: dark surfaces (transparent header, footer) use the white mark `images/rmc-logo.png`; light surfaces (canvas/off-canvas menu) use `images/brand-logo.png`.
- `images/favicon.png` and `images/favicon.ico` (generated from the RMC badge) are both the firm badge.

## Structure

```
v8/
  index.html  about.html  services.html  contact.html  login.html
  css/            (Bizen stylesheets + rmc.css)
  js/             (Bizen scripts)
  webfonts/       (Font Awesome webfonts)
  images/         (template imagery, RMC logos, favicons)
  assets/
    img/          (RMC image library used by the pages)
  .review/        (QA screenshots + report.json)
```

The pages reference the Bizen stack as `css/*`, `js/*`, `images/*`, and RMC imagery as `assets/img/*`.

## Content

- Seven services (Audit & Assurance; Design & Implementation of Accounting Systems; Design of Management Information System; Tax Consultancy Services; Inventory & Stock Management; Streamlining of Accounting Systems; Ascertainment & Recovery of Excess Bank Charges).
- Firm facts: incorporated 20 October 1993; ICAN member firm; registered with the Office of the Auditor-General of the Federation and FIRS; Managing Partner G. R. Mabamidje (MBA, FCA, FCTI, AMNIM).
- Contact: Block 3 (Upper Floor), Edewor Shopping Centre, #54 Effurun/Sapele Road, Warri, Delta State; +234 803 318 1681; info@mabamidje.com; Mon–Fri 9:00–17:00 (GMT+1).
- The About page's "Leadership" section shows only the Managing Partner (no invented staff).

## Build tooling

The pages are generated from the Bizen reference templates in `../tools/_bizen_ref/` by the scripts in `../tools/`:

| Script | Produces |
| --- | --- |
| `tools/_build_v8.cjs` | `index.html` |
| `tools/_build_v8_about.cjs` | `about.html` |
| `tools/_build_v8_services.cjs` | `services.html` |
| `tools/_build_v8_contact.cjs` | `contact.html` |
| `tools/_build_v8_login.cjs` | `login.html` |
| `tools/_favicon.cjs` | `images/favicon.ico` (PNG-in-ICO from the badge) |

Each build script rewrites the template's head, logos, canvas menu, nav, page sections and footer with RMC content, and reports any replacement that did not match. Run from the repo root:

```
node tools\_build_v8.cjs
node tools\_build_v8_about.cjs
node tools\_build_v8_services.cjs
node tools\_build_v8_contact.cjs
node tools\_build_v8_login.cjs
```

## Verification

From `C:\laragon\www\netgrity\app\rmc`:

```
node tools\check.cjs v8
```

Renders all five pages at 1440 / 768 / 390 / 320, checks for broken images, horizontal overflow and JS page errors, and writes screenshots to `v8/.review/`. Required result: `ERRORS: none`, zero broken images, and `scrollWidth == viewport width` on every page. The only reported `WARN` is the off-screen canvas menu (`.canvas-menu`), which is hidden behind the burger toggle by design.

`tools/_verify_v8_about.cjs`, `_verify_v8_services.cjs`, `_verify_v8_contact.cjs` and `_verify_v8_login.cjs` do DOM-level checks of the rendered copy, logos and images for their respective pages.

## Notes and limitations

- The **contact form** posts to `mailer.php`, which does not exist in this static build — it needs a form handler (PHP script or a service such as Formspree) to actually send.
- The **login form** is `action="#"` and performs no authentication; it is a front-end demonstration only.
- The **map** on `contact.html` is a Google Maps embed ("Effurun/Sapele Road, Warri") and therefore needs a network connection.
- The Bizen template's stock imagery remains in `images/` for decorative backgrounds; page photography uses the RMC library in `assets/img/`.
