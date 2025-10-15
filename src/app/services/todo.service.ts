import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TodoTask } from '@app/models/todo-task.model';
 

@Injectable({ providedIn: 'root' })
export class TodoService {
  private tasks: TodoTask[] = [];

  constructor() {
    this.tasks = this.tasks = [
  {
    id: 1,
    title: 'Call lead - Rohan',
    moduleType: 'RESELL',
    priority: 'High',
    status: 'Pending',
    category: 'Lead Follow-Up',
    assignedTo: 'Neha Sharma',
    createdBy: 'System',
    dueDate: this.addDaysISO(1)
  },
  {
    id: 2,
    title: 'Upload photos - Green Meadows',
    moduleType: 'RENT',
    priority: 'Medium',
    status: 'In Progress',
    category: 'Property Visit',
    assignedTo: 'Ravi Deshmukh',
    createdBy: 'Admin',
    dueDate: this.addDaysISO(3)
  },
  {
    id: 3,
    title: 'Collect payment proof - Tower 5 Flat 303',
    moduleType: 'PAYMENT',
    priority: 'Critical',
    status: 'Pending',
    category: 'Payment Reminder',
    assignedTo: 'Amit Golhar',
    createdBy: 'Finance Bot',
    dueDate: this.addDaysISO(-2)
  },
  {
    id: 4,
    title: 'Draft rent agreement - Patel Residency',
    moduleType: 'LEGAL',
    priority: 'High',
    status: 'In Progress',
    category: 'Agreement Draft',
    assignedTo: 'Sneha Patil',
    createdBy: 'Legal Admin',
    dueDate: this.addDaysISO(2)
  },
  {
    id: 5,
    title: 'Schedule Facebook Ad Campaign - Sunrise Heights',
    moduleType: 'MARKETING',
    priority: 'Medium',
    status: 'Pending',
    category: 'Marketing Campaign',
    assignedTo: 'Ankit Verma',
    createdBy: 'Marketing Manager',
    dueDate: this.addDaysISO(5)
  },
  {
    id: 6,
    title: 'Client feedback call - Mr. Desai',
    moduleType: 'CLIENT_INTERACTION',
    priority: 'Low',
    status: 'Pending',
    category: 'Customer Feedback',
    assignedTo: 'Priya Nair',
    createdBy: 'CRM System',
    dueDate: this.addDaysISO(1)
  },
  {
    id: 7,
    title: 'Internal review meeting - Sales Team Q4',
    moduleType: 'ADMIN',
    priority: 'Medium',
    status: 'On Hold',
    category: 'Internal Review',
    assignedTo: 'Admin Team',
    createdBy: 'Director',
    dueDate: this.addDaysISO(4)
  },
  {
    id: 8,
    title: 'Electricity name transfer - Pearl Residency',
    moduleType: 'AFTER_SALES',
    priority: 'High',
    status: 'Pending',
    category: 'After Sales Service',
    assignedTo: 'Ravi Deshmukh',
    createdBy: 'Support',
    dueDate: this.addDaysISO(2)
  },
  {
    id: 9,
    title: 'Society NOC follow-up - Lakeview Apartments',
    moduleType: 'LEGAL',
    priority: 'High',
    status: 'In Progress',
    category: 'Document Collection',
    assignedTo: 'Sneha Patil',
    createdBy: 'Legal Bot',
    dueDate: this.addDaysISO(1)
  },
  {
    id: 10,
    title: 'Generate agent incentive report - October',
    moduleType: 'ADMIN',
    priority: 'Medium',
    status: 'Completed',
    category: 'Commission / Incentive',
    assignedTo: 'Finance Dept',
    createdBy: 'System',
    dueDate: this.addDaysISO(-1)
  }
];

  }

  private addDaysISO(days: number): string {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  getAll(): Observable<TodoTask[]> {
    return of([...this.tasks]);
  }

  add(task: TodoTask): Observable<TodoTask> {
    const id = this.tasks.length ? Math.max(...this.tasks.map(t => t.id || 0)) + 1 : 1;
    const copy = { ...task, id, createdAt: new Date().toISOString() };
    this.tasks.push(copy);
    return of(copy);
  }

  update(task: TodoTask): Observable<TodoTask> {
    const i = this.tasks.findIndex(t => t.id === task.id);
    if (i !== -1) this.tasks[i] = { ...task, updatedAt: new Date().toISOString() };
    return of(task);
  }

  delete(id: number): Observable<boolean> {
    this.tasks = this.tasks.filter(t => t.id !== id);
    return of(true);
  }
}
