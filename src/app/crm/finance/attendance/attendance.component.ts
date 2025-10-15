import { Component, OnInit } from '@angular/core';
import { AttendanceRecord } from '../modal/attendance.model';
import { FinanceService } from '../services/finance.service';
 

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  employeeName = 'Amit Golhar'; // Logged-in user mock
  records: AttendanceRecord[] = [];
  todayRecord?: AttendanceRecord;
  visits = 0;
  tasks = 0;
  isCheckedIn = false;

  constructor(private svc: FinanceService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.svc.getAttendance().subscribe(r => {
      this.records = r.sort((a, b) => b.id - a.id);
      this.todayRecord = this.records.find(rec => rec.employee === this.employeeName && rec.date === new Date().toISOString().slice(0, 10));
      this.isCheckedIn = !!(this.todayRecord && !this.todayRecord.checkOut);
      if (this.todayRecord) {
        this.visits = this.todayRecord.visits || 0;
        this.tasks = this.todayRecord.tasksClosed || 0;
      }
    });
  }

  checkIn(): void {
    this.svc.checkIn(this.employeeName).subscribe(() => this.load());
  }

  checkOut(): void {
    this.svc.updateVisits(this.employeeName, this.visits, this.tasks).subscribe(() => {
      this.svc.checkOut(this.employeeName).subscribe(() => this.load());
    });
  }

  updateMetrics(): void {
    if (this.isCheckedIn) {
      this.svc.updateVisits(this.employeeName, this.visits, this.tasks).subscribe();
    }
  }
}
