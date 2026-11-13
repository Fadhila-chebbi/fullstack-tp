
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ServiceDetails } from './pages/service-details/service-details';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home | FullStackPro',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then((m) => m.Login),
    title: 'Login | FullStackPro',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact').then((m) => m.Contact),
    title: 'Contact | FullStackPro',
  },
  {
    path: 'services/:id',
    component: ServiceDetails,
    title: 'Service Details | FullStackPro',
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./pages/services/services').then((m) => m.Services),
    title: 'Services | FullStackPro',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
