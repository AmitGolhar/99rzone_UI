import { Component, OnInit } from '@angular/core';
import { SupportTask } from '@app/models/support.model';
import { SupportService } from '@app/services/support.service';
 
declare var bootstrap: any;

@Component({
  selector: 'app-client-support',
  templateUrl: './client-support.component.html',
  styleUrls: ['./client-support.component.css']
})
export class ClientSupportComponent implements OnInit {
  supportTasks: SupportTask[] = [];
  selectedTask: SupportTask = this.initTask();
  searchText = '';
  isEditing = false;

  taskTypes: string[] = [
    'Handover Scheduling',
    'Post-Sale Support',
    'Maintenance Request',
    'Repair / Service Coordination',
    'Client Feedback Collection',
    'Warranty / AMC Management',
    'Complaint Resolution',
    'Follow-Up Visit / Call'
  ];

  statuses: string[] = ['Pending', 'In Progress', 'Resolved', 'Closed'];

  constructor(private supportService: SupportService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.supportService.getAll().subscribe(tasks => this.supportTasks = tasks);
  }

  openAddModal(): void {
    this.isEditing = false;
    this.selectedTask = this.initTask();
    new bootstrap.Modal(document.getElementById('supportModal')).show();
  }

  openEditModal(task: SupportTask): void {
    this.isEditing = true;
    this.selectedTask = { ...task };
    new bootstrap.Modal(document.getElementById('supportModal')).show();
  }

  saveTask(): void {
    if (this.isEditing) {
      this.supportService.update(this.selectedTask).subscribe(() => this.loadTasks());
    } else {
      this.supportService.add(this.selectedTask).subscribe(() => this.loadTasks());
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('supportModal'));
    modal?.hide();
  }

  deleteTask(id?: number): void {
    if (id && confirm('Are you sure you want to delete this support task?')) {
      this.supportService.delete(id).subscribe(() => this.loadTasks());
    }
  }

  initTask(): SupportTask {
    return {
      taskType: '',
      clientName: '',
      propertyName: '',
      assignedTo: '',
      status: 'Pending',
      dueDate: '',
      notes: ''
    };
  }
}
