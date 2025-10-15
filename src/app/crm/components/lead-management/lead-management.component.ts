import { Component, OnInit } from '@angular/core';
import { LeadTask } from '@app/models/lead.model';
import { LeadService } from '@app/services/lead.service';
 
 declare var bootstrap: any;

@Component({
  selector: 'app-lead-management',
  templateUrl: './lead-management.component.html',
  styleUrls: ['./lead-management.component.css']
})
export class LeadManagementComponent implements OnInit {

  leadTasks: LeadTask[] = [];
  searchText = '';
  selectedTask: LeadTask = this.initTask();
  isEditing = false;

  taskTypes: string[] = [
    'New Lead Follow-Up',
    'Call / WhatsApp Follow-Up',
    'Send Property Details',
    'Schedule Site Visit',
    'Update Lead Status',
    'Lead Assignment',
    'Lead Qualification',
    'Record Feedback / Notes',
    'Negotiation / Offer Discussion',
    'Booking Confirmation',
    'Re-Engage Dormant Lead',
    'Close / Lost Lead Reason'
  ];

  statuses: string[] = ['Pending', 'In Progress', 'Completed'];

  constructor(private leadService: LeadService) {}

  ngOnInit(): void {
    this.loadLeads();
  }

  loadLeads(): void {
    this.leadService.getAllLeads().subscribe(tasks => this.leadTasks = tasks);
  }

  openAddModal(): void {
    this.isEditing = false;
    this.selectedTask = this.initTask();
    const modal = document.getElementById('leadModal');
    if (modal) new bootstrap.Modal(modal).show();
  }

  openEditModal(task: LeadTask): void {
    this.isEditing = true;
    this.selectedTask = { ...task };
    const modal = document.getElementById('leadModal');
    if (modal) new bootstrap.Modal(modal).show();
  }

  saveTask(): void {
    if (this.isEditing) {
      this.leadService.updateLead(this.selectedTask).subscribe(() => this.loadLeads());
    } else {
      this.leadService.addLead(this.selectedTask).subscribe(() => this.loadLeads());
    }
    const modalEl = document.getElementById('leadModal');
    const modal = bootstrap.Modal.getInstance(modalEl!);
    modal?.hide();
  }

  deleteTask(id?: number): void {
    if (id && confirm('Are you sure you want to delete this task?')) {
      this.leadService.deleteLead(id).subscribe(() => this.loadLeads());
    }
  }

  initTask(): LeadTask {
    return {
      taskType: '',
      leadName: '',
      contactNumber: '',
      propertyName: '',
      assignedTo: '',
      status: 'Pending',
      dueDate: '',
      notes: ''
    };
  }
}
