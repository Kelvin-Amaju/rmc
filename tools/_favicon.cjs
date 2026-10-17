/* Temp helper: build v8/images/favicon.ico from the RMC badge PNG (PNG-in-ICO). */
const fs = require('fs');
const SRC = 'v8/assets/img/hero-2-badge-1.png';
const OUT = 'v8/images/favicon.ico';

const png = fs.readFileSync(SRC);
const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
if (!png.slice(0, 4).equals(sig)) throw new Error('not a PNG: ' + SRC);

const w = png.readUInt32BE(16);
const h = png.readUInt32BE(20);
const dim = (n) => (n >= 256 ? 0 : n);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);

const entry = Buffer.alloc(16);
entry.writeUInt8(dim(w), 0);
entry.writeUInt8(dim(h), 1);
entry.writeUInt8(0, 2);
entry.writeUInt8(0, 3);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(png.length, 8);
entry.writeUInt32LE(22, 12);

fs.writeFileSync(OUT, Buffer.concat([header, entry, png]));
console.log('WROTE', OUT, fs.statSync(OUT).size, 'bytes; source', w + 'x' + h, 'png', png.length);
