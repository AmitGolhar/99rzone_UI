import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@app/environment/environment';

export interface Lead99 {
  id?: number;
  serviceType: string;
  propertyType: string;
  leadDate: string;
  leadName: string;
  leadPhoneNumber: string;
  leadEmail: string;
  sellerId: string;
  sellerName: string;
  locality: string;
  city: string;
  configuration: string;
  price: string;
  buildingProjectName: string;
  propertyProjectId: string;
  address: string;
  primary_lead_status: string;
  secondary_lead_status: string;
}

@Injectable({
  providedIn: 'root'
})
export class Lead99Service {
 
  private apiUrl = `${environment.apiUrl}/99acres-leads`
  constructor(private http: HttpClient) {}

  /** Get all uploaded leads */
  getAllLeads(): Observable<Lead99[]> {
    return this.http.get<Lead99[]>(this.apiUrl);
  }
}
