import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../interface/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private api: string = 'https://pokeapi.co/api/v2';
  private pokemons: Pokemon[] = [];
  private filteredPokemons: Pokemon[] = [];

  eventEmitter: EventEmitter<Pokemon[]> = new EventEmitter<Pokemon[]>();

  constructor(private http: HttpClient) { }

  getTypes() {
    const typesUri = `${this.api}/type`;
    return this.http.get(typesUri);
  }

  getPokemonsList(): Pokemon[] {
    if (this.pokemons.length == 0) {
      this.getPokemons().forEach(response => {
        response.subscribe(pokemon => {
          const { id, name, sprites, types } = pokemon;
          let p: Pokemon = {
            id: id,
            name: name,
            image: sprites.other["official-artwork"]["front_default"],
            types: types
          }
          this.pokemons.push(p);
        });
      });
    }
    return this.pokemons;
  }

  private getPokemons() {
    const pokemonsUri = `${this.api}/pokemon/`;
    const response: Observable<any>[] = [];
    for (let i = 1; i <= 16; i++) {
      response.push(this.http.get(pokemonsUri + i));
    }
    return response;
  }

  filterPokemons(type: string) {
    this.filteredPokemons = this.pokemons.filter(pokemon => {
      return this.checkPokemonTypes(pokemon, type)
    });
    this.eventEmitter.emit(this.filteredPokemons);
  }

  private checkPokemonTypes(pokemon: Pokemon, queryType: string): boolean {
    let find = false;
    pokemon.types.forEach((index: any) => {
      if (index.type.name == queryType) {
        find = true;
      }
    });
    return find;
  }
}
