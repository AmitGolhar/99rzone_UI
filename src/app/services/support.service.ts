import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupportTask } from '@app/models/support.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  // ✅ API base URL - aligns with your Spring Boot endpoint naming
  private baseUrl = `${environment.apiUrl}/client-support-after-sales`;

  constructor(private http: HttpClient) {}

  /**
   * 🔹 Get all after-sales support tasks
   */
  getAll(): Observable<SupportTask[]> {
    return this.http.get<SupportTask[]>(this.baseUrl);
  }

  /**
   * 🔹 Get task by ID
   */
  getById(id: number): Observable<SupportTask> {
    return this.http.get<SupportTask>(`${this.baseUrl}/${id}`);
  }

  /**
   * 🔹 Create a new after-sales support task
   */
  add(task: SupportTask): Observable<SupportTask> {
    return this.http.post<SupportTask>(this.baseUrl, task);
  }

  /**
   * 🔹 Update an existing task
   */
  update(task: SupportTask): Observable<SupportTask> {
    if (!task.id) {
      throw new Error('Task ID is required for update.');
    }
    return this.http.put<SupportTask>(`${this.baseUrl}/${task.id}`, task);
  }

  /**
   * 🔹 Delete task by ID
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
