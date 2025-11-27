// categoriaService.js
import { apiClient } from "../connection/apiClient.js";

export const getCategories = () => apiClient("/categorias");

export const getCategoryById = (id) => apiClient(`/categorias/${id}`);
