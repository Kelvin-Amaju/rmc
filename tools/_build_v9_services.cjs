/* Builds v9/services.html from the Exrox template services page with RMC content. */
const { RMC, SERVICES, readRef, apply, applySoft, applyRegex, shared, write } = require('./_v9_common.cjs');

const SERVICE_IMAGES = [
  'assets/img/rmc/audit.webp',
  'assets/img/rmc/desk.webp',
  'assets/img/rmc/boardroom.webp',
  'assets/img/rmc/office.webp',
  'assets/img/rmc/architecture.webp',
  'assets/img/rmc/collaboration.webp',
  'assets/img/rmc/justice.webp'
];

const SERVICE_SLUGS = [
  'audit-assurance',
  'accounting-systems',
  'management-information',
  'tax-consultancy',
  'stock-management',
  'streamlining',
  'bank-charges'
];

const ICON_RIGHT = `<span class="btn-icon-one d-flex flex-column align-items-center justify-content-center rounded-circle transition"><img src="assets/img/icons/right-arrow.svg" alt="Icon" class="d-block mx-auto"></span>
                                                    <span class="btn-text fw-bold d-flex flex-column align-items-center justify-content-center transition">Request This Service</span>
                                                    <span class="btn-icon-two d-flex flex-column align-items-center justify-content-center rounded-circle transition"><img src="assets/img/icons/right-arrow.svg" alt="Icon" class="d-block mx-auto"></span>`;

let html = readRef('services.html');

html = shared(html, {
  title: `Services | ${RMC.namePlain}`,
  description: 'Audit and assurance, accounting systems, management information, tax consultancy, stock management, streamlining and recovery of excess bank charges.',
  active: 'services.html',
  hasTopBar: true
});

html = applySoft(html, [
  ['href="service-details.html"', 'href="services.html"'],
  ['href="appointment.html"', 'href="contact.html"']
], 'links');

/* ---------------- breadcrumb ---------------- */
html = apply(html, [
  ['<img src="assets/img/breadcrumb/br-9.jpg" alt="Image" class="w-100 h-100 object-fit-cover">',
    '<img src="assets/img/rmc/services-hero.jpg" alt="RMC services" class="w-100 h-100 object-fit-cover">']
], 'breadcrumb');

/* ---------------- service cards ---------------- */
const cards = SERVICES.map((s, i) => `                                    <div class="col-xl-4 col-md-6">
                                        <div class="service-card style-three bg-white img-hover-scale round-20 mb-45" id="${SERVICE_SLUGS[i]}">
                                            <div class="service-img img-scale overflow-hidden position-relative">
                                                <img src="${SERVICE_IMAGES[i]}" alt="${s.title}" class="position-absolute top-0 start-0 w-100 h-100 transition">
                                                <img src="${SERVICE_IMAGES[i]}" alt="${s.title}" class="transition">
                                            </div>
                                            <div class="service-info">
                                                <h3 class="fs-24">${s.title}</h3>
                                                <p class="fs-xxl-18 mb-20">${s.desc}</p>
                                                <ul class="feature-list style-one list-unstyled mb-20">
${s.points.map(p => `                                                    <li class="fs-xxl-18 position-relative"><img src="assets/img/icons/check.svg" alt="Icon" class="position-absolute start-0">${p}</li>`).join('\n')}
                                                </ul>
                                                <a href="contact.html" class="btn style-one d-inline-flex align-items-center">
                                                    ${ICON_RIGHT}
                                                </a>
                                            </div>
                                        </div>
                                    </div>`).join('\n');

html = applyRegex(html,
  /<div class="row justify-content-center">[\s\S]*?<!-- Service Details Section End -->/,
  `<div class="row justify-content-center">
${cards}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Service Details Section End -->`,
  'service-cards');

html = apply(html, [
  ['<h2 class="section-title style-two text-title text-center reveal-text-right mb-40">',
    '<h2 class="section-title style-two text-title text-center reveal-text-right mb-40">'],
  ['Comprehensive financial solutions tailored to your business needs',
    'Seven core professional services, delivered from one chartered accountancy practice in Warri']
], 'services-head');

/* ---------------- how we work (was industries) ---------------- */
const stages = [
  ['Scoping &amp; Assessment', 'assets/img/services/management.svg', 'We review the records you already have, identify the gaps and agree the scope in writing before any work starts.'],
  ['Implementation', 'assets/img/icons/gear-large.svg', 'Accounting systems, controls and management information are configured around how your team actually operates.'],
  ['Review &amp; Reporting', 'assets/img/icons/proven-result.svg', 'Audit, tax and management reporting are drawn from reconciled records and issued with the workings behind them.'],
  ['Ongoing Support', 'assets/img/icons/user-large.svg', 'Deadlines, reporting cycles and stock counts are supported year-round by the team that built the system.']
];

const stageButtons = stages.map(([label, icon, note], i) => `                                    <a href="contact.html" class="btn style-three d-inline-flex align-items-center" data-cue="slideInLeft"${i ? ` data-delay="${i * 100}"` : ''}>
                                        <span class="btn-icon-one d-flex flex-column align-items-center justify-content-center rounded-circle transition"><img src="${icon}" alt="Icon" class="d-block mx-auto"></span>
                                        <span class="btn-text fw-bold d-flex flex-column align-items-center justify-content-center transition">${label}</span>
                                        <span class="btn-icon-two d-flex flex-column align-items-center justify-content-center rounded-circle transition"><img src="${icon}" alt="Icon" class="d-block mx-auto"></span>
                                    </a>`).join('\n');

const stageNotes = stages.map(([, , note]) => `                                    <div class="col-lg-3 col-md-6">
                                        <p class="fs-xxl-18 mb-0">${note}</p>
                                    </div>`).join('\n');

html = applyRegex(html,
  /<!--  Industry Category Start -->[\s\S]*?<!--  Industry Category End -->/,
  `<!--  Industry Category Start -->
                    <div class="industry-area style-one position-relative bg-white z-1 ptb-120">
                        <div class="container style-one pb-120">
                            <div class="row">
                                <div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                                    <h6 class="fs-18 font-primary fw-normal text-title text-center reveal-text-right mb-15">How We Work</h6>
                                    <h2 class="section-title style-two fw-semibold text-title text-center mb-35 reveal-text-bottom">A four-stage engagement model that keeps the work scoped and the numbers defensible</h2>
                                </div>
                            </div>
                            <div class="industry-category-wrap d-flex flex-wrap justify-content-center">
${stageButtons}
                            </div>
                            <div class="row mt-40">
${stageNotes}
                            </div>
                        </div>
                        <div class="container style-one">
                            <div class="cta-box style-one position-relative z-1 overflow-hidden round-20">
                                <img src="assets/img/cta-shape-1.png" alt="Shape" class="cta-shape-one position-absolute z-n1 bottom-0 move-right">
                                <img src="assets/img/cta-shape-2.png" alt="Shape" class="cta-shape-two position-absolute z-n1 tp-0 move-left">
                                <div class="row">
                                    <div class="col-xxl-10 offset-xxl-1">
                                        <h2 class="section-title style-two fw-semibold text-center text-white reveal-text-right mb-12">Ready To Talk About Your Records?</h2>
                                        <p class="fs-xxl-18 text-center mb-4 w-xl-75 mx-auto px-xxl-5">Speak to a chartered accountant about your audit, tax and accounting systems. Call ${RMC.phone} or send us a message.</p>
                                    </div>
                                </div>
                                <div class="btn-wrap d-flex flex-wrap align-items-center justify-content-center">
                                    <a href="contact.html" class="btn style-one d-inline-flex align-items-center">
                                        <span class="btn-icon-one d-flex flex-column align-items-center justify-content-center rounded-circle transition"><i class="ri-phone-line"></i></span>
                                        <span class="btn-text fw-bold d-flex flex-column align-items-center justify-content-center transition">Get Started Today</span>
                                        <span class="btn-icon-two d-flex flex-column align-items-center justify-content-center rounded-circle transition"><i class="ri-phone-line"></i></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--  Industry Category End -->`,
  'how-we-work');

write('services.html', html, 'services');
