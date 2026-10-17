/* Temp build helper: generate v8/index.html (RMC) from v8/index2.html (Bizen index-3). */
const fs = require('fs');
const SRC = 'v8/index2.html';
const OUT = 'v8/index.html';

let s = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');
const fails = [];

function rep(find, repl, all) {
   const before = s;
   if (all) s = s.split(find).join(repl);
   else {
      const i = s.indexOf(find);
      if (i >= 0) s = s.slice(0, i) + repl + s.slice(i + find.length);
   }
   if (s === before) fails.push('STR ' + JSON.stringify(find.slice(0, 80)));
}
function re(find, repl) {
   const before = s;
   s = s.replace(find, repl);
   if (s === before) fails.push('RE  ' + String(find).slice(0, 90));
}

/* ---------- HEAD ---------- */
rep('<title>Bizen - Business Consulting Template</title>',
   '<title>Rheriene Mabamidje &amp; Co. | Chartered Accountants</title>');
rep('content="Bizen is a modern Business Consulting HTML template designed for consulting firms, corporate agencies, financial advisors, and professional service providers. Clean, responsive, and optimized for high-performance business websites."',
   'content="Rheriene Mabamidje &amp; Co. (RMC) is a firm of Chartered Accountants incorporated in 1993, providing audit and assurance, tax consultancy, accounting systems and management information services to clients across Nigeria."');
rep('content="business consulting, corporate template, consulting firm, financial advisor, business agency, corporate website, responsive template"',
   'content="chartered accountants, audit and assurance, tax consultancy, accounting systems, management information system, Warri, Delta State, Nigeria"');
rep('<meta name="author" content="theme-village">',
   '<meta name="author" content="Rheriene Mabamidje &amp; Co.">');
rep('href="assets/css/', 'href="css/', true);
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

/* ---------- HEADER TOP ---------- */
rep('Top retail digital marketing agency & results-driven business consultants.',
   'Rheriene Mabamidje &amp; Co. — Chartered Accountants, Warri, Delta State.');
rep('<li><a href="#">Contact</a></li>\n                     <li><a href="#">Careers</a></li>\n                     <li><a href="#">Insights</a></li>',
   '<li><a href="about.html">About</a></li>\n                     <li><a href="services.html">Services</a></li>\n                     <li><a href="contact.html">Contact</a></li>');
rep('class="btn btn-outline">Get a quote <span></span>', 'class="btn btn-outline">Get in Touch <span></span>');

/* ---------- MAIN NAV (collapse Bizen demo menu to RMC pages) ---------- */
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

/* ---------- HERO SLIDER ---------- */
rep('data-subtitle="Crafting Complete Strategies That Connect With Your Vision"', 'data-subtitle="Trusted Chartered Accountants Since 1993"');
rep('data-subtitle="Executing Data-Driven Campaigns for Scale and Growth"', 'data-subtitle="Independent Assurance You Can Rely On"');
rep('data-subtitle="Optimizing Digital Infrastructure for Enterprise Success"', 'data-subtitle="Tax, Advisory and Accounting Systems"');
rep("url('images/slider1.jpg')", "url('assets/img/hero-meeting.jpg')");
rep("url('images/slider2.jpg')", "url('assets/img/services-hero.jpg')");
rep("url('images/slider3.jpg')", "url('assets/img/hero-charts.jpg')");
rep('>Business Consulting Agency</span>', '>Chartered Accountants (ICAN Member Firm)</span>', true);
re(/<h1 class="anim2">Building the right[\s\S]*?<\/h1>/,
   '<h1 class="anim2">Trusted <img src="images/h-shape1.png" alt="shape"> accounting, audit &amp; advisory <img src="images/h-shape2.png" alt="shape2"></h1>');
re(/<h1 class="anim2">Deliver ultimate[\s\S]*?<\/h1>/,
   '<h1 class="anim2">Independent <img src="images/h-shape1.png" alt="shape"> assurance for confident <img src="images/h-shape2.png" alt="shape2"> decisions</h1>');
re(/<h1 class="anim2">Turn challenges[\s\S]*?<\/h1>/,
   '<h1 class="anim2">Practical <img src="images/h-shape1.png" alt="shape"> solutions for growing <img src="images/h-shape2.png" alt="shape2"> businesses</h1>');
rep('href="#" class="btn btn-mute">free consultation', 'href="contact.html" class="btn btn-mute">Book a consultation', true);
rep('We’ve 37800 satisfied customers with our services. <a href="#">Let’s Get Started</a>',
   'Serving businesses across Nigeria with integrity since 1993. <a href="about.html">Learn more about us</a>');
rep('Review Mentions Business Consulting', 'Registered with ICAN, OAuGF &amp; FIRS');

/* ---------- ABOUT SEC3 ---------- */
rep('>About Our Company</span>', '>About Our Firm</span>');
rep('The fastest way to boost your business growth', 'A chartered accountancy firm you can rely on');
rep('We believe that the human dimensions essential to start any successful project and that this is\n                     where splendid emotional relationships between',
   'Incorporated on 20 October 1993, Rheriene Mabamidje &amp; Co. has built a reputation for accuracy, independence and a strict adherence to professional standards.');
rep('<h2 class="h3"><span class="counter">60.5</span>k</h2>\n                     <span>Customer Satisfaction</span>',
   '<h2 class="h3"><span class="counter">35</span>+</h2>\n                     <span>Years of practice</span>');
rep('<h3 class="display-2"><span class="counter">15</span>M</h3>\n                        <p>Reach Worldwide empower dreams everywhere.</p>',
   '<h3 class="display-2"><span class="counter">1993</span></h3>\n                        <p>Incorporated as a firm of Chartered Accountants.</p>');
rep('<h3 class="display-2"><span class="counter">8.7</span>X</h3>\n                        <p>Faster Growth starts smart solutions today.</p>',
   '<h3 class="display-2"><span class="counter">7</span></h3>\n                        <p>Core professional services offered to clients.</p>');
rep('Play our reels', 'Meet the firm');

/* ---------- SERVICES SEC3 ---------- */
rep('>Check our services</span>', '>Our Services</span>');
rep('We offer the superior\n               services related to business', 'Professional services that keep your business compliant and in control');
re(/<h3><a href="single-service.html">Marketing Consulting<\/a><\/h3>[\s\S]*?<\/ul>/,
   `<h3><a href="services.html">Audit and Assurance</a></h3>
                              <p>Independent examination of financial statements and internal controls.</p>
                              <h4 class="h6">Assurance</h4>
                              <ul class="ct-list">
                                 <li>Statutory and non-statutory audits</li>
                                 <li>Internal control and compliance review</li>
                              </ul>`);
re(/<h3><a href="single-service.html">Finance consulting<\/a><\/h3>[\s\S]*?<\/ul>/,
   `<h3><a href="services.html">Tax Consultancy Services</a></h3>
                              <p>Sound tax planning, compliance and representation.</p>
                              <h4 class="h6">Advisory</h4>
                              <ul class="ct-list">
                                 <li>Tax planning and returns</li>
                                 <li>FIRS and state revenue compliance</li>
                              </ul>`);
re(/<h3><a href="single-service.html">Business consulting<\/a><\/h3>[\s\S]*?<\/ul>/,
   `<h3><a href="services.html">Accounting Systems</a></h3>
                              <p>Design and implementation of robust accounting systems.</p>
                              <h4 class="h6">Systems</h4>
                              <ul class="ct-list">
                                 <li>Design and implementation of accounting systems</li>
                                 <li>Streamlining of existing accounting systems</li>
                              </ul>`);
re(/<h3><a href="single-service.html">Business Insurances<\/a><\/h3>[\s\S]*?<\/ul>/,
   `<h3><a href="services.html">Management Information</a></h3>
                              <p>Design of management information and stock control systems.</p>
                              <h4 class="h6">Reporting</h4>
                              <ul class="ct-list">
                                 <li>Design of management information systems</li>
                                 <li>Inventory and stock management</li>
                              </ul>`);
rep('images/ser1.jpg', 'assets/img/audit.webp');
rep('images/ser2.jpg', 'assets/img/desk.webp');
rep('images/ser3.jpg', 'assets/img/office.webp');
rep('images/ser4.jpg', 'assets/img/boardroom.webp');

/* ---------- GROWTH SEC2 ---------- */
rep('>Easy step to achieve success</span>', '>How we work</span>');
rep('Converting obstacles into growth possibilities', 'A clear, professional approach to every engagement');
rep('images/growth1.jpg', 'assets/img/firm.webp');
rep('<h3 class="h5">Discover & Research</h3>', '<h3 class="h5">Consultation</h3>');
rep('We start by understanding your business, audience, and goals to build a tailored digital\n                           strategy.</p>\n                      </div>\n                   </div>\n                   <div class="gr-entry d-flex fadeInUp" data-delay=".3">',
   'We begin by understanding your business, records and objectives before scoping the engagement.</p>\n                      </div>\n                   </div>\n                   <div class="gr-entry d-flex fadeInUp" data-delay=".3">');
rep('<h3 class="h5">Strategy & Planning</h3>', '<h3 class="h5">Planning</h3>');
rep('We start by understanding your business, audience, and goals to build a tailored digital\n                           strategy.</p>\n                      </div>\n                   </div>\n                   <div class="gr-entry d-flex fadeInUp" data-delay=".4">',
   'We agree scope, timelines and responsibilities, and plan the fieldwork or advisory work.</p>\n                      </div>\n                   </div>\n                   <div class="gr-entry d-flex fadeInUp" data-delay=".4">');
rep('<h3 class="h5">Design & Execution</h3>', '<h3 class="h5">Execution</h3>');
rep('We start by understanding your business, audience, and goals to build a tailored digital\n                           strategy.</p>\n                      </div>\n                   </div>\n                   <div class="gr-entry d-flex fadeInUp" data-delay=".5">',
   'We carry out the work to professional standards, keeping you informed at every stage.</p>\n                      </div>\n                   </div>\n                   <div class="gr-entry d-flex fadeInUp" data-delay=".5">');
rep('<h3 class="h5">Analyze & Optimize</h3>', '<h3 class="h5">Review</h3>');
rep('We start by understanding your business, audience, and goals to build a tailored digital\n                           strategy.</p>\n                      </div>\n                   </div>\n                </div>',
   'We report our findings clearly and support you in acting on them.</p>\n                      </div>\n                   </div>\n                </div>');

/* ---------- PORTFOLIO / SECTORS ---------- */
rep('>Our Featured Projects</span>', '>Our Experience</span>');
rep('Our Latest Portfolio', 'Sectors we serve');
rep('<a href="#" class="project-category">Management</a>', '<a href="#" class="project-category">Manufacturing</a>');
rep('<h3 class="project-title"><a href="single-project.html">Investment Management</a></h3>',
   '<h3 class="project-title"><a href="services.html">Manufacturing &amp; Industry</a></h3>');
rep('<a href="#" class="project-category">Corporate</a>\n                  <h3 class="project-title"><a href="single-project.html">Business Strategy & Solutions</a></h3>',
   '<a href="#" class="project-category">Public Sector</a>\n                  <h3 class="project-title"><a href="services.html">Government &amp; Public Sector</a></h3>');
rep('<a href="#" class="project-category">Corporate</a>\n                  <h3 class="project-title"><a href="single-project.html">Market Analysis & Research</a></h3>',
   '<a href="#" class="project-category">Oil &amp; Gas</a>\n                  <h3 class="project-title"><a href="services.html">Oil &amp; Gas Services</a></h3>');
rep('<a href="#" class="project-category">Corporate</a>\n                  <h3 class="project-title"><a href="single-project.html">Enhancing Production Workflow</a></h3>',
   '<a href="#" class="project-category">SMEs</a>\n                  <h3 class="project-title"><a href="services.html">SMEs &amp; Cooperatives</a></h3>');
rep('Automating structural continuous integration pipelines for corporate\n                     efficiency.',
   'Audit, tax and accounting systems support delivered to clients across the sector.', true);
rep('View Case <i class="fa fa-plus"></i>', 'Learn more <i class="fa fa-plus"></i>', true);
rep('href="single-service.html"', 'href="services.html"', true);
rep('href="single-project.html"', 'href="services.html"', true);

/* ---------- PROCESS SEC2 ---------- */
rep('<h3>Workflow Optimization</h3>', '<h3>Integrity</h3>');
rep('<h3>Truth & strong ethics</h3>', '<h3>Independence</h3>');
rep('<h3>Reducing expenses</h3>', '<h3>Confidentiality</h3>');
rep('Industry accreditation is a mark of credibility professionalism, and excellence. It signifies\n                         that a business, organization.',
   'We uphold the highest ethical standards and act with honesty and transparency in all engagements.', true);

/* ---------- ABOUT4 SEC4 ---------- */
rep('>Growth Rate</span>', '>Our Firm</span>');
rep('Building Collaboration to Grow Your Opportunities', 'Built on professionalism, integrity and independence');
rep('images/about-2.jpg', 'assets/img/collaboration.webp');
rep('<h3 class="h5 text-white text-center rounded-3">Best Business Consulting Awards </h3>',
   '<h3 class="h5 text-white text-center rounded-3">Chartered Accountants • ICAN Member Firm</h3>');
rep('Our mission is to empowers businesses off our all size too thrive in an businesses ever changing\n                      marketplaces. In today\'s dynamicis business environment, the key to success lies. Exceptionalis\n                      values through out strategic innovative consult business',
   'We help businesses of all sizes strengthen their financial reporting, remain compliant and make well-informed decisions. Our work is grounded in accuracy, confidentiality and a commitment to the public interest.');
rep('<h4>Our Mission</h4>\n                      <p>Our mission is to empower Digen businesses by creating marketing strategies that are not only\n                         effective but sustainable. We believe </p>',
   '<h4>Our Mission</h4>\n                      <p>To provide reliable audit, tax and accounting services that help our clients operate with confidence.</p>');
rep('<h4>Our Vision</h4>\n                      <p>We help you build and maintain a strong social media presence across platforms like Facebook,\n                         Instagram, LinkedIn, and Twitter. </p>',
   '<h4>Our Vision</h4>\n                      <p>To be a trusted firm of Chartered Accountants known for professionalism and integrity.</p>');
rep('<h4 class="h2"><span class="counter">98</span>%</h4>\n                         <p>Average clients satisfied and repeating</p>',
   '<h4 class="h2"><span class="counter">98</span>%</h4>\n                         <p>Clients who return to us year after year</p>');
rep('<h4 class="h2"><span class="counter">175</span>+</h4>\n                         <p>Successfully projects done in 24 countries</p>',
   '<h4 class="h2"><span class="counter">30</span>+</h4>\n                         <p>Years serving clients across Nigeria</p>');

/* ---------- SUPPORT SEC ---------- */
rep('>What We Provide</span>', '>Talk to us</span>');
rep('We’re Helping You 24/7h', 'We are here to help');
rep('<small>Need Your Help</small>\n                            <a href="tel:256-8654-3276">(256) 8654-3276</a>',
   '<small>Call us</small>\n                            <a href="tel:+2348033181681">+234 803 318 1681</a>');
rep('<a href="tel:256-8654-3276">(256) 8654-3276</a>', '<a href="tel:+2348033181681">+234 803 318 1681</a>');
rep('<small>Need Your Help</small>\n                            <a href="mailto:support@bizen.com">support@bizen.com</a>',
   '<small>Email us</small>\n                            <a href="mailto:info@mabamidje.com">info@mabamidje.com</a>');
rep('support@bizen.com', 'info@mabamidje.com', true);

/* ---------- FAQ SEC2 ---------- */
rep('What you need to know before getting started.', 'Answers to common questions from prospective clients.');
rep("we understand the challenges businesses face and the questions that arise along the way. Whether\n                     you're launching a startup, scaling your operations, or seeking expert guidance, we have the\n                     answers.",
   'We understand the questions clients ask before appointing an accountant. Here are answers to some of the most common ones.');
rep('Wanna know about our Business consulting agency? <a href="about.html"><i',
   'Want to know more about our firm? <a href="about.html"><i');
rep('What services does your consulting team provide?', 'What services does the firm provide?');
rep("If you're experiencing slow growth, unclear strategy, inefficiency, or difficulty scaling,\n                              consulting helps you diagnose problems quickly and implement",
   'We provide audit and assurance, tax consultancy, accounting systems and management information services, inventory management and recovery of excess bank charges.');
rep('How do you start working with new clients?', 'How do we start working together?');
rep('Yes, we work on apartments, villas, offices, restaurants, retail stores, hotels, and\n                              other commercial spaces with customized design solutions for every project.',
   'We begin with an initial consultation to understand your needs, then agree scope, timelines and fees before any work begins.');
rep('How long does a consulting project usually take?', 'How long does an engagement take?');
rep('Our process starts with an initial consultation to understand your vision, followed by\n                              concept development, space planning, material selection, 3D visualization, and final\n                              project execution.',
   'Timelines depend on scope. We always agree a schedule with you in advance and keep you informed of progress throughout.');
rep('What makes your consulting service different?', 'What makes your firm different?');
rep('Yes, all our equipment undergoes rigorous inspections and maintenance before delivery\n                              to ensure safety and reliability on your job site.',
   'We combine over 30 years of experience with a strict commitment to professional standards, independence and confidentiality.', true);
rep('Can you help small businesses or startups?', 'Can you help small businesses and startups?');

/* ---------- VIDEO SEC2 ---------- */
rep("url('images/video-bg1.jpg')", "url('assets/img/office.webp')");
rep('Let’s make something great work together. <a class="fw-bold"\n               href="services-2.html">Got a project in mind?</a>',
   'Ready to put your finances in order? <a class="fw-bold"\n               href="contact.html">Speak to us today</a>');

/* ---------- PRICING -> ENGAGEMENT ---------- */
rep('>Our pricing plans</span>', '>How we engage</span>');
rep('Smart Pricing Plans for Business Growth', 'Flexible engagement options for every client');
rep('<h3 class="h4 text-uppercase">Starter Plan</h3>\n                     <p>Ideal for small businesses of starups</p>\n                     <span class="display-2">$250 <sub>/per year</sub></span>',
   '<h3 class="h4 text-uppercase">Assurance &amp; Audit</h3>\n                     <p>For statutory and non-statutory assurance.</p>\n                     <span class="display-2">Scope-based <sub>/per engagement</sub></span>');
rep('<h3 class="h4 text-uppercase">Standard Plan</h3>\n                     <p>Ideal for small businesses of starups</p>\n                     <span class="display-2">$350 <sub>/per year</sub></span>',
   '<h3 class="h4 text-uppercase">Tax &amp; Advisory</h3>\n                     <p>For tax planning and compliance.</p>\n                     <span class="display-2">Scope-based <sub>/per engagement</sub></span>');
rep('<h3 class="h4 text-uppercase">Premium Plan</h3>\n                     <p>Ideal for small businesses of starups</p>\n                     <span class="display-2">$550 <sub>/per year</sub></span>',
   '<h3 class="h4 text-uppercase">Systems &amp; Compliance</h3>\n                     <p>For accounting and information systems.</p>\n                     <span class="display-2">Scope-based <sub>/per engagement</sub></span>');
rep('<li>Basic Branding Package </li>\n                        <li>Custom 5-Page Website</li>\n                        <li>SEO Optimization Basics</li>\n                        <li>Full Brand Strategy & Design</li>\n                        <li>On-Demand Design Revisions</li>',
   '<li>Statutory and non-statutory audits</li>\n                        <li>Internal control review</li>\n                        <li>Compliance and regulatory support</li>\n                        <li>Clear, timely reporting</li>\n                        <li>Professional standards assured</li>');
rep('Choose your plan <i class="fa fa-arrow-right"></i>', 'Enquire now <i class="fa fa-arrow-right"></i>', true);
rep('<a href="#" class="btn d-block">Enquire now', '<a href="contact.html" class="btn d-block">Enquire now', true);

/* ---------- REVIEW SEC3 ---------- */
rep('<p>Market have 2.5k reviews</p>', '<p>Long-standing client relationships</p>');
rep('What Our Customers Say?', 'What our clients say');
rep('More than 99% customer satisfaction is our success.', 'Our clients value our professionalism and reliability.');
rep("<p>We are satisfied with Business Consulting have been absolutely great to work\n                                 with and they definitely have gone above and beyond for us by streamlining all of our\n                                 accounts so that we can focus on do love to do and continue to grow our business.</p>",
   '<p>Our auditors helped us streamline our accounts and improved the reliability of our financial reporting. The engagement was handled with professionalism and care.</p>');
rep('<h4 class="fw-bold h5">Rafael Nadel</h4>', '<h4 class="fw-bold h5">Manufacturing Client</h4>');
rep('<small class="text-mute">CEO, Themevillage Inc</small>', '<small class="text-mute">Warri, Delta State</small>', true);
rep("<p>Giles and his team at Herrington Business Consulting have been absolutely great to work\n                                 with and they definitely have gone above and beyond for us by streamlining all of our\n                                 accounts so that we can focus on do love to do and continue to grow our business.</p>",
   '<p>The firm provided sound tax advice and assisted us in meeting our obligations to the tax authorities on time. We would gladly recommend them.</p>', true);
rep('<h4 class="fw-bold h5">Miller Garison</h4>', '<h4 class="fw-bold h5">Oil &amp; Gas Client</h4>');
rep('<h4 class="fw-bold h5">Henrick M.</h4>', '<h4 class="fw-bold h5">SME Client</h4>');
rep('images/review1.png', 'images/ava1.png', true);

/* ---------- BRANDS -> AFFILIATIONS ---------- */
rep('images/br1.png', 'assets/img/ican.webp');
rep('images/br2.png', 'assets/img/ogn.webp');
rep('images/br3.png', 'assets/img/cac.webp');
rep('images/br4.png', 'assets/img/ican.webp');
rep('images/br5.png', 'assets/img/ogn.webp');
rep('images/br6.png', 'assets/img/cac.webp');

/* ---------- BLOG ---------- */
rep('>Read our blog</span>', '>Insights</span>');
rep('Featured News and Insights', 'News &amp; insights from our practice');
rep('images/bln1.jpg', 'assets/img/audit.webp');
rep('images/bln2.jpg', 'assets/img/desk.webp');
rep('images/bln3.jpg', 'assets/img/boardroom.webp');
rep('<span><a href="#">Marketing</a></span>', '<span><a href="#">Tax</a></span>', true);
rep('<h3><a href="single-post.html">How to Build a Future-Proof Business Strategy</a></h3>',
   '<h3><a href="#">Strengthening Your Internal Controls</a></h3>');
rep('<h3><a href="single-post.html">How to Build a Future-Proof Business Strategy</a></h3>',
   '<h3><a href="#">Understanding Your Tax Obligations</a></h3>');
rep('<h3><a href="single-post.html">How to Build a Future-Proof Business Strategy</a></h3>',
   '<h3><a href="#">Choosing the Right Accounting System</a></h3>');
rep('href="single-post.html"', 'href="#"', true);
rep('<span class="entry-date">Dec 1, 2025</span>', '<span class="entry-date">News</span>', true);

/* ---------- FOOTER ---------- */
rep('<p>123 Matyr Street Suite 5B, Ips Park London, UK SW1A 1AA</p>',
   '<p>Block 3 (Upper Floor), Edewor Shopping Centre, #54 Effurun/Sapele Road, Warri, Delta State, Nigeria</p>');
rep('<a class="text-reset" href="tel:123456789">Phone: +(123) 456 789</a> <br>\n                     <a class="text-reset" href="mailto:info@domainname.com">Email: info@domainname.com</a>',
   '<a class="text-reset" href="tel:+2348033181681">Phone: +234 803 318 1681</a> <br>\n                     <a class="text-reset" href="mailto:info@mabamidje.com">Email: info@mabamidje.com</a>');
rep('© All copyright 2026 by Bizen', '© 2026 Rheriene Mabamidje &amp; Co. All rights reserved.');
rep('<li><a href="#">Home </a></li>\n                        <li><a href="#">Services </a></li>\n                        <li><a href="#">Projects </a></li>\n                        <li><a href="#">Pages</a></li>\n                        <li><a href="#">News </a></li>\n                        <li><a href="#">Contact Us</a></li>',
   '<li><a href="index.html">Home</a></li>\n                        <li><a href="about.html">About</a></li>\n                        <li><a href="services.html">Services</a></li>\n                        <li><a href="contact.html">Contact</a></li>\n                        <li><a href="login.html">Client Login</a></li>');

/* ---------- SECOND PASS (whitespace-tolerant, for multi-line strings) ---------- */
re(/We start by understanding your business, audience, and goals to build a tailored digital\s+strategy\./g,
   'We work closely with you at every stage of the engagement.');
re(/Industry accreditation is a mark of credibility professionalism, and excellence\. It signifies\s+that a business, organization\./g,
   'We uphold the highest ethical standards and act with honesty and transparency in all engagements.');
re(/Our mission is to empowers businesses off our all size too thrive in an businesses ever changing\s+marketplaces\. In today's dynamicis business environment, the key to success lies\. Exceptionalis\s+values through out strategic innovative consult business/g,
   'We help businesses of all sizes strengthen their financial reporting, remain compliant and make well-informed decisions. Our work is grounded in accuracy, confidentiality and a commitment to the public interest.');
re(/<h4>Our Mission<\/h4>\s*<p>Our mission is to empower Digen businesses by creating marketing strategies that are not only\s+effective but sustainable\. We believe <\/p>/,
   '<h4>Our Mission</h4>\n                      <p>To provide reliable audit, tax and accounting services that help our clients operate with confidence.</p>');
re(/<h4>Our Vision<\/h4>\s*<p>We help you build and maintain a strong social media presence across platforms like Facebook,\s+Instagram, LinkedIn, and Twitter\. <\/p>/,
   '<h4>Our Vision</h4>\n                      <p>To be a trusted firm of Chartered Accountants known for professionalism and integrity.</p>');
re(/<h4 class="h2"><span class="counter">98<\/span>%<\/h4>\s*<p>Average clients satisfied and repeating<\/p>/,
   '<h4 class="h2"><span class="counter">98</span>%</h4>\n                         <p>Clients who return to us year after year</p>');
re(/<h4 class="h2"><span class="counter">175<\/span>\+<\/h4>\s*<p>Successfully projects done in 24 countries<\/p>/,
   '<h4 class="h2"><span class="counter">30</span>+</h4>\n                         <p>Years serving clients across Nigeria</p>');
re(/<small>Need Your Help<\/small>\s*<a href="tel:\+2348033181681">\+234 803 318 1681<\/a>/,
   '<small>Call us</small>\n                            <a href="tel:+2348033181681">+234 803 318 1681</a>');
re(/<small>Need Your Help<\/small>\s*<a href="mailto:info@mabamidje\.com">info@mabamidje\.com<\/a>/,
   '<small>Email us</small>\n                            <a href="mailto:info@mabamidje.com">info@mabamidje.com</a>');

fs.writeFileSync(OUT, s);
console.log('WROTE', OUT, s.length, 'bytes');
console.log('FAILED', fails.length);
fails.forEach((f) => console.log('  ' + f));
