import { Component, OnInit } from '@angular/core';
import { SupportTask } from '@app/models/support.model';
import { SupportService } from '@app/services/support.service';
import { finalize } from 'rxjs/operators';

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
  isLoading = false;
  errorMessage = '';

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

  // 🔹 Fetch tasks from API
  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.supportService.getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (tasks) => (this.supportTasks = tasks),
        error: () => (this.errorMessage = '⚠️ Failed to load client support tasks.')
      });
  }

  // 🔹 Open Add Modal
  openAddModal(): void {
    this.isEditing = false;
    this.selectedTask = this.initTask();
    new bootstrap.Modal(document.getElementById('supportModal')).show();
  }

  // 🔹 Open Edit Modal
  openEditModal(task: SupportTask): void {
    this.isEditing = true;
    this.selectedTask = { ...task };
    new bootstrap.Modal(document.getElementById('supportModal')).show();
  }

  // 🔹 Save (Add / Update)
  saveTask(): void {
    const modalEl = document.getElementById('supportModal');
    const modal = bootstrap.Modal.getInstance(modalEl);

    const operation = this.isEditing
      ? this.supportService.update(this.selectedTask)
      : this.supportService.add(this.selectedTask);

    operation.subscribe({
      next: () => {
        this.showToast(this.isEditing ? '✅ Task updated successfully' : '🎯 Task added successfully');
        modal?.hide();
        this.loadTasks();
      },
      error: () => this.showToast('❌ Failed to save task. Try again.')
    });
  }

  // 🔹 Delete Task
  deleteTask(id?: number): void {
    if (id && confirm('Are you sure you want to delete this support task?')) {
      this.supportService.delete(id).subscribe({
        next: () => {
          this.showToast('🗑️ Task deleted successfully');
          this.loadTasks();
        },
        error: () => this.showToast('❌ Failed to delete task.')
      });
    }
  }

  // 🔹 Default Empty Object
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

  // 🔹 Bootstrap Toast Message
  showToast(message: string): void {
    const toastEl = document.getElementById('toastMessage');
    if (toastEl) {
      toastEl.querySelector('.toast-body')!.textContent = message;
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  }
}
