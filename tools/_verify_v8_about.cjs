const { chromium } = require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
   const browser = await chromium.launch({ channel: 'chrome', headless: true });
   const page = await browser.newPage();
   await page.route(/^https:\/\/fonts\./, (r) => r.abort());
   await page.goto('file:///C:/laragon/www/netgrity/app/rmc/v8/about.html', { waitUntil: 'load' });
   await page.waitForTimeout(1500);
   const out = await page.evaluate(() => {
      const txt = (sel) => {
         const el = document.querySelector(sel);
         return el ? el.textContent.replace(/\s+/g, ' ').trim() : 'MISSING';
      };
      const all = (sel) => [...document.querySelectorAll(sel)].map((e) => e.textContent.replace(/\s+/g, ' ').trim());
      const img = (sel) => {
         const el = document.querySelector(sel);
         return el ? { src: el.getAttribute('src'), complete: el.complete, w: el.naturalWidth } : 'MISSING';
      };
      const col = (sel) => {
         const el = document.querySelector(sel);
         return el ? getComputedStyle(el).color : 'MISSING';
      };
      return {
         title: document.title,
         nav: all('ul.navbar-nav .nav-link'),
         sections: document.querySelectorAll('section').length,
         promoH1: txt('.promo-sec h1'),
         introH2: txt('.about-intro-sec .sec-title'),
         statSub: txt('.about-stat-sec .sub-title'),
         stepSub: txt('.step-sec .sub-title'),
         stepH2: txt('.step-sec .sec-title'),
         powerSub: txt('.power-sec .sub-title'),
         powerH2: txt('.power-sec .sec-title'),
         teamSub: txt('.team-sec .sub-title'),
         teamH2: txt('.team-sec .sec-title'),
         accordionTitles: all('.power-sec .accordion-button'),
         counters: all('.power-stat .counter'),
         powerLabels: all('.power-stat p'),
         teamEntries: document.querySelectorAll('.team-entry').length,
         teamName: txt('.team-entry h3'),
         teamRole: txt('.team-entry span'),
         navLogo: img('.navbar-brand img'),
         canvasLogo: img('.canvas-menu .logo img'),
         footerLogo: img('.footer-default .footer-logo') || img('.footer-default img'),
         btnBorder: txt('.btn-border'),
         copyright: txt('.footer-default .text-info') || txt('.footer-default p'),
      };
   });
   console.log(JSON.stringify(out, null, 2));
   await browser.close();
})();
