import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../services/finance.service';
 

@Component({
  selector: 'app-incentive',
  templateUrl: './incentive.component.html',
  styleUrls: ['./incentive.component.css']
})
export class IncentiveComponent implements OnInit {
  incentives: any[] = [];
  model = { employee: '', dealId: '', amount: 0, commissionPct: 0 };

  constructor(private svc: FinanceService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.svc.getIncentives().subscribe(i => this.incentives = i);
  }

  openAddModal(modalId: string): void {
    const el = document.getElementById(modalId);
    (window as any).bootstrap.Modal.getOrCreateInstance(el).show();
  }

  add(): void {
    const payout = Math.round(this.model.amount * (this.model.commissionPct / 100));
    this.svc.addIncentive({ employee: this.model.employee, dealId: this.model.dealId, amount: this.model.amount, commissionPct: this.model.commissionPct, computedPayout: payout, status: 'Pending' })
      .subscribe(() => {
        this.model = { employee: '', dealId: '', amount: 0, commissionPct: 0 };
        (window as any).bootstrap.Modal.getOrCreateInstance(document.getElementById('incentiveModal')).hide();
        this.load();
      });
  }
}
