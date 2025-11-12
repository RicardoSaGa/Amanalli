document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const errorCorreo = document.getElementById("error-correo");
  const errorPassword = document.getElementById("error-password");
  const status = document.getElementById("login-status");

  const togglePassword = document.getElementById("togglePassword");
  const eyeOpen = document.getElementById("eyeOpen");
  const eyeClosed = document.getElementById("eyeClosed");

  // Mostrar / ocultar contraseña
  togglePassword.addEventListener("click", () => {
    const isPassword = password.type === "password";
    password.type = isPassword ? "text" : "password";
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

  form.addEventListener("submit", (e) => {
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

    // Validación de contraseña
    if (clave.length < 6) {
      errorPassword.textContent =
        "La contraseña debe tener al menos 6 caracteres.";
      errorPassword.style.display = "block";
      password.classList.add("is-invalid");
      valid = false;
    } else {
      errorPassword.style.display = "none";
      password.classList.remove("is-invalid");
    }

    // Simulación de autenticación ---------------------------------------------------------------------
    if (valid) {
      status.textContent = "Iniciando sesión...";
      status.style.color = "var(--color-hover-enlace)";

      setTimeout(() => {
        const usuarios = [
    { email: "usuario1@amanalli.com", password: "123456" },
    { email: "neto@amanalli.com", password: "abc123" },
  ];

  // Buscar si el usuario existe
        const usuarioAutenticado = usuarios.find(
          (u) => u.email === correo && u.password === clave);

        if (usuarioAutenticado) {
          localStorage.setItem(
            "usuario",
            JSON.stringify({
              correo: correo,
              sesionIniciada: true,
              fecha: new Date().toISOString(),
            })
          );
  //----------------------hasta aqui termina el bloque de simulación de autenticación----------------------
          status.textContent = "Sesión iniciada correctamente";
          status.style.color = "green";
          email.value = "";
          password.value = "";
        } else {
          status.textContent = "Credenciales incorrectas";
          status.style.color = "red";
        }
      }, 1500);
    }
  });
});
