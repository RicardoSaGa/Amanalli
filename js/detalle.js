const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

const allProducts = JSON.parse(localStorage.getItem("productosAmanalli")) || [];

if (allProducts.length === 0) {
  localStorage.setItem(
    "productosAmanalli",
    JSON.stringify([
      {
        id: 1,
        name: "Vasija de Barro",
        category: "Cerámica",
        region: "Oaxaca",
        price: 450,
        stock: 12,
        descripcion:
          "Hermosa vasija decorativa, elaborada a mano con barro natural, ideal para decorar tu cocina con un toque tradicional o almacenar especias.",
        image:
          "../Pictures/taza-cactus-barro.jpeg",
      },
      {
        id: 2,
        name: "Bolsa de mano/Textil Bordado",
        category: "Textil",
        region: "Chiapas",
        price: 680,
        stock: 8,
        descripcion:
          "Hermosa bolsa de mano artesanal, hecha con textil bordado a mano. Excelente artículo decorativo/funcional para complementar la vestimenta.",
        image:
          "../Pictures/bolsa-textil-1.jpeg",
      },
      {
        id: 3,
        name: "Bolsa bordada a mano",
        category: "Decoración",
        region: "Puebla",
        price: 890,
        stock: 5,
        descripcion:
          "Bolsa bordada a mano con textil bordado artesanal. Implementa funcionalidad y moda con un precioso estilo artístico.",
        image:
          "../Pictures/bolsa-textil-2.jpeg",
      },
      {
        id: 4,
        name: "taza de café artesanal",
        category: "Cerámica",
        region: "Michoacán",
        price: 520,
        stock: 10,
        descripcion:
          "taza de barro cocido con esmalte tradicional, perfecta para el café de la mañana o cualquier bebida caliente.",
        image:
          "../Pictures/taza-cafe-barro.jpeg",
      },
      {
        id: 5,
        name: "sudadera de jerga",
        category: "Textil",
        region: "Oaxaca",
        price: 390,
        stock: 15,
        descripcion:
          "sudadera suave y ligera, tejido con técnicas ancestrales, ideal para vestir con elegancia y tradición.",
        image:
          "../Pictures/sudadera-jerga-textil.jpeg",
      },
      {
        id: 6,
        name: "Muñeca de trapo",
        category: "Decoración",
        region: "Chiapas",
        price: 750,
        stock: 6,
        descripcion:
          "Hermosa muñeca de trapo, tradicional  artículo mexicano. Elaborada a mano con textil bordado y decoración artesanal",
        image:
          "../Pictures/muñeca-decoracion.jpeg",
      },
      {
        id: 7,
        name: "Set de Vasos Pintados",
        category: "Cerámica",
        region: "Puebla",
        price: 410,
        stock: 9,
        descripcion:
          "Conjunto de vasos de cerámica pintados a mano con motivos coloridos, perfectos para servir bebidas con estilo.",
        image:
          "../Pictures/tacita-barro.jpeg",
      },
      {
        id: 8,
        name: "Tortillero artesanal",
        category: "Textil",
        region: "Michoacán",
        price: 480,
        stock: 11,
        descripcion:
          "Hermoso y funcional tortillero con hermoso bordado artesanal, ideal para poner en el centro de la mesa y mantener las tortillas calientes.",
        image:
          "../Pictures/tortillero-textil.jpeg",
      },
      {
        id: 9,
        name: "Alebrijes decorativos",
        category: "Decoración",
        region: "Oaxaca",
        price: 640,
        stock: 7,
        descripcion:
          "Los alebrijes originales, artesanales y llenos de cultura, hechos con procesos artesanales con arcilla cocida y pintados a mano.",
        image:
          "../Pictures/alebrijes-decoracion.jpeg",
      },
      {
        id: 10,
        name: "Guayabera artesanal",
        category: "Textil",
        region: "Michoacán",
        price: 480,
        stock: 10,
        descripcion:
          "Guayabera artesanal, elaborada con tela de lino fresca y transpirable. Excelente prenda para vestir elegante y tradicional al mismo tiempo ",
        image:
          "../Pictures/guayabera-textil.jpeg",
      },
      {
        id: 11,
        name: "Sol decorativo",
        category: "Decoración",
        region: "Oaxaca",
        price: 640,
        stock: 4,
        descripcion:
          "Escultura artesanal decorativa hecha de barro con forma de sol, pintada con pigmentos naturales. Ideal para coleccionistas o amantes del arte popular.",
        image:
          "../Pictures/decoracion-sol.jpeg",
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
        <img src="${producto.image}" alt="${producto.name}" class="img-fluid rounded shadow-sm" style="max-height: 100%; object-fit: contain;" />
      </div>
      <div class="col-md-7">
        <h2 class="fw-bold mb-3" style="font-family: var(--fuente-principal);">${producto.name}</h2>
        <p class="mb-1" style="font-family: var(--fuente-parrafos);">Región: <strong style="color: #d9a679;">${producto.region}</strong></p>
        <p class="fs-4 mb-3"><strong style="color: #c6785e;">$${producto.price}</strong> <span style="color:#a0785a;">MXN</span></p>

        <p class="mb-4" style="font-family: var(--fuente-parrafos);">
          ${producto.descripcion}
        </p>

        <ul class="list-unstyled mb-4" style="font-family: var(--fuente-parrafos);">
          <li><strong>Categoría:</strong> ${producto.category}</li>
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
