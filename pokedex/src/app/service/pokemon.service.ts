import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private api: string = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getTypes() {
    const typesUri = `${this.api}/type`;
    return this.http.get(typesUri);
  }

  getPokemonsList(){
    const pokemonsUri = `${this.api}/pokemon/`;
    const response: Observable<any>[] = [];
    for(let i = 1; i <= 16; i++){
      response.push(this.http.get(pokemonsUri + i));
    }
    return response;
  }
}
