/* Builds v9/about.html from the Exrox template about page with RMC content. */
const { RMC, readRef, apply, applySoft, applyRegex, shared, write } = require('./_v9_common.cjs');

let html = readRef('about-us.html');

html = shared(html, {
  title: `About Us | ${RMC.namePlain}`,
  description: 'Rheriene Mabamidje & Co. is a chartered accountancy firm in Warri, Delta State, incorporated in 1993 and registered with ICAN, the OAGF and the FIRS.',
  active: 'about.html',
  hasTopBar: true
});

html = applySoft(html, [
  ['href="service-details.html"', 'href="services.html"'],
  ['href="leader-details.html"', 'href="about.html"'],
  ['href="appointment.html"', 'href="contact.html"']
], 'links');

/* ---------------- breadcrumb ---------------- */
html = apply(html, [
  ['<img src="assets/img/breadcrumb/br-1.jpg" alt="Image" class="w-100 h-100 object-fit-cover">',
    '<img src="assets/img/rmc/about-hero.jpg" alt="RMC office" class="w-100 h-100 object-fit-cover">']
], 'breadcrumb');

/* ---------------- about us section ---------------- */
html = apply(html, [
  ['Founded in 2005 by Jackie Guillermo, CPA, Exrox began as a boutique accounting firm serving small businesses in Chicago. After recognizing that clients needed both compliance expertise and growth strategy, we evolved into a full-service advisory firm.',
    'Rheriene Mabamidje &amp; Co. was incorporated on 20 October 1993 in Warri, Delta State. What began as a local accounting practice serving businesses in Warri grew into a full-service firm carrying audit, tax and accounting systems work for clients across the country.'],
  ['<img src="assets/img/about/about-img-10.jpg" alt="Image" class="w-100 round-20">',
    '<img src="assets/img/rmc/office.webp" alt="RMC office" class="w-100 round-20">'],
  ['Today, we serve 200+ clients nationwide with a team of 15 CPAs and business advisors, specializing in industry-specific financial solutions.',
    'A chartered accountancy practice led by the Managing Partner and supported by qualified accountants, auditors and tax practitioners.'],
  ['<h4 class="text-title fw-semibold"><span class="counter fw-bold transition">99</span>%</h4>',
    '<h4 class="text-title fw-semibold"><span class="counter fw-bold transition">1993</span></h4>'],
  ['<span class="fs-xxl-18 d-block">Professional Advisors</span>',
    '<span class="fs-xxl-18 d-block">Year Incorporated</span>'],
  ['<h4 class="text-title fw-semibold"><span class="counter fw-bold transition">15</span>K+</h4>',
    '<h4 class="text-title fw-semibold"><span class="counter fw-bold transition">07</span></h4>'],
  ['<span class="fs-xxl-18 d-block">Completed Projects</span>',
    '<span class="fs-xxl-18 d-block">Core Service Areas</span>'],
  ['<h4 class="text-title fw-semibold"><span class="counter fw-bold transition">98</span>%</h4>',
    '<h4 class="text-title fw-semibold"><span class="counter fw-bold transition">33</span></h4>'],
  ['<span class="fs-xxl-18 d-block">Client Retention</span>',
    '<span class="fs-xxl-18 d-block">Years In Practice</span>'],
  ['<h6 class="fs-18 font-primary fw-normal text-title mb-40">ACHIEVEMENTS</h6>',
    '<h6 class="fs-18 font-primary fw-normal text-title mb-40">PROFESSIONAL REGISTRATIONS</h6>'],
  ['<span class="fs-18 fw-semibold">Name of the award</span>',
    '<span class="fs-18 fw-semibold">Registration</span>'],
  ['<span class="fs-18 fw-semibold">Year</span>',
    '<span class="fs-18 fw-semibold">Status</span>'],
  ['<span class="fs-20 font-secondary fw-semibold text-title">Best Accounting & Consulting Firm</span>',
    '<span class="fs-20 font-secondary fw-semibold text-title">Institute of Chartered Accountants of Nigeria</span>'],
  ['<span class="fs-20 font-secondary fw-semibold text-title">Top 100 Financial Advisors In South Asia</span>',
    '<span class="fs-20 font-secondary fw-semibold text-title">Office of the Auditor-General of the Federation</span>'],
  ['<span class="fs-20 font-secondary fw-semibold text-title">Client Choice Award</span>',
    '<span class="fs-20 font-secondary fw-semibold text-title">Federal Inland Revenue Service</span>'],
  ['<span class="fs-20 font-secondary fw-semibold text-title">2026</span>',
    '<span class="fs-20 font-secondary fw-semibold text-title">Member Firm</span>'],
  ['<span class="fs-20 font-secondary fw-semibold text-title">2022</span>',
    '<span class="fs-20 font-secondary fw-semibold text-title">Registered</span>'],
  ['<span class="fs-20 font-secondary fw-semibold text-title">2023</span>',
    '<span class="fs-20 font-secondary fw-semibold text-title">Registered</span>'],
  ['<h6>“We don’t just balance books—we build better businesses.”</h6>',
    '<h6>Clear books, clear decisions, a business built to last.</h6>'],
  ['<img src="assets/img/about/ceo.jpg" alt="Image" class="rounded-circle">',
    '<img src="assets/img/rmc/managing-partner.webp" alt="Managing Partner" class="rounded-circle">'],
  ['<h5 class="fs-20 fw-bold mb-6">Carrie Wallace</h5>',
    `<h5 class="fs-20 fw-bold mb-6">${RMC.partner}</h5>`],
  ['<span class="text-title fs-xxl-18">Founder & CEO</span>',
    `<span class="text-title fs-xxl-18">${RMC.partnerRole} &mdash; ${RMC.partnerCreds}</span>`],
  ['24/7 CALL US:', 'CALL US:'],
  ['+1 (808) 360-9282', RMC.phone]
], 'about-us');

/* ---------------- mission & approach ---------------- */
html = apply(html, [
  ['<p class="fs-xxl-18 mb-0">Our mission is to provide accurate, transparent, and strategic financial solutions that drive lasting business success.</p>',
    '<p class="fs-xxl-18 mb-0">Our mission is to provide accurate, transparent and properly audited financial information that lets business owners act with confidence.</p>'],
  ['<p class="fs-xxl-18 text-title mb-0">To be the most trusted partner for transformative financial solutions, driving sustainable success for businesses worldwide.</p>',
    '<p class="fs-xxl-18 text-title mb-0">To be the chartered accountancy firm that Warri businesses turn to for audits, tax and accounting systems, and keep for the quality of the work.</p>'],
  ['<img src="assets/img/about/about-img-2.jpg" alt="Image" class="round-15">',
    '<img src="assets/img/rmc/team-meeting.webp" alt="RMC team" class="round-15">'],
  ['<h3 class="fs-24">Trust Builders</h3>',
    '<h3 class="fs-24">What You Can Expect</h3>'],
  ['<li class="fs-xxl-18 position-relative"><img src="assets/img/icons/check.svg" alt="Icon" class="position-absolute start-0">Certified Accountants & Tax Advisors</li>',
    '<li class="fs-xxl-18 position-relative"><img src="assets/img/icons/check.svg" alt="Icon" class="position-absolute start-0">Chartered Accountants &amp; Tax Practitioners</li>'],
  ['<li class="fs-xxl-18 position-relative"><img src="assets/img/icons/check.svg" alt="Icon" class="position-absolute start-0">Tech-Driven Financial Reporting</li>',
    '<li class="fs-xxl-18 position-relative"><img src="assets/img/icons/check.svg" alt="Icon" class="position-absolute start-0">Accounting Systems &amp; Management Information</li>'],
  ['<li class="fs-xxl-18 position-relative"><img src="assets/img/icons/check.svg" alt="Icon" class="position-absolute start-0">Transparent & Scalable Pricing</li>',
    '<li class="fs-xxl-18 position-relative"><img src="assets/img/icons/check.svg" alt="Icon" class="position-absolute start-0">Transparent &amp; Agreed Fee Estimates</li>'],
  ['<li class="fs-xxl-18 position-relative"><img src="assets/img/icons/check.svg" alt="Icon" class="position-absolute start-0">20+ Years Of Industry Experience</li>',
    '<li class="fs-xxl-18 position-relative"><img src="assets/img/icons/check.svg" alt="Icon" class="position-absolute start-0">33 Years Of Continuous Practice</li>'],
  ['<h3 class="text-white fs-24 fw-bold mb-32">A growing team of 50+ professionals, including CPAs, tax specialists, and audit experts.</h3>',
    '<h3 class="text-white fs-24 fw-bold mb-32">A chartered accountancy practice led from Warri, with audit, tax and accounting systems specialists on the same team.</h3>'],
  ['<img src="assets/img/about/about-img-4.png" alt="Image" class="about-img move-left-two">',
    '<img src="assets/img/rmc/audit.webp" alt="Audit work" class="about-img move-left-two">'],
  ['<img src="assets/img/about/logo-text.png" alt="Image" class="logo-text position-absolute bottom-0 end-0 z-n1">',
                                        '<span class="about-watermark position-absolute bottom-0 end-0 z-n1 text-white fw-bold">RMC</span>']
], 'mission');

/* ---------------- why choose us ---------------- */
html = apply(html, [
  ['<h6 class="fs-18 font-primary fw-normal text-title reveal-text-right mb-15">Why Choose Exrox?</h6>',
    '<h6 class="fs-18 font-primary fw-normal text-title reveal-text-right mb-15">Why Choose RMC?</h6>'],
  ['<h2 class="section-title style-two fw-semibold text-title mb-35 reveal-text-bottom">We\'re not just accountants - we\'re strategic partners invested in your financial success</h2>',
    '<h2 class="section-title style-two fw-semibold text-title mb-35 reveal-text-bottom">We\'re not just accountants &mdash; we\'re the chartered accountants your records have to satisfy</h2>'],
  ['<img src="assets/img/about/wh-img-3.jpg" alt="Image" class="round-20">',
    '<img src="assets/img/rmc/boardroom.webp" alt="Image" class="round-20">'],
  ['<img src="assets/img/about/wh-img-4.jpg" alt="Image" class="round-20">',
    '<img src="assets/img/rmc/collaboration.webp" alt="Image" class="round-20">'],
  ['<h3 class="fs-24 fw-bold">1. Client-First Approach</h3>',
    '<h3 class="fs-24 fw-bold">1. Local Knowledge, Close Access</h3>'],
  ['<p class="fs-xxl-18 mb-0">Dedicated account managers who learn your business and become an extension of your team.</p>',
    '<p class="fs-xxl-18 mb-0">We work from Warri, for Warri businesses, and know the regulators, industries and reporting cycles here.</p>'],
  ['<h3 class="fs-24 fw-bold">2. Tech-Enabled Solutions</h3>',
    '<h3 class="fs-24 fw-bold">2. Systems Built To Be Used</h3>'],
  ['<p class="fs-xxl-18 mb-0">Cloud-based platforms give you real-time financial insights from anywhere, anytime.</p>',
    '<p class="fs-xxl-18 mb-0">Accounting systems and management information designed around how your team actually works.</p>'],
  ['<h3 class="fs-24 fw-bold">3. Growth Focused</h3>',
    '<h3 class="fs-24 fw-bold">3. Audit-Ready Discipline</h3>'],
  ['<p class="fs-xxl-18 mb-0">We identify opportunities, not just compliance requirements, to help scale your business.</p>',
    '<p class="fs-xxl-18 mb-0">Records maintained so they can be examined, not reconstructed the week before the audit.</p>'],
  ['<h3 class="fs-24 fw-bold">4. Ironclad Security</h3>',
    '<h3 class="fs-24 fw-bold">4. Regulatory Standing</h3>'],
  ['<p class="fs-xxl-18 mb-0">Enterprise-grade data protection with 256-bit encryption and SOC 2 compliant systems.</p>',
    '<p class="fs-xxl-18 mb-0">ICAN member firm, registered with the OAGF and the FIRS for statutory and tax work.</p>'],
  ['<h3 class="fs-24 fw-bold">5. Proactive Advice</h3>',
    '<h3 class="fs-24 fw-bold">5. Proactive Advice</h3>'],
  ['<p class="fs-xxl-18 mb-0">Quarterly strategy sessions to anticipate challenges before they become problems.</p>',
    '<p class="fs-xxl-18 mb-0">Tax deadlines, reporting cycles and stock counts anticipated before they become problems.</p>'],
  ['<h3 class="fs-24 fw-bold">6. Proven Results</h3>',
    '<h3 class="fs-24 fw-bold">6. Continuity</h3>'],
  ['<p class="fs-xxl-18 mb-0">Dedicated account managers for personalized service before they become problems.</p>',
    '<p class="fs-xxl-18 mb-0">The team that designs your system supports it after go-live, not a handover letter.</p>']
], 'why');

/* ---------------- team section: only the Managing Partner ---------------- */
html = applyRegex(html,
  /<!-- Team Section Start -->[\s\S]*?<!-- Team Section End -->/,
  `<!-- Team Section Start -->
                    <div class="container style-one pb-90">
                        <div class="row">
                            <div class="col-xl-8 offset-xl-2">
                                <h2 class="section-title style-two fw-semibold text-center reveal-text-bottom mb-45">
                                The <span class="position-relative z-1">Chartered Accountant</span> Leading RMC
                                </h2>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-xl-4 col-md-6">
                                <div class="team-card style-one img-hover-zoom position-relative mb-30" data-cue="anim-left" data-delay="200">
                                    <div class="team-img img-zoom position-relative z-1 overflow-hidden round-20">
                                        <img src="assets/img/rmc/managing-partner.webp" alt="${RMC.partner}" class="transition round-20">
                                        <div class="team-info d-flex flex-wrap align-items-center justify-content-between">
                                            <div>
                                                <h3 class="fs-20 fw-bold mb-10">${RMC.partner}</h3>
                                                <span class="fs-xxl-18 text-gray d-block lh-1">${RMC.partnerRole}</span>
                                            </div>
                                            <a href="mailto:${RMC.email}" class="mail-link d-flex flex-column align-items-center justify-content-center rounded-circle transition"><i class="ri-mail-fill"></i></a>
                                        </div>
                                    </div>
                                    <h6 class="fs-18 font-primary fw-normal text-title mb-15">AREAS OF EXPERTISE</h6>
                                    <ul class="skill-list list-unstyled mb-0">
                                        <li class="fs-xxl-18 d-inline-block"><a href="services.html">Audit &amp; Assurance</a></li>
                                        <li class="fs-xxl-18 d-inline-block"><a href="services.html">Tax Consultancy</a></li>
                                        <li class="fs-xxl-18 d-inline-block"><a href="services.html">Accounting Systems</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Team Section End -->`,
  'team');

/* ---------------- testimonials removed: no client quotes to publish ---------------- */
html = applyRegex(html, /\n\s*<!-- Testimonial Section Start -->[\s\S]*?<!-- Testimonial Section End -->\n/, '\n', 'testimonials');

/* ---------------- brand section -> professional registrations ---------------- */
html = applyRegex(html,
  /<div class="container ptb-120">\s*<div class="row align-items-center">\s*<div class="col-xxl-5 col-xl-4 col-lg-5 mb-md-20">\s*<h6 class="fs-18 font-primary fw-normal mb-0 reveal-text-right">OUR ESTEEMED CLIENTS<\/h6>[\s\S]*?<!-- Brand Section End -->/,
  `<div class="container ptb-120">
                        <div class="row align-items-center">
                            <div class="col-xxl-5 col-xl-4 col-lg-5 mb-md-20">
                                <h6 class="fs-18 font-primary fw-normal mb-0 reveal-text-right">PROFESSIONAL REGISTRATIONS</h6>
                            </div>
                            <div class="col-xxl-7 col-xl-8 col-lg-7">
                                <div class="brand-logo-wrap style-one d-flex flex-wrap align-items-center" data-cue="slideInUp" data-delay="200">
                                    <div class="brand-logo d-flex flex-column align-items-center justify-content-center style-one round-20">
                                        <img src="assets/img/rmc/ican.webp" alt="Institute of Chartered Accountants of Nigeria" class="d-block mx-auto">
                                    </div>
                                    <div class="brand-logo d-flex flex-column align-items-center justify-content-center style-one round-20">
                                        <img src="assets/img/rmc/ogn.webp" alt="Office of the Auditor-General of the Federation" class="d-block mx-auto">
                                    </div>
                                    <div class="brand-logo d-flex flex-column align-items-center justify-content-center style-one round-20">
                                        <img src="assets/img/rmc/cac.webp" alt="Federal Inland Revenue Service" class="d-block mx-auto">
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <p class="fs-xxl-18 text-para mb-0">Registered with the Office of the Auditor-General of the Federation and the Federal Inland Revenue Service, so statutory, public-sector and tax engagements are handled in-country.</p>
                            </div>
                        </div>
                    </div>
                    <!-- Brand Section End -->`,
  'registrations');

write('about.html', html, 'about');
