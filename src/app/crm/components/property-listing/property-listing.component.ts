import { Component, OnInit } from '@angular/core';
import { PropertyTask } from '@app/models/property.model copy';
import { PropertyService } from '@app/services/property.service';
import { finalize } from 'rxjs/operators';

declare var bootstrap: any;

@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.css']
})
export class PropertyListingComponent implements OnInit {
  propertyTasks: PropertyTask[] = [];
  selectedTask: PropertyTask = this.initTask();
  searchText = '';
  isEditing = false;
  isLoading = false;
  errorMessage = '';

  taskTypes: string[] = [
    'Property Onboarding',
    'Property Photo Upload',
    'Property Verification',
    'Maintenance / Repairs',
    'Under Construction Updates',
    'Price / Rent Update',
    'Inventory Check'
  ];

  statuses: string[] = ['Pending', 'In Progress', 'Completed'];

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  /** 🔹 Load All Property Tasks */
  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.propertyService
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (tasks) => (this.propertyTasks = tasks || []),
        error: (err) => {
          console.error('❌ Failed to load property tasks:', err);
          this.errorMessage = 'Failed to load property data. Please try again later.';
        }
      });
  }

  /** 🔹 Open Add Modal */
  openAddModal(): void {
    this.isEditing = false;
    this.selectedTask = this.initTask();
    const modalEl = document.getElementById('propertyModal');
    if (modalEl) new bootstrap.Modal(modalEl).show();
  }

  /** 🔹 Open Edit Modal */
  openEditModal(task: PropertyTask): void {
    this.isEditing = true;
    this.selectedTask = { ...task };
    const modalEl = document.getElementById('propertyModal');
    if (modalEl) new bootstrap.Modal(modalEl).show();
  }

  /** 🔹 Save or Update Task */
  saveTask(): void {
    if (!this.selectedTask.propertyName?.trim() || !this.selectedTask.taskType) {
      alert('Please fill all mandatory fields before saving.');
      return;
    }

    this.isLoading = true;
    const request$ = this.isEditing
      ? this.propertyService.update(this.selectedTask)
      : this.propertyService.add(this.selectedTask);

    request$
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.loadTasks();
          this.closeModal();
        },
        error: (err) => {
          console.error('❌ Save/Update failed:', err);
          alert('Error saving property task. Please try again.');
        }
      });
  }

  /** 🔹 Delete a Task */
  deleteTask(id?: number): void {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this task?')) return;

    this.isLoading = true;
    this.propertyService
      .delete(id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => this.loadTasks(),
        error: (err) => {
          console.error('❌ Delete failed:', err);
          alert('Failed to delete the task.');
        }
      });
  }

  /** 🔹 Initialize New Task */
  initTask(): PropertyTask {
    return {
      taskType: '',
      propertyName: '',
      propertyCode: '',
      location: '',
      assignedTo: '',
      status: 'Pending',
      dueDate: '',
      notes: ''
    };
  }

  /** 🔹 Close Modal */
  private closeModal(): void {
    const modalEl = document.getElementById('propertyModal');
    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();
    }
  }
}
