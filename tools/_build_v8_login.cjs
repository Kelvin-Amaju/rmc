/* Temp build helper: generate v8/login.html (RMC client login) from Bizen login template. */
const fs = require('fs');
const SRC = 'tools/_bizen_ref/login.html';
const OUT = 'v8/login.html';

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
   '<title>Client Login | Rheriene Mabamidje &amp; Co.</title>');
rep('content="Bizen is a modern Business Consulting HTML template designed for consulting firms, corporate agencies, financial advisors, and professional service providers. Clean, responsive, and optimized for high-performance business websites."',
   'content="Client login for Rheriene Mabamidje &amp; Co., chartered accountants in Warri, Delta State, Nigeria. Sign in to access your client account."');
rep('content="business consulting, corporate template, consulting firm, financial advisor, business agency, corporate website, responsive template"',
   'content="client login, client portal, Rheriene Mabamidje, chartered accountants, Warri, Nigeria"');
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
rep('src="images/promo-bg.jpg"', 'src="assets/img/hero-office.jpg"');
rep('<h1 class="display-1 text-info text-center">Login</h1>',
   '<h1 class="display-1 text-info text-center">Client Login</h1>');
rep('<li class="breadcrumb-item active" aria-current="page">Login</li>',
   '<li class="breadcrumb-item active" aria-current="page">Client Login</li>');

/* ---------- LOGIN FORM ---------- */
rep('<h2 class="sec-title primary">Login Account</h2>', '<h2 class="sec-title primary">Client Login</h2>');
rep('<p>Please log to access your account.</p>', '<p>Sign in to access your client account.</p>');
re(/<div class="d-sm-flex justify-content-between mb-4">[\s\S]*?<h5 class="h2 text-center mb-5">OR<\/h5>\s*/, '');
rep('<button class="btn btn-primary w-100 mt-4">Login</button>',
   '<button class="btn btn-primary w-100 mt-4">Sign In</button>');
re(/<p>Don’t have an account \? <a class="text-success" href="register.html"> Register Now <\/a> <\/p>/,
   '<p>Need an account? <a class="text-success" href="contact.html"> Contact us </a></p>');

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
console.log('WROTE', OUT, s.length, 'bytes');
console.log('FAILED', fails.length);
fails.forEach((f) => console.log('  ' + f));
