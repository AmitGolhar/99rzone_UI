import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SmartTask } from '@app/models/smart.model';
 

@Injectable({
  providedIn: 'root'
})
export class SmartService {
  private smartTasks: SmartTask[] = [
  {
    id: 1,
    taskType: 'SLA Breach Alert',
    triggerSource: 'Lead Follow-Up Delay',
    automationType: 'System Alert',
    assignedTo: 'Ravi Deshmukh',
    status: 'Pending',
    dueDate: '2025-10-18',
    notes: 'Auto-triggered: Lead not contacted within 24 hrs'
  },
  {
    id: 2,
    taskType: 'Payment Reminder Trigger',
    triggerSource: 'Due Payment Alert',
    automationType: 'Email Notification',
    assignedTo: 'Neha Sharma',
    status: 'In Progress',
    dueDate: '2025-10-17',
    notes: 'Email sent to client for overdue installment reminder'
  },
  {
    id: 3,
    taskType: 'Inactive Lead Nurture Sequence',
    triggerSource: 'Lead Inactivity > 7 Days',
    automationType: 'Workflow Automation',
    assignedTo: 'Amit Golhar',
    status: 'Resolved',
    dueDate: '2025-10-15',
    notes: 'Automated sequence triggered for cold leads'
  },
  {
    id: 4,
    taskType: 'Data Backup Verification',
    triggerSource: 'Nightly Database Backup',
    automationType: 'System Job',
    assignedTo: 'Sachin Patil',
    status: 'Closed',
    dueDate: '2025-10-12',
    notes: 'Backup verified successfully, log archived'
  },
  {
    id: 5,
    taskType: 'Task Escalation Alert',
    triggerSource: 'Unresolved Task > 48 Hrs',
    automationType: 'System Alert',
    assignedTo: 'Vijay Kulkarni',
    status: 'Pending',
    dueDate: '2025-10-19',
    notes: 'Auto-escalated to supervisor for follow-up'
  },
  {
    id: 6,
    taskType: 'Performance Insight Generation',
    triggerSource: 'Weekly Analytics Report',
    automationType: 'Scheduled Job',
    assignedTo: 'Neha Sharma',
    status: 'In Progress',
    dueDate: '2025-10-16',
    notes: 'Generating report for management dashboard'
  },
  {
    id: 7,
    taskType: 'Duplicate Entry Cleanup',
    triggerSource: 'Lead Data Validation',
    automationType: 'Script Automation',
    assignedTo: 'Ravi Deshmukh',
    status: 'Resolved',
    dueDate: '2025-10-13',
    notes: 'Removed 23 duplicate leads automatically'
  },
  {
    id: 8,
    taskType: 'Security Log Review',
    triggerSource: 'Unauthorized Login Attempt',
    automationType: 'Security Alert',
    assignedTo: 'Sachin Patil',
    status: 'Closed',
    dueDate: '2025-10-10',
    notes: 'IP blocked, credentials reset for affected user'
  },
  {
    id: 9,
    taskType: 'Auto Email Campaign Launch',
    triggerSource: 'Lead Engagement Workflow',
    automationType: 'Campaign Automation',
    assignedTo: 'Mauli Deshmukh',
    status: 'Pending',
    dueDate: '2025-10-18',
    notes: 'Schedule auto-campaign for new sign-ups this week'
  },
  {
    id: 10,
    taskType: 'System Health Check',
    triggerSource: 'Server Uptime Monitor',
    automationType: 'System Job',
    assignedTo: 'Amit Golhar',
    status: 'Resolved',
    dueDate: '2025-10-14',
    notes: 'All systems operational; uptime verified at 99.9%'
  }
]


  getAll(): Observable<SmartTask[]> {
    return of(this.smartTasks);
  }

  add(task: SmartTask): Observable<SmartTask> {
    task.id = this.smartTasks.length + 1;
    this.smartTasks.push(task);
    return of(task);
  }

  update(task: SmartTask): Observable<SmartTask> {
    const idx = this.smartTasks.findIndex(t => t.id === task.id);
    if (idx !== -1) this.smartTasks[idx] = task;
    return of(task);
  }

  delete(id: number): Observable<boolean> {
    this.smartTasks = this.smartTasks.filter(t => t.id !== id);
    return of(true);
  }
}
