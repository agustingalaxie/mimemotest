const $cuadros = document.querySelectorAll(".cuadro");
const $botonInicio = document.querySelector(".button");
const ciudades = ['Buenos Aires', 'Paris', 'Londres', 'Estambul', 'Hong Kong', 'Sidney', 'Ciudad de Mexico', 'Ciudad del Cabo', 'Buenos Aires', 'Paris', 'Londres', 'Estambul', 'Hong Kong', 'Sidney', 'Ciudad de Mexico', 'Ciudad del Cabo']
const $ocultos = document.querySelectorAll(".oculto");
const audioClick = document.getElementById("audioClick")
const audioVictoria = document.getElementById("audioVictoria")
let dadoVuelta = 0;
let turno = 0;
let historial = [];

function habilitarCuadros() {
    $cuadros.forEach(function (cuadro) {
        cuadro.onclick = function () {
            cuadroClickeado(cuadro.id);
        };
    });
};

function sortearCiudades(ciudades) {
    for (let i = ciudades.length - 1; i > 0; i--) {
        let indiceAleatorio = Math.floor(Math.random() * (i + 1));
        let temporal = ciudades[i];
        ciudades[i] = ciudades[indiceAleatorio];
        ciudades[indiceAleatorio] = temporal;
    };
    return ciudades
};

function ponerCiudadesEnCuadros(ciudades) {
    $ocultos.forEach(function (oculto, i) {
        const texto = ciudades[i];
        oculto.innerText = texto;
    })
};

function cuadroClickeado(id) {
    const cuadro = document.getElementById(id);
    audioClick.play();
    let claseCuadro = cuadro.className;
    if (claseCuadro === "col-3 cuadro") {
        cuadro.className = "col-3 cuadro clickeado";
        dadoVuelta++;
        historial.push(cuadro.id);
        checkearDadoVuelta();
    } else {
    };
};

function volverAGirar(id) {
    const cuadro = document.getElementById(id);
    cuadro.className = "col-3 cuadro";
    dadoVuelta--;
};

function checkearDadoVuelta() {
    if (dadoVuelta % 2 === 0) {
        const ultimoID = historial[historial.length - 1];
        const anteUltimoID = historial[historial.length - 2];
        const ultimoElemento = document.getElementById(ultimoID);
        const anteUltimoElemento = document.getElementById(anteUltimoID);
        const ultimaCiudad = ultimoElemento.innerText;
        const anteUltimaCiudad = anteUltimoElemento.innerText;
        turno++;
        if (ultimaCiudad === anteUltimaCiudad) {
            checkearSiGano()
        } else {
            dadoVuelta - 2;
            setTimeout(() => { volverAGirar(ultimoID) }, 1000);
            setTimeout(() => { volverAGirar(anteUltimoID) }, 1000);
        };
    };
};

function checkearSiGano() {
    if (dadoVuelta === 16) {
        const audioVictoria = document.getElementById("audioVictoria");
        audioVictoria.play();
        const visor = document.querySelector("h1");        
        visor.innerText = `¡Muy bien! ¡Tardaste ${turno} turnos en completar el juego!`;
    };
};

function ocultarTodos() {
    $cuadros.forEach(function(cuadro) {
        cuadro.className = "col-3 cuadro";
    });
};

function resetearContadores(){
    dadoVuelta = 0;
    turno = 0;
    historial = [];
};

$botonInicio.onclick = function (e) {
    e.preventDefault;
    ocultarTodos();
    resetearContadores();
    setTimeout(() => {sortearCiudades(ciudades)}, 500);
    setTimeout(() => {ponerCiudadesEnCuadros(ciudades)}, 500);
    setTimeout(() => {habilitarCuadros()}, 500);
    const visor = document.querySelector("h1");
    visor.innerText = `Encuentra los nombres de ciudades`;
};

