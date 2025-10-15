import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostPropertiesService } from '@app/services/post-properties.service';

@Component({
  selector: 'app-commercial-rent',
  templateUrl: './commercial-rent.component.html',
  styleUrls: ['./commercial-rent.component.css']
})
export class CommercialRentComponent implements OnInit {
  currentStep = 1;
  // Step list
  steps: string[] = [
    'Property Rent Details',
    'Locality Details',
    'Rental Details',
    'Amenities',
    'Gallery',
    'Schedule',
  ];
featureOptions: string[] = [
  'On Main Road',
  'Corner Property',
  'Park Facing',
  'Near Metro',
  'East Facing'
];
idealForOptions: string[] = [
  'Bank',
  'Service Center',
  'ATM',
  'Retail',
  'Show Room'
];
 otherFeatures!: [];
 idealFor!:[];

  formData = {
    commercialPropertyType: '',
    buildingType: '',
    ageOfProperty: '',
    floor: '',
    totalFloor: '',
    superBuiltUpArea: '',
    furnishing: '',
    otherFeatures: [] as string[],

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

  locationData = {
    localityCity: '',
    locality: '',
    landmark: '',
  };

 
 
  rentalData: {

    expectedRent: string;
    isRentNegotiable: boolean;
    expectedDeposite: string;
    monthlyMaintenance: string;
    deposit: string;
    leaseDuration: string;
    lockinPeriod: string;
    depositNegotiable: boolean;
    availableFrom: string;
    idealFor: string[];
    furnishingStatus:string
    isMaintenanceExtra:string
    
  } = {

      expectedRent: '',
      expectedDeposite: '',
      isRentNegotiable: false,
       monthlyMaintenance: '',
      leaseDuration: '',
      availableFrom: '',
      deposit: '',
      lockinPeriod: '',
      depositNegotiable: false,
      idealFor: [] as string[],
      furnishingStatus:'',
      isMaintenanceExtra:''
    };

  tenantOptions = [
    { label: 'Anyone', value: 'Anyone' },
    { label: 'Family', value: 'Family' },
    { label: 'Bachelor Female', value: 'Bachelor Female' },
    { label: 'Bachelor Male', value: 'Bachelor Male' },
    { label: 'Company', value: 'Company' },
  ];

  amenities = {
     powerBackup:'',
    lift:'',
    parking:'',
    washrooms:'',
    noOfAvailableParkingSlot:'',
    waterStorageFacility:'',
    security:'',
    currentPropertyCondition:'',
    currentRunningBusiness:'',
    addDirectionsTip:'',
 
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
    previousOccupancy: '',
    whoShowProperty: '',
    propertyPainted: '',
    propertyCleaned: '',
    propertyDescription: ''
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

 
    commercialPropertyType: '',
    buildingType:'',
    ageOfProperty:'',
    floor: '',
    totalFloor: '',
    superBuiltUpArea:'',
    furnishing:'',
    otherFeatures:[] as string[],
 
    localityCity: '',
    locality: '',
    landmark: '',

    expectedRent: '',
    isRentNegotiable: '',
    expectedDeposite: '',
    monthlyMaintenance:'',
    deposit:'',
    leaseDuration:'',
    lockinPeriod:'',
    depositNegotiable:'',
    availableFrom:'',
    idealFor: [] as string[],
    furnishingStatus:'',
    isMaintenanceExtra:'',


    powerBackup:'',
    lift:'',
    parking:'',
    washrooms:'',
    noOfAvailableParkingSlot:'',
    waterStorageFacility:'',
    security:'',
    currentPropertyCondition:'',
    currentRunningBusiness:'',
    addDirectionsTip:'',
    

    propertyDescription:'',
    previousOccupancy:'',
    whoShowProperty:'',
    propertyPainted:'',
    propertyCleaned:'',
    ownerAvailability:'',
    fromTime:'',
    toTime:''

  
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

  photoCount = 0;

  constructor(
    private route: ActivatedRoute,
    private postPropertiesService: PostPropertiesService,
        private router: Router,  // ✅ Add this

  ) {}

  isScheduleValid(): boolean {
    const s = this.scheduleData;
    return (
      !!s.ownerAvailability &&
      !!s.fromTime &&
      !!s.toTime &&
      !!s.previousOccupancy &&
      !!s.whoShowProperty &&
      !!s.propertyPainted &&
      !!s.propertyCleaned &&
      !!s.propertyDescription

    );
  }
  removePhoto(photo: string) {
    this.uploadedPhotos = this.uploadedPhotos.filter(p => p !== photo);
    this.photoCount = this.uploadedPhotos.length;
  }


  toggleFeature(feature: string): void {
  const index = this.formData.otherFeatures.indexOf(feature);
  if (index === -1) {
   this.formData.otherFeatures.push(feature);
  } else {
    this.formData.otherFeatures.splice(index, 1);
  }
}

isFeatureSelected(feature: string): boolean {
  return this.formData.otherFeatures.includes(feature);
}

    ideltoggleFeature(idel: string): void {
    const index = this.formData.otherFeatures.indexOf(idel);
    if (index === -1) {
    this.formData.otherFeatures.push(idel);
    } else {
      this.formData.otherFeatures.splice(index, 1);
    }
  }

  isideleSelected(idel: string): boolean {
    return this.formData.otherFeatures.includes(idel);
  }

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
        propertyType: this.postPropertyParentForm.propertyType || 'Commercial',
        propertyAdsType: this.postPropertyParentForm.propertyAdsType || 'Rent',
      
      }
console.log(this.formObject)
    });
  }

 setAvailability(type: string) {
  this.scheduleData.ownerAvailability = type;
}
isEndTimeValid(): boolean {
  if (!this.scheduleData.fromTime || !this.scheduleData.toTime) return true;
  return this.scheduleData.toTime > this.scheduleData.fromTime;
}
 

  onTenantChange(event: any) {
    const tenant: any = event.target.value;
    if (event.target.checked) {
      this.rentalData.idealFor.push(tenant);
    } else {
      this.rentalData.idealFor =
        this.rentalData.idealFor.filter((t) => t !== tenant);
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
          this.photoCount = this.uploadedPhotos.length;
      };
      reader.readAsDataURL(files[i]);
    }
  }
  step1Form(data: any) {
  
    this.formObject.commercialPropertyType = data.commercialPropertyType;
    this.formObject.buildingType = data.buildingType;
    this.formObject.ageOfProperty = data.ageOfProperty;
    this.formObject.floor = data.floor;
    this.formObject.totalFloor = data.totalFloor;
    this.formObject.superBuiltUpArea = data.superBuiltUpArea;
    this.formObject.furnishing = data.furnishing;
    this.formObject.otherFeatures = data.otherFeatures;
      console.log(this.formObject)
  }

  step2Form(data: any) {
    this.formObject.localityCity = data.localityCity;
    this.formObject.landmark = data.landmark;
    this.formObject.locality = data.locality;

       console.log(this.formObject)

  }
  step3Form(data: any) {
    this.formObject.expectedRent = data.expectedRent;
    this.formObject.isRentNegotiable = data.isRentNegotiable;
    this.formObject.expectedDeposite = data.expectedDeposite;
    this.formObject.monthlyMaintenance = data.monthlyMaintenance;
    this.formObject.deposit = data.deposit;
    this.formObject.leaseDuration = data.leaseDuration;
    this.formObject.lockinPeriod = data.lockinPeriod;
    this.formObject.depositNegotiable = data.depositNegotiable;
    this.formObject.availableFrom = data.availableFrom;
    this.formObject.idealFor = data.idealFor;
    this.formObject.furnishingStatus = data.furnishingStatus;
    this.formObject.isMaintenanceExtra = data.isMaintenanceExtra;

      console.log(this.formObject)
  }
  step4Form(data: any) {
    this.formObject.powerBackup = data.powerBackup;
    this.formObject.lift = data.lift;
    this.formObject.parking = data.parking;
    this.formObject.washrooms = data.washrooms;
    this.formObject.noOfAvailableParkingSlot = data.noOfAvailableParkingSlot;
    this.formObject.waterStorageFacility = data.waterStorageFacility;
    this.formObject.security = data.security;
    this.formObject.currentPropertyCondition = data.currentPropertyCondition;
    this.formObject.currentRunningBusiness = data.currentRunningBusiness;
    this.formObject.addDirectionsTip = data.addDirectionsTip;
      console.log(this.formObject)


  }
  step5Form(data: any) {

  }
  step6Form(data: any) {

    this.formObject.propertyDescription = data.propertyDescription;
    this.formObject.previousOccupancy = data.previousOccupancy;
    this.formObject.whoShowProperty = data.whoShowProperty;
    this.formObject.propertyPainted = data.propertyPainted;
    this.formObject.propertyCleaned = data.propertyCleaned
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
    formData.append('commercialPropertyType', this.formObject.commercialPropertyType);
    formData.append('buildingType', this.formObject.buildingType);
    formData.append('ageOfProperty', this.formObject.ageOfProperty);
    formData.append('floor', this.formObject.floor);
    formData.append('totalFloor', this.formObject.totalFloor);
    formData.append('superBuiltUpArea', this.formObject.superBuiltUpArea);
    formData.append('furnishing', this.formObject.furnishing);
    formData.append('otherFeatures', this.formObject.otherFeatures);
 
 

    // LocalityDetails
    formData.append('localityCity', this.formObject.localityCity);
    formData.append('locality', this.formObject.locality);
    formData.append('landmark', this.formObject.landmark);

 
    // RentalDetails
    formData.append('expectedRent', this.formObject.expectedRent);
    formData.append('isRentNegotiable', this.formObject.isRentNegotiable);
    formData.append('expectedDeposite', this.formObject.expectedDeposite);
    formData.append('monthlyMaintenance', this.formObject.monthlyMaintenance);
    formData.append('deposit', this.formObject.deposit);
    formData.append('leaseDuration', this.formObject.leaseDuration || '');
    formData.append('lockinPeriod', this.formObject.lockinPeriod);
    formData.append('depositNegotiable', this.formObject.depositNegotiable);
    formData.append('availableFrom', this.formObject.availableFrom);
    formData.append('idealFor', this.formObject.idealFor);
    formData.append('furnishingStatus',  this.formObject.furnishingStatus)
    formData.append('isMaintenanceExtra',  this.formObject.isMaintenanceExtra)
 

  

    // Amenities
    formData.append('powerBackup', this.formObject.powerBackup);
    formData.append('lift', this.formObject.lift);
    formData.append('parking', this.formObject.parking);
    formData.append('washrooms', this.formObject.washrooms);
    formData.append('noOfAvailableParkingSlot', this.formObject.noOfAvailableParkingSlot);
    formData.append('waterStorageFacility', this.formObject.waterStorageFacility);
    formData.append('security', this.formObject.security);
    formData.append('currentPropertyCondition', this.formObject.currentPropertyCondition);
    formData.append('currentRunningBusiness', this.formObject.currentRunningBusiness || '');
    formData.append('addDirectionsTip', this.formObject.addDirectionsTip || '');



    // Schedule
    formData.append('propertyDescription', this.formObject.propertyDescription);
    formData.append('previousOccupancy', this.formObject.previousOccupancy);
    formData.append('whoShowProperty', this.formObject.whoShowProperty);
    formData.append('propertyPainted', this.formObject.propertyPainted);
    formData.append('propertyCleaned', this.formObject.propertyCleaned);
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
  

/*     this.http.post('http://localhost:8082/api/post-ads', formData).subscribe({
      next: (res) => console.log('Success:', res),
      error: (err) => console.error('Error:', err),
    }); */
    this.postPropertiesService.postcommercialAds(formData).subscribe({
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

//monthlyMaintainence
//landmarkStreet

