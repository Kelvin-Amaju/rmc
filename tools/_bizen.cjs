/* Temp helper: inventory/download the Bizen template stack into v8/. */
const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE = 'https://templates.theme-village.com/bizen/';
const HOST = new URL(BASE).host;
const V8 = path.resolve(__dirname, '..', 'v8');
const MODE = process.argv[2] || 'inventory';
const PAGES = [
  'index.html', 'index-3.html', 'about.html', 'services.html',
  'contact.html', 'login.html'
];

function getOnce(url, depth = 0) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 30000 }, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location && depth < 5) {
        r.resume();
        return get(new URL(r.headers.location, url).href, depth + 1).then(resolve, reject);
      }
      if (r.statusCode !== 200) { r.resume(); return resolve({ ok: false, status: r.statusCode }); }
      const c = [];
      r.on('data', d => c.push(d));
      r.on('end', () => resolve({ ok: true, status: 200, buf: Buffer.concat(c) }));
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}
async function get(url, depth = 0) {
  for (let i = 0; i < 3; i++) {
    try { return await getOnce(url, depth); }
    catch (e) { if (i === 2) return { ok: false, status: 'ERR:' + e.code }; await new Promise(r => setTimeout(r, 600)); }
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
  const assets = new Map(); // url -> {kind, from}
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

  // Fetch CSS/JS asset contents and scan them too (fonts, images)
  const cssjs = [...assets.keys()].filter(u => /\.(css|js)(\?|$)/.test(u));
  for (const u of cssjs) {
    const res = await get(u);
    if (res.ok) await scanAssetContent(u, res.buf.toString('utf8'), 'asset');
  }

  const list = [...assets.keys()].sort();
  console.log('PAGES:', PAGES.filter(p => pages[p]).length, '| ASSETS:', list.length);
  if (MODE === 'inventory') {
    list.forEach(u => console.log('  ', u.replace(BASE, '')));
    fs.writeFileSync(path.resolve(__dirname, '_bizen_assets.json'), JSON.stringify(list, null, 2));
    return;
  }

  const REF = path.resolve(__dirname, '_bizen_ref');
  const okExt = /\.(css|m?js|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|eot|otf|mp4|webm|pdf|json)$/i;
  const isHtml = r => /\.html?$/i.test(r);
  let ok = 0, fail = 0, skipped = 0;
  for (const u of list) {
    const rel = decodeURIComponent(u.replace(BASE, '')).split('?')[0];
    let dest;
    if (isHtml(rel)) dest = path.join(REF, rel);
    else if (okExt.test(rel)) dest = path.join(V8, rel);
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
