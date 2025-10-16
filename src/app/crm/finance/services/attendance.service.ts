import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@app/environment/environment';
import { AttendanceRecord } from '../modal/attendance.model';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private base = `${environment.apiUrl}/attendance`;
  private source: EventSource | null = null;

  constructor(private http: HttpClient, private zone: NgZone) {}

  /** 📡 Get all attendance records (snapshot) */
  getAttendance(): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>(this.base);
  }

  /** 🟢 Check-In */
  checkIn(employee: string): Observable<AttendanceRecord> {
    return this.http.post<AttendanceRecord>(`${this.base}/checkin/${employee}`, {});
  }

  /** 🟠 Update visits & tasks */
  updateVisits(employee: string, visits: number, tasks: number): Observable<AttendanceRecord> {
    return this.http.post<AttendanceRecord>(
      `${this.base}/update?employee=${employee}&visits=${visits}&tasks=${tasks}`, {}
    );
  }

  /** 🔴 Check-Out */
  checkOut(employee: string): Observable<AttendanceRecord> {
    return this.http.post<AttendanceRecord>(`${this.base}/checkout/${employee}`, {});
  }

  /** 🔁 Real-time updates via SSE */
  connectStream(): Observable<AttendanceRecord[]> {
    return new Observable<AttendanceRecord[]>(subscriber => {
      this.source = new EventSource(`${this.base}/stream`);
      this.source.addEventListener('attendance', (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          this.zone.run(() => subscriber.next(data));
        } catch (e) {}
      });
      this.source.onerror = err => console.error('SSE Error', err);
      return () => this.source?.close();
    });
  }
}
