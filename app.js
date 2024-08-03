//variables
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = []; // el objetivo de esta lista es ir almacenando c/u de los numerosSecretos generados, para asi verificar si ya se jugo o no.
let numeroMaximo = 10;

//console.log(numeroSecreto);

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

function vericarIntento() {
  let numeroUsuario = parseInt(document.getElementById("valorUsuario").value);
  if (numeroSecreto === numeroUsuario) {
    asignarTextoElemento(
      "p",
      `ACERTASTE! encontraste el número secreto en ${intentos} ${
        intentos === 1 ? "intento" : "intentos"
      }`
    );

    //con este llamado al DOM, selecciono al elemento a traves del id 'reiniciar' y le elimino el atributo 'disabled' para activar el boton.
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    //El usuario no acertó.
    if (numeroUsuario > numeroSecreto) {
      asignarTextoElemento("p", "El número secreto es menor");
    } else {
      asignarTextoElemento("p", "El número secreto es mayor");
    }

    intentos++;
    // llamo a la funcion limpiarCaja() para dejar la caja en blanco luego de c/intento fallido.
    limpiarCaja();
  }
  //console.log(numeroUsuario);
  console.log(numeroSecreto);
}

function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  /*agrego un par de console.log() para evaluar la ejecucion de la lista*/
  console.log(numeroGenerado);
  console.log(listaNumerosSorteados);
  //si ya sorteamos todos los numeros ?
  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento("p",'Ya se sortearon todos los números posibles');

    //deshabilito el boton de intentar para evitar errores al finalizar el juego ya que el usuario lo puede tocar y pareceria que el juego sigue activo.
    document.getElementById('intentar').setAttribute('disabled', 'true');

  } else {
    //si el numeroGenerado esta en la lista, realizo una accion, sino continuo jugando y lo agrego a la lista.
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      
      return generarNumeroSecreto(); // recursividad. se llama a la funcion misma para que evalue si esta o no el numero
    } else {
      listaNumerosSorteados.push(numeroGenerado); // agrego el numero generado a la lista.
      return numeroGenerado;
    }
  }
}

function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}

function reiniciarJuego() {
  // limpiar la caja
  limpiarCaja();
  // indicar mensaje de intervalo de números
  // generar el número aleatorio
  // inicializar el número de intentos
  condicionesIniciales();
  // deshabilitar el btn de nuevo juego
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
}

function condicionesIniciales() {
  asignarTextoElemento("h1", "Juego del número secreto");
  asignarTextoElemento("p", `Ingresa un número del 1 al ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
}

condicionesIniciales();

//ctrl + f para buscar de forma global.
