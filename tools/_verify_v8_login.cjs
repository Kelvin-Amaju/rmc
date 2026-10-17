const { chromium } = require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
   const browser = await chromium.launch({ channel: 'chrome', headless: true });
   const page = await browser.newPage();
   await page.route(/^https:\/\/fonts\./, (r) => r.abort());
   await page.goto('file:///C:/laragon/www/netgrity/app/rmc/v8/login.html', { waitUntil: 'load' });
   await page.waitForTimeout(1200);
   const out = await page.evaluate(() => {
      const txt = (sel) => {
         const el = document.querySelector(sel);
         return el ? el.textContent.replace(/\s+/g, ' ').trim() : 'MISSING';
      };
      const all = (sel) => [...document.querySelectorAll(sel)].map((e) => e.textContent.replace(/\s+/g, ' ').trim());
      const broken = [...document.images].filter((e) => e.complete && e.naturalWidth === 0).map((e) => e.getAttribute('src'));
      return {
         title: document.title,
         nav: all('ul.navbar-nav .nav-link'),
         promoH1: txt('.promo-sec h1'),
         h2: txt('.account-sec .sec-title'),
         p: txt('.account-sec .text-center p'),
         socialLoginBtns: all('.account-form .btn-primary, .account-form .btn-dark'),
         inputs: [...document.querySelectorAll('.account-form input')].map((e) => e.getAttribute('placeholder') || e.getAttribute('type')),
         submit: txt('.account-form button.btn-primary'),
         registerText: txt('.login-message'),
         brokenImages: broken,
         hScrollOverflow: document.documentElement.scrollWidth > window.innerWidth,
      };
   });
   console.log(JSON.stringify(out, null, 2));
   await browser.close();
})();
