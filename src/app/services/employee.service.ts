import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '@app/models/employee.model';
import { environment } from '@app/environment/environment';
 
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/all`);
  }

   addEmployee(employee: Employee): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/registerEmployee`, employee);
  }

   getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/auth/employees`);
  }
}
