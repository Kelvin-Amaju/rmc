/* Staff login interface only. No authentication backend is bundled with the static website. */
(() => {
  'use strict';
  const form = document.getElementById('staffLoginForm');
  if (!form) return;
  const password = document.getElementById('staffPassword');
  const reveal = document.getElementById('showPassword');
  const forgot = document.getElementById('forgotPassword');
  const recovery = document.getElementById('staffRecovery');
  const status = document.getElementById('staffFormStatus');
  reveal.addEventListener('click', () => {
    const show = password.type === 'password';
    password.type = show ? 'text' : 'password';
    reveal.textContent = show ? 'Hide' : 'Show';
    reveal.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    reveal.setAttribute('aria-pressed', String(show));
  });
  forgot.addEventListener('click', () => {
    recovery.hidden = !recovery.hidden;
    forgot.setAttribute('aria-expanded', String(!recovery.hidden));
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    status.textContent = 'Staff authentication is not connected yet. The login form is ready for backend integration; no credentials were sent.';
    status.classList.add('is-visible');
  });
})();
