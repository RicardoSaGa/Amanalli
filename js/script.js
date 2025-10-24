const roles = [
  "Scrum Master",
  "Product Owner",
  "Desarrollador Frontend",
  "Desarrollador Backend",
  "Administrador de Base de Datos",
  "Tester",
  "Diseñador UX/UI",
];

const rolElements = document.querySelectorAll(".rol-dinamico");

let indexOffset = 0;

function actualizarRoles() {
  rolElements.forEach((el, i) => {
    const rolIndex = (indexOffset + i) % roles.length;
    el.textContent = roles[rolIndex];
  });
  indexOffset = (indexOffset + 1) % roles.length;
}

// Inicializar y actualizar cada 10 segundos
actualizarRoles();
setInterval(actualizarRoles, 10000);

// Change date per year
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// FORMULARIO CONTACTO
document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("ZqWndd1_mo5GlI_a-"); // 🔑 Tu Public Key de EmailJS

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const btn = form.querySelector(".btn-contacto");

  // Campos
  const nombre = form.user_name;
  const correo = form.user_email;
  const telefono = form.user_phone;
  const mensaje = form.message;

  // === CONTADOR DE CARACTERES DENTRO DEL TEXTAREA ===
  const wrapper = document.createElement("div");
  wrapper.classList.add("textarea-wrapper");

  mensaje.parentNode.insertBefore(wrapper, mensaje);
  wrapper.appendChild(mensaje);

  const contador = document.createElement("span");
  contador.classList.add("char-counter");
  contador.textContent = "0 / 300";
  wrapper.appendChild(contador);

  mensaje.addEventListener("input", () => {
    const max = 300;
    const len = mensaje.value.length;
    contador.textContent = `${len} / ${max}`;
    contador.classList.toggle("over-limit", len > max);
  });

  // === VALIDACIONES ===
  const validarNombre = () => {
    const ok = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,40}$/.test(nombre.value.trim());
    if (!ok) return mostrarError(nombre, "El nombre solo debe tener letras y al menos 3 caracteres.", "error-nombre");
    limpiarError(nombre, "error-nombre");
    return true;
  };

  const validarCorreo = () => {
    const ok = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(correo.value.trim());
    if (!ok) return mostrarError(correo, "Correo inválido (ejemplo@dominio.com).", "error-correo");
    if (correo.value.length > 50) return mostrarError(correo, "Máximo 50 caracteres.", "error-correo");
    limpiarError(correo, "error-correo");
    return true;
  };

  const validarTelefono = () => {
    const ok = /^\+?\d{2,4}[\s.-]?\d{3,4}[\s.-]?\d{3,4}$/.test(telefono.value.trim());
    if (!ok) return mostrarError(telefono, "Formato inválido. Ejemplo: +52 811 234 5678", "error-telefono");
    limpiarError(telefono, "error-telefono");
    return true;
  };

  const validarMensaje = () => {
    const len = mensaje.value.trim().length;
    if (len < 5) return mostrarError(mensaje, "Debe tener al menos 5 caracteres.", "error-mensaje");
    if (len > 300) return mostrarError(mensaje, "Te pasaste del límite (máx. 300).", "error-mensaje");
    limpiarError(mensaje, "error-mensaje");
    return true;
  };

  // === FUNCIONES DE ERROR ===
  const mostrarError = (campo, mensaje, id) => {
    document.getElementById(id).textContent = mensaje;
    campo.classList.add("input-error");
    campo.classList.remove("input-valid");
    return false;
  };

  const limpiarError = (campo, id) => {
    document.getElementById(id).textContent = "";
    campo.classList.remove("input-error");
    campo.classList.add("input-valid");
  };

  // === VALIDACIÓN EN TIEMPO REAL ===
  nombre.addEventListener("input", validarNombre);
  correo.addEventListener("input", validarCorreo);
  telefono.addEventListener("input", validarTelefono);
  mensaje.addEventListener("input", validarMensaje);

  // === ENVÍO DEL FORMULARIO ===
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const valido = validarNombre() && validarCorreo() && validarTelefono() && validarMensaje();
    if (!valido) {
      status.textContent = "⚠️ Corrige los errores antes de enviar.";
      status.style.color = "#b00020";
      return;
    }

    // Estado: enviando
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.style.opacity = "0.7";
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-opacity=".3"/>
        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" stroke-width="4"/>
      </svg> Enviando...
    `;
    status.textContent = "Enviando...";
    status.style.color = "rgba(61,46,37,0.8)";

    try {
      await emailjs.sendForm("service_t5xvbwl", "template_f8452pr", form);
      status.textContent = "✅ ¡Mensaje enviado con éxito!";
      status.style.color = "#2e7d32";
      btn.innerHTML = "✔ Enviado";
      form.reset();
      contador.textContent = "0 / 300";
      setTimeout(() => {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.innerHTML = original;
        status.textContent = "";
      }, 3000);
    } catch (error) {
      console.error(error);
      status.textContent = "❌ Error al enviar. Intenta de nuevo.";
      status.style.color = "#b00020";
      btn.innerHTML = "Error";
      setTimeout(() => {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.innerHTML = original;
        status.textContent = "";
      }, 3000);
    }
  });
});

