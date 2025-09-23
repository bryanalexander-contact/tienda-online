// scripts/usuarios-storage.js

// Inicializar usuarios en LocalStorage
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Guardar en LocalStorage
function guardarUsuarios() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Generar ID único
function generarIdUsuario() {
  return usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
}

// Validar RUN (Ej: 19011022K, sin puntos ni guion, min 7, max 9)
function validarRun(run) {
  if (!run) return false;
  run = run.toUpperCase();
  return /^[0-9]{7,8}[0-9K]$/.test(run);
}

// Validar correo
function validarCorreo(correo) {
  if (!correo) return false;
  if (correo.length > 100) return false;
  const patron = /@duoc\.cl$|@profesor\.duoc\.cl$|@gmail\.com$/;
  return patron.test(correo);
}

// Obtener usuario por ID
function obtenerUsuario(id) {
  return usuarios.find(u => u.id === id);
}

// Eliminar usuario
function eliminarUsuario(id) {
  usuarios = usuarios.filter(u => u.id !== id);
  guardarUsuarios();
}
