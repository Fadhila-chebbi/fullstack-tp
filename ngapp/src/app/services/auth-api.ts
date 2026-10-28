import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id?: string;
      nom?: string;
      email?: string;
    };
    token: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthApi {
  private readonly apiUrl =
    'https://tp3-angular-backend.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        if (response.success && response.data?.token) {
          localStorage.setItem('auth_token', response.data.token);
        }
      })
    );
  }

  register(
    nom: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, {
      nom,
      email,
      password
    }).pipe(
      tap(response => {
        if (response.success && response.data?.token) {
          localStorage.setItem('auth_token', response.data.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }
}