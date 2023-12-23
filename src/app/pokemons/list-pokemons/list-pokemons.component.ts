import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { BorderCardDirective } from '../border-card.directive';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PokemonService } from '../pokemons.service';
import { HttpClient } from '@angular/common/http';
import { SearchPokemonsComponent } from '../search-pokemons/search-pokemons.component';

@Component({
  selector: 'app-list-pokemons',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BorderCardDirective,
    PokemonTypeColorPipe,
    SearchPokemonsComponent,
  ],
  templateUrl: './list-pokemons.component.html',
  styles: ``,
})
export class ListPokemonsComponent implements OnInit {
  pokemonsList!: Pokemon[];

  constructor(
    private router: Router,
    private pokemonsService: PokemonService
  ) {}

  ngOnInit(): void {
    this.pokemonsService
      .getPokemonList()
      .subscribe((pokemonsList) => (this.pokemonsList = pokemonsList));
  }

  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemons', pokemon.id]);
  }
}
