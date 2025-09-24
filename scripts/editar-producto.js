// scripts/editar-producto.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-editar-producto');
  if (!form) return;

  const idEditar = parseInt(localStorage.getItem('editarProductoId'));
  const producto = obtenerProducto(idEditar);
  if (!producto) {
    alert('Producto no encontrado');
    window.location.href = 'mostrar-productos.html';
    return;
  }

  // Rellenar formulario
  form.codigo.value = producto.codigo;
  form.nombre.value = producto.nombre;
  form.descripcion.value = producto.descripcion || '';
  form.precio.value = producto.precio;
  form.stock.value = producto.stock;
  form.stockCritico.value = producto.stockCritico || '';
  form.categoria.value = producto.categoria;
  form.imagen.value = producto.imagen || '';

  form.addEventListener('submit', e => {
    e.preventDefault();

    const datos = {
      codigo: form.codigo.value.trim(),
      nombre: form.nombre.value.trim(),
      descripcion: form.descripcion.value.trim(),
      precio: parseFloat(form.precio.value),
      stock: parseInt(form.stock.value),
      stockCritico: parseInt(form.stockCritico.value) || null,
      categoria: form.categoria.value
    };

    const archivo = form.imagen.files ? form.imagen.files[0] : null;
    if (archivo) {
      const reader = new FileReader();
      reader.onload = function () {
        datos.imagen = reader.result;
        actualizarProducto(idEditar, datos);
        alert('Producto actualizado!');
        window.location.href = 'mostrar-productos.html';
      };
      reader.readAsDataURL(archivo);
    } else {
      datos.imagen = form.imagen.value.trim() || '';
      actualizarProducto(idEditar, datos);
      alert('Producto actualizado!');
      window.location.href = 'mostrar-productos.html';
    }
  });
});
