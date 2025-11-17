import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '@app/environment/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.css'],
})
export class ExcelUploadComponent {
  excelData: any[] = [];
  fileName: string = '';
  leads: any[] = [];

   private baseUrl = environment.apiUrl

   isUploading = false;
  // Columns list for consistency check
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

  constructor(private http: HttpClient) {}

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
 
    this.http.post(`${this.baseUrl}/99acres-leads/bulk-upload`, this.excelData).subscribe({
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
