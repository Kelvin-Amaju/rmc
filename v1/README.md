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

Typography uses the soft, rounded Poppins (headings) and Nunito (body) families from Google Fonts. The homepage hero also uses two royalty-free business photographs sourced from Pexels (`assets/img/hero-meeting.jpg`, `assets/img/hero-charts.jpg`).

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

## Inner-page hero photo credits

High-resolution Pexels photos are stored locally as optimized 1920px-wide JPEGs:

- About: Edmond Dantes — https://www.pexels.com/photo/people-having-a-meeting-at-the-office-4344116/
- Services: Vlada Karpovich — https://www.pexels.com/photo/business-partners-having-a-meeting-at-the-office-7433874/
- Contact: Vlada Karpovich — https://www.pexels.com/photo/business-partners-having-a-meeting-at-the-office-7433859/
