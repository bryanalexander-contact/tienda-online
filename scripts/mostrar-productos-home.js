document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("productos-home");
  if (!contenedor) return;

  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  if (productos.length === 0) {
    contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
    return;
  }

  productos.forEach(p => {
    // Crear tarjeta 
    const card = document.createElement("div");
    card.classList.add("producto"); // ← importante: coincide con tu CSS

    // TARJETA HTML PRODUCTO
    card.innerHTML = `
      <img src="${p.imagen || 'img/placeholder.png'}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>${p.descripcion || ''}</p>
      <p class="precio">$${p.precio.toFixed(2)}</p>
      <button class="add-to-cart" data-id="${p.id}">Añadir al carrito</button>
    `;

    // Evento click en toda la tarjeta
    card.addEventListener("click", () => {
      localStorage.setItem("detalleProductoId", p.id);
      window.location.href = "pages/detalle-producto.html";
    });

    // Detener propagación cuando hacen click en el botón de carrito
    const boton = card.querySelector(".add-to-cart");
    boton.addEventListener("click", e => {
      e.stopPropagation();
      const id = e.target.dataset.id;
      const producto = productos.find(prod => prod.id == id);
      if (producto) {
        addToCart(producto, 1);
      } else {
        console.error("Producto no encontrado en localStorage");
      }
    });

    contenedor.appendChild(card);
  });
});
