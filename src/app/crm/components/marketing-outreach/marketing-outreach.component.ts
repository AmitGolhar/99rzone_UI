import { Component, OnInit } from '@angular/core';
import { MarketingTask } from '@app/models/marketing.model';
import { MarketingService } from '@app/services/marketing.service';
import { finalize } from 'rxjs/operators';

declare var bootstrap: any;

@Component({
  selector: 'app-marketing-outreach',
  templateUrl: './marketing-outreach.component.html',
  styleUrls: ['./marketing-outreach.component.css']
})
export class MarketingOutreachComponent implements OnInit {
  marketingTasks: MarketingTask[] = [];
  selectedTask: MarketingTask = this.initTask();
  searchText = '';
  isEditing = false;
  isLoading = false;
  errorMessage = '';

  taskTypes: string[] = [
    'Campaign Follow-Up',
    'Social Media Post / Boost',
    'Lead Source Analysis',
    'Listing Promotion / Refresh',
    'Creative / Brochure Design',
    'Email / SMS Blast',
    'Ad Budget Optimization',
    'Performance Reporting'
  ];

  platforms: string[] = [
    'Facebook Ads',
    'Instagram Ads',
    'Google Ads',
    'LinkedIn',
    'YouTube',
    'Housing.com',
    '99acres',
    'Offline Event'
  ];

  statuses: string[] = ['Pending', 'In Progress', 'Completed'];

  constructor(private marketingService: MarketingService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // 🔹 Load tasks from API
  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.marketingService.getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (tasks) => (this.marketingTasks = tasks),
        error: () => (this.errorMessage = '⚠️ Failed to load marketing tasks.')
      });
  }

  // 🔹 Open modal for add
  openAddModal(): void {
    this.isEditing = false;
    this.selectedTask = this.initTask();
    new bootstrap.Modal(document.getElementById('marketingModal')).show();
  }

  // 🔹 Open modal for edit
  openEditModal(task: MarketingTask): void {
    this.isEditing = true;
    this.selectedTask = { ...task };
    new bootstrap.Modal(document.getElementById('marketingModal')).show();
  }

  // 🔹 Save (Add or Update)
  saveTask(): void {
    const modalEl = document.getElementById('marketingModal');
    const modal = bootstrap.Modal.getInstance(modalEl);

    const operation = this.isEditing
      ? this.marketingService.update(this.selectedTask)
      : this.marketingService.add(this.selectedTask);

    operation.subscribe({
      next: () => {
        this.showToast(this.isEditing ? '✅ Task updated successfully' : '🎯 Task added successfully');
        modal?.hide();
        this.loadTasks();
      },
      error: () => this.showToast('❌ Failed to save task. Try again.')
    });
  }

  // 🔹 Delete
  deleteTask(id?: number): void {
    if (id && confirm('Are you sure you want to delete this marketing task?')) {
      this.marketingService.delete(id).subscribe({
        next: () => {
          this.showToast('🗑️ Task deleted successfully');
          this.loadTasks();
        },
        error: () => this.showToast('❌ Failed to delete task.')
      });
    }
  }

  // 🔹 Initialize empty task
  initTask(): MarketingTask {
    return {
      taskType: '',
      campaignName: '',
      platform: '',
      assignedTo: '',
      status: 'Pending',
      dueDate: '',
      notes: ''
    };
  }

  // 🔹 Toast message
  showToast(message: string): void {
    const toastEl = document.getElementById('toastMessage');
    if (toastEl) {
      toastEl.querySelector('.toast-body')!.textContent = message;
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  }
}
