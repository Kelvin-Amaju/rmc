/* Temp build helper: generate v8/about.html (RMC) from Bizen about template. */
const fs = require('fs');
const SRC = 'tools/_bizen_ref/about.html';
const OUT = 'v8/about.html';

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
   '<title>About Us | Rheriene Mabamidje &amp; Co.</title>');
rep('content="Bizen is a modern Business Consulting HTML template designed for consulting firms, corporate agencies, financial advisors, and professional service providers. Clean, responsive, and optimized for high-performance business websites."',
   'content="Rheriene Mabamidje &amp; Co. (RMC) is a firm of Chartered Accountants incorporated in 1993, providing audit and assurance, tax consultancy, accounting systems and management information services to clients across Nigeria."');
rep('content="business consulting, corporate template, consulting firm, financial advisor, business agency, corporate website, responsive template"',
   'content="chartered accountants, audit and assurance, tax consultancy, accounting systems, management information system, Warri, Delta State, Nigeria"');
rep('<meta name="author" content="theme-village">',
   '<meta name="author" content="Rheriene Mabamidje &amp; Co.">');
rep('<link rel="stylesheet" href="css/style.css">',
   '<link rel="stylesheet" href="css/style.css">\n   <link rel="stylesheet" href="css/rmc.css">');

/* ---------- LOGOS (svg -> rmc png; dark contexts use white variant) ---------- */
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

/* ---------- PROMO / BREADCRUMB ---------- */
rep('src="images/promo-bg.jpg"', 'src="assets/img/about-hero.jpg"');

/* ---------- PROCESS SEC2 (values) ---------- */
rep('<h3>Workflow Optimization</h3>', '<h3>Integrity</h3>');
rep('<h3>Truth & strong ethics</h3>', '<h3>Independence</h3>');
rep('<h3>Reducing expenses</h3>', '<h3>Confidentiality</h3>');
re(/Industry accreditation is a mark of credibility professionalism, and excellence\. It signifies\s+that a business, organization\./g,
   'We uphold the highest ethical standards and act with honesty and transparency in all engagements.');

/* ---------- ABOUT INTRO ---------- */
rep("We used inventiveness and stock analytics to gain our customer's trust.",
   'A firm of Chartered Accountants you can trust.');
rep('We are a corporate consulting agency dedicated to helping organizations grow, optimize operations,\n                     and overcome compl business challenges. Our expertise lies in developing',
   'Incorporated on 20 October 1993, Rheriene Mabamidje &amp; Co. provides audit, tax, accounting and advisory services grounded in professional standards and integrity.');
rep('<a href="services.html" class="btn btn-outline mt-4">View More', '<a href="services.html" class="btn btn-outline mt-4">Our services');

/* ---------- ABOUT STAT ---------- */
rep('url(images/about-3.jpg)', 'url(assets/img/firm.webp)');
rep('<span class="counter">1576</span>+', '<span class="counter">35</span>+');
rep('Successful consulting\n                        projects complete', 'Years of professional\n                        practice');
rep('<span class="sub-title">About Our Consulting</span>', '<span class="sub-title">About Our Firm</span>');
rep('We are creating a bright future. Alongside, Join us.', 'Experienced, licensed and independent professionals.');
rep('<h3 class="h4">Discover & Research</h3>', '<h3 class="h4">Consultation</h3>');
rep('<h3 class="h4">Strategy & Planning</h3>', '<h3 class="h4">Planning</h3>');
rep('<h3 class="h4">Design & Execution</h3>', '<h3 class="h4">Execution</h3>');
re(/We start by understanding your business, audience, and goals to build a tailored digital\s+strategy\./g,
   'We work closely with you at every stage of the engagement.');

/* ---------- STEP SEC ---------- */
rep('<span class="sub-title">steps to success</span>', '<span class="sub-title">How we work</span>');
rep('Steps of recruitment process', 'How we work with clients');
rep('<h3 class="h4">Strategic Thinking</h3>', '<h3 class="h4">Consultation</h3>');
rep('<h3 class="h4">Discovery & Consultation</h3>', '<h3 class="h4">Planning</h3>');
rep('<h3 class="h4">data- driven Insights</h3>', '<h3 class="h4">Execution</h3>');
rep('<h3 class="h4">Monitoring & Optimization</h3>', '<h3 class="h4">Review</h3>');
re(/Bizen offers full range of consultanc training methods for data analysis/g,
   'We plan, execute and review the work so you always know where things stand.');
rep('<p class="lead pt-3">We mix clarity, speed, and experience. <a href="contact.html"> Let\'s Talk <i\n                     class="fa fa-arrow-right"></i></a></p>',
   '<p class="lead pt-3">We combine clarity, experience and a strict adherence to professional standards. <a href="contact.html"> Let\'s Talk <i\n                     class="fa fa-arrow-right"></i></a></p>');

/* ---------- POWER SEC ---------- */
rep('src="images/power-img.jpg"', 'src="assets/img/partner.webp"');
rep('<span class="sub-title text-white">Our Capabilities</span>', '<span class="sub-title text-white">Our Strengths</span>');
rep('We are results-driven and founded on trust.', 'Professional, independent and reliable.');
rep('Visual project management', 'Audit &amp; Assurance');
rep('Team collaboration', 'Tax Consultancy');
rep('Connection to company identity', 'Accounting Systems');
rep('Investment with loyalty', 'Management Information');
re(/(<div id="collapseOne"[\s\S]*?accordion-body[\s\S]*?<p>)[\s\S]*?(<\/p>)/,
   "$1\n                                  We provide statutory and non-statutory audits, giving you independent assurance over your financial statements.\n                               $2");
re(/(<div id="collapseTwo"[\s\S]*?accordion-body[\s\S]*?<p>)[\s\S]*?(<\/p>)/,
   "$1\n                                  We assist with tax planning, compliance and representation so you meet your obligations with confidence.\n                               $2");
re(/(<div id="collapseThree"[\s\S]*?accordion-body[\s\S]*?<p>)[\s\S]*?(<\/p>)/,
   "$1\n                                  We design and implement accounting systems, and help streamline existing ones for accuracy and efficiency.\n                               $2");
re(/(<div id="collapseFive"[\s\S]*?accordion-body[\s\S]*?<p>)[\s\S]*?(<\/p>)/,
   "$1\n                                  We design management information systems and stock control arrangements that support better decisions.\n                               $2");

/* ---------- POWER STATS ---------- */
re(/<div class="row stat-wrap">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
   `<div class="row stat-wrap">
            <div class="col-xl-3 col-md-6">
               <div class="power-stat text-center">
                  <h3 class="h1 text-white mb-0"><span class="counter">35</span>+</h3>
                  <p>Years of practice</p>
               </div>
            </div>
            <div class="col-xl-3 col-md-6">
               <div class="power-stat text-center">
                  <h3 class="h1 text-white mb-0"><span class="counter">7</span></h3>
                  <p>Core services</p>
               </div>
            </div>
            <div class="col-xl-3 col-md-6">
               <div class="power-stat text-center">
                  <h3 class="h1 text-white mb-0"><span class="counter">0</span></h3>
                  <p>Litigation record</p>
               </div>
            </div>
            <div class="col-xl-3 col-md-6">
               <div class="power-stat text-center">
                  <h3 class="h1 text-white mb-0"><span class="counter">1993</span></h3>
                  <p>Year incorporated</p>
               </div>
            </div>
         </div>
      </div>
   </section>`);

/* ---------- TEAM -> LEADERSHIP (single, factual) ---------- */
rep('<span class="sub-title">Our Expert Team </span>', '<span class="sub-title">Leadership</span>');
rep('Meet the consultation team', 'Meet the Managing Partner');
re(/<div class="row gy-5">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
   `<div class="row gy-5 justify-content-center">
            <div class="col-lg-4 col-sm-6">
               <div class="team-entry text-center hover-img">
                  <div class="team-thumb">
                     <a href="#">
                        <img src="assets/img/principal.webp" alt="G. R. Mabamidje" class="img-fluid">
                        <img src="assets/img/principal.webp" alt="G. R. Mabamidje" class="img-fluid">
                     </a>
                  </div>
                  <h3 class="h4 mb-1"><a href="#" class="text-reset">G. R. Mabamidje</a></h3>
                  <span>Managing Partner — MBA, FCA, FCTI, AMNIM</span>
               </div>
            </div>
         </div>
      </div>
   </section>`);

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
