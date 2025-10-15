import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../payment.service';
import { Payment } from '../modal/payment.model';


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
    status: 'Pending'
  };

  isEditMode = false;

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
    this.svc.getAll().subscribe(payments => {
      const found = payments.find(p => p.id === id);
      if (found) {
        this.payment = { ...found };
      } else {
        alert('Payment not found');
        this.router.navigate(['/crm/payments']);
      }
    });
  }

  calculatePending(): void {
    this.payment.pendingAmount = this.payment.totalAmount - this.payment.paidAmount;
    if (this.payment.paidAmount === 0) this.payment.status = 'Pending';
    else if (this.payment.paidAmount < this.payment.totalAmount) this.payment.status = 'Partial';
    else this.payment.status = 'Paid';
  }

  save(): void {
    if (this.isEditMode) {
      this.svc.update(this.payment).subscribe(() => {
        alert('Payment updated successfully!');
        this.router.navigate(['/crm/payments']);
      });
    } else {
      this.svc.add(this.payment).subscribe(() => {
        alert('Payment added successfully!');
        this.router.navigate(['/crm/payments']);
      });
    }
  }
}
