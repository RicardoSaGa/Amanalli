// authService.js
import { API_BASE_URL } from "../connection/apiConfig.js";

export async function login(correo, contrasena) {
  const response = await fetch(`${API_BASE_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: correo,
      password: contrasena,
    }),
  });

  if (!response.ok) {
    throw new Error("Error en login");
  }

  const data = await response.json();
  console.log(data);

  sessionStorage.setItem("jwt", data.token);

  return data;
}
