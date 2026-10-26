const { chromium } = require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const folder = process.argv[2] || 'v8';
const pages = process.argv[3] ? process.argv[3].split(',') : ['index', 'about', 'services', 'contact', 'login'];

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const reports = [];
  fs.mkdirSync(`${folder}/.review`, { recursive: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('requestfailed', r => { if (!/fonts\.|maps\.|google-analytics|googletagmanager/.test(r.url())) errors.push('REQFAIL ' + r.url()); });
    await page.route(/^https:\/\/fonts\./, route => route.abort());
    await page.route(/^https:\/\/maps\./, route => route.abort());
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const name of pages) {
        const file = path.resolve(`${folder}/${name}.html`);
        if (!fs.existsSync(file)) { reports.push({ name, width, skipped: true }); continue; }
        await page.goto('file:///' + file.replaceAll('\\', '/'), { waitUntil: 'load' });
        await page.waitForTimeout(300);
        await page.evaluate(async () => {
          document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
          await Promise.all([...document.images].map(i => i.decode().catch(() => {})));
        });
        const report = await page.evaluate(() => {
          /* An element that sticks out is only a real problem when nothing
             between it and the root clips it. */
          const isClipped = (el) => {
            let p = el.parentElement;
            while (p && p !== document.documentElement) {
              if (/hidden|clip|auto|scroll/.test(getComputedStyle(p).overflowX)) return true;
              p = p.parentElement;
            }
            return false;
          };
          return {
            width: innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.getAttribute('src')),
            overflow: [...document.querySelectorAll('body *')].filter(e => {
              const r = e.getBoundingClientRect();
              const s = getComputedStyle(e);
              return s.position !== 'fixed' && r.width > 0 && r.right > innerWidth + 2 &&
                !isClipped(e) &&
                !e.closest('.owl-stage, .marquee, .marquee-two, .rmc_marquee_scroll, .swiper, [class*=carousel], [class*=slider], [class*=marquee], .hero-slides, [class*=offcanvas], [class*=Offcanvas]') &&
                !e.className.toString().match(/offcanvas/i);
            }).slice(0, 7).map(e => ({ cls: (e.className && e.className.toString && e.className.toString().slice(0, 60)) || e.tagName, right: Math.round(e.getBoundingClientRect().right) }))
          };
        });
        reports.push({ name, ...report });
        const bad = report.scrollWidth > width + 1 || report.brokenImages.length || report.overflow.length;
        if (bad) console.log('WARN', `${name}@${width}`, JSON.stringify(report));
        if (width === 1440) {
          await page.screenshot({ path: `${folder}/.review/${name}-1440.png`, animations: 'disabled' });
        }
      }
    }
    fs.mkdirSync(`${folder}/.review`, { recursive: true });
    fs.writeFileSync(`${folder}/.review/report.json`, JSON.stringify({ reports, errors }, null, 2));
    console.log('ERRORS:', errors.length ? errors.join('\n') : 'none');
  } finally {
    await browser.close();
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
