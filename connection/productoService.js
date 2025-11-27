import { apiClient } from "../connection/apiClient.js";

export async function createProduct(productData) {
  return apiClient(
    "/productos",
    {
      method: "POST",
      body: JSON.stringify(productData),
    },
    false
  ); // <-- true porque requiere JWT
}

export async function getProducts() {
  return apiClient("/productos", {}, false);
}

export async function getProductById(id) {
  return apiClient(`/productos/${id}`, {}, false);
}

export function mapProduct(apiProduct) {
  return {
    id: apiProduct.idProducto,
    name: apiProduct.nombreProducto,
    descripcion: apiProduct.descripcionProducto,
    price: apiProduct.precio,
    image: apiProduct.imagen,
    stock: apiProduct.stock,
    category: apiProduct.categorias?.nombreCategoria || "Sin categoría",
    region: apiProduct.regiones?.nombreRegion || "Sin región",
  };
}
