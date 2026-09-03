// ==========================================
// CARREGA OS DADOS SALVOS
// ==========================================

// Veículos que estão atualmente estacionados
let veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];

// Histórico dos veículos que já saíram
let historico = JSON.parse(localStorage.getItem("historico")) || [];


// ==========================================
// REGISTRAR ENTRADA
// ==========================================

function registrarEntrada() {

    // Pega a placa digitada
    let placa = document.getElementById("placaEntrada").value;

    // Coloca a placa em letras maiúsculas
    placa = placa.toUpperCase().trim();


    // Verifica se o usuário digitou alguma coisa
    if (placa == "") {

        alert("Digite a placa do veículo!");

        return;
    }


    // Verifica se o veículo já está estacionado
    for (let i = 0; i < veiculos.length; i++) {

        if (veiculos[i].placa == placa) {

            alert("Esse veículo já está estacionado!");

            return;
        }
    }


    // Pega o horário atual
    let entrada = new Date().getTime();


    // Cria o veículo
    let veiculo = {

        placa: placa,

        entrada: entrada

    };


    // Adiciona o veículo na lista
    veiculos.push(veiculo);


    // Salva os veículos no navegador
    localStorage.setItem(
        "veiculos",
        JSON.stringify(veiculos)
    );


    // Limpa o campo
    document.getElementById("placaEntrada").value = "";


    // Atualiza a lista
    mostrarVeiculos();


    alert("Veículo registrado com sucesso!");
}


// ==========================================
// MOSTRAR VEÍCULOS ESTACIONADOS
// ==========================================

function mostrarVeiculos() {

    let lista = document.getElementById("listaVeiculos");


    // Limpa a lista
    lista.innerHTML = "";


    // Verifica se não existem veículos
    if (veiculos.length == 0) {

        lista.innerHTML =
            "<p>Não há veículos estacionados.</p>";

        return;
    }


    // Percorre todos os veículos
    for (let i = 0; i < veiculos.length; i++) {

        let placa = veiculos[i].placa;

        let entrada = new Date(veiculos[i].entrada);


        // Formata o horário
        let horario = entrada.toLocaleTimeString("pt-BR");


        // Mostra o veículo
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

    // Pega a placa digitada
    let placa = document.getElementById("placaSaida").value;


    // Coloca em letras maiúsculas
    placa = placa.toUpperCase().trim();


    // Verifica se digitou alguma placa
    if (placa == "") {

        alert("Digite a placa do veículo!");

        return;
    }


    // Procura o veículo
    let encontrado = false;


    for (let i = 0; i < veiculos.length; i++) {


        if (veiculos[i].placa == placa) {

            encontrado = true;


            // ==================================
            // HORÁRIO DA SAÍDA
            // ==================================

            let saida = new Date().getTime();


            // ==================================
            // HORÁRIO DA ENTRADA
            // ==================================

            let entrada = veiculos[i].entrada;


            // ==================================
            // CALCULA O TEMPO
            // ==================================

            let tempo = saida - entrada;


            // Converte para horas
            let horas = tempo / 3600000;


            // Arredonda para cima
            horas = Math.ceil(horas);


            // Garante pelo menos 1 hora
            if (horas < 1) {

                horas = 1;
            }


            // ==================================
            // CALCULA O VALOR
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


            // Adiciona no histórico
            historico.push(registro);


            // Salva o histórico
            localStorage.setItem(
                "historico",
                JSON.stringify(historico)
            );


            // ==================================
            // MOSTRA O RESULTADO
            // ==================================

            document.getElementById("resultado").innerHTML =

                "<h2>Saída</h2>" +

                "<p><strong>Placa:</strong> " +
                placa +
                "</p>" +

                "<p><strong>Horas:</strong> " +
                horas +
                "</p>" +

                "<p><strong>Valor a pagar:</strong> R$ " +
                valor.toFixed(2) +
                "</p>";


            // ==================================
            // REMOVE DOS ESTACIONADOS
            // ==================================

            veiculos.splice(i, 1);


            // Salva novamente os estacionados
            localStorage.setItem(
                "veiculos",
                JSON.stringify(veiculos)
            );


            // Limpa o campo
            document.getElementById("placaSaida").value = "";


            // Atualiza veículos
            mostrarVeiculos();


            // Atualiza histórico
            mostrarHistorico();


            break;
        }
    }


    // ==================================
    // VEÍCULO NÃO ENCONTRADO
    // ==================================

    if (encontrado == false) {

        alert("Veículo não encontrado.");
    }
}


// ==========================================
// MOSTRAR HISTÓRICO
// ==========================================

function mostrarHistorico() {

    let lista = document.getElementById("listaHistorico");


    // Limpa a lista
    lista.innerHTML = "";


    // Verifica se não existe histórico
    if (historico.length == 0) {

        lista.innerHTML =
            "<p>Não há histórico.</p>";

        return;
    }


    // Percorre o histórico
    for (let i = 0; i < historico.length; i++) {

        let registro = historico[i];


        // Converte os horários
        let entrada = new Date(registro.entrada);

        let saida = new Date(registro.saida);


        // Formata data e hora
        let horarioEntrada =
            entrada.toLocaleString("pt-BR");

        let horarioSaida =
            saida.toLocaleString("pt-BR");


        // Mostra na tela
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
            registro.valor.toFixed(2) +

            "</div>";
    }
}


// ==========================================
// LIMPAR HISTÓRICO
// ==========================================

function limparHistorico() {

    // Verifica se existe histórico
    if (historico.length == 0) {

        alert("O histórico já está vazio.");

        return;
    }


    // Pergunta antes de apagar
    let confirmar = confirm(
        "Tem certeza que deseja apagar todo o histórico?"
    );


    if (confirmar) {

        // Apaga o histórico
        historico = [];


        // Remove do navegador
        localStorage.removeItem("historico");


        // Atualiza a tela
        mostrarHistorico();


        alert("Histórico apagado com sucesso!");
    }
}


// ==========================================
// CARREGA TUDO QUANDO O SITE ABRE
// ==========================================

mostrarVeiculos();

mostrarHistorico();
