import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostPropertiesService } from 'src/app/services/post-properties.service';

@Component({
  selector: 'app-residential-rent',
  templateUrl: './residential-rent.component.html',
  styleUrls: ['./residential-rent.component.css']
})
export class ResidentialRentComponent implements OnInit {
  currentStep = 1;
  // Step list
  steps: string[] = [
    'Rent Details',
    'Locality Details',
    'Rental Details',
    'Amenities',
    'Gallery',
    'Schedule',
  ];

  formData = {
    apartmentType: '',
    apartmentName: '',
    bhkType: '',
    floor: '',
    totalFloor: '',
    propertyAge: '',
    facing: '',
    builtUpArea: '',
  };

  floors: number[] = Array.from({ length: 40 }, (_, i) => i + 1);

  apartments: string[] = [
    'VTP Monarque',
    'VTP Volare',
    'Earth 1 by VTP Luxe',
    'VTP Bellissimo',
    'VTP Aethereus',
    'VTP Alpine',
    'VTP Leonara',
    'VTP BelAir',
    'Godrej Hillside',
    'Godrej Hill Retreat',
    'Godrej Meadows',
    'Godrej Green Cove'
  ];

  cities: string[] = [
     'Pune',
    'Bangalore',
    'Mumbai',
    'Delhi',
    'Chennai',
    'Hyderabad',
  ];

  // step 2 form
  locationData = {
    localityCity: '',
    locality: '',
    landmark: '',
  };


  rentalData: {
    rentOrLease: string;
    expectedRent: string;
    expectedDeposit: string;
    rentNegotiable: boolean;
    monthlyMaintenance: string;
    maintenanceAmount: number;
    availableFrom: string;
    preferredTenants: string[]; 
    furnishing: string;
    parking: string;
    description: string;
    expectedLeaseAmount:number;
  } = {
    rentOrLease: '',
    expectedRent: '',
    expectedDeposit: '',
    rentNegotiable: false,
    monthlyMaintenance: '',
    maintenanceAmount: 0,
    availableFrom: '',
    preferredTenants: [], 
    furnishing: '',
    parking: '',
    description: '',
    expectedLeaseAmount:0
  };

  tenantOptions = [
    { label: 'Anyone', value: 'Anyone' },
    { label: 'Family', value: 'Family' },
    { label: 'Bachelor Female', value: 'Bachelor Female' },
    { label: 'Bachelor Male', value: 'Bachelor Male' },
    { label: 'Company', value: 'Company' },
  ];

 

  amenities = {
    bathroom: 1,
    balcony: 0,
    waterSupply: '',
    gym: true,
    nonvegAllowed: true,
    gatedSecurity: true,
    petAllowed:true,
    whoWillShowProperty: '',
    currentPropertyCondition: '',
    secondaryNumber: '',
    availableAmenities: [] as string[], //
  };
 

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
    'Visitor Parking',
  ];

  uploadedPhotos: string[] = []; // stores Base64 or URLs of uploaded photos

  scheduleData = {
    ownerAvailability: '',
    fromTime: '',
    toTime: '',
  };
  postPropertyParentForm: any;

  formObject: any = {
    name: '',
    email: '',
    date: '',
    mobileNo: '',
    postedBy: '',
    propertyType: '',
    propertyAdsType: '',
    buyPropertyType: '',
    rentalType: '',
    commercialPropertyType: '',
    apartmentType: '',
    bhkType: '',
    floor: '',
    facing: '',
    apartmentName: ' ',
    totalFloor: '',
    propertyAge: '',
    builtUpArea: '',

    localityCity: '',
    locality: '',
    landmark: '',
    rentType: '',
    expectedRent: '',
    expectedDeposit: '',
    rentNegotiable: '',
    monthlyMaintenance: '',
    maintenanceAmount: '',
    availableFrom: '',
    furnishing: '',
    preferredTenants: [],
    parking: '',
    description: '',
    bathroom: '',
    balcony: '',
    waterSupply: '',
    gym: '',
    nonvegAllowed: '',
    gatedSecurity: '',
    petAllowed:'',
    whoWillShowProperty: '',
    currentPropertyCondition: '',
    secondaryNumber: '',
    availableAmenities: [],
    ownerAvailability: '',
    fromTime: '',
    toTime: '',
    rentOrLease:''
  };

  propertyForm: any;
  stepOneForm: any;
  stepTwoForm: any;
  stepThreeForm: any;
  stepFourForm: any;
  stepFiveForm: any;
  stepSixForm: any;

  propertyPhotos1: any;
  propertyPhotos2: any;
  propertyPhotos3: any;
  propertyPhotos4: any;
  propertyPhotos5: any;
  propertyPhotos6: any;
  propertyPhotos7: any;

  constructor(
    private route: ActivatedRoute,
    private postPropertiesService: PostPropertiesService,
        private router: Router,  // ✅ Add this

  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.postPropertyParentForm = params;
      const postdate = new Date();
      const formattedDate = postdate.toISOString().split('T')[0];

      this.formObject= {
        name:  this.postPropertyParentForm.name,
        email: this.postPropertyParentForm.email,
        propertyPostedDate: formattedDate,
        mobileNo: this.postPropertyParentForm.mobileNo,
        postedBy: this.postPropertyParentForm.postedBy,
        propertyType: this.postPropertyParentForm.propertyType || 'Residential',
        propertyAdsType: this.postPropertyParentForm.propertyAdsType,
      
      }
console.log(this.formObject)
    });
  }

  setAvailability(value: string) {
    this.scheduleData.ownerAvailability = value;
  }

  onAmenityChange(event: any) {
    const amenity = event.target.value;
    if (event.target.checked) {
      this.amenities.availableAmenities.push(amenity);
    } else {
      const index = this.amenities.availableAmenities.indexOf(amenity);
      if (index > -1) {
        this.amenities.availableAmenities.splice(index, 1);
      }
    }
  }

  onTenantChange(event: any) {
    const tenant: any = event.target.value;
 //preferredTenants
    if (event.target.checked) {
      this.rentalData.preferredTenants.push(tenant);
    } else {
      this.rentalData.preferredTenants =
        this.rentalData.preferredTenants.filter((t) => t !== tenant);
    }
  }

  goToStep(step: number) {
    this.currentStep = step;
 console.log(this.formObject)
    
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

 

  triggerFileInput() {
    const fileInput = document.getElementById(
      'photoUpload'
    ) as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
     const files = event.target.files;
     this.readFiles(files);

    const file1 = (event.target as HTMLInputElement).files?.[0];
    const file2 = (event.target as HTMLInputElement).files?.[1];
    const file3 = (event.target as HTMLInputElement).files?.[2];
    const file4 = (event.target as HTMLInputElement).files?.[3];
    const file5 = (event.target as HTMLInputElement).files?.[4];
    const file6 = (event.target as HTMLInputElement).files?.[5];
    const file7 = (event.target as HTMLInputElement).files?.[6];

    this.propertyPhotos1 = file1;
    this.propertyPhotos2 = file2;
    this.propertyPhotos3 = file3;
    this.propertyPhotos4 = file4;
    this.propertyPhotos5 = file5;
    this.propertyPhotos6 = file6;
    this.propertyPhotos7 = file7;
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
  step1Form(data: any) {
  
    this.formObject.apartmentName = data.apartmentName;
    this.formObject.apartmentType = data.apartmentType;
    this.formObject.bhkType = data.bhkType;
    this.formObject.builtUpArea = data.builtUpArea;
    this.formObject.facing = data.facing;
    this.formObject.floor = data.floor;
    this.formObject.propertyAge = data.propertyAge;
    this.formObject.totalFloor = data.totalFloor;
      console.log(this.formObject)
  }

  step2Form(data: any) {
    this.formObject.localityCity = data.localityCity;
    this.formObject.landmark = data.landmark;
    this.formObject.locality = data.locality;

       console.log(this.formObject)

  }
  step3Form(data: any) {
    this.formObject.availableFrom = data.availableFrom;
    this.formObject.description = data.description;
    this.formObject.expectedDeposit = data.expectedDeposit;
    this.formObject.expectedRent = data.expectedRent;
    this.formObject.furnishing = data.furnishing;
    this.formObject.maintenanceAmount = data.maintenanceAmount;
    this.formObject.monthlyMaintenance = data.monthlyMaintenance;
    this.formObject.parking = data.parking;
    this.formObject.preferredTenants = data.preferredTenants;
    this.formObject.rentNegotiable = data.rentNegotiable;
    this.formObject.rentOrLease = data.rentOrLease;
      console.log(this.formObject)
  }
  step4Form(data: any) {
    this.formObject.balcony = data.balcony;
    this.formObject.bathroom = data.bathroom;
    this.formObject.gatedSecurity = data.gatedSecurity;
     this.formObject.petAllowed = data.petAllowed;
    this.formObject.gym = data.gym;
    this.formObject.nonvegAllowed = data.nonVegAllowed;
    this.formObject.currentPropertyCondition = data.currentPropertyCondition;
    this.formObject.secondaryNumber = data.secondaryNumber;
    this.formObject.availableAmenities = data.availableAmenities;
    this.formObject.whoWillShowProperty = data.whoWillShowProperty;
    this.formObject.waterSupply = data.waterSupply;
      console.log(this.formObject)
  }
  step5Form(data: any) {
console.log(this.formObject)
  }
  step6Form(data: any) {
     this.formObject.ownerAvailability = data.ownerAvailability;
      this.formObject.fromTime = data.fromTime;
       this.formObject.toTime = data.toTime;
    console.log(this.formObject)
    this.submitForm();
  }

  submitForm() {
    const formData = new FormData();
 
    // Required form fields
    formData.append('name', this.formObject.name);
    formData.append('email', this.formObject.email);
    formData.append('propertyPostedDate', this.formObject.propertyPostedDate);
    formData.append('mobileNo', this.formObject.mobileNo);
    formData.append('postedBy', this.formObject.postedBy);
    formData.append('propertyType', this.formObject.propertyType);
    formData.append('propertyAdsType', this.formObject.propertyAdsType);

    // PropertyDetails
 
    formData.append('apartmentType', this.formObject.apartmentType);
    formData.append('bhkType', this.formObject.bhkType);
    formData.append('floor', this.formObject.floor);
    formData.append('facing', this.formObject.facing);
    formData.append('apartmentName', this.formObject.apartmentName);
    formData.append('totalFloor', this.formObject.totalFloor);
    formData.append('propertyAge', this.formObject.propertyAge);
    formData.append('builtUpArea', this.formObject.builtUpArea);
 
    // LocalityDetails
    formData.append('localityCity', this.formObject.localityCity);
    formData.append('locality', this.formObject.locality);
    formData.append('landmark', this.formObject.landmark);

    // RentalDetails

    
    formData.append('rentOrLease',  this.formObject.rentOrLease)
    formData.append('expectedRent', this.formObject.expectedRent);
    formData.append('expectedDeposit', this.formObject.expectedDeposit);
    formData.append('rentNegotiable', this.formObject.rentNegotiable);
    formData.append('monthlyMaintenance', this.formObject.monthlyMaintenance);
    formData.append('maintenanceAmount', this.formObject.maintenanceAmount || '0');
    formData.append('availableFrom', this.formObject.availableFrom);
    formData.append('furnishing', this.formObject.furnishing);
    formData.append('parking', this.formObject.parking);
    formData.append('description', this.formObject.description);
    formData.append('preferredTenants',  this.formObject.preferredTenants)
    formData.append('availableAmenities',  this.formObject.availableAmenities)
 
    // Amenities
    formData.append('bathroom', this.formObject.bathroom);
    formData.append('balcony', this.formObject.balcony);
    formData.append('waterSupply', this.formObject.waterSupply);
    formData.append('gym', this.formObject.gym);
    formData.append('nonVegAllowed', this.formObject.nonVegAllowed);
    formData.append('gatedSecurity', this.formObject.gatedSecurity);
    formData.append('petAllowed', this.formObject.petAllowed);
    
    formData.append('whoWillShowProperty', this.formObject.whoWillShowProperty);
    formData.append('currentPropertyCondition', this.formObject.currentPropertyCondition);
    formData.append('secondaryNumber', this.formObject.secondaryNumber || '');

    // Schedule
    formData.append('ownerAvailability', this.formObject.ownerAvailability);
    formData.append('fromTime', this.formObject.fromTime);
    formData.append('toTime', this.formObject.toTime);

    // Optional: Gallery image files

    formData.append('propertyPhotos1', this.propertyPhotos1);
    formData.append('propertyPhotos2', this.propertyPhotos2);
    formData.append('propertyPhotos3', this.propertyPhotos3);
    formData.append('propertyPhotos4', this.propertyPhotos4);
    formData.append('propertyPhotos5', this.propertyPhotos5);
    formData.append('propertyPhotos6', this.propertyPhotos6);
    formData.append('propertyPhotos7', this.propertyPhotos7);
  

 const data = {
  "name": "John Doe",
  "email": "john@example.com",
  "propertyPostedDate": "2025-07-03",
  "mobileNo": 9876543210,
  "postedBy": "Owner",
  "propertyType": "Apartment",
  "propertyAdsType": "Rent",

  "apartmentType": "2BHK",
  "bhkType": "2BHK",
  "apartmentName": "Sunshine Residency",
  "floor": "3",
  "totalFloor": "10",
  "propertyAge": "5-10 years",
  "facing": "East",
  "builtUpArea": "1200 sqft",

  "city": "Mumbai",
  "locality": "Andheri",
  "landmark": "Near Metro Station",

  "rentOrLease": "Rent",
  "expectedRent": 25000,
  "expectedDeposit": 50000,
  "expectedLeaseAmount": 0,
  "rentNegotiable": true,
  "monthlyMaintenance": 1500,
  "maintenanceAmount": 1500,
  "availableFrom": "2025-08-01",

  "preferredTenants": ["Family", "Bachelors"],
  "furnishing": "Semi-Furnished",
  "parking": "Reserved",
  "description": "Spacious and well-lit 2BHK.",

  "bathroom": 2,
  "balcony": 1,
  "waterSupply": "Corporation",
  "petAllowed": "Yes",
  "gym": "Yes",
  "gatedSecurity": "Yes",
  "nonVegAllowed": "No",
  "whoWillShowProperty": "Owner",
  "currentPropertyCondition": "Vacant",
  "secondaryNumber": 9876543211,
  "addDirectionsTip": "Near Green Park gate",

  "availableAmenities": ["Lift", "CCTV", "Garden", "Power Backup"],

  "propertyPhotos1": null,
  "propertyPhotos2": null,
  "propertyPhotos3": null,
  "propertyPhotos4": null,
  "propertyPhotos5": null,
  "propertyPhotos6": null,
  "propertyPhotos7": null,

  "ownerAvailability": "Weekends",
  "fromTime": "10:00:00",
  "toTime": "18:00:00"
}

 formData.forEach((value, key) => {
  if (value === undefined || value === 'undefined') {
    formData.delete(key);
  }
});

    this.postPropertiesService.postAds(formData).subscribe({
        next: (response) => {
          // Handle success (HTTP 200)
          console.log('Post successful:', response);
          this.router.navigate(['/']); // Redirect to home
        },
        error: (error) => {
          // Handle error
          console.error('Post failed:', error);
        }
});
  }
}

 
