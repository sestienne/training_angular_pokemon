import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemons.service';
import { Pokemon } from '../pokemon';
import { CommonModule } from '@angular/common';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-pokemon',
  standalone: true,
  imports: [CommonModule, PokemonFormComponent],
  templateUrl: './edit-pokemon.component.html',
  styles: ``,
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private title: Title
  ) {}
  ngOnInit(): void {
    const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
    if (pokemonId) {
      this.pokemonService
        .getPokemonById(+pokemonId)
        .subscribe((pokemon) => (this.pokemon = pokemon));
      this.initTitle();
    } else {
      this.pokemon = undefined;
    }
  }

  initTitle() {
    if (!this.pokemon) {
      this.title.setTitle('Pokemomon not found');
      return;
    }

    this.title.setTitle(this.pokemon.name || 'Pokémon');
  }
}
