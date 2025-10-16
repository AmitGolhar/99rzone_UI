import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SmartTask } from '@app/models/smart.model';
import { environment } from '@app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SmartService {
  private baseUrl = `${environment.apiUrl}/custom-smart-automation`;

  constructor(private http: HttpClient) {}

  /**
   * 🔹 Fetch all Smart Automation tasks
   */
  getAll(): Observable<SmartTask[]> {
    return this.http.get<SmartTask[]>(this.baseUrl);
  }

  /**
   * 🔹 Get a specific SmartTask by ID
   */
  getById(id: number): Observable<SmartTask> {
    return this.http.get<SmartTask>(`${this.baseUrl}/${id}`);
  }

  /**
   * 🔹 Add a new Smart Automation task
   */
  add(task: SmartTask): Observable<SmartTask> {
    return this.http.post<SmartTask>(this.baseUrl, task);
  }

  /**
   * 🔹 Update an existing Smart Automation task
   */
  update(task: SmartTask): Observable<SmartTask> {
    if (!task.id) {
      throw new Error('SmartTask ID is required to update.');
    }
    return this.http.put<SmartTask>(`${this.baseUrl}/${task.id}`, task);
  }

  /**
   * 🔹 Delete a SmartTask by ID
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
