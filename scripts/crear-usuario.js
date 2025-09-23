// scripts/crear-usuario.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-nuevo-usuario");
  if (!form) return;

  const selectRegion = document.getElementById("region");
  const selectComuna = document.getElementById("comuna");

  // Cargar regiones al select
  regiones.forEach(r => {
    const option = document.createElement("option");
    option.value = r.nombre;
    option.textContent = r.nombre;
    selectRegion.appendChild(option);
  });

  // Cambiar comunas según región seleccionada
  selectRegion.addEventListener("change", () => {
    const regionSeleccionada = selectRegion.value;
    const r = regiones.find(reg => reg.nombre === regionSeleccionada);
    selectComuna.innerHTML = "";
    if (r) {
      r.comunas.forEach(c => {
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        selectComuna.appendChild(option);
      });
    }
  });

  // Reset comunas al limpiar formulario
  form.addEventListener("reset", () => {
    selectComuna.innerHTML = "";
  });

  // Manejar envío del formulario
  form.addEventListener("submit", e => {
    e.preventDefault();

    const run = form.run.value.trim().toUpperCase();
    const nombre = form.nombre.value.trim();
    const apellidos = form.apellidos.value.trim();
    const correo = form.correo.value.trim();
    const fechaNacimiento = form.fechaNacimiento.value;
    const tipoUsuario = form.tipoUsuario.value;
    const region = form.region.value;
    const comuna = form.comuna.value;
    const direccion = form.direccion.value.trim();

    // Validaciones
    if (!/^[0-9]{7,8}[0-9K]$/.test(run)) {
      alert("RUN inválido. Ej: 19011022K, 7 a 9 caracteres, sin puntos ni guión.");
      return;
    }
    if (!nombre || nombre.length > 50) {
      alert("Nombre inválido (requerido, máx. 50 caracteres).");
      return;
    }
    if (!apellidos || apellidos.length > 100) {
      alert("Apellidos inválidos (requerido, máx. 100 caracteres).");
      return;
    }
    if (!validarCorreo(correo)) {
      alert("Correo inválido. Solo se aceptan @duoc.cl, @profesor.duoc.cl y @gmail.com, máx. 100 caracteres.");
      return;
    }
    if (!direccion || direccion.length > 300) {
      alert("Dirección inválida (requerida, máx. 300 caracteres).");
      return;
    }

    // Crear usuario
    const usuario = {
      id: generarIdUsuario(),
      run,
      nombre,
      apellidos,
      correo,
      fechaNacimiento,
      tipoUsuario,
      region,
      comuna,
      direccion
    };

    usuarios.push(usuario);
    guardarUsuarios();
    alert("✅ Usuario agregado correctamente!");
    form.reset();
  });
});

// Validar correo
function validarCorreo(correo) {
  const dominios = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
  if (!correo || correo.length > 100) return false;
  return dominios.some(d => correo.endsWith(d));
}
