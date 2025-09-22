// scripts/usuarios.js

// Inicializar usuarios
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Guardar en localStorage
function guardarUsuarios() {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Generar ID único
function generarIdUsuario() {
  return usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
}

// Añadir usuario
function agregarUsuario(usuario) {
  usuario.id = generarIdUsuario();
  usuarios.push(usuario);
  guardarUsuarios();
}

// Eliminar usuario
function eliminarUsuario(id) {
  usuarios = usuarios.filter(u => u.id !== id);
  guardarUsuarios();
}

// Obtener usuario por ID
function obtenerUsuario(id) {
  return usuarios.find(u => u.id === id);
}

// Actualizar usuario
function actualizarUsuario(id, datos) {
  const usuario = obtenerUsuario(id);
  if(usuario) {
    Object.assign(usuario, datos);
    guardarUsuarios();
  }
}

// Renderizar tabla de usuarios
function renderizarTablaUsuarios(tablaId) {
  const tabla = document.getElementById(tablaId);
  if(!tabla) return;

  tabla.innerHTML = '';
  usuarios.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${u.id}</td>
      <td>${u.nombre}</td>
      <td>${u.correo}</td>
      <td>${u.telefono || ''}</td>
      <td>${u.rol}</td>
      <td>
        <a href="editar-usuario.html?id=${u.id}" class="btn-editar">Editar</a>
        <button class="eliminar" data-id="${u.id}">Eliminar</button>
      </td>
    `;
    tabla.appendChild(tr);
  });

  // Botones eliminar
  tabla.querySelectorAll('.eliminar').forEach(btn => {
    btn.addEventListener('click', e => {
      eliminarUsuario(parseInt(e.target.dataset.id));
      renderizarTablaUsuarios(tablaId);
    });
  });
}

// Manejar formulario de nuevo usuario
function manejarFormularioNuevoUsuario(formId) {
  const form = document.getElementById(formId);
  if(!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const nuevo = {
      nombre: form.nombre.value,
      correo: form.correo.value,
      telefono: form.telefono.value,
      rol: form.rol.value,
      password: form.password.value
    };
    agregarUsuario(nuevo);
    alert('Usuario agregado!');
    form.reset();
  });
}

// Llenar formulario de edición
function llenarFormularioEditarUsuario(formId) {
  const form = document.getElementById(formId);
  if(!form) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const usuario = obtenerUsuario(id);

  if(!usuario) {
    alert('Usuario no encontrado');
    window.location.href = 'mostrar-usuarios.html';
    return;
  }

  form.nombre.value = usuario.nombre;
  form.correo.value = usuario.correo;
  form.telefono.value = usuario.telefono || '';
  form.rol.value = usuario.rol;
  form.password.value = usuario.password;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const datos = {
      nombre: form.nombre.value,
      correo: form.correo.value,
      telefono: form.telefono.value,
      rol: form.rol.value,
      password: form.password.value
    };
    actualizarUsuario(id, datos);
    alert('Usuario actualizado!');
    window.location.href = 'mostrar-usuarios.html';
  });
}
