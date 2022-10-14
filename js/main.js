'use strict'

const uriPokemon = 'https://pokeapi.co/api/v2/pokemon/';
const mainContentHtml = document.querySelector('.content');

async function getPokemonData() {
    for (let i = 1; i < 151; i++) {
        let data = await fetch(uriPokemon + i)
            .then(res => res.json())
            .then(pokemon => createPokemonCard(pokemon))
    }
}

function createPokemonCard(pokemonData) {
    let types = '';
    for (let i = 0; i < pokemonData.types.length; i++) {
        types += `<li class="content__pokemon-type-item ${pokemonData.types[i].type.name}">${pokemonData.types[i].type.name}</li>`;
    }

    mainContentHtml.innerHTML += `
        <article class="content__pokemon-card">
            <div class="content__pokemon_id" data-id="${pokemonData.id}">${pokemonData.id}</div>
            <img src="${pokemonData.sprites.other["official-artwork"]["front_default"]}" 
            alt=""
            class="content__pokemon-picture">
            <h2 class="content__pokemon-name">${pokemonData.name}</h2>
            <ul class="content__pokemon-types">${types}
            </ul>
        </article>`;
}

getPokemonData();