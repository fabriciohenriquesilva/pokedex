'use strict'

const uriPokemon = 'https://pokeapi.co/api/v2/pokemon/';
const mainContentHtml = document.querySelector('.content');

async function getPokemonData() {
    for (let i = 1; i < 50; i++) {
        let data = await fetch(uriPokemon+i)
            .then(res => res.json())
            .then(pokemon => createPokemonCard(pokemon))
    }
}

function createPokemonCard(pokemonData) {
    mainContentHtml.innerHTML += `
        <article class="content__pokemon-card">
            <div class="content__pokemon_id">${pokemonData.id}</div>
            <img src="${pokemonData.sprites.other["official-artwork"]["front_default"]}" 
            alt=""
            class="content__pokemon-picture">
            <h2 class="content__pokemon-name">${pokemonData.name}</h2>
            <ul class="content__pokemon-types">
                <li class="content__pokemon-type-item ${pokemonData.types[0].type.name}" data-type="${pokemonData.types[0].type.name}">${pokemonData.types[0].type.name}</li>
            </ul>
        </article>`;
}

getPokemonData();