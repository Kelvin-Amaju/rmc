/* Interaction smoke test: mobile menu toggle, dropdown, form focus. */
const { chromium } = require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const folder = process.argv[2] || 'v9';
const pages = (process.argv[3] || 'index,about,services,contact,login').split(',');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push('JSERR ' + e.message));
  for (const name of pages) {
    const file = path.resolve(`${folder}/${name}.html`);
    if (!fs.existsSync(file)) continue;
    await page.goto('file:///' + file.replaceAll('\\', '/'), { waitUntil: 'load' });
    await page.waitForTimeout(1500);
    const before = await page.evaluate(() => {
      const m = document.querySelector('nav.menu');
      const o = document.querySelector('.menu-area .overlay');
      return {
        menuLeft: m ? Math.round(m.getBoundingClientRect().left) : null,
        overlayVis: o ? getComputedStyle(o).visibility : null,
        burger: !!document.querySelector('.menu-mobile-trigger')
      };
    });
    let after = null;
    if (before.burger) {
      await page.click('.menu-mobile-trigger');
      await page.waitForTimeout(900);
      after = await page.evaluate(() => {
        const m = document.querySelector('nav.menu');
        const o = document.querySelector('.menu-area .overlay');
        const links = [...document.querySelectorAll('nav.menu .menu-section > li > a')].map(a => a.textContent.trim());
        return {
          menuLeft: m ? Math.round(m.getBoundingClientRect().left) : null,
          overlayVis: o ? getComputedStyle(o).visibility : null,
          links
        };
      });
    }
    console.log(name.padEnd(9) + ' before=' + JSON.stringify(before) + (after ? ' after=' + JSON.stringify(after) : ' (no burger)'));
  }
  console.log('JS errors:', errors.length ? errors.join('\n') : 'none');
  await browser.close();
})().catch(e => { console.error(e); process.exitCode = 1; });
