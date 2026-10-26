/* Recolours the Exrox accent SVGs to the RMC palette. */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IMG = path.join(ROOT, 'v9', 'assets', 'img');

const MAP = {
  '#91D089': '#3576a2',
  '#B9F8B1': '#A8CFE9',
  '#393737': '#0E2A47'
};

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (!e.name.endsWith('.svg')) continue;
    let s = fs.readFileSync(p, 'utf8');
    const before = s;
    for (const [from, to] of Object.entries(MAP)) {
      s = s.split(from).join(to).split(from.toLowerCase()).join(to.toLowerCase());
    }
    if (s !== before) {
      fs.writeFileSync(p, s, 'utf8');
      console.log('recoloured ' + path.relative(ROOT, p));
    }
  }
}

walk(IMG);
