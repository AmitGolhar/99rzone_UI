import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@app/environment/environment';
import { Property2 } from '@app/models/property2.model';
import { PropertyTask } from '@app/models/property.model copy';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private baseUrl = `${environment.apiUrl}/property-listing`;

  constructor(private http: HttpClient) {}

  // ===========================
  // 🏠 PROPERTY LISTING CRUD API
  // ===========================

  // 🔹 Get all property listings
  getAll(): Observable<PropertyTask[]> {
    return this.http.get<PropertyTask[]>(`${this.baseUrl}`);
  }

  // 🔹 Get single property listing by ID
  getById(id: number): Observable<PropertyTask> {
    return this.http.get<PropertyTask>(`${this.baseUrl}/${id}`);
  }

  // 🔹 Create new property listing
  add(task: PropertyTask): Observable<PropertyTask> {
    return this.http.post<PropertyTask>(`${this.baseUrl}`, task);
  }

  // 🔹 Update property listing
  update(task: PropertyTask): Observable<PropertyTask> {
    if (!task.id) throw new Error('Task ID is required for update');
    return this.http.put<PropertyTask>(`${this.baseUrl}/${task.id}`, task);
  }

  // 🔹 Delete property listing
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ===========================
  // 🏡 PROPERTY FETCH (for maps/listing view)
  // ===========================

  getProperties(): Observable<Property2[]> {
    // Realtime call if API exists
    return this.http.get<Property2[]>(`${environment.apiUrl}/properties`);
  }
}
