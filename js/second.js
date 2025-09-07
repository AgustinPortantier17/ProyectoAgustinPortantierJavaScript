let listaLibrosRecomendados = document.getElementById(
  "listaLibrosRecomendados"
);
const URL = "../db/data.json";

function cargarLibrosRecomendados() {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderLibros(data);
    });
}
cargarLibrosRecomendados();

function renderLibros(listaRecomendados) {
  listaRecomendados.forEach((recomendado) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="cajaRecomendado">
        <img class="imagenLibro" src="${recomendado.imagen}" alt="Portada de ${recomendado.titulo}">
        <h3 class="tituloLibro">${recomendado.titulo}</h3>
        <h4 class="autorLibro">${recomendado.autor}</h4>
        <div class="datosLibro">
          <p class="generoLibro">Géneros: ${recomendado.genero}</p>
          <p class="añoLibro">Año: ${recomendado.año}</p>
          <button class="btnSinopsis">Ver sinopsis</button>
        </div>
      </div>
    `;
    // Agrega el card al contenedor
    listaLibrosRecomendados.appendChild(card);

    // Botón modal para ver la sinopsis
    const btnSinopsis = card.querySelector(".btnSinopsis");
    btnSinopsis.addEventListener("click", () => {
      Swal.fire({
        title: `Sinopsis de ${recomendado.titulo}`,
        html: `<div class="texto-justificado">${recomendado.sinopsis}</div>`,
        icon: "info",
        customClass: {
          htmlContainer: "texto-justificado",
        },
      });
    });
  });
}

// Al cargar la página recomendados.html
// Recupera los arrays desde localStorage
const librosTodos = JSON.parse(localStorage.getItem("librosTodos")) || [];
const leidos = librosTodos.filter((libro) => libro.categoria === "leido");
const pendientes = librosTodos.filter(
  (libro) => libro.categoria === "pendiente"
);
const deseados = librosTodos.filter((libro) => libro.categoria === "deseado");

// Actualiza los contadores
document.getElementById("contadorTodos").textContent = librosTodos.length;
document.getElementById("contadorLeidos").textContent = leidos.length;
document.getElementById("contadorPendientes").textContent = pendientes.length;
document.getElementById("contadorDeseados").textContent = deseados.length;
