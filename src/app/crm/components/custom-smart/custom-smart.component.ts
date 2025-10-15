import { Component, OnInit } from '@angular/core';
import { SmartTask } from '@app/models/smart.model';
import { SmartService } from '@app/services/smart.service';
 

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

  loadTasks(): void {
    this.smartService.getAll().subscribe(tasks => this.smartTasks = tasks);
  }

  openAddModal(): void {
    this.isEditing = false;
    this.selectedTask = this.initTask();
    new bootstrap.Modal(document.getElementById('smartModal')).show();
  }

  openEditModal(task: SmartTask): void {
    this.isEditing = true;
    this.selectedTask = { ...task };
    new bootstrap.Modal(document.getElementById('smartModal')).show();
  }

  saveTask(): void {
    if (this.isEditing) {
      this.smartService.update(this.selectedTask).subscribe(() => this.loadTasks());
    } else {
      this.smartService.add(this.selectedTask).subscribe(() => this.loadTasks());
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('smartModal'));
    modal?.hide();
  }

  deleteTask(id?: number): void {
    if (id && confirm('Are you sure you want to delete this automation task?')) {
      this.smartService.delete(id).subscribe(() => this.loadTasks());
    }
  }

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
}
