// clase libro

class Libro {
  constructor(titulo, autor, categoria) {
    this.titulo = titulo;
    this.autor = autor;
    this.categoria = categoria;
  }
}

// Array para guardar los libros
let librosTodos = [];

// Guardo los arrays en localstorage para acceder al recargar
function guardarLibros() {
  localStorage.setItem("librosTodos", JSON.stringify(librosTodos));
}

//Cargo los libros del localstorage al array para que aparezcan al recargar, llamo funcion para que pase siempre al recargar
function cargarLibros() {
  const todos = JSON.parse(localStorage.getItem("librosTodos")) || [];
  librosTodos.push(...todos);
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

  // Agregar evento de agregar libro

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
      guardarLibros(); // Llame a funcion de guardado
    }
  });
});

// Funcion del boton borrar: mostrar menu flotante
document.addEventListener("DOMContentLoaded", () => {
  const btnBorrar = document.getElementById("btn-borrar");
  const menu = document.getElementById("menuFlotanteBorrarLibro");
  const cerrar = document.getElementById("cerrarMenuBorrar");

  btnBorrar.addEventListener("click", () => {
    menu.style.display = "flex";
  });
  cerrar.addEventListener("click", () => {
    menu.style.display = "none";

    document.getElementById("formBorrarLibro").reset();
  });

  // Agregar evento de borrar libro
  const btnBorrarLibro = document.getElementById("botonBorrarINMenu");
  btnBorrarLibro.addEventListener("click", () => {
    if (document.getElementById("tituloBorrar").value) {
      librosTodos = librosTodos.filter(
        (libro) =>
          libro.titulo.toLowerCase() !==
          document.getElementById("tituloBorrar").value.toLowerCase()
      );
      guardarLibros();
    }
  });
});

// Funcion para mostrar los cambios de los arrays en el HTML
refrescarLibros = () => {
  // Utilizo el filter para crear 3 arrays
  const librosLeidos = librosTodos.filter(
    (libro) => libro.categoria === "leido"
  );

  const librosPendientes = librosTodos.filter(
    (libro) => libro.categoria === "pendiente"
  );
  const librosDeseados = librosTodos.filter(
    (libro) => libro.categoria === "deseado"
  );

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
