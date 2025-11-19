import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseUrl = `${environment.apiUrl}`

  constructor(private http: HttpClient) {}

  /** Send task assignment email */
  sendAssignmentEmail(task: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/email/task-assigned`, task);
  }

  /** Send status update email */
  sendStatusUpdateEmail(task: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/email/task-status-update`, task);
  }

  sendLeadAssignedEmail(payload: any): Observable<any> {  
    return this.http.post(`${this.baseUrl}/lead-management`, payload);
  }

  sendLeadUpdatedEmail(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/lead-updated`, payload);
  }
}
