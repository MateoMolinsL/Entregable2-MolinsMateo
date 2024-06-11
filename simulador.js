// Constante para la tasa de interés anual
const TASA_INTERES = 0.04;

// Función para solicitar y validar el monto inicial
function obtenerMontoInicial() {
    let valido = false;
    let montoInicial;
    while (!valido) {
        montoInicial = parseFloat(prompt("Ingrese el monto inicial:"));
        if (!isNaN(montoInicial) && montoInicial > 0) {
            valido = true;
        } else {
            alert("Por favor, ingrese un monto válido.");
        }
    }
    return montoInicial;
}

// Función para solicitar y validar la cantidad de años
function obtenerCantidadAnios() {
    let valido = false;
    let cantidadAnios;
    while (!valido) {
        cantidadAnios = parseInt(prompt("Ingrese la cantidad de años:"));
        if (!isNaN(cantidadAnios) && cantidadAnios > 0) {
            valido = true;
        } else {
            alert("Por favor, ingrese una cantidad de años válida.");
        }
    }
    return cantidadAnios;
}

// Función para solicitar y validar el monto anual agregado
function obtenerMontoAnualAgregado() {
    let valido = false;
    let montoAnualAgregado;
    while (!valido) {
        montoAnualAgregado = parseFloat(prompt("Ingrese el monto anual agregado:"));
        if (!isNaN(montoAnualAgregado) && montoAnualAgregado >= 0) {
            valido = true;
        } else {
            alert("Por favor, ingrese un monto válido.");
        }
    }
    return montoAnualAgregado;
}

// Función para calcular el interés compuesto
function calcularInteresCompuesto(montoInicial, cantidadAnios, montoAnualAgregado) {
    let montoTotal = montoInicial;
    let resultadosAnuales = [];
    for (let i = 0; i < cantidadAnios; i++) {
        montoTotal = (montoTotal + montoAnualAgregado) * (1 + TASA_INTERES);
        resultadosAnuales.push(montoTotal);
    }
    return resultadosAnuales;
}

// Función para mostrar el resultado
function mostrarResultado(resultadosAnuales) {
    console.log("Resultados Anuales:");
    resultadosAnuales.forEach((resultado, index) => {
        console.log("Año " + (index + 1) + ": $" + resultado.toFixed(2));
    });
    alert("Resultados Anuales:\n\n" + resultadosAnuales.map((resultado, index) => "Año " + (index + 1) + ": $" + resultado.toFixed(2)).join("\n"));
  
    // Calcular gasto promedio anual para sobrevivir durante 15 años con el monto del último año
    const ultimoAnio = resultadosAnuales[resultadosAnuales.length - 1];
    const gastoPromedioAnual = ultimoAnio / 15;
  
    // Mostrar en consola y en un cuadro de alerta
    console.log("Gasto promedio anual necesario para sobrevivir durante 15 años: $" + gastoPromedioAnual.toFixed(2));
    alert("Gasto promedio anual necesario para sobrevivir durante 15 años: $" + gastoPromedioAnual.toFixed(2));
}

// Función principal para ejecutar el simulador
function ejecutarSimulador() {
    const montoInicial = obtenerMontoInicial();
    const cantidadAnios = obtenerCantidadAnios();
    const montoAnualAgregado = obtenerMontoAnualAgregado();
    const resultadosAnuales = calcularInteresCompuesto(montoInicial, cantidadAnios, montoAnualAgregado);
    mostrarResultado(resultadosAnuales);
}

// Ejecutar el simulador
ejecutarSimulador();
