/**
 * Fetches pokemons, adds URLs to Routes
 * @param url - API request
 * @return {Promise<Response>} - pokemons data in json
 */
const getPokemons = function (url) {
    return fetch(url)
        .then ( data => data.json() )
        .then ( pokemons => {
            pokemons.results.forEach( (pokemon, index) => {
                pageRouter.addRoute(index, pokemon.url);
            });
            return pokemons;
        });
};

/**
 * Fetches single pokemon
 * @param url - API request
 * * @return {Promise<Response>} - pokemons data in json
 */
const getPokemon = function(url) {
    return fetch(url)
        .then( data => data.json() )
        .then( pokemon => {
            return pokemon;
        })
};

/**
 * Renders main list of pokemons
 * @param url - API request
 * @return {Element | null} - list element with children elements
 */
const renderPokemonList = function (url) {
    const list = document.querySelector('#list');
    getPokemons(url)
        .then( pokemons => {
            pokemons.results.forEach( (pokemon, index) => {
                if (index < 10) {
                    list.appendChild( renderPokemonListItem( pokemon, index) );
                }
            });
            addEventListeners();
        });
    return list;
};

const renderPokemonDetails = function (pokemon) {
    console.log(pokemon);
    const details = document.querySelector('#details');
    const div = document.createElement('div');
    const abilitiesDiv = div.cloneNode();
    const img = document.createElement('img');

    div.innerText = `${pokemon.name}`;
    abilitiesDiv.innerText = `Abilities:`;
    img.setAttribute('src', `${pokemon.sprites.back_default}`);

    pokemon.abilities.forEach( (item, i) => {
        const ability = document.createElement('span');
        ability.innerText = `${i}: ${item.ability.name}`;
        abilitiesDiv.appendChild(ability);
    });

    details.appendChild(div);
    div.appendChild(abilitiesDiv);
    div.appendChild(img);
    return div;
};

const renderPokemonListItem = function(data, index) {
    const div = document.createElement('div');

    div.innerText = `${index + 1}: ${data.name}`;
    div.setAttribute('class', 'list__item');
    div.setAttribute('data-id', `${index}`);

    return div;
};

const clearPokemonsList = function () {
    const list = document.querySelector('#list');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
};

const addEventListeners = function () {
    const list = document.getElementById('list');
    list.addEventListener('click', function clickPoke(e) {
        e.preventDefault();
        const pokemonID = e.target.dataset.id;
        history.pushState(null, null, `index.html?id=${pokemonID}`);

        list.removeEventListener('click', clickPoke, false);
        clearPokemonsList();
        getPokemon( Routes[pokemonID] )
            .then ( (pokemon) => renderPokemonDetails(pokemon) );
    });
};

window.addEventListener('popstate', function () {
    location.reload();
});

const pageRouter = new Router();
const route = pageRouter.getRoute();

//init page depending on where we are (pokemon list or pokemon details)
pageRouter.initPage(route);
