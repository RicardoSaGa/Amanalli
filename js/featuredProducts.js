const productosDestacados = [
  {
    id: 1,
    name: "Vasija de barro",
    region: "Oaxaca",
    price: 450,
    image:  "../Pictures/taza-cactus-barro.jpeg",
  },
  {
    id: 2,
    name: "Muñeca de trapo",
    region: "Chiapas",
    price: 750,
    image:
      "../Pictures/muñeca-decoracion.jpeg",
  },
  {
    id: 3,
    name: "Guayabera artesanal",
    region: "Michoacán",
    price: 480,
    image:
     "../Pictures/guayabera-textil.jpeg",
  },
];

// Renderizar productos
const contenedor = document.querySelector("#productos-destacados");

productosDestacados.forEach((producto) => {
  const tarjeta = document.createElement("div");
  tarjeta.className = "col-md-4 h-100 mb-4";

   tarjeta.innerHTML = `
    <div class="card producto-card">
      <img src="${producto.image}" class="card-img-top" alt="${producto.name}">
      <div class="card-body">
        <h5 class="card-title garamond">${producto.name}</h5>
        <p class="card-text popin">${producto.region}</p>
        <p class="card-text fw-bold">$${producto.price}</p>
        <button class="btn btn-dark agregar-carrito" data-id="${producto.id}">
          Agregar
        </button>
      </div>
    </div>
  `;

  contenedor.appendChild(tarjeta);
});

// AddEventListener para que se agregue al carrito de compras
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("agregar-carrito")) {
    const id = Number(e.target.dataset.id);
    const producto = productosDestacados.find((p) => p.id === id);
    agregarCarrito(producto);
  }
});

// Función para agregar al carrito
function agregarCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existe = carrito.find((item) => item.id === producto.id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`🛒 ${producto.name} agregado al carrito`);
}