import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AttendanceRecord } from '../modal/attendance.model';

export interface Payment {
  id: number;
  clientName: string;
  clientPhone?: string;
  propertyName?: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  status: 'Pending' | 'Partial' | 'Paid';
  nextDueDate?: string; // ISO
  paymentDate?: string;
  notes?: string;
}

@Injectable({ providedIn: 'root' })
export class FinanceService {
  // mock payments
  private payments: Payment[] = [
    { id: 1, clientName: 'Rahul Khanna', clientPhone: '9876543210', propertyName: 'Skyline Residency', totalAmount: 1200000, paidAmount: 800000, pendingAmount: 400000, status: 'Partial', nextDueDate: '2025-10-25', notes: 'Next installment pending' },
    { id: 2, clientName: 'Neha Sharma', clientPhone: '9822012345', propertyName: 'Ocean View', totalAmount: 950000, paidAmount: 950000, pendingAmount: 0, status: 'Paid', paymentDate: '2025-09-10', notes: 'Full payment received' },
    { id: 3, clientName: 'Amit Golhar', clientPhone: '9988776655', propertyName: 'Green Meadows', totalAmount: 1500000, paidAmount: 0, pendingAmount: 1500000, status: 'Pending', nextDueDate: '2025-11-05', notes: '' }
  ];

  // mock revenue & agents
  private revenue = {
    monthly: [
      { month: 'Jul', collected: 1200000, target: 1500000 },
      { month: 'Aug', collected: 900000, target: 1400000 },
      { month: 'Sep', collected: 1600000, target: 1600000 },
      { month: 'Oct', collected: 700000, target: 1800000 } // partial month
    ],
    byAgent: [
      { agent: 'Neha Sharma', collected: 900000 },
      { agent: 'Ravi Deshmukh', collected: 700000 },
      { agent: 'Amit Golhar', collected: 400000 }
    ]
  };

 private attendance: AttendanceRecord[] = [
    { id: 1, employee: 'Neha Sharma', date: '2025-10-09', checkIn: '09:12', checkOut: '18:05', visits: 3, tasksClosed: 5, totalHours: '8h 53m', status: 'Checked Out' },
    { id: 2, employee: 'Ravi Deshmukh', date: '2025-10-09', checkIn: '09:05', checkOut: '17:50', visits: 2, tasksClosed: 3, totalHours: '8h 45m', status: 'Checked Out' }
  ];

  // incentives mock
  private incentives: any[] = [
    { id: 1, employee: 'Neha Sharma', dealId: 'BK101', amount: 50000, commissionPct: 2, computedPayout: 1000, status: 'Pending' }
  ];

  // expenses mock
  private expenses: any[] = [
    { id: 1, type: 'Ad Spend', description: 'Facebook Campaign', amount: 15000, date: '2025-10-01' }
  ];

  constructor() {}

  getAttendance(): Observable<AttendanceRecord[]> {
    return of([...this.attendance]);
  }

  checkIn(employee: string): Observable<AttendanceRecord> {
    const today = new Date().toISOString().slice(0, 10);
    const existing = this.attendance.find(a => a.employee === employee && a.date === today);
    if (existing) {
      return of(existing);
    }
    const now = new Date();
    const record: AttendanceRecord = {
      id: this.attendance.length ? Math.max(...this.attendance.map(a => a.id)) + 1 : 1,
      employee,
      date: today,
      checkIn: now.toTimeString().slice(0, 5),
      visits: 0,
      tasksClosed: 0,
      status: 'Present'
    };
    this.attendance.push(record);
    return of(record);
  }

  checkOut(employee: string): Observable<AttendanceRecord | null> {
    const today = new Date().toISOString().slice(0, 10);
    const record = this.attendance.find(a => a.employee === employee && a.date === today && !a.checkOut);
    if (!record) return of(null);

    const now = new Date();
    record.checkOut = now.toTimeString().slice(0, 5);
    record.status = 'Checked Out';
    record.totalHours = this.calculateDuration(record.checkIn!, record.checkOut);
    return of(record);
  }

  updateVisits(employee: string, visits: number, tasks: number): Observable<boolean> {
    const today = new Date().toISOString().slice(0, 10);
    const record = this.attendance.find(a => a.employee === employee && a.date === today);
    if (record) {
      record.visits = visits;
      record.tasksClosed = tasks;
    }
    return of(true);
  }

  private calculateDuration(checkIn: string, checkOut: string): string {
    const [h1, m1] = checkIn.split(':').map(Number);
    const [h2, m2] = checkOut.split(':').map(Number);
    const diff = (h2 * 60 + m2) - (h1 * 60 + m1);
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    return `${hours}h ${mins}m`;
  }

  /* Payments */
  getPayments(): Observable<Payment[]> { return of([...this.payments]); }
  getPaymentById(id: number): Observable<Payment | undefined> { return of(this.payments.find(p => p.id === id)); }
  addPayment(p: Payment): Observable<Payment> {
    p.id = this.payments.length ? Math.max(...this.payments.map(x => x.id)) + 1 : 1;
    this.payments.push(p);
    return of(p);
  }
  updatePayment(p: Payment): Observable<Payment> {
    const idx = this.payments.findIndex(x => x.id === p.id);
    if (idx !== -1) this.payments[idx] = p;
    return of(p);
  }
  deletePayment(id: number): Observable<boolean> {
    this.payments = this.payments.filter(x => x.id !== id);
    return of(true);
  }

  /* Aging buckets */
  getAgingBuckets(): Observable<{ label: string; count: number; total: number }[]> {
    const now = new Date();
    const buckets = [
      { label: '0-7 days', count: 0, total: 0 },
      { label: '8-30 days', count: 0, total: 0 },
      { label: '>30 days', count: 0, total: 0 }
    ];
    this.payments.forEach(p => {
      if (!p.nextDueDate) return;
      const d = new Date(p.nextDueDate);
      const diff = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      if (diff <= 7) { buckets[0].count++; buckets[0].total += p.pendingAmount; }
      else if (diff <= 30) { buckets[1].count++; buckets[1].total += p.pendingAmount; }
      else { buckets[2].count++; buckets[2].total += p.pendingAmount; }
    });
    return of(buckets);
  }

  /* Revenue */
  getRevenue(): Observable<any> { return of(this.revenue); }

 
  /* Follow-ups (2 days before due) */
  getAutomatedFollowups(): Observable<any[]> {
    const now = new Date();
    const out: any[] = [];
    this.payments.forEach(p => {
      if (!p.nextDueDate) return;
      const d = new Date(p.nextDueDate);
      const diff = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      if (diff === 2 && p.pendingAmount > 0) out.push({ paymentId: p.id, clientName: p.clientName, pendingAmount: p.pendingAmount, dueDate: p.nextDueDate });
    });
    return of(out);
  }

  /* Incentives */
  getIncentives(): Observable<any[]> { return of([...this.incentives]); }
  addIncentive(row: any): Observable<any> { row.id = this.incentives.length ? Math.max(...this.incentives.map(x => x.id)) + 1 : 1; this.incentives.push(row); return of(row); }

  /* Expenses */
  getExpenses(): Observable<any[]> { return of([...this.expenses]); }
  addExpense(e: any): Observable<any> { e.id = this.expenses.length ? Math.max(...this.expenses.map(x => x.id)) + 1 : 1; this.expenses.push(e); return of(e); }

  
}
