const { chromium } = require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
   const browser = await chromium.launch({ channel: 'chrome', headless: true });
   const page = await browser.newPage();
   await page.route(/^https:\/\/fonts\./, (r) => r.abort());
   await page.goto('file:///C:/laragon/www/netgrity/app/rmc/v8/services.html', { waitUntil: 'load' });
   await page.waitForTimeout(1500);
   const out = await page.evaluate(() => {
      const txt = (sel) => {
         const el = document.querySelector(sel);
         return el ? el.textContent.replace(/\s+/g, ' ').trim() : 'MISSING';
      };
      const all = (sel) => [...document.querySelectorAll(sel)].map((e) => e.textContent.replace(/\s+/g, ' ').trim());
      const imgs = [...document.querySelectorAll('.service-entry2 .serv-thumb img')].map((e) => ({ src: e.getAttribute('src'), w: e.naturalWidth }));
      const allImgs = [...document.images];
      const broken = allImgs.filter((e) => e.complete && e.naturalWidth === 0).map((e) => e.getAttribute('src'));
      return {
         title: document.title,
         nav: all('ul.navbar-nav .nav-link'),
         promoH1: txt('.promo-sec h1'),
         secSub: txt('.services-sec .sub-title'),
         secTitle: txt('.services-sec .sec-title'),
         cardCount: document.querySelectorAll('.service-entry2').length,
         cardTitles: all('.service-entry2 h3'),
         cardThumbs: imgs,
         icons: document.querySelectorAll('.service-entry2 svg').length,
         ctaH2: txt('.cta-sec .sec-title'),
         ctaBtn: txt('.cta-sec .btn'),
         footerContact: all('.footer-default .contact-widget li'),
         footerQuick: all('.footer-default .quick-links li'),
         navLogoW: (document.querySelector('.navbar-brand img') || {}).naturalWidth,
         brokenImages: broken,
         hScrollOverflow: document.documentElement.scrollWidth > window.innerWidth,
      };
   });
   console.log(JSON.stringify(out, null, 2));
   await browser.close();
})();
