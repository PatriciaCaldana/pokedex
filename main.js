const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 5;
let offset = 0;

// Modal
const modal = document.getElementById('pokemonModal');
const closeModalBtn = document.getElementById('closeModal');
const modalName = document.getElementById('modalName');
const modalNumber = document.getElementById('modalNumber');
const modalImage = document.getElementById('modalImage');
const modalTypes = document.getElementById('modalTypes');
const modalHeight = document.getElementById('modalHeight');
const modalWeight = document.getElementById('modalWeight');

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;

        // Adiciona evento de clique para abrir modal
        pokemons.forEach(pokemon => {
            const el = document.querySelector(`li[data-id='${pokemon.number}']`);
            el.addEventListener('click', () => showModal(pokemon));
        });
    });
}

function showModal(pokemon) {
    modalName.textContent = pokemon.name;
    modalNumber.textContent = `#${pokemon.number}`;
    modalImage.src = pokemon.photo;
    modalTypes.textContent = pokemon.types.join(', ');
    modalHeight.textContent = `${pokemon.height / 10} m`;
    modalWeight.textContent = `${pokemon.weight / 10} kg`;

    modal.classList.remove('hidden');
}

closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});
