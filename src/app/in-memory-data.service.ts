import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { POKEMONS } from './mock-pokemons';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}

  createDb(): {} | Observable<{}> | Promise<{}> {
    let pokemons = POKEMONS;
    return { pokemons };
  }
}
