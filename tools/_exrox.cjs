/* Temp helper: inventory/download the Exrox template stack into v9/. */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASE = 'https://templates.envytheme.com/exrox/default/';
const HOST = new URL(BASE).host;
const V9 = path.resolve(__dirname, '..', 'v9');
const MODE = process.argv[2] || 'inventory';
const PAGES = [
  'index.html', 'about-us.html', 'services.html', 'contact.html'
];

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

function getOnce(url) {
  const res = execFileSync('curl.exe', [
    '-sL', '--max-time', '45', '-A', UA, '-w', '\\n__STATUS__%{http_code}', url
  ], { maxBuffer: 64 * 1024 * 1024 });
  const buf = Buffer.from(res);
  const marker = Buffer.from('__STATUS__');
  const idx = buf.lastIndexOf(marker);
  if (idx === -1) return { ok: false, status: 'ERR' };
  const status = parseInt(buf.slice(idx + marker.length).toString('utf8'), 10);
  const body = buf.slice(0, idx);
  if (status !== 200) return { ok: false, status };
  return { ok: true, status, buf: body };
}

async function get(url) {
  for (let i = 0; i < 3; i++) {
    try { return getOnce(url); }
    catch (e) { if (i === 2) return { ok: false, status: 'ERR:' + e.message }; await new Promise(r => setTimeout(r, 600)); }
  }
}

const isAsset = u => u && !/^(https?:|data:|mailto:|tel:|javascript:|#)/i.test(u);

function extractRefs(text) {
  const refs = new Set();
  const re = /(?:href|src|data-src|poster)\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(text))) refs.add(m[1]);
  const srcset = /srcset\s*=\s*["']([^"']+)["']/gi;
  while ((m = srcset.exec(text))) m[1].split(',').forEach(p => refs.add(p.trim().split(/\s+/)[0]));
  const cssUrl = /url\(\s*['"]?([^'")]+)['"]?\s*\)/gi;
  while ((m = cssUrl.exec(text))) refs.add(m[1]);
  return [...refs].map(r => r.split('?')[0]).filter(isAsset);
}

(async () => {
  const assets = new Map();
  const pages = {};

  async function scanAssetContent(absUrl, text, kind) {
    for (const ref of extractRefs(text)) {
      let abs;
      try { abs = new URL(ref, absUrl).href; } catch { continue; }
      if (new URL(abs).host !== HOST) continue;
      if (!assets.has(abs)) assets.set(abs, { kind, from: absUrl });
    }
  }

  for (const page of PAGES) {
    const res = await get(BASE + page);
    if (!res.ok) { console.log('PAGE FAIL', page, res.status); continue; }
    pages[page] = res.buf.toString('utf8');
    await scanAssetContent(BASE + page, pages[page], 'page');
  }

  const cssjs = [...assets.keys()].filter(u => /\.(css|js)(\?|$)/.test(u));
  for (const u of cssjs) {
    const res = await get(u);
    if (res.ok) await scanAssetContent(u, res.buf.toString('utf8'), 'asset');
  }

  const list = [...assets.keys()].sort();
  console.log('PAGES:', PAGES.filter(p => pages[p]).length, '| ASSETS:', list.length);
  if (MODE === 'inventory') {
    list.forEach(u => console.log('  ', u.replace(BASE, '')));
    fs.writeFileSync(path.resolve(__dirname, '_exrox_assets.json'), JSON.stringify(list, null, 2));
    return;
  }

  const REF = path.resolve(__dirname, '_exrox_ref');
  const okExt = /\.(css|m?js|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|eot|otf|mp4|webm|pdf|json)$/i;
  const isHtml = r => /\.html?$/i.test(r);
  let ok = 0, fail = 0, skipped = 0;
  for (const u of list) {
    const rel = decodeURIComponent(u.replace(BASE, '')).split('?')[0];
    if (rel.startsWith('cdn-cgi/')) { skipped++; continue; }
    let dest;
    if (isHtml(rel)) dest = path.join(REF, rel);
    else if (okExt.test(rel)) dest = path.join(V9, rel);
    else { skipped++; continue; }
    try {
      if (fs.existsSync(dest) && fs.statSync(dest).size > 0) { ok++; continue; }
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      const res = await get(u);
      if (res && res.ok) { fs.writeFileSync(dest, res.buf); ok++; }
      else { console.log('  FAIL', res && res.status, rel); fail++; }
    } catch (e) { console.log('  ERR', rel, e.message); fail++; }
  }
  console.log('DOWNLOADED ok=' + ok + ' fail=' + fail + ' skipped=' + skipped);
})();
