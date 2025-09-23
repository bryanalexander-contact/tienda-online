// Inicializar usuarios desde LocalStorage
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Crear admin por defecto si no existe ningún usuario
if (usuarios.length === 0) {
  const adminInicial = {
    id: 1,
    nombre: "Administrador",
    correo: "admin@duoc.cl",
    telefono: "",
    rol: "admin",
    password: "1234"
  };
  usuarios.push(adminInicial);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}



// Guardar en LocalStorage
function guardarUsuarios() {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Generar ID único
function generarIdUsuario() {
  return usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
}

// Validaciones
function validarCorreo(correo) {
  if (!correo || correo.length > 100) return false;
  const patron = /@duoc\.cl$|@profesor\.duoc\.cl$|@gmail\.com$/;
  return patron.test(correo);
}

function validarPassword(password) {
  return password && password.length >= 4 && password.length <= 10;
}

function validarNombre(nombre) {
  return nombre && nombre.length <= 100;
}

// Crear nuevo usuario desde formulario
function manejarFormularioNuevoUsuario(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const correo = form.correo.value.trim();
    const telefono = form.telefono.value.trim();
    const rol = form.rol.value;
    const password = form.password.value;

    if (!validarNombre(nombre)) {
      alert("Nombre inválido (requerido, max 100 caracteres).");
      return;
    }

    if (!validarCorreo(correo)) {
      alert("Correo inválido (solo @duoc.cl, @profesor.duoc.cl, @gmail.com, max 100 caracteres).");
      return;
    }

    if (!validarPassword(password)) {
      alert("Contraseña inválida (entre 4 y 10 caracteres).");
      return;
    }

    const nuevoUsuario = {
      id: generarIdUsuario(),
      nombre,
      correo,
      telefono,
      rol,
      password
    };

    usuarios.push(nuevoUsuario);
    guardarUsuarios();
    alert("Usuario agregado correctamente!");
    form.reset();
  });
}

// Renderizar tabla de usuarios
function renderizarTablaUsuarios(tablaId) {
  const tabla = document.getElementById(tablaId);
  if (!tabla) return;

  tabla.innerHTML = '';

  usuarios.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${u.nombre}</td>
      <td>${u.correo}</td>
      <td>${u.telefono || ''}</td>
      <td>${u.rol}</td>
      <td>
        <button class="editar" data-id="${u.id}">Editar</button>
        <button class="eliminar" data-id="${u.id}">Eliminar</button>
      </td>
    `;
    tabla.appendChild(tr);
  });

  // Eventos de eliminar
  tabla.querySelectorAll('.eliminar').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = parseInt(e.target.dataset.id);
      if (confirm("¿Seguro que quieres eliminar este usuario?")) {
        usuarios = usuarios.filter(u => u.id !== id);
        guardarUsuarios();
        renderizarTablaUsuarios(tablaId);
      }
    });
  });

  // Eventos de editar
  tabla.querySelectorAll('.editar').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = parseInt(e.target.dataset.id);
      localStorage.setItem('editarUsuarioId', id);
      window.location.href = 'editar-usuario.html';
    });
  });
}
