document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-nuevo-producto');
  if (!form) return;

  const inputImagen = form.imagen; // input tipo file o url

  form.addEventListener('submit', e => {
    e.preventDefault();

    const codigo = form.codigo.value.trim();
    const nombre = form.nombre.value.trim();
    const descripcion = form.descripcion.value.trim();
    const precio = parseFloat(form.precio.value);
    const stock = parseInt(form.stock.value);
    const stockCritico = parseInt(form.stockCritico.value) || null;
    const categoria = form.categoria.value;

    if (codigo.length < 3) return alert('Código mínimo 3 caracteres');
    if (!nombre) return alert('Nombre requerido');
    if (precio < 0) return alert('Precio mínimo 0');
    if (stock < 0) return alert('Stock mínimo 0');
    if (!categoria) return alert('Seleccione una categoría');

    // Manejo de imagen: si es URL, usarla; si es archivo, convertir a base64
    const archivo = inputImagen.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = function () {
        const imagenBase64 = reader.result; // base64
        agregarProducto({ codigo, nombre, descripcion, precio, stock, stockCritico, categoria, imagen: imagenBase64 });
        alert('Producto agregado correctamente!');
        form.reset();
      };
      reader.readAsDataURL(archivo);
    } else {
      // Si no hay archivo, usar valor del input (URL)
      const imagen = form.imagen.value.trim() || '';
      agregarProducto({ codigo, nombre, descripcion, precio, stock, stockCritico, categoria, imagen });
      alert('Producto agregado correctamente!');
      form.reset();
    }
  });
});
