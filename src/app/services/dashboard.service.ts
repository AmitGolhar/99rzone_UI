// src/app/crm/dashboard/dashboard.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface AggregatedStat {
  title: string;
  count: number;
  route: string;
  color: string;
  icon: string;
}

export interface MiniTask {
  id: number;
  type: string;
  title: string;
  module: string;
  assignedTo: string;
  dueDate: string; // ISO date
  status: string;
}

export interface Performer {
  name: string;
  closed: number;
  avatarUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // Mock aggregated counts
  private totals: AggregatedStat[] = [
    { title: 'Lead Management', count: 42, route: '/crm/lead-management', color: '#007bff', icon: '📞' },
    { title: 'Property Management', count: 28, route: '/crm/property-listing', color: '#28a745', icon: '🏘️' },
    { title: 'Client Interaction', count: 35, route: '/crm/client-interaction', color: '#17a2b8', icon: '🤝' },
    { title: 'Marketing & Outreach', count: 15, route: '/crm/marketing-outreach', color: '#ffc107', icon: '📢' },
    { title: 'Legal & Documentation', count: 18, route: '/crm/legal-documentation', color: '#6f42c1', icon: '⚖️' },
    { title: 'Client Support', count: 22, route: '/crm/client-support', color: '#fd7e14', icon: '🛠️' },
    { title: 'Admin & Internal', count: 10, route: '/crm/admin-internal', color: '#20c997', icon: '🏢' },
    { title: 'Custom / Smart', count: 8, route: '/crm/custom-smart', color: '#dc3545', icon: '🤖' }
  ];

  // Mock tasks (mix of modules)
  private tasks: MiniTask[] = [
    { id: 1, type: 'Follow-Up', title: 'Call Rohan Mehta', module: 'Lead Management', assignedTo: 'Amit', dueDate: '2025-10-09', status: 'Pending' },
    { id: 2, type: 'Site Visit', title: 'Site Visit - Ocean View', module: 'Client Interaction', assignedTo: 'Neha', dueDate: '2025-10-12', status: 'Pending' },
    { id: 3, type: 'Photo Upload', title: 'Upload photos - Green Meadows', module: 'Property Management', assignedTo: 'Ravi', dueDate: '2025-10-11', status: 'In Progress' },
    { id: 4, type: 'Agreement', title: 'Draft agreement - Skyline', module: 'Legal & Documentation', assignedTo: 'Neha', dueDate: '2025-10-05', status: 'Pending' },
    { id: 5, type: 'Maintenance', title: 'Fix AC - Flat 203', module: 'Client Support', assignedTo: 'Support Team', dueDate: '2025-10-07', status: 'Pending' },
    { id: 6, type: 'Campaign', title: 'Boost Diwali Ad', module: 'Marketing & Outreach', assignedTo: 'Amit', dueDate: '2025-10-14', status: 'In Progress' },
    { id: 7, type: 'SLA', title: 'Unassigned lead >24h', module: 'Custom / Smart', assignedTo: 'Ravi', dueDate: '2025-10-10', status: 'Triggered' },
    { id: 8, type: 'Invoice', title: 'Generate receipt - Booking 123', module: 'Legal & Documentation', assignedTo: 'Neha', dueDate: '2025-10-17', status: 'Pending' }
  ];

  // Mock performers
  private performers: Performer[] = [
    { name: 'Neha Sharma', closed: 28 },
    { name: 'Ravi Deshmukh', closed: 24 },
    { name: 'Amit Golhar', closed: 21 },
    { name: 'Rahul Khanna', closed: 16 }
  ];

  // Mock status distribution
  private statusCounts = { Pending: 28, 'In Progress': 19, Completed: 56, Resolved: 12 };

  constructor() {}

  getTotals(): Observable<AggregatedStat[]> {
    return of(this.totals);
  }

  getStatusCounts(): Observable<{ labels: string[]; counts: number[] }> {
    const labels = Object.keys(this.statusCounts);
    const counts = Object.values(this.statusCounts);
    return of({ labels, counts });
  }

  getModuleDistribution(): Observable<{ labels: string[]; counts: number[]; colors: string[] }> {
    return of({
      labels: this.totals.map(t => t.title),
      counts: this.totals.map(t => t.count),
      colors: this.totals.map(t => t.color)
    });
  }

  getUpcomingTasks(limit = 5): Observable<MiniTask[]> {
    const now = new Date();
    const next7 = new Date(now);
    next7.setDate(now.getDate() + 7);
    const upcoming = this.tasks
      .filter(t => {
        const d = new Date(t.dueDate);
        return d >= now && d <= next7;
      })
      .sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate))
      .slice(0, limit);
    return of(upcoming);
  }

  getOverdueTasks(limit = 5): Observable<MiniTask[]> {
    const now = new Date();
    const overdue = this.tasks
      .filter(t => new Date(t.dueDate) < now)
      .sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate))
      .slice(0, limit);
    return of(overdue);
  }

  getTopPerformers(limit = 5): Observable<Performer[]> {
    return of(this.performers.slice(0, limit));
  }
}
