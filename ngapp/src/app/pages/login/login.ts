
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthApi } from '../../services/auth-api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  showPassword = false;
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private authApi: AuthApi,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email.trim() || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.errorMessage = 'Veuillez saisir une adresse e-mail valide.';
      return;
    }

    this.isLoading = true;

    this.authApi.login(this.email.trim(), this.password).subscribe({
      next: (response) => {
        this.isLoading = false;

        if (response.success) {
          this.successMessage = response.message || 'Connexion réussie !';

          // Retour à l'accueil après une connexion réussie
          this.router.navigate(['/']);
        } else {
          this.errorMessage = response.message || 'Connexion impossible.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          error.error?.message ||
          'Impossible de contacter le serveur. Vérifiez que le backend fonctionne.';
      }
    });
  }
}
