# Rheriene Mabamidje & Co. — Website Redesign

Four responsive static HTML pages built with Bootstrap 5.3.6, custom CSS, and vanilla JavaScript.

## Pages

- `index.html` — Home
- `about.html` — About Us
- `services.html` — Scope of Service
- `contact.html` — Contact Us
- `login.html` — Staff Login (mail portal)

## Open locally

Open `index.html` in a browser, or use a local static server such as VS Code Live Server. All Bootstrap, images, CSS and JavaScript are bundled locally; only the optional Google Fonts and Google Maps embed use remote services.

## Navigation

The four website links navigate between local HTML pages. **Staff Login** (previously "Mail Login"), positioned at the far right on desktop, opens the local `login.html` page. The staff login form validates locally and submits the credentials to the firm's live webmail host:

`https://server354.web-hosting.com:2096`

## Content and assets

The pages use existing company wording from mabamidje.com and the originally supplied company logo and photographs. The contact page shows the full location found on the existing site. No placeholder client logos, testimonials, additional biographies, invented statistics or inactive contact form have been introduced.

Typography uses the soft, rounded Poppins (headings) and Nunito (body) families from Google Fonts. The homepage slideshow and inner-page banners use locally stored Pexels business photographs. The firm's supplied photographs and logo are retained.

## File structure

```
index.html
about.html
services.html
contact.html
login.html
assets/
  css/style.css
  js/main.js
  vendor/bootstrap.min.css
  vendor/bootstrap.bundle.min.js
  img/brand-logo.png
  img/team-portrait.webp
  img/full-team.webp
  img/team-meeting.webp
  img/reception.webp
  img/managing-partner.webp
  img/hero-meeting.jpg
  img/hero-charts.jpg
```

## Deployment

Upload the page files and `assets/` directory together to any static hosting or PHP-compatible web server. To use PHP filenames, rename `index.html` to `index.php`, `about.html` to `about.php`, etc., then update local navigation links accordingly. Mail Login remains external.

## Stock photo credits

Replacement Pexels photos downloaded on 13 October 2026 are stored locally as compressed 1920px-wide JPEGs:

- Homepage meeting (`hero-meeting.jpg`): Yan Krukau — https://www.pexels.com/photo/people-working-at-an-office-7693746/
- Homepage overhead review (`hero-office.jpg`): Yan Krukau — https://www.pexels.com/photo/people-working-together-by-table-at-office-7691724/
- Homepage chart presentation (`hero-charts.jpg`): Gustavo Fring — https://www.pexels.com/photo/businessman-discussing-a-chart-at-a-business-meeting-6285130/
- Spare team image (`hero-team.jpg`, currently unused): Pavel Danilyuk — https://www.pexels.com/photo/people-having-a-business-meeting-6340631/
- About (`about-hero.jpg`): Alena Darmel — https://www.pexels.com/photo/a-group-of-people-having-a-meeting-in-the-office-7710140/
- Services and contact CTA banners (`services-hero.jpg`): Yan Krukau — https://www.pexels.com/photo/colleagues-working-in-desk-full-of-documents-7693252/
- Contact (`contact-hero.jpg`): Mikhail Nilov — https://www.pexels.com/photo/people-having-a-business-meeting-in-the-office-7988219/

Previous stock images are saved in `.rollback/2026-10-13-stock-photos/originals/`. To revert this photo update, copy those seven images into `assets/img/` and restore the README from `.rollback/2026-10-13-stock-photos/README.md`.
