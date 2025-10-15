import { Component, OnInit } from '@angular/core';
 
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';
import { Payment } from '../modal/payment.model';
 

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];
  filterStatus = '';
  totalCollected = 0;
  totalPending = 0;

  constructor(private svc: PaymentService, private router: Router) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.svc.getAll().subscribe(res => {
      this.payments = res;
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    this.totalCollected = this.payments.reduce((sum, p) => sum + (p.paidAmount || 0), 0);
    this.totalPending = this.payments.reduce((sum, p) => sum + (p.pendingAmount || 0), 0);
  }

  openAdd(): void {
    this.router.navigate(['/crm/payments/add']);
  }

  edit(p: Payment): void {
    this.router.navigate(['/crm/payments/edit', p.id]);
  }

  delete(id?: number): void {
    if (id && confirm('Are you sure you want to delete this payment?')) {
      this.svc.delete(id).subscribe(() => this.loadPayments());
    }
  }

  sendReminder(p: Payment): void {
    const phone = p.clientPhone || '';
    const message = `Hello ${p.clientName}, your payment of ₹${p.pendingAmount} for ${p.propertyName} is pending. Kindly complete it before ${p.nextDueDate || 'due date'}.`;
    if (phone) window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }
}
