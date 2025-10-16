import { Component, OnInit } from '@angular/core';
import { MagicBricksLead, MagicBricksLeadService } from '@app/services/magicbricks-lead.service';

@Component({
  selector: 'app-magicbricks-leads',
  templateUrl: './magicbricks-leads.component.html',
  styleUrls: ['./magicbricks-leads.component.css']
})
export class MagicBricksLeadsComponent implements OnInit {
  leads: MagicBricksLead[] = [];
  count = 0;
  loading = false;

  constructor(private svc: MagicBricksLeadService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: (res) => {
        this.leads = res;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });

    this.svc.getCount().subscribe({
      next: (res) => (this.count = res.count)
    });
  }
}
