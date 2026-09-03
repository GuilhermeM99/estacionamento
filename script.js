// ==========================================
// CARREGA OS DADOS SALVOS
// ==========================================

let veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];

let historico = JSON.parse(localStorage.getItem("historico")) || [];

let ultimoResultado = JSON.parse(
    localStorage.getItem("ultimoResultado")
) || null;


// ==========================================
// LIMPAR E FORMATAR PLACA
// ==========================================

function formatarPlaca(valor) {

    // Remove tudo que não for letra ou número
    valor = valor.replace(/[^a-zA-Z0-9]/g, "");

    // Converte para maiúsculo
    valor = valor.toUpperCase();

    // Limite máximo de 7 caracteres
    valor = valor.substring(0, 7);

    return valor;
}


// ==========================================
// REGISTRAR ENTRADA
// ==========================================

function registrarEntrada() {

    let campo = document.getElementById("placaEntrada");

    let placa = formatarPlaca(campo.value);

    campo.value = placa;

    if (placa === "") {

        alert("Digite a placa do veículo!");

        return;
    }

    // Verifica limite
    if (placa.length > 7) {

        alert("A placa deve ter no máximo 7 caracteres!");

        return;
    }

    // Verifica se já está estacionado
    for (let i = 0; i < veiculos.length; i++) {

        if (veiculos[i].placa === placa) {

            alert("Esse veículo já está estacionado!");

            return;
        }
    }

    // Horário da entrada
    let entrada = new Date().getTime();

    let veiculo = {

        placa: placa,

        entrada: entrada
    };

    veiculos.push(veiculo);

    salvarDados();

    campo.value = "";

    mostrarVeiculos();

    alert("Veículo registrado com sucesso!");
}


// ==========================================
// MOSTRAR VEÍCULOS
// ==========================================

function mostrarVeiculos() {

    let lista = document.getElementById("listaVeiculos");

    lista.innerHTML = "";

    if (veiculos.length === 0) {

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

    let campo = document.getElementById("placaSaida");

    let placa = formatarPlaca(campo.value);

    campo.value = placa;

    if (placa === "") {

        alert("Digite a placa do veículo!");

        return;
    }

    // Verifica limite
    if (placa.length > 7) {

        alert("A placa deve ter no máximo 7 caracteres!");

        return;
    }

    let encontrado = false;

    for (let i = 0; i < veiculos.length; i++) {

        if (veiculos[i].placa === placa) {

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

            // Mínimo de 1 hora
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
            // CRIA HISTÓRICO
            // ==================================

            let registro = {

                placa: placa,

                entrada: entrada,

                saida: saida,

                horas: horas,

                valor: valor
            };

            historico.push(registro);

            // ==================================
            // SALVA ÚLTIMO RESULTADO
            // ==================================

            ultimoResultado = {

                placa: placa,

                horas: horas,

                valor: valor
            };

            // ==================================
            // REMOVE VEÍCULO
            // ==================================

            veiculos.splice(i, 1);

            // ==================================
            // SALVA DADOS
            // ==================================

            salvarDados();

            // ==================================
            // ATUALIZA TELA
            // ==================================

            mostrarResultado();

            campo.value = "";

            mostrarVeiculos();

            mostrarHistorico();

            break;
        }
    }

    if (!encontrado) {

        alert("Veículo não encontrado.");
    }
}


// ==========================================
// MOSTRAR RESULTADO
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
        Number(ultimoResultado.valor).toFixed(2) +
        "</p>";
}


// ==========================================
// MOSTRAR HISTÓRICO
// ==========================================

function mostrarHistorico() {

    let lista = document.getElementById("listaHistorico");

    lista.innerHTML = "";

    if (historico.length === 0) {

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
// SALVAR DADOS
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

    if (historico.length === 0) {

        alert("O histórico já está vazio.");

        return;
    }

    let confirmar = confirm(
        "Tem certeza que deseja apagar todo o histórico?"
    );

    if (confirmar) {

        historico = [];

        ultimoResultado = null;

        localStorage.removeItem("historico");

        localStorage.removeItem("ultimoResultado");

        mostrarHistorico();

        mostrarResultado();

        alert("Histórico apagado com sucesso!");
    }
}


// ==========================================
// LIMITAÇÃO DOS CAMPOS DE PLACA
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const placaEntrada =
        document.getElementById("placaEntrada");

    const placaSaida =
        document.getElementById("placaSaida");


    if (placaEntrada) {

        placaEntrada.setAttribute("maxlength", "7");

        placaEntrada.addEventListener("input", function () {

            this.value = formatarPlaca(this.value);
        });
    }


    if (placaSaida) {

        placaSaida.setAttribute("maxlength", "7");

        placaSaida.addEventListener("input", function () {

            this.value = formatarPlaca(this.value);
        });
    }


    // Carrega os dados na tela
    mostrarVeiculos();

    mostrarHistorico();

    mostrarResultado();
});
