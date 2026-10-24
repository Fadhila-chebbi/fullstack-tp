
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  name = '';
  email = '';
  message = '';
  feedback = '';
  feedbackType: 'success' | 'error' | '' = '';

  onSubmit(): void {
    this.feedback = '';
    this.feedbackType = '';

    if (
      !this.name.trim() ||
      !this.email.trim() ||
      !this.message.trim()
    ) {
      this.feedback = 'Veuillez remplir tous les champs.';
      this.feedbackType = 'error';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.feedback = 'Veuillez saisir une adresse e-mail valide.';
      this.feedbackType = 'error';
      return;
    }

    if (this.message.trim().length < 10) {
      this.feedback = 'Le message doit contenir au moins 10 caractères.';
      this.feedbackType = 'error';
      return;
    }

    this.feedback = 'Formulaire validé avec succès.';
    this.feedbackType = 'success';
  }
}
