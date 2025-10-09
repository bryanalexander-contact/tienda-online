document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === correo && u.password === contrasena);

    if (user) {
      localStorage.setItem("logueado", "true");
      localStorage.setItem("isAdmin", user.role === "admin" ? "true" : "false");

      // redirigir si es admin
      if (user.role === "admin") {
        window.location.href = "../admin/index.html";
      } else {
        window.location.href = "../index.html";
      }
    } else {
      alert("Correo o contraseña incorrectos");
    }
  });
});
