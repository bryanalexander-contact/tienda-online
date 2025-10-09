let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// añadir producto al carrito
function addToCart(producto, cantidad = 1) {
  const existente = carrito.find(item => item.id === producto.id);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  guardarCarrito();
  alert("Producto añadido al carrito");
}

// mostrar carrito en carrito.html
function mostrarCarrito() {
  const contenedor = document.getElementById("carrito-contenedor");
  const totalElem = document.getElementById("carrito-total");

  if (!contenedor || !totalElem) return;

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
    totalElem.textContent = "$0.00";
    return;
  }

  carrito.forEach((item, index) => {
    const row = document.createElement("div");
    row.classList.add("carrito-item");
    row.innerHTML = `
      <img src="${item.imagen || '../img/placeholder.png'}" alt="${item.nombre}" class="carrito-img">
      <div class="carrito-info">
        <h4>${item.nombre}</h4>
        <p>Precio: $${item.precio.toFixed(2)}</p>
        <p>Cantidad: 
          <input type="number" min="1" value="${item.cantidad}" data-index="${index}" class="cantidad-input">
        </p>
        <button class="eliminar-btn" data-index="${index}">Eliminar</button>
      </div>
    `;
    contenedor.appendChild(row);
  });

  // eventos para inputs de cantidad
  contenedor.querySelectorAll(".cantidad-input").forEach(input => {
    input.addEventListener("change", e => {
      const index = e.target.dataset.index;
      carrito[index].cantidad = parseInt(e.target.value) || 1;
      guardarCarrito();
      mostrarCarrito();
    });
  });

  // eventos para eliminar
  contenedor.querySelectorAll(".eliminar-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      carrito.splice(index, 1);
      guardarCarrito();
      mostrarCarrito();
    });
  });

  // calcular el total
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  totalElem.textContent = `$${total.toFixed(2)}`;
}
