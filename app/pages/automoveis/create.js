const marcas = ["Volkswagen", "Ford", "Chevrolet", "Toyota", "Honda"];
const selectMarcas = $('#marcas-carros');
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

const fuel = ["Gasolina", "Diesel", "Etanol", "Eletricidade"];
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

enviarButton.addEventListener('click', function (event) {
    event.preventDefault()
    const formData = {
        marca: document.getElementById('marcas-carros').value,
        modelo: document.getElementById('modelos-carros').value,
        nome: document.getElementById('name-car').value,
        ano: document.getElementById('year').value,
        preco: document.getElementById('price').value,
        tipo_combustivel: document.getElementById('fuels-car').value,
        descricao: document.getElementById('description').value,
        condicao: document.getElementById('conditions-car').value,
        qntd_portas: document.getElementById('door').value,
        quilometragem_rodada: document.getElementById('km-car').value,
        imagem: document.getElementById('imagem-car').value,
    };

    fetch(`${baseURL}/automoveis`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta do servidor:', data);
        })
        .catch(error => {
            console.error('Erro ao enviar a solicitação:', error);
        });
});
