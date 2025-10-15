import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SupportTask } from '@app/models/support.model';
 

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private supportTasks: SupportTask[] = [
  {
    id: 1,
    taskType: 'Handover Scheduling',
    clientName: 'Rahul Khanna',
    propertyName: 'Green Meadows Phase 2',
    assignedTo: 'Neha Sharma',
    status: 'Pending',
    dueDate: '2025-10-16',
    notes: 'Schedule handover and prepare checklist'
  },
  {
    id: 2,
    taskType: 'Final Inspection Visit',
    clientName: 'Ankita Deshmukh',
    propertyName: 'Sunshine Residency',
    assignedTo: 'Amit Golhar',
    status: 'In Progress',
    dueDate: '2025-10-15',
    notes: 'Inspect fittings and fixtures before final handover'
  },
  {
    id: 3,
    taskType: 'Handover Kit Preparation',
    clientName: 'Vikram Singh',
    propertyName: 'Lakeview Villas',
    assignedTo: 'Neha Sharma',
    status: 'Resolved',
    dueDate: '2025-10-12',
    notes: 'Prepared welcome kit with all documents and keys'
  },
  {
    id: 4,
    taskType: 'Post-Handover Support Call',
    clientName: 'Sneha Patil',
    propertyName: 'Skyline Towers',
    assignedTo: 'Rahul Verma',
    status: 'Closed',
    dueDate: '2025-10-18',
    notes: 'Client satisfied with handover; no further action required'
  },
  {
    id: 5,
    taskType: 'Maintenance Issue Resolution',
    clientName: 'Rohan Mehta',
    propertyName: 'Palm Heights',
    assignedTo: 'Sachin Kulkarni',
    status: 'In Progress',
    dueDate: '2025-10-14',
    notes: 'Plumbing issue under repair, technician assigned'
  },
  {
    id: 6,
    taskType: 'Utility Connection Assistance',
    clientName: 'Priya Sharma',
    propertyName: 'Dreamland Residency',
    assignedTo: 'Mauli Deshmukh',
    status: 'Resolved',
    dueDate: '2025-10-10',
    notes: 'Electricity and water connections successfully activated'
  },
  {
    id: 7,
    taskType: 'Warranty Claim Processing',
    clientName: 'Tanvi Desai',
    propertyName: 'Elite Enclave',
    assignedTo: 'Neha Sharma',
    status: 'Pending',
    dueDate: '2025-10-17',
    notes: 'Awaiting vendor confirmation for repair approval'
  },
  {
    id: 8,
    taskType: 'Feedback Collection',
    clientName: 'Kunal Agarwal',
    propertyName: 'Harmony Homes',
    assignedTo: 'Amit Golhar',
    status: 'In Progress',
    dueDate: '2025-10-13',
    notes: 'Feedback form shared, waiting for client response'
  },
  {
    id: 9,
    taskType: 'Cleaning & Final Setup',
    clientName: 'Ravi Kulkarni',
    propertyName: 'Silverline Heights',
    assignedTo: 'Rahul Verma',
    status: 'Resolved',
    dueDate: '2025-10-11',
    notes: 'Final setup completed, ready for inspection'
  },
  {
    id: 10,
    taskType: 'After-Sales Service Visit',
    clientName: 'Pooja Deshmukh',
    propertyName: 'Ocean View Apartments',
    assignedTo: 'Sachin Kulkarni',
    status: 'Closed',
    dueDate: '2025-10-19',
    notes: 'Service visit completed and documented successfully'
  }
]



  getAll(): Observable<SupportTask[]> {
    return of(this.supportTasks);
  }

  add(task: SupportTask): Observable<SupportTask> {
    task.id = this.supportTasks.length + 1;
    this.supportTasks.push(task);
    return of(task);
  }

  update(task: SupportTask): Observable<SupportTask> {
    const idx = this.supportTasks.findIndex(t => t.id === task.id);
    if (idx !== -1) this.supportTasks[idx] = task;
    return of(task);
  }

  delete(id: number): Observable<boolean> {
    this.supportTasks = this.supportTasks.filter(t => t.id !== id);
    return of(true);
  }
}
