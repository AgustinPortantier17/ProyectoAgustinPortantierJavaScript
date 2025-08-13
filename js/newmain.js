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

// Funcion del boton agregar: mostrar menu flotante
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

  // Agregar evento de submit libro

  const btnAgregarLibro = document.getElementById("botonAgregarINMenu");
  btnAgregarLibro.addEventListener("click", () => {
    if (
      document.getElementById("tituloLibro").value &&
      document.getElementById("autorLibro").value &&
      document.getElementById("categoriaLibro").value
    ) {
      // Al hacer click, con los campos llenos, se agregar el librro a sus arrays.
      let newLibro = new Libro(
        document.getElementById("tituloLibro").value,
        document.getElementById("autorLibro").value,
        document.getElementById("categoriaLibro").value
      );
      librosTodos.push(newLibro);
      if (newLibro.categoria === "leido") {
        librosLeidos.push(newLibro);
      } else if (newLibro.categoria === "deseado") {
        librosDeseados.push(newLibro);
      } else if (newLibro.categoria === "pendiente") {
        librosPendientes.push(newLibro);
      }
      guardarLibros(); // Llame a funcion de guardado
    }
  });
});

// Funcion para mostrar los cambios de los arrays en el HTML
refrescarLibros = () => {
  // Va a mostrar titulo y autor en sus respectivas UL como un LI FOR EACH
  let listaLibrosLeidos = document.getElementById("listaLeidos");
  librosLeidos.forEach((libro) => {
    let nuevoLibroLeido = document.createElement("li");
    nuevoLibroLeido.textContent = libro.titulo + " - " + libro.autor;
    listaLibrosLeidos.appendChild(nuevoLibroLeido);
  });

  let listaLibrosPendientes = document.getElementById("listaPendientes");
  librosPendientes.forEach((libro) => {
    let nuevoLibroPendiente = document.createElement("li");
    nuevoLibroPendiente.textContent = libro.titulo + " - " + libro.autor;
    listaLibrosPendientes.appendChild(nuevoLibroPendiente);
  });
  let listaLibrosDeseados = document.getElementById("listaDeseados");
  librosDeseados.forEach((libro) => {
    let nuevoLibroDeseado = document.createElement("li");
    nuevoLibroDeseado.textContent = libro.titulo + " - " + libro.autor;
    listaLibrosDeseados.appendChild(nuevoLibroDeseado);
  });

  // Va a actualziar el contador de libros en el aside LENGTH

  let contadorLeidos = document.getElementById("contadorLeidos");
  let contadorPendientes = document.getElementById("contadorPendientes");
  let contadorDeseados = document.getElementById("contadorDeseados");
  let contadorTodos = document.getElementById("contadorTodos");
  contadorLeidos.innerHTML = librosLeidos.length;
  contadorPendientes.innerHTML = librosPendientes.length;
  contadorDeseados.innerHTML = librosDeseados.length;
  contadorTodos.innerHTML = librosTodos.length;
};
refrescarLibros();
