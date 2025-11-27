// authService.js
import { API_BASE_URL } from "../connection/apiConfig.js";

export async function login(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Error en login");
  }

  const data = await response.json();

  // Guardar el token en sessionStorage o localStorage
  sessionStorage.setItem("jwt", data.token);
  // o localStorage.setItem("jwt", data.token);

  return data;
}
