/* Temp build helper: generate v8/services.html (RMC) from Bizen services template. */
const fs = require('fs');
const SRC = 'tools/_bizen_ref/services.html';
const OUT = 'v8/services.html';

let s = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');
const fails = [];

function rep(find, repl, all) {
   const before = s;
   if (all) s = s.split(find).join(repl);
   else {
      const i = s.indexOf(find);
      if (i >= 0) s = s.slice(0, i) + repl + s.slice(i + find.length);
   }
   if (s === before) fails.push('STR ' + JSON.stringify(find.slice(0, 70)));
}
function re(find, repl) {
   const before = s;
   s = s.replace(find, repl);
   if (s === before) fails.push('RE  ' + String(find).slice(0, 80));
}

/* ---------- HEAD ---------- */
rep('<title>Bizen - Business Consulting Template</title>',
   '<title>Services | Rheriene Mabamidje &amp; Co.</title>');
rep('content="Bizen is a modern Business Consulting HTML template designed for consulting firms, corporate agencies, financial advisors, and professional service providers. Clean, responsive, and optimized for high-performance business websites."',
   'content="Seven core services from Rheriene Mabamidje &amp; Co., chartered accountants in Warri: audit and assurance, accounting systems, management information, tax, stock management, streamlining and bank-charge recovery."');
rep('content="business consulting, corporate template, consulting firm, financial advisor, business agency, corporate website, responsive template"',
   'content="chartered accountants, audit and assurance, accounting systems, management information system, tax consultancy, inventory management, Warri, Nigeria"');
rep('<meta name="author" content="theme-village">',
   '<meta name="author" content="Rheriene Mabamidje &amp; Co.">');
rep('<link rel="stylesheet" href="css/style.css">',
   '<link rel="stylesheet" href="css/style.css">\n   <link rel="stylesheet" href="css/rmc.css">');

/* ---------- LOGOS ---------- */
rep('images/logo.svg', 'images/brand-logo.png', true);
rep('images/logo-w.svg', 'images/rmc-logo.png', true);

/* ---------- CANVAS MENU ---------- */
rep('<p>We are passionate about create inspiring architectural and interior spaces that combine creativity,\n         functionality, and modern aesthetics. </p>',
   '<p>Rheriene Mabamidje &amp; Co. is a firm of Chartered Accountants delivering audit, tax, accounting systems and advisory services with professionalism and integrity.</p>');
re(/<ul class="vertical-menu">[\s\S]*?<\/ul>/,
   '<ul class="vertical-menu">\n               <li><a href="index.html">Home</a></li>\n               <li><a href="about.html">About Us</a></li>\n               <li><a href="services.html">Our Services</a></li>\n               <li><a href="contact.html">Contact Us</a></li>\n               <li><a href="login.html">Client Login</a></li>\n            </ul>');
rep('Get Support <i\n            class="fa fa-arrow-right"></i>', 'Get in Touch <i\n            class="fa fa-arrow-right"></i>');

/* ---------- MAIN NAV ---------- */
re(/<ul class="navbar-nav mx-auto align-items-lg-center">[\s\S]*?<\/ul>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/nav>/,
   `<ul class="navbar-nav mx-auto align-items-lg-center">
                           <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                           <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
                           <li class="nav-item"><a class="nav-link" href="services.html">Services</a></li>
                           <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
                           <li class="nav-item"><a class="nav-link" href="login.html">Client Login</a></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </nav>`);
rep('class="btn btn-border">Get a quote', 'class="btn btn-border">Get in Touch');

/* ---------- PROMO ---------- */
rep('src="images/promo-bg.jpg"', 'src="assets/img/services-hero.jpg"');

/* ---------- SERVICES GRID -> 7 RMC SERVICES ---------- */
const iconBlocks = s.match(/<div class="serv-icon">[\s\S]*?<\/svg>\s*<\/div>/g) || [];
if (iconBlocks.length < 7) fails.push('ICONS only ' + iconBlocks.length);

const services = [
   ['Audit &amp; Assurance', 'audit.webp', 'Statutory and non-statutory audits providing independent assurance over your financial statements.'],
   ['Design &amp; Implementation of Accounting Systems', 'desk.webp', 'We design and set up complete, efficient accounting systems tailored to your organisation.'],
   ['Design of Management Information System', 'boardroom.webp', 'Information systems that deliver timely, reliable data for sound management decisions.'],
   ['Tax Consultancy Services', 'handshake.webp', 'Tax planning, compliance and representation to keep you ahead of your obligations.'],
   ['Inventory &amp; Stock Management', 'office.webp', 'Stock control and valuation systems that safeguard your assets and reduce loss.'],
   ['Streamlining of Accounting Systems', 'collaboration.webp', 'We review and refine existing systems for accuracy, speed and control.'],
   ['Ascertainment &amp; Recovery of Excess Bank Charges', 'justice.webp', 'We investigate, ascertain and recover excess bank charges on your behalf.'],
];

const cards = services.map(([title, img, desc], i) => `            <div class="col-lg-3">
               <div class="service-entry2">
                  <div class="serv-bg" style="background-image: url('images/serv-f1.jpg');"></div>
                  <div class="serv-thumb text-end">
                     <img src="assets/img/${img}" alt="${title.replace(/&amp;/g, 'and')}">
                  </div>
                  <div class="serv-inner">
                     ${iconBlocks[i].replace(/\s+/g, ' ').trim()}
                     <h3 class="h4"><a href="contact.html">${title}</a></h3>
                     <p>${desc}</p>
                     <a href="contact.html" class="btn btn-outline">Enquire <i class="fa fa-plus"></i>
                        <span></span></a>
                  </div>
               </div>
            </div>`).join('\n');

re(/<div class="container-fluid">[\s\S]*?<!-- Services Section End -->/,
   `<div class="container-fluid">
         <div class="row mb-5">
            <div class="col-lg-8 mx-auto text-center">
               <span class="sub-title">What we do</span>
               <h2 class="sec-title">Seven core professional services</h2>
            </div>
         </div>
         <div class="row gy-4">
${cards}
         </div>
      </div>
   </section>
   <!-- Services Section End -->`);

/* ---------- CTA ---------- */
rep("<h2 class=\"sec-title text-white\">Let's work together as a team to make it happen!</h2>",
   '<h2 class="sec-title text-white">Let\'s work together to strengthen your financial controls.</h2>');
rep('Schedule a free consultant', 'Book a consultation');

/* ---------- FOOTER ---------- */
rep('Latest updates from Bizen', 'Latest updates from Rheriene Mabamidje &amp; Co.');
rep('Join our community! Get exclusive news, tips and offers delivered to your inbox. Here are some\n                     engaging text ideas for a subscribe',
   'Chartered Accountants providing audit, tax, accounting systems and advisory services to clients across Nigeria.');
re(/<li>251 Purple Sunset Bogota, BXY 92101<\/li>[\s\S]*?<li>Mon - Sat: 7\.30am - 17\.30pm<\/li>/,
   '<li>Block 3 (Upper Floor), Edewor Shopping Centre, #54 Effurun/Sapele Road, Warri, Delta State, Nigeria</li>\n                     <li>+234 803 318 1681</li>\n                     <li>info@mabamidje.com</li>\n                     <li>Mon - Fri: 9:00am - 5:00pm (GMT+1)</li>');
re(/<ul>\s*<li><a href="about.html">About us<\/a><\/li>[\s\S]*?<\/ul>/,
   `<ul>
                     <li><a href="index.html">Home</a></li>
                     <li><a href="about.html">About us</a></li>
                     <li><a href="services.html">Our Services</a></li>
                     <li><a href="contact.html">Contact us</a></li>
                     <li><a href="login.html">Client Login</a></li>
                  </ul>`);
rep('Copyright &copy;2026 <a href="#">Bizen</a> All Rights Reserved.',
   'Copyright &copy;2026 <a href="#">Rheriene Mabamidje &amp; Co.</a> All Rights Reserved.');

fs.writeFileSync(OUT, s);
console.log('WROTE', OUT, s.length, 'bytes; icons found:', iconBlocks.length);
console.log('FAILED', fails.length);
fails.forEach((f) => console.log('  ' + f));
