import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarketingTask } from '@app/models/marketing.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketingService {
  
  // ✅ Backend endpoint for MarketingOutreach API
  private baseUrl = `${environment.apiUrl}/marketing-outreach`;

  constructor(private http: HttpClient) {}

  /**
   * 🔹 Get all marketing tasks
   */
  getAll(): Observable<MarketingTask[]> {
    return this.http.get<MarketingTask[]>(this.baseUrl);
  }

  /**
   * 🔹 Get marketing task by ID
   */
  getById(id: number): Observable<MarketingTask> {
    return this.http.get<MarketingTask>(`${this.baseUrl}/${id}`);
  }

  /**
   * 🔹 Add a new marketing task
   */
  add(task: MarketingTask): Observable<MarketingTask> {
    return this.http.post<MarketingTask>(this.baseUrl, task);
  }

  /**
   * 🔹 Update an existing marketing task
   */
  update(task: MarketingTask): Observable<MarketingTask> {
    if (!task.id) {
      throw new Error('Task ID is required for update operation.');
    }
    return this.http.put<MarketingTask>(`${this.baseUrl}/${task.id}`, task);
  }

  /**
   * 🔹 Delete a marketing task by ID
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
