const productosDestacados = [
  {
    id: 1,
    nombre: "Vasija de barro",
    autor: "Mario González · Oaxaca",
    precio: 450,
    imagen:
      "https://images.unsplash.com/photo-1738322212738-40d684b36beb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwd29ya3Nob3AlMjBoYW5kc3xlbnwxfHx8fDE3NTk4NTM5NDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    nombre: "Cuenco de madera",
    autor: "Lucía Pérez · Chiapas",
    precio: 320,
    imagen:
      "https://images.unsplash.com/photo-1706794831005-e0cbae755fae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwcG90dGVyeSUyMGNlcmFtaWNzfGVufDF8fHx8MTc1OTk1ODQzMHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    nombre: "Textil Bordado",
    autor: "Juanita López · Puebla",
    precio: 580,
    imagen:
      "https://images.unsplash.com/photo-1630793282756-bf99efa842ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGV4dGlsZSUyMHdlYXZpbmd8ZW58MXx8fHwxNzU5OTU4NDMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const contenedor = document.querySelector("#productos-destacados");

productosDestacados.forEach((producto) => {
  const tarjeta = document.createElement("div");
  tarjeta.className = "col-md-4 h-100";
  tarjeta.innerHTML = `
    <div class="card producto-card">
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body">
        <h5 class="card-title garamond">${producto.nombre}</h5>
        <p class="card-text popin">${producto.autor}</p>
        <p class="card-text fw-bold">$${producto.precio}</p>
        <button class="btn agregar-carrito" data-id="${producto.id}">Agregar</button>
      </div>
    </div>
  `;
  contenedor.appendChild(tarjeta);
});
