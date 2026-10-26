const { chromium } = require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const only = process.argv[2] ? process.argv[2].split(',').map(Number) : null;
(async () => {
 const browser = await chromium.launch({ channel: 'chrome', headless: true });
 fs.mkdirSync('assets/img/previews', { recursive: true });
 try {
   for (let n = 1; n <= 9; n++) {
    if (only && !only.includes(n)) continue;

   const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
   await page.route(/^https?:/, route => route.abort());
   await page.goto('file:///' + path.resolve(`v${n}/index.html`).replaceAll('\\', '/'), { waitUntil: 'load' });
   await page.waitForTimeout(1800);
   await page.evaluate(() => {
    document.querySelectorAll('#preloader, .preloader, .page-loader, #loader').forEach(el => el.style.display = 'none');
    document.querySelectorAll('[data-reveal], .reveal, .wow').forEach(el => {
     el.style.opacity = '1'; el.style.visibility = 'visible'; el.style.transform = 'none';
    });
   });
   await page.screenshot({ path: `assets/img/previews/v${n}.jpg`, type: 'jpeg', quality: 85 });
   console.log(`Captured v${n}`);
   await page.close();
  }
 } finally { await browser.close(); }
})().catch(err => { console.error(err); process.exitCode = 1; });
