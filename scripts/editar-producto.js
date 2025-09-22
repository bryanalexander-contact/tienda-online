// scripts/editar-producto.js

// Buscar producto y rellenar el formulario
document.getElementById('buscarProductoForm').addEventListener('submit', e => {
  e.preventDefault();
  const id = parseInt(document.getElementById('productoId').value);
  const producto = obtenerProducto(id);

  if (!producto) {
    alert('Producto no encontrado');
    return;
  }

  // Mostrar formulario y rellenar campos
  const formEditar = document.getElementById('formEditar');
  formEditar.style.display = 'block';
  formEditar.dataset.id = id;

  formEditar.nombre.value = producto.nombre;
  formEditar.precio.value = producto.precio;
  formEditar.categoria.value = producto.categoria;
  formEditar.descripcion.value = producto.descripcion || '';
  formEditar.imagen.value = producto.imagen || '';
});

// Guardar cambios
document.getElementById('formEditar').addEventListener('submit', e => {
  e.preventDefault();

  const id = parseInt(e.target.dataset.id);
  const datos = {
    nombre: e.target.nombre.value,
    precio: parseFloat(e.target.precio.value),
    categoria: e.target.categoria.value,
    descripcion: e.target.descripcion.value,
    imagen: e.target.imagen.value
  };

  actualizarProducto(id, datos);
  alert('Producto actualizado!');
  e.target.reset();
  e.target.style.display = 'none';
});
