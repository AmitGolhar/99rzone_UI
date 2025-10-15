import { Component, OnInit } from '@angular/core';
import { PropertyTask } from '@app/models/property.model copy';
import { PropertyService } from '@app/services/property.service';
 

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

  loadTasks(): void {
    this.propertyService.getAll().subscribe(tasks => this.propertyTasks = tasks);
  }

  openAddModal(): void {
    this.isEditing = false;
    this.selectedTask = this.initTask();
    new bootstrap.Modal(document.getElementById('propertyModal')).show();
  }

  openEditModal(task: PropertyTask): void {
    this.isEditing = true;
    this.selectedTask = { ...task };
    new bootstrap.Modal(document.getElementById('propertyModal')).show();
  }

  saveTask(): void {
    if (this.isEditing) {
      this.propertyService.update(this.selectedTask).subscribe(() => this.loadTasks());
    } else {
      this.propertyService.add(this.selectedTask).subscribe(() => this.loadTasks());
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('propertyModal'));
    modal?.hide();
  }

  deleteTask(id?: number): void {
    if (id && confirm('Delete this task?')) {
      this.propertyService.delete(id).subscribe(() => this.loadTasks());
    }
  }

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
}
