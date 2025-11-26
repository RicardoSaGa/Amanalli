// apiClient.js
import { API_BASE_URL } from "./apiConfig";

export async function apiClient(endpoint, options = {}, useAuth = false) {
  const url = `${API_BASE_URL}${endpoint}`;

  const token = useAuth ? sessionStorage.getItem("jwt") : null;

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status}`);
  }

  return response.json();
}
