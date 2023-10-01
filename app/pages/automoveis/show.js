function obterIDDaURL() {
    const parametros = new URLSearchParams(window.location.search);
    return parametros.get('id');
}

const idRecebido = obterIDDaURL();


console.log(`ID recebido: ${idRecebido}`);
const baseURL = 'http://localhost:3000';

fetch(`${baseURL}/automoveis/${idRecebido}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('A resposta não está OK');
        }
        return response.json();
    })
    .then((objeto) => {
        $('#title-car').html(objeto.nome);
        showCar(objeto)
        console.log('Objeto encontrado:', objeto);
    })
    .catch((error) => {
        console.error('Erro:', error);
    });

const showCar = (car) => {
    $('#img').html(`<img id="img" src="${car.imagem}" alt="">`);
    $('#description').html(car.descricao);
    $('#name-car').html(car.nome);
    $('#year-car').html(car.ano);
    $('#km-car').html(car.quilometragem_rodada.toLocaleString('pt-BR'));
    $('#fuel-car').html(car.tipo_combustivel);
    $('#price').html(car.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

    $('#brand-car').html(car.marca);
    $('#model-car').html(car.modelo);
    $('#year-car-desc').html(car.ano);
    $('#condition-car').html(car.condicao);
    $('#km-car-desc').html(car.quilometragem_rodada.toLocaleString('pt-BR'));
    $('#fuel-car-desc').html(car.tipo_combustivel);
    $('#door-car').html(car.qntd_portas);

}