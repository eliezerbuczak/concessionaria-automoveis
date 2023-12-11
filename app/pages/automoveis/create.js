const marcas = ["Volkswagen", "Ford", "Chevrolet", "Toyota", "Honda"];
const selectMarcas = $('#marcas-carros');
import { Car } from '../../model/Car.js';


marcas.forEach(marca => {
    const option = $('<option>', {
        value: marca.toLowerCase(),
        text: marca
    });
    selectMarcas.append(option);
});

const modelosPorMarca = {
    volkswagen: ["Golf", "Jetta", "Passat"],
    ford: ["Fiesta", "Focus", "Mustang"],
    chevrolet: ["Cruze", "Malibu", "Camaro"],
    toyota: ["Corolla", "Camry", "RAV4"]
};
const selectModelos = $('#modelos-carros');
function preencherModelos(marcaSelecionada) {
    selectModelos.empty();
    const modelos = modelosPorMarca[marcaSelecionada] || [];
    modelos.forEach(modelo => {
        const option = $('<option>', {
            value: modelo.toLowerCase(),
            text: modelo
        });
        selectModelos.append(option);
    });
}
selectMarcas.on('change', function () {
    const marcaSelecionada = $(this).val();
    preencherModelos(marcaSelecionada);
});

preencherModelos(selectMarcas.val());

const condicao = ["Novo", "Usado"];
const selectCondicoes = $('#conditions-car');
condicao.forEach(condicao => {
    const option = $('<option>', {
        value: condicao.toLowerCase(),
        text: condicao
    });
    selectCondicoes.append(option);
});

const fuel = ["Gasolina", "Eletrico"];
const fuels = $('#fuels-car');
fuel.forEach(fuel => {
    const option = $('<option>', {
        value: fuel.toLowerCase(),
        text: fuel
    });
    fuels.append(option);
});

const enviarButton = document.getElementById('enviar');
const baseURL = 'http://localhost:3000'

function validarNumber(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
    if (input.value.length > 1) {
        input.value = input.value.charAt(0);
    }
}
$('#door').on('input', function () {
    validarNumber(this); // 'this' aqui se refere ao elemento que acionou o evento (no caso, o input com id 'door')
});

$(document).ready(function () {
    $('#price').mask('000.000.000,00', { reverse: true });
    $('#km-car').mask('000.000.000', { reverse: true });
    $('#year').mask('0000');
});

enviarButton.addEventListener('click', function (event) {
    event.preventDefault()

    let inputs = document.querySelectorAll('input, select');
    let mensagensErro = document.querySelectorAll('.mensagem-erro');
    mensagensErro.forEach(function (mensagem) {
        mensagem.remove();
    });

    let camposVazios = false;
    inputs.forEach(function (element) {
        if (element.value.trim() === '') {
            camposVazios = true;
            let mensagemErro = document.createElement('span');
            mensagemErro.className = 'mensagem-erro text-red pl-2';
            mensagemErro.textContent = '*';
            element.parentNode.appendChild(mensagemErro);
        }
    }
    );

    if (camposVazios) {
        return;
    }

    const formData = {
        marca: document.getElementById('marcas-carros').value,
        modelo: document.getElementById('modelos-carros').value,
        nome: document.getElementById('name-car').value,
        ano: document.getElementById('year').value,
        preco: +document.getElementById('price').value.replace(/[^\d,]/g, '').replace(',', '.'),
        tipo_combustivel: document.getElementById('fuels-car').value,
        descricao: document.getElementById('description').value,
        condicao: document.getElementById('conditions-car').value,
        qntd_portas: document.getElementById('door').value,
        quilometragem_rodada: document.getElementById('km-car').value,
        imagem: document.getElementById('imagem-car').value,
    };

    const carInstance = new Car(
        formData.marca,
        formData.modelo,
        formData.nome,
        formData.ano,
        formData.preco,
        formData.tipo_combustivel,
        formData.descricao,
        formData.condicao,
        formData.qntd_portas,
        formData.quilometragem_rodada,
        formData.imagem
    );

    fetch(`${baseURL}/automoveis`, {
        method: 'POST',
        body: JSON.stringify(carInstance),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => {
            alert('Carro cadastrado com sucesso!');
            console.log('Resposta do servidor:', data);
        })
        .catch(error => {
            console.error('Erro ao enviar a solicitação:', error);
        });
});
