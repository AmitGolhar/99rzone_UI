import { Injectable } from '@angular/core';
import { AdminTask } from '@app/models/admin.model';
import { Observable, of } from 'rxjs';
 
 
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminTasks: AdminTask[] = [
  {
    id: 1,
    taskType: 'Team Meeting / Briefing',
    department: 'Sales',
    assignedTo: 'Amit Golhar',
    priority: 'High',
    status: 'Pending',
    dueDate: '2025-10-17',
    notes: 'Weekly sales performance meeting at 11 AM'
  },
  {
    id: 2,
    taskType: 'Monthly Expense Audit',
    department: 'Accounts',
    assignedTo: 'Neha Sharma',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2025-10-18',
    notes: 'Verify expense claims for September month'
  },
  {
    id: 3,
    taskType: 'Recruitment Drive Planning',
    department: 'HR',
    assignedTo: 'Ravi Deshmukh',
    priority: 'High',
    status: 'Pending',
    dueDate: '2025-10-19',
    notes: 'Plan walk-in interview schedule for support staff'
  },
  {
    id: 4,
    taskType: 'Server Maintenance',
    department: 'IT',
    assignedTo: 'Sachin Patil',
    priority: 'High',
    status: 'Resolved',
    dueDate: '2025-10-14',
    notes: 'System maintenance completed and backup verified'
  },
  {
    id: 5,
    taskType: 'Inventory Check',
    department: 'Admin',
    assignedTo: 'Mauli Deshmukh',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2025-10-16',
    notes: 'Update stationery stock report and reorder list'
  },
  {
    id: 6,
    taskType: 'Policy Review Meeting',
    department: 'HR',
    assignedTo: 'Vijay Kulkarni',
    priority: 'Low',
    status: 'Closed',
    dueDate: '2025-10-10',
    notes: 'Finalized updated leave policy document'
  },
  {
    id: 7,
    taskType: 'System Upgrade Testing',
    department: 'IT',
    assignedTo: 'Amit Golhar',
    priority: 'High',
    status: 'Pending',
    dueDate: '2025-10-20',
    notes: 'Upgrade CRM server to latest version before weekend'
  },
  {
    id: 8,
    taskType: 'Vendor Payment Approval',
    department: 'Accounts',
    assignedTo: 'Neha Sharma',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2025-10-15',
    notes: 'Pending final approval from finance manager'
  },
  {
    id: 9,
    taskType: 'Fire Drill & Safety Inspection',
    department: 'Admin',
    assignedTo: 'Ravi Kulkarni',
    priority: 'Medium',
    status: 'Resolved',
    dueDate: '2025-10-12',
    notes: 'Completed successfully; report submitted to HR'
  },
  {
    id: 10,
    taskType: 'Client Data Backup',
    department: 'IT',
    assignedTo: 'Sachin Patil',
    priority: 'High',
    status: 'Closed',
    dueDate: '2025-10-11',
    notes: 'Full backup completed and stored on secure drive'
  },
  {
    id: 11,
    taskType: 'Quarterly Budget Meeting',
    department: 'Finance',
    assignedTo: 'Vijay Kulkarni',
    priority: 'High',
    status: 'Pending',
    dueDate: '2025-10-18',
    notes: 'Prepare presentation slides for Q3 budget review'
  },
  {
    id: 12,
    taskType: 'Office Renovation Discussion',
    department: 'Admin',
    assignedTo: 'Neha Sharma',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2025-10-19',
    notes: 'Finalize color theme and furniture layouts'
  },
  {
    id: 13,
    taskType: 'Payroll Processing',
    department: 'Accounts',
    assignedTo: 'Ravi Deshmukh',
    priority: 'High',
    status: 'Resolved',
    dueDate: '2025-10-14',
    notes: 'Payroll processed successfully for October'
  },
  {
    id: 14,
    taskType: 'Employee Onboarding Session',
    department: 'HR',
    assignedTo: 'Mauli Deshmukh',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '2025-10-17',
    notes: 'Conduct orientation for new hires on company policies'
  },
  {
    id: 15,
    taskType: 'Office Network Troubleshooting',
    department: 'IT',
    assignedTo: 'Sachin Patil',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2025-10-15',
    notes: 'Resolve connectivity issue in main meeting room'
  },
  {
    id: 16,
    taskType: 'Employee Attendance Report',
    department: 'HR',
    assignedTo: 'Vijay Kulkarni',
    priority: 'Low',
    status: 'Closed',
    dueDate: '2025-10-09',
    notes: 'Attendance report shared with management'
  },
  {
    id: 17,
    taskType: 'Vendor Contract Renewal',
    department: 'Procurement',
    assignedTo: 'Neha Sharma',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '2025-10-21',
    notes: 'Renew annual IT hardware support contract'
  },
  {
    id: 18,
    taskType: 'Internal Audit Preparation',
    department: 'Finance',
    assignedTo: 'Amit Golhar',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2025-10-19',
    notes: 'Gather previous quarter invoices and expense reports'
  },
  {
    id: 19,
    taskType: 'Cafeteria Vendor Evaluation',
    department: 'Admin',
    assignedTo: 'Ravi Kulkarni',
    priority: 'Low',
    status: 'Resolved',
    dueDate: '2025-10-13',
    notes: 'Vendor shortlisted; final decision pending approval'
  },
  {
    id: 20,
    taskType: 'Employee Recognition Planning',
    department: 'HR',
    assignedTo: 'Mauli Deshmukh',
    priority: 'Medium',
    status: 'Closed',
    dueDate: '2025-10-12',
    notes: 'Planned recognition event for top performers of Q3'
  }
]

  getAll(): Observable<AdminTask[]> {
    return of(this.adminTasks);
  }

  add(task: AdminTask): Observable<AdminTask> {
    task.id = this.adminTasks.length + 1;
    this.adminTasks.push(task);
    return of(task);
  }

  update(task: AdminTask): Observable<AdminTask> {
    const idx = this.adminTasks.findIndex(t => t.id === task.id);
    if (idx !== -1) this.adminTasks[idx] = task;
    return of(task);
  }

  delete(id: number): Observable<boolean> {
    this.adminTasks = this.adminTasks.filter(t => t.id !== id);
    return of(true);
  }
}
