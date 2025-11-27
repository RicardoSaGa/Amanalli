import { getCategories } from "../connection/categoriaService.js";
import { getRegiones } from "../connection/regionService.js";
import { apiClient } from "../connection/apiClient.js";

// 🔹 Elementos del DOM
const productGrid = document.getElementById("productGrid");
const productCount = document.getElementById("productCount");
const searchInput = document.getElementById("searchInput");

//let filteredProducts = [...allProducts];
let allProducts = [];
let filteredProducts = [];

let allCategories = [];
let allRegions = [];

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

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Cargar productos
  allProducts = await obtenerProductos();
  filteredProducts = [...allProducts];

  // 2. Cargar filtros desde backend
  await cargarFiltrosDesdeBackend();

  // 3. Renderizar productos
  renderProducts();

  // 4. Buscar por texto en tiempo real
  searchInput.addEventListener("input", () => renderProducts());
});

async function obtenerProductos() {
  try {
    const productos = await apiClient("/productos", { method: "GET" });
    return productos.map(mapearProductoBackend);
  } catch (error) {
    console.error("Error cargando productos:", error);
    return [];
  }
}

function mapearProductoBackend(p) {
  return {
    id: p.idProducto,
    name: p.nombreProducto,
    description: p.descripcionProducto,
    price: p.precio,
    image: p.imagen,
    stock: p.stock,
    active: p.estatusProducto,
    category: p.categorias?.nombreCategoria || "Sin categoría",
    region: p.regiones?.nombreRegion || "Sin región",
  };
}

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

// gnerar filtros dinamicos
async function cargarFiltrosDesdeBackend() {
  try {
    const categorias = await getCategories();
    const regiones = await getRegiones();

    allCategories = ["Todas", ...categorias.map((c) => c.nombreCategoria)];
    allRegions = ["Todas", ...regiones.map((r) => r.nombreRegion)];

    const prices = ["Todos", "Menos de $400", "$400 - $700", "Más de $700"];

    fillFilter("categoryFilters", allCategories, "category");
    fillFilter("regionFilters", allRegions, "region");
    fillFilter("priceFilters", prices, "price");
  } catch (error) {
    console.error("Error cargando filtros: ", error);
  }
}
