import { Component, OnInit } from '@angular/core';
import { NinetyNineAcresLead, NinetyNineAcresLeadService } from '@app/services/ninety-nine-acres-lead.service';

@Component({
  selector: 'app-ninety-nine-acres-lead',
  templateUrl: './ninety-nine-acres-lead.component.html',
  styleUrls: ['./ninety-nine-acres-lead.component.css']
})
export class NinetyNineAcresLeadComponent implements OnInit {
  leads: NinetyNineAcresLead[] = [];
  count = 0;
  selectedLead?: NinetyNineAcresLead | null;

  constructor(private svc: NinetyNineAcresLeadService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Fetch count
    this.svc.getCount().subscribe(res => this.count = res.count);
    // Fetch leads live
    this.svc.getLiveLeads().subscribe(data => this.leads = data);
  }

  viewLead(lead: NinetyNineAcresLead) {
    this.selectedLead = lead;
    const modalEl = document.getElementById('leadModal');
    (window as any).bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }

  closeModal() {
    this.selectedLead = null;
    const modalEl = document.getElementById('leadModal');
    (window as any).bootstrap.Modal.getOrCreateInstance(modalEl).hide();
  }
}
