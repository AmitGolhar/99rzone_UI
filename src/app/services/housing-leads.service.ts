import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HousingLeadsService {
 
 private apiUrl = `${environment.apiUrl}/housing-leads`
  constructor(private http: HttpClient) {}

  bulkUpload(leads: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/bulk-upload`, leads);
  }

  getAllLeads(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteLead(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
