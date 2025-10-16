import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LegalTask } from '@app/models/legal.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LegalService {
  
  // ✅ Backend endpoint for LegalDocumentation API
  private baseUrl = `${environment.apiUrl}/legal-documentation`;

  constructor(private http: HttpClient) {}

  /**
   * 🔹 Fetch all legal documentation tasks
   */
  getAll(): Observable<LegalTask[]> {
    return this.http.get<LegalTask[]>(this.baseUrl);
  }

  /**
   * 🔹 Fetch a single legal task by ID
   */
  getById(id: number): Observable<LegalTask> {
    return this.http.get<LegalTask>(`${this.baseUrl}/${id}`);
  }

  /**
   * 🔹 Add a new legal task
   */
  add(task: LegalTask): Observable<LegalTask> {
    return this.http.post<LegalTask>(this.baseUrl, task);
  }

  /**
   * 🔹 Update an existing legal task
   */
  update(task: LegalTask): Observable<LegalTask> {
    if (!task.id) {
      throw new Error('Task ID is required for update operation.');
    }
    return this.http.put<LegalTask>(`${this.baseUrl}/${task.id}`, task);
  }

  /**
   * 🔹 Delete a legal task by ID
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
