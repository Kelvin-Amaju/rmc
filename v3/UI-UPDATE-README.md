# RMC Website – Responsive UI Refresh

## What changed

This version redesigns **all five existing pages**: Home, About Us, Scope of Service, Contact Us and Staff Login. All original page content, URLs, form fields and site interactions were retained.

- A professional navy, white and royal-blue design system with clearer spacing, typography, cards, buttons and image treatments.
- Fluid viewport-based typography, not one fixed desktop font size. For example, the home hero headline renders around **72px at 1366px wide** and **101px at 1920px wide**, with separately optimized mobile sizes.
- Desktop navigation, mobile off-canvas menu, responsive service grids, contact forms, footer and login page refined for phones, tablets, laptops, widescreen monitors and foldable screen sizes.
- Interactive states: subtle header treatment on scroll, active nav marker, scroll progress indicator, enhanced hover effects and reveal-on-scroll transitions. The existing GSAP, WOW and three-image homepage carousel are retained.
- Respects `prefers-reduced-motion` and keyboard focus. Essential text and images stay visible when motion is reduced or JavaScript is unavailable.
- If the website cannot reach externally hosted Pexels images, local images are substituted instead of rendering broken-image icons. All imagery needed for fallback is already inside `assets/img`.

## Files changed / added

- Added `assets/css/rmc-modern.css` – sitewide design refresh. Loaded after `custom.css` (and after `login.css` on login).
- Added `assets/js/rmc-motion.js` – progressively enhanced UI animations and behaviors.
- Updated the five `.html` files to load the new CSS and JS.
- Small accessibility adjustment to `assets/js/function.js` so the original SplitText, reveal and parallax animation paths respect reduced motion.
- Removed the old `.rollback` directory from the deliverable. No backend implementation or third-party libraries were replaced.

## Running

Open `index.html` in a browser, or serve the folder locally (recommended):

```bash
cd v2
python -m http.server 8000
```

Then visit `http://localhost:8000`. For web deployment, upload the entire contents of `v2` while retaining the `assets` directory structure. Google Fonts and the original optional Pexels image URLs require an internet connection.

**Important:** The Contact form continues to prepare a `mailto:` email draft. The Staff Login continues to submit to the configured external webmail endpoint; no new authentication backend is included.

## Responsive testing

Checked the page layouts and asset paths at widths of 390, 768, 1366 and 1920 px, including the 1920×1080 target. Additional smaller widths have CSS breakpoints at 360px and below. The mobile menu opens beneath the header. No horizontal overflow was observed in the checked views.

### Design tokens

Edit the `:root` variables near the top of `assets/css/rmc-modern.css` for color, spacing and base responsive type scale. The original theme remains underneath for rollback or further customization.
