/* RMC index — V7 motion choreography (dependency-free) */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const header = $('#siteHeader');
  const menu = $('#menuToggle');
  const mobileNav = $('#mobileNav');
  const progress = $('#pageProgress');
  const hero = $('.hero');
  const heroCopy = $('.hero-copy');
  const slideIndex = $('#slideIndex');
  const heroTitle = $('#heroTitle');
  const heroSubtitle = $('#heroSubtitle');
  const heroSlides = $$('.hero-slide');
  const timeRule = $('.hero-index-rule');

  // Responsive menu, keyboard escape and inert offscreen navigation.
  function showMenu(open) {
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileNav.classList.toggle('is-open', open);
    mobileNav.inert = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  }
  menu.addEventListener('click', () => showMenu(menu.getAttribute('aria-expanded') !== 'true'));
  mobileNav.addEventListener('click', event => { if (event.target.closest('a')) showMenu(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') showMenu(false); });
  window.addEventListener('resize', () => { if (innerWidth > 900) showMenu(false); });

  // Animated text is split on existing <br> lines; no changes to the copy.
  const slides = [
    { lines: ['Clarity for today.', '<em>Confidence for tomorrow.</em>'], sub: 'Expertise in audit, tax and accounting — built on professional standards, sound judgement and enduring client relationships.' },
    { lines: ['Numbers in focus.', '<em>Business in motion.</em>'], sub: 'Meaningful financial insight and reliable reporting to help your organisation plan with confidence.' },
    { lines: ['Expertise that works.', '<em>Standards that last.</em>'], sub: 'Supporting businesses and institutions with experienced accountants, thoughtful advice and detailed financial work.' }
  ];
  let slide = 0;
  let slideshowTimer;
  let slideSwapTimer;
  const slideDuration = 7000;

  function renderTitle(lines) {
    // Strings are static, locally authored content, never user inputs.
    heroTitle.innerHTML = lines.map(line => `<span class="hero-title-line"><span class="hero-title-ink">${line}</span></span>`).join('');
  }
  function changeSlide(next) {
    slide = (next + slides.length) % slides.length;
    heroSlides.forEach((element, index) => {
      element.classList.toggle('is-active', index === slide);
      element.setAttribute('aria-hidden', String(index !== slide));
    });
    slideIndex.textContent = String(slide + 1).padStart(2, '0');
    if (reducedMotion) {
      renderTitle(slides[slide].lines);
      heroSubtitle.textContent = slides[slide].sub;
      return;
    }
    heroCopy.classList.remove('is-slide-visible');
    clearTimeout(slideSwapTimer);
    slideSwapTimer = setTimeout(() => {
      renderTitle(slides[slide].lines);
      heroSubtitle.textContent = slides[slide].sub;
      // A layout read guarantees transitions begin at the hidden state.
      void heroTitle.offsetWidth;
      heroCopy.classList.add('is-slide-visible');
    }, 320);
  }
  function startSlideTimer() {
    clearInterval(slideshowTimer);
    timeRule.classList.remove('is-playing');
    if (reducedMotion || document.hidden) return;
    void timeRule.offsetWidth;
    timeRule.classList.add('is-playing');
    slideshowTimer = setInterval(() => {
      changeSlide(slide + 1);
      timeRule.classList.remove('is-playing');
      void timeRule.offsetWidth;
      timeRule.classList.add('is-playing');
    }, slideDuration);
  }
  $('#nextSlide').addEventListener('click', () => { changeSlide(slide + 1); startSlideTimer(); });
  $('#prevSlide').addEventListener('click', () => { changeSlide(slide - 1); startSlideTimer(); });
  document.addEventListener('visibilitychange', startSlideTimer);
  if (!reducedMotion) {
    document.documentElement.classList.add('motion-ready');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      hero.classList.add('hero-entered');
      heroCopy.classList.add('is-slide-visible');
    }));
  }
  startSlideTimer();

  // Delay and stagger: each section reveals later, each card follows its neighbor.
  if (!reducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-animate');
    $$('[data-stagger]').forEach(group => {
      [...group.children].filter(node => node.hasAttribute('data-reveal')).forEach((element, index) => {
        element.style.setProperty('--reveal-delay', `${Math.min(index, 5) * (innerWidth <= 680 ? 110 : 185)}ms`);
      });
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .1, rootMargin: '0px 0px -45px 0px' });
    $$('[data-reveal]').forEach(element => observer.observe(element));
  }

  // Smooth FAQ content entrance; one FAQ remains open at a time.
  $$('#faq details').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (detail.open) $$('#faq details').filter(other => other !== detail && other.open).forEach(other => { other.open = false; });
    });
  });

  // One frame per scroll tick: page progress, header, layered parallax.
  let scrollQueued = false;
  function updateScroll() {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const range = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      progress.style.width = `${Math.min(100, y / range * 100)}%`;
      header.classList.toggle('is-sticky', y > header.offsetHeight + 5);
      if (!reducedMotion) {
        const imageCollage = $('.about-media');
        if (imageCollage) {
          const rect = imageCollage.getBoundingClientRect();
          if (rect.bottom > -100 && rect.top < innerHeight + 100) {
            const position = (rect.top + rect.height / 2 - innerHeight / 2) / innerHeight;
            imageCollage.style.setProperty('--collage-y', `${(-position * 16).toFixed(1)}px`);
            imageCollage.style.setProperty('--collage-small-y', `${(position * 19).toFixed(1)}px`);
          }
        }
        const cta = $('.cta-section');
        if (cta) {
          const rect = cta.getBoundingClientRect();
          if (rect.bottom > -50 && rect.top < innerHeight + 50) {
            const position = (rect.top + rect.height / 2 - innerHeight / 2) / innerHeight;
            cta.style.setProperty('--cta-pan-y', `${(-position * 26).toFixed(1)}px`);
          }
        }
      }
      scrollQueued = false;
    });
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();

  // Subtle image tracking and atmospheric glow only on capable desktop pointers.
  if (finePointer && !reducedMotion) {
    const ambient = $('.ambient-cursor');
    let pointerFrame = 0;
    hero.addEventListener('pointerenter', () => document.body.classList.add('show-ambient'));
    hero.addEventListener('pointerleave', () => {
      document.body.classList.remove('show-ambient');
      hero.style.setProperty('--hero-pan-x', '0px');
      hero.style.setProperty('--hero-pan-y', '0px');
    });
    hero.addEventListener('pointermove', event => {
      const x = event.clientX, y = event.clientY;
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect();
        const deltaX = ((x - bounds.left) / bounds.width - .5) * 14;
        const deltaY = ((y - bounds.top) / bounds.height - .5) * 12;
        hero.style.setProperty('--hero-pan-x', `${deltaX.toFixed(1)}px`);
        hero.style.setProperty('--hero-pan-y', `${deltaY.toFixed(1)}px`);
        ambient.style.left = `${x}px`;
        ambient.style.top = `${y}px`;
        pointerFrame = 0;
      });
    }, { passive: true });
  }
  $('#year').textContent = String(new Date().getFullYear());
})();
