// ==========================================
// CARREGA OS DADOS SALVOS
// ==========================================

// Veículos atualmente estacionados
let veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];

// Histórico dos veículos que já saíram
let historico = JSON.parse(localStorage.getItem("historico")) || [];

// Último resultado exibido
let ultimoResultado = JSON.parse(
    localStorage.getItem("ultimoResultado")
) || null;


// ==========================================
// REGISTRAR ENTRADA
// ==========================================

function registrarEntrada() {

    let placa = document.getElementById("placaEntrada").value;

    placa = placa.toUpperCase().trim();

    if (placa == "") {
        alert("Digite a placa do veículo!");
        return;
    }

    // Verifica se já está estacionado
    for (let i = 0; i < veiculos.length; i++) {

        if (veiculos[i].placa == placa) {
            alert("Esse veículo já está estacionado!");
            return;
        }
    }

    // Horário da entrada
    let entrada = new Date().getTime();

    // Cria veículo
    let veiculo = {
        placa: placa,
        entrada: entrada
    };

    veiculos.push(veiculo);

    // SALVA OS VEÍCULOS
    salvarDados();

    // Limpa campo
    document.getElementById("placaEntrada").value = "";

    // Atualiza tela
    mostrarVeiculos();

    alert("Veículo registrado com sucesso!");
}


// ==========================================
// MOSTRAR VEÍCULOS ESTACIONADOS
// ==========================================

function mostrarVeiculos() {

    let lista = document.getElementById("listaVeiculos");

    lista.innerHTML = "";

    if (veiculos.length == 0) {

        lista.innerHTML =
            "<p>Não há veículos estacionados.</p>";

        return;
    }

    for (let i = 0; i < veiculos.length; i++) {

        let placa = veiculos[i].placa;

        let entrada = new Date(veiculos[i].entrada);

        let horario = entrada.toLocaleTimeString("pt-BR");

        lista.innerHTML +=
            "<div class='veiculo'>" +

            "<strong>Placa:</strong> " +
            placa +

            "<br>" +

            "<strong>Entrada:</strong> " +
            horario +

            "</div>";
    }
}


// ==========================================
// REGISTRAR SAÍDA
// ==========================================

function registrarSaida() {

    let placa = document.getElementById("placaSaida").value;

    placa = placa.toUpperCase().trim();

    if (placa == "") {

        alert("Digite a placa do veículo!");

        return;
    }

    let encontrado = false;

    for (let i = 0; i < veiculos.length; i++) {

        if (veiculos[i].placa == placa) {

            encontrado = true;

            // Horário da saída
            let saida = new Date().getTime();

            // Horário da entrada
            let entrada = veiculos[i].entrada;

            // Calcula tempo
            let tempo = saida - entrada;

            let horas = tempo / 3600000;

            // Arredonda para cima
            horas = Math.ceil(horas);

            // Pelo menos 1 hora
            if (horas < 1) {
                horas = 1;
            }

            // ==================================
            // CALCULA VALOR
            // ==================================

            let valor;

            if (horas <= 1) {

                valor = 15;

            } else {

                valor = 15 + (horas - 1) * 3;
            }

            // ==================================
            // CRIA REGISTRO DO HISTÓRICO
            // ==================================

            let registro = {

                placa: placa,

                entrada: entrada,

                saida: saida,

                horas: horas,

                valor: valor
            };

            // Adiciona ao histórico
            historico.push(registro);

            // ==================================
            // SALVA O ÚLTIMO RESULTADO
            // ==================================

            ultimoResultado = {

                placa: placa,

                horas: horas,

                valor: valor
            };

            // ==================================
            // REMOVE DOS ESTACIONADOS
            // ==================================

            veiculos.splice(i, 1);

            // ==================================
            // SALVA TUDO
            // ==================================

            salvarDados();

            // ==================================
            // MOSTRA RESULTADO
            // ==================================

            mostrarResultado();

            // Limpa campo
            document.getElementById("placaSaida").value = "";

            // Atualiza veículos
            mostrarVeiculos();

            // Atualiza histórico
            mostrarHistorico();

            break;
        }
    }

    if (encontrado == false) {

        alert("Veículo não encontrado.");
    }
}


// ==========================================
// MOSTRAR RESULTADO DA SAÍDA
// ==========================================

function mostrarResultado() {

    let resultado = document.getElementById("resultado");

    if (!ultimoResultado) {

        resultado.innerHTML = "";

        return;
    }

    resultado.innerHTML =

        "<h2>Saída</h2>" +

        "<p><strong>Placa:</strong> " +
        ultimoResultado.placa +
        "</p>" +

        "<p><strong>Horas:</strong> " +
        ultimoResultado.horas +
        "</p>" +

        "<p><strong>Valor a pagar:</strong> R$ " +
        ultimoResultado.valor.toFixed(2) +
        "</p>";
}


// ==========================================
// MOSTRAR HISTÓRICO
// ==========================================

function mostrarHistorico() {

    let lista = document.getElementById("listaHistorico");

    lista.innerHTML = "";

    if (historico.length == 0) {

        lista.innerHTML =
            "<p>Não há histórico.</p>";

        return;
    }

    for (let i = 0; i < historico.length; i++) {

        let registro = historico[i];

        let entrada = new Date(registro.entrada);

        let saida = new Date(registro.saida);

        let horarioEntrada =
            entrada.toLocaleString("pt-BR");

        let horarioSaida =
            saida.toLocaleString("pt-BR");

        lista.innerHTML +=

            "<div class='veiculo'>" +

            "<strong>Placa:</strong> " +
            registro.placa +

            "<br>" +

            "<strong>Entrada:</strong> " +
            horarioEntrada +

            "<br>" +

            "<strong>Saída:</strong> " +
            horarioSaida +

            "<br>" +

            "<strong>Horas:</strong> " +
            registro.horas +

            "<br>" +

            "<strong>Valor:</strong> R$ " +
            Number(registro.valor).toFixed(2) +

            "</div>";
    }
}


// ==========================================
// SALVAR TODOS OS DADOS
// ==========================================

function salvarDados() {

    localStorage.setItem(
        "veiculos",
        JSON.stringify(veiculos)
    );

    localStorage.setItem(
        "historico",
        JSON.stringify(historico)
    );

    localStorage.setItem(
        "ultimoResultado",
        JSON.stringify(ultimoResultado)
    );
}


// ==========================================
// LIMPAR HISTÓRICO
// ==========================================

function limparHistorico() {

    if (historico.length == 0) {

        alert("O histórico já está vazio.");

        return;
    }

    let confirmar = confirm(
        "Tem certeza que deseja apagar todo o histórico?"
    );

    if (confirmar) {

        historico = [];

        // Apaga histórico salvo
        localStorage.removeItem("historico");

        // Também apaga o último resultado
        ultimoResultado = null;

        localStorage.removeItem("ultimoResultado");

        // Atualiza tela
        mostrarHistorico();

        mostrarResultado();

        alert("Histórico apagado com sucesso!");
    }
}


// ==========================================
// CARREGA TUDO QUANDO O SITE ABRE
// ==========================================

mostrarVeiculos();

mostrarHistorico();

mostrarResultado();
