import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import {
  Observable,
  Subject,
  debounce,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../pokemons.service';

@Component({
  selector: 'app-search-pokemons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-pokemons.component.html',
  styles: ``,
})
export class SearchPokemonsComponent implements OnInit {
  searchTerms = new Subject<string>();
  pokemons$!: Observable<Pokemon[]>;

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemonsList(term))
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemons', pokemon.id];
    this.router.navigate(link);
  }
}
