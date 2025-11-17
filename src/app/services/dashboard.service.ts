// dashboard.service.ts
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

export interface MiniTask {
  id: number;
  type?: string;
  title: string;
  module: string;
  assignedTo?: string;
  dueDate?: string; // ISO date
  status?: string;
  contact?: string;
  source?: string;
}

export interface Performer {
  name: string;
  closed: number;
  avatarUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  //private base = '/api/dashboard';
  private base = environment.apiUrl

  constructor(private http: HttpClient) {}

  getTotals(): Observable<AggregatedStat[]> {
    return this.http.get<AggregatedStat[]>(`${this.base}/totals`);
  }

  getStatusCounts(): Observable<{ labels: string[]; counts: number[] }> {
    return this.http.get<{ labels: string[]; counts: number[] }>(`${this.base}/status-counts`);
  }

  getModuleDistribution(): Observable<{ labels: string[]; counts: number[]; colors: string[] }> {
    return this.http.get<{ labels: string[]; counts: number[]; colors: string[] }>(`${this.base}/modules`);
  }

  getUpcomingTasks(limit = 5): Observable<MiniTask[]> {
    return this.http.get<MiniTask[]>(`${this.base}/upcoming?limit=${limit}`);
  }

  getOverdueTasks(limit = 5): Observable<MiniTask[]> {
    return this.http.get<MiniTask[]>(`${this.base}/overdue?limit=${limit}`);
  }

  getTopPerformers(limit = 5): Observable<Performer[]> {
    return this.http.get<Performer[]>(`${this.base}/top-performers?limit=${limit}`);
  }
}
