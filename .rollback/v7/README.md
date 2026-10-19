# RMC — Lumex-inspired Complete Site V8

Five-page, dependency-free HTML/CSS/JS website for Rheriene Mabamidje & Co.

## What's included
- `index.html` — the previously approved V7 homepage structure and content **preserved**. Only the header's CTA label/destination and additive V8 motion CSS/JS have changed.
- `about.html` — firm story (1991/1993), managing partner, working principles, professional credentials.
- `services.html` — all eight areas of service, enquiry links with contact form preselection.
- `contact.html` — actual contact details and a client-side **email preparation** form (mailto, not a backend send).

- `assets/css/home.css` — preserved V7 core layout/animations.
- `assets/css/v8.css` — additive liquid motion, header and left-side drawer changes, responsive layouts for the other pages.
- `assets/js/home.js` — preserved V7 homepage slider, AOS-style reveals, progress and menu.
- `assets/js/shared.js` — matching navigation, reveal, progress and form handling for internal pages.
- `assets/js/effects.js` — additive fluid word animation, layered image drift, slow ambient blobs, individual pointer-reactive highlights, and left-side drawer choreography.
- `assets/img` — local images, including company visuals and logos.

## Visual/motion upgrades
- Staff Login replaces Let's Talk in the header.
- Header is slightly taller and type is larger, responsively.
- Left-side off-canvas menu has a backdrop blur, elastic slide-in, background atmosphere, and staggered link entries.
- Original V7 page content, section order and effects remain. Additional animation is layered on, not rebuilt.
- Headings, selected body paragraphs, section icons, floating fragments, photos and card highlights animate independently.
- Reduced-motion preference disables decorative ambient motion; content remains visible.
- At small screens, parallax is reduced for comfortable scrolling.

## Setup
Extract ZIP. Open `index.html` locally or upload the site folder to any static-capable web server. Preserve file paths.



**Note about contact form:** It prepares a message using `mailto:`. The message is only sent if the visitor sends it from their email app; you would need a PHP or service endpoint for direct server-side email delivery.

## QA
Checked page render and JS at widths 320, 390, 768, 1366 and 1920 where applicable. No horizontal overflow observed; verified left-side menu opening on mobile and prefers-reduced-motion behavior. No server-side login or form submission backend is included.


## V9 targeted corrections

- The mobile offcanvas is anchored to the **left**, with left-to-right link entrance and the existing backdrop/scroll locking intact on every page.
- **Important:** This is a static HTML/CSS/JS website. The login form does **not** collect or transmit credentials, store passwords, or pretend to authenticate. Connect it to your own secure server-side authentication service (using HTTPS, session/cookie controls, CSRF protection, rate limiting, etc.) before production. The form displays a clear not-connected message on submit.
- The previously approved homepage design and motion effects were otherwise left untouched.
