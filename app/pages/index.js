const baseURL = 'http://localhost:3000';
fetch(`${baseURL}/automoveis`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('A resposta não está OK');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(carro => {
            listCars(carro)
        })
    })
    .catch((error) => {
        console.error('Erro:', error);
    })

const listCars = (carro) => {
    const carsDiv = document.getElementById('cars');
    const carDiv = document.createElement('div');
    carDiv.id = carro.id
    carDiv.addEventListener('click', function () {
        window.location.href = `/app/pages/automoveis/show.html?id=${carro.id}`
    });
    carDiv.classList.add('sm:px-2', 'sm:py-2', 'w-full', 'sm:w-1/2', 'md:w-1/3', 'lg:w-1/4', 'text-white', 'hover:cursor-pointer'); // Adicione uma classe CSS para estilização (opcional)
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