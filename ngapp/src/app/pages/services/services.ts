
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceApi, ServiceItem } from '../../services/services-api';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements OnInit {
  private serviceApi = inject(ServiceApi);

  services = signal<ServiceItem[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  ngOnInit(): void {
    this.serviceApi.getServices().subscribe({
      next: (response) => {
        this.services.set(response.data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur API :', error);
        this.errorMessage.set('Impossible de charger les services.');
        this.loading.set(false);
      },
    });
  }
}
