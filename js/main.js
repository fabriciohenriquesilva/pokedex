'use strict'

const uriPokemon = 'https://pokeapi.co/api/v2/pokemon/';
const uriPokemonTypes = 'https://pokeapi.co/api/v2/type/';
const mainContentHtml = document.querySelector('.content');

const types = [];
const pokemons = [];

async function getPokemonTypes(){
    for(let i = 1; i <= 18; i++){
        const res = await fetch(uriPokemonTypes + i)
        let type = await res.json();

        types.push(type);
    }
    createBadgesTypes(types);
}

async function getPokemonData() {
    for (let i = 1; i <= 151; i++) {
        let res = await fetch(uriPokemon + i)
        let pokemon = await res.json();

        let card = createPokemonCard(pokemon);
        renderCard(card);
        pokemons.push(pokemon);
    }
}

function createPokemonCard(pokemon) {
    let types = '';
    let card = '';

    for (let i = 0; i < pokemon.types.length; i++) {
        let type = pokemon.types[i].type.name;
        types += `<li class="pokemon-card__type ${type}" data-type="${type}">${type}</li>`;
    }

    card = `
        <article class="pokemon-card">
            <div class="pokemon-card__id" data-id="${pokemon.id}">#${pokemon.id}</div>
            <img src="${pokemon.sprites.other["official-artwork"]["front_default"]}" 
            alt=""
            class="pokemon-card__picture">
            <h2 class="pokemon-card__name">${pokemon.name}</h2>
            <ul class="pokemon-card__types">${types}
            </ul>
        </article>`;

    return card;
}

function renderCard(card){
    mainContentHtml.innerHTML += `${card}`;
}

function filterPokemonCard(){
    mainContentHtml.innerHTML = '';
    
    let type = this.getAttribute('data-type');

    let filteredPokemons = pokemons.filter(pokemon => isPokemonType(pokemon.types, type));

    filteredPokemons.forEach(pokemon => { 
        let card = createPokemonCard(pokemon);
        renderCard(card);
    });
}

function isPokemonType(pokemonTypes, filter) {
    let response = false;
    pokemonTypes.forEach(index => {
        if(index.type.name == filter){
            response = true;
        }
    });
    return response;
}

function createBadgesTypes(pokemonTypes) {
    const badgesElement = document.querySelector('.badges__group');
    badgesElement.innerHTML = '';

    pokemonTypes.forEach( type => {
        const div = document.createElement('div');
             
        div.classList.add('badges__type', type.name);
        div.setAttribute('data-type', type.name);
        div.innerText = type.name;
        div.addEventListener('click', filterPokemonCard);

        badgesElement.appendChild(div);
    });
}

getPokemonData();
getPokemonTypes();
