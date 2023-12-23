import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { CommonModule } from '@angular/common';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { Title } from '@angular/platform-browser';
import { PokemonService } from '../pokemons.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-details-pokemon',
  standalone: true,
  imports: [CommonModule, PokemonTypeColorPipe, LoaderComponent],
  templateUrl: './details-pokemon.component.html',
  styles: ``,
})
export class DetailsPokemonComponent implements OnInit {
  pokemonsList: Pokemon[] | undefined;
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private pokemonsService: PokemonService
  ) {}

  ngOnInit(): void {
    const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
    if (pokemonId) {
      this.pokemonsService
        .getPokemonById(+pokemonId)
        .subscribe((pokemon) => (this.pokemon = pokemon));
      this.initTitle();
    }
  }

  goToPokemonsList() {
    this.router.navigate(['/pokemons']);
  }

  initTitle() {
    if (!this.pokemon) {
      this.title.setTitle('Pokemomon not found');
      return;
    }

    this.title.setTitle(this.pokemon.name || 'Pokémon');
  }

  goToEditPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemons/edit', pokemon.id]);
  }

  deletePokemon(pokemon: Pokemon) {
    if (pokemon && pokemon.id) {
      this.pokemonsService
        .deletePokemonById(pokemon.id)
        .subscribe(() => this.goToPokemonsList());
    }
  }
}
