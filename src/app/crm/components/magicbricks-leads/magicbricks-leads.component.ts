import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '@app/environment/environment';
import { HousingLeadsService } from '@app/services/housing-leads.service';
import { Lead99Service } from '@app/services/lead99.service';
import { MagicBricksLead, MagicBricksLeadService } from '@app/services/magicbricks-lead.service';
import { NinetyNineAcresLeadService } from '@app/services/ninety-nine-acres-lead.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-magicbricks-leads',
  templateUrl: './magicbricks-leads.component.html',
  styleUrls: ['./magicbricks-leads.component.css']
})
export class MagicBricksLeadsComponent implements OnInit {


  selectedLead:any;

  leads: any[] = [];
  excelData: any[] = [];
  fileName = '';
  isLoading = false;
  isUploading = false;
  errorMessage = '';

  private apiUrl = `${environment.apiUrl}/housing-leads/bulk-upload`;

  // Expected column headers from your CSV/Excel file
  expectedColumns: string[] = [
    'Sno',
    'Name',
    'Type',
    'ContactNo',
    'PhoneVerificationStatus',
    'EmailId',
    'Query',
    'CalledOn',
    'Time',
    'Duration',
    'CallStatus',
    'Url',
    'ReceivedDate',
    'InterestedIn',
    'ResponseType',
    'Username',
    'AssignedTo',
    'EmailVerificationStatus',
    'Questionnaire',
    'ProductCode',
    'ProductType',
    'IntentVerificationStatus',
    'LeadScore',
    'FollowupCurrentStatus',
    'ProdType',
    'City',
    'Project',
    'ResCom',
    'Bhk',
    'PropertySnapshot',
    'ParentProductDetails',
    'SetIsParentProductTypeResponse',
    'CompactLabel',
    'Duplicate'
  ];

  constructor(private http: HttpClient, private housingLeadService: HousingLeadsService) {}

  ngOnInit(): void {
    this.loadLeads();
  }

  /** Fetch all leads */
  loadLeads(): void {
    this.isLoading = true;
    this.housingLeadService.getAllLeads().subscribe({
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
viewLead(_t39: any) {
this.selectedLead = _t39;

 const modalEl = document.getElementById('leadModal');
    (window as any).bootstrap.Modal.getOrCreateInstance(modalEl).show();
}
  /** Handle Excel file selection */
  onFileChange(event: any): void {
    const target: DataTransfer = <DataTransfer>event.target;

    if (target.files.length !== 1) {
      alert('Please upload a single Excel file.');
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

      // ✅ Validate headers
      const firstRowKeys = Object.keys(data[0]);
      const missing = this.expectedColumns.filter((col) => !firstRowKeys.includes(col));
      if (missing.length > 0) {
        alert('❌ Missing columns: ' + missing.join(', '));
        return;
      }

      this.excelData = data;
      console.log('Parsed Excel Data:', this.excelData);
      this.uploadLeads();
    };

    reader.readAsBinaryString(file);
  }

  /** Upload parsed Excel JSON to backend */
  uploadLeads(): void {
    if (!this.excelData.length) {
      alert('No leads found to upload.');
      return;
    }

    this.isUploading = true;
    this.http.post(this.apiUrl, this.excelData).subscribe({
      next: (res) => {
        alert('✅ Leads uploaded successfully!');
        console.log('Response:', res);
        this.isUploading = false;
        this.loadLeads();
      },
      error: (err) => {
        console.error('❌ Upload failed:', err);
        alert('Upload failed. Check console for details.');
        this.isUploading = false;
      }
    });
  }

  /** Delete a lead */
  deleteLead(id: number): void {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    this.housingLeadService.deleteLead(id).subscribe({
      next: () => {
        this.loadLeads();
      },
      error: (err) => console.error('Error deleting lead:', err)
    });
  }

  /** Clear the upload data */
  clearData(): void {
    this.excelData = [];
    this.fileName = '';
  }
}