// ==========================================
// CARREGA OS DADOS SALVOS
// ==========================================

let veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];
let historico = JSON.parse(localStorage.getItem("historico")) || [];
let ultimoResultado = JSON.parse(
    localStorage.getItem("ultimoResultado")
) || null;


// ==========================================
// FORMATAR PLACA
// ==========================================

function formatarPlaca(valor) {

    return valor
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
        .slice(0, 7);
}


// ==========================================
// CONFIGURAR CAMPOS DE PLACA
// ==========================================

function configurarCamposPlaca() {

    const campos = [
        document.getElementById("placaEntrada"),
        document.getElementById("placaSaida")
    ];

    campos.forEach(function (campo) {

        if (!campo) return;

        // Limite HTML
        campo.setAttribute("maxlength", "7");

        // Impede caracteres inválidos e mais de 7 caracteres
        campo.addEventListener("input", function () {

            this.value = formatarPlaca(this.value);

        });

        // Corrige também quando houver colagem
        campo.addEventListener("paste", function () {

            setTimeout(() => {

                this.value = formatarPlaca(this.value);

            }, 0);

        });
    });
}


// ==========================================
// REGISTRAR ENTRADA
// ==========================================

function registrarEntrada() {

    const campo = document.getElementById("placaEntrada");

    if (!campo) {
        console.error("Campo placaEntrada não encontrado.");
        return;
    }

    const placa = formatarPlaca(campo.value);

    campo.value = placa;

    if (placa === "") {

        alert("Digite a placa do veículo!");
        return;
    }

    if (placa.length > 7) {

        alert("A placa deve ter no máximo 7 caracteres!");
        return;
    }

    // Verifica se já está estacionado
    const jaEstacionado = veiculos.some(function (veiculo) {

        return veiculo.placa === placa;

    });

    if (jaEstacionado) {

        alert("Esse veículo já está estacionado!");
        return;
    }

    // Cria veículo
    const veiculo = {

        placa: placa,

        entrada: Date.now()

    };

    veiculos.push(veiculo);

    // Salva
    salvarDados();

    // Limpa campo
    campo.value = "";

    // Atualiza tela
    mostrarVeiculos();

    alert("Veículo registrado com sucesso!");
}


// ==========================================
// MOSTRAR VEÍCULOS ESTACIONADOS
// ==========================================

function mostrarVeiculos() {

    const lista = document.getElementById("listaVeiculos");

    if (!lista) return;

    lista.innerHTML = "";

    if (veiculos.length === 0) {

        lista.innerHTML =
            "<p>Não há veículos estacionados.</p>";

        return;
    }

    veiculos.forEach(function (veiculo) {

        const entrada = new Date(veiculo.entrada);

        const horario = entrada.toLocaleTimeString("pt-BR");

        lista.innerHTML +=

            "<div class='veiculo'>" +

            "<strong>Placa:</strong> " +
            veiculo.placa +

            "<br>" +

            "<strong>Entrada:</strong> " +
            horario +

            "</div>";
    });
}


// ==========================================
// REGISTRAR SAÍDA
// ==========================================

function registrarSaida() {

    const campo = document.getElementById("placaSaida");

    if (!campo) {
        console.error("Campo placaSaida não encontrado.");
        return;
    }

    const placa = formatarPlaca(campo.value);

    campo.value = placa;

    if (placa === "") {

        alert("Digite a placa do veículo!");
        return;
    }

    if (placa.length > 7) {

        alert("A placa deve ter no máximo 7 caracteres!");
        return;
    }

    const indice = veiculos.findIndex(function (veiculo) {

        return veiculo.placa === placa;

    });

    if (indice === -1) {

        alert("Veículo não encontrado.");
        return;
    }

    const veiculo = veiculos[indice];

    const entrada = veiculo.entrada;

    const saida = Date.now();

    // ==========================================
    // CALCULA TEMPO
    // ==========================================

    const tempo = saida - entrada;

    let horas = Math.ceil(tempo / 3600000);

    if (horas < 1) {

        horas = 1;
    }


    // ==========================================
    // CALCULA VALOR
    // ==========================================

    let valor;

    if (horas <= 1) {

        valor = 15;

    } else {

        valor = 15 + (horas - 1) * 3;
    }


    // ==========================================
    // CRIA REGISTRO DO HISTÓRICO
    // ==========================================

    const registro = {

        placa: placa,

        entrada: entrada,

        saida: saida,

        horas: horas,

        valor: valor

    };

    historico.push(registro);


    // ==========================================
    // SALVA ÚLTIMO RESULTADO
    // ==========================================

    ultimoResultado = {

        placa: placa,

        horas: horas,

        valor: valor

    };


    // ==========================================
    // REMOVE DOS ESTACIONADOS
    // ==========================================

    veiculos.splice(indice, 1);


    // ==========================================
    // SALVA TUDO
    // ==========================================

    salvarDados();


    // ==========================================
    // ATUALIZA A TELA
    // ==========================================

    mostrarResultado();

    mostrarVeiculos();

    mostrarHistorico();

    campo.value = "";

    alert("Saída registrada com sucesso!");
}


// ==========================================
// MOSTRAR ÚLTIMO RESULTADO
// ==========================================

function mostrarResultado() {

    const resultado = document.getElementById("resultado");

    if (!resultado) return;

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

    const lista = document.getElementById("listaHistorico");

    if (!lista) return;

    lista.innerHTML = "";

    if (historico.length === 0) {

        lista.innerHTML =
            "<p>Não há histórico.</p>";

        return;
    }

    historico.forEach(function (registro) {

        const entrada = new Date(registro.entrada);

        const saida = new Date(registro.saida);

        const horarioEntrada =
            entrada.toLocaleString("pt-BR");

        const horarioSaida =
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
    });
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

    const confirmar = confirm(
        "Tem certeza que deseja apagar todo o histórico?"
    );

    if (!confirmar) return;

    historico = [];

    ultimoResultado = null;

    localStorage.removeItem("historico");

    localStorage.removeItem("ultimoResultado");

    mostrarHistorico();

    mostrarResultado();

    alert("Histórico apagado com sucesso!");
}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    configurarCamposPlaca();

    // Recupera tudo depois do F5
    mostrarVeiculos();

    mostrarHistorico();

    mostrarResultado();

});
