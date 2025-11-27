// apiClient.js
import { API_BASE_URL } from "../connection/apiConfig.js";

export async function apiClient(endpoint, options = {}, useAuth = false) {
  const url = `${API_BASE_URL}${endpoint}`;

  const token = useAuth ? sessionStorage.getItem("jwt") : null;

  // No agregar Content-Type si el body es FormData
  const isFormData = options.body instanceof FormData;

  const defaultHeaders = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const config = {
    method: "GET",
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  const response = await fetch(url, config);

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null; // Por si viene vacío
  }

  if (!response.ok) {
    throw new Error(data?.message || `Error ${response.status}`);
  }

  return data;
}
