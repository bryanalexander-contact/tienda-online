// scripts/mostrar-productos-public.js
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("lista-productos");
  if (!contenedor) return;

  const productos = JSON.parse(localStorage.getItem("productos")) || [];

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
      <button class="ver-detalle" data-id="${p.id}">Ver detalle</button>
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
});
