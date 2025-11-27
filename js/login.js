import { login } from "../connection/authService.js";
import { API_BASE_URL } from "../connection/apiConfig.js";

const apiConfig = {
  usuarios: `${API_BASE_URL}/usuarios`
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const errorCorreo = document.getElementById("error-correo");
  const errorPassword = document.getElementById("error-password");
  const status = document.getElementById("login-status");

  const input = document.getElementById("password")
  const togglePassword = document.getElementById("togglePassword");
  const eyeOpen = document.getElementById("eyeOpen");
  const eyeClosed = document.getElementById("eyeClosed");

  // Mostrar / ocultar contraseña
  togglePassword.addEventListener("click", () => {
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    eyeOpen.classList.toggle("d-none");
    eyeClosed.classList.toggle("d-none");
  });

  // Ocultar errores mientras se escribe
  email.addEventListener("input", () => {
    if (email.value.trim()) errorCorreo.textContent = "";
  });

  password.addEventListener("input", () => {
    if (password.value.trim()) errorPassword.textContent = "";
  });

  // Validación y simulación de autenticación

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let valid = true;
    errorCorreo.textContent = "";
    errorPassword.textContent = "";
    status.textContent = "";

    const correo = email.value.trim();
    const clave = password.value.trim();

    // Validación de correo electrónico
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    if (!correoValido) {
      errorCorreo.textContent = "Ingresa un correo válido.";
      errorCorreo.style.display = "block";
      email.classList.add("is-invalid");
      valid = false;
    } else {
      errorCorreo.style.display = "none";
      email.classList.remove("is-invalid");
    }

    if(password.value.trim() === "") {
      errorPassword.textContent = "Ingresa una contraseña valida";
      errorPassword.style.display = "block";
      password.classList.add("is-invalid");
      valid = false;
    } else {
      errorPassword.style.display = "none";
      password.classList.remove("is-invalid");
    }

    // Simulación de autenticación usuarios pre almacenados ---------------------------------------------------------------------
    if (valid) {
      try {
        const data = await login(correo, clave); // tu función que hace el POST al backend

        // Si el backend respondió correctamente (ej. te regresó el token):
        if (data) {
          status.textContent = "Sesión iniciada correctamente";
          status.style.color = "green";

          email.value = "";
          password.value = "";

          // Redirección al index
          window.location.href = "../index.html"; // o "/" según tu estructura
        }
      } catch (error) {
        status.textContent = "Usuario o contraseña incorrectos";
        status.style.color = "red";
      }
    }

  });
});
