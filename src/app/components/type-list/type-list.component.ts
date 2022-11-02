import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interface/pokemon';
import { PokemonService } from '../../service/pokemon.service';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {

  types: string[] = [];
  pokemons: Pokemon[] = [];

  constructor(private service: PokemonService) { }

  ngOnInit(): void {
    this.service.getTypes().subscribe((response: any) => {
      response.results.forEach((type: any) => {
        this.types.push(type.name);
      });
    });
  }

  filterPokemonsByType(type: string){
    this.service.filterPokemons(type);
  }

}


