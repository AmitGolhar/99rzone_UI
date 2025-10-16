import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@app/environment/environment';

export interface AggregatedStat {
  title: string;
  count: number;
  route: string;
  color: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class CrmStatsService {
  private baseUrl = `${environment.apiUrl}/crm-stats`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AggregatedStat[]> {
    return this.http.get<AggregatedStat[]>(this.baseUrl);
  }
}
