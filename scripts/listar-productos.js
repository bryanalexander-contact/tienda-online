// scripts/listar-productos.js
document.addEventListener('DOMContentLoaded', () => {
  const tabla = document.getElementById('tabla-productos');
  if (!tabla) return;

  function renderizar() {
    productos = JSON.parse(localStorage.getItem('productos')) || [];
    tabla.innerHTML = '';

    productos.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.id}</td>
        <td>${p.codigo}</td>
        <td>${p.nombre}</td>
        <td>$${p.precio.toFixed(2)}</td>
        <td>${p.stock}</td>
        <td>${p.categoria}</td>
        <td>
          <button class="editar" data-id="${p.id}">Editar</button>
          <button class="eliminar" data-id="${p.id}">Eliminar</button>
        </td>
      `;
      tabla.appendChild(tr);
    });

    tabla.querySelectorAll('.editar').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.target.dataset.id;
        localStorage.setItem('editarProductoId', id);
        window.location.href = 'editar-producto.html';
      });
    });

    tabla.querySelectorAll('.eliminar').forEach(btn => {
      btn.addEventListener('click', e => {
        eliminarProducto(parseInt(e.target.dataset.id));
        renderizar();
      });
    });
  }

  renderizar();
});
