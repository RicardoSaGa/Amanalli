const carritoContainer = document.getElementById("carritoContainer");
const totalContainer = document.getElementById("carritoTotal");

function cargarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carritoContainer.innerHTML = "";

  if (carrito.length === 0) {
    carritoContainer.innerHTML = `<p class="text-center text-muted">Tu carrito está vacío 🛒</p>`;
    totalContainer.textContent = "$0";
    return;
  }

  let total = 0;

  carrito.forEach((item, index) => {
    total += item.price * item.cantidad;

    carritoContainer.innerHTML += `
      <div class="card mb-3 p-3">
        <div class="row align-items-center">
          <div class="col-md-3">
            <img src="${item.image}" class="img-fluid rounded">
          </div>
          <div class="col-md-5">
            <h5>${item.name}</h5>
            <p class="text-muted">Cantidad: ${item.cantidad}</p>
            <p><strong>$${item.price}</strong> c/u</p>
          </div>
          <div class="col-md-4 text-end">
            <button class="btn btn-danger" onclick="eliminarProducto(${index})">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    `;
  });

  totalContainer.textContent = "$" + total;
}

function eliminarProducto(i) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(i, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

document.addEventListener("DOMContentLoaded", cargarCarrito);
