import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '@app/services/employee.service';
import { Employee } from '@app/models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  searchText = '';
  isLoading = false;
  errorMessage = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.isLoading = true;
    this.errorMessage = '';

    this.employeeService.getAllEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = "❌ Failed to load employees.";
        this.isLoading = false;
      }
    });
  }
}
