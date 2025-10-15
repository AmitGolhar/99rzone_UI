import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
 
import { Chart } from 'chart.js/auto';
import { FinanceService } from '../services/finance.service';

@Component({
  selector: 'app-revenue-dashboard',
  templateUrl: './revenue-dashboard.component.html',
  styleUrls: ['./revenue-dashboard.component.css']
})
export class RevenueDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  monthly: any[] = [];
  byAgent: any[] = [];
  barChart: any;
  pieChart: any;

  constructor(private svc: FinanceService) {}

  ngOnInit(): void {
    this.svc.getRevenue().subscribe(r => {
      this.monthly = r.monthly;
      this.byAgent = r.byAgent;
      this.buildCharts();
    });
  }

  ngAfterViewInit(): void { /* charts built after data load */ }

  buildCharts(): void {
    // bar
    const ctx = document.getElementById('revBar') as HTMLCanvasElement;
    if (ctx) {
      if (this.barChart) this.barChart.destroy();
      this.barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.monthly.map(m => m.month),
          datasets: [
            { label: 'Collected', data: this.monthly.map(m => m.collected), backgroundColor: '#28a745' },
            { label: 'Target', data: this.monthly.map(m => m.target), backgroundColor: '#007bff' }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }

    // pie
    const ctx2 = document.getElementById('revPie') as HTMLCanvasElement;
    if (ctx2) {
      if (this.pieChart) this.pieChart.destroy();
      this.pieChart = new Chart(ctx2, {
        type: 'doughnut',
        data: { labels: this.byAgent.map(a => a.agent), datasets: [{ data: this.byAgent.map(a => a.collected) }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.barChart) this.barChart.destroy();
    if (this.pieChart) this.pieChart.destroy();
  }
}
