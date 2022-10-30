import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
