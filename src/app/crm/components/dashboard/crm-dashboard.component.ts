import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AggregatedStat, MiniTask, Performer, DashboardService } from '@app/services/dashboard.service';
import { CrmStatsService } from '@app/services/crm-stats.service';
 
declare var window: any;

@Component({
  selector: 'app-crm-dashboard',
  templateUrl: './crm-dashboard.component.html',
  styleUrls: ['./crm-dashboard.component.css']
})
export class CrmDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  totals: AggregatedStat[] = [];
  statusLabels: string[] = [];
  statusCounts: number[] = [];
  moduleLabels: string[] = [];
  moduleCounts: number[] = [];
  moduleColors: string[] = [];

  upcomingTasks: MiniTask[] = [];
  overdueTasks: MiniTask[] = [];
  performers: Performer[] = [];

  // NEW metrics
  financeStats = {
    collectionTarget: 10000000,
    collectionActual: 8700000,
    occupancyRate: 86,
    pendingPayments: 250000,
    collectedPayments: 8450000,
    activeLeads: 74,
    dormantLeads: 26,
    totalIncentive: 175000,
    totalExpense: 82000,
    pendingFollowups: 9,
    completedFollowups: 34,
    attendancePercent: 93,
    monthlyRevenue: [2200000, 1800000, 2400000, 2100000],
    monthlyTarget: [2500000, 2000000, 2500000, 2300000]
  };

  lastUpdated = new Date();
  loading = false;
  currentUser = { name: 'Amit Golhar', role: 'ADMIN' }; // mock

  private subs: Subscription[] = [];
  private barChartRef: any;
  private pieChartRef: any;

  // new charts
  private collectionChartRef: any;
  private paymentsChartRef: any;
  private leadsChartRef: any;
  private occupancyChartRef: any;
  private revenueChartRef: any;
  private employeeChartRef: any;
  private expenseChartRef: any;

    stats: AggregatedStat[] = [];


  constructor(private router: Router, private svc: DashboardService, private crmStatsService: CrmStatsService) {}

  ngOnInit(): void {
    this.refreshAll();
    this.crmStatsService.getAll().subscribe(res => (this.stats = res));
  }

  ngAfterViewInit(): void {
    // build charts after data fetched
    setTimeout(() => {
      this.buildCollectionChart();
      this.buildPaymentsChart();
      this.buildLeadsChart();
      this.buildOccupancyChart();
      this.buildRevenueChart();
      this.buildEmployeePerformanceChart();
      this.buildExpenseChart();
    }, 300);
  }

  refreshAll(): void {
    this.loading = true;
    this.lastUpdated = new Date();

    // existing logic
    this.subs.push(this.svc.getTotals().subscribe(t => {
      this.totals = t;
      this.moduleLabels = t.map(x => x.title);
      this.moduleCounts = t.map(x => x.count);
      this.moduleColors = t.map(x => x.color);
      this.buildPieChart();
    }));

    this.subs.push(this.svc.getStatusCounts().subscribe(s => {
      this.statusLabels = s.labels;
      this.statusCounts = s.counts;
      this.buildBarChart();
    }));

    this.subs.push(this.svc.getUpcomingTasks(5).subscribe(u => this.upcomingTasks = u));
    this.subs.push(this.svc.getOverdueTasks(5).subscribe(o => this.overdueTasks = o));
    this.subs.push(this.svc.getTopPerformers(5).subscribe(p => this.performers = p));

    setTimeout(() => { this.loading = false; this.lastUpdated = new Date(); }, 400);
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  // EXISTING CHARTS
  buildBarChart(): void {
    if (this.barChartRef) this.barChartRef.destroy();
    const ctx = document.getElementById('barChartV2') as HTMLCanvasElement;
    if (!ctx) return;

    this.barChartRef = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.statusLabels,
        datasets: [{
          label: 'Tasks',
          data: this.statusCounts,
          backgroundColor: ['#ffc107', '#17a2b8', '#28a745', '#6f42c1'],
          borderRadius: 6
        }]
      },
      options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });
  }

  buildPieChart(): void {
    if (this.pieChartRef) this.pieChartRef.destroy();
    const ctx = document.getElementById('pieChartV2') as HTMLCanvasElement;
    if (!ctx) return;

    this.pieChartRef = new Chart(ctx, {
      type: 'doughnut',
      data: { labels: this.moduleLabels, datasets: [{ data: this.moduleCounts, backgroundColor: this.moduleColors, borderWidth: 1 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } } } }
    });
  }

  // 🔥 NEW FINANCE + CRM CHARTS BELOW

  private buildCollectionChart(): void {
    if (this.collectionChartRef) this.collectionChartRef.destroy();
    const ctx = document.getElementById('collectionChart') as HTMLCanvasElement;
    if (!ctx) return;
    this.collectionChartRef = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          { label: 'Collected', data: [12, 18, 15, 19], backgroundColor: '#28a745' },
          { label: 'Target', data: [15, 20, 18, 20], backgroundColor: '#007bff' }
        ]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });
  }

  private buildPaymentsChart(): void {
    if (this.paymentsChartRef) this.paymentsChartRef.destroy();
    const ctx = document.getElementById('paymentsChart') as HTMLCanvasElement;
    if (!ctx) return;
    this.paymentsChartRef = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Collected', 'Pending'],
        datasets: [{
          data: [this.financeStats.collectedPayments, this.financeStats.pendingPayments],
          backgroundColor: ['#198754', '#dc3545']
        }]
      },
      options: { plugins: { legend: { position: 'bottom' } } }
    });
  }

  private buildLeadsChart(): void {
    if (this.leadsChartRef) this.leadsChartRef.destroy();
    const ctx = document.getElementById('leadsChart') as HTMLCanvasElement;
    if (!ctx) return;
    this.leadsChartRef = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Active Leads', 'Dormant Leads'],
        datasets: [{
          data: [this.financeStats.activeLeads, this.financeStats.dormantLeads],
          backgroundColor: ['#0dcaf0', '#6c757d']
        }]
      },
      options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });
  }

  private buildOccupancyChart(): void {
    if (this.occupancyChartRef) this.occupancyChartRef.destroy();
    const ctx = document.getElementById('occupancyChart') as HTMLCanvasElement;
    if (!ctx) return;
    const vacant = 100 - this.financeStats.occupancyRate;
    this.occupancyChartRef = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Occupied', 'Vacant'],
        datasets: [{ data: [this.financeStats.occupancyRate, vacant], backgroundColor: ['#20c997', '#dee2e6'] }]
      },
      options: { plugins: { legend: { position: 'bottom' } } }
    });
  }

  private buildRevenueChart(): void {
    if (this.revenueChartRef) this.revenueChartRef.destroy();
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
    if (!ctx) return;
    this.revenueChartRef = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [
          { label: 'Collected', data: this.financeStats.monthlyRevenue, borderColor: '#198754', fill: true },
          { label: 'Target', data: this.financeStats.monthlyTarget, borderColor: '#0d6efd', borderDash: [5, 5], fill: false }
        ]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });
  }

  private buildEmployeePerformanceChart(): void {
    if (this.employeeChartRef) this.employeeChartRef.destroy();
    const ctx = document.getElementById('employeeChart') as HTMLCanvasElement;
    if (!ctx) return;
    this.employeeChartRef = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Neha', 'Ravi', 'Amit', 'Pooja', 'Sanjay'],
        datasets: [
          { label: 'Visits', data: [10, 8, 5, 6, 7], backgroundColor: '#ffc107' },
          { label: 'Tasks Closed', data: [12, 9, 6, 5, 8], backgroundColor: '#0d6efd' }
        ]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });
  }

  private buildExpenseChart(): void {
    if (this.expenseChartRef) this.expenseChartRef.destroy();
    const ctx = document.getElementById('expenseChart') as HTMLCanvasElement;
    if (!ctx) return;
    this.expenseChartRef = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{ label: 'Expenses', data: [50000, 65000, 72000, 82000], borderColor: '#dc3545', fill: false }]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });
  }

  // helper
  isAdmin(): boolean {
    return this.currentUser.role === 'ADMIN';
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
    [this.barChartRef, this.pieChartRef, this.collectionChartRef, this.paymentsChartRef,
     this.leadsChartRef, this.occupancyChartRef, this.revenueChartRef,
     this.employeeChartRef, this.expenseChartRef].forEach(ch => ch?.destroy());
  }
}
