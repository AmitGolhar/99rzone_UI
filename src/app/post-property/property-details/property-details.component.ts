import { Component } from '@angular/core';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent {

 currentStep = 1;
// Step list
  steps: string[] = [
    'Property Details',
    'Locality Details',
    'Rental Details',
    'Amenities',
    'Gallery',
    'Schedule'
  ];
 
formData = {
    apartmentType: '',
    bhkType: '',
    floor: '',
    totalFloor: '',
    propertyAge: '',
    facing: '',
    builtUpArea: '',
    apartmentName:'',
    propertyType:'',
    propertyStatus:'',
    rentalType:'',
    availabilityStatus:'',
    purposeStatus:'',
    commercialropertyType:''
  };

   floors: number[] = Array.from({ length: 30 }, (_, i) => i + 1);

   apartments: string[] = [
  'Prestige White Meadows',
  'Sobha Dream Acres',
  'Brigade Lakefront',
  'Purva Palm Beach',
  'Godrej Air',
  'Adarsh Palm Retreat',
  'Salarpuria Sattva Cadenza',
  'Embassy Lake Terraces'
];

cities: string[] = [
  'Bangalore', 
  'Mumbai', 
  'Delhi', 
  'Chennai', 
  'Pune', 
  'Hyderabad'
];

locationData = {
  city: '',
  locality: '',
  landmark: ''
};

rentalData: {
  rentalType: string;
  expectedRent: string;
  expectedDeposit: string;
  rentNegotiable: boolean;
  maintenanceType: string;
  maintenanceAmount: string;
  availableFrom: string;
  preferredTenants: string[];   // <-- explicitly typed as an array of strings
  furnishing: string;
  parking: string;
  description: string;
} = {
  rentalType: '',
  expectedRent: '',
  expectedDeposit: '',
  rentNegotiable: false,
  maintenanceType: '',
  maintenanceAmount: '',
  availableFrom: '',
  preferredTenants: [],        // <-- initialized as empty array
  furnishing: '',
  parking: '',
  description: ''
};


tenantOptions = [
  { label: 'Anyone', value: 'Anyone' },
  { label: 'Family', value: 'Family' },
  { label: 'Bachelor Female', value: 'Bachelor Female' },
  { label: 'Bachelor Male', value: 'Bachelor Male' },
  { label: 'Company', value: 'Company' }
];

amenities = {
  bathrooms: 1,
  balcony: 0,
  waterSupply: '',
  gym: false,
  nonVeg: false,
  gateSecurity: false,
  showProperty: '',
  propertyCondition: '',
  secondaryNumber: '',
  selectedAmenities: [] as string[] //  

};
 
availableAmenities: string[] = [
  'Lift',
  'Internet Services',
  'Air Conditioner',
  'Club House',
  'Intercom',
  'Swimming Pool',
  'Children Play Area',
  'Fire Safety',
  'Servant Room',
  'Shopping Center',
  'Gas Pipeline',
  'Park',
  'Rain Water Harvesting',
  'Sewage Treatment Plant',
  'House Keeping',
  'Power Backup',
  'Visitor Parking'
];

amenitiesList: string[] = [
  'Lift',
  'Internet Services',
  'Air Conditioner',
  'Club House',
  'Intercom',
  'Swimming Pool',
  'Children Play Area',
  'Fire Safety',
  'Servant Room',
  'Shopping Center',
  'Gas Pipeline',
  'Park',
  'Rain Water Harvesting',
  'Sewage Treatment Plant',
  'House Keeping',
  'Power Backup',
  'Visitor Parking'
];

uploadedPhotos: string[] = []; // stores Base64 or URLs of uploaded photos

scheduleData = {
  availability: '',
  startTime: '',
  endTime: ''
};

setAvailability(value: string) {
  this.scheduleData.availability = value;
}

onAmenityChange(event: any) {
  const amenity = event.target.value;
  if (event.target.checked) {
    this.amenities.selectedAmenities.push(amenity);
  } else {
    const index = this.amenities.selectedAmenities.indexOf(amenity);
    if (index > -1) {
      this.amenities.selectedAmenities.splice(index, 1);
    }
  }
}

onTenantChange(event: any) {
  const tenant:any = event.target.value;
  if (event.target.checked) {
    this.rentalData.preferredTenants.push(tenant);
  } else {
    this.rentalData.preferredTenants = this.rentalData.preferredTenants.filter(t => t !== tenant);
  }
}

  goToStep(step: number) {
    this.currentStep = step;
  }

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    console.log('Form data:', this.formData);
  }

  triggerFileInput() {
  const fileInput = document.getElementById('photoUpload') as HTMLInputElement;
  fileInput.click();
}

onFileSelected(event: any) {
  const files = event.target.files;
  this.readFiles(files);
}

onFileDrop(event: DragEvent) {
  event.preventDefault();
  const files = event.dataTransfer?.files;
  if (files) {
    this.readFiles(files);
  }
}

onFileDragOver(event: DragEvent) {
  event.preventDefault();
}

onFileDragLeave(event: DragEvent) {
  event.preventDefault();
}

readFiles(files: FileList) {
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.uploadedPhotos.push(e.target.result);
    };
    reader.readAsDataURL(files[i]);
  }
}

}
