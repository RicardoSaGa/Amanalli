const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

const allProducts = JSON.parse(localStorage.getItem("productosAmanalli")) || [];

if (allProducts.length === 0) {
  localStorage.setItem(
    "productosAmanalli",
    JSON.stringify([
      {
        id: 1,
        nombre: "Vasija de Barro",
        categoria: "Cerámica",
        region: "Oaxaca",
        precio: 450,
        stock: 12,
        descripcion:
          "Hermosa vasija elaborada a mano con barro natural, ideal para decorar tu cocina con un toque tradicional o almacenar especias.",
        imagen:
          "https://copilot.microsoft.com/th/id/BCO.3f6e0295-3aa6-4870-9469-54e6bd7c5445",
      },
      {
        id: 2,
        nombre: "Textil Bordado",
        categoria: "Textil",
        region: "Chiapas",
        precio: 680,
        stock: 8,
        descripcion:
          "Tela bordada con motivos florales típicos de Chiapas, perfecta para caminos de mesa o decoración de interiores.",
        imagen:
          "https://copilot.microsoft.com/th/id/BCO.eef98749-ad07-42da-8691-2f2cde31a3b7",
      },
      {
        id: 3,
        nombre: "Tapete Tejido",
        categoria: "Decoración",
        region: "Puebla",
        precio: 890,
        stock: 5,
        descripcion:
          "Tapete artesanal tejido con fibras naturales, ideal para dar calidez a cualquier espacio del hogar.",
        imagen:
          "https://copilot.microsoft.com/th/id/BCO.b0067ffd-abda-45fb-9625-c7dcad731894",
      },
      {
        id: 4,
        nombre: "Cazuela Artesanal",
        categoria: "Cerámica",
        region: "Michoacán",
        precio: 520,
        stock: 10,
        descripcion:
          "Cazuela de barro cocido con esmalte tradicional, perfecta para preparar guisos con sabor auténtico.",
        imagen:
          "https://copilot.microsoft.com/th/id/BCO.b23a6517-b1eb-41f7-8879-5f89b72f70a5",
      },
      {
        id: 5,
        nombre: "Rebozo Tradicional",
        categoria: "Textil",
        region: "Oaxaca",
        precio: 390,
        stock: 15,
        descripcion:
          "Rebozo suave y ligero, tejido con técnicas ancestrales, ideal para vestir con elegancia y tradición.",
        imagen:
          "https://copilot.microsoft.com/th/id/BCO.d77bdcf3-0bf9-44cb-8b3d-520781124eb4",
      },
      {
        id: 6,
        nombre: "Máscara Tallada",
        categoria: "Decoración",
        region: "Chiapas",
        precio: 750,
        stock: 6,
        descripcion:
          "Máscara de madera tallada a mano, inspirada en las danzas tradicionales chiapanecas. Ideal para colgar en muros.",
        imagen:
          "https://copilot.microsoft.com/th/id/BCO.d200784f-cdce-48e4-91ed-e4ce2896260d",
      },
      {
        id: 7,
        nombre: "Set de Vasos Pintados",
        categoria: "Cerámica",
        region: "Puebla",
        precio: 410,
        stock: 9,
        descripcion:
          "Conjunto de vasos de cerámica pintados a mano con motivos coloridos, perfectos para servir bebidas con estilo.",
        imagen:
          "https://copilot.microsoft.com/th/id/BCO.19b0426a-6b8a-430f-8fb8-35d2cda01bdb",
      },
      {
        id: 8,
        nombre: "Camino de Mesa",
        categoria: "Textil",
        region: "Michoacán",
        precio: 480,
        stock: 11,
        descripcion:
          "Camino de mesa tejido con hilos naturales, ideal para resaltar la decoración de tu comedor.",
        imagen:
          "https://copilot.microsoft.com/th/id/BCO.4d23e9b6-9d78-4d09-ace7-f8358a2088ca",
      },
      {
        id: 9,
        nombre: "Figura Decorativa de Madera",
        categoria: "Decoración",
        region: "Oaxaca",
        precio: 640,
        stock: 7,
        descripcion:
          "Figura tallada en madera con detalles únicos, perfecta para dar un toque artesanal a tu sala o estudio.",
        imagen:
          "https://copilot.microsoft.com/th/id/BCO.57ea625f-ba09-4085-b5da-0e8c7db68efc",
      },
      {
        id: 10,
        nombre: "Camino de Mesa",
        categoria: "Textil",
        region: "Michoacán",
        precio: 480,
        stock: 10,
        descripcion:
          "Camino de mesa con bordado tradicional michoacano, ideal para celebraciones o decoración diaria.",
        imagen:
          "https://copilot.microsoft.com/th/id/BCO.ab23e7a8-ea5f-4e8e-b7ec-c92940eafa06",
      },
      {
        id: 11,
        nombre: "Figura Decorativa de Madera",
        categoria: "Decoración",
        region: "Oaxaca",
        precio: 640,
        stock: 4,
        descripcion:
          "Escultura artesanal en madera, pintada con pigmentos naturales. Ideal para coleccionistas o amantes del arte popular.",
        imagen:
          "https://copilot.microsoft.com/th/id/BCO.39cf333c-87fa-42d0-9611-9144309e1050",
      },
    ])
  );
}

const newAllProducts = JSON.parse(localStorage.getItem("productosAmanalli"));

const producto = newAllProducts.find((p) => p.id === productId);
const detalle = document.getElementById("detalleProducto");

if (!producto) {
  detalle.innerHTML = `
    <div class="d-flex flex-column justify-content-center align-items-center text-center" style="min-height: 60vh;">
      <i class="fas fa-search-minus fa-4x text-danger mb-3 icono-no-encontrado"></i>
      <p class="text-muted fs-5 mb-3">Producto no encontrado 😢</p>
      <a href="catalogo.html" class="btn btn-agregar px-4 py-2">
        <i class="fas fa-arrow-left me-2"></i> Volver al catálogo
      </a>
    </div>
  `;
} else {
  detalle.innerHTML = `
     <div class="mb-4">
          <a href="catalogo.html" class="btn .boton-agregar px-4 py-2">
               <i class="fas fa-arrow-left me-2"></i> Volver al catálogo
          </a>
     </div>
    <div class="row align-items-start">
      <div class="col-md-5">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid rounded shadow-sm" style="max-height: 100%; object-fit: contain;" />
      </div>
      <div class="col-md-7">
        <h2 class="fw-bold mb-3" style="font-family: var(--fuente-principal);">${producto.nombre}</h2>
        <p class="mb-1" style="font-family: var(--fuente-parrafos);">Región: <strong style="color: #d9a679;">${producto.region}</strong></p>
        <p class="fs-4 mb-3"><strong style="color: #c6785e;">$${producto.precio}</strong> <span style="color:#a0785a;">MXN</span></p>

        <p class="mb-4" style="font-family: var(--fuente-parrafos);">
          ${producto.descripcion}
        </p>

        <ul class="list-unstyled mb-4" style="font-family: var(--fuente-parrafos);">
          <li><strong>Categoría:</strong> ${producto.categoria}</li>
          <li><strong>Región:</strong> ${producto.region}</li>
          <li><strong>Disponibilidad:</strong> ${producto.stock} en stock</li>
        </ul>

        <div class="d-flex align-items-center mb-3">
          <label for="cantidad" class="me-2">Cantidad:</label>
          <input type="number" id="cantidad" class="form-control" style="max-width: 120px;" value="1" min="1" max="${producto.stock}" step="1" />
        </div>

        <button class="btn btn-agregar px-4 py-2" onclick="agregarCarrito(${producto.id})">
          <i class="fas fa-shopping-cart me-2"></i> Agregar al carrito
        </button>

        <div class="mt-4 p-3 bg-light rounded shadow-sm" style="font-family: var(--fuente-parrafos);">
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

  // Estilo dinámico al enfocar el input
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

    if (valor < 1) {
      cantidadInput.value = 1;
    } else if (valor > producto.stock) {
      cantidadInput.value = producto.stock;
    }
  });
}

function agregarCarrito(id) {
  const producto = allProducts.find((p) => p.id === id);
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
  alert(`🛒 ${producto.nombre} agregado al carrito (${cantidad})`);
}
