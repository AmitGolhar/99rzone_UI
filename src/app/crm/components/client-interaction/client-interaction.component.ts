import { Component, OnInit } from '@angular/core';
import { ClientTask } from '@app/models/client.model';
import { ClientService } from '@app/services/client.service';
import { finalize } from 'rxjs/operators';

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
  isLoading = false;
  errorMessage = '';
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

  // 🔹 Load all client tasks
  loadTasks(): void {
    this.isLoading = true;
    this.clientService.getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (tasks) => (this.clientTasks = tasks),
        error: () => (this.errorMessage = 'Failed to load client tasks.')
      });
  }

  // 🔹 Open modal for add
  openAddModal(): void {
    this.isEditing = false;
    this.selectedTask = this.initTask();
    new bootstrap.Modal(document.getElementById('clientModal')).show();
  }

  // 🔹 Open modal for edit
  openEditModal(task: ClientTask): void {
    this.isEditing = true;
    this.selectedTask = { ...task };
    new bootstrap.Modal(document.getElementById('clientModal')).show();
  }

  // 🔹 Save or Update
  saveTask(): void {
    const modalEl = document.getElementById('clientModal');
    const modal = bootstrap.Modal.getInstance(modalEl);

    const operation = this.isEditing
      ? this.clientService.update(this.selectedTask)
      : this.clientService.add(this.selectedTask);

    operation.subscribe({
      next: () => {
        this.showToast(
          this.isEditing ? 'Task updated successfully ✅' : 'Task added successfully 🎯'
        );
        modal?.hide();
        this.loadTasks();
      },
      error: () => this.showToast('❌ Failed to save task. Please try again.')
    });
  }

  // 🔹 Delete
  deleteTask(id?: number): void {
    if (id && confirm('Are you sure you want to delete this task?')) {
      this.clientService.delete(id).subscribe({
        next: () => {
          this.showToast('🗑️ Task deleted successfully');
          this.loadTasks();
        },
        error: () => this.showToast('❌ Failed to delete task.')
      });
    }
  }

  // 🔹 Initialize empty task
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

  // 🔹 Show bootstrap toast notification
  showToast(message: string): void {
    const toastEl = document.getElementById('toastMessage');
    if (toastEl) {
      toastEl.querySelector('.toast-body')!.textContent = message;
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  }
}
