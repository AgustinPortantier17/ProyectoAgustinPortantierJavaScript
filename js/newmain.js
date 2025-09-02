// clase libro

class Libro {
  constructor(titulo, autor, categoria, imagen, genero, año) {
    this.titulo = titulo;
    this.autor = autor;
    this.categoria = categoria;
    this.imagen = imagen;
    this.genero = genero || "No especificado";
    this.año = año || "No especificado";
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
const btnAgregar = document.getElementById("btn-agregar"); //variable del boton

const menuAgregar = document.getElementById("menuFlotanteAgregarLibro"); // variable del menu flotante

const cerrarAgregar = document.getElementById("cerrarMenuAgregar"); // variable del boton cerrar

btnAgregar.addEventListener("click", () => {
  // hago click y se muestra
  menuAgregar.style.display = "flex";
});
cerrarAgregar.addEventListener("click", () => {
  //hago click y se cierra
  menuAgregar.style.display = "none";

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
    let libroRepetido = librosTodos.filter(
      (libro) =>
        libro.titulo.toLowerCase() ===
          document.getElementById("tituloLibro").value.toLowerCase() &&
        libro.autor.toLowerCase() ===
          document.getElementById("autorLibro").value.toLowerCase()
    );
    try {
      if (libroRepetido.length === 0) {
        // Al hacer click, con los campos llenos, se agregar el librro a sus arrays.
        let newLibro = new Libro(
          document.getElementById("tituloLibro").value,
          document.getElementById("autorLibro").value,
          document.getElementById("categoriaLibro").value,
          document.getElementById("imagenLibro").value,
          document.getElementById("generoLibro").value,
          document.getElementById("añoLibro").value
        );
        librosTodos.push(newLibro);
        guardarLibros(); // Llame a funcion de guardado
      } else {
        throw new Error("El libro de este autor ya existe en tu lista");
      }
    } catch (error) {
      alert(error.message);
    }
  }
});

// Funcion del boton borrar: mostrar menu flotante
const btnBorrar = document.getElementById("btn-borrar");
const menuBorrar = document.getElementById("menuFlotanteBorrarLibro");
const cerrarBorrar = document.getElementById("cerrarMenuBorrar");

btnBorrar.addEventListener("click", () => {
  menuBorrar.style.display = "flex";
});
cerrarBorrar.addEventListener("click", () => {
  menuBorrar.style.display = "none";

  document.getElementById("formBorrarLibro").reset();
});

// Agregar evento de borrar libro
const btnBorrarLibro = document.getElementById("botonBorrarINMenu");
btnBorrarLibro.addEventListener("click", () => {
  if (
    document.getElementById("tituloBorrar").value &&
    document.getElementById("categoriaBorrar").value
  ) {
    librosTodos = librosTodos.filter(
      (libro) =>
        libro.titulo.toLowerCase() !==
          document.getElementById("tituloBorrar").value.toLowerCase() ||
        libro.categoria.toLowerCase() !==
          document.getElementById("categoriaBorrar").value
    );
    guardarLibros();
    // Bajo esta funcion, se borra el libro si es FALSE, por lo tanto uso ||, porque si uso &&, puede dar false y borrarse todos los libros, con || no pasa porque puede dar true si conincide uno de los 2.
  }
});

// Funcion del boton mover: mostrar menu flotante
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

  let listaLibrosLeidos = document.getElementById("listaLeidos");
  librosLeidos.forEach((libro) => {
    let nuevoLibroLeido = document.createElement("li");
    nuevoLibroLeido.className = "nuevoLibroLeido";

    let libroDiv = document.createElement("div");
    libroDiv.className = "cajaLibro";

    let libroImagen = document.createElement("img");
    libroImagen.className = "imagenLibro";
    libroImagen.src =
      libro.imagen ||
      "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    libroImagen.alt = `Portada de ${libro.titulo}`;

    let libroTitulo = document.createElement("h3");
    libroTitulo.className = "tituloLibro";
    libroTitulo.textContent = libro.titulo;

    let libroAutor = document.createElement("h4");
    libroAutor.className = "autorLibro";
    libroAutor.textContent = libro.autor;

    let libroDatos = document.createElement("div");
    libroDatos.className = "datosLibro";

    let libroGenero = document.createElement("p");
    libroGenero.className = "generoLibro";
    libroGenero.textContent = "Géneros: " + libro.genero;

    let libroAño = document.createElement("p");
    libroAño.className = "añoLibro";
    libroAño.textContent = "Año: " + libro.año;

    // Nuevos p para el div, año, genero y autor
    libroDatos.appendChild(libroGenero);
    libroDatos.appendChild(libroAño);

    //Nuevo img, h3 y div dentro del DIV
    libroDiv.appendChild(libroImagen);
    libroDiv.appendChild(libroTitulo);
    libroDiv.appendChild(libroAutor);
    libroDiv.appendChild(libroDatos);

    // Nuevo DIV dentro del LI
    nuevoLibroLeido.appendChild(libroDiv);

    //Nuevo LI dentro de la UL
    listaLibrosLeidos.appendChild(nuevoLibroLeido);
  });

  let listaLibrosPendientes = document.getElementById("listaPendientes");
  librosPendientes.forEach((libro) => {
    let nuevoLibroPendiente = document.createElement("li");
    nuevoLibroPendiente.className = "nuevoLibroDeseado";

    let libroDiv = document.createElement("div");
    libroDiv.className = "cajaLibro";

    let libroImagen = document.createElement("img");
    libroImagen.className = "imagenLibro";
    libroImagen.src =
      libro.imagen ||
      "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    libroImagen.alt = `Portada de ${libro.titulo}`;

    let libroTitulo = document.createElement("h3");
    libroTitulo.className = "tituloLibro";
    libroTitulo.textContent = libro.titulo;

    let libroAutor = document.createElement("h4");
    libroAutor.className = "autorLibro";
    libroAutor.textContent = libro.autor;

    let libroDatos = document.createElement("div");
    libroDatos.className = "datosLibro";

    let libroGenero = document.createElement("p");
    libroGenero.className = "generoLibro";
    libroGenero.textContent = "Géneros: " + libro.genero;

    let libroAño = document.createElement("p");
    libroAño.className = "añoLibro";
    libroAño.textContent = "Año: " + libro.año;

    // Nuevos p para el div, año, genero y autor
    libroDatos.appendChild(libroGenero);
    libroDatos.appendChild(libroAño);

    //Nuevo img, h3 y div dentro del DIV
    libroDiv.appendChild(libroImagen);
    libroDiv.appendChild(libroTitulo);
    libroDiv.appendChild(libroAutor);
    libroDiv.appendChild(libroDatos);
    // Nuevo DIV dentro del LI
    nuevoLibroPendiente.appendChild(libroDiv);

    //Nuevo LI dentro de la UL
    listaLibrosPendientes.appendChild(nuevoLibroPendiente);
  });

  let listaLibrosDeseados = document.getElementById("listaDeseados");
  librosDeseados.forEach((libro) => {
    let nuevoLibroDeseado = document.createElement("li");
    nuevoLibroDeseado.className = "nuevoLibroDeseado";

    let libroDiv = document.createElement("div");
    libroDiv.className = "cajaLibro";

    let libroImagen = document.createElement("img");
    libroImagen.className = "imagenLibro";
    libroImagen.src =
      libro.imagen ||
      "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    libroImagen.alt = `Portada de ${libro.titulo}`;

    let libroTitulo = document.createElement("h3");
    libroTitulo.className = "tituloLibro";
    libroTitulo.textContent = libro.titulo;

    let libroAutor = document.createElement("h4");
    libroAutor.className = "autorLibro";
    libroAutor.textContent = libro.autor;

    let libroDatos = document.createElement("div");
    libroDatos.className = "datosLibro";

    let libroGenero = document.createElement("p");
    libroGenero.className = "generoLibro";
    libroGenero.textContent = "Géneros: " + libro.genero;

    let libroAño = document.createElement("p");
    libroAño.className = "añoLibro";
    libroAño.textContent = "Año: " + libro.año;

    // Nuevos p para el div, año, genero y autor
    libroDatos.appendChild(libroGenero);
    libroDatos.appendChild(libroAño);

    //Nuevo img, h3 y div dentro del DIV
    libroDiv.appendChild(libroImagen);
    libroDiv.appendChild(libroTitulo);
    libroDiv.appendChild(libroAutor);
    libroDiv.appendChild(libroDatos);

    // Nuevo DIV dentro del LI
    nuevoLibroDeseado.appendChild(libroDiv);

    //Nuevo LI dentro de la UL
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
