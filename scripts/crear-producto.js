// scripts/crear-producto.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-nuevo-producto');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const codigo = form.codigo.value.trim();
    const nombre = form.nombre.value.trim();
    const descripcion = form.descripcion.value.trim();
    const precio = parseFloat(form.precio.value);
    const stock = parseInt(form.stock.value);
    const stockCritico = parseInt(form.stockCritico.value) || null;
    const categoria = form.categoria.value;
    const imagen = form.imagen.value.trim();

    if (codigo.length < 3) return alert('Código mínimo 3 caracteres');
    if (!nombre) return alert('Nombre requerido');
    if (precio < 0) return alert('Precio mínimo 0');
    if (stock < 0) return alert('Stock mínimo 0');
    if (!categoria) return alert('Seleccione una categoría');

    agregarProducto({ codigo, nombre, descripcion, precio, stock, stockCritico, categoria, imagen });
    alert('Producto agregado correctamente!');
    form.reset();
  });
});
