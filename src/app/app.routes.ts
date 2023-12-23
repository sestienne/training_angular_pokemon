import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', title: 'Login', component: LoginComponent },
  {
    path: '',
    loadChildren: () => import('./pokemons/pokemons.routes'),
  },
  {
    path: '**',
    title: 'Page not found',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
        (module) => module.PageNotFoundComponent
      ),
  },
];
