import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  type OnInit,
} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  message: string = 'Vous êtes déconnecté.';
  name!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {}

  setMessage() {
    if (this.authService.isLoggedIn) {
      this.message = 'Vous êtes connecté!';
    } else {
      this.message = 'Identifiant ou mot de passe incorrect!';
    }
  }

  login() {
    this.message = 'Tentative de connection en cours...';
    this.authService
      .login(this.name, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setMessage();
        if (isLoggedIn) {
          this.router.navigate(['/pokemons']);
        } else {
          this.password = '';
          this.router.navigate(['/login']);
        }
        this.ref.detectChanges();
      });
  }

  logout() {
    this.authService.logout();
    this.message = 'Vous êtes déconnecté!';
  }

  isLogged(): boolean {
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {}
}
