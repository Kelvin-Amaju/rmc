/* Typography audit: text cut off by its own box, oversized type, unclipped nowrap overflow. */
const { chromium } = require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const folder = process.argv[2] || 'v9';
const widths = (process.argv[3] || '1440,768,390,320').split(',').map(Number);
const pages = (process.argv[4] || 'index,about,services,contact,login').split(',');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 });
    for (const name of pages) {
      const file = path.resolve(`${folder}/${name}.html`);
      if (!fs.existsSync(file)) continue;
      await page.goto('file:///' + file.replaceAll('\\', '/'), { waitUntil: 'load' });
      await page.waitForTimeout(900);
      const res = await page.evaluate(() => {
        const out = { cut: [], big: [], overflow: [] };
        const seen = new Set();
        const desc = (e) => (e.className || '').toString().slice(0, 46) + ' | ' + (e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40);
        const clippedAncestor = (el) => {
          let p = el.parentElement;
          while (p && p !== document.documentElement) {
            if (/hidden|clip|auto|scroll/.test(getComputedStyle(p).overflowX)) return true;
            p = p.parentElement;
          }
          return false;
        };
        [...document.querySelectorAll('body *')].forEach(e => {
          const s = getComputedStyle(e);
          if (s.display === 'none' || s.visibility === 'hidden') return;
          const hasText = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
          if (!hasText) return;
          if (e.clientWidth <= 0) return;
          const k0 = desc(e);
          /* Text physically cut off by its own overflow rule. */
          if (/hidden|clip/.test(s.overflowX) && e.scrollWidth > e.clientWidth + 1) {
            const k = 'c' + k0;
            if (!seen.has(k)) { seen.add(k); out.cut.push({ d: k0, sw: e.scrollWidth, cw: e.clientWidth, over: s.overflowX }); }
          }
          /* Text wider than the viewport and not clipped anywhere. */
          if (e.scrollWidth > window.innerWidth + 1 && !clippedAncestor(e)) {
            const k = 'o' + k0;
            if (!seen.has(k)) { seen.add(k); out.overflow.push({ d: k0, sw: e.scrollWidth, vw: window.innerWidth }); }
          }
          /* Display type that never shrinks on a phone. */
          const fs = parseFloat(s.fontSize);
          if (fs >= 26 && !/^(H1|H2|H3|H4|H5|H6|B|STRONG)$/.test(e.tagName) && window.innerWidth <= 480) {
            const k = 'b' + k0;
            if (!seen.has(k)) { seen.add(k); out.big.push({ d: k0, fs }); }
          }
        });
        return out;
      });
      const n = res.cut.length + res.big.length + res.overflow.length;
      if (n) {
        console.log('=== ' + name + ' @' + width);
        res.cut.forEach(x => console.log('   CUT     ' + JSON.stringify(x)));
        res.overflow.forEach(x => console.log('   OVERFLOW ' + JSON.stringify(x)));
        res.big.forEach(x => console.log('   BIG     ' + JSON.stringify(x)));
      }
    }
  }
  await browser.close();
})().catch(e => { console.error(e); process.exitCode = 1; });
