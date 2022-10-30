import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interface/pokemon';
import { PokemonService } from 'src/app/service/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {

  pokemons: Pokemon[] = [];

  constructor(private service: PokemonService) { }

  ngOnInit(): void {
    this.service.getPokemonsList().forEach(response => {
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

}
