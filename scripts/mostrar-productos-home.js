// scripts/mostrar-productos-home.js
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("productos-home");
  if (!contenedor) return;

  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  if (productos.length === 0) {
    contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
    return;
  }

  productos.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("producto-card");

    // contenido de la tarjeta (sin <a> en la imagen)
    card.innerHTML = `
      <img src="${p.imagen || 'img/placeholder.png'}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>${p.descripcion || ''}</p>
      <p><strong>Precio:</strong> $${p.precio.toFixed(2)}</p>
      <button class="add-to-cart" data-id="${p.id}">Añadir al carrito</button>
    `;

    // 👉 evento click en toda la tarjeta
    card.addEventListener("click", () => {
      localStorage.setItem("detalleProductoId", p.id);
      window.location.href = "pages/detalle-producto.html";
    });

    // 👉 detener propagación cuando hacen click en el botón de carrito
    card.querySelector(".add-to-cart").addEventListener("click", e => {
      e.stopPropagation(); // evita que se dispare el evento de la tarjeta
      const id = e.target.dataset.id;
      const producto = productos.find(p => p.id == id);
      if (producto) {
        addToCart(producto, 1);
      } else {
        console.error("Producto no encontrado en localStorage");
      }
    });

    contenedor.appendChild(card);
  });
});
