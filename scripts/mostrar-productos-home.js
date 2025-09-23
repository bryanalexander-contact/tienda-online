// scripts/mostrar-productos-home.js
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("productos-home");
  if (!contenedor) return;

  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  if (productos.length === 0) {
    contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
    return;
  }

  // Mostrar todos los productos o solo los 4 más recientes
  const productosAMostrar = productos.slice(-4).reverse();

  productosAMostrar.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("producto-card");
    card.innerHTML = `
      <a href="pages/detalle-producto.html">
        <img src="${p.imagen || 'img/placeholder.png'}" alt="${p.nombre}">
      </a>
      <h3>${p.nombre}</h3>
      <p>${p.descripcion || ''}</p>
      <p><strong>Precio:</strong> $${p.precio.toFixed(2)}</p>
      <button class="ver-detalle" data-id="${p.id}">Ver detalle</button>
    `;
    contenedor.appendChild(card);
  });

  // Botón "Ver detalle" funcional
  contenedor.querySelectorAll(".ver-detalle").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      localStorage.setItem("detalleProductoId", id);
      window.location.href = "pages/detalle-producto.html";
    });
  });
});
