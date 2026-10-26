/* Temp helper: vendor the Google Fonts used by the Exrox template into v9/assets/fonts. */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CSS_URL = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const OUT_DIR = path.resolve(__dirname, '..', 'v9', 'assets', 'fonts');
const OUT_CSS = path.resolve(__dirname, '..', 'v9', 'assets', 'css', 'fonts.css');

function curl(url, binary) {
  const args = ['-sL', '--max-time', '45', '-A', UA, url];
  const res = execFileSync('curl.exe', args, { maxBuffer: 32 * 1024 * 1024 });
  return binary ? res : res.toString('utf8');
}

(async () => {
  const css = curl(CSS_URL, false);
  const urls = [...new Set((css.match(/https:\/\/fonts\.gstatic\.com\/[^)]+/g) || []))];
  console.log('font files referenced:', urls.length);

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(OUT_CSS), { recursive: true });

  const local = css.replace(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g, (m, u) => {
    const name = u.split('/').slice(-3).join('-');
    const dest = path.join(OUT_DIR, name);
    if (!fs.existsSync(dest)) fs.writeFileSync(dest, curl(u, true));
    return `url(../fonts/${name})`;
  });

  fs.writeFileSync(OUT_CSS, local);
  console.log('wrote', OUT_CSS);
})();
