import { ListPokemonsComponent } from './list-pokemons/list-pokemons.component';
import { DetailsPokemonComponent } from './details-pokemon/details-pokemon.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { AuthGuard } from '../auth.guard';


export default [
  {
    path: 'pokemons/add',
    title: 'Ajouter un pokémon',
    component: AddPokemonComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pokemons/edit/:id',
    component: EditPokemonComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pokemons/:id',
    component: DetailsPokemonComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pokemons',
    title: 'Pokedex',
    component: ListPokemonsComponent,
    canActivate: [AuthGuard]
  },
];
