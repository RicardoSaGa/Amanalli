const allProducts = [
  {
    id: 1,
    name: "Vasija de Barro",
    category: "Cerámica",
    region: "Oaxaca",
    price: 450,
    image: "../Pictures/taza-cactus-barro.jpeg",
  },
  {
    id: 2,
    name: "Bolsa de mano artesanal",
    category: "Textil",
    region: "Chiapas",
    price: 680,
    image: "../Pictures/bolsa-textil-1.jpeg",
  },
  {
    id: 3,
    name: "Bolsa bordada a mano",
    category: "Textil",
    region: "Puebla",
    price: 890,
    image: "../Pictures/bolsa-textil-2.jpeg",
  },
  {
    id: 4,
    name: "taza de café artesanal",
    category: "Cerámica",
    region: "Michoacán",
    price: 520,
    image: "../Pictures/taza-cafe-barro.jpeg",
  },
  {
    id: 5,
    name: "sudadera de jerga",
    category: "Textil",
    region: "Oaxaca",
    price: 390,
    image: "../Pictures/sudadera-jerga-textil.jpeg",
  },
  {
    id: 6,
    name: "Muñeca de trapo",
    category: "Decoración",
    region: "Chiapas",
    price: 750,
    image: "../Pictures/muñeca-decoracion.jpeg",
  },
  {
    id: 7,
    name: "Set de Vasos Pintados",
    category: "Cerámica",
    region: "Puebla",
    price: 410,
    image: "../Pictures/tacita-barro.jpeg",
  },
  {
    id: 8,
    name: "Tortillero artesanal",
    category: "Textil",
    region: "Michoacán",
    price: 480,
    image: "../Pictures/tortillero-textil.jpeg",
  },
  {
    id: 9,
    name: "Alebrijes decorativos",
    category: "Decoración",
    region: "Oaxaca",
    price: 640,
    image: "../Pictures/alebrijes-decoracion.jpeg",
  },
  {
    id: 10,
    name: "Guayabera artesanal",
    category: "Textil",
    region: "Michoacán",
    price: 480,
    image: "../Pictures/guayabera-textil.jpeg",
  },
  {
    id: 11,
    name: "Sol decorativo",
    category: "Decoración",
    region: "Oaxaca",
    price: 640,
    image: "../Pictures/decoracion-sol.jpeg",
  },
];

// 🔹 Elementos del DOM
const productGrid = document.getElementById("productGrid");
const productCount = document.getElementById("productCount");
const searchInput = document.getElementById("searchInput");

let filteredProducts = [...allProducts];

// Renderizar productos
function renderProducts() {
  productGrid.innerHTML = "";
  const searchTerm = searchInput.value.toLowerCase();

  const visibleProducts = filteredProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm)
  );

  productCount.textContent = `Mostrando ${visibleProducts.length} productos`;

  if (visibleProducts.length === 0) {
    productGrid.innerHTML = `<p class="text-center text-muted">No se encontraron productos 😔</p>`;
    return;
  }

  visibleProducts.forEach((p) => {
    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
      <div class="card shadow-sm card-click" style="cursor:pointer;" data-id="${p.id}">
        <img src="${p.image}" class="card-img-top" alt="${p.name}">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="text-muted mb-1">${p.region}</p>
          <p class="fw-semibold">$${p.price}</p>
          <button class="btn btn-custom w-100 btn-agregar">Agregar</button>
        </div>
      </div>
    `;

    // Click en la card → detalle
    const cardClick = card.querySelector(".card-click");
    cardClick.addEventListener("click", (e) => {
      if (!e.target.classList.contains("btn-agregar")) {
        window.location.href = `detalle.html?id=${p.id}`;
      }
    });

    // Click en el botón Agregar → carrito
    const btnAgregar = card.querySelector(".btn-agregar");
    btnAgregar.addEventListener("click", (e) => {
      e.stopPropagation(); // evita que se active el click del card
      agregarCarrito(p);
    });

    productGrid.appendChild(card);
  });
}

//  Agregar al carrito
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

//  Generar filtros dinámicos
function generateFilters() {
  const categories = ["Todas", ...new Set(allProducts.map((p) => p.category))];
  const regions = ["Todas", ...new Set(allProducts.map((p) => p.region))];
  const prices = ["Todos", "Menos de $400", "$400 - $700", "Más de $700"];

  fillFilter("categoryFilters", categories, "category");
  fillFilter("regionFilters", regions, "region");
  fillFilter("priceFilters", prices, "price");
}

function fillFilter(containerId, options, type) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  options.forEach((opt, i) => {
    const id = `${type}-${i}`;
    const div = document.createElement("div");
    div.classList.add("form-check", "mb-1");
    div.innerHTML = `
      <input class="form-check-input" type="radio" name="${type}" id="${id}" value="${opt}" ${
      i === 0 ? "checked" : ""
    }>
      <label class="form-check-label" for="${id}">${opt}</label>
    `;
    container.appendChild(div);

    div.querySelector("input").addEventListener("change", () => applyFilters());
  });
}

// Aplicar filtros
function applyFilters() {
  const category = document.querySelector(
    'input[name="category"]:checked'
  ).value;
  const region = document.querySelector('input[name="region"]:checked').value;
  const price = document.querySelector('input[name="price"]:checked').value;

  filteredProducts = allProducts.filter((p) => {
    const matchCategory = category === "Todas" || p.category === category;
    const matchRegion = region === "Todas" || p.region === region;

    let matchPrice = true;
    if (price === "Menos de $400") matchPrice = p.price < 400;
    else if (price === "$400 - $700")
      matchPrice = p.price >= 400 && p.price <= 700;
    else if (price === "Más de $700") matchPrice = p.price > 700;

    return matchCategory && matchRegion && matchPrice;
  });

  renderProducts();
}

document.addEventListener("DOMContentLoaded", () => {
  generateFilters();
  renderProducts();

  searchInput.addEventListener("input", () => renderProducts());
});
