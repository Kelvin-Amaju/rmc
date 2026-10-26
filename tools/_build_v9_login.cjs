/* Builds v9/login.html. The Exrox template ships no sign-in page, so the page is
   composed from the contact page shell with its own staff-login panel. */
const { RMC, readRef, apply, applySoft, applyRegex, shared, write } = require('./_v9_common.cjs');

let html = readRef('contact.html');

html = shared(html, {
  title: `Staff Login | ${RMC.namePlain}`,
  description: 'Secure staff access portal for Rheriene Mabamidje & Co.',
  active: '',
  hasTopBar: true
});

html = applySoft(html, [
  ['href="case-studies.html"', 'href="services.html"'],
  ['href="appointment.html"', 'href="contact.html"']
], 'links');

/* ---------------- breadcrumb ---------------- */
html = apply(html, [
  ['<img src="assets/img/breadcrumb/br-16.jpg" alt="Image" class="w-100 h-100 object-fit-cover">',
    '<img src="assets/img/rmc/office.webp" alt="RMC office" class="w-100 h-100 object-fit-cover">'],
  ['<h2 class="section-title style-three text-white fw-bold mb-20 reveal-text">Contact Us</h2>',
    '<h2 class="section-title style-three text-white fw-bold mb-20 reveal-text">Staff Login</h2>'],
  ['<li class="fs-xxl-18"><a href="services.html">Case Studies</a></li>',
    '<li class="fs-xxl-18"><a href="services.html">Services</a></li>'],
  ['<li class="fs-xxl-18">Contact</li>',
    '<li class="fs-xxl-18">Staff Login</li>']
], 'breadcrumb');

/* ---------------- login panel ---------------- */
const loginPanel = `                    <!-- Login Section Start -->
                    <div class="login-area style-one position-relative z-1 ptb-120">
                        <div class="container style-one">
                            <div class="row justify-content-center">
                                <div class="col-xl-6 col-lg-8 col-md-10">
                                    <div class="contact-form style-three bg-white round-20">
                                        <div class="text-center mb-40">
                                            <a href="index.html" class="logo d-inline-block mb-25">
                                                <img src="${RMC.logoDark}" alt="${RMC.namePlain}">
                                            </a>
                                            <h2 class="section-title style-two fw-semibold reveal-text mb-15">Staff Login</h2>
                                            <p class="fs-xxl-18 text-para mb-0">Access the staff area of the RMC practice system.</p>
                                        </div>
                                        <form action="#" class="login-form">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-group mb-30">
                                                        <input type="email" class="w-100 bg-transparent fs-xxl-18 text-title outline-0" placeholder="Work Email*" required>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="form-group mb-30">
                                                        <input type="password" class="w-100 bg-transparent fs-xxl-18 text-title outline-0" placeholder="Password*" required>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-30">
                                                        <div class="form-check m-0">
                                                            <input type="checkbox" class="custom-control-input" id="remember_me">
                                                            <label class="fs-xxl-18 text-title m-0" for="remember_me">Keep me signed in</label>
                                                        </div>
                                                        <a href="contact.html" class="fs-xxl-18 link-hover-primary">Need help signing in?</a>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <button type="button" class="btn style-one d-flex align-items-center w-100 justify-content-center">
                                                        <span class="btn-icon-one d-flex flex-column align-items-center justify-content-center rounded-circle transition"><img src="assets/img/icons/right-arrow.svg" alt="Icon" class="d-block mx-auto"></span>
                                                        <span class="btn-text fw-bold d-flex flex-column align-items-center justify-content-center transition">Sign In</span>
                                                        <span class="btn-icon-two d-flex flex-column align-items-center justify-content-center rounded-circle transition"><img src="assets/img/icons/right-arrow.svg" alt="Icon" class="d-block mx-auto"></span>
                                                    </button>
                                                </div>
                                                <div class="col-12">
                                                    <p class="fs-18 text-para mb-0 mt-3 text-center">This is a front-end demonstration. Authentication is not wired up yet &mdash; staff access will be enabled in a later release.</p>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Login Section End -->`;

html = applyRegex(html,
  /\n\s*<!-- Contact Section Start -->[\s\S]*?<!-- Contact Section End -->/,
  `\n${loginPanel}`,
  'login-panel');

write('login.html', html, 'login');
