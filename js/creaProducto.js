document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("nuevoProductoForm");
  const nombre= document.getElementById("nombreProducto");
  const descripcion = document.getElementById("descripcion");
  const precio = document.getElementById("precio");
  const stock = document.getElementById("stock");
  const categoria = document.getElementById("categoria");
  const region = document.getElementById("region");
  const imagen = document.getElementById("formFile");
  const status = document.getElementById("login-status")
  
  const errorNombre = document.getElementById("error-nombre-producto");
  const errorDescripcion = document.getElementById("error-descripcion");
  const errorPrecio = document.getElementById("error-precio");
  const errorStock = document.getElementById("error-stock");
  const errorCategoria = document.getElementById("error-categoria");
  const errorRegion = document.getElementById("error-region");
  const errorImagen = document.getElementById("error-imagen");


// Ocultar errores mientras se escribe
  nombre.addEventListener("input", () => {
    if (nombre.value.trim()) errorNombre.textContent = "";
  });
 
  descripcion.addEventListener("input", () => {
    if (descripcion.value.trim()) errorDescripcion.textContent = "";
  });

  precio.addEventListener("input", () => {
    if (precio.value.trim()) errorPrecio.textContent = "";
  });

  stock.addEventListener("input", () => {
    if (stock.value.trim()) errorStock.textContent = "";
  });

  categoria.addEventListener("input", () => {
    if (categoria.value.trim()) errorCategoria.textContent = "";
  });

  region.addEventListener("input", () => {
    if (region.value.trim()) errorRegion.textContent = "";
  });

  imagen.addEventListener("input", () => {
    if (image.value.trim()) errorImagen.textContent = "";
  });

  // Validación y simulación de autenticación

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    

    let valid = true;
    errorNombre.textContent = "";
    errorDescripcion.textContent = "";
    errorPrecio.textContent = "";
    errorStock.textContent = "";
    errorCategoria.textContent = "";
    errorRegion.textContent = "";
    errorImagen.textContent = "";
    status.textContent = "";

    const name = nombre.value.trim();
    const description = descripcion.value.trim();
    const price = precio.value.trim();
    const pila = stock.value.trim();
    const category = categoria.value.trim();
    const regionP = region.value.trim();
    const image = imagen;

    console.log(name);

    if(name === "") {
        errorNombre.textContent = "Completa esta campo."
        errorNombre.style.display = "block";
        valid = false;
    }else{
        errorNombre.style.display = "none";
        errorNombre.classList.remove("is-invalid");
    }

    if(description === "") {
        errorDescripcion.textContent = "Completa esta campo."
        errorDescripcion.style.display = "block";
        valid = false;
    }else{
        errorDescripcion.style.display = "none";
        errorDescripcion.classList.remove("is-invalid");
    }

    if(price === "") {
        errorPrecio.textContent = "Completa esta campo."
        errorPrecio.style.display = "block";
        valid = false;
    }else{
        errorPrecio.style.display = "none";
        errorPrecio.classList.remove("is-invalid");
    }

    if(pila === "") {
        errorStock.textContent = "Completa esta campo."
        errorStock.style.display = "block";
        valid = false;
    }else{
        errorStock.style.display = "none";
        errorStock.classList.remove("is-invalid");
    }

    if(category === "") {
        errorCategoria.textContent = "Completa esta campo."
        errorCategoria.style.display = "block";
        valid = false;
    }else{
        errorCategoria.style.display = "none";
        errorCategoria.classList.remove("is-invalid");
    }

    if(regionP === "") {
        errorRegion.textContent = "Completa esta campo."
        errorRegion.style.display = "block";
        valid = false;
    }else{
        errorRegion.style.display = "none";
        errorRegion.classList.remove("is-invalid");
    }

    if(image === "") {
        errorImagen.textContent = "Completa esta campo."
        errorImagen.style.display = "block";
        valid = false;
    }else{
        errorImagen.style.display = "none";
        errorImagen.classList.remove("is-invalid");
    }
    

    // Simulación de autenticación
    if (valid) {

      status.textContent = "Se agregado el producto";
      status.style.color = "var(--color-hover-enlace)";

      const listaProducto = [
        {
            id: generarNumeroAleatorio(),
            name: nombre.value,
            category: categoria.value,
            region: region.value,
            price: precio.value,
            image: image,
        }
      ]   
      
      console.log(listaProducto);
      nombre.value = "";
      descripcion.value = "";
      precio.value = "";
      stock.value = "";
      categoria.value = "";
      region.value = "";
      imagen.value = "";

    }

  });
});

function generarNumeroAleatorio() {
  return Math.floor(Math.random() * (100 - 20 + 1)) + 20;
}
