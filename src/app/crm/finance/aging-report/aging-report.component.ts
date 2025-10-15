import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../services/finance.service';
 

@Component({
  selector: 'app-aging-report',
  templateUrl: './aging-report.component.html',
  styleUrls: ['./aging-report.component.css']
})
export class AgingReportComponent implements OnInit {
  buckets: { label: string; count: number; total: number }[] = [];

  constructor(private svc: FinanceService) {}

  ngOnInit(): void {
    this.svc.getAgingBuckets().subscribe(b => this.buckets = b);
  }
}
