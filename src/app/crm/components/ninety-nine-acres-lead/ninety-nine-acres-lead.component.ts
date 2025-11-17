import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '@app/environment/environment';
import { Lead99, Lead99Service } from '@app/services/lead99.service';
import { NinetyNineAcresLead, NinetyNineAcresLeadService } from '@app/services/ninety-nine-acres-lead.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ninety-nine-acres-lead',
  templateUrl: './ninety-nine-acres-lead.component.html',
  styleUrls: ['./ninety-nine-acres-lead.component.css']
})
export class NinetyNineAcresLeadComponent implements OnInit {
deleteLead(arg0: any) {
throw new Error('Method not implemented.');
}
 // leads: NinetyNineAcresLead[] = [];
  count = 0;
  selectedLead?: any | null;
 //leads: Lead99[] = [];
  isLoading = false;
  errorMessage = '';
   excelData: any[] = [];
  fileName: string = '';
  leads: any[] = [];

 
  private apiUrl = `${environment.apiUrl}/99acres-leads/bulk-upload`;
  
  isUploading = false;

   expectedColumns: string[] = [
    'Service Type',
    'Property Type',
    'Lead Date',
    'Lead Name',
    'Lead Phone Number',
    'Lead Email',
    'Seller Id',
    'Seller Name',
    'Locality',
    'City',
    'Configuration',
    'Price',
    'Building/Project Name',
    'Property/Project ID',
    'Address',
    'primary_lead_status',
    'secondary_lead_status',
  ];

  constructor(private svc: NinetyNineAcresLeadService,private lead99Service: Lead99Service,private http: HttpClient) {}

  ngOnInit(): void {
    //this.loadData();
     this.loadLeads();
  }

  loadData(): void {
    // Fetch count
    this.svc.getCount().subscribe(res => this.count = res.count);
    // Fetch leads live
    //this.svc.getLiveLeads().subscribe(data => this.leads = data);
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

  /** Fetch leads from backend */
  loadLeads(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.lead99Service.getAllLeads().subscribe({
      next: (data) => {
        this.leads = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch leads:', err);
        this.errorMessage = 'Unable to load leads. Please try again later.';
        this.isLoading = false;
      }
    });
  }
  onFileChange(event: any): void {
    const target: DataTransfer = <DataTransfer>event.target;

    if (target.files.length !== 1) {
      alert('Please upload a single Excel file at a time.');
      return;
    }

    const file = target.files[0];
    this.fileName = file.name;

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = workbook.SheetNames[0];
      const ws = workbook.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { defval: '' }) as any[];

      // Optional: Validate columns
      const firstRowKeys = Object.keys(data[0]);
      const missing = this.expectedColumns.filter(
        (c) => !firstRowKeys.includes(c)
      );
      if (missing.length > 0) {
        alert('Missing columns: ' + missing.join(', '));
        return;
      }

      this.excelData = data;
      console.log('Parsed JSON:', this.excelData);
      this.uploadLeads();
    };

    reader.readAsBinaryString(file);
  }

  uploadLeads(): void {
    console.log('Parsed JSON:', this.excelData);
    this.isUploading = true;

    this.http.post(this.apiUrl, this.excelData).subscribe({
      next: (res) => {
        alert('✅ Leads uploaded successfully!');
        console.log('Response:', res);
        this.isUploading = false;
      },
      error: (err) => {
        console.error('Upload failed:', err);
        alert('❌ Upload failed. Check console for details.');
        this.isUploading = false;
      },
    });
  }

  clearData(): void {
    this.excelData = [];
    this.fileName = '';
  }


}
