/* Audits the built v9 pages for template leftovers and dead links. */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const V9 = path.join(ROOT, 'v9');

const LEFTOVERS = [
  'Exrox', 'Carrie', 'Rosemary', 'McMiller', 'Marilynn', 'Cervantes', 'Starks', 'Coyne',
  'Proffitt', 'Jackie Guillermo', 'Chicago', 'SOC 2', 'leader-details', 'service-details',
  'appointment.html', 'cdn-cgi', '__cf_email__', 'AICP', 'CPA Certified', 'themeforest',
  'envato', 'behance', 'dribbble', 'facebook.com', 'twitter.com', 'linkedin.com',
  'instagram.com', '15K+', '99%', '98%', '500+', '200+', '2,250'
];

const files = fs.readdirSync(V9).filter(f => f.endsWith('.html'));
let problems = 0;

for (const f of files) {
  const t = fs.readFileSync(path.join(V9, f), 'utf8');
  console.log('===== ' + f + ' (' + t.length + ' bytes)');
  for (const p of LEFTOVERS) {
    if (t.includes(p)) { console.log('  LEFTOVER: ' + p); problems++; }
  }
  const hrefs = [...new Set([...t.matchAll(/href="([^"]+)"/g)].map(m => m[1]))];
  for (const h of hrefs) {
    if (/^(https?:|mailto:|tel:|#|javascript:)/.test(h)) continue;
    const target = path.join(V9, h.split('#')[0]);
    if (!fs.existsSync(target)) { console.log('  DEAD LINK: ' + h); problems++; }
  }
  const srcs = [...new Set([...t.matchAll(/src="([^"]+)"/g)].map(m => m[1]))];
  for (const s of srcs) {
    if (/^(https?:|data:)/.test(s)) continue;
    const target = path.join(V9, s.split('#')[0]);
    if (!fs.existsSync(target)) { console.log('  MISSING IMG: ' + s); problems++; }
  }
}
console.log(problems === 0 ? 'CLEAN' : 'PROBLEMS: ' + problems);
