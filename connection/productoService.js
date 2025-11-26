import { apiClient } from "./apiClient";

export async function createProduct(productData) {
  return apiClient(
    "/products",
    {
      method: "POST",
      body: JSON.stringify(productData),
    },
    true
  ); // <-- true porque requiere JWT
}

export async function getProducts() {
  return apiClient("/products", {}, false);
}

export async function getProductById(id) {
  return apiClient(`/products/${id}`, {}, false);
}
