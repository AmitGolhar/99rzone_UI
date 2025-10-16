import { Component, OnInit } from '@angular/core';
import { LegalTask } from '@app/models/legal.model';
import { LegalService } from '@app/services/legal.service';
import { finalize } from 'rxjs/operators';

declare var bootstrap: any;

@Component({
  selector: 'app-legal-documentation',
  templateUrl: './legal-documentation.component.html',
  styleUrls: ['./legal-documentation.component.css']
})
export class LegalDocumentationComponent implements OnInit {
  legalTasks: LegalTask[] = [];
  selectedTask: LegalTask = this.initTask();
  searchText = '';
  isEditing = false;
  isLoading = false;
  errorMessage = '';

  taskTypes: string[] = [
    'Agreement Preparation',
    'Document Verification',
    'Registration Coordination',
    'Invoice / Receipt Generation',
    'Payment Reconciliation',
    'Legal Clearance Check',
    'NOC / Builder Document Collection',
    'Stamp Duty & Tax Filing'
  ];

  statuses: string[] = ['Pending', 'In Progress', 'Completed'];

  constructor(private legalService: LegalService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // 🔹 Fetch tasks from backend
  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.legalService
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (tasks) => (this.legalTasks = tasks),
        error: () => (this.errorMessage = '⚠️ Failed to load legal tasks.')
      });
  }

  // 🔹 Open Add Modal
  openAddModal(): void {
    this.isEditing = false;
    this.selectedTask = this.initTask();
    new bootstrap.Modal(document.getElementById('legalModal')).show();
  }

  // 🔹 Open Edit Modal
  openEditModal(task: LegalTask): void {
    this.isEditing = true;
    this.selectedTask = { ...task };
    new bootstrap.Modal(document.getElementById('legalModal')).show();
  }

  // 🔹 Save (Create or Update)
  saveTask(): void {
    const modalEl = document.getElementById('legalModal');
    const modal = bootstrap.Modal.getInstance(modalEl);

    const operation = this.isEditing
      ? this.legalService.update(this.selectedTask)
      : this.legalService.add(this.selectedTask);

    operation.subscribe({
      next: () => {
        this.showToast(this.isEditing ? '✅ Task updated successfully' : '🎯 Task added successfully');
        modal?.hide();
        this.loadTasks();
      },
      error: () => this.showToast('❌ Failed to save task. Try again.')
    });
  }

  // 🔹 Delete task
  deleteTask(id?: number): void {
    if (id && confirm('Are you sure you want to delete this task?')) {
      this.legalService.delete(id).subscribe({
        next: () => {
          this.showToast('🗑️ Task deleted successfully');
          this.loadTasks();
        },
        error: () => this.showToast('❌ Failed to delete task.')
      });
    }
  }

  // 🔹 Default empty object
  initTask(): LegalTask {
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
