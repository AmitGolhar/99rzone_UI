import { Component, OnInit } from '@angular/core';
import { MarketingTask } from '@app/models/marketing.model';
import { MarketingService } from '@app/services/marketing.service';
 

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

  loadTasks(): void {
    this.marketingService.getAll().subscribe(tasks => this.marketingTasks = tasks);
  }

  openAddModal(): void {
    this.isEditing = false;
    this.selectedTask = this.initTask();
    new bootstrap.Modal(document.getElementById('marketingModal')).show();
  }

  openEditModal(task: MarketingTask): void {
    this.isEditing = true;
    this.selectedTask = { ...task };
    new bootstrap.Modal(document.getElementById('marketingModal')).show();
  }

  saveTask(): void {
    if (this.isEditing) {
      this.marketingService.update(this.selectedTask).subscribe(() => this.loadTasks());
    } else {
      this.marketingService.add(this.selectedTask).subscribe(() => this.loadTasks());
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('marketingModal'));
    modal?.hide();
  }

  deleteTask(id?: number): void {
    if (id && confirm('Are you sure you want to delete this marketing task?')) {
      this.marketingService.delete(id).subscribe(() => this.loadTasks());
    }
  }

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
}
