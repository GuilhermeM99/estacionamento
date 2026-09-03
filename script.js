let veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];
for (let i = 0; i <veiculos.length; i++) {
    veiculos[i][1] = new Data(veiculos[i][1];
}
console.log(veiculos);

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


// Guarda a placa e o horário
let veiculo = [placa, entrada];

veiculos.push(veiculo);
localStorage.setItem("veiculos", JSON.stringify(veiculos));


document.getElementById("placaEntrada").value = "";

mostrarVeiculos();

alert("Veículo registrado com sucesso!");


}

function mostrarVeiculos() {


let lista = document.getElementById("listaVeiculos");

lista.innerHTML = "";


if (veiculos.length == 0) {

    lista.innerHTML = "<p>Não há veículos estacionados.</p>";

    return;
}


for (let i = 0; i < veiculos.length; i++) {

    let placa = veiculos[i][0];

    let entrada = new Date(veiculos[i][1]);

    let horario = entrada.toLocaleTimeString("pt-BR");


    lista.innerHTML +=
        "<div class='veiculo'>" +
        "<strong>Placa:</strong> " + placa +
        "<br>" +
        "<strong>Entrada:</strong> " + horario +
        "</div>";
}


}

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
        let entrada = new Date(veiculos[i][1]);


        // Calcula o tempo em milissegundos
        let tempo = saida - entrada;


        // Converte para horas
        let horas = tempo / 3600000;


        // Arredonda para cima
        horas = Math.ceil(horas);


        // Garante pelo menos 1 hora
        if (horas < 1) {
            horas = 1;
        }


        // Calcula o valor
        let valor;


        if (horas <= 1) {

            valor = 15;

        } else {

            valor = 15 + (horas - 1) * 3;
        }


        // Mostra o resultado
        document.getElementById("resultado").innerHTML =
            "<h2>Saída</h2>" +
            "<p><strong>Placa:</strong> " + placa + "</p>" +
            "<p><strong>Horas:</strong> " + horas + "</p>" +
            "<p><strong>Valor a pagar:</strong> R$ " +
            valor.toFixed(2) +
            "</p>";


        // Remove o veículo da lista
        veiculos.splice(i, 1);
        localStorage.setItem("veiculos", JSON.stringify(veiculos));


        document.getElementById("placaSaida").value = "";

        mostrarVeiculos();

        break;
    }
}


if (encontrado == false) {

    alert("Veículo não encontrado.");
}


}

// Mostra a lista quando o site abre
mostrarVeiculos();
