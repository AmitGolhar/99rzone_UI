import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from '@app/environment/environment';

export interface Incentive {
  id?: number;
  employee: string;
  dealId: string;
  amount: number;
  commissionPct: number;
  computedPayout?: number;
  status: 'Pending' | 'Approved' | 'Paid';
}

@Injectable({ providedIn: 'root' })
export class IncentiveService {
  private baseUrl = `${environment.apiUrl}/incentives`;

  private incentives$ = new BehaviorSubject<Incentive[]>([]);

  constructor(private http: HttpClient, private zone: NgZone) {
    this.initSSE(); // 👈 start listening to real-time updates
  }

  /** 🔄 Initialize real-time Server-Sent Events connection */
  private initSSE(): void {
    const eventSource = new EventSource(`${this.baseUrl}/stream`);

    eventSource.onmessage = (event) => {
      this.zone.run(() => {
        const data: Incentive[] = JSON.parse(event.data);
        this.incentives$.next(data);
      });
    };

    eventSource.onerror = (err) => {
      console.error('❌ Incentive SSE Error:', err);
      eventSource.close();
      // optional: retry connection after delay
      setTimeout(() => this.initSSE(), 5000);
    };
  }

  /** ✅ Observable that emits live updates */
  listen(): Observable<Incentive[]> {
    return this.incentives$.asObservable();
  }

  /** ✅ Get all incentives (fallback if no SSE connection) */
  getAll(): Observable<Incentive[]> {
    return this.http.get<Incentive[]>(this.baseUrl);
  }

  /** ✅ Add new incentive */
  add(incentive: Incentive): Observable<Incentive> {
    incentive.computedPayout = Math.round(incentive.amount * (incentive.commissionPct / 100));
    return this.http.post<Incentive>(this.baseUrl, incentive);
  }

  /** ✅ Update incentive */
  update(incentive: Incentive): Observable<Incentive> {
    return this.http.put<Incentive>(`${this.baseUrl}/${incentive.id}`, incentive);
  }

  /** ✅ Delete incentive */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
