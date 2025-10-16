import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientTask } from '@app/models/client.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // ✅ Use your real backend API URL
  private baseUrl = `${environment.apiUrl}/client-interaction`;

  constructor(private http: HttpClient) {}

  /**
   * 🔹 Get all client tasks
   */
  getAll(): Observable<ClientTask[]> {
    return this.http.get<ClientTask[]>(this.baseUrl);
  }

  /**
   * 🔹 Get a single client task by ID
   */
  getById(id: number): Observable<ClientTask> {
    return this.http.get<ClientTask>(`${this.baseUrl}/${id}`);
  }

  /**
   * 🔹 Create a new client task
   */
  add(task: ClientTask): Observable<ClientTask> {
    return this.http.post<ClientTask>(this.baseUrl, task);
  }

  /**
   * 🔹 Update an existing client task
   */
  update(task: ClientTask): Observable<ClientTask> {
    if (!task.id) {
      throw new Error('Cannot update task without ID');
    }
    return this.http.put<ClientTask>(`${this.baseUrl}/${task.id}`, task);
  }

  /**
   * 🔹 Delete a client task by ID
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
