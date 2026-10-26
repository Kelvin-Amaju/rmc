/* Dumps a detailed tree of a selector's descendants with geometry. */
const { chromium } = require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('path');

const file = process.argv[2];
const selector = process.argv[3];
const width = parseInt(process.argv[4] || '1440', 10);
const depth = parseInt(process.argv[5] || '4', 10);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('file:///' + path.resolve(file).replaceAll('\\', '/'), { waitUntil: 'load' });
  await page.waitForTimeout(800);
  const res = await page.evaluate(({ selector, depth }) => {
    const root = document.querySelector(selector);
    if (!root) return { error: 'no match for ' + selector };
    const walk = (el, lvl) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      const node = {
        lvl,
        tag: el.tagName,
        cls: (el.className || '').toString().slice(0, 60),
        box: [Math.round(r.left), Math.round(r.top + scrollY), Math.round(r.width), Math.round(r.height)],
        pos: s.position,
        disp: s.display,
        vis: s.visibility,
        op: s.opacity,
        bg: s.backgroundColor,
        color: s.color,
        fs: s.fontSize,
        lh: s.lineHeight,
        overflowX: s.overflowX,
        text: el.children.length ? '' : (el.textContent || '').trim().slice(0, 40)
      };
      const kids = lvl < depth ? [...el.children].map(c => walk(c, lvl + 1)) : [];
      return kids.length ? { ...node, kids } : node;
    };
    return walk(root, 0);
  }, { selector, depth });
  const print = (n, ind) => {
    console.log(ind + n.tag + '.' + n.cls + ' [' + n.box.join(',') + '] pos=' + n.pos + ' d=' + n.disp + ' v=' + n.vis + ' o=' + n.op + ' bg=' + n.bg + ' fs=' + n.fs + (n.text ? ' txt="' + n.text + '"' : ''));
    (n.kids || []).forEach(k => print(k, ind + '  '));
  };
  print(res, '');
  await browser.close();
})().catch(e => { console.error(e); process.exitCode = 1; });
