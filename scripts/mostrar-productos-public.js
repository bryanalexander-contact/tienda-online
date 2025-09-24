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
    card.innerHTML = `
      <img src="${p.imagen || '../img/placeholder.png'}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>${p.descripcion || ''}</p>
      <p><strong>Precio:</strong> $${p.precio.toFixed(2)}</p>
      <div class="acciones-producto">
        <button class="ver-detalle" data-id="${p.id}">Ver detalle</button>
        <button class="add-to-cart" data-id="${p.id}"><i class="fas fa-cart-plus"></i> Añadir</button>
      </div>
    `;
    contenedor.appendChild(card);
  });

  // Manejar botón "Ver detalle"
  contenedor.querySelectorAll(".ver-detalle").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      localStorage.setItem("detalleProductoId", id);
      window.location.href = "detalle-producto.html";
    });
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
