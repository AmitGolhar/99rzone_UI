import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExpenseService, Expense } from '../services/expense.service';
import { Subscription } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-expense-tracker',
  templateUrl: './expense-tracker.component.html',
  styleUrls: ['./expense-tracker.component.css']
})
export class ExpenseTrackerComponent implements OnInit, OnDestroy {
  expenses: Expense[] = [];
  model: Expense = { type: '', description: '', amount: 0, date: '' };
  private sub?: Subscription;

  constructor(private svc: ExpenseService) {}

  ngOnInit(): void {
    // ✅ Subscribe to real-time updates
    this.sub = this.svc.listen().subscribe(data => {
      this.expenses = data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    });

    // Fallback for initial load if SSE not yet connected
    this.svc.getAll().subscribe(data => {
      if (!this.expenses.length && data?.length) this.expenses = data;
    });
  }

  /** ➕ Add Expense */
  add(): void {
    if (!this.model.type || !this.model.amount) {
      this.showToast('⚠️ Please fill all required fields');
      return;
    }

    this.svc.add({ ...this.model }).subscribe({
      next: () => {
        bootstrap.Modal.getInstance(document.getElementById('expenseModal'))?.hide();
        this.model = { type: '', description: '', amount: 0, date: '' };
        this.showToast('✅ Expense added successfully');
      },
      error: () => this.showToast('❌ Failed to add expense')
    });
  }

  /** 🗑️ Delete expense */
  delete(id?: number): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this expense?')) {
      this.svc.delete(id).subscribe({
        next: () => this.showToast('🗑️ Expense deleted'),
        error: () => this.showToast('❌ Failed to delete expense')
      });
    }
  }

  /** 🎯 Open Add Modal */
  openAddModal(): void {
    bootstrap.Modal.getOrCreateInstance(document.getElementById('expenseModal')).show();
  }

  /** 🔔 Toast message */
  showToast(message: string): void {
    const toastEl = document.getElementById('toastMessage');
    if (toastEl) {
      toastEl.querySelector('.toast-body')!.textContent = message;
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
