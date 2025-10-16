import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '@app/environment/environment';

export interface Expense {
  id?: number;
  type: string;
  description: string;
  amount: number;
  date: string;
}

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private baseUrl = `${environment.apiUrl}/expense-commission`;

  private expenses$ = new BehaviorSubject<Expense[]>([]);

  constructor(private http: HttpClient, private zone: NgZone) {
    this.initSSE(); // ✅ Start listening to real-time updates
  }

  /** 🔄 Initialize real-time Server-Sent Events connection */
  private initSSE(): void {
    const eventSource = new EventSource(`${this.baseUrl}/stream`);

    eventSource.onmessage = (event) => {
      this.zone.run(() => {
        const data: Expense[] = JSON.parse(event.data);
        this.expenses$.next(data);
      });
    };

    eventSource.onerror = (err) => {
      console.error('❌ Expense SSE Error:', err);
      eventSource.close();
      // Retry connection after 5 seconds
      setTimeout(() => this.initSSE(), 5000);
    };
  }

  /** ✅ Observable that emits live expense updates */
  listen(): Observable<Expense[]> {
    return this.expenses$.asObservable();
  }

  /** ✅ Get all expenses (initial or fallback) */
  getAll(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.baseUrl);
  }

  /** ✅ Add a new expense */
  add(expense: Expense): Observable<Expense> {
    if (!expense.date) expense.date = new Date().toISOString().slice(0, 10);
    return this.http.post<Expense>(this.baseUrl, expense);
  }

  /** ✅ Delete an expense */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
