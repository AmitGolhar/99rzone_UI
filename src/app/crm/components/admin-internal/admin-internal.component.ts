import { Component, OnInit } from '@angular/core';
import { AdminTask } from '@app/models/admin.model';
import { AdminService } from '@app/services/admin.service';
 
 

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

  loadTasks(): void {
    this.adminService.getAll().subscribe(tasks => this.adminTasks = tasks);
  }

  openAddModal(): void {
    this.isEditing = false;
    this.selectedTask = this.initTask();
    new bootstrap.Modal(document.getElementById('adminModal')).show();
  }

  openEditModal(task: AdminTask): void {
    this.isEditing = true;
    this.selectedTask = { ...task };
    new bootstrap.Modal(document.getElementById('adminModal')).show();
  }

  saveTask(): void {
    if (this.isEditing) {
      this.adminService.update(this.selectedTask).subscribe(() => this.loadTasks());
    } else {
      this.adminService.add(this.selectedTask).subscribe(() => this.loadTasks());
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('adminModal'));
    modal?.hide();
  }

  deleteTask(id?: number): void {
    if (id && confirm('Are you sure you want to delete this task?')) {
      this.adminService.delete(id).subscribe(() => this.loadTasks());
    }
  }

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
}
