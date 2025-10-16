import { Component, OnInit } from '@angular/core';
import { SmartTask } from '@app/models/smart.model';
import { SmartService } from '@app/services/smart.service';
import { finalize } from 'rxjs/operators';

declare var bootstrap: any;

@Component({
  selector: 'app-custom-smart',
  templateUrl: './custom-smart.component.html',
  styleUrls: ['./custom-smart.component.css']
})
export class CustomSmartComponent implements OnInit {
  smartTasks: SmartTask[] = [];
  selectedTask: SmartTask = this.initTask();
  searchText = '';
  isEditing = false;
  isLoading = false;
  errorMessage = '';

  taskTypes: string[] = [
    'SLA Breach Alert',
    'Auto Lead Assignment',
    'Re-Engage Dormant Lead',
    'Smart Task Suggestion',
    'Follow-Up Reminder',
    'Auto Task Creation',
    'System Sync Alert',
    'AI Lead Prioritization'
  ];

  triggerSources: string[] = [
    'Lead API Webhook',
    'Property Update',
    'User Inactivity',
    'Manual Override',
    'CRM Scheduler',
    'External Integration'
  ];

  automationTypes: string[] = [
    'System Alert',
    'Auto Assignment',
    'Auto Reminder',
    'Recommendation',
    'Status Update'
  ];

  statuses: string[] = ['Pending', 'Triggered', 'Executed', 'Resolved'];

  constructor(private smartService: SmartService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  /** 🔹 Load Smart Automation Tasks */
  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.smartService.getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (tasks) => (this.smartTasks = tasks),
        error: () =>
          (this.errorMessage =
            '⚠️ Failed to load smart automation tasks. Please try again later.')
      });
  }

  /** 🔹 Open Add Modal */
  openAddModal(): void {
    this.isEditing = false;
    this.selectedTask = this.initTask();
    new bootstrap.Modal(document.getElementById('smartModal')).show();
  }

  /** 🔹 Open Edit Modal */
  openEditModal(task: SmartTask): void {
    this.isEditing = true;
    this.selectedTask = { ...task };
    new bootstrap.Modal(document.getElementById('smartModal')).show();
  }

  /** 🔹 Save or Update Automation Task */
  saveTask(): void {
    const modalEl = document.getElementById('smartModal');
    const modal = bootstrap.Modal.getInstance(modalEl);

    const operation = this.isEditing
      ? this.smartService.update(this.selectedTask)
      : this.smartService.add(this.selectedTask);

    operation.subscribe({
      next: () => {
        this.showToast(this.isEditing ? '✅ Task updated successfully!' : '🎯 New smart automation added!');
        modal?.hide();
        this.loadTasks();
      },
      error: () => this.showToast('❌ Failed to save task. Please retry.')
    });
  }

  /** 🔹 Delete Automation Task */
  deleteTask(id?: number): void {
    if (id && confirm('Are you sure you want to delete this automation task?')) {
      this.smartService.delete(id).subscribe({
        next: () => {
          this.showToast('🗑️ Automation task deleted successfully');
          this.loadTasks();
        },
        error: () => this.showToast('❌ Failed to delete automation task.')
      });
    }
  }

  /** 🔹 Default Empty Task Object */
  initTask(): SmartTask {
    return {
      taskType: '',
      triggerSource: '',
      automationType: '',
      assignedTo: '',
      status: 'Pending',
      dueDate: '',
      notes: ''
    };
  }

  /** 🔹 Show Toast Notification */
  showToast(message: string): void {
    const toastEl = document.getElementById('toastMessage');
    if (toastEl) {
      toastEl.querySelector('.toast-body')!.textContent = message;
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  }
}
