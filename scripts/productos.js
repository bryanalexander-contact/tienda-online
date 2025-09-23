// scripts/productos.js

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
