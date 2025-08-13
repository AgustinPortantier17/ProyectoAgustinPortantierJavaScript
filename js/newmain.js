// clase libro

class Libro {
  constructor(titulo, autor, categoria) {
    this.titulo = titulo;
    this.autor = autor;
    this.categoria = categoria;
  }
}

// Arrays para guardar los libros
const librosTodos = [];
const librosLeidos = [];
const librosDeseados = [];
const librosPendientes = [];

// Guardo los arrays en localstorage para acceder al recargar
function guardarLibros() {
  localStorage.setItem("librosTodos", JSON.stringify(librosTodos));
  localStorage.setItem("librosLeidos", JSON.stringify(librosLeidos));
  localStorage.setItem("librosDeseados", JSON.stringify(librosDeseados));
  localStorage.setItem("librosPendientes", JSON.stringify(librosPendientes));
}

//Cargo los libros del localstorage al array para que aparezcan al recargar, llamo funcion para que pase siempre al recargar
function cargarLibros() {
  const todos = JSON.parse(localStorage.getItem("librosTodos")) || [];
  const leidos = JSON.parse(localStorage.getItem("librosLeidos")) || [];
  const deseados = JSON.parse(localStorage.getItem("librosDeseados")) || [];
  const pendientes = JSON.parse(localStorage.getItem("librosPendientes")) || [];

  librosTodos.push(...todos);
  librosLeidos.push(...leidos);
  librosDeseados.push(...deseados);
  librosPendientes.push(...pendientes);
}
cargarLibros();

// Funcion 1 del boton agregar: mostrar menu flotante
document.addEventListener("DOMContentLoaded", () => {
  const btnAgregar = document.getElementById("btn-agregar"); //variable del boton

  const menu = document.getElementById("menuFlotanteAgregarLibro"); // variable del menu flotante

  const cerrar = document.getElementById("cerrarMenuAgregar"); // variable del boton cerrar

  btnAgregar.addEventListener("click", () => {
    // hago click y se muestra
    menu.style.display = "flex";
  });
  cerrar.addEventListener("click", () => {
    //hago click y se cierra
    menu.style.display = "none";

    document.getElementById("formAgregarLibro").reset(); // reset al formulario
  });
});
