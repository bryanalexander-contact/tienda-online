// scripts/mostrar-productos-public.js
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("lista-productos");
  if (!contenedor) return;

  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  if (productos.length === 0) {
    contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
    return;
  }

  productos.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("producto-card");

    // La tarjeta completa es clickeable
    card.innerHTML = `
      <img src="${p.imagen || '../img/placeholder.png'}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>${p.descripcion || ''}</p>
      <p><strong>Precio:</strong> $${p.precio.toFixed(2)}</p>
      <div class="acciones-producto">
        <button class="add-to-cart" data-id="${p.id}">
          <i class="fas fa-cart-plus"></i> Añadir
        </button>
      </div>
    `;

    // Clic en la tarjeta → abrir detalle
    card.addEventListener("click", e => {
      // Evitar que el clic en "Añadir al carrito" abra el detalle
      if (e.target.closest(".add-to-cart")) return;

      localStorage.setItem("detalleProductoId", p.id);
      window.location.href = "detalle-producto.html";
    });

    contenedor.appendChild(card);
  });

  // Manejar botón "Añadir al carrito"
  contenedor.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = parseInt(e.target.dataset.id);
      const producto = productos.find(p => p.id === id);

      if (!producto) return;

      // Verificar si ya está en el carrito
      const existente = carrito.find(item => item.id === id);
      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }

      guardarCarrito();
      alert(`"${producto.nombre}" se añadió al carrito ✅`);
    });
  });
});
