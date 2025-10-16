import { Component, OnInit } from '@angular/core';
import { AdminTask } from '@app/models/admin.model';
import { AdminService } from '@app/services/admin.service';
import { finalize } from 'rxjs/operators';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-internal',
  templateUrl: './admin-internal.component.html',
  styleUrls: ['./admin-internal.component.css']
})
export class AdminInternalComponent implements OnInit {
  adminTasks: AdminTask[] = [];
  selectedTask: AdminTask = this.initTask();
  searchText = '';
  isEditing = false;
  isLoading = false;
  errorMessage = '';

  taskTypes: string[] = [
    'Team Meeting / Briefing',
    'Report Submission',
    'CRM Data Update / Cleanup',
    'Training / Onboarding',
    'Office Maintenance / Supplies',
    'System Access Setup',
    'Inventory Management',
    'Compliance / Audit Task'
  ];

  departments: string[] = [
    'Sales', 'Marketing', 'Legal', 'Operations', 'Admin', 'Support', 'IT'
  ];

  priorities: string[] = ['Low', 'Medium', 'High'];
  statuses: string[] = ['Pending', 'In Progress', 'Completed'];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  /** 🔹 Load tasks from backend */
  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.adminService.getAll()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (tasks) => this.adminTasks = tasks,
        error: () => this.errorMessage = '⚠️ Failed to load admin tasks. Please try again later.'
      });
  }

  /** 🔹 Open Add Modal */
  openAddModal(): void {
    this.isEditing = false;
    this.selectedTask = this.initTask();
    new bootstrap.Modal(document.getElementById('adminModal')).show();
  }

  /** 🔹 Open Edit Modal */
  openEditModal(task: AdminTask): void {
    this.isEditing = true;
    this.selectedTask = { ...task };
    new bootstrap.Modal(document.getElementById('adminModal')).show();
  }

  /** 🔹 Save or Update */
  saveTask(): void {
    const modalEl = document.getElementById('adminModal');
    const modal = bootstrap.Modal.getInstance(modalEl);

    const operation = this.isEditing
      ? this.adminService.update(this.selectedTask)
      : this.adminService.add(this.selectedTask);

    operation.subscribe({
      next: () => {
        this.showToast(this.isEditing ? '✅ Task updated successfully!' : '🎯 New task added!');
        modal?.hide();
        this.loadTasks();
      },
      error: () => this.showToast('❌ Failed to save task. Please retry.')
    });
  }

  /** 🔹 Delete */
  deleteTask(id?: number): void {
    if (id && confirm('Are you sure you want to delete this task?')) {
      this.adminService.delete(id).subscribe({
        next: () => {
          this.showToast('🗑️ Task deleted successfully');
          this.loadTasks();
        },
        error: () => this.showToast('❌ Failed to delete task.')
      });
    }
  }

  /** 🔹 Default Empty Task */
  initTask(): AdminTask {
    return {
      taskType: '',
      department: '',
      assignedTo: '',
      priority: 'Medium',
      status: 'Pending',
      dueDate: '',
      notes: ''
    };
  }

  /** 🔹 Show Toast Message */
  showToast(message: string): void {
    const toastEl = document.getElementById('toastMessage');
    if (toastEl) {
      toastEl.querySelector('.toast-body')!.textContent = message;
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  }
}
