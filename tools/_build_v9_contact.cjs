/* Builds v9/contact.html from the Exrox template contact page with RMC content. */
const { RMC, SERVICES, readRef, apply, applySoft, applyRegex, shared, write } = require('./_v9_common.cjs');

const ICON_RIGHT = `<span class="btn-icon-one d-flex flex-column align-items-center justify-content-center rounded-circle transition"><img src="assets/img/icons/right-arrow.svg" alt="Icon" class="d-block mx-auto"></span>
                                                    <span class="btn-text fw-bold d-flex flex-column align-items-center justify-content-center transition">Send Message</span>
                                                    <span class="btn-icon-two d-flex flex-column align-items-center justify-content-center rounded-circle transition"><img src="assets/img/icons/right-arrow.svg" alt="Icon" class="d-block mx-auto"></span>`;

let html = readRef('contact.html');

html = shared(html, {
  title: `Contact Us | ${RMC.namePlain}`,
  description: 'Contact Rheriene Mabamidje & Co. in Warri, Delta State. Call +234 803 318 1681 or email info@mabamidje.com.',
  active: 'contact.html',
  hasTopBar: true
});

html = applySoft(html, [
  ['href="case-studies.html"', 'href="services.html"'],
  ['href="appointment.html"', 'href="contact.html"']
], 'links');

/* ---------------- breadcrumb ---------------- */
html = apply(html, [
  ['<img src="assets/img/breadcrumb/br-16.jpg" alt="Image" class="w-100 h-100 object-fit-cover">',
    '<img src="assets/img/rmc/contact-hero.jpg" alt="RMC office" class="w-100 h-100 object-fit-cover">'],
  ['<li class="fs-xxl-18"><a href="services.html">Case Studies</a></li>',
    '<li class="fs-xxl-18"><a href="services.html">Services</a></li>']
], 'breadcrumb');

/* ---------------- contact information ---------------- */
html = apply(html, [
  ['<h6 class="fs-18 fw-semibold mb-18">Need Immediate Help?</h6>',
    '<h6 class="fs-18 fw-semibold mb-18">Speak To Us Directly</h6>'],
  ['<li class="fs-xxl-18 mb-10">Call us at <a href="tel:15555829282" class="text-title fw-semibold link-hover-primary">+1(555) 582-9282</a></li>',
    `<li class="fs-xxl-18 mb-10">Call us at <a href="${RMC.phoneHref}" class="text-title fw-semibold link-hover-primary">${RMC.phone}</a></li>`],
  ['<li class="fs-xxl-18 mb-10"><span class="text-title fw-semibold me-1">Our Office:</span>350 5th Avenue, Suite 701, New York, NY 10118, USA</li>',
    `<li class="fs-xxl-18 mb-10"><span class="text-title fw-semibold me-1">Our Office:</span>${RMC.address1}<br>${RMC.address2}<br>${RMC.address3}</li>`],
  ['<li class="fs-xxl-18 mb-10"><span class="text-title fw-semibold me-1">Monday - Thursday:</span>8:30 AM - 6:00 PM</li>',
    '<li class="fs-xxl-18 mb-10"><span class="text-title fw-semibold me-1">Monday - Friday:</span>9:00 AM - 5:00 PM (GMT+1)</li>'],
  ['<li class="fs-xxl-18 mb-10"><span class="text-title fw-semibold me-1">Friday:</span>8:30 AM - 5:00 PM</li>',
    '<li class="fs-xxl-18 mb-10"><span class="text-title fw-semibold me-1">Saturday:</span>Closed</li>'],
  ['<li class="fs-xxl-18 mb-10"><span class="text-title fw-semibold me-1">Saturday:</span>8:30 AM - 5:00 PM</li>',
    '<li class="fs-xxl-18 mb-10"><span class="text-title fw-semibold me-1">Sunday:</span>Closed</li>'],
  ['<li class="fs-xxl-18 mb-10"><span class="text-title fw-semibold me-1">Sunday:</span>Closed</li>',
    '<li class="fs-xxl-18 mb-10"><span class="text-title fw-semibold me-1">Public Holidays:</span>Closed</li>'],
  ['src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8385385572983!2d144.95358331584498!3d-37.81725074201705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4dd5a05d97%3A0x3e64f855a564844d!2s121%20King%20St%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sbd!4v1612419490850!5m2!1sen!2sbd"',
    'src="https://www.google.com/maps?q=Edewor%20Shopping%20Centre%2C%20Effurun%2C%20Warri%2C%20Delta%20State%2C%20Nigeria&amp;output=embed"']
], 'contact-info');

html = applyRegex(html,
  /<li class="fs-xxl-18 mb-10">or email\s*<a href="\/cdn-cgi\/l\/email-protection[^"]*"[^>]*>[\s\S]*?<\/a><\/li>/,
  `<li class="fs-xxl-18 mb-10">or email <a href="mailto:${RMC.email}" class="text-title fw-semibold link-hover-primary">${RMC.email}</a></li>`,
  'contact-email');

/* ---------------- form ---------------- */
const serviceOptions = SERVICES.map((s, i) =>
  `                                                        <option value="${s.title}">${s.title}</option>`).join('\n');

html = apply(html, [
  ['<input type="text" class="w-100 bg-transparent fs-xxl-18 text-title outline-0" placeholder="Type Service Name*" required>',
    `<select class="w-100 bg-transparent fs-xxl-18 text-title outline-0" required>\n${serviceOptions}\n                                                    </select>`]
], 'form-select');

const radioChips = SERVICES.map((s, i) => `                                                    <div class="service-btn">
                                                        <input type="radio" class="custom-control-input" id="service_${i}" name="service_type"${i === 0 ? ' checked=""' : ''}>
                                                        <label class="fs-xxl-18 text-title text-center w-100 d-block transition round-5" for="service_${i}">${s.title}</label>
                                                    </div>`).join('\n');

html = applyRegex(html,
  /<div class="service-btn-wrap d-flex flex-wrap mb-20">[\s\S]*?<\/div>\s*<\/div>\s*<div class="col-12">\s*<div class="form-group mb-22">/,
  `<div class="service-btn-wrap d-flex flex-wrap mb-20">
${radioChips}
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group mb-22">`,
  'service-chips');

html = apply(html, [
  ['<span class="btn-text fw-bold d-flex flex-column align-items-center justify-content-center transition">Send Message</span>',
    '<span class="btn-text fw-bold d-flex flex-column align-items-center justify-content-center transition">Send Message</span>']
], 'form-button');

html = applyRegex(html,
  /(<button class="btn style-one d-flex align-items-center" data-cue="slideInLeft" data-delay="300">[\s\S]*?<\/button>)/,
  `$1
                                                <p class="fs-18 text-para mb-0 mt-3">This form is a front-end demonstration. No data is transmitted yet &mdash; please call ${RMC.phone} or email <a href="mailto:${RMC.email}" class="link-hover-primary">${RMC.email}</a>.</p>`,
  'form-note');

/* ---------------- bottom CTA ---------------- */
html = apply(html, [
  ['<h2 class="section-title style-two fw-semibold text-center text-white reveal-text-right mb-12">Ready To Get Started?</h2>',
    '<h2 class="section-title style-two fw-semibold text-center text-white reveal-text-right mb-12">Ready To Get Started?</h2>'],
  ['<p class="fs-xxl-18 text-center mb-4">Schedule a free 30-minute consultation with one of our accounting professionals to discuss your specific needs.</p>',
    `<p class="fs-xxl-18 text-center mb-4">Speak to a chartered accountant about your audit, tax and accounting systems. Call ${RMC.phone} or email ${RMC.email}.</p>`]
], 'cta');

write('contact.html', html, 'contact');
