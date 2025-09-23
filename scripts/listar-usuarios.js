// scripts/listar-usuarios.js
document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tabla-usuarios");
  if (!tabla) return;

  function renderizarTabla() {
    tabla.innerHTML = "";

    if (usuarios.length === 0) {
      tabla.innerHTML = `<tr><td colspan="7">No hay usuarios registrados</td></tr>`;
      return;
    }

    usuarios.forEach(u => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${u.run}</td>
        <td>${u.nombre} ${u.apellidos}</td>
        <td>${u.correo}</td>
        <td>${u.tipoUsuario}</td>
        <td>${u.region} - ${u.comuna}</td>
        <td>${u.direccion}</td>
        <td>
          <button class="editar" data-id="${u.id}">Editar</button>
          <button class="eliminar" data-id="${u.id}">Eliminar</button>
        </td>
      `;
      tabla.appendChild(tr);
    });

    // Eliminar usuario
    tabla.querySelectorAll(".eliminar").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = parseInt(e.target.dataset.id);
        if (confirm("¿Seguro que quieres eliminar este usuario?")) {
          eliminarUsuario(id);
          renderizarTabla();
        }
      });
    });

    // Editar usuario
    tabla.querySelectorAll(".editar").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = parseInt(e.target.dataset.id);
        localStorage.setItem("editarUsuarioId", id);
        window.location.href = "editar-usuario.html";
      });
    });
  }

  renderizarTabla();
});
