"use strict";
const password = document.getElementById("pass");
const toggle = document.getElementById("togglePass");
toggle.addEventListener("click", () => {
 const show = password.type === "password";
 password.type = show ? "text" : "password";
 toggle.setAttribute("aria-pressed", String(show));
 toggle.setAttribute("aria-label", show ? "Hide password" : "Show password");
 toggle.firstElementChild.className = show ? "bi bi-eye-slash" : "bi bi-eye";
});
document.getElementById("staffLoginForm").addEventListener("submit", event => {
 const user = document.getElementById("user");
 user.value = user.value.trim();
 if (!event.currentTarget.checkValidity()) {
  event.preventDefault();
  event.currentTarget.reportValidity();
 }
});
