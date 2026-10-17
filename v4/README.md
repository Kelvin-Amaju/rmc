# RMC Website — New Editorial Restyle (V3)

A ground-up visual rebuild of the Rheriene Mabamidje & Co. website. The former full-bleed dark-overlay hero, rounded card system and page composition have been replaced rather than reskinned.

## Pages

| File | New approach |
|---|---|
| `index.html` | Split editorial introduction, moving discipline ribbon, image-led About section, dark numbered service listing, sectors, professional registrations, FAQ, contact call-to-action |
| `about.html` | Split team photo hero, registration timeline, managing partner feature, values, registrations and FAQ |
| `services.html` | Terracotta editorial hero, eight accessible expandable service descriptions, additional services, registrations, FAQ |
| `contact.html` | New warm/white contact page, readable contact channels, composed-email contact form, location map |
| `login.html` | Standalone, new two-panel staff webmail sign-in, password visibility toggle; original cPanel sign-in action preserved |

## Design

- Warm off-white (`#f3f0e9`), deep forest (`#163c3d`), terracotta (`#c86b49`), muted gold (`#d8b98c`).
- Scales typography with `clamp()` and viewport-based units. A heading at 1920px is larger than at 1366px. Layouts adjust at 1200px, 980px, 700px and 370px.
- Organic typographic pairing: DM Sans + Instrument Serif (graceful local font fallback).
- Motion: scroll-based reveal, moving ticker, progress indicator, subtle image zoom, rotation detail, custom hover states and animated mobile menu.
- Honors operating-system reduced-motion preferences.
- Compressed local WebP photography and PNG RMC logo, no image CDN required.

## Functionality

- Navigation: Home, About Us, Scope of Service, Contact Us, Staff Portal.
- Mobile navigation toggles and closes with Escape; use keyboard focus as normal.
- Eight service areas expand and collapse. Homepage service links jump to and expand the relevant section.
- FAQ accordions use native accessible HTML `<details>` elements.
- Contact form prepares a `mailto:` email to `info@mabamidje.com`, as in the original. **It does not submit to or store data in a backend.** An installed/configured email application is required to send the draft.
- Staff Login POST remains directed to `https://server354.web-hosting.com:2096/login/?login_theme=cpanel` with `user` and `pass` input names. Login requires the external server to be available; no authentication logic is implemented in these static files.
- Contact map is the original Google Maps embed and requires internet access.
- Original public contact email, secondary email, phone number and Warri office address retained.

## Files

```
index.html
about.html
services.html
contact.html
login.html
assets/css/site.css
assets/js/site.js
assets/img/...
```

No `npm install`, bundling, or database is required. Upload the folder contents to a web host or open `index.html`. For local testing via HTTP, from this directory run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Responsive & interaction checks

Layout checked for overflow at 320, 360, 375, 390, 414, 430, 600, 701, 768, 800, 1024, 1280, 1366, 1440, 1600, 1920 and 2560 pixels. Tested mobile menu, service expansions, and password visibility toggle. No script errors were observed in the tested renderings. Google font availability, email-client handling, Google Maps loading and remote webmail authentication depend on external services and were not validated end-to-end.
