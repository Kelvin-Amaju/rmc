# Rheriene Mabamidje & Co. — Website (v9)

A static website for **Rheriene Mabamidje & Co. (Chartered Accountants)**, Warri, Delta State, Nigeria — built as a port of the **Exrox** business-consulting template (templates.envytheme.com/exrox) restyled to the firm's brand.

## Pages

| File | Exrox base | Purpose |
| --- | --- | --- |
| `index.html` | `index.html` | Home: hero slider, promotional timeline, firm intro, seven services, engagement model, commitments, registrations |
| `about.html` | `about-us.html` | Firm story (1993), professional registrations, managing partner, mission / vision / values |
| `teams.html` | `about-us.html` | Team overview: leadership, practice disciplines, working values and contact prompt |
| `services.html` | `services.html` | The seven core services as cards plus the four-stage "How We Work" model |
| `contact.html` | `contact.html` | Contact details, office hours, service enquiry form, embedded map |
| `login.html` | `contact.html` | Staff login panel (front-end demonstration only, no authentication) |

The five content pages (`index`, `about`, `teams`, `services`, `contact`) share one header/nav, off-canvas menu, footer and script set. The Exrox template ships no login page, so `login.html` is composed from the `contact.html` shell with its own panel and no shared navigation.

## Stack

- **Bootstrap 5**, **jQuery**, **Swiper**, **GSAP + ScrollSmoother/ScrollTrigger**, **SplitText**, **Fancybox**, **WOW.js** and **Remix Icon** — all vendored under `assets/css/` and `assets/js/`. No build step, no CDN at runtime.
- Fonts: **DM Sans** + **Rethink Sans** (the template's pairing), self-hosted in `assets/fonts/` with `assets/css/fonts.css`; the template's Google Fonts `@import` was replaced with the local stylesheet.
- The template's **search** widget was removed (no backend to query) and the **Cloudflare email-protection** markup was replaced with a plain `mailto:` link.

## Brand

- Source of truth for colour is the logo: blue `#3576a2` and grey `#999999` on white.
- `assets/css/rmc.css` is loaded **after** `style.css`, `footer.css`, `responsive.css` and `dark-theme.css`, and maps the Exrox palette to RMC:
  - primary `#3576a2`, secondary/headings `#0e2a47`, light accent `#a8cfe9`, body text `#5b6673`, muted `#94a3ad`, light surface `#f4f7fa`.
  - Overrides the template's hard-coded `.bg_primary`, `.bg_secondary`, `.text_secondary` and button colours in addition to the `:root` custom properties.
  - Constrains logo height in the navbar, footer and login panel.
- Logos: the wide white mark `assets/img/rmc/rmc-logo.png` is used on dark surfaces (navbar, footer, login panel); the colour mark `assets/img/rmc/brand-logo.png` is used on light surfaces.
- `assets/img/rmc/favicon.png` is the firm badge.
- Template SVG icons were recoloured to the RMC palette by `tools/_v9_recolor.cjs` (`#91D089` → `#3576a2`, `#B9F8B1` → `#A8CFE9`, `#393737` → `#0E2A47`).

## Structure

```
v9/
  index.html  about.html  teams.html  services.html  contact.html  login.html
  assets/
    css/          (Exrox stylesheets + fonts.css + rmc.css)
    js/           (Exrox scripts)
    fonts/        (self-hosted DM Sans / Rethink Sans woff2)
    img/          (template imagery + RMC library in img/rmc/)
  .review/        (QA screenshots + report.json)
```

## Content

- Seven services (Audit & Assurance; Design & Implementation of Accounting Systems; Design of Management Information System; Tax Consultancy Services; Inventory & Stock Management; Streamlining of Accounting Systems; Ascertainment & Recovery of Excess Bank Charges).
- Firm facts: incorporated 20 October 1993; ICAN member firm; registered with the Office of the Auditor-General of the Federation and FIRS; Managing Partner G. R. Mabamidje (MBA, FCA, FCTI, AMNIM).
- Contact: Block 3 (Upper Floor), Edewor Shopping Centre, #54 Effurun/Sapele Road, Warri, Delta State; +234 803 318 1681; info@mabamidje.com; Mon–Fri 9:00–17:00 (GMT+1).
- The About page's "Leadership" section shows only the Managing Partner (no invented staff), and no statistics, testimonials or client logos were invented. `teams.html` extends this with practice-discipline summaries rather than fictional team members.

## Build tooling

The pages are generated from the Exrox reference templates in `../tools/_exrox_ref/` by the scripts in `../tools/`:

| Script | Produces |
| --- | --- |
| `tools/_build_v9.cjs` | `index.html` |
| `tools/_build_v9_about.cjs` | `about.html` |
| `tools/_build_v9_services.cjs` | `services.html` |
| `tools/_build_v9_contact.cjs` | `contact.html` |
| `tools/_build_v9_login.cjs` | `login.html` |
| `tools/_v9_recolor.cjs` | Recolours the Exrox SVG icons to the RMC palette (run once) |
| `tools/_exrox.cjs` | Downloads the Exrox reference HTML and assets |

`teams.html` is composed from the `about.html` shell with its own main content; keep its header, footer and script includes in sync if the About page is rebuilt.

Each build script rewrites the template's head, logos, menu, nav, page sections and footer with RMC content, and reports any replacement that did not match. `tools/_v9_common.cjs` holds the shared RMC data, the seven-service list, the header/menu/footer blocks and the leftover checks. Run from the repo root:

```
node tools\_build_v9.cjs
node tools\_build_v9_about.cjs
node tools\_build_v9_services.cjs
node tools\_build_v9_contact.cjs
node tools\_build_v9_login.cjs
```

## Verification

From `C:\laragon\www\netgrity\app\rmc`:

```
node tools\_audit_v9.cjs
node tools\check.cjs v9 index,about,teams,services,contact,login
node tools\_overflow.cjs v9 1440,768,390,320 index,about,teams,services,contact,login
node tools\_audit_typography.cjs v9 1440,768,390,320 index,about,teams,services,contact
node tools\_audit_interactions.cjs v9 index,about,teams,services,contact
```

- `tools/_audit_v9.cjs` scans the built HTML for template leftovers (Cloudflare email obfuscation, "Exrox" strings, template social links), dead internal links and missing images. Required result: `CLEAN` for all six pages.
- `tools/check.cjs v9` renders every page at 1440 / 768 / 390 / 320, checks for broken images, horizontal overflow and JS page errors, and writes screenshots plus `v9/.review/report.json`. Required result: `ERRORS: none`, zero broken images, and `scrollWidth == viewport width` on every page.
- `tools/_overflow.cjs` is a focused horizontal-overflow probe used while tuning `assets/css/rmc.css`.
- `tools/_audit_typography.cjs` flags text that is clipped (`CUT`), overflowing its box (`OVERFLOW`) or unusually large (`BIG`) at each viewport. Required result: no `CUT` and no `OVERFLOW` lines.
- `tools/_audit_interactions.cjs` opens the mobile off-canvas menu on every page and reports console errors. Required result: the menu slides in (`left = 0`) with the overlay visible and `JS errors: none`.
- `tools/_inspect_tree.cjs <page.html> <selector> <width> <depth>` prints the box geometry of a subtree, which is how the header/footer arrangement was checked.

## Fixes applied to the template

- The Exrox template ships a sticky footer (`.footer-area.style-one { position: sticky; bottom: 0 }` at `min-width: 992px`) that floats over the page; `assets/css/rmc.css` overrides it to `position: static` so it sits at the end of the document.
- The template hard-codes the achievement-list columns to `calc(100% - 52px)` / `50px`, which clipped "Member Firm" and "Registered" on narrow screens; `assets/css/rmc.css` re-flows them with flexbox.
- The split-text heading animations push letters past the viewport edge on 320px screens; `assets/css/rmc.css` clips the animated headings with `overflow-x: clip`.
- Decorative shapes and the oversized watermark are hidden or scaled down below 768px so they cannot push the layout sideways.

## Notes and limitations

- The **contact form** is front-end only — there is no handler, so it does not send anything.
- The **login form** performs no authentication; it is a demonstration panel.
- The **map** on `contact.html` is a Google Maps embed ("Effurun/Sapele Road, Warri") and therefore needs a network connection.
- The Exrox template's stock imagery remains in `assets/img/` for decorative backgrounds; page photography uses the RMC library in `assets/img/rmc/`.
