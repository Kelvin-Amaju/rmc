const { chromium } = require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
   const browser = await chromium.launch({ channel: 'chrome', headless: true });
   const page = await browser.newPage();
   await page.route(/^https:\/\/fonts\./, (r) => r.abort());
   await page.goto('file:///C:/laragon/www/netgrity/app/rmc/v8/index.html', { waitUntil: 'load' });
   await page.waitForTimeout(1500);
   const out = await page.evaluate(() => {
      const bg = (sel) => {
         const el = document.querySelector(sel);
         return el ? getComputedStyle(el).backgroundColor : 'MISSING';
      };
      const col = (sel) => {
         const el = document.querySelector(sel);
         return el ? getComputedStyle(el).color : 'MISSING';
      };
      const img = (sel) => {
         const el = document.querySelector(sel);
         return el ? { src: el.getAttribute('src'), complete: el.complete, w: el.naturalWidth } : 'MISSING';
      };
      return {
         title: document.title,
         bodyBg: bg('body'),
         btnPrimary: bg('.btn-primary'),
         bgPrimary: bg('.bg-primary'),
         headerTop: bg('.header-top'),
         textPrimary: col('.text-primary'),
         navLogo: img('.navbar-brand img'),
         canvasLogo: img('.canvas-menu .logo img'),
         primaryVar: getComputedStyle(document.documentElement).getPropertyValue('--primary').trim(),
         sections: document.querySelectorAll('section').length,
         sliderSlides: document.querySelectorAll('.hero-slider .swiper-slide').length,
         serviceSlides: document.querySelectorAll('.service-carousel3 .swiper-slide').length,
      };
   });
   console.log(JSON.stringify(out, null, 2));
   await browser.close();
})();
