export interface AttendanceRecord {
  id: number;
  employee: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  visits?: number;
  tasksClosed?: number;
  totalHours?: string;
  status: 'Present' | 'Checked Out';
}
