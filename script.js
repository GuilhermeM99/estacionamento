// ===============================
// PEGAR DADOS SALVOS
// ===============================

let veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];

let historico = JSON.parse(localStorage.getItem("historico")) || [];


// ===============================
// REGISTRAR ENTRADA
// ===============================

function registrarEntrada() {

    let placa = document.getElementById("placaEntrada").value;

    placa = placa.toUpperCase();


    if (placa == "") {

        alert("Digite a placa do veículo!");

        return;
    }


    // Verifica se a placa já está estacionada

    for (let i = 0; i < veiculos.length; i++) {

        if (veiculos[i][0] == placa) {

            alert("Esse veículo já está estacionado!");

            return;
        }
    }


    // Pega o horário atual

    let entrada = new Date();


    // Cria o veículo

    let veiculo = [placa, entrada];


    // Coloca o veículo na lista

    veiculos.push(veiculo);


    // Salva no navegador

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



// ===============================
// MOSTRAR VEÍCULOS
// ===============================

function mostrarVeiculos() {

    let lista = document.getElementById("listaVeiculos");


    lista.innerHTML = "";


    if (veiculos.length == 0) {

        lista.innerHTML =
            "<p>Não há veículos estacionados.</p>";

        return;
    }


    for (let i = 0; i < veiculos.length; i++) {

        let placa = veiculos[i][0];

        let entrada = new Date(veiculos[i][1]);

        let horario =
            entrada.toLocaleTimeString("pt-BR");


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



// ===============================
// REGISTRAR SAÍDA
// ===============================

function registrarSaida() {

    let placa = document.getElementById("placaSaida").value;

    placa = placa.toUpperCase();


    if (placa == "") {

        alert("Digite a placa do veículo!");

        return;
    }


    let encontrado = false;


    for (let i = 0; i < veiculos.length; i++) {

        if (veiculos[i][0] == placa) {

            encontrado = true;


            // Horário da saída

            let saida = new Date();


            // Horário da entrada

            let entrada =
                new Date(veiculos[i][1]);


            // Calcula o tempo

            let tempo = saida - entrada;


            // Converte para horas

            let horas = tempo / 3600000;


            // Arredonda para cima

            horas = Math.ceil(horas);


            // Mínimo de 1 hora

            if (horas < 1) {

                horas = 1;
            }


            // ===============================
            // CALCULA O VALOR
            // ===============================

            let valor;


            if (horas <= 1) {

                valor = 15;

            } else {

                valor = 15 + (horas - 1) * 3;
            }


            // ===============================
            // CRIA O HISTÓRICO
            // ===============================

            let registro = {

                placa: placa,

                entrada: entrada,

                saida: saida,

                horas: horas,

                valor: valor
            };


            // Coloca no histórico

            historico.push(registro);


            // Salva o histórico

            localStorage.setItem(
                "historico",
                JSON.stringify(historico)
            );


            // ===============================
            // MOSTRA O RESULTADO
            // ===============================

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


            // ===============================
            // REMOVE DOS ESTACIONADOS
            // ===============================

            veiculos.splice(i, 1);


            // Salva novamente

            localStorage.setItem(
                "veiculos",
                JSON.stringify(veiculos)
            );


            // Limpa o campo

            document.getElementById("placaSaida").value = "";


            // Atualiza as duas listas

            mostrarVeiculos();

            mostrarHistorico();


            break;
        }
    }


    if (encontrado == false) {

        alert("Veículo não encontrado.");
    }
}



// ===============================
// MOSTRAR HISTÓRICO
// ===============================

function mostrarHistorico() {

    let lista =
        document.getElementById("listaHistorico");


    lista.innerHTML = "";


    if (historico.length == 0) {

        lista.innerHTML =
            "<p>Não há histórico.</p>";

        return;
    }


    for (let i = 0; i < historico.length; i++) {


        let entrada =
            new Date(historico[i].entrada);


        let saida =
            new Date(historico[i].saida);


        let horarioEntrada =
            entrada.toLocaleTimeString("pt-BR");


        let horarioSaida =
            saida.toLocaleTimeString("pt-BR");


        lista.innerHTML +=

            "<div class='veiculo'>" +

            "<strong>Placa:</strong> " +
            historico[i].placa +

            "<br>" +

            "<strong>Entrada:</strong> " +
            horarioEntrada +

            "<br>" +

            "<strong>Saída:</strong> " +
            horarioSaida +

            "<br>" +

            "<strong>Horas:</strong> " +
            historico[i].horas +

            "<br>" +

            "<strong>Valor:</strong> R$ " +
            historico[i].valor.toFixed(2) +

            "</div>";
    }
}



// ===============================
// QUANDO ABRIR O SITE
// ===============================

mostrarVeiculos();

mostrarHistorico();
