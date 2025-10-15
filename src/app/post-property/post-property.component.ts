import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-property',
  templateUrl: './post-property.component.html',
  styleUrls: ['./post-property.component.css']
})
export class PostPropertyComponent {
  posted_By = ['Owner', 'Agent', 'Developer', 'Premium Agent'];
  formData = {
    name: '',
    email: '',
    mobileNo: '',
    postedBy: '',
    propertyType: 'Residential',
    propertyAdsType: 'Rent',

  };


  constructor(private router: Router, private route: ActivatedRoute) { }



  onSubmit() {

    this.formData.propertyAdsType = this.formData.propertyAdsType;
    this.formData.propertyType = this.formData.propertyType
    console.log(this.formData)
    if (this.formData.propertyType == "Residential" && this.formData.propertyAdsType == "Rent") {
      this.router.navigate(['post-property/residential_rent', this.formData], { relativeTo: this.route });
    }
    if (this.formData.propertyType == "Residential" && this.formData.propertyAdsType == "Resale") {
      this.router.navigate(['post-property/residential_sell', this.formData], { relativeTo: this.route });
    }

    if (this.formData.propertyType == "Commercial" && this.formData.propertyAdsType == "Rent") {
      this.router.navigate(['post-property/commercial_rent', this.formData], { relativeTo: this.route });
    }
    if (this.formData.propertyType == "Commercial" && this.formData.propertyAdsType == "Sale") {
      this.router.navigate(['post-property/commercial_sell', this.formData], { relativeTo: this.route });
    }


  }

  getpropertyType(type: any) {
    this.formData.propertyType = type;

  }

  getpropertyAdsType(adsType: any) {
    this.formData.propertyAdsType = adsType;
  }





}
