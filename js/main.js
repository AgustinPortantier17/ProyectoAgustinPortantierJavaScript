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
  librosTodos = [...todos];
  /* librosTodos.push(...todos) */
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
        document.getElementById("formAgregarLibro").reset(); // reset al formulario
        document.getElementById("menuFlotanteAgregarLibro").style.display =
          "none";
        refrescarLibros();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Este libro fue añadido correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error("Este libro ya se encuentra en la lista");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        footer: "Revisa tu lista!",
      });
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
  )
    try {
      const libroExiste = librosTodos.find(
        (libro) =>
          libro.titulo.toLowerCase() ===
            document.getElementById("tituloBorrar").value.toLowerCase() &&
          libro.categoria.toLowerCase() ===
            document.getElementById("categoriaBorrar").value
      );

      if (libroExiste) {
        // Borra solo el libro que coincide en ambos campos
        librosTodos = librosTodos.filter(
          (libro) =>
            !(
              libro.titulo.toLowerCase() ===
                document.getElementById("tituloBorrar").value.toLowerCase() &&
              libro.categoria.toLowerCase() ===
                document.getElementById("categoriaBorrar").value
            )
        );
        guardarLibros();
        document.getElementById("formBorrarLibro").reset();
        document.getElementById("menuFlotanteBorrarLibro").style.display =
          "none";
        refrescarLibros();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Este libro fue borrado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error("El libro no se encuentra en la lista");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        footer: "Revisa tu lista!",
      });
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
  try {
    // Busca el libro que quieres mover
    const libroAMover = librosTodos.find(
      (libro) =>
        libro.titulo.toLowerCase() ===
          document.getElementById("tituloMover").value.toLowerCase() &&
        libro.categoria.toLowerCase() ===
          document.getElementById("categoriaMover").value
    );

    if (libroAMover) {
      libroAMover.categoria = document.getElementById("nuevaCategoria").value;
      guardarLibros();
      document.getElementById("formMoverLibro").reset();
      document.getElementById("menuFlotanteMoverLibro").style.display = "none";
      refrescarLibros();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "El libro fue movido correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      throw new Error(
        "No fue posible mover el libro desde la categoría seleccionada"
      );
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
      footer: "Revisa las categorias ingresadas",
    });
  }
});

// Funcion para mostrar los cambios de los arrays en el HTML
refrescarLibros = () => {
  // Vaciar las listas antes de agregar nuevos elementos
  document.getElementById("listaLeidos").innerHTML = "";
  document.getElementById("listaPendientes").innerHTML = "";
  document.getElementById("listaDeseados").innerHTML = "";

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
  let htmlLeidos = "";
  librosLeidos.forEach((libro) => {
    const indexReal = librosTodos.findIndex(
      (l) =>
        l.titulo === libro.titulo &&
        l.autor === libro.autor &&
        l.categoria === libro.categoria
    );
    htmlLeidos += `
      <li class="nuevoLibroLeido">
        <div class="cajaLibro">
          <img class="imagenLibro" src="${
            libro.imagen ||
            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }" alt="Portada de ${libro.titulo}" data-index="${indexReal}">
          <h3 class="tituloLibro">${libro.titulo}</h3>
          <h4 class="autorLibro">${libro.autor}</h4>
          <div class="datosLibro">
            <p class="generoLibro">Géneros: ${libro.genero}</p>
            <p class="añoLibro">Año: ${libro.año}</p>
          </div>
        </div>
      </li>
    `;
  });
  listaLibrosLeidos.innerHTML = htmlLeidos;

  let listaLibrosPendientes = document.getElementById("listaPendientes");
  let htmlPendientes = "";
  librosPendientes.forEach((libro) => {
    const indexReal = librosTodos.findIndex(
      (l) =>
        l.titulo === libro.titulo &&
        l.autor === libro.autor &&
        l.categoria === libro.categoria
    );
    htmlPendientes += `
      <li class="nuevoLibroPendiente">
        <div class="cajaLibro">
          <img class="imagenLibro" src="${
            libro.imagen ||
            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }" alt="Portada de ${libro.titulo}" data-index="${indexReal}">
          <h3 class="tituloLibro">${libro.titulo}</h3>
          <h4 class="autorLibro">${libro.autor}</h4>
          <div class="datosLibro">
            <p class="generoLibro">Géneros: ${libro.genero}</p>
            <p class="añoLibro">Año: ${libro.año}</p>
          </div>
        </div>
      </li>
    `;
  });
  listaLibrosPendientes.innerHTML = htmlPendientes;

  // Generar HTML para libros deseados
  let listaLibrosDeseados = document.getElementById("listaDeseados");
  let htmlDeseados = "";
  librosDeseados.forEach((libro) => {
    const indexReal = librosTodos.findIndex(
      (l) =>
        l.titulo === libro.titulo &&
        l.autor === libro.autor &&
        l.categoria === libro.categoria
    );
    htmlDeseados += `
      <li class="nuevoLibroDeseado">
        <div class="cajaLibro">
          <img class="imagenLibro" src="${
            libro.imagen ||
            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }" alt="Portada de ${libro.titulo}" data-index="${indexReal}"> 
          <h3 class="tituloLibro">${libro.titulo}</h3>
          <h4 class="autorLibro">${libro.autor}</h4>
          <div class="datosLibro">
            <p class="generoLibro">Géneros: ${libro.genero}</p>
            <p class="añoLibro">Año: ${libro.año}</p>
          </div>
        </div>
      </li>
    `;
  });
  listaLibrosDeseados.innerHTML = htmlDeseados;

  document.querySelectorAll(".imagenLibro").forEach((img) => {
    if (img.src.includes("No-Image-Placeholder.svg")) {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        // Mostrar menú para ingresar el link de la imagen
        Swal.fire({
          title: "Agregar link de imagen",
          input: "url",
          inputLabel: "Pega el link de la imagen",
          showCancelButton: true,
          confirmButtonText: "Guardar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed && result.value) {
            const index = img.getAttribute("data-index");
            // Actualiza el libro en el array
            librosTodos[index].imagen = result.value;
            guardarLibros();
            refrescarLibros();
            Swal.fire({
              icon: "success",
              title: "Imagen actualizada",
              timer: 1200,
              showConfirmButton: false,
            });
          }
        });
      });
    }
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
