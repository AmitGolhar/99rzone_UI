import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClientTask } from '@app/models/client.model';
 

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientTasks: ClientTask[] = [
  {
    id: 1,
    taskType: 'Site Visit Scheduling',
    clientName: 'Neha Sharma',
    contactNumber: '9822012345',
    propertyName: 'Ocean View Apartments',
    assignedTo: 'Ravi Deshmukh',
    status: 'Pending',
    dueDate: '2025-10-13',
    notes: 'Confirm visit time before noon'
  },
  {
    id: 2,
    taskType: 'Site Visit Follow-Up',
    clientName: 'Rohan Mehta',
    contactNumber: '9876509876',
    propertyName: 'Skyline Towers',
    assignedTo: 'Amit Golhar',
    status: 'In Progress',
    dueDate: '2025-10-14',
    notes: 'Follow up for feedback after yesterday’s visit'
  },
  {
    id: 3,
    taskType: 'Pickup & Drop Coordination',
    clientName: 'Priya Nair',
    contactNumber: '9812311455',
    propertyName: 'Green Valley Residency',
    assignedTo: 'Neha Sharma',
    status: 'Pending',
    dueDate: '2025-10-12',
    notes: 'Book cab from Kalyani Nagar to project site'
  },
  {
    id: 4,
    taskType: 'Office Meeting / Consultation',
    clientName: 'Karan Singh',
    contactNumber: '9823104567',
    propertyName: 'Palm Heights',
    assignedTo: 'Rahul Verma',
    status: 'Completed',
    dueDate: '2025-10-10',
    notes: 'Discussed pricing and EMI options in detail'
  },
  {
    id: 5,
    taskType: 'Document Collection',
    clientName: 'Ankita Patil',
    contactNumber: '9834455667',
    propertyName: 'Silverline Heights',
    assignedTo: 'Ravi Deshmukh',
    status: 'In Progress',
    dueDate: '2025-10-13',
    notes: 'Collect PAN and Aadhar copies from client'
  },
  {
    id: 6,
    taskType: 'Agreement Signing',
    clientName: 'Vikram Joshi',
    contactNumber: '9812345678',
    propertyName: 'Dreamland Residency',
    assignedTo: 'Amit Golhar',
    status: 'Pending',
    dueDate: '2025-10-15',
    notes: 'Prepare two copies of sale agreement for signing'
  },
  {
    id: 7,
    taskType: 'Payment Collection / Receipt',
    clientName: 'Sneha Kapoor',
    contactNumber: '9845123456',
    propertyName: 'Lakeview Villas',
    assignedTo: 'Neha Sharma',
    status: 'Completed',
    dueDate: '2025-10-09',
    notes: 'Collected 1st installment and issued receipt'
  },
  {
    id: 8,
    taskType: 'Feedback / Testimonial Collection',
    clientName: 'Rajesh Kumar',
    contactNumber: '9877788899',
    propertyName: 'Elite Enclave',
    assignedTo: 'Rahul Verma',
    status: 'Pending',
    dueDate: '2025-10-14',
    notes: 'Request video testimonial after possession'
  },
  {
    id: 9,
    taskType: 'Property Handover / Key Delivery',
    clientName: 'Tanvi Desai',
    contactNumber: '9819001122',
    propertyName: 'Harmony Homes',
    assignedTo: 'Ravi Deshmukh',
    status: 'In Progress',
    dueDate: '2025-10-11',
    notes: 'Ensure cleaning done before key handover'
  },
  {
    id: 10,
    taskType: 'Post-Sale Support / Maintenance Request',
    clientName: 'Kunal Agarwal',
    contactNumber: '9823123450',
    propertyName: 'Sunshine Residency',
    assignedTo: 'Amit Golhar',
    status: 'Completed',
    dueDate: '2025-10-08',
    notes: 'Resolved minor plumbing issue post-possession'
  }
]


  getAll(): Observable<ClientTask[]> {
    return of(this.clientTasks);
  }

  add(task: ClientTask): Observable<ClientTask> {
    task.id = this.clientTasks.length + 1;
    this.clientTasks.push(task);
    return of(task);
  }

  update(task: ClientTask): Observable<ClientTask> {
    const idx = this.clientTasks.findIndex(t => t.id === task.id);
    if (idx !== -1) this.clientTasks[idx] = task;
    return of(task);
  }

  delete(id: number): Observable<boolean> {
    this.clientTasks = this.clientTasks.filter(t => t.id !== id);
    return of(true);
  }
}
