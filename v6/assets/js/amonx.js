/* Local initialization for the vendor files included with v9. */
(() => {
  'use strict';

  const loader = document.querySelector('.preloader');
  if (loader) { loader.hidden = true; loader.style.display = 'none'; }

  const $ = window.jQuery;
  if (!$) return;
  document.documentElement.classList.add('v9-ready');

  $('.amonx-owl__carousel').each(function () {
    if (!$.fn.owlCarousel) return;
    const options = $(this).data('owl-options') || {};
    $(this).owlCarousel(options);
  });


  const nav = document.querySelector('.main-header__nav .main-menu__list');
  const mobile = document.querySelector('.mobile-nav__container');
  if (nav && mobile) {
    mobile.append(nav.cloneNode(true));
    const staff = document.createElement('li');
    staff.innerHTML = '<a href="login.html">Staff Login</a>';
    mobile.querySelector('ul').append(staff);
    mobile.querySelectorAll('.dropdown > a').forEach(link => {
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.textContent = '+';
      toggle.setAttribute('aria-label', `Toggle ${link.textContent.trim()} submenu`);
      toggle.setAttribute('aria-expanded', 'false');
      link.after(toggle);
      toggle.addEventListener('click', () => {
        const expanded = link.parentElement.classList.toggle('mobile-open');
        toggle.setAttribute('aria-expanded', String(expanded));
      });
    });
  }

  document.querySelectorAll('.mobile-nav__toggler').forEach(toggle => {
    toggle.addEventListener('click', event => {
      event.preventDefault();
      document.querySelector('.mobile-nav__wrapper')?.classList.toggle('expanded');
    });
  });
  document.querySelectorAll('.sidebar-btn__toggler, .sidebar-two__close, .sidebar-two__overlay').forEach(toggle => {
    toggle.addEventListener('click', () => document.querySelector('.sidebar-two')?.classList.toggle('active'));
  });
  document.querySelectorAll('.search-toggler').forEach(toggle => {
    toggle.addEventListener('click', event => {
      event.preventDefault();
      document.querySelector('.search-popup')?.classList.toggle('active');
    });
  });

  $('.accordion-title').on('click', function () {
    const item = $(this).closest('.accordion');
    item.siblings('.accordion').removeClass('active').find('.accordion-content').slideUp();
    item.toggleClass('active').find('.accordion-content').slideToggle();
  });
  $('.accordion:not(.active) .accordion-content').hide();

  $('.tab-btn').on('click', function () {
    const target = document.querySelector(this.dataset.tab);
    if (!target) return;
    const tabs = target.parentElement;
    $(tabs).children('.tab').removeClass('active-tab').hide();
    $(target).addClass('active-tab').show();
    $(this).closest('.tabs-box, .about-two__tab').find('.tab-btn').removeClass('active-btn');
    $(this).addClass('active-btn');
  });

  document.querySelectorAll('.count-text[data-stop]').forEach(el => { el.textContent = el.dataset.stop; });
  document.querySelectorAll('.dynamic-year').forEach(el => { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll('.scroll-to-target').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

})();
