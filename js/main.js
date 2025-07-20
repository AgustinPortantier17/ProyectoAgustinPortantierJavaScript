//El proyecto es una web para ingresar lista de libros leidos, deseados y pendientes.
// Minimo 1 condicional (if, else) LISTO!!!!
// Minimo 1 ciclo (while, for) LISTO!!!!
// Minimo 3 funciones con parametros
// Prompts, alerts y console

// 3 Arrays. uno para libros leidos, otro para libros deseados y otro para libros pendientes.
const librosLeidos = [];
const librosDeseados = [];
const librosPendientes = [];

// Definir las funciones: 1 para agregar libro, otro para ver todos los libros en una categoria en especifico, otro para borrar libro. La idea es navegar, borrar un libro deseado para agregarlo a pendiente y luego borrar un libro pendiente cuando fue leido.

alert("Bienvenido a tu gestor de libros");

//Funcion para que, si haya titulo, se agregue al arry, de lo contrario te avisa el error.
function agregarLibro(tituloLibro, tipoLibro) {
  if (tituloLibro != "" && tituloLibro != null) {
    tipoLibro.push(tituloLibro);
  } else {
    alert("Error, ingrese el nombre del libro");
  }
}

// Funcion para que, si el libro dado conincide con el de la categoria, se borre. El contador es para saber la posicion de la palabra.
function borrarLibro(tituloLibro, tipoLibro) {
  let contador = 0;
  let borrado = false;

  for (const libro of tipoLibro) {
    if (tituloLibro === libro) {
      tipoLibro.splice(contador, 1);
      borrado = true;
      alert("El libro ha sido borrado de la categoría");
    }
    contador++;
  }
  if (borrado == false) {
    alert("Error, no se encontró el libro");
  }
}

//Funcion para ver todos los libros de la categoria.

function verLibros(tipoLibro) {
  alert(tipoLibro.join(" / "));
}

function elegirAccion(categoriaLibro) {
  let accion = parseInt(
    prompt(
      "Dijite 1 para Agregar libro, dijite 2 para borrar libro, dijite 3 para ver libros."
    )
  );
  let tituloLibro;

  switch (accion) {
    case 1:
      tituloLibro = prompt("Escribe el titulo del libro");
      agregarLibro(tituloLibro, categoriaLibro);
      break;
    case 2:
      tituloLibro = prompt("Escribe el titulo del libro");
      borrarLibro(tituloLibro, categoriaLibro);
      break;
    case 3:
      verLibros(categoriaLibro);
      break;
    default:
      alert("Error, opción no valida");
      break;
  }
}

// funcion principal.
function main() {
  let continuar = true;
  while (continuar) {
    let decision = parseInt(
      prompt(
        "Dijite 1 para elegir libros deseados, dijite 2 para libros pendientes, dijite 3 para libros leidos"
      )
    );

    switch (decision) {
      case 1:
        elegirAccion(librosDeseados);
        break;
      case 2:
        elegirAccion(librosPendientes);
        break;
      case 3:
        elegirAccion(librosLeidos);
        break;
      default:
        alert("Error, opción no valida");
        break;
    }
    let salir = parseInt(prompt("Dijite 1 para continuar o 2 para salir"));
    if (salir != 1 && salir != 2) {
      alert("Error, dijite 1 o 2 con numeros");
    } else if (salir == 2) {
      continuar = false;
    }
  }
}

main();
