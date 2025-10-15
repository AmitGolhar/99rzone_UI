import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../services/finance.service';
 

@Component({
  selector: 'app-followup-automation',
  templateUrl: './followup-automation.component.html',
  styleUrls: ['./followup-automation.component.css']
})
export class FollowupAutomationComponent implements OnInit {
  candidates: any[] = [];
  createdTasks: any[] = [];

  constructor(private svc: FinanceService) {}

  ngOnInit(): void {
    this.svc.getAutomatedFollowups().subscribe(c => this.candidates = c);
  }

  createTasks(): void {
    this.candidates.forEach(c => {
      this.createdTasks.push({ ...c, createdAt: new Date().toISOString(), assignedTo: 'Auto-Assign' });
    });
    this.candidates = [];
    alert('Follow-up tasks auto-created (mock).');
  }
}
