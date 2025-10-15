import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Payment } from './modal/payment.model';
 
@Injectable({ providedIn: 'root' })
export class PaymentService {
  private payments: Payment[] = [
  {
    id: 1,
    clientName: 'Rahul Khanna',
    clientPhone: '9876543210',
    propertyName: 'Skyline Residency',
    totalAmount: 1200000,
    paidAmount: 800000,
    pendingAmount: 400000,
    status: 'Partial',
    nextDueDate: '2025-10-25',
    paymentMode: 'Cheque',
    notes: 'Next installment pending'
  },
  {
    id: 2,
    clientName: 'Neha Sharma',
    clientPhone: '9823456789',
    propertyName: 'Ocean View',
    totalAmount: 950000,
    paidAmount: 950000,
    pendingAmount: 0,
    status: 'Paid',
    paymentMode: 'Bank Transfer',
    paymentDate: '2025-09-10',
    notes: 'Full payment received'
  },
  {
    id: 3,
    clientName: 'Amit Verma',
    clientPhone: '9812345670',
    propertyName: 'Green Valley Homes',
    totalAmount: 1500000,
    paidAmount: 500000,
    pendingAmount: 1000000,
    status: 'Partial',
    nextDueDate: '2025-11-15',
    paymentMode: 'UPI',
    notes: 'Customer requested installment delay'
  },
  {
    id: 4,
    clientName: 'Priya Mehta',
    clientPhone: '9876501234',
    propertyName: 'Lakeview Apartments',
    totalAmount: 2000000,
    paidAmount: 2000000,
    pendingAmount: 0,
    status: 'Paid',
    paymentMode: 'Bank Transfer',
    paymentDate: '2025-08-30',
    notes: 'Final payment cleared successfully'
  },
  {
    id: 5,
    clientName: 'Suresh Patel',
    clientPhone: '9898765432',
    propertyName: 'Royal Enclave',
    totalAmount: 1750000,
    paidAmount: 1000000,
    pendingAmount: 750000,
    status: 'Partial',
    nextDueDate: '2025-11-10',
    paymentMode: 'Cash',
    notes: 'Next due scheduled for November'
  },
  {
    id: 6,
    clientName: 'Anjali Nair',
    clientPhone: '9785612345',
    propertyName: 'Sunrise Heights',
    totalAmount: 1300000,
    paidAmount: 1300000,
    pendingAmount: 0,
    status: 'Paid',
    paymentMode: 'UPI',
    paymentDate: '2025-09-25',
    notes: 'Payment confirmed digitally'
  },
  {
    id: 7,
    clientName: 'Vikram Singh',
    clientPhone: '9756483210',
    propertyName: 'Elite Residency',
    totalAmount: 2200000,
    paidAmount: 1200000,
    pendingAmount: 1000000,
    status: 'Partial',
    nextDueDate: '2025-10-30',
    paymentMode: 'Cheque',
    notes: 'Second cheque to be cleared soon'
  },
  {
    id: 8,
    clientName: 'Sneha Deshmukh',
    clientPhone: '9887654321',
    propertyName: 'Pearl Tower',
    totalAmount: 1850000,
    paidAmount: 1850000,
    pendingAmount: 0,
    status: 'Paid',
    paymentMode: 'Cheque',
    paymentDate: '2025-09-20',
    notes: 'Project fully paid and closed'
  },
  {
    id: 9,
    clientName: 'Karan Gupta',
    clientPhone: '9890011223',
    propertyName: 'Harmony Residency',
    totalAmount: 1600000,
    paidAmount: 800000,
    pendingAmount: 800000,
    status: 'Partial',
    nextDueDate: '2025-11-05',
    paymentMode: 'UPI',
    notes: 'Half payment done, next due soon'
  },
  {
    id: 10,
    clientName: 'Ritu Jain',
    clientPhone: '9765432109',
    propertyName: 'Garden Estate',
    totalAmount: 2100000,
    paidAmount: 2100000,
    pendingAmount: 0,
    status: 'Paid',
    paymentMode: 'Bank Transfer',
    paymentDate: '2025-09-12',
    notes: 'Payment completed and receipt issued'
  }
];


  getAll(): Observable<Payment[]> {
    return of(this.payments);
  }

  add(payment: Payment): Observable<Payment> {
    payment.id = this.payments.length + 1;
    this.payments.push(payment);
    return of(payment);
  }

  update(payment: Payment): Observable<Payment> {
    const index = this.payments.findIndex(p => p.id === payment.id);
    if (index !== -1) this.payments[index] = payment;
    return of(payment);
  }

  delete(id: number): Observable<boolean> {
    this.payments = this.payments.filter(p => p.id !== id);
    return of(true);
  }
  
}
