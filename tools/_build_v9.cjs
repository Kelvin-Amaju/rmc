/* Builds v9/index.html from the Exrox template home page with RMC content. */
const { RMC, SERVICES, readRef, apply, applyAll, applySoft, applyRegex, shared, write } = require('./_v9_common.cjs');

const ICON_RIGHT = `<span class="btn-icon-one d-flex flex-column align-items-center justify-content-center rounded-circle transition"><img src="assets/img/icons/right-arrow.svg" alt="Icon" class="d-block mx-auto"></span>
                                            <span class="btn-text fw-bold d-flex flex-column align-items-center justify-content-center transition">Discover more</span>
                                            <span class="btn-icon-two d-flex flex-column align-items-center justify-content-center rounded-circle transition"><img src="assets/img/icons/right-arrow.svg" alt="Icon" class="d-block mx-auto"></span>`;

let html = readRef('index.html');

html = shared(html, {
  title: `${RMC.namePlain} — Chartered Accountants | Warri, Delta State`,
  description: 'Rheriene Mabamidje & Co. is a chartered accountancy firm in Warri, Delta State providing audit and assurance, tax consultancy, accounting systems and management information services since 1993.',
  active: 'index.html',
  hasTopBar: false
});

/* ---------------- links ---------------- */
html = applySoft(html, [
  ['href="about-us.html"', 'href="about.html"'],
  ['href="service-details.html"', 'href="services.html"'],
  ['href="appointment.html"', 'href="contact.html"'],
  ['href="case-details.html"', 'href="services.html"'],
  ['href="blog-details-right-sidebar.html"', 'href="services.html"'],
  ['href="posts-by-category.html"', 'href="services.html"'],
  ['href="posts-by-date.html"', 'href="services.html"'],
  ['href="leader-details.html"', 'href="about.html"']
], 'links');

/* ---------------- hero ---------------- */
html = applyAll(html, [
  ['<img src="assets/img/hero/hero-slide-1.jpg" alt="Image" class="w-100 h-100 object-fit-cover">',
    '<img src="assets/img/rmc/hero-meeting.jpg" alt="RMC team in a client meeting" class="w-100 h-100 object-fit-cover">'],
  ['<img src="assets/img/hero/hero-slide-2.jpg" alt="Image" class="w-100 h-100 object-fit-cover">',
    '<img src="assets/img/rmc/hero-office.jpg" alt="RMC office in Warri" class="w-100 h-100 object-fit-cover">'],
  ['<img src="assets/img/hero/hero-slide-3.jpg" alt="Image" class="w-100 h-100 object-fit-cover">',
    '<img src="assets/img/rmc/hero-charts.jpg" alt="Financial reporting review" class="w-100 h-100 object-fit-cover">'],

  ['<h1 class="fw-bold text-white title-anim">Elevate Your Business With Expert <b class="fw-bold text_secondary">Accounting & Consulting</b></h1>',
    '<h1 class="fw-bold text-white title-anim">Chartered Accountants For <b class="fw-bold text_secondary">Warri And Beyond</b></h1>'],
  ['<h1 class="fw-bold text-white reveal-text-bottom" >Strategic Financial Solutions For <b class="fw-bold text_secondary">Sustainable Growth</b></h1>',
    '<h1 class="fw-bold text-white reveal-text-bottom">Independent Audit, Tax And <b class="fw-bold text_secondary">Financial Clarity</b></h1>'],
  ['<h1 class="fw-bold text-white reveal-text-bottom" >Where Accounting Meets Innovation <b class="fw-bold text_secondary">Build Smarter With Exrox</b></h1>',
    '<h1 class="fw-bold text-white reveal-text-bottom">Accounting Systems And MIS <b class="fw-bold text_secondary">Built Around Your Business</b></h1>'],

  ['<h3 class="text-white fw-semibold lh-1 mb-0">20+</h3>',
    '<h3 class="text-white fw-semibold lh-1 mb-0">33</h3>'],
  ['<span class="text-white fs-xxl-18 d-block mb-22">Years Of Expertise</span>',
    '<span class="text-white fs-xxl-18 d-block mb-22">Years Of Practice</span>'],
  ['<p class="fs-xxl-18 text-white">Tailored accounting and management strategies to optimize performance and reduce risks.</p>',
    '<p class="fs-xxl-18 text-white">Statutory and non-statutory audit, tax consultancy, accounting systems and management information — delivered by one Warri-based firm.</p>']
], 'hero');

html = applyRegex(html, /<p class="text-white fs-xxl-18 mb-0">2,250\+[^<]*businesses are trusting us\.<\/p>/,
  '<p class="text-white fs-xxl-18 mb-0">Audit, tax and accounting systems under one roof.</p>', 'hero-stat');

/* Hero contact strip replaces the template's social links. */
html = applyRegex(html, /<ul class="social-profile style-five d-flex flex-column align-items-start list-unstyled mb-0">[\s\S]*?<\/ul>/,
  `<ul class="social-profile style-five d-flex flex-column align-items-start list-unstyled mb-0">
                                                        <li class="fs-xxl-18"><a href="${RMC.phoneHref}" class="d-flex flex-column align-items-center justify-content-center rounded-circle">Call</a></li>
                                                        <li class="fs-xxl-18"><a href="mailto:${RMC.email}" class="d-flex flex-column align-items-center justify-content-center rounded-circle">Email</a></li>
                                                        <li class="fs-xxl-18"><a href="about.html" class="d-flex flex-column align-items-center justify-content-center rounded-circle">About</a></li>
                                                    </ul>`, 'hero-strip');

/* Hero registration badges instead of stock client avatars. */
html = applyRegex(html, /<ul class="client-list list-unstyled mb-2">[\s\S]*?<\/ul>/,
  `<ul class="reg-list list-unstyled mb-2">
                                                            <li>ICAN Member Firm</li>
                                                            <li>OAGF Registered</li>
                                                            <li>FIRS Registered</li>
                                                        </ul>`, 'hero-badges');

/* ---------------- promo timeline ---------------- */
html = apply(html, [
  ['<span class="font-secondary text-title fw-semibold">2005</span>',
    '<span class="font-secondary text-title fw-semibold">1993</span>'],
  ['<p class="fs-xxl-18 text-title mb-0">Founded with focus on small business tax optimization</p>',
    '<p class="fs-xxl-18 text-title mb-0">Incorporated on 20 October 1993 in Warri, Delta State</p>'],
  ['<span class="font-secondary text-title fw-semibold">2015</span>',
    '<span class="font-secondary text-title fw-semibold">ICAN</span>'],
  ['<p class="fs-xxl-18 text-title mb-0">Expanded to offer CFO advisory for startups</p>',
    '<p class="fs-xxl-18 text-title mb-0">Member firm of the Institute of Chartered Accountants of Nigeria</p>'],
  ['<span class="font-secondary text-title fw-semibold">2026</span>',
    '<span class="font-secondary text-title fw-semibold">FEDERAL</span>'],
  ['<p class="fs-xxl-18 text-title mb-0">Recognized as Top 50 Accounting Firms by Forbes</p>',
    '<p class="fs-xxl-18 text-title mb-0">Registered with the Office of the Auditor-General of the Federation and the FIRS</p>']
], 'promo');

/* ---------------- about ---------------- */
html = apply(html, [
  ['Exrox was founded in 2005 with a simple mission: to empower businesses with financial clarity and strategic direction. What began as a small accounting firm has evolved into a full-service consultancy serving 500+ clients across multiple industries.',
    'Rheriene Mabamidje &amp; Co. was incorporated on 20 October 1993 in Warri, Delta State with a simple mission: to give businesses clear, dependable financial information and the professional assurance that comes with it. Three decades on, the practice still works the same way — carefully, locally and to the standard of the institute.'],
  ['<img src="assets/img/about/about-img-1.jpg" alt="Image" class="w-100 round-20">',
    '<img src="assets/img/rmc/portrait.webp" alt="RMC office" class="w-100 round-20">'],
  ['Exrox is a forward-thinking accounting and management consulting firm committed to helping businesses thrive with clarity, confidence, and control.',
    'A chartered accountancy practice committed to helping businesses thrive with clarity, confidence and control.'],
  ['<h4 class="text-title fw-semibold"><span class="counter fw-bold transition">99</span>%</h4>\n                                                <span class="fs-xxl-18 d-block">Professional Advisors</span>',
    '<h4 class="text-title fw-semibold"><span class="counter fw-bold transition">33</span></h4>\n                                                <span class="fs-xxl-18 d-block">Years Of Practice</span>'],
  ['<h4 class="text-title fw-semibold"><span class="counter fw-bold transition">15</span>K+</h4>\n                                                <span class="fs-xxl-18 d-block">Completed Projects</span>',
    '<h4 class="text-title fw-semibold"><span class="counter fw-bold transition">07</span></h4>\n                                                <span class="fs-xxl-18 d-block">Core Service Areas</span>'],
  ['<h4 class="text-title fw-semibold"><span class="counter fw-bold transition">98</span>%</h4>\n                                                <span class="fs-xxl-18 d-block">Client Retention</span>',
    '<h4 class="text-title fw-semibold"><span class="counter fw-bold transition">03</span></h4>\n                                                <span class="fs-xxl-18 d-block">Professional Registrations</span>'],
  ['<h6 class="fs-18 font-primary fw-normal text-title mb-40">ACHIEVEMENTS</h6>',
    '<h6 class="fs-18 font-primary fw-normal text-title mb-40">PROFESSIONAL REGISTRATIONS</h6>'],
  ['<span class="fs-18 fw-semibold">Name of the award</span>\n                                                            <span class="fs-18 fw-semibold">Year</span>',
    '<span class="fs-18 fw-semibold">Registration</span>\n                                                            <span class="fs-18 fw-semibold">Status</span>'],
  ['<span class="fs-20 font-secondary fw-semibold text-title">Best Accounting & Consulting Firm</span>\n                                                            <span class="fs-20 font-secondary fw-semibold text-title">2026</span>',
    '<span class="fs-20 font-secondary fw-semibold text-title">Institute of Chartered Accountants of Nigeria</span>\n                                                            <span class="fs-20 font-secondary fw-semibold text-title">Member Firm</span>'],
  ['<span class="fs-20 font-secondary fw-semibold text-title">Top 100 Financial Advisors In South Asia</span>\n                                                            <span class="fs-20 font-secondary fw-semibold text-title">2022</span>',
    '<span class="fs-20 font-secondary fw-semibold text-title">Office of the Auditor-General of the Federation</span>\n                                                            <span class="fs-20 font-secondary fw-semibold text-title">Registered</span>'],
  ['<span class="fs-20 font-secondary fw-semibold text-title">Client Choice Award</span>\n                                                            <span class="fs-20 font-secondary fw-semibold text-title">2023</span>',
    '<span class="fs-20 font-secondary fw-semibold text-title">Federal Inland Revenue Service</span>\n                                                            <span class="fs-20 font-secondary fw-semibold text-title">Registered</span>'],
  ['<h6>“We don’t just balance books—we build better businesses.”</h6>',
    '<h6>Clear books, clear decisions, a business built to last.</h6>'],
  ['<img src="assets/img/about/ceo.jpg" alt="Image" class="rounded-circle">',
    '<img src="assets/img/rmc/managing-partner.webp" alt="Managing Partner" class="rounded-circle">'],
  ['<h5 class="fs-20 fw-bold mb-6">Carrie Wallace</h5>',
    `<h5 class="fs-20 fw-bold mb-6">${RMC.partner}</h5>`],
  ['<span class="text-title fs-xxl-18">Founder & CEO</span>',
    `<span class="text-title fs-xxl-18">${RMC.partnerRole} — ${RMC.partnerCreds}</span>`],
  ['24/7 CALL US:', 'CALL US:'],
  ['+1 (808) 360-9282', RMC.phone]
], 'about');

/* ---------------- why choose us ---------------- */
html = apply(html, [
  ['<h4 class="section-subtitle fs-18 fw-normal font-primary mb-50">WHY CHOOSE EXROX?</h4>',
    '<h4 class="section-subtitle fs-18 fw-normal font-primary mb-50">WHY CHOOSE RMC?</h4>'],
  ['<span class="fw-semibold text-title me-1">Certified Professionals:</span>CPA, CMA, and MBA-qualified team.',
    '<span class="fw-semibold text-title me-1">Qualified Professionals:</span>An FCA-led team (MBA, FCA, FCTI, AMNIM).'],
  ['<span class="fw-semibold text-title me-1">Industry Specialization:</span>Deep knowledge in [e.g., healthcare, tech, manufacturing].',
    '<span class="fw-semibold text-title me-1">Breadth of Service:</span>Audit, tax, accounting systems and management information.'],
  ['<span class="fw-semibold text-title me-1">Tech-Forward:</span>Leveraging AI-driven tools for precision and efficiency.',
    '<span class="fw-semibold text-title me-1">Locally Registered:</span>Registered with the OAGF and the FIRS for in-country delivery.'],
  ['<p class="fs-xxl-18 mb-10">"We listen first—your goals shape our strategies."</p>',
    '<p class="fs-xxl-18 mb-10">"Your records should be ready for an auditor, not built for one."</p>'],
  ['<p class="fs-xxl-18 mb-25">Dedicated account managers for personalized service.</p>',
    '<p class="fs-xxl-18 mb-25">The same team that designs your system supports it afterwards.</p>'],
  ['<img src="assets/img/about/wh-img-1.jpg" alt="Image" class="round-10">',
    '<img src="assets/img/rmc/collaboration.webp" alt="Image" class="round-10">'],
  ['<img src="assets/img/about/wh-img-2.jpg" alt="Image" class="w-100 round-10">',
    '<img src="assets/img/rmc/office.webp" alt="Image" class="w-100 round-10">'],
  ['<h3 class="fs-24 text-white mb-22">Proven Results</h3>',
    '<h3 class="fs-24 text-white mb-22">Practical Deliverables</h3>'],
  ['<p class="fs-xxl-18 text-white mb-2">Customer Satisfaction</p>',
    '<p class="fs-xxl-18 text-white mb-2">Years In Practice</p>'],
  ['<span class="d-inline-block lh-1 fs-18 fs-xxl-24 fw-bold text-white me-2">5.0</span>',
    '<span class="d-inline-block lh-1 fs-18 fs-xxl-24 fw-bold text-white me-2">33</span>'],
  ['<li class="position-relative fs-xxl-18 text-gray">*"$2B+ in client assets managed"*</li>',
    '<li class="position-relative fs-xxl-18 text-gray">Audit-ready financial statements</li>'],
  ['<li class="position-relative fs-xxl-18 text-gray">"90% client retention rate over 5 years"</li>',
    '<li class="position-relative fs-xxl-18 text-gray">Recovery of excess bank charges</li>']
], 'why');

/* ---------------- services slider ---------------- */
const serviceSlides = SERVICES.map((s, i) => `                                <div class="swiper-slide">
                                    <div class="service-card style-one${i === 0 ? ' active' : ''}">
                                        <img src="${s.icon}" alt="Icon">
                                        <h3 class="fs-24"><a href="services.html" class="text-white link-hover-white transition">${s.title}</a></h3>
                                        <p class="fs-xxl-18">${s.desc}</p>
                                        <a href="services.html" class="btn style-one d-inline-flex align-items-center">
                                            ${ICON_RIGHT}
                                        </a>
                                    </div>
                                </div>`).join('\n');

html = applyRegex(html, /<div class="service-slider-one swiper">\s*<div class="swiper-wrapper">[\s\S]*?<\/div>\s*<div class="slider-btn/,
  `<div class="service-slider-one swiper">
                            <div class="swiper-wrapper">
${serviceSlides}
                            </div>
                            <div class="slider-btn`, 'services-slider');

html = apply(html, [
  ['<small class="fs-18 fw-normal text-md-center text-start text-white d-inline-block">EXROX SERVICES</small>',
    '<small class="fs-18 fw-normal text-md-center text-start text-white d-inline-block">OUR SERVICES</small>'],
  ['Expert accounting and management advice, all in one place. Custom-crafted for the way your business works.',
    'Seven core professional services, all in one place. Custom-crafted for the way your business works.']
], 'services-head');

/* ---------------- moving text ---------------- */
const ribbon = ['AUDIT &amp; ASSURANCE', 'TAX CONSULTANCY', 'ACCOUNTING SYSTEMS', 'MANAGEMENT INFORMATION', 'STOCK MANAGEMENT', 'BANK CHARGES'];
const ribbonItems = [...ribbon, ...ribbon]
  .map(t => `                                <li class="font-secondary fw-bold text-white">${t}</li>`).join('\n');
html = applyRegex(html, /<div class="move-text style-three position-relative overflow-hidden z-1">\s*<ul class="d-flex align-items-center list-unstyled mb-0">[\s\S]*?<\/ul>/,
  `<div class="move-text style-three position-relative overflow-hidden z-1">
                            <ul class="d-flex align-items-center list-unstyled mb-0">
${ribbonItems}
                            </ul>`, 'ribbon');

/* ---------------- engagement model (was case studies) ---------------- */
const engagement = [
  {
    n: '01', title: 'Scoping &amp; Assessment', sub: '(We review before we recommend)',
    img: 'assets/img/rmc/audit.webp', icon: 'assets/img/icons/heart-large.svg',
    focus: 'Where your records stand today, and what they will have to satisfy.',
    approach: 'Walkthrough of operations, gap analysis and a written scope of work.',
    out: ['Written scope &amp; timetable', 'Findings list', 'Fee estimate']
  },
  {
    n: '02', title: 'Implementation', sub: '(Systems that run on your business)',
    img: 'assets/img/rmc/desk.webp', icon: 'assets/img/icons/gear-large.svg',
    focus: 'Accounting systems and management information built to be used daily.',
    approach: 'Configuration, data migration, controls and documentation.',
    out: ['Chart of accounts', 'Control matrix', 'User documentation']
  },
  {
    n: '03', title: 'Review &amp; Reporting', sub: '(Numbers you can rely on)',
    img: 'assets/img/rmc/boardroom.webp', icon: 'assets/img/icons/proven-result.svg',
    focus: 'Audit, tax and management reporting drawn from reliable records.',
    approach: 'Independent testing, reconciliations and reporting.',
    out: ['Audit findings', 'Tax computation', 'Management reports']
  },
  {
    n: '04', title: 'Ongoing Support', sub: '(Continuity, not handover)',
    img: 'assets/img/rmc/office.webp', icon: 'assets/img/icons/user-large.svg',
    focus: 'Year-round support across tax deadlines, reporting and stock control.',
    approach: 'Scheduled reviews, staff training and periodic stock audits.',
    out: ['Scheduled reviews', 'Staff training', 'Stock audit']
  }
];

const engagementCards = engagement.map((c, i) => {
  const tone = i % 2 === 0
    ? { card: 'style-one bg-white round-20 mb-25', box: 'bg-albastor round-20', logo: 'bg-albastor', o1: 'bg-white round-10 mb-sm-20', o2: 'bg_secondary round-10 mb-sm-20', o3: 'bg_primary round-10 mb-sm-20' }
    : { card: 'style-one bg-albastor round-20 mb-25', box: 'bg-white round-20', logo: 'bg-white', o1: 'bg-albastor round-10 mb-sm-20', o2: 'bg_secondary round-10 mb-sm-20', o3: 'bg_primary round-10 mb-sm-20' };
  return `                            <div class="case-card ${tone.card}">
                                <div class="row align-items-center">
                                    <div class="col-xl-6 col-lg-5">
                                        <div class="case-img round-20 position-relative hover-text-target mb-md-25" data-cursor-text="Enquire">
                                            <img src="${c.img}" alt="${c.title}" class="round-20" data-cue="anim-left" data-duration="1000">
                                            <span class="case-counter font-secondary fw-semibold text-white position-absolute">${c.n}</span>
                                            <a href="contact.html" class="position-absolute top-0 start-0 w-100 h-100"></a>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-7">
                                        <div class="case-info" data-cue="slideInUp">
                                            <h3 class="fs-24 mb-22"><a href="contact.html" class="text-title link-hover-primary transition">${c.title}</a></h3>
                                            <div class="job-info-wrap d-flex flex-wrap align-items-center mb-25">
                                                <div class="employer-logo ${tone.logo} d-flex flex-column align-items-center justify-content-center rounded-circle">
                                                    <img src="${c.icon}" alt="Icon">
                                                </div>
                                                <div class="job-info">
                                                    <h3 class="fs-20 lh-1 mb-10">RMC Engagement</h3>
                                                    <span class="fs-xxl-18 d-block">${c.sub}</span>
                                                </div>
                                            </div>
                                            <p class="fs-xxl-18"><span class="text-title fw-semibold">Focus:</span> ${c.focus}</p>
                                            <p class="fs-xxl-18 mb-18"><span class="text-title fw-semibold">Approach:</span> ${c.approach}</p>
                                            <div class="case-outcome-box ${tone.box}">
                                                <h3 class="fs-20 mb-12">What you receive</h3>
                                                <div class="row gx-xl-2">
                                                    <div class="col-md-4">
                                                        <div class="outcome-box ${tone.o1}">
                                                            <p class="fs-xxl-18 mb-0">${c.out[0]}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="outcome-box ${tone.o2}">
                                                            <p class="fs-xxl-18 text-title mb-0">${c.out[1]}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="outcome-box ${tone.o3}">
                                                            <p class="fs-xxl-18 mb-0">${c.out[2]}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
}).join('\n');

html = applyRegex(html, /<div class="case-card-wrap style-one">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<!-- Case Studies Section End -->/,
  `<div class="case-card-wrap style-one">
${engagementCards}
                        </div>
                    </div>
                    <!-- Case Studies Section End -->`, 'engagement');

html = apply(html, [
  ['<small class="fs-18 fw-normal text-md-center text-start d-inline-block">CASE STUDIES</small>',
    '<small class="fs-18 fw-normal text-md-center text-start d-inline-block">HOW WE WORK</small>'],
  ["Explore how we've helped businesses overcome challenges and achieve transformational growth",
    'A four-stage engagement model that keeps the work scoped, the systems practical and the numbers defensible']
], 'engagement-head');

/* ---------------- commitments (was testimonials) ---------------- */
const commitments = [
  ['Reporting', 'Every figure explained in plain language, with the workings behind it.'],
  ['Audit readiness', 'Records built to be examined, not reconstructed the week before the audit.'],
  ['Systems that fit', 'Accounting and MIS designed around how your team actually operates.'],
  ['Local fluency', 'FIRS and public-sector reporting handled in-country, by people here.'],
  ['Continuity', 'The team that builds your system supports it after go-live.'],
  ['Cost discipline', 'Excess bank charges reviewed and recovered as part of every engagement.']
];

const commitmentSlides = commitments.map(([h, p]) => `                                <div class="swiper-slide">
                                    <div class="testimonial-card style-one d-flex flex-column justify-content-between round-20">
                                        <div>
                                            <ul class="rating list-unstyled">
                                                <li><img src="assets/img/icons/check.svg" alt="Icon"></li>
                                            </ul>
                                            <p class="font-primary fw-bold text-title">${p}</p>
                                        </div>
                                        <div class="client-info-wrap d-flex flex-wrap align-items-center">
                                            <div class="client-info">
                                                <h6 class="fs-20">${h}</h6>
                                                <span>Our standard on every file</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>`).join('\n');

html = applyRegex(html, /<div class="testimonial-area style-two">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!-- Testimonial Section End -->/,
  `<div class="testimonial-area style-two">
                        <div class="container style-one pt-120">
                            <div class="row">
                                <div class="col-xl-10 offset-xl-1">
                                    <h2 class="section-title style-one fw-semibold title-anim mb-35">
                                        <small class="fs-18 fw-normal text-md-center text-start d-inline-block">OUR COMMITMENTS</small>
                                        The standards every RMC client can hold us to
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid style-two">
                            <div class="row">
                                <div class="col-xl-3 col-lg-4 col-md-5">
                                    <div class="success-box style-one bg_secondary round-20 mb-sm-30" data-cue="slideInUp">
                                        <h6 class="fs-24 lh-1 mb-18">At a glance</h6>
                                        <div class="counter-card">
                                            <h4 class="text-title fw-semibold mb-3"><span class="counter fw-bold transition">33</span></h4>
                                            <span class="fs-xxl-18 d-block text-title">Years in practice</span>
                                        </div>
                                        <ul class="rating list-unstyled lh-1 mb-12">
                                            <li class="fs-xxl-18 fw-semibold text-title">Incorporated in Warri, Delta State</li>
                                        </ul>
                                        <p class="fs-xxl-18 text-title mb-0">ICAN member firm, registered with the OAGF and the FIRS.</p>
                                    </div>
                                </div>
                                <div class="col-xl-9 col-lg-8 col-md-7 pe-lg-0">
                                    <div class="testimonial-slider-one swiper" data-cue="slideInUp">
                                        <div class="swiper-wrapper">
${commitmentSlides}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Testimonial Section End -->`, 'commitments');

/* ---------------- registrations (was brand logos) ---------------- */
html = applyRegex(html, /<div class="container ptb-120">\s*<div class="row align-items-center">\s*<div class="col-xxl-5 col-xl-4 col-lg-5 mb-md-20">\s*<h6 class="fs-18 font-primary fw-normal mb-0 reveal-text-right">OUR ESTEEMED CLIENTS<\/h6>[\s\S]*?<!-- Brand Section End -->/,
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
                    <!-- Brand Section End -->`, 'registrations');

/* ---------------- promo / why rmc ---------------- */
html = apply(html, [
  ['<h2 class="section-title style-two text-white pe-xxl-5 me-xxl-4 fw-semibold mb-25">Why Trust Exrox?</h2>',
    '<h2 class="section-title style-two text-white pe-xxl-5 me-xxl-4 fw-semibold mb-25">Why RMC?</h2>'],
  ['<h6 class="fs-24 fw-semibold text-white mb-6">CPA Certified</h6>\n                                                <p class="fs-xxl-18 text-white mb-0">All partners hold active CPA licenses with 10+ years experience</p>',
    '<h6 class="fs-24 fw-semibold text-white mb-6">ICAN Member Firm</h6>\n                                                <p class="fs-xxl-18 text-white mb-0">Chartered accountants regulated by the Institute of Chartered Accountants of Nigeria</p>'],
  ['<h6 class="fs-24 fw-semibold text-white mb-6">AICP Member</h6>\n                                                <p class="fs-xxl-18 text-white mb-0">Adhering to highest professional standards</p>',
    '<h6 class="fs-24 fw-semibold text-white mb-6">Public Sector Registered</h6>\n                                                <p class="fs-xxl-18 text-white mb-0">Registered with the Office of the Auditor-General of the Federation</p>'],
  ['<h6 class="fs-24 fw-semibold text-white mb-6">25+ Years</h6>\n                                                <p class="fs-xxl-18 text-white mb-0">Combined experience in financial consulting</p>',
    '<h6 class="fs-24 fw-semibold text-white mb-6">Since 1993</h6>\n                                                <p class="fs-xxl-18 text-white mb-0">Over three decades of continuous practice from Warri, Delta State</p>'],
  ['<h6 class="fs-24 fw-semibold text-white mb-6">SOC 2 Compliant</h6>\n                                                <p class="fs-xxl-18 text-white mb-0">Enterprise-grade data security</p>',
    '<h6 class="fs-24 fw-semibold text-white mb-6">Federal Tax Compliance</h6>\n                                                <p class="fs-xxl-18 text-white mb-0">Registered with the Federal Inland Revenue Service for tax engagements</p>'],
  ['<h6 class="fs-18 fw-bold text-title text-xl-center mb-0">Join hundreds of satisfied clients who trust Exrox with their financial strategy.</h6>',
    '<h6 class="fs-18 fw-bold text-title text-xl-center mb-0">Speak to a chartered accountant about your audit, tax and accounting systems.</h6>'],
  ['<span class="btn-text fw-bold d-flex flex-column align-items-center justify-content-center transition">Schedule Free Consultation</span>',
    '<span class="btn-text fw-bold d-flex flex-column align-items-center justify-content-center transition">Talk To Us</span>']
], 'promo-why');

/* ---------------- insights (was blog) ---------------- */
const insights = [
  ['Audit', 'Getting audit-ready: a checklist for business owners', 'assets/img/rmc/desk.webp'],
  ['Accounting Systems', 'Choosing an accounting system that will still work in five years', 'assets/img/rmc/boardroom.webp'],
  ['Advisory', 'Bank charges: the small fees that quietly cost your business', 'assets/img/rmc/architecture.webp']
];
const insightSlides = insights.map(([cat, title, img]) => `                                <div class="swiper-slide">
                                    <div class="blog-card style-one bg-white img-hover-scale position-relative round-20 mb-30" data-cue="slideInUp" data-duration="800">
                                        <div class="blog-img img-scale position-relative overflow-hidden">
                                            <img src="${img}" alt="${title}" class="position-absolute top-0 start-0 w-100 h-100 transition">
                                            <img src="${img}" alt="${title}" class="transition">
                                        </div>
                                        <div class="blog-info">
                                            <ul class="blog-metainfo style-one list-unstyled">
                                                <li class="position-relative"><a href="services.html">${cat}</a></li>
                                                <li class="position-relative"><a href="services.html">Practice Note</a></li>
                                            </ul>
                                            <h3><a href="services.html" class="text-title link-hover-primary">${title}</a></h3>
                                        </div>
                                    </div>
                                </div>`).join('\n');

html = applyRegex(html, /<div class="blog-slider-one swiper">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<!-- Blog Section End -->/,
  `<div class="blog-slider-one swiper">
                            <div class="swiper-wrapper">
${insightSlides}
                            </div>
                            <div class="blog-pagination text-center"></div>
                        </div>
                    </div>
                    <!-- Blog Section End -->`, 'insights');

html = apply(html, [
  ['<small class="fs-18 fw-normal text-md-center text-start d-inline-block">LATEST ARTICLES</small>',
    '<small class="fs-18 fw-normal text-md-center text-start d-inline-block">INSIGHTS</small>'],
  ['Financial strategies, industry trends, and expert advice — all in one place',
    'Practical notes from our audit, tax and accounting systems practice']
], 'insights-head');

write('index.html', html, 'index');
