QUnit.test("Render", function( assert ) {
    const pokemonHtmlElement = renderPokemonListItem({url:'blabla', name: 'Poki'}, 0);
    assert.equal(pokemonHtmlElement.outerHTML, '<div class="list__item" data-id="0">1: Poki</div>');
});

QUnit.test("Render", function( assert ) {
    const pokemonDetailsHtmlElement = renderPokemonDetails({sprites: {back_default:'spriteUrl'}, name: 'Poki',
        abilities:[{ability:{name: "chlorophyll"}},{ability:{name: "overgrow"}}]}, 1);
    assert.equal(pokemonDetailsHtmlElement.outerHTML, '<div>Poki<div>Abilities:<span>0: chlorophyll</span><span>1: overgrow</span></div><img src="spriteUrl"></div>');
});
