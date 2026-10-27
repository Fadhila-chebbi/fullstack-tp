
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceItem {
  id: number;
  nom: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceApi {
  private readonly apiUrl = 'http://localhost:3001/api/services';

  constructor(private http: HttpClient) {}

  getServices(): Observable<{ success: boolean; data: ServiceItem[] }> {
    return this.http.get<{ success: boolean; data: ServiceItem[] }>(
      this.apiUrl
    );
  }
}
