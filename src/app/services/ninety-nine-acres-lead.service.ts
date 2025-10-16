import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, switchMap } from 'rxjs';
import { environment } from '@app/environment/environment';

export interface NinetyNineAcresLead {
  id?: number;
  leadId?: string;
  name: string;
  email?: string;
  phone?: string;
  propertyName?: string;
  city?: string;
  locality?: string;
  message?: string;
  budget?: string;
  requirementType?: string;
  leadSource?: string;
  campaignId?: string;
  agentName?: string;
  receivedAt?: string;
  processed?: boolean;
}

@Injectable({ providedIn: 'root' })
export class NinetyNineAcresLeadService {
  private baseUrl = `${environment.apiUrl}/99acres/leads`;

  constructor(private http: HttpClient) {}

  /** ✅ Fetch all leads */
  getAll(): Observable<NinetyNineAcresLead[]> {
    return this.http.get<NinetyNineAcresLead[]>(this.baseUrl);
  }

  /** ✅ Fetch total count */
  getCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.baseUrl}/count`);
  }

  /** ✅ Auto-refresh every 10 seconds */
  getLiveLeads(intervalMs = 10000): Observable<NinetyNineAcresLead[]> {
    return timer(0, intervalMs).pipe(switchMap(() => this.getAll()));
  }
}
