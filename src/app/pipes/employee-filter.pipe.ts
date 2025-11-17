import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '@app/models/employee.model';

@Pipe({
  name: 'employeeFilter'
})
export class EmployeeFilterPipe implements PipeTransform {
  transform(employees: Employee[], search: string = ''): Employee[] {
    if (!search) return employees;
    return employees.filter(emp =>
      emp.name.toLowerCase().includes(search.toLowerCase())
    );
  }
}
