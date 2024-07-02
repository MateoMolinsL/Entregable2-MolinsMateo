// Evento para el botón "Calcular"
document.getElementById('calcular').addEventListener('click', ejecutarSimulador);

// Función para obtener el valor de un input y validar su contenido
function obtenerValor(id, errorId) {
    const valor = parseFloat(document.getElementById(id).value);
    const errorElement = document.getElementById(errorId);
    
    // Verificar si el valor es un número válido y mayor que cero
    if (isNaN(valor) || valor <= 0) {
        errorElement.textContent = `Por favor, ingrese un valor válido`;
        return null;
    } else {
        errorElement.textContent = ''; // Limpiar cualquier mensaje de error previo
        return valor;
    }
}

// Función para calcular el interés compuesto
function calcularInteresCompuesto(montoInicial, cantidadAnios, montoAnualAgregado, tasaInteres) {
    let montoTotal = montoInicial;
    let resultadosAnuales = [];

    // Calcular el monto total para cada año
    for (let i = 0; i < cantidadAnios; i++) {
        montoTotal = (montoTotal + montoAnualAgregado) * (1 + tasaInteres / 100);
        resultadosAnuales.push(montoTotal);
    }
    return resultadosAnuales;
}

// Función para mostrar el resultado en el HTML
function mostrarResultado(resultadosAnuales) {
    const resumen = document.getElementById('resumen');
    const tablaResultados = document.getElementById('tablaResultados').querySelector('tbody');
    const gastoPromedio = document.getElementById('gastoPromedio');
    // Mostrar resumen del monto total después de todos los años    
    resumen.textContent = `Después de ${resultadosAnuales.length} años, el monto total es de $${resultadosAnuales[resultadosAnuales.length - 1].toFixed(2)}.`;

    // Limpiar la tabla de resultados previa
    tablaResultados.innerHTML = '';

    // Añadir los resultados anuales a la tabla
    resultadosAnuales.forEach((resultado, index) => {
        const row = tablaResultados.insertRow();
        const cellAnio = row.insertCell(0);
        const cellMonto = row.insertCell(1);
        cellAnio.textContent = `Año ${index + 1}`;
        cellMonto.textContent = `$${resultado.toFixed(2)}`;
    });

    // Calcular y mostrar el gasto promedio anual para 20 años
    const ultimoAnio = resultadosAnuales[resultadosAnuales.length - 1];
    const gastoPromedioAnual = ultimoAnio / 20;
    gastoPromedio.innerHTML = `Gasto promedio anual para vivir durante 20 años (tipo jubilación): $${gastoPromedioAnual.toFixed(2)}`;
}

// Función para guardar los datos de la simulación en el LocalStorage
function guardarEnLocalStorage(montoInicial, cantidadAnios, montoAnualAgregado, tasaInteres, resultadosAnuales) {
    const simulacion = {
        montoInicial,
        cantidadAnios,
        montoAnualAgregado,
        tasaInteres,
        resultadosAnuales
    };
    localStorage.setItem('simulacion', JSON.stringify(simulacion));
}

// Función principal que ejecuta el simulador
function ejecutarSimulador() {
    const montoInicial = obtenerValor('montoInicial', 'errorMontoInicial');
    const cantidadAnios = obtenerValor('cantidadAnios', 'errorCantidadAnios');
    const montoAnualAgregado = obtenerValor('montoAnualAgregado', 'errorMontoAnualAgregado');
    const tasaInteres = obtenerValor('tasaInteres', 'errorTasaInteres');

    // Si todos los valores son válidos, realizar los cálculos
    if (montoInicial && cantidadAnios && montoAnualAgregado && tasaInteres) {
        const resultadosAnuales = calcularInteresCompuesto(montoInicial, cantidadAnios, montoAnualAgregado, tasaInteres);
        guardarEnLocalStorage(montoInicial, cantidadAnios, montoAnualAgregado, tasaInteres, resultadosAnuales);
        mostrarResultado(resultadosAnuales);
    }
}
