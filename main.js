const $cuadros = document.querySelectorAll(".cuadro");
const $botonInicio = document.querySelector(".button");
const ciudades = ['buenos aires', 'paris', 'londres', 'estambul', 'hong kong', 'sidney', 'ciudad de mexico', 'ciudad del cabo', 'buenos aires', 'paris', 'londres', 'estambul', 'hong kong', 'sidney', 'ciudad de mexico', 'ciudad del cabo']
const $ocultos = document.querySelectorAll(".oculto");
let dadoVuelta = 0;
let turno = 0;
let historial = [];

function habilitarCuadros() {
    $cuadros.forEach(function (cuadro) {
        cuadro.onclick = function () {
            cuadroClickeado(cuadro.id);
        }
    })
}

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
    cuadro.className = "col-3 cuadro clickeado";
    dadoVuelta++;
    historial.push(cuadro.id);
    checkearDadoVuelta();
}

function volverAGirar(id) {
    const cuadro = document.getElementById(id);
    cuadro.className = "col-3 cuadro";
    dadoVuelta--;
}


function checkearDadoVuelta() {
    if (dadoVuelta % 2 === 0) {
        const ultimoID = historial[historial.length - 1];
        const anteUltimoID = historial[historial.length - 2];
        const ultimoElemento = document.getElementById(ultimoID);
        const anteUltimoElemento = document.getElementById(anteUltimoID);
        const ultimaCiudad = ultimoElemento.innerText;
        const anteUltimaCiudad = anteUltimoElemento.innerText;
        turno++
        if (ultimaCiudad === anteUltimaCiudad) {
        } else {
            setTimeout(() => {volverAGirar(ultimoID)}, 1000);
            setTimeout(() => {volverAGirar(anteUltimoID)}, 1000);
        }
    }
}
$botonInicio.onclick = function (e) {
    e.preventDefault;
    sortearCiudades(ciudades);
    ponerCiudadesEnCuadros(ciudades)
    habilitarCuadros();
}


//funcion onclick cuadro
// "dar vuelta" el cuadro y mostrar un valor
// "dar vuelta" otro cuadro y mostrar un valor
// 1 segundo
// si se acierta los dos valores juntos los cuadros quedan dados vuelta y cambian de color
// si no los dos vuelven a esconderse
