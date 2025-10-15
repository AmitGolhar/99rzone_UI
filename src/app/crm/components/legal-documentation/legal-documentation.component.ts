import { Component, OnInit } from '@angular/core';
import { LegalTask } from '@app/models/legal.model';
import { LegalService } from '@app/services/legal.service';
 
 
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

  loadTasks(): void {
    this.legalService.getAll().subscribe(tasks => this.legalTasks = tasks);
  }

  openAddModal(): void {
    this.isEditing = false;
    this.selectedTask = this.initTask();
    new bootstrap.Modal(document.getElementById('legalModal')).show();
  }

  openEditModal(task: LegalTask): void {
    this.isEditing = true;
    this.selectedTask = { ...task };
    new bootstrap.Modal(document.getElementById('legalModal')).show();
  }

  saveTask(): void {
    if (this.isEditing) {
      this.legalService.update(this.selectedTask).subscribe(() => this.loadTasks());
    } else {
      this.legalService.add(this.selectedTask).subscribe(() => this.loadTasks());
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('legalModal'));
    modal?.hide();
  }

  deleteTask(id?: number): void {
    if (id && confirm('Are you sure you want to delete this task?')) {
      this.legalService.delete(id).subscribe(() => this.loadTasks());
    }
  }

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
}
