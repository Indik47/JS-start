let Routes = {
    pokemons: 'https://pokeapi.co/api/v2/pokemon/'
};

const Router = function () {
    this.initPage = function (route) {
        //if we are on pokemon details page
        if ( route.includes('?id=') ) {
            const pokemonID = Router.prototype.getIdFromPage();
            //render single pokemon details
            getPokemons(Routes.pokemons)
                .then ( () => getPokemon(Routes[pokemonID]) )
                .then ( (pokemon) => renderPokemonDetails(pokemon) );
        } else {
            //render pokemons list
            renderPokemonList(Routes.pokemons);
        }
    };
};

Router.prototype.getRoute = function () {
    return window.location.href;
};

Router.prototype.getIdFromPage = function() {
    return Router.prototype.getRoute()[Router.prototype.getRoute().length - 1];
};

Router.prototype.addRoute = function (id, url) {
    Routes[id] = url;
};