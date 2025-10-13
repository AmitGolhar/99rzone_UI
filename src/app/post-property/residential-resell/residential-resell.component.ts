import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostPropertiesService } from 'src/app/services/post-properties.service';

@Component({
  selector: 'app-residential-resell',
  templateUrl: './residential-resell.component.html',
  styleUrls: ['./residential-resell.component.css'],
})
export class ResidentialResellComponent implements OnInit {
  currentStep = 1;
  // Step list
  steps: string[] = [
    'Resell Property Details',
    'Locality Details',
    'Resell Details',
    'Amenities',
    'Gallery',
    'Schedule',
  ];

  formData = {
    apartmentType: '',
    bhkType: '',
    floor: '',
    totalFloor: '',
    propertyAge: '',
    facing: '',
    builtUpArea: '',
    carpetArea: '',
    floorType: '',
    leaseYears: '',
    apartmentName: '',
    propertyType: '',
    propertyStatus: '',
    rentalType: '',
    availabilityStatus: '',
    purposeStatus: '',
    commercialPropertyType: '',
    buyPropertyType: '',
    ownershipType: '',
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

  locationData = {
    city: '',
    locality: '',
    landmark: '',
  };

  rentalData: {
    expectedPrice: string;
    maintenanceCost: string;
    isPriceNegotiable: boolean;
    isCurrentlyUnder: boolean;
    availableFrom: string;
    furnishing: string;
    parking: string;
    description: string;
    kitchenType: string;
  } = {
    expectedPrice: '',
    maintenanceCost: '',
    isPriceNegotiable: false,
    isCurrentlyUnder: false,
    availableFrom: '',
    furnishing: '',
    parking: '',
    kitchenType: '',
    description: '',
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
    powerBackup: '',
    gatedSecurity: true,
    whoWillShowProperty: '',
    currentPropertyCondition: '',
    secondaryNumber: '',
    availableAmenities: [] as string[],
    selectedCount: 0,
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
    allotmentLetterAvailable: '',
    saleDeedCertificateAvailable: '',
    paidPropertyTax: '',
    occupancyCertificateAvailable: '',
  };

  postPropertyParentForm: any;

  formObject: any = {
    name: '',
    email: '',
    propertyPostedDate: '',
    mobileNo: '',
    postedBy: '',
    propertyType: '',
    propertyAdsType: '',
    apartmentName: '',
    apartmentType: '',
    bhkType: '',
    plotArea: '',
    ownershipType: '',
    leaseYears: '',
    builtUpArea: '',
    carpetArea: '',
    propertyAge: '',
    facing: '',
    floorType: '',
    floor: '',
    totalFloor: '',
    city: '',
    locality: '',
    landmark: '',
    expectedPrice: '',
    maintenanceCost: '',
    isPriceNegotiable: '',
    isCurrentlyUnder: '',
    availableFrom: '',
    kitchenType: '',
    furnishing: '',
    parking: '',
    description: '',
    bathroom: '',
    balcony: '',
    waterSupply: '',
    gym: '',
    powerBackup: '',
    gatedSecurity: '',
    whoWillShowProperty: '',
    currentPropertyCondition: '',
    secondaryNumber: '',
    availableAmenities: [],
    propertyStatus: '',
    availabilityStatus: '',
    purposeStatus: '',
    ownerAvailability: '',
    fromTime: '',
    toTime: '',
    allotmentLetterAvailable: '',
    saleDeedCertificateAvailable: '',
    paidPropertyTax: '',
    occupancyCertificateAvailable: '',
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
        propertyPostedDate: formattedDate,
        mobileNo: this.postPropertyParentForm.mobileNo,
        postedBy: this.postPropertyParentForm.postedBy,
        propertyType: this.postPropertyParentForm.propertyType || 'Residential',
        propertyAdsType: this.postPropertyParentForm.propertyAdsType,
      };
      console.log(this.formObject);
    });
  }

  setAvailability(value: string) {
    this.scheduleData.ownerAvailability = value;
  }
  isScheduleValid(): boolean {
    const s = this.scheduleData;
    return (
      !!s.ownerAvailability &&
      !!s.fromTime &&
      !!s.toTime &&
      !!s.allotmentLetterAvailable &&
      !!s.saleDeedCertificateAvailable &&
      !!s.paidPropertyTax &&
      !!s.occupancyCertificateAvailable
    );
  }
  removePhoto(photo: string) {
    this.uploadedPhotos = this.uploadedPhotos.filter((p) => p !== photo);
    this.photoCount = this.uploadedPhotos.length;
  }

  onAmenityChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (input.checked) {
      if (!this.amenities.availableAmenities.includes(value)) {
        this.amenities.availableAmenities.push(value);
      }
    } else {
      const idx = this.amenities.availableAmenities.indexOf(value);
      if (idx > -1) this.amenities.availableAmenities.splice(idx, 1);
    }

    // update selectedCount for the hidden required control
    this.amenities.selectedCount = this.amenities.availableAmenities.length;
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
    this.formObject.apartmentName = data.apartmentName;
    this.formObject.apartmentType = data.apartmentType;
    this.formObject.bhkType = data.bhkType;
    this.formObject.plotArea = data.plotArea || '';
    this.formObject.builtUpArea = data.builtUpArea;
    this.formObject.ownershipType = data.ownershipType;
    this.formObject.leaseYears = data.leaseYears;
    this.formObject.facing = data.facing;
    this.formObject.floor = data.floor;
    this.formObject.propertyAge = data.propertyAge;
    this.formObject.carpetArea = data.carpetArea;
    this.formObject.floorType = data.floorType; // going wrong value while posting
    this.formObject.totalFloor = data.totalFloor;
    console.log(this.formObject);
  }

  step2Form(data: any) {
    this.formObject.city = data.city;
    this.formObject.landmark = data.landmark;
    this.formObject.locality = data.locality;

    console.log(this.formObject);
  }
  step3Form(data: any) {
    this.formObject.expectedPrice = data.expectedPrice;
    this.formObject.maintenanceCost = data.maintenanceCost;
    this.formObject.isPriceNegotiable = data.isPriceNegotiable;
    this.formObject.isCurrentlyUnder = data.isCurrentlyUnder;
    this.formObject.availableFrom = data.availableFrom;
    this.formObject.kitchenType = data.kitchenType;
    this.formObject.furnishing = data.furnishing;
    this.formObject.parking = data.parking;
    this.formObject.description = data.description;
    console.log(this.formObject);
  }
  step4Form(data: any) {

    this.formObject.balcony = data.balcony;
    this.formObject.bathroom = data.bathroom;
    this.formObject.gatedSecurity = data.gatedSecurity;
    this.formObject.gym = data.gym;
    this.formObject.powerBackup = data.powerBackup;
    this.formObject.currentPropertyCondition = data.currentPropertyCondition;
    this.formObject.secondaryNumber = data.secondaryNumber;
    this.formObject.availableAmenities = data.availableAmenities;
    this.formObject.whoWillShowProperty = data.whoWillShowProperty;
    this.formObject.waterSupply = data.waterSupply;

    console.log(this.formObject);
    // this.nextStep();
  }
  step5Form(data: any) {
    console.log(this.formObject);
  }
  step6Form(data: any) {
    this.formObject.ownerAvailability = data.ownerAvailability;
    this.formObject.fromTime = data.fromTime;
    this.formObject.toTime = data.toTime;
    this.formObject.allotmentLetterAvailable = data.allotmentLetterAvailable;
    this.formObject.saleDeedCertificateAvailable = data.saleDeedCertificateAvailable;
    this.formObject.paidPropertyTax = data.paidPropertyTax;
    this.formObject.occupancyCertificateAvailable = data.occupancyCertificateAvailable;
    console.log(this.formObject);

    if (!this.isScheduleValid()) {
      return;
    }
   // alert('✅ Schedule submitted successfully!');
    this.submitForm();
  }

  submitForm() {
    const formData = new FormData();

    // Required form fields
    formData.append('name', this.formObject.name);
    formData.append('email', this.formObject.email);
     formData.append('mobileNo', this.formObject.mobileNo);
    formData.append('postedBy', this.formObject.postedBy);
    formData.append('propertyType', this.formObject.propertyType);
    formData.append('propertyAdsType', this.formObject.propertyAdsType);
    formData.append('propertyPostedDate', this.formObject.propertyPostedDate);

    // PropertyDetails
    formData.append('apartmentName', this.formObject.apartmentName);
    formData.append('apartmentType', this.formObject.apartmentType);
    formData.append('bhkType', this.formObject.bhkType);
    formData.append('plotArea', this.formObject.plotArea || '');
    formData.append('builtUpArea', this.formObject.builtUpArea);
    formData.append('ownershipType', this.formObject.ownershipType);
    formData.append('leaseYears', this.formObject.leaseYears);
    formData.append('facing', this.formObject.facing);
    formData.append('floor', this.formObject.floor);
    formData.append('propertyAge', this.formObject.propertyAge);
    formData.append('carpetArea', this.formObject.carpetArea);
    formData.append('floorType', this.formObject.floorType);
    formData.append('totalFloor', this.formObject.totalFloor);

    // LocalityDetails
    formData.append('city', this.formObject.city);
    formData.append('locality', this.formObject.locality);
    formData.append('landmark', this.formObject.landmark);

    // RentalDetails
    formData.append('expectedPrice', this.formObject.expectedPrice);
    formData.append('maintenanceCost', this.formObject.maintenanceCost);
    formData.append('kitchenType', this.formObject.kitchenType);
    formData.append('isPriceNegotiable', this.formObject.isPriceNegotiable);
    formData.append('isCurrentlyUnder', this.formObject.isCurrentlyUnder);
    formData.append('availableFrom', this.formObject.availableFrom);
    formData.append('furnishing', this.formObject.furnishing);
    formData.append('parking', this.formObject.parking);
    formData.append('description', this.formObject.description);

    // Amenities

    formData.append('bathroom', this.formObject.bathroom);
    formData.append('balcony', this.formObject.balcony);
    formData.append('waterSupply', this.formObject.waterSupply);
    formData.append('gym', this.formObject.gym);
    formData.append('powerBackup', this.formObject.powerBackup);
    formData.append('gatedSecurity', this.formObject.gatedSecurity);
    formData.append('whoWillShowProperty', this.formObject.whoWillShowProperty);
    formData.append('currentPropertyCondition',this.formObject.currentPropertyCondition );
    formData.append('secondaryNumber', this.formObject.secondaryNumber || '');
    formData.append('availableAmenities', this.formObject.availableAmenities);

 

    // Optional: Gallery image files

    formData.append('propertyPhotos1', this.propertyPhotos1);
    formData.append('propertyPhotos2', this.propertyPhotos2);
    formData.append('propertyPhotos3', this.propertyPhotos3);
    formData.append('propertyPhotos4', this.propertyPhotos4);
    formData.append('propertyPhotos5', this.propertyPhotos5);
    formData.append('propertyPhotos6', this.propertyPhotos6);
    formData.append('propertyPhotos7', this.propertyPhotos7);

       // Schedule
    formData.append('ownerAvailability', this.formObject.ownerAvailability);
    formData.append('fromTime', this.formObject.fromTime);
    formData.append('toTime', this.formObject.toTime);
    formData.append('allotmentLetterAvailable',this.formObject.allotmentLetterAvailable);
    formData.append('saleDeedCertificateAvailable',this.formObject.saleDeedCertificateAvailable);
    formData.append('paidPropertyTax', this.formObject.paidPropertyTax);
    formData.append('occupancyCertificateAvailable',this.formObject.occupancyCertificateAvailable);

 
    this.postPropertiesService.postResidentialRentAds(formData).subscribe({
      next: (response) => {
        // Handle success (HTTP 200)
        console.log('Post successful:', response);
        this.router.navigate(['/']); // Redirect to home
      },
      error: (error) => {
        // Handle error
        console.error('Post failed:', error);
      },
    });
  }
}

//monthlyMaintainence
//landmarkStreet

