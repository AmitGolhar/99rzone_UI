export interface AttendanceRecord {
  id: number;
  employee: string;
  date: string;         // yyyy-mm-dd
  checkIn?: string;     // time string (HH:mm)
  checkOut?: string;    // time string (HH:mm)
  visits?: number;
  tasksClosed?: number;
  totalHours?: string;
  status: 'Present' | 'Checked Out';
}
