import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemons.service';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [CommonModule, FormsModule, PokemonTypeColorPipe, LoaderComponent],
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['pokemon-form-component.css'],
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon | undefined;

  pokemonTypes!: string[];

  isAddForm!: boolean;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.pokemonTypes = this.pokemonService.getPokemonTypeList();
    this.isAddForm = this.router.url.includes('add');
  }

  hasType(type: string): boolean {
    if (this.pokemon) {
      return this.pokemon.types.includes(type);
    }

    return false;
  }

  selectType($event: Event, type: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    if (!this.pokemon) {
      return;
    }

    if (isChecked) {
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

  isTypesValid(type: string): boolean {
    if (!this.pokemon) {
      return false;
    }

    if (this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    }

    if (this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }

    return true;
  }

  onSubmit() {
    if (this.pokemon) {
      console.log(this.isAddForm);
      if (this.isAddForm) {
        this.pokemonService
          .addPokemon(this.pokemon)
          .subscribe((pokemon: Pokemon) => {
            this.router.navigate(['/pokemons', pokemon.id]);
          });
      } else {
        this.pokemonService.updatepokemon(this.pokemon).subscribe((pokemon) => {
          if (this.pokemon) {
            this.router.navigate(['/pokemons', this.pokemon.id]);
          }
        });
      }
    }
  }
}
