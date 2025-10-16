import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';
import { Payment } from '../modal/payment.model';
import { finalize } from 'rxjs/operators';

declare var bootstrap: any;

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
  loading = false;
  error = '';

  constructor(private svc: PaymentService, private router: Router) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading = true;
    this.error = '';
    this.svc.getAll()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.payments = Array.isArray(res) ? res : [];
          this.calculateTotals();
          this.showToast('✅ Payments loaded successfully!');
        },
        error: (err) => {
          console.error('Failed to load payments', err);
          this.error = 'Failed to load payments. Please try again later.';
          this.showToast('❌ Error loading payments');
        }
      });
  }

  calculateTotals(): void {
    this.totalCollected = this.payments.reduce((sum, p) => sum + (p.paidAmount || 0), 0);
    this.totalPending = this.payments.reduce((sum, p) => sum + (p.pendingAmount || 0), 0);
  }

  get filteredPayments(): Payment[] {
    if (!this.filterStatus) return this.payments;
    return this.payments.filter(p => (p.status || '').toLowerCase() === this.filterStatus.toLowerCase());
  }

  openAdd(): void {
    this.router.navigate(['/crm/payments/add']);
  }

  edit(p: Payment): void {
    if (!p || !p.id) return;
    this.router.navigate(['/crm/payments/edit', p.id]);
  }

  delete(id?: number): void {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this payment?')) return;

    this.svc.delete(id).subscribe({
      next: () => {
        this.loadPayments();
        this.showToast('🗑️ Payment deleted successfully');
      },
      error: (err) => {
        console.error('Delete failed', err);
        this.showToast('❌ Failed to delete the payment');
      }
    });
  }

  sendReminder(p: Payment): void {
    if (!p) return;
    const raw = p.clientPhone || '';
    const phone = raw.replace(/\D/g, '');
    const pending = p.pendingAmount ?? 0;
    const nextDue = p.nextDueDate || 'due date';
    const message = `Hello ${p.clientName}, your payment of ₹${pending} for ${p.propertyName || ''} is pending. Kindly complete it before ${nextDue}.`;
    if (!phone) {
      this.showToast('⚠️ Client phone number not available');
      return;
    }
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    this.showToast('📩 Reminder sent via WhatsApp');
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

  // convenience for template formatting
  formatAmount(n?: number): string {
    if (n == null) return '₹0';
    return '₹' + n.toLocaleString('en-IN');
  }
}
