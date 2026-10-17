const password = document.getElementById('pass');
const toggle = document.getElementById('togglePassword');
toggle.addEventListener('click', () => {
  const visible = password.type === 'password';
  password.type = visible ? 'text' : 'password';
  toggle.textContent = visible ? 'Hide' : 'Show';
  toggle.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
  toggle.setAttribute('aria-pressed', String(visible));
});
document.getElementById('staffLoginForm').addEventListener('submit', () => {
  document.getElementById('loginStatus').textContent = 'Connecting to RMC webmail...';
});
window.addEventListener('pageshow', () => {
  document.getElementById('loginStatus').textContent = '';
});
