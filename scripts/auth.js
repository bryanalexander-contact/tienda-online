// scripts/auth.js
document.addEventListener("DOMContentLoaded", () => {
  const logueado = localStorage.getItem("logueado");
  const isAdmin = localStorage.getItem("isAdmin");

  if (logueado !== "true" || isAdmin !== "true") {
    window.location.href = "../pages/login.html";
  }
});
