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
    this.pokemons = this.service.getPokemonsList();
  }

  ngDoCheck(){
    this.service.eventEmitter.subscribe(filteredPokemons => {
      this.pokemons = filteredPokemons;
    });
  }

  getPokemonList(): readonly Pokemon[] {
    return this.pokemons;
  }

}
