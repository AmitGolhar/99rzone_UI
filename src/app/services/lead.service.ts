import { Injectable } from '@angular/core';
 import { Observable, of } from 'rxjs';
import { LeadTask } from'@app/models/lead.model';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private leadTasks: LeadTask[] = [
  {
    id: 1,
    taskType: 'New Lead Follow-Up',
    leadName: 'Rohan Mehta',
    contactNumber: '9876543210',
    propertyName: 'Sunshine Residency',
    assignedTo: 'Amit Golhar',
    status: 'Pending',
    dueDate: '2025-10-11',
    notes: 'Call before 5 PM'
  },
  {
    id: 2,
    taskType: 'Call Back / WhatsApp Follow-Up',
    leadName: 'Sneha Patil',
    contactNumber: '9823456781',
    propertyName: 'Green Valley Apartments',
    assignedTo: 'Karan Joshi',
    status: 'In Progress',
    dueDate: '2025-10-12',
    notes: 'Client prefers WhatsApp communication'
  },
  {
    id: 3,
    taskType: 'Lead Assignment & Tracking',
    leadName: 'Arjun Nair',
    contactNumber: '9812234455',
    propertyName: 'Palm Heights',
    assignedTo: 'Neha Sharma',
    status: 'Completed',
    dueDate: '2025-10-09',
    notes: 'Follow-up completed, interested in 2BHK'
  },
  {
    id: 4,
    taskType: 'Site Visit Scheduling',
    leadName: 'Pooja Deshmukh',
    contactNumber: '9898989898',
    propertyName: 'Skyline Towers',
    assignedTo: 'Amit Golhar',
    status: 'Pending',
    dueDate: '2025-10-13',
    notes: 'Schedule visit at 10 AM, prefers weekend'
  },
  {
    id: 5,
    taskType: 'New Lead Follow-Up',
    leadName: 'Vikram Singh',
    contactNumber: '9876001122',
    propertyName: 'Lakeview Villas',
    assignedTo: 'Rahul Verma',
    status: 'In Progress',
    dueDate: '2025-10-10',
    notes: 'Requested details for 3BHK premium flat'
  },
  {
    id: 6,
    taskType: 'Lead Status Updates',
    leadName: 'Ankita Ghosh',
    contactNumber: '9811122233',
    propertyName: 'Dreamland Residency',
    assignedTo: 'Amit Golhar',
    status: 'Completed',
    dueDate: '2025-10-08',
    notes: 'Marked as “Converted” – booking confirmed'
  },
  {
    id: 7,
    taskType: 'Call Back / WhatsApp Follow-Up',
    leadName: 'Ravi Kulkarni',
    contactNumber: '9845002211',
    propertyName: 'Garden City Phase II',
    assignedTo: 'Karan Joshi',
    status: 'Pending',
    dueDate: '2025-10-11',
    notes: 'Call in the evening; asked for floor plan'
  },
  {
    id: 8,
    taskType: 'Site Visit Scheduling',
    leadName: 'Priya Sharma',
    contactNumber: '9877654321',
    propertyName: 'Elite Enclave',
    assignedTo: 'Neha Sharma',
    status: 'In Progress',
    dueDate: '2025-10-14',
    notes: 'Client bringing family for visit'
  },
  {
    id: 9,
    taskType: 'Lead Assignment & Tracking',
    leadName: 'Kunal Agarwal',
    contactNumber: '9833322110',
    propertyName: 'Harmony Homes',
    assignedTo: 'Rahul Verma',
    status: 'Pending',
    dueDate: '2025-10-12',
    notes: 'Assign to senior sales associate'
  },
  {
    id: 10,
    taskType: 'Lead Status Updates',
    leadName: 'Tanya Kapoor',
    contactNumber: '9822110099',
    propertyName: 'Silverline Heights',
    assignedTo: 'Amit Golhar',
    status: 'Completed',
    dueDate: '2025-10-09',
    notes: 'Client declined offer, marked as not interested'
  }
];


  getAllLeads(): Observable<LeadTask[]> {
    return of(this.leadTasks);
  }

  addLead(task: LeadTask): Observable<LeadTask> {
    task.id = this.leadTasks.length + 1;
    this.leadTasks.push(task);
    return of(task);
  }

  updateLead(task: LeadTask): Observable<LeadTask> {
    const index = this.leadTasks.findIndex(t => t.id === task.id);
    if (index !== -1) this.leadTasks[index] = task;
    return of(task);
  }

  deleteLead(id: number): Observable<boolean> {
    this.leadTasks = this.leadTasks.filter(t => t.id !== id);
    return of(true);
  }
}
