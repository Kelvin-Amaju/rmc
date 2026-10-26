/* Shared helpers for the v9 (Exrox template) port.
   Every page build starts from tools/_exrox_ref/<page>.html, applies the
   shared chrome replacements below, then the page-specific ones. */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REF = path.join(ROOT, 'tools', '_exrox_ref');
const OUT = path.join(ROOT, 'v9');

const RMC = {
  name: 'Rheriene Mabamidje &amp; Co.',
  namePlain: 'Rheriene Mabamidje & Co.',
  phone: '+234 803 318 1681',
  phoneHref: 'tel:+2348033181681',
  email: 'info@mabamidje.com',
  address1: 'Block 3 (Upper Floor), Edewor Shopping Centre,',
  address2: '#54 Effurun/Sapele Road,',
  address3: 'Warri, Delta State, Nigeria',
  hours: 'Monday &ndash; Friday, 9:00 &ndash; 17:00 (GMT+1)',
  partner: 'G. R. Mabamidje',
  partnerRole: 'Managing Partner',
  partnerCreds: 'MBA, FCA, FCTI, AMNIM',
  founded: '1993',
  logo: 'assets/img/rmc/rmc-logo.png',
  logoDark: 'assets/img/rmc/brand-logo.png'
};

const SERVICES = [
  {
    title: 'Audit &amp; Assurance',
    desc: 'Statutory and non-statutory audits providing independent assurance over your financial statements.',
    icon: 'assets/img/services/management.svg',
    points: ['Statutory &amp; non-statutory audits', 'Internal control reviews', 'Compliance and risk assessments']
  },
  {
    title: 'Design &amp; Implementation of Accounting Systems',
    desc: 'We design and set up complete, efficient accounting systems tailored to your organisation.',
    icon: 'assets/img/services/bookkeeping.svg',
    points: ['Chart of accounts design', 'Ledger and control setup', 'Implementation &amp; handover']
  },
  {
    title: 'Design of Management Information System',
    desc: 'Information systems that deliver timely, reliable data for sound management decisions.',
    icon: 'assets/img/icons/gear-large.svg',
    points: ['Management reporting design', 'KPI and dashboard definition', 'System specification']
  },
  {
    title: 'Tax Consultancy Services',
    desc: 'Tax planning, compliance and representation to keep you ahead of your obligations.',
    icon: 'assets/img/services/tax-planning.svg',
    points: ['Tax planning and computation', 'Filing and compliance', 'FIRS representation']
  },
  {
    title: 'Inventory &amp; Stock Management',
    desc: 'Stock control and valuation systems that safeguard your assets and reduce loss.',
    icon: 'assets/img/icons/load-large.svg',
    points: ['Stock control procedures', 'Valuation and costing', 'Movement and reconciliation']
  },
  {
    title: 'Streamlining of Accounting Systems',
    desc: 'We review and refine existing systems for accuracy, speed and control.',
    icon: 'assets/img/icons/rocket-growth.svg',
    points: ['Process review', 'Control strengthening', 'Cycle-time reduction']
  },
  {
    title: 'Ascertainment &amp; Recovery of Excess Bank Charges',
    desc: 'We investigate, ascertain and recover excess bank charges on your behalf.',
    icon: 'assets/img/icons/plane-large.svg',
    points: ['Charge analysis', 'Ascertainment and recovery', 'Remediation advice']
  }
];

/* ---------- helpers ---------- */

function readRef(name) {
  return fs.readFileSync(path.join(REF, name), 'utf8');
}

/* The template mixes normal spaces with non-breaking spaces (U+00A0) and the
   occasional thin space. Build a whitespace-tolerant matcher so a find string
   written with plain spaces still locates the source text. */
function flexible(find) {
  const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(escaped.replace(/ /g, '[\\s\\u00a0\\u2009]+'), 'g');
}

function apply(html, pairs, label) {
  for (const [find, replace] of pairs) {
    if (typeof find !== 'string') throw new Error(`[${label}] non-string pattern`);
    if (html.includes(find)) {
      html = html.split(find).join(replace);
      continue;
    }
    const rx = flexible(find);
    if (!rx.test(html)) throw new Error(`[${label}] NO MATCH: ${find.slice(0, 110).replace(/\s+/g, ' ')}`);
    html = html.replace(rx, () => replace);
  }
  return html;
}

function applyAll(html, pairs, label) {
  for (const [find, replace] of pairs) {
    if (!html.includes(find)) throw new Error(`[${label}] NO MATCH: ${find.slice(0, 110).replace(/\s+/g, ' ')}`);
    html = html.split(find).join(replace);
  }
  return html;
}

function applySoft(html, pairs, label) {
  for (const [find, replace] of pairs) {
    if (html.includes(find)) html = html.split(find).join(replace);
  }
  return html;
}

function applyRegexSoft(html, rx, replace, label) {
  const re = new RegExp(rx.source, rx.flags.includes('g') ? rx.flags : rx.flags + 'g');
  if (!re.test(html)) return html;
  return html.replace(re, replace);
}

function applyRegex(html, rx, replace, label) {
  const re = new RegExp(rx.source, rx.flags.includes('g') ? rx.flags : rx.flags + 'g');
  const m = html.match(re);
  if (!m) throw new Error(`[${label}] NO MATCH (regex): ${rx.source.slice(0, 110)}`);
  return html.replace(re, replace);
}

/* ---------- shared chrome ---------- */

function menuBlock(active) {
  const item = (href, label) =>
    `                                            <li class="menu-item"><a href="${href}"${active === href ? ' class="active"' : ''}>${label}</a></li>\n`;
  return `                    <div class="menu-area mx-auto">
                        <div class="overlay"></div>
                        <nav class="menu">
                            <div class="menu-mobile-header">
                                <button type="button" class="menu-mobile-arrow bg-transparent border-0"><i class="ri-arrow-left-s-line"></i></button>
                                <div class="menu-mobile-title"></div>
                                <button type="button" class="menu-mobile-close bg-transparent border-0"><i class="ri-close-line"></i></button>
                            </div>
                            <ul class="menu-section p-0 mb-0 lh-1">
${item('index.html', 'Home')}${item('about.html', 'About Us')}${item('services.html', 'Services')}${item('contact.html', 'Contact')}                                            </ul>
                        </nav>`;
}

function topBar() {
  return `                    <div class="navbar-top style-two position-relative z-2">
                        <div class="container style-two">
                            <div class="row">
                                <div class="col-md-7 mb-sm-6">
                                    <ul class="contact-info list-unstyled text-md-start text-center mb-0">
                                        <li class="d-inline-block"><a href="${RMC.phoneHref}" class="contact-num d-block fw-bold text_secondary link-hover-secondary">${RMC.phone}</a></li>
                                        <li class="d-inline-block"><a href="mailto:${RMC.email}" class="contact-mail fw-normal text-white hover-text-secondary d-inline-block">${RMC.email}</a></li>
                                    </ul>
                                </div>
                                <div class="col-md-5">
                                    <ul class="social-profile style-two list-unstyled text-md-end text-center mb-0">
                                        <li class="d-inline-block"><span class="text-white fw-normal fs-xxl-18">Office Hours: ${RMC.hours}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>`;
}

function footerBlock() {
  return `                <footer class="footer-area style-one">
                    <div class="container style-one">
                        <div class="footer-top pt-115">
                            <div class="row mb-65">
                                <div class="col-xxl-5 col-lg-4 col-md-5">
                                    <div class="footer-widget mb-30" data-cue="slideInLeft">
                                        <a href="index.html" class="logo d-block mb-50">
                                            <img src="${RMC.logo}" alt="${RMC.namePlain}">
                                        </a>
                                        <a href="${RMC.phoneHref}" class="contact-num d-block fw-bold text_secondary mb-18">${RMC.phone}</a>
                                        <a href="mailto:${RMC.email}" class="contact-mail fs-xxl-18 fw-bold text-white hover-text-secondary">${RMC.email}</a>
                                    </div>
                                </div>
                                <div class="col-xxl-4 col-lg-4 col-md-7 ps-xxl-4">
                                    <div class="footer-widget mb-30" data-cue="slideInLeft" data-delay="100">
                                        <h3 class="footer-widget-title fs-24 text-white mb-20">Quick Links</h3>
                                        <ul class="footer-menu style-one list-unstyled mb-0">
                                            <li class="d-block fs-xxl-18"><a href="index.html">Home</a></li>
                                            <li class="d-block fs-xxl-18"><a href="about.html">About Us</a></li>
                                            <li class="d-block fs-xxl-18"><a href="services.html">Services</a></li>
                                            <li class="d-block fs-xxl-18"><a href="contact.html">Contact</a></li>
                                            <li class="d-block fs-xxl-18"><a href="login.html">Staff Login</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-lg-4 col-md-6">
                                    <div class="footer-widget mb-30" data-cue="slideInLeft" data-delay="200">
                                        <h3 class="footer-widget-title fs-24 text-white mb-20">Our Office</h3>
                                        <p class="text-gray fs-xxl-18 mb-18">${RMC.address1}<br>${RMC.address2}<br>${RMC.address3}</p>
                                        <ul class="contact-info list-unstyled mb-0">
                                            <li class="fs-xxl-18 mb-8">Office Hours: ${RMC.hours}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="row ">
                                <div class="col-md-7 pe-xxl-0">
                                    <a href="index.html" class="logo-text text-white reveal-text-right transition" data-cue="slideInUp" data-delay="200">RMC</a>
                                </div>
                                <div class="col-xl-4 offset-xxl-1 col-md-5 ps-xxl-4">
                                    <div class="footer-widget" data-cue="slideInUp" data-delay="200">
                                        <p class="text-gray fs-xxl-18 mb-25">${RMC.namePlain} is a chartered accountancy firm in Warri, Delta State, providing audit, tax, accounting systems and advisory services since 1993.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="footer-bottom">
                            <div class="row align-items-center">
                                <div class="col-md-7 pe-md-0 mb-sm-10">
                                    <p class="copyright-text fs-xxl-18 text-md-start text-center text-gray mb-0"><i class="ri-copyright-line"></i><span class="text_secondary ms-1">${RMC.name}</span> All Rights Reserved</p>
                                </div>
                                <div class="col-md-5">
                                    <ul class="footer-bottom-menu list-unstyled text-lg-end text-center mb-0">
                                        <li class="fs-xxl-18"><a href="services.html">Scope of Service</a></li>
                                        <li class="fs-xxl-18"><a href="contact.html">Contact Us</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>`;
}

const CTA_STAFF_LOGIN_MOBILE = `<a href="login.html" class="btn style-one d-inline-flex align-items-center">
                                                    <span class="btn-icon-one d-flex flex-column align-items-center justify-content-center rounded-circle transition"><img src="assets/img/icons/right-arrow.svg" alt="Icon" class="d-block mx-auto"></span>
                                                    <span class="btn-text fw-bold d-flex flex-column align-items-center justify-content-center transition">Staff Login</span>
                                                    <span class="btn-icon-two d-flex flex-column align-items-center justify-content-center rounded-circle transition"><img src="assets/img/icons/right-arrow.svg" alt="Icon" class="d-block mx-auto"></span>
                                                </a>`;

const CTA_STAFF_LOGIN_DESKTOP = `<a href="login.html" class="btn style-one d-inline-flex align-items-center">
                                            <span class="btn-icon-one d-flex flex-column align-items-center justify-content-center rounded-circle transition"><img src="assets/img/icons/right-arrow.svg" alt="Icon" class="d-block mx-auto"></span>
                                            <span class="btn-text fw-bold d-flex flex-column align-items-center justify-content-center transition">Staff Login</span>
                                            <span class="btn-icon-two d-flex flex-column align-items-center justify-content-center rounded-circle transition"><img src="assets/img/icons/right-arrow.svg" alt="Icon" class="d-block mx-auto"></span>
                                        </a>`;

/* Applies the chrome that is identical on every v9 page. */
function shared(html, opts) {
  const { title, description, active, hasTopBar } = opts;

  html = applyRegex(html, /<div class="menu-area mx-auto">[\s\S]*?<\/nav>/, menuBlock(active), 'menu');

  html = apply(html, [
    ['<title>Exrox – Accounting & Management Consulting HTML Template</title>',
      `<title>${title}</title>\n        <meta name="description" content="${description}">`],
    ['<link rel="icon" type="image/png" href="assets/img/favicon.png">',
      '<link rel="icon" type="image/png" href="assets/img/rmc/favicon.png">'],
    ['<link rel="stylesheet" href="assets/css/dark-theme.css">',
      '<link rel="stylesheet" href="assets/css/dark-theme.css">\n        <link rel="stylesheet" href="assets/css/rmc.css">'],
    ['<img src="assets/img/logo-white.png" alt="Logo">',
      `<img src="${RMC.logo}" alt="${RMC.namePlain}">`]
  ], 'head');

  /* Mobile "more" dropdown CTA and the desktop CTA both become Staff Login. */
  html = applyRegex(
    html,
    /<div class="dropdown-menu dropdown-menu-centered mobile-option-list top-1 border-0" data-bs-popper="static">[\s\S]*?<\/div>/,
    `<div class="dropdown-menu dropdown-menu-centered mobile-option-list top-1 border-0" data-bs-popper="static">
                                                    ${CTA_STAFF_LOGIN_MOBILE}
                                            </div>`,
    'mobile-cta'
  );

  html = applyRegex(
    html,
    /<div class="option-item d-lg-block d-none">[\s\S]*?<\/div>\s*<div class="option-item d-lg-none">/,
    `<div class="option-item d-lg-block d-none">
                                        ${CTA_STAFF_LOGIN_DESKTOP}
                                    </div>
                                <div class="option-item d-lg-none">`,
    'desktop-cta'
  );

  /* The template navbar ships a search widget with no backend behind it, and
     its dropdown pushes the page wider than the viewport on small screens. */
  html = applyRegexSoft(html, /<button class="search-btn[\s\S]*?<div class="search-dropdown[\s\S]*?<\/form>\s*<\/div>/, '', 'navbar-search');

  /* Cloudflare artefacts from the template host. */
  html = applyRegex(html, /<script data-cfasync="false" src="\/cdn-cgi\/scripts\/[^"]+"><\/script>/, '', 'cf-decode');
  html = applyRegex(html, /<script>\(function\(\)\{function c\(\)\{var b=a\.contentDocument[\s\S]*?<\/script>/, '', 'cf-challenge');

  /* Inner pages carry the dark top bar. */
  if (hasTopBar) {
    html = applyRegex(html, /<div class="navbar-top style-two position-relative z-2">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<!-- Navbar Top End -->/,
      topBar() + '\n                    <!-- Navbar Top End -->', 'topbar');
  }

  /* Footer. */
  html = applyRegex(html, /<footer class="footer-area style-one">[\s\S]*?<\/footer>/, footerBlock(), 'footer');

  return html;
}

function assertClean(html, label) {
  const bad = [
    [/cdn-cgi/i, 'cloudflare reference'],
    [/__cf_email__/, 'cloudflare email span'],
    [/exrox/i, 'template brand name'],
    [/https?:\/\/(www\.)?(facebook|x|twitter|linkedin|instagram)\.com/i, 'template social link']
  ];
  for (const [re, what] of bad) {
    if (re.test(html)) throw new Error(`[${label}] leftover ${what}`);
  }
}

function write(outName, html, label) {
  assertClean(html, label);
  fs.writeFileSync(path.join(OUT, outName), html, 'utf8');
  console.log(`built v9/${outName} (${html.length} bytes)`);
}
module.exports = { RMC, SERVICES, readRef, apply, applyAll, applySoft, applyRegex, applyRegexSoft, shared, write, footerBlock, menuBlock };
