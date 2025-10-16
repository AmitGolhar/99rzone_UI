import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { FinanceService } from '../services/finance.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-revenue-dashboard',
  templateUrl: './revenue-dashboard.component.html',
  styleUrls: ['./revenue-dashboard.component.css']
})
export class RevenueDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  monthly: any[] = [];
  byAgent: any[] = [];
  barChart?: Chart;
  pieChart?: Chart;
  loading = true;
  refreshSub?: Subscription;

  constructor(private svc: FinanceService) {}

  ngOnInit(): void {
    // Subscribe to real-time data updates from FinanceService
    this.refreshSub = this.svc.getRevenue().subscribe({
      next: (data) => {
        this.monthly = data.monthly;
        this.byAgent = data.byAgent;
        this.loading = false;
        this.buildCharts();
      },
      error: (err) => {
        console.error('Error fetching revenue data:', err);
        this.loading = false;
      }
    });
  }

  ngAfterViewInit(): void {
    // handled after data load
  }

  buildCharts(): void {
    // Ensure DOM is ready
    setTimeout(() => {
      this.buildBarChart();
      this.buildPieChart();
    }, 0);
  }

  private buildBarChart(): void {
    const ctx = document.getElementById('revBar') as HTMLCanvasElement;
    if (!ctx) return;

    // Destroy existing chart if it exists
    if (this.barChart) this.barChart.destroy();

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: this.monthly.map(m => m.month),
        datasets: [
          {
            label: 'Collected',
            data: this.monthly.map(m => m.collected),
            backgroundColor: '#28a745'
          },
          {
            label: 'Target',
            data: this.monthly.map(m => m.target),
            backgroundColor: '#007bff'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { title: { display: true, text: 'Month' } },
          y: { title: { display: true, text: 'Revenue (₹)' } }
        },
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: (context) => `₹${context.formattedValue}`
            }
          }
        }
      }
    };

    this.barChart = new Chart(ctx, config);
  }

  private buildPieChart(): void {
    const ctx2 = document.getElementById('revPie') as HTMLCanvasElement;
    if (!ctx2) return;

    if (this.pieChart) this.pieChart.destroy();

    this.pieChart = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: this.byAgent.map(a => a.agent),
        datasets: [
          {
            data: this.byAgent.map(a => a.collected),
            backgroundColor: ['#007bff', '#28a745', '#ffc107', '#17a2b8', '#6f42c1']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                return `${label}: ₹${value.toLocaleString()}`;
              }
            }
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.barChart) this.barChart.destroy();
    if (this.pieChart) this.pieChart.destroy();
    this.refreshSub?.unsubscribe();
  }
}
