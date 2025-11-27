//import { login } from "./authService.js";

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

    if(password === "") {
      errorPassword.textContent = "Ingresa una contraseña valida";
      errorPassword.style.display = "block";
      email.classList.add("is-invalid");
      valid = false;
    } else {
      errorCorreo.style.display = "none";
      email.classList.remove("is-invalid");
    }

    // Simulación de autenticación usuarios pre almacenados ---------------------------------------------------------------------
    if (valid) {

      const correoElectronico = email;
      const url = `http://localhost:8081/api/v1/users/email?email=${correoElectronico}`

      fetch(url)
        .then(response => response.json())
        .then(data => {
              status.textContent = "Sesión iniciada correctamente";
              status.style.color = "green";
              email.value = "";
              password.value = "";
        })
        .catch(error =>{
          status.textContent = "Usuario no registrado";
          status.style.color = "red";
        })
      /*console.log("Estas entrando");
      
      const codigo = JSON.parse(localStorage.getItem("usuario"));
      status.textContent = "Iniciando sesión...";
      status.style.color = "var(--color-hover-enlace)";

      try {
        // Llamada real a la API
        

        // Guardar info del usuario junto con el token
        /*localStorage.setItem(
          "usuario",
          JSON.stringify({
            correo,
            sesionIniciada: true,
            fecha: new Date().toISOString(),
            token: data.token,
          })
        );

      

        // Aquí podrías redirigir al dashboard
        // window.location.href = "/dashboard.html";
      } catch (err) {
        status.textContent = err.message;
        status.style.color = "red";
      }*/
    }
  });
});
