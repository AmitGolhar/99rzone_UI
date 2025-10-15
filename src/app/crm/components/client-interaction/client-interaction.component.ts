import { Component, OnInit } from '@angular/core';
import { ClientTask } from '@app/models/client.model';
import { ClientService } from '@app/services/client.service';
 

declare var bootstrap: any;

@Component({
  selector: 'app-client-interaction',
  templateUrl: './client-interaction.component.html',
  styleUrls: ['./client-interaction.component.css']
})
export class ClientInteractionComponent implements OnInit {
  clientTasks: ClientTask[] = [];
  selectedTask: ClientTask = this.initTask();
  isEditing = false;
  searchText = '';

  taskTypes: string[] = [
  'Site Visit Scheduling',
  'Site Visit Follow-Up',
  'Pickup & Drop Coordination',
  'Office Meeting / Consultation',
  'Document Collection',
  'Agreement Signing',
  'Payment Collection / Receipt',
  'Feedback / Testimonial Collection',
  'Property Handover / Key Delivery',
  'Post-Sale Support / Maintenance Request'
  ];

  statuses: string[] = ['Pending', 'In Progress', 'Completed'];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.clientService.getAll().subscribe(tasks => this.clientTasks = tasks);
  }

  openAddModal(): void {
    this.isEditing = false;
    this.selectedTask = this.initTask();
    new bootstrap.Modal(document.getElementById('clientModal')).show();
  }

  openEditModal(task: ClientTask): void {
    this.isEditing = true;
    this.selectedTask = { ...task };
    new bootstrap.Modal(document.getElementById('clientModal')).show();
  }

  saveTask(): void {
    if (this.isEditing) {
      this.clientService.update(this.selectedTask).subscribe(() => this.loadTasks());
    } else {
      this.clientService.add(this.selectedTask).subscribe(() => this.loadTasks());
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('clientModal'));
    modal?.hide();
  }

  deleteTask(id?: number): void {
    if (id && confirm('Are you sure you want to delete this task?')) {
      this.clientService.delete(id).subscribe(() => this.loadTasks());
    }
  }

  initTask(): ClientTask {
    return {
      taskType: '',
      clientName: '',
      contactNumber: '',
      propertyName: '',
      assignedTo: '',
      status: 'Pending',
      dueDate: '',
      notes: ''
    };
  }
}
