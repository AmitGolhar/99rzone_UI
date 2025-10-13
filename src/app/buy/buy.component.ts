import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostPropertiesService } from '@app/services/post-properties.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  cities: string[] = ['Pune', 'Mumbai', 'Bangalore', 'Delhi', 'Chennai'];
  selectedCity: string = '';
  query: string = '';
  selectedTab: string = '';
  propertiesList: any = [];
  currentSelectedProperty: any;

  properties: any[] = [];
  page = 0;
  size = 3;
  isLoading = false;
  hasMore = true;
  pageLoading = false;
  searchParams:any;

  constructor(
    private router: Router,
     private route: ActivatedRoute,
    private postPropertiesService: PostPropertiesService
  ) {}

  ngOnInit() {
      this.route.params.subscribe((params) => {
      this.searchParams = params;
 
    });

    this.getSearchQueryListOfProperties();
    this.loadProperties();
  }

  getSearchQueryListOfProperties(){
    const searchquery = this.searchParams;
    this.postPropertiesService.getResellFlats(this.searchParams).subscribe(data => {
      console.log(data)
      this.propertiesList.push(...data);
    })
  
  }
  loadProperties() {
    if (this.isLoading || !this.hasMore) return;
    this.pageLoading = true;
    this.isLoading = true;
    this.postPropertiesService
      .getResellFlatslistOfProperties(this.page, this.size)
      .subscribe(
        (data: { content: any; last: any }) => {
          this.propertiesList.push(...data.content);
          this.hasMore = !data.last;
          this.page++;
          this.isLoading = false;
          this.pageLoading = false;
          console.log(this.propertiesList);
        },
        (error: any) => {
          console.error('Error loading properties', error);
          this.isLoading = false;
        }
      );
  }

  onScroll() {
   // this.loadProperties();
  }
  formatTimeToDate(time: string): Date {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds || 0);
    return date;
  }

  getSelectedProperty(selectedProperty: any) {
    this.currentSelectedProperty = selectedProperty;
    console.log(this.currentSelectedProperty);
  }

  sendWhatsAppInterest(property: any): void {
    const phone =  '918275201039'

    const message = encodeURIComponent(
      `Hello ${property.name},

I'm genuinely interested in your property listed on your platform. Please find below the details I'm referring to:

🏠 *Property Information*
- Posted By: ${property.postedBy || ''}  
- Property Type: ${property.propertyType || ''}  
- Available For: ${property.propertyAdsType || ''}  
- Date Posted: ${property.date|| ''}  

📐 *Property Details*
- Apartment Type: ${property.apartmentType}
- BHK: ${property.bhkType}
- Floor: ${property.floor} / ${property.totalFloor}
- Facing: ${property.facing}
- Apartment Name: ${property.apartmentName}
- Property Age: ${property.propertyAge}
- Built-Up Area: ${property.builtUpArea} SQFT
- Status: ${property.propertyStatus}
- Availability: ${property.availabilityStatus}
- Purpose: ${property.purposeStatus}

📍 *Location*
- City: ${property.city}
- Locality: ${property.locality}
- Landmark: ${property.landmarkStreet}

💰 *Rental Info*
- Rent Type: ${property.rentType}
- Expected Rent: ₹${property.expectedRent}
- Deposit: ₹${property.expectedDeposite}
- Rent Negotiable: ${property.rentNegotiable ? 'Yes' : 'No'}
- Maintenance Type: ${property.monthlyMaintainence}
- Maintenance Amount: ₹${property.maintainenceAmount}
- Available From: ${property.availableFrom}
- Furnishing: ${property.furnishingStatus}
- Parking: ${property.parking}
- Preferred Tenants: ${property.preferredTenants}
- Description: ${property.description}

🚿 *Amenities*
- Bathrooms: ${property.bathroom}
- Balconies: ${property.balcony}
- Water Supply: ${property.waterSupply}
- Gym: ${property.gym ? 'Yes' : 'No'}
- Non-Veg Allowed: ${property.nonvegAllowed ? 'Yes' : 'No'}
- Gated Security: ${property.gateSecurity ? 'Yes' : 'No'}
- Who Will Show: ${property.whoWillShowProperty}
- Condition: ${property.currentPropertyCondition}
- Alternate Number: ${property.alternateNumber}
- Amenities: ${property.availableAmenities}

Please let me know if the property is still available and when would be a good time to discuss or schedule a visit.

Regards,
XXXXXXXX`
    );

    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
}
