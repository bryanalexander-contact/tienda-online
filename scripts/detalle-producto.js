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

  let imagen = producto.imagen || '../img/placeholder.png';

  // Mostrar detalle principal
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

  const btnCarrito = contenedor.querySelector(".add-to-cart");
  btnCarrito.addEventListener("click", () => {
    const cantidad = parseInt(document.getElementById("quantity").value) || 1;
    addToCart(producto, cantidad);
  });

  // Productos relacionados
  const relatedContainer = document.querySelector(".related-grid");
  if (relatedContainer) {
    const relacionados = productos
      .filter(p => p.categoria === producto.categoria && p.id !== producto.id)
      .slice(0, 8); // mostrar máximo 8 productos (4 por fila x 2 filas)

    relatedContainer.innerHTML = relacionados.map(p => `
      <div class="related-item" data-id="${p.id}">
        <div class="related-image">
          <img src="${p.imagen || '../img/placeholder.png'}" alt="${p.nombre}">
        </div>
        <div class="related-info">
          <h3 class="related-name">${p.nombre}</h3>
          <div class="related-price">$${p.precio.toFixed(2)}</div>
        </div>
      </div>
    `).join('');

    // Hacer que cada tarjeta clickeeable
    relatedContainer.querySelectorAll(".related-item").forEach(card => {
      card.addEventListener("click", () => {
        const id = parseInt(card.dataset.id);
        localStorage.setItem("detalleProductoId", id);
        window.location.reload();
      });
    });
  }
});

// Funcion para añadir al carrito
function addToCart(producto, cantidad) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
  const existing = carrito.find(item => item.id === producto.id);
  if (existing) {
    existing.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }
  
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${cantidad} ${producto.nombre} añadido(s) al carrito`);
}
