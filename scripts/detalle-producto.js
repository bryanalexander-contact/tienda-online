// scripts/detalle-producto.js
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("detalle-producto");
  if (!contenedor) return;

  const id = parseInt(localStorage.getItem("detalleProductoId"));
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    contenedor.innerHTML = "<p>Producto no encontrado.</p>";
    return;
  }

  // Verifica si la imagen es base64 o URL
  let imagen = producto.imagen || '../img/placeholder.png';
  
  contenedor.innerHTML = `
    <div class="product-section">
      <div class="image-gallery">
        <div class="main-image">
          <img src="${imagen}" alt="${producto.nombre}">
        </div>
      </div>
      <div class="product-info">
        <h2 class="product-name">${producto.nombre}</h2>
        <div class="product-price">$${producto.precio.toFixed(2)}</div>
        <p class="product-description">${producto.descripcion || ''}</p>
        <div class="quantity-selector">
          <label for="quantity">Cantidad:</label>
          <input type="number" id="quantity" class="quantity-input" min="1" value="1">
        </div>
        <button class="add-to-cart"><i class="fas fa-cart-plus"></i> Añadir al carrito</button>
      </div>
    </div>
  `;
});
