const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');
const pokemonTypes = document.querySelector('.pokemon-types');
const pokemonAbilities = document.querySelector('.pokemon-abilities');
const pokemonSpecies = document.querySelector('.pokemon-species');
const pokemonHabitat = document.querySelector('.pokemon-habitat');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    } else {
        console.log('Pokemon not found!');
    }

}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }
    else {
        pokemonNumber.innerHTML = '';
        pokemonName.innerHTML = 'Not Found';
        pokemonImage.src = 'https://media.stickerswiki.app/pikaotaku/224222.512.webp';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value);
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    } else {
        alert('No previous Pokemon!');
    }
})
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
        renderPokemon(searchPokemon);
    
})

renderPokemon(searchPokemon);