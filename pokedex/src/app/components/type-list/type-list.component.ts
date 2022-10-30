import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {

  types: string[] = [];

  constructor(private service: PokemonService) { }

  ngOnInit(): void {
    this.service.getTypes().subscribe((response: any) => {
      response.results.forEach((type: any) => {
        this.types.push(type.name);
      });
    });
    // console.log(this.types);
  }

  filterPokemonsByType(){

  }

}


