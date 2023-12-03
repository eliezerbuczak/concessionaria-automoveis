'use strict';



let cars = [];
const baseURL = 'http://localhost:3000';
window.onload = async () => {
    await fetch(`${baseURL}/automoveis`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('A resposta não está OK');
            }
            return response.json();
        })
        .then(data => {
            cars = data
            cars.forEach(carro => {
                listCars(carro)
            })
        })
        .catch((error) => {
            console.error('Erro:', error);
        })
}
const listCars = (carro) => {
    const carsDiv = document.getElementById('cars');
    const carDiv = document.createElement('div');
    carDiv.id = carro.id
    carDiv.addEventListener('click', function () {
        window.location.href = `/app/pages/automoveis/show.html?id=${carro.id}`
    });
    carDiv.classList.add('sm:px-2', 'sm:py-2', 'w-full', 'sm:w-1/2', 'md:w-1/3', 'lg:w-1/4', 'text-white', 'hover:cursor-pointer');
    carDiv.innerHTML = `
        <div class="bg-black rounded-xl">
            <div>
                <img class="rounded-t-xl lg:h-44 md:h-60 sm:h-72 w-full"
                    src="${carro.imagem}" alt="">
            </div>
            <div class="px-2">
                <div>
                    <h1>${carro.nome}</h1>
                </div>
                <div>
                    <h1 class="font-bold">R$ ${carro.preco}</h1>
                </div>
            </div>
    
            <div class="flex flex-row border-t-2 border-white px-2 py-4 space-x-4">
                <div class="bg-yellow text-white px-4 rounded">
                    <h1>${carro.ano}</h1>
                </div>
                <div>
                    <h1>${carro.quilometragem_rodada} Km</h1>
                </div>
            </div>
        </div>`
    carsDiv.appendChild(carDiv);
}

const marcas = ["Volkswagen", "Ford", "Chevrolet", "Toyota", "Honda"];
const selectMarcas = $('#marca');

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

const selectModelos = $('#modelo');
function preencherModelos(marcaSelecionada) {
    selectModelos.empty();
    const optionGenerica = $('<option>', {
        value: 'default',
        text: 'Todos os modelos'
    });
    selectModelos.append(optionGenerica);

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



const filtrarAutomoveis = (automoveis, condicaoFiltro, combustivelFiltro, marcaFiltro, modeloFiltro, precoMaximoFiltro) => {
    return automoveis.filter(carro => {
        const atendeCondicao = carro.condicao === condicaoFiltro || condicaoFiltro === 'todos';
        const atendeCombustivel = carro.tipo_combustivel === combustivelFiltro || combustivelFiltro === undefined;
        const atendeMarca = carro.marca === marcaFiltro || marcaFiltro === 'default';
        const atendeModelo = carro.modelo === modeloFiltro || modeloFiltro === 'default';
        const atendePreco = carro.preco <= precoMaximoFiltro || precoMaximoFiltro == '';
        return atendeMarca && atendeModelo && atendePreco && atendeCondicao && atendeCombustivel;
    });
}

$('#filtrar').on('click', function () {
    const condicaoSelecioanda = $("input[name='estado']:checked").val();
    const combustivelSelecioanda = $("input[name='combustivel']:checked").val();
    const marcaSelecionada = $('#marca').val();
    const modeloSelecionado = $('#modelo').val();
    const precoMaximo = $('#price').val();
    let carrosFiltrados = filtrarAutomoveis(cars, condicaoSelecioanda, combustivelSelecioanda, marcaSelecionada, modeloSelecionado, precoMaximo)
    document.getElementById('cars').innerHTML = ''
    if (carrosFiltrados.length === 0) {
        document.getElementById('cars').innerHTML = `<h1 class="w-full text-2xl text-center py-2 font-bold">Não há carros com essas caracteristicas</h1>`
    }
    carrosFiltrados.forEach(carro => {
        listCars(carro)
    })
})