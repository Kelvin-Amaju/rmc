const { chromium } = require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
   const browser = await chromium.launch({ channel: 'chrome', headless: true });
   const page = await browser.newPage();
   await page.route(/^https:\/\/fonts\./, (r) => r.abort());
   await page.route(/google\.[a-z.]+\/maps/, (r) => r.abort());
   await page.goto('file:///C:/laragon/www/netgrity/app/rmc/v8/contact.html', { waitUntil: 'load' });
   await page.waitForTimeout(1500);
   const out = await page.evaluate(() => {
      const txt = (sel) => {
         const el = document.querySelector(sel);
         return el ? el.textContent.replace(/\s+/g, ' ').trim() : 'MISSING';
      };
      const all = (sel) => [...document.querySelectorAll(sel)].map((e) => e.textContent.replace(/\s+/g, ' ').trim());
      const allImgs = [...document.images];
      const broken = allImgs.filter((e) => e.complete && e.naturalWidth === 0).map((e) => e.getAttribute('src'));
      return {
         title: document.title,
         nav: all('ul.navbar-nav .nav-link'),
         promoH1: txt('.promo-sec h1'),
         mapSrc: (document.querySelector('iframe.google-map') || {}).src || 'MISSING',
         cards: all('.contact-card .ct-inner'),
         formH2: txt('.contact-form2 .sec-title'),
         formP: txt('.contact-form2 .sec-header p'),
         selectOptions: all('#service option'),
         mediaImg: (document.querySelector('.contact-media img') || {}).getAttribute('src'),
         footerContact: all('.footer-default .contact-widget li'),
         footerQuick: all('.footer-default .quick-links li'),
         brokenImages: broken,
         hScrollOverflow: document.documentElement.scrollWidth > window.innerWidth,
      };
   });
   console.log(JSON.stringify(out, null, 2));
   await browser.close();
})();
