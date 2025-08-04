var obras = [
  { titulo: "AR para todes", archivo: "arparatodes" },
  { titulo: "Nomofobia", archivo: "nomofobia" },
  { titulo: "Grabación encadenada", archivo: "reregraba" },
  { titulo: "Difusión estable", archivo: "difusion" },
  { titulo: "Prácticas con figuras.", archivo: "practica" },
  { titulo: "Que la pandenga se expanga", archivo: "pandenga" },
  { titulo: "Escultura electrónica", archivo: "escultura" },
  { titulo: "Glebas", archivo: "glebas" },
  { titulo: "Pasaje Subterraneo, estación Ramos Mejía", archivo: "pasaje_subterraneo" },
  { titulo: "Simbolos, la trampa de la reconstrucción", archivo: "simbolos" },
  { titulo: "La nueva matemática de Benford", archivo: "benford" },
  { titulo: "Dos ciclos de recomposición para 9 bis", archivo: "Dos_ciclos_de_recomposición_para_9_bis" },
  { titulo: "Retícula Rizomática [imagen de pensamiento]", archivo: "reticula" },
  { titulo: "La sombra de la bicicleta", archivo: "sombra" },
  { titulo: "La Máquina de ventilar", archivo: "ventilar" },
  { titulo: "NoiXY", archivo: "noixy" },
  { titulo: "Serie de exploraciones Rítmicas", archivo: "ritmicos" },
  { titulo: "ANIMA AMBA CRISTAL", archivo: "anima" },
  { titulo: "Matrix LoRe", archivo: "matrixlore" },
  { titulo: "Urbanidad aumentada.", archivo: "urbanidad" },
  { titulo: "La gloriosa", archivo: "gloriosa" },
  { titulo: "Video sintetizador", archivo: "Videosintetizador" },
  { titulo: "Arte argentino hoy", archivo: "Argentino" },
  { titulo: "La ronda", archivo: "Ronda" },
  { titulo: "Anima AMBA Cristal - 2023", archivo: "anima2023" },
  { titulo: "El libro ayer hoy y mañana", archivo: "Libro" },
  { titulo: "Oscilux", archivo: "Oscilux" },
  { titulo: "BAR", archivo: "BAR" },
  { titulo: "Ensayo sobre la memoria", archivo: "memoria" },
  { titulo: "Un punto en comun", archivo: "puntocomun" },
  { titulo: "La televisión (El origen - La vida)", archivo: "latele" },
  { titulo: "Cuarteles de Ciudadela", archivo: "cuarteles" },
  { titulo: "GEONNITUS. Una instalación audiovisual sobre el fracking", archivo: "Geonnitus" },
  { titulo: "Interfaz del oeste - ¿Cómo queremos vivir juntxs?", archivo: "interfazoeste" },
  { titulo: "Memoria de un eco", archivo: "memoriadeuneco" },
  { titulo: "El libro... Digitalizado", archivo: "ellibro2025" },
  { titulo: "ESC/P - Performance de control de escaneo", archivo: "escp" },

];

function cargarContenido(pagina) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("contenido").innerHTML = this.responseText;

      switch (pagina) {
        case "inicio":
          break;
        case "obras":
          cargarObras();
          break;
        case "contacto":
          break;
        default:
          break;
      }
    }
  };
  xhttp.open("GET", pagina + ".html", true);
  xhttp.send();
}

function cargarObras() {
  // Obtener el div donde se cargará el contenido
  var contenidoDiv = document.getElementById("lista-obras");

  // Crear una lista para las obras
  var obrasList = document.createElement("ul");

  obrasList.className = "lista-obras"; // Agregar clase

  // Recorrer la lista de obras y crear un elemento de lista para cada obra
  for (var i = obras.length - 1; i >= 0; i--) {

    var obra = obras[i];

    // Crear un elemento de lista
    var obraItem = document.createElement("li");

    // Agregar el título de la obra como texto del elemento de lista
    obraItem.textContent = obra.titulo;

    // Crear una función de cierre de alcance para capturar la variable "obra"
    (function (obra) {
      // Agregar un evento de clic al elemento de lista
      obraItem.addEventListener("click", function () {
        cargarContenidoObra(obra.archivo);
        scrollToTop(); // Asegurar que haga scroll al inicio
      });
    })(obra);

    // Agregar el elemento de lista a la lista de obras
    obrasList.appendChild(obraItem);
  }

  // Agregar la lista de obras al div de contenido
  contenidoDiv.appendChild(obrasList);
}

function cargarContenidoObra(pagina) {
  var idObra = pagina.replace(".html", "");

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Asegurar que el div está presente en el DOM antes de asignarle contenido
      var contenidoObraDiv = document.getElementById("contenidoObra");
      if (!contenidoObraDiv) {
        console.error("El contenedor de la obra no está disponible aún.");
        return;
      }

      history.pushState({ obra: idObra }, null, "?obra=" + idObra);
      contenidoObraDiv.innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "carpeta-obras/" + pagina + ".html", true);
  xhttp.send();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}


window.addEventListener("load", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const obra = urlParams.get("obra");

  if (obra) {
    cargarContenido("obras"); // Carga la sección de obras

    // Espera un tiempo breve antes de cargar la obra específica
    setTimeout(() => {
      cargarContenidoObra(obra);
    }, 500);
  } else {
    cargarContenido("inicio");
  }
});
const texts = [
  "Arte, tecnología y memoria",
  "Exploración digital y archivo",
  "Imagen, sonido y experimentación",
  "Datos, interfaces y procesos",
  "Narrativas visuales y sonoras",
  "Materialidad del video y remix gráfico",
  "Interpretación y manipulación de datos",
  "Tiempo, historia y futuros posibles",
  "Cartografías afectivas y territorios",
  "Performance audiovisual",
  "Experimentación colectiva",
  "Ecos, repeticiones y archivo personal"
];
let index = 0;
function changeText() {
  index = (index + 1) % texts.length;
  document.getElementById("changing-text").textContent = texts[index];
}

setInterval(changeText, 500); // Cambia cada 3 segundos
