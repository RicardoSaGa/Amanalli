import { getProductById, mapProduct } from "../connection/productoService.js";

const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));
const detalle = document.getElementById("detalleProducto");

// ============================
// CARGAR PRODUCTO DESDE LA API
// ============================
async function loadProduct() {
  try {
    const apiProduct = await getProductById(productId);
    const producto = mapProduct(apiProduct);

    renderDetalle(producto);
  } catch (error) {
    console.error("Error cargando producto:", error);

    detalle.innerHTML = `
      <div class="d-flex flex-column justify-content-center align-items-center text-center" style="min-height: 60vh;">
        <i class="fas fa-search-minus fa-4x text-danger mb-3"></i>
        <p class="text-muted fs-5 mb-3">Producto no encontrado 😢</p>
        <a href="catalogo.html" class="btn btn-agregar px-4 py-2">
          <i class="fas fa-arrow-left me-2"></i> Volver al catálogo
        </a>
      </div>
    `;
  }
}

loadProduct();

// ============================
// RENDERIZAR DETALLE
// ============================
function renderDetalle(producto) {
  detalle.innerHTML = `
     <div class="mb-4">
          <a href="catalogo.html" class="btn btn-agregar px-4 py-2">
               <i class="fas fa-arrow-left me-2"></i> Volver al catálogo
          </a>
     </div>

    <div class="row align-items-start">
      <div class="col-md-5">
        <img src="${producto.image}" alt="${producto.name}"
        class="img-fluid rounded shadow-sm" 
        style="max-height: 100%; object-fit: contain;" />
      </div>

      <div class="col-md-7">
        <h2 class="fw-bold mb-3">${producto.name}</h2>
        <p>Región: <strong style="color: #d9a679;">${
          producto.region
        }</strong></p>
        <p class="fs-4 mb-3">
          <strong style="color: #c6785e;">$${producto.price}</strong> 
          <span>MXN</span>
        </p>

        <p class="mb-4">${producto.descripcion}</p>

        <ul class="list-unstyled mb-4">
          <li><strong>Categoría:</strong> ${producto.category}</li>
          <li><strong>Región:</strong> ${producto.region}</li>
          <li><strong>Disponibilidad:</strong> ${producto.stock} en stock</li>
        </ul>

        <div class="d-flex align-items-center mb-3">
          <label for="cantidad" class="me-2">Cantidad:</label>
          <input type="number" id="cantidad" class="form-control"
            style="max-width: 120px;" value="1"
            min="1" max="${producto.stock}" step="1" />
        </div>

        <button class="btn btn-agregar px-4 py-2" onclick='agregarCarrito(${JSON.stringify(
          producto
        )})'>
          <i class="fas fa-shopping-cart me-2"></i> Agregar al carrito
        </button>

        <div class="mt-4 p-3 bg-light rounded shadow-sm">
          <h6 class="fw-semibold mb-2">Información de envío</h6>
          <ul class="list-unstyled mb-0">
            <li>🚚 Envío gratis en compras mayores a $1000</li>
            <li>📦 Entrega estimada: 5-7 días hábiles</li>
            <li>🎁 Empaque especial para productos frágiles</li>
            <li>🔄 Devoluciones dentro de 30 días</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  // ====== estilos del input ======
  const cantidadInput = document.getElementById("cantidad");
  cantidadInput.addEventListener("focus", () => {
    cantidadInput.style.borderColor = "#8b5e3c";
    cantidadInput.style.boxShadow = "0 0 0 0.2rem rgba(139,94,60,0.25)";
  });
  cantidadInput.addEventListener("blur", () => {
    cantidadInput.style.borderColor = "";
    cantidadInput.style.boxShadow = "";
  });

  cantidadInput.addEventListener("input", () => {
    const valor = parseInt(cantidadInput.value);
    if (valor < 1) cantidadInput.value = 1;
    if (valor > producto.stock) cantidadInput.value = producto.stock;
  });
}

// ============================
// AGREGAR AL CARRITO (LOCALSTORAGE)
// ============================
window.agregarCarrito = function (producto) {
  const cantidadInput = document.getElementById("cantidad");
  let cantidad = parseInt(cantidadInput.value);

  if (isNaN(cantidad) || cantidad < 1) cantidad = 1;
  if (cantidad > producto.stock) cantidad = producto.stock;

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existe = carrito.find((item) => item.id === producto.id);

  if (existe) {
    existe.cantidad = Math.min(existe.cantidad + cantidad, producto.stock);
  } else {
    carrito.push({ ...producto, cantidad });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert(`🛒 ${producto.name} agregado al carrito (${cantidad})`);
};
