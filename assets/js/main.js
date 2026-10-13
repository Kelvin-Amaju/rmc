(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const up = document.querySelector('.back-to-top');
  const progress = document.querySelector('.scroll-progress');

  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 40);
    up?.classList.toggle('visible', y > 650);
    if (progress) {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- AOS-style scroll reveal engine (data-aos) ---- */
  const aosEls = document.querySelectorAll('[data-aos]');
  const revealEls = document.querySelectorAll('.reveal');

  const animate = (el) => {
    const delay = parseInt(el.getAttribute('data-aos-delay') || el.getAttribute('data-delay') || '0', 10);
    const duration = el.getAttribute('data-aos-duration');
    if (duration) el.style.transitionDuration = duration + 'ms';
    if (delay) {
      el.style.transitionDelay = (delay > 20 ? delay : delay * 140) + 'ms';
    }
    el.classList.add('aos-animate');
    el.classList.add('visible');
  };

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -25px 0px' });

    aosEls.forEach((el) => obs.observe(el));
    revealEls.forEach((el) => obs.observe(el));
  } else {
    aosEls.forEach(animate);
    revealEls.forEach(animate);
  }

  /* ---- animated counters (data-count) ---- */
  const counters = document.querySelectorAll('[data-count]');
  const runCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = (el.getAttribute('data-count').split('.')[1] || '').length;
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals) + suffix;
    };
    requestAnimationFrame(step);
  };

  if (counters.length) {
    if ('IntersectionObserver' in window) {
      const cObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { runCounter(entry.target); cObs.unobserve(entry.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach((c) => cObs.observe(c));
    } else {
      counters.forEach(runCounter);
    }
  }

  /* ---- smooth in-page anchors ---- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---- heavy hero parallax: orbs + carousel on pointer ---- */
  const hero = document.querySelector('.hero-home, .login-visual');
  if (hero && window.matchMedia('(pointer:fine)').matches) {
    const orbs = hero.querySelectorAll('.hero-orb');
    const carousel = hero.querySelector('.hero-carousel');
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      orbs.forEach((orb, i) => {
        const depth = (i + 1) * 10;
        orb.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
      if (carousel) carousel.style.transform = `translate3d(${x * -24}px, ${y * -24}px, 0) scale(1.08)`;
    });
    hero.addEventListener('pointerleave', () => {
      orbs.forEach((orb) => (orb.style.transform = ''));
      if (carousel) carousel.style.transform = '';
    });
  }

  /* ---- hero scroll parallax (content drift + fade) ---- */
  const heroSection = document.querySelector('.hero-home');
  if (heroSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const heroInner = heroSection.querySelector('.hero-home-inner');
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const h = heroSection.offsetHeight || 1;
        if (heroInner && y < h) {
          heroInner.style.transform = `translateY(${y * 0.24}px)`;
          heroInner.style.opacity = String(Math.max(0, 1 - y / (h * 0.9)));
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- mobile offcanvas ---- */
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    let menuScrollY = 0;
    let previousBodyTop = '';
    menu.addEventListener('show.bs.offcanvas', () => {
      menuScrollY = window.scrollY;
      previousBodyTop = document.body.style.top;
      document.body.style.top = `-${menuScrollY}px`;
      document.documentElement.classList.add('menu-open');
      document.body.classList.add('menu-open');
    });
    menu.addEventListener('hidden.bs.offcanvas', () => {
      document.documentElement.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      document.body.style.top = previousBodyTop;
      window.scrollTo({ top: menuScrollY, behavior: 'instant' });
    });
  }

  /* ---- staff login page ---- */
  const loginForm = document.getElementById('staffLoginForm');
  if (loginForm) {
    const alertBox = document.getElementById('loginAlert');
    const show = (msg, type) => {
      if (!alertBox) return;
      alertBox.textContent = msg;
      alertBox.className = 'login-alert show ' + type;
    };
    const passInput = document.getElementById('pass');
    const toggle = document.getElementById('togglePass');
    toggle?.addEventListener('click', () => {
      const showing = passInput.type === 'text';
      passInput.type = showing ? 'password' : 'text';
      toggle.setAttribute('aria-pressed', String(!showing));
      toggle.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
    });

    loginForm.addEventListener('submit', (e) => {
      const user = loginForm.querySelector('#user').value.trim();
      const pass = loginForm.querySelector('#pass').value;
      if (!user || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user)) {
        e.preventDefault();
        show('Please enter a valid email address.', 'err');
        return;
      }
      if (!pass || pass.length < 4) {
        e.preventDefault();
        show('Please enter your password.', 'err');
        return;
      }
      const btn = document.getElementById('loginSubmit');
      if (btn) {
        btn.disabled = true;
        btn.querySelector('span').textContent = 'Signing in…';
      }
      show('Connecting to the secure mail server…', 'ok');
    });
  }
})();
