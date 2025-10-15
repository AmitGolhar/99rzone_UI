import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostPropertiesService } from '@app/services/post-properties.service';

@Component({
  selector: 'app-commercial-sell',
  templateUrl: './commercial-sell.component.html',
  styleUrls: ['./commercial-sell.component.css'],
})
export class CommercialSellComponent implements OnInit {
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
    'East Facing',
  ];
  idealForOptions: string[] = [
    'Bank',
    'Service Center',
    'ATM',
    'Retail',
    'Show Room',
  ];
  otherFeatures!: [];
  idealFor!: [];

  formData = {
    propertyType: 'Commercial',
    propertyAdsType: '',
    commercialPropertyType: '',
    buildingType: '',
    ageOfProperty: '',
    floor: '',
    totalFloor: '',
    superBuiltUpArea: '',
    carpetArea: '',
    furnishing: '',
    otherFeatures: [] as string[],
    idealFor: [] as string[],
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
    'Godrej Green Cove',
  ];

  cities: string[] = [
    'Pune',
    'Bangalore',
    'Mumbai',
    'Delhi',
    'Chennai',
    'Hyderabad',
  ];
  tenantOptions = [
    { label: 'Anyone', value: 'Anyone' },
    { label: 'Family', value: 'Family' },
    { label: 'Bachelor Female', value: 'Bachelor Female' },
    { label: 'Bachelor Male', value: 'Bachelor Male' },
    { label: 'Company', value: 'Company' },
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
    'Visitor Parking',
  ];
// 🏙️ Step 2 - Location Data
locationData = {
  city: '',
  locality: '',
  street: '',
  landmark: '',
};

// 💰 Step 3 - Pricing & Availability Data
priceData = {
  expectedPrice: null,
  ownershipType: '',
  priceNegotiable: false,
  availableFrom: '',
  idealFor: [] as string[],
};

// 🧱 Step 4 - Amenities Data
amenities = {
  powerBackup: '',
  lift: '',
  parking: '',
  noOfParkingSlots: '', // ✅ Matches backend field name
  washrooms: '',
  waterStorageFacility: '',
  security: '',
  wifi: '',
  currentPropertyCondition: '',
  currentRunningBusiness: '',
  addDirectionsTip: '',
};

// 🕒 Step 6 - Schedule Data
scheduleData = {
  propertyDescription: '',
  previousOccupancy: '',
  whoWillShowProperty: '', // ✅ matches backend: whoWillShowProperty
  propertyPainted: '',
  propertyCleaned: '',
  ownerAvailability: '',
  fromTime: '',
  toTime: '',
};

  uploadedPhotos: string[] = []; // stores Base64 or URLs of uploaded photos
  postPropertyParentForm: any;

formObject: any = {
    name: '',
    email: '',
    mobileNo: '',
    secondaryNumber: '',
    postedBy: '',
    propertyPostedDate: '',

    propertyType: 'Commercial',
    propertyAdsType: '',
    commercialPropertyType: '',
    buildingType: '',
    ageOfProperty: '',
    floor: '',
    totalFloor: '',
    superBuiltUpArea: '',
    carpetArea: '',
    furnishing: '',
    otherFeatures: [] as string[],

    city: '',
    locality: '',
    street: '',
    landmark: '',

    expectedPrice: null,
    ownershipType: '',
    priceNegotiable: false,
    availableFrom: '',
    idealFor: [] as string[],

    powerBackup: '',
    lift: '',
    parking: '',
    noOfParkingSlots: '',
    washrooms: '',
    waterStorageFacility: '',
    security: '',
    wifi: '',
    currentPropertyCondition: '',
    currentRunningBusiness: '',
    addDirectionsTip: '',

    propertyPhotos1: null,
    propertyPhotos2: null,
    propertyPhotos3: null,
    propertyPhotos4: null,
    propertyPhotos5: null,
    propertyPhotos6: null,
    propertyPhotos7: null,

    propertyDescription: '',
    previousOccupancy: '',
    whoWillShowProperty: '',
    propertyPainted: '',
    propertyCleaned: '',
    ownerAvailability: '',
    fromTime: '',
    toTime: '',
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
    private router: Router // ✅ Add this
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.postPropertyParentForm = params;
      const postdate = new Date();
      const formattedDate = postdate.toISOString().split('T')[0];

      this.formObject = {
        name: this.postPropertyParentForm.name,
        email: this.postPropertyParentForm.email,
        date: formattedDate,
        mobileNo: this.postPropertyParentForm.mobileNo,
        postedBy: this.postPropertyParentForm.postedBy,
        propertyType: this.postPropertyParentForm.propertyType || 'Residential',
        propertyAdsType: this.postPropertyParentForm.propertyAdsType,
      };
      console.log(this.formObject);
    });
  }

  isScheduleValid(): boolean {
    const s = this.scheduleData;
    return (
      !!s.ownerAvailability &&
      !!s.fromTime &&
      !!s.toTime &&
      !!s.previousOccupancy &&
      !!s.whoWillShowProperty &&
      !!s.propertyPainted &&
      !!s.propertyCleaned &&
      !!s.propertyDescription
    );
  }
  removePhoto(photo: string) {
    this.uploadedPhotos = this.uploadedPhotos.filter((p) => p !== photo);
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
    const index = this.formData.idealFor.indexOf(idel);
    if (index === -1) {
      this.formData.idealFor.push(idel);
    } else {
      this.formData.idealFor.splice(index, 1);
    }
  }

 isideleSelected(idel: string): boolean {
  return this.formData.idealFor.includes(idel);
}

  setAvailability(value: string) {
    this.scheduleData.ownerAvailability = value;
  }
 

 

  goToStep(step: number) {
    this.currentStep = step;
    console.log(this.formObject);
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
    console.log('✅ Step 1:', this.formObject);
  }

  step2Form(data: any) {
    this.formObject.city = data.city;
    this.formObject.locality = data.locality;
    this.formObject.street = data.street;
    this.formObject.landmark = data.landmark;
    console.log('✅ Step 2:', this.formObject);
  }

  step3Form(data: any) {
    this.formObject.expectedPrice = data.expectedPrice;
    this.formObject.ownershipType = data.ownershipType;
    this.formObject.priceNegotiable = data.priceNegotiable;
    this.formObject.availableFrom = data.availableFrom;
    this.formObject.idealFor = data.idealFor;
    console.log('✅ Step 3:', this.formObject);
  }

  step4Form(data: any) {
    this.formObject.powerBackup = data.powerBackup;
    this.formObject.lift = data.lift;
    this.formObject.parking = data.parking;
    this.formObject.noOfParkingSlots = data.noOfAvailableParkingSlot;
    this.formObject.washrooms = data.washrooms;
    this.formObject.waterStorageFacility = data.waterStorageFacility;
    this.formObject.security = data.security;
    this.formObject.wifi = data.wifi;
    this.formObject.currentPropertyCondition = data.currentPropertyCondition;
    this.formObject.currentRunningBusiness = data.currentRunningBusiness;
    this.formObject.addDirectionsTip = data.addDirectionsTip;
    console.log('✅ Step 4:', this.formObject);
  }

  step5Form(data: any) {
    // Example: data.uploadedPhotos = [File, File, File...]
    this.formObject.propertyPhotos1 = data.photos[0] || null;
    this.formObject.propertyPhotos2 = data.photos[1] || null;
    this.formObject.propertyPhotos3 = data.photos[2] || null;
    this.formObject.propertyPhotos4 = data.photos[3] || null;
    this.formObject.propertyPhotos5 = data.photos[4] || null;
    this.formObject.propertyPhotos6 = data.photos[5] || null;
    this.formObject.propertyPhotos7 = data.photos[6] || null;
    console.log('✅ Step 5:', this.formObject);
  }

  step6Form(data: any) {
    this.formObject.propertyDescription = data.propertyDescription;
    this.formObject.previousOccupancy = data.previousOccupancy;
    this.formObject.whoWillShowProperty = data.whoWillShowProperty;
    this.formObject.propertyPainted = data.propertyPainted;
    this.formObject.propertyCleaned = data.propertyCleaned;
    this.formObject.ownerAvailability = data.ownerAvailability;
    this.formObject.fromTime = data.fromTime;
    this.formObject.toTime = data.toTime;

    console.log('✅ Step 6:', this.formObject);
    this.submitForm();
  }

  submitForm() {
  const formData = new FormData();

  // 🧾 Basic Info
  formData.append('name', this.formObject.name || '');
  formData.append('email', this.formObject.email || '');
  formData.append('propertyPostedDate', this.formObject.propertyPostedDate || '');
  formData.append('mobileNo', this.formObject.mobileNo?.toString() || '');
  formData.append('secondaryNumber', this.formObject.secondaryNumber?.toString() || '');
  formData.append('postedBy', this.formObject.postedBy || '');
  formData.append('propertyType', this.formObject.propertyType || 'Commercial');
  formData.append('propertyAdsType', this.formObject.propertyAdsType || 'Sell');

  // 🏢 Property Details
  formData.append('commercialPropertyType', this.formObject.commercialPropertyType || '');
  formData.append('buildingType', this.formObject.buildingType || '');
  formData.append('ageOfProperty', this.formObject.ageOfProperty || '');
  formData.append('floor', this.formObject.floor || '');
  formData.append('totalFloor', this.formObject.totalFloor || '');
  formData.append('superBuiltUpArea', this.formObject.superBuiltUpArea || '');
  formData.append('carpetArea', this.formObject.carpetArea || '');
  formData.append('furnishing', this.formObject.furnishing || '');

  // Handle List: otherFeatures
  if (Array.isArray(this.formObject.otherFeatures)) {
    this.formObject.otherFeatures.forEach((feature: string) => formData.append('otherFeatures', feature));
  } else {
    formData.append('otherFeatures', '');
  }

  // 📍 Locality Details
  formData.append('city', this.formObject.city || '');
  formData.append('locality', this.formObject.locality || '');
  formData.append('street', this.formObject.street || '');
  formData.append('landmark', this.formObject.landmark || '');

  // 💰 Selling Details
  formData.append('expectedPrice', this.formObject.expectedPrice?.toString() || '');
  formData.append('ownershipType', this.formObject.ownershipType || '');
  formData.append('priceNegotiable', this.formObject.priceNegotiable?.toString() || 'false');
  formData.append('availableFrom', this.formObject.availableFrom || '');

  // Handle List: idealFor
  if (Array.isArray(this.formObject.idealFor)) {
    this.formObject.idealFor.forEach((v: string) => formData.append('idealFor', v));
  } else {
    formData.append('idealFor', '');
  }

  // 🧱 Amenities
  formData.append('powerBackup', this.formObject.powerBackup || '');
  formData.append('lift', this.formObject.lift || '');
  formData.append('parking', this.formObject.parking || '');
  formData.append('noOfParkingSlots', this.formObject.noOfParkingSlots || '');
  formData.append('washrooms', this.formObject.washrooms || '');
  formData.append('waterStorageFacility', this.formObject.waterStorageFacility || '');
  formData.append('security', this.formObject.security || '');
  formData.append('wifi', this.formObject.wifi || '');
  formData.append('currentPropertyCondition', this.formObject.currentPropertyCondition || '');
  formData.append('currentRunningBusiness', this.formObject.currentRunningBusiness || '');
  formData.append('addDirectionsTip', this.formObject.addDirectionsTip || '');

  // 🗓 Schedule / Visit Details
  formData.append('propertyDescription', this.formObject.propertyDescription || '');
  formData.append('previousOccupancy', this.formObject.previousOccupancy || '');
  formData.append('whoWillShowProperty', this.formObject.whoWillShowProperty || '');
  formData.append('propertyPainted', this.formObject.propertyPainted || '');
  formData.append('propertyCleaned', this.formObject.propertyCleaned || '');
  formData.append('ownerAvailability', this.formObject.ownerAvailability || '');
  formData.append('fromTime', this.formObject.fromTime || '');
  formData.append('toTime', this.formObject.toTime || '');

  // 📸 Gallery Images (Optional)
  const photoFields = [
    'propertyPhotos1',
    'propertyPhotos2',
    'propertyPhotos3',
    'propertyPhotos4',
    'propertyPhotos5',
    'propertyPhotos6',
    'propertyPhotos7',
  ];
  photoFields.forEach((field) => {
    const file = (this as any)[field];
    if (file) {
      formData.append(field, file);
    }
  });

  // 📤 Submit to API
  this.postPropertiesService.postcommercialSellAds(formData).subscribe({
    next: (response) => {
      console.log('✅ Post successful:', response);
      this.router.navigate(['/']); // redirect to home or dashboard
    },
    error: (error) => {
      console.error('❌ Post failed:', error);
    },
  });
}

}

//monthlyMaintainence
//landmarkStreet
