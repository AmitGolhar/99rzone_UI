import { Component } from '@angular/core';
import { Employee } from '@app/models/employee.model';
import { EmployeeService } from '@app/services/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {

  employee: Employee = {
    name: '',
    email: '',
    phone: '',
    department: '',
    joiningDate: ''
  };

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private empService: EmployeeService) {}

  submitForm() {
    this.successMessage = '';
    this.errorMessage = '';
    this.isSubmitting = true;

    this.empService.addEmployee(this.employee).subscribe({
      next: (res) => {
        this.successMessage =
          "🎉 Employee added! Login account created and welcome email sent.";

        // Reset form
        this.employee = {
          name: '',
          email: '',
          phone: '',
          department: '',
          joiningDate: ''
        };

        this.isSubmitting = false;
      },
      error: (err) => {
        console.error(err);

        this.errorMessage =
          err.error?.error ?? "❌ Failed to add employee.";

        this.isSubmitting = false;
      }
    });
  }
}
