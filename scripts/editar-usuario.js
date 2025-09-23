// scripts/editar-usuario.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-editar-usuario");
  if (!form) return;

  const id = parseInt(localStorage.getItem("editarUsuarioId"));
  const usuario = obtenerUsuario(id);

  if (!usuario) {
    alert("Usuario no encontrado");
    window.location.href = "mostrar-usuarios.html";
    return;
  }

  // Cargar regiones
  regiones.forEach(r => {
    const option = document.createElement("option");
    option.value = r.nombre;
    option.textContent = r.nombre;
    form.region.appendChild(option);
  });

  // Función para cargar comunas según región
  function cargarComunas(region) {
    const r = regiones.find(reg => reg.nombre === region);
    form.comuna.innerHTML = "";
    if (r) r.comunas.forEach(c => {
      const option = document.createElement("option");
      option.value = c;
      option.textContent = c;
      form.comuna.appendChild(option);
    });
  }

  // Rellenar formulario con datos del usuario
  form.run.value = usuario.run;
  form.nombre.value = usuario.nombre;
  form.apellidos.value = usuario.apellidos;
  form.correo.value = usuario.correo;
  form.fechaNacimiento.value = usuario.fechaNacimiento || "";
  form.tipoUsuario.value = usuario.tipoUsuario;
  form.region.value = usuario.region;
  cargarComunas(usuario.region);
  form.comuna.value = usuario.comuna;
  form.direccion.value = usuario.direccion;

  // Cambiar comunas al seleccionar región
  form.region.addEventListener("change", () => cargarComunas(form.region.value));

  // Guardar cambios
  form.addEventListener("submit", e => {
    e.preventDefault();

    const run = form.run.value.trim().toUpperCase();
    const nombre = form.nombre.value.trim();
    const apellidos = form.apellidos.value.trim();
    const correo = form.correo.value.trim();
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

    // Guardar datos en usuario
    usuario.run = run;
    usuario.nombre = nombre;
    usuario.apellidos = apellidos;
    usuario.correo = correo;
    usuario.fechaNacimiento = form.fechaNacimiento.value;
    usuario.tipoUsuario = form.tipoUsuario.value;
    usuario.region = form.region.value;
    usuario.comuna = form.comuna.value;
    usuario.direccion = direccion;

    guardarUsuarios();
    alert("✅ Usuario editado correctamente!");
    window.location.href = "mostrar-usuarios.html";
  });
});

// Validar correo
function validarCorreo(correo) {
  const dominios = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
  if (!correo || correo.length > 100) return false;
  return dominios.some(d => correo.endsWith(d));
}
