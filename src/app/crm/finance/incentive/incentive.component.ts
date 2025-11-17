import { Component, OnInit, OnDestroy } from '@angular/core';
import { IncentiveService, Incentive } from '../services/incentive.service';
import { EmployeeService } from '@app/services/employee.service';
import { Employee } from '@app/models/employee.model';
import { Subscription } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-incentive',
  templateUrl: './incentive.component.html',
  styleUrls: ['./incentive.component.css']
})
export class IncentiveComponent implements OnInit, OnDestroy {
  incentives: Incentive[] = [];
  employees: Employee[] = [];

  searchText = '';
  isLoading = false;
  errorMessage = '';

  model = { employee: '', dealId: '', amount: 0, commissionPct: 0 };
  private sub?: Subscription;

  constructor(
    private svc: IncentiveService,
    private empService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadIncentives();
  }

  /** 🔹 Load employees for dropdown */
  loadEmployees(): void {
    this.empService.getAllEmployees().subscribe({
      next: (res) => (this.employees = res),
      error: () => console.error('Error loading employees')
    });
  }

  /** 🔹 Load incentives */
  loadIncentives(): void {
    this.sub = this.svc.listen().subscribe(data => {
      this.incentives = data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    });

    this.svc.getAll().subscribe(data => {
      if (data?.length && !this.incentives.length) this.incentives = data;
    });
  }

  /** 🔹 Add incentive */
  add(): void {
    if (!this.model.employee || !this.model.dealId ||
        !this.model.amount || !this.model.commissionPct) {
      this.showToast('⚠️ Please fill all fields');
      return;
    }

    const payout = Math.round(this.model.amount * (this.model.commissionPct / 100));

    this.svc.add({
      employee: this.model.employee,
      dealId: this.model.dealId,
      amount: this.model.amount,
      commissionPct: this.model.commissionPct,
      computedPayout: payout,
      status: 'Pending'
    }).subscribe({
      next: () => {
        this.model = { employee: '', dealId: '', amount: 0, commissionPct: 0 };
        bootstrap.Modal.getInstance(document.getElementById('incentiveModal'))?.hide();
        this.showToast('✅ Incentive added successfully');
      },
      error: () => this.showToast('❌ Failed to add incentive')
    });
  }

  /** 🔹 Delete incentive */
  delete(id?: number): void {
    if (!id) return;
    if (confirm('Delete this incentive?')) {
      this.svc.delete(id).subscribe({
        next: () => this.showToast('🗑️ Incentive deleted'),
        error: () => this.showToast('❌ Delete failed')
      });
    }
  }

  /** 🔹 Open modal */
  openAddModal(id: string): void {
    bootstrap.Modal.getOrCreateInstance(document.getElementById(id)).show();
  }

  /** 🔹 Toast */
  showToast(msg: string): void {
    const toastEl = document.getElementById('toastMessage');
    if (toastEl) {
      toastEl.querySelector('.toast-body')!.textContent = msg;
      new bootstrap.Toast(toastEl).show();
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
