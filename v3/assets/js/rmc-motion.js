/** RMC site interactions | progressive enhancement, native/browser-safe. */
(() => {
  'use strict';
  const doc = document;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Meaningful navigation: mark the current page in both the desktop and cloned mobile menus.
  const page = location.pathname.split('/').pop() || 'index.html';
  doc.querySelectorAll('.main-header a[href], .rmc-mobile-menu a[href]').forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (href && href.split('#')[0] === page) anchor.setAttribute('aria-current','page');
  });

  // A subtle indicator of scroll progress, updates with the viewport and never blocks touch.
  const progress = doc.createElement('span');
  progress.className = 'rmc-scroll-progress';
  progress.setAttribute('aria-hidden','true');
  doc.body.appendChild(progress);
  const header = doc.querySelector('.main-header');
  let scrollTicking = false;
  const onScroll = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      const scrollTotal = Math.max(1, doc.documentElement.scrollHeight - window.innerHeight);
      progress.style.transform = `scaleX(${Math.min(1, Math.max(0,window.scrollY / scrollTotal))})`;
      if (header) header.classList.toggle('rmc-scrolled', window.scrollY > 22);
      scrollTicking = false;
    });
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll, {passive:true});
  onScroll();

  // Default image fallback: remote illustration networks might be blocked/offline.
  // Keep descriptive local photography visible instead of broken-image placeholders.
  const photoFallbacks = [
    'assets/img/bg1 (4).png','assets/img/rmc-hero3.png','assets/img/bg1 (3).png',
    'assets/img/bg1 (6).png','assets/img/bg1 (2).png','assets/img/bg1 (5).png'
  ];
  let fallbackIndex = 0;
  doc.querySelectorAll('img[src^="https://images.pexels.com/"]').forEach(image => {
    const fallback = photoFallbacks[fallbackIndex++ % photoFallbacks.length];
    image.addEventListener('error', () => {
      if (image.dataset.rmcFallbackLoaded) return;
      image.dataset.rmcFallbackLoaded = 'true';
      image.src = fallback;
    }, {once: true});
    if (image.complete && image.naturalWidth === 0) image.src = fallback;
  });

  // Reveal is only added once we know the observer is operational; content stays visible otherwise.
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const targets = doc.querySelectorAll([
      '.hero-info-item','.service-item','.feature-item','.pricing-item','.project-item',
      '.testimonial-item','.post-item','.approach-item','.contact-us-form','.rmc-login-card',
      '.about-us-image','.contact-info-item','.section-title:not(.hero .section-title)',
      '.about-us-body','.rmc-login-image'
    ].join(','));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('rmc-visible');
        observer.unobserve(entry.target);
      });
    }, {threshold:0.08,rootMargin:'0px 0px -24px 0px'});
    targets.forEach((element,i) => {
      // Existing WOW/GSAP classes may animate their own elements; don't double-hide them.
      if (element.classList.contains('wow') || element.closest('.wow') || element.closest('.rmc-animated-hero')) return;
      element.classList.add('rmc-reveal');
      element.style.setProperty('--rmc-reveal-delay', ((i % 4) * 75) + 'ms');
      observer.observe(element);
    });
  }
  // Hero spotlight follows desktop pointer slightly, but costs no work on touch devices.
  const hero = doc.querySelector('.rmc-animated-hero');
  if (hero && !reducedMotion.matches && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    let pointerFrame = false;
    hero.addEventListener('pointermove', event => {
      if (pointerFrame) return;
      pointerFrame = true;
      requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty('--rmc-pointer-x', `${Math.round(100*(event.clientX-r.left)/r.width)}%`);
        hero.style.setProperty('--rmc-pointer-y', `${Math.round(100*(event.clientY-r.top)/r.height)}%`);
        pointerFrame = false;
      });
    }, {passive:true});
  }
})();
