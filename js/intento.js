const btnMover = document.getElementById("btn-mover");
const menuMover = document.getElementById("menuFlotanteMoverLibro");
const cerrarMover = document.getElementById("cerrarMenuMover");

btnMover.addEventListener("click", () => {
  menuMover.style.display = "flex";
});
cerrarMover.addEventListener("click", () => {
  menuMover.style.display = "none";

  document.getElementById("formMoverLibro").reset();
});

// Agregar evento de mover libro de categoria
const btnMoverLibro = document.getElementById("botonMoverINMenu");
btnMoverLibro.addEventListener("click", () => {
  if (
    document.getElementById("tituloMover").value &&
    document.getElementById("categoriaMover").value &&
    document.getElementById("nuevaCategoria").value
  ) {
    for (libro of librosTodos) {
      if (
        libro.titulo.toLowerCase() ===
          document.getElementById("tituloMover").value.toLowerCase() &&
        libro.categoria === document.getElementById("categoriaMover").value
      ) {
        libro.categoria = document.getElementById("nuevaCategoria").value;
        guardarLibros();
      }
    }
  }
});
