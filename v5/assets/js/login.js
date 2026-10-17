(() => {
  'use strict';

  const form = document.getElementById('staffLoginForm');
  const password = document.getElementById('pass');
  const toggle = document.getElementById('togglePassword');
  const status = document.getElementById('loginStatus');

  toggle.addEventListener('click', () => {
    const show = password.type === 'password';
    password.type = show ? 'text' : 'password';
    toggle.setAttribute('aria-pressed', String(show));
    toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    toggle.querySelector('i').className = show ? 'bi bi-eye-slash' : 'bi bi-eye';
  });

  form.addEventListener('submit', () => {
    status.textContent = 'Connecting to RMC webmail…';
  });

  window.addEventListener('pageshow', () => {
    status.textContent = '';
    password.type = 'password';
    toggle.setAttribute('aria-pressed', 'false');
    toggle.setAttribute('aria-label', 'Show password');
    toggle.querySelector('i').className = 'bi bi-eye';
  });
})();
