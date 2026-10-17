const { chromium } = require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const reports = [];
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.route(/^https:\/\/fonts\./, route => route.abort());
    await page.route(/^https:\/\/maps\./, route => route.abort());
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const name of ['index', 'about', 'services', 'contact', 'login']) {
        await page.goto('file:///' + path.resolve(`v9/${name}.html`).replaceAll('\\', '/'), { waitUntil: 'load' });
        await page.waitForTimeout(250);
        await page.evaluate(async () => {
          document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
          await Promise.all([...document.images].map(i => i.decode().catch(() => {})));
        });
        const report = await page.evaluate(() => ({
          width: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.getAttribute('src')),
          hiddenContent: [...document.querySelectorAll('main [data-aos], .page-wrapper section [data-aos]')].filter(e => getComputedStyle(e).opacity === '0').length,
          overflow: [...document.querySelectorAll('.page-wrapper *')].filter(e => {
            const r = e.getBoundingClientRect();
            return r.width > 0 && r.right > innerWidth + 2 && !e.closest('.owl-stage, .marquee-two, .client-carousel__title');
          }).slice(0, 7).map(e => ({ cls: e.className, right: Math.round(e.getBoundingClientRect().right) }))
        }));
        reports.push({ name, ...report });
        if (report.scrollWidth > width || report.brokenImages.length || report.hiddenContent) {
          throw Error(`${name} at ${width}px: ${JSON.stringify(report)}`);
        }
        if (width === 390 || width === 1440) {
          await page.screenshot({ path: `v9/.review/${name}-${width}.png`, animations: 'disabled' });
        }
        if (width === 390) {
          await page.locator('.mobile-nav__btn').click();
          if (!await page.locator('.mobile-nav__wrapper').evaluate(e => e.classList.contains('expanded'))) throw Error(`${name}: mobile menu did not open`);
          if (!await page.locator('.mobile-nav__container a[href="login.html"]').count()) throw Error('Missing mobile staff link');
          await page.keyboard.press('Escape');
          if (await page.locator('.mobile-nav__wrapper').evaluate(e => e.classList.contains('expanded'))) throw Error('Escape did not close menu');
        }
        if (name === 'login' && width === 390) {
          await page.locator('#togglePassword').click();
          if (await page.locator('#pass').getAttribute('type') !== 'text') throw Error('Password toggle failed');
          await page.locator('#togglePassword').click();
          if (await page.locator('#pass').getAttribute('type') !== 'password') throw Error('Password hide failed');
        }
        if (name === 'contact' && width === 390) {
          if (await page.locator('form').evaluate(f => f.checkValidity())) throw Error('Empty contact form should be invalid');
        }
        if (name === 'index' && width === 390) {
          await page.locator('button[data-tab="#about01"]').click();
          if (!await page.locator('#about01').evaluate(e => e.classList.contains('active-tab'))) throw Error('About tabs failed');
        }
      }
    }
    await page.goto('file:///' + path.resolve('v9/contact.html').replaceAll('\\', '/') + '?service=2');
    if (await page.locator('select[name="service"]').inputValue() !== 'Tax Consultancy Services') throw Error('Service preselection failed');
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('file:///' + path.resolve('v9/index.html').replaceAll('\\', '/'));
    for (const [name, selector] of [['home-about', '.about-two'], ['home-partner', '.analytics-one'], ['home-footer', '.main-footer']]) {
      await page.locator(selector).screenshot({ path: `v9/.review/${name}.png`, animations: 'disabled' });
    }
    fs.writeFileSync('v9/.review/report.json', JSON.stringify({ reports, errors }, null, 2));
    if (errors.length) throw Error(errors.join('\n'));
    console.log(JSON.stringify({ reports, errors }));
  } finally {
    await browser.close();
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
