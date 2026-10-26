/* Reports horizontal overflow per page/width (scrollWidth vs viewport). */
const { chromium } = require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const folder = process.argv[2] || 'v9';
const widths = (process.argv[3] || '1440,768,390,320').split(',').map(Number);
const pages = (process.argv[4] || 'index,about,services,contact,login').split(',');
const wait = parseInt(process.argv[5] || '1200', 10);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  let bad = 0;
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 });
    for (const name of pages) {
      const file = path.resolve(`${folder}/${name}.html`);
      if (!fs.existsSync(file)) continue;
      await page.goto('file:///' + file.replaceAll('\\', '/'), { waitUntil: 'load' });
      await page.waitForTimeout(wait);
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      const ok = sw <= width + 1;
      if (!ok) bad++;
      console.log((ok ? 'OK  ' : 'OVER') + ' ' + name.padEnd(9) + ' @' + String(width).padEnd(5) + ' scrollWidth=' + sw);
    }
  }
  await browser.close();
  if (bad) process.exitCode = 1;
})().catch(e => { console.error(e); process.exitCode = 1; });
