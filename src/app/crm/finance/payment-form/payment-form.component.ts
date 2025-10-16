import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../payment.service';
import { Payment } from '../modal/payment.model';
import { finalize } from 'rxjs/operators';

declare var bootstrap: any;

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  payment: Payment = {
    clientName: '',
    propertyName: '',
    totalAmount: 0,
    paidAmount: 0,
    pendingAmount: 0,
    status: 'Pending',
    paymentMode: 'Cash'
  };

  isEditMode = false;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private svc: PaymentService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.loadPayment(+idParam);
    }
  }

  loadPayment(id: number): void {
    this.loading = true;
    this.svc
      .getAll()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (payments) => {
          const found = payments.find((p) => p.id === id);
          if (found) {
            this.payment = { ...found };
          } else {
            this.showToast('❌ Payment not found');
            this.router.navigate(['/crm/payments']);
          }
        },
        error: (err) => {
          console.error('Error loading payment:', err);
          this.showToast('⚠️ Failed to load payment details');
          this.router.navigate(['/crm/payments']);
        }
      });
  }

  calculatePending(): void {
    this.payment.pendingAmount =
      (this.payment.totalAmount || 0) - (this.payment.paidAmount || 0);

    if (this.payment.paidAmount === 0)
      this.payment.status = 'Pending';
    else if (this.payment.paidAmount < this.payment.totalAmount)
      this.payment.status = 'Partial';
    else this.payment.status = 'Paid';
  }

  save(): void {
    if (!this.payment.clientName || !this.payment.totalAmount) {
      this.showToast('⚠️ Please fill all required fields');
      return;
    }

    this.loading = true;
    const action = this.isEditMode
      ? this.svc.update(this.payment)
      : this.svc.add(this.payment);

    action.pipe(finalize(() => (this.loading = false))).subscribe({
      next: () => {
        this.showToast(
          this.isEditMode
            ? '✅ Payment updated successfully'
            : '💰 Payment added successfully'
        );
        setTimeout(() => this.router.navigate(['/crm/payments']), 1000);
      },
      error: (err) => {
        console.error('Error saving payment:', err);
        this.showToast('❌ Failed to save payment');
      }
    });
  }

  // 🔹 Toast message utility
  showToast(message: string): void {
    const toastEl = document.getElementById('toastMessage');
    if (toastEl) {
      toastEl.querySelector('.toast-body')!.textContent = message;
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  }
}
