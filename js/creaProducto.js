// Configuración de URLs del backend
import { API_BASE_URL } from "../connection/apiConfig.js";

const apiConfig = {
    categorias: `${API_BASE_URL}/categorias`,
    regiones: `${API_BASE_URL}/regiones`,
    nuevoProducto: `${API_BASE_URL}/productos/nuevo-producto`
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("nuevoProductoForm");
    const nombre = document.getElementById("nombreProducto");
    const descripcion = document.getElementById("descripcion");
    const precio = document.getElementById("precio");
    const stock = document.getElementById("stock");
    const categoria = document.getElementById("categoria");
    const region = document.getElementById("region");
    const imagenUrl = document.getElementById("formFile"); // ahora URL
    const status = document.getElementById("login-status");

    const errorNombre = document.getElementById("error-nombre-producto");
    const errorDescripcion = document.getElementById("error-descripcion");
    const errorPrecio = document.getElementById("error-precio");
    const errorStock = document.getElementById("error-stock");
    const errorCategoria = document.getElementById("error-categoria");
    const errorRegion = document.getElementById("error-region");
    const errorImagen = document.getElementById("error-imagen");

  // helper: mostrar y ocultar errores
function showError(element, msg) {
    element.textContent = msg;
    element.style.display = "block";
}
function hideError(element) {
    element.textContent = "";
    element.style.display = "none";
}

  // ocultar errores al escribir y quitar is-invalid
function attachClearOnInput(inputEl, errorEl) {
    inputEl.addEventListener("input", () => {
        hideError(errorEl);
        inputEl.classList.remove("is-invalid");
    });
}

[ [nombre,errorNombre], [descripcion,errorDescripcion], [precio,errorPrecio],
    [stock,errorStock], [categoria,errorCategoria], [region,errorRegion],
    [imagenUrl,errorImagen] ].forEach(([inputEl,errorEl]) => attachClearOnInput(inputEl,errorEl));

  // Validación URL
function esUrlValida(url) {
    try {
        const u = new URL(url);
        return u.protocol === "http:" || u.protocol === "https:";
    } catch(e) {
        return false;
    }
}

  // === Cargar categorías y regiones desde backend ===
    async function cargarCategoriasYRegiones() {
    try {
      // Categorías
        const resCategorias = await fetch(apiConfig.categorias);
        const categoriasData = await resCategorias.json();
        categoriasData.forEach(c => {
        const option = document.createElement("option");
        option.value = c.idCategoria;
        option.textContent = c.nombreCategoria;
        categoria.appendChild(option);
    });

      // Regiones
        const resRegiones = await fetch(apiConfig.regiones);
        const regionesData = await resRegiones.json();
        regionesData.forEach(r => {
        const option = document.createElement("option");
        option.value = r.idRegion;
        option.textContent = r.nombreRegion;
        region.appendChild(option);
    });

    } catch (err) {
        console.error("Error cargando categorías o regiones:", err);
        status.textContent = "No se pudieron cargar categorías o regiones.";
        status.style.color = "red";
    }
}

  // Llamar al cargar la página
    cargarCategoriasYRegiones();

  // === Enviar formulario ===
    form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let valid = true;

    // limpiar mensajes
    [errorNombre,errorDescripcion,errorPrecio,errorStock,errorCategoria,errorRegion,errorImagen].forEach(hideError);
    status.textContent = "";

    const name = nombre.value.trim();
    const description = descripcion.value.trim();
    const priceNum = parseFloat(precio.value.trim());
    const stockNum = parseInt(stock.value.trim(),10);
    const categoryId = parseInt(categoria.value,10);
    const regionId = parseInt(region.value,10);
    const imageVal = imagenUrl.value.trim();

    // Validaciones
    if (name.length < 3) { 
        showError(errorNombre,"Ingresa un nombre descriptivo."); 
        nombre.classList.add("is-invalid"); valid=false; 
    }
    if (description.length < 10) { 
        showError(errorDescripcion,"Describe el producto (material, uso, tamaño)."); 
        descripcion.classList.add("is-invalid"); valid=false; 
    }
    if (!priceNum || priceNum < 0.01) { 
        showError(errorPrecio,"Ingresa un precio válido mayor a 0."); 
        precio.classList.add("is-invalid"); valid=false; 
    }
    if (!stockNum && stockNum !== 0) { 
        showError(errorStock,"Ingresa un stock."); 
        stock.classList.add("is-invalid"); valid=false; 
    }
    if (!categoryId) { 
        showError(errorCategoria,"Selecciona la categoría que mejor describa el producto."); 
        categoria.classList.add("is-invalid"); valid=false; 
    }
    if (!regionId) { 
        showError(errorRegion,"Selecciona la región de origen del producto."); 
        region.classList.add("is-invalid"); valid=false; 
    }
    if (!esUrlValida(imageVal)) { 
        showError(errorImagen,"Ingresa una URL válida de la imagen."); 
        imagenUrl.classList.add("is-invalid"); valid=false; 
    }
    
    if(!valid) {
        const primerError = document.querySelector(".is-invalid");
        if(primerError) primerError.scrollIntoView({behavior:"smooth", block:"center"});
        return;
    }

    // === Lógica original: guardar en localStorage ===
    const nuevoProductoLocal = {
        id: generarNumeroAleatorio(),
        name: name,
        description: description,
        category: categoryId,
        region: regionId,
        price: priceNum,
        stock: stockNum,
        image: imageVal,
        createdAt: new Date().toISOString()
    };
    const almacenKey = "amanalli_productos";
    const actuales = JSON.parse(localStorage.getItem(almacenKey) || "[]");
    actuales.push(nuevoProductoLocal);
    localStorage.setItem(almacenKey, JSON.stringify(actuales, null, 2));

    // === Conectar con backend ===
    const nuevoProductoBackend = {
        nombreProducto: name,
        descripcionProducto: description,
        precio: priceNum,
        stock: stockNum,
        imagen: imageVal,
        categorias: { idCategoria: categoryId },
        regiones: { idRegion: regionId }
    };

    try {
        const res = await fetch(apiConfig.nuevoProducto, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoProductoBackend)
    });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        status.textContent = "Producto agregado correctamente.";
        status.style.color = "var(--color-hover-enlace)";
    } catch(err) {
        console.error(err);
        status.textContent = "Error al agregar producto en backend, pero guardado localmente.";
        status.style.color = "red";
    }

    // limpiar formulario
    [nombre,descripcion,precio,stock,categoria,region,imagenUrl].forEach(i => i.value="");
    [nombre,descripcion,precio,stock,categoria,region,imagenUrl].forEach(i => i.classList.remove("is-invalid"));
    setTimeout(()=>{ status.textContent=""; },2000);
    });
});

// utilidad
function generarNumeroAleatorio() {
  return Math.floor(Math.random() * (100 - 20 + 1)) + 20;
}
