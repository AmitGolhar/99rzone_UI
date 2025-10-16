import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@app/environment/environment';

export interface MagicBricksLead {
  id?: number;
  leadId?: string;
  name?: string;
  email?: string;
  phone?: string;
  propertyName?: string;
  city?: string;
  locality?: string;
  message?: string;
  receivedAt?: string;
  processed?: boolean;
}

@Injectable({ providedIn: 'root' })
export class MagicBricksLeadService {
  private baseUrl = `${environment.apiUrl}/magicbricks/leads`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MagicBricksLead[]> {
    return this.http.get<MagicBricksLead[]>(`${this.baseUrl}`);
  }

  getCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.baseUrl}/count`);
  }
}
