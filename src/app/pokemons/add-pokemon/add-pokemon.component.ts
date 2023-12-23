import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';

@Component({
  selector: 'app-add-pokemon',
  standalone: true,
  imports: [PokemonFormComponent],
  templateUrl: './add-pokemon.component.html',
  styles: ``,
})
export class AddPokemonComponent implements OnInit {
  pokemon: Pokemon | undefined;

  ngOnInit(): void {
    this.pokemon = new Pokemon();
  }
}
