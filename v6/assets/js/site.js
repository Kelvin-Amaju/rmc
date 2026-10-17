(() => {
  'use strict';

  const pause = document.querySelector('.rmc-hero-pause');
  pause?.addEventListener('click', () => {
    const paused = document.body.classList.toggle('rmc-hero-paused');
    pause.setAttribute('aria-pressed', String(paused));
    pause.setAttribute('aria-label', paused ? 'Play hero slideshow' : 'Pause hero slideshow');
    pause.querySelector('i').className = paused ? 'bi bi-play-fill' : 'bi bi-pause-fill';
  });

  // Animate at entry without keeping content hidden if scripts fail.
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.animate([
          { opacity: .35, transform: 'translateY(22px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)' });
        reveal.unobserve(entry.target);
      });
    }, { threshold: .08 });
    document.querySelectorAll('.rmc-info-card, .rmc-page-split, .rmc-portrait-card, .rmc-section-heading, .rmc-contact-item, .project-two__item, .features-one__card, .sec-title').forEach(el => reveal.observe(el));
  }

  document.querySelectorAll('form[data-enquiry]').forEach(form => {
    const select = form.querySelector('select[name="service"]');
    const requested = Number(new URLSearchParams(window.location.search).get('service'));
    if (select && requested > 0 && requested < select.options.length) select.selectedIndex = requested;

    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const body = [...new FormData(form)].filter(([, value]) => String(value).trim()).map(([name, value]) => `${name}: ${value}`).join('\r\n\r\n');
      window.location.href = `mailto:info@mabamidje.com?subject=${encodeURIComponent('Website enquiry - RMC')}&body=${encodeURIComponent(body)}`;
      form.querySelector('[role="status"]').textContent = 'Your email app will open with a draft. Review it and send it there. If it does not open, email info@mabamidje.com.';
    });
  });

  const toggle = document.getElementById('togglePassword');
  const pass = document.getElementById('pass');
  toggle?.addEventListener('click', () => {
    const show = pass.type === 'password';
    pass.type = show ? 'text' : 'password';
    toggle.setAttribute('aria-pressed', String(show));
    toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    toggle.querySelector('i').className = show ? 'bi bi-eye-slash' : 'bi bi-eye';
  });
  document.getElementById('staffLoginForm')?.addEventListener('submit', () => {
    document.getElementById('loginStatus').textContent = 'Connecting to RMC webmail...';
  });
  window.addEventListener('pageshow', () => {
    if (!pass || !toggle) return;
    pass.type = 'password';
    toggle.setAttribute('aria-pressed', 'false');
    toggle.setAttribute('aria-label', 'Show password');
    toggle.querySelector('i').className = 'bi bi-eye';
    document.getElementById('loginStatus').textContent = '';
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    document.querySelector('.mobile-nav__wrapper')?.classList.remove('expanded');
    document.querySelector('.sidebar-two')?.classList.remove('active');
    document.querySelector('.search-popup')?.classList.remove('active');
  });
})();
