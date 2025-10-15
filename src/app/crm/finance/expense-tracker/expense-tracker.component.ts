import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../services/finance.service';
 

@Component({
  selector: 'app-expense-tracker',
  templateUrl: './expense-tracker.component.html',
  styleUrls: ['./expense-tracker.component.css']
})
export class ExpenseTrackerComponent implements OnInit {
  expenses: any[] = [];
  model = { type: '', description: '', amount: 0, date: '' };

  constructor(private svc: FinanceService) {}

  ngOnInit(): void { this.load(); }

  load(): void { this.svc.getExpenses().subscribe(e => this.expenses = e); }

  openAddModal(): void { (window as any).bootstrap.Modal.getOrCreateInstance(document.getElementById('expenseModal')).show(); }

  add(): void {
    if (!this.model.date) this.model.date = new Date().toISOString().slice(0, 10);
    this.svc.addExpense({ ...this.model }).subscribe(() => {
      (window as any).bootstrap.Modal.getOrCreateInstance(document.getElementById('expenseModal')).hide();
      this.model = { type: '', description: '', amount: 0, date: '' };
      this.load();
    });
  }
}
