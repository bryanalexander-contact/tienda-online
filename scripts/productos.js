// scripts/productos.js

// Inicializar productos
let productos = JSON.parse(localStorage.getItem('productos')) || [];

// Guardar en localStorage
function guardarProductos() {
  localStorage.setItem('productos', JSON.stringify(productos));
}

// Generar ID único
function generarId() {
  return productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
}

// Añadir producto
function agregarProducto(producto) {
  producto.id = generarId();
  productos.push(producto);
  guardarProductos();
}

// Eliminar producto
function eliminarProducto(id) {
  productos = productos.filter(p => p.id !== id);
  guardarProductos();
}

// Obtener producto por ID
function obtenerProducto(id) {
  return productos.find(p => p.id === id);
}

// Actualizar producto
function actualizarProducto(id, datos) {
  const prod = obtenerProducto(id);
  if (prod) {
    Object.assign(prod, datos);
    guardarProductos();
  }
}

// Renderizar productos en tabla
function renderizarTablaProductos(tablaId) {
  const tabla = document.getElementById(tablaId);
  if (!tabla) return;

  // Releer productos siempre desde localStorage para no usar copia vieja
  productos = JSON.parse(localStorage.getItem('productos')) || [];

  tabla.innerHTML = '';
  productos.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>$${p.precio.toFixed(2)}</td>
      <td>${p.categoria}</td>
      <td>
        <button class="editar" data-id="${p.id}">Editar</button>
        <button class="eliminar" data-id="${p.id}">Eliminar</button>
      </td>
    `;
    tabla.appendChild(tr);
  });

  // Asignar eventos
  tabla.querySelectorAll('.editar').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.target.dataset.id;
      localStorage.setItem('editarProductoId', id);
      window.location.href = 'editar-producto.html';
    });
  });

  tabla.querySelectorAll('.eliminar').forEach(btn => {
    btn.addEventListener('click', e => {
      eliminarProducto(parseInt(e.target.dataset.id));
      renderizarTablaProductos(tablaId);
    });
  });
}

// Llenar formulario de edición
function llenarFormularioEditar(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const idEditar = parseInt(localStorage.getItem('editarProductoId'));
  const producto = obtenerProducto(idEditar);
  if (!producto) return;

  form.nombre.value = producto.nombre;
  form.precio.value = producto.precio;
  form.categoria.value = producto.categoria;
  form.descripcion.value = producto.descripcion || '';
  form.imagen.value = producto.imagen || '';

  form.addEventListener('submit', e => {
    e.preventDefault();
    const datos = {
      nombre: form.nombre.value,
      precio: parseFloat(form.precio.value),
      categoria: form.categoria.value,
      descripcion: form.descripcion.value,
      imagen: form.imagen.value
    };
    actualizarProducto(idEditar, datos);
    alert('Producto actualizado!');
    window.location.href = 'mostrar-productos.html';
  });
}

// Llenar formulario de nuevo producto
function manejarFormularioNuevo(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const nuevo = {
      nombre: form.nombre.value,
      precio: parseFloat(form.precio.value),
      categoria: form.categoria.value,
      descripcion: form.descripcion.value,
      imagen: form.imagen.value
    };
    agregarProducto(nuevo);
    alert('Producto agregado!');
    form.reset();
  });
}

// 🔄 Escuchar cambios en localStorage y refrescar productos automáticamente
window.addEventListener('storage', e => {
  if (e.key === 'productos') {
    productos = JSON.parse(localStorage.getItem('productos')) || [];
    const tabla = document.getElementById('tabla-productos');
    if (tabla) {
      renderizarTablaProductos('tabla-productos');
    }
  }
});
