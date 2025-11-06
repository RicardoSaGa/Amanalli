document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const errorCorreo = document.getElementById("error-correo");
    const errorPassword = document.getElementById("error-password");
    const errorPassword2 = document.getElementById("error-password2");
    const status = document.getElementById("login-status");

    const togglePassword = document.getElementById("togglePassword");
    const eyeOpen = document.getElementById("eyeOpen");
    const eyeClosed = document.getElementById("eyeClosed");

    // Función reutilizable para mostrar/ocultar contraseña
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

    // Llamadas para cada campo
    configurarTogglePassword("password", "togglePassword", "eyeOpen", "eyeClosed");
    configurarTogglePassword("password2", "togglePassword2", "eyeOpen2", "eyeClosed2");

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


        // Simulación de autenticación
        if (valid) {
            status.textContent = "Iniciando sesión...";
            status.style.color = "var(--color-hover-enlace)";

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
