import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LegalTask } from '@app/models/legal.model';
 

@Injectable({
  providedIn: 'root'
})
export class LegalService {
  private legalTasks: LegalTask[] = [
  {
    id: 1,
    taskType: 'Agreement Preparation',
    clientName: 'Ankit Patil',
    propertyName: 'Skyline Towers',
    assignedTo: 'Neha Sharma',
    status: 'In Progress',
    dueDate: '2025-10-15',
    notes: 'Draft sale agreement and send for client approval'
  },
  {
    id: 2,
    taskType: 'Document Verification',
    clientName: 'Rohan Mehta',
    propertyName: 'Sunshine Residency',
    assignedTo: 'Vijay Kulkarni',
    status: 'Pending',
    dueDate: '2025-10-14',
    notes: 'Verify ownership documents with local registrar'
  },
  {
    id: 3,
    taskType: 'Agreement Signing Coordination',
    clientName: 'Sneha Ghosh',
    propertyName: 'Green Valley Apartments',
    assignedTo: 'Mauli Deshmukh',
    status: 'Completed',
    dueDate: '2025-10-10',
    notes: 'Client and developer both signed; store digital copy'
  },
  {
    id: 4,
    taskType: 'Sale Deed Registration',
    clientName: 'Vikram Singh',
    propertyName: 'Palm Heights',
    assignedTo: 'Sachin Patil',
    status: 'In Progress',
    dueDate: '2025-10-16',
    notes: 'Book slot at sub-registrar office by 10 AM tomorrow'
  },
  {
    id: 5,
    taskType: 'Stamp Duty Calculation',
    clientName: 'Priya Sharma',
    propertyName: 'Dreamland Residency',
    assignedTo: 'Neha Sharma',
    status: 'Pending',
    dueDate: '2025-10-13',
    notes: 'Confirm current rates and prepare draft payment challan'
  },
  {
    id: 6,
    taskType: 'Power of Attorney Drafting',
    clientName: 'Karan Joshi',
    propertyName: 'Lakeview Villas',
    assignedTo: 'Vijay Kulkarni',
    status: 'Completed',
    dueDate: '2025-10-09',
    notes: 'POA notarized and shared with client for record'
  },
  {
    id: 7,
    taskType: 'Agreement Amendment Review',
    clientName: 'Tanvi Desai',
    propertyName: 'Elite Enclave',
    assignedTo: 'Mauli Deshmukh',
    status: 'In Progress',
    dueDate: '2025-10-15',
    notes: 'Review revised payment clause and approval terms'
  },
  {
    id: 8,
    taskType: 'Document Collection from Client',
    clientName: 'Kunal Agarwal',
    propertyName: 'Harmony Homes',
    assignedTo: 'Sachin Patil',
    status: 'Pending',
    dueDate: '2025-10-12',
    notes: 'Collect Aadhar, PAN, and 2 passport-size photos'
  },
  {
    id: 9,
    taskType: 'Legal Clearance Certificate',
    clientName: 'Ravi Kulkarni',
    propertyName: 'Ocean View Apartments',
    assignedTo: 'Neha Sharma',
    status: 'Completed',
    dueDate: '2025-10-11',
    notes: 'Certificate obtained and uploaded to drive'
  },
  {
    id: 10,
    taskType: 'Agreement Dispatch',
    clientName: 'Pooja Deshmukh',
    propertyName: 'Silverline Heights',
    assignedTo: 'Vijay Kulkarni',
    status: 'In Progress',
    dueDate: '2025-10-14',
    notes: 'Send signed agreement via courier to client'
  }
]


  getAll(): Observable<LegalTask[]> {
    return of(this.legalTasks);
  }

  add(task: LegalTask): Observable<LegalTask> {
    task.id = this.legalTasks.length + 1;
    this.legalTasks.push(task);
    return of(task);
  }

  update(task: LegalTask): Observable<LegalTask> {
    const idx = this.legalTasks.findIndex(t => t.id === task.id);
    if (idx !== -1) this.legalTasks[idx] = task;
    return of(task);
  }

  delete(id: number): Observable<boolean> {
    this.legalTasks = this.legalTasks.filter(t => t.id !== id);
    return of(true);
  }
}
