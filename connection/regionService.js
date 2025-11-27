// regionService.js
import { apiClient } from "../connection/apiClient.js";

export const getRegiones = () => apiClient("/regiones");

export const getRegionById = (id) => apiClient(`/regiones/${id}`);
