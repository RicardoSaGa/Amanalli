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

  // Función reutilizable para mostrar/ocultar contraseña
  function configurarTogglePassword(
    inputId,
    toggleBtnId,
    eyeOpenId,
    eyeClosedId
  ) {
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

  // Llamadas para cada campo mostrar/ocultar contrase
  configurarTogglePassword(
    "password",
    "togglePassword",
    "eyeOpen",
    "eyeClosed"
  );
  configurarTogglePassword(
    "password2",
    "togglePassword2",
    "eyeOpen2",
    "eyeClosed2"
  );

  // Ocultar errores mientras se escribe
  function ocultarErrores(id, error) {
    id.addEventListener("input", () => {
      if (id.value.trim()) error.textContent = "";
    });
  }
  ocultarErrores(email, errorCorreo);
  ocultarErrores(nombre, errorNombre);
  ocultarErrores(telefono, errorTelefono);
  ocultarErrores(password, errorPassword);
  ocultarErrores(password2, errorPassword2);

  // Validación y simulación de autenticación

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const name = nombre.value.trim();
    const phone = telefono.value.trim();
    const correo = email.value.trim();
    const clave = password.value.trim();
    const clave2 = password2.value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      showErrorStyles(errorCorreo, "Ingresa un correo válido.", email);
      valid = false;
    } else {
      hideErrorStyles(errorCorreo, email);
    }

    if (name === "") {
      showErrorStyles(errorNombre, "Ingresa tu nombre completo.", nombre);
      valid = false;
    } else {
      hideErrorStyles(errorNombre, nombre);
    }

    if (!/^\d{10}$/.test(phone)) {
      showErrorStyles(
        errorTelefono,
        "Ingresa un número de teléfono válido.",
        telefono
      );
      valid = false;
    } else {
      hideErrorStyles(errorTelefono, telefono);
    }

    const regexContrasena = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!regexContrasena.test(clave)) {
      showErrorStyles(
        errorPassword,
        "La contraseña debe tener al menos 6 caracteres, minusculas, al menos una mayúscula y un número.",
        password
      );
      valid = false;
    } else {
      hideErrorStyles(errorPassword, password);
    }

    if (clave !== clave2) {
      showErrorStyles(errorPassword2, "La contraseña no coincide.", password2);
      valid = false;
    } else {
      hideErrorStyles(errorPassword2, password2);
    }

    if (valid) {
      setTimeout(() => {
        const usuarioAutenticado = true;

        if (usuarioAutenticado) {
          localStorage.setItem(
            "usuario",
            JSON.stringify({
              correo: correo,
              sesionIniciada: true,
              fecha: new Date().toISOString(),
            })
          );

          status.textContent = "Te has registrado exitosamente!";
          status.style.color = "green";
          console.log(agregar());

          // Vaciar campos solo si todo está bien
          email.value = "";
          password.value = "";
          nombre.value = "";
          telefono.value = "";
          password2.value = "";
          setTimeout(() => {
            status.textContent = "";
          }, 1500);
        } else {
          status.textContent = "Credenciales incorrectas";
          status.style.color = "red";
        }
      }, 1500);
    }
  });
});
function showErrorStyles(errorElement, message, element) {
  errorElement.textContent = message;
  errorElement.style.display = "block";
  element.classList.add("is-invalid");
}
function hideErrorStyles(errorElement, element) {
  errorElement.style.display = "none";
  element.classList.remove("is-invalid");
}

function agregar() {
  const listaUsuario = [
    {
      id: generarNumeroAleatorio(),
      nombre: nombre.value,
      telefono: telefono.value,
      correo: email.value,
      contrasena: password.value,
    },
  ];
  return listaUsuario;
}

function generarNumeroAleatorio() {
  return Math.floor(Math.random() * (100 - 20 + 1)) + 20;
}
