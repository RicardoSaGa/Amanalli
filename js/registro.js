import { API_BASE_URL } from "../connection/apiConfig.js";

const apiConfig = {
  usuarios: `${API_BASE_URL}/usuarios`
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const nombre = document.getElementById("nombre");
  const telefono = document.getElementById("telefono");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const password2 = document.getElementById("password2");
  const errorNombre = document.getElementById("error-nombre");
  const errorTelefono = document.getElementById("error-telefono");
  const errorCorreo = document.getElementById("error-correo");
  const errorPassword = document.getElementById("error-password");
  const errorPassword2 = document.getElementById("error-password2");
  const status = document.getElementById("registro-status");

  // Función para mostrar/ocultar contraseña
  function configurarTogglePassword(inputId, toggleBtnId, eyeOpenId, eyeClosedId) {
    const input = document.getElementById(inputId);
    const toggleBtn = document.getElementById(toggleBtnId);
    const eyeOpen = document.getElementById(eyeOpenId);
    const eyeClosed = document.getElementById(eyeClosedId);

    toggleBtn.addEventListener("click", () => {
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      eyeOpen.classList.toggle("d-none");
      eyeClosed.classList.toggle("d-none");
    });
  }

  configurarTogglePassword("password", "togglePassword", "eyeOpen", "eyeClosed");
  configurarTogglePassword("password2", "togglePassword2", "eyeOpen2", "eyeClosed2");

  // Ocultar errores mientras se escribe
  function ocultarErrores(id, error) {
    id.addEventListener("input", () => {
      if (id.value.trim()) error.textContent = "";
      id.classList.remove("is-invalid");
    });
  }
  [ [email,errorCorreo],[nombre,errorNombre],[telefono,errorTelefono],
    [password,errorPassword],[password2,errorPassword2] ].forEach(([input,error]) => ocultarErrores(input,error));

  function showErrorStyles(errorElement, message, element) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
    element.classList.add("is-invalid");
  }

  function hideErrorStyles(errorElement, element) {
    errorElement.style.display = "none";
    element.classList.remove("is-invalid");
  }

  // Guardar usuario en backend
  async function registrarUsuarioBackend(usuario) {
    const res = await fetch(apiConfig.usuarios, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  }

  // Guardar usuario en localStorage
  function guardarUsuarioLocal(usuario) {
    const key = "usuarios_amanalli";
    const actuales = JSON.parse(localStorage.getItem(key) || "[]");
    actuales.push(usuario);
    localStorage.setItem(key, JSON.stringify(actuales, null, 2));
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let valid = true;

    const name = nombre.value.trim();
    const phone = telefono.value.trim();
    const correo = email.value.trim();
    const clave = password.value.trim();
    const clave2 = password2.value.trim();

    // Validaciones
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) { showErrorStyles(errorCorreo,"Ingresa un correo válido.",email); valid=false; } 
    else hideErrorStyles(errorCorreo,email);

    if (name === "") { showErrorStyles(errorNombre,"Ingresa tu nombre completo.",nombre); valid=false; } 
    else hideErrorStyles(errorNombre,nombre);

    if (!/^\d{10}$/.test(phone)) { showErrorStyles(errorTelefono,"Ingresa un número de teléfono válido.",telefono); valid=false; } 
    else hideErrorStyles(errorTelefono,telefono);

    const regexContrasena = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!regexContrasena.test(clave)) { showErrorStyles(errorPassword,"La contraseña debe tener al menos 6 caracteres, minúsculas, al menos una mayúscula y un número.",password); valid=false; } 
    else hideErrorStyles(errorPassword,password);

    if (clave !== clave2) { showErrorStyles(errorPassword2,"La contraseña no coincide.",password2); valid=false; } 
    else hideErrorStyles(errorPassword2,password2);

    if (!valid) return;

    const usuario = {
      nombreCompleto: name,
      telefono: phone,
      email: correo,
      password: clave
    };

    // Guardar en localStorage primero
    guardarUsuarioLocal({ ...usuario, fecha: new Date().toISOString() });

    try {
      await registrarUsuarioBackend(usuario);
      status.textContent = "Usuario registrado correctamente!";
      status.style.color = "green";

      // Vaciar formulario
      [nombre, telefono, email, password, password2].forEach(i => i.value = "");
    } catch (err) {
      console.error(err);
      status.textContent = "Error al registrar el usuario.";
      status.style.color = "orange";
    }

    setTimeout(() => { status.textContent = ""; }, 3000);
  });
});
