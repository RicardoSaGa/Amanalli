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
