import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environment/environment';
import { AdminTask } from '@app/models/admin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // ✅ Match your backend route (adjust if needed)
  private baseUrl = `${environment.apiUrl}/admin-internal`;

  constructor(private http: HttpClient) {}

  /**
   * 🔹 Fetch all admin/internal tasks
   */
  getAll(): Observable<AdminTask[]> {
    return this.http.get<AdminTask[]>(this.baseUrl);
  }

  /**
   * 🔹 Get task by ID
   */
  getById(id: number): Observable<AdminTask> {
    return this.http.get<AdminTask>(`${this.baseUrl}/${id}`);
  }

  /**
   * 🔹 Add a new admin task
   */
  add(task: AdminTask): Observable<AdminTask> {
    return this.http.post<AdminTask>(this.baseUrl, task);
  }

  /**
   * 🔹 Update an existing task
   */
  update(task: AdminTask): Observable<AdminTask> {
    if (!task.id) {
      throw new Error('Task ID is required to update');
    }
    return this.http.put<AdminTask>(`${this.baseUrl}/${task.id}`, task);
  }

  /**
   * 🔹 Delete a task by ID
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
