import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../core/services/property.service';
 import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PostPropertiesService } from '../services/post-properties.service';
  
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //properties: Property[] = [];
  cities: string[] = ['Pune', 'Mumbai', 'Bangalore', 'Delhi', 'Chennai'];
  //selectedCity: string = '';
  query: string = '';
  selectedTab: string = 'Rent';
  propertiesList:any = [];
  currentSelectedProperty:any;

  properties: any[] = [];
  page = 0;
  size = 10;
  isLoading = false;
  hasMore = true;
  pageLoading =false;
 
  apartmentType :string =''
  bhkType:string =''
  localityCity:string = ''
  withinDays: string =''

  constructor(
    private propertyService: PropertyService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private postPropertiesService:PostPropertiesService
  ) {}

  ngOnInit(): void {
   
    this.loadProperties();
  }

  searchProperty(query: string) {
    console.log(this.selectedTab)
    if (this.selectedTab === 'Buy') {
    //  this.router.navigate(['/buy']);
      this.router.navigate(['/buy',{apartmentType:this.apartmentType, bhkType:this.bhkType, localityCity:this.localityCity, withinDays:this.withinDays}], { relativeTo: this.route });
    } else if (this.selectedTab === 'Rent') {

        this.router.navigate(['/rent',{apartmentType:this.apartmentType, bhkType:this.bhkType, localityCity:this.localityCity, withinDays:this.withinDays}], { relativeTo: this.route });
    } else if (this.selectedTab === 'Commercial') {
       this.router.navigate(['/commercial',{apartmentType:this.apartmentType, bhkType:this.bhkType, localityCity:this.localityCity, withinDays:this.withinDays}], { relativeTo: this.route });
    }
  }

  onTabClick(tab: string) {
    this.selectedTab = tab;
   
    // You can now call any logic here based on selected tab
  }

  getListOfProperties1(){
    this.postPropertiesService.getpostAds().subscribe(data => {
     // this.propertiesList = data
      
    })
  }
  getSelectedProperty(selectedProperty:any){
    this.currentSelectedProperty = selectedProperty;
     console.log(this.currentSelectedProperty);
  }

loadProperties() {
  if (this.isLoading || !this.hasMore) return;

  this.isLoading = true;

  this.postPropertiesService.getRendedlistOfProperties(this.page, this.size).subscribe(
    (response: { content: any[]; last: boolean; }) => {
      if (response?.content?.length) {
        this.propertiesList.push(...response.content);
        this.page++;
        this.hasMore = !response.last;
        console.log(this.propertiesList)
      } else {
        this.hasMore = false;
      }

      this.isLoading = false;
    },
    error => {
      console.error('Error loading properties', error);
      this.isLoading = false;
    }
  );
}


onScroll() {
  this.loadProperties();
}
formatTimeToDate(time: string): Date {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, seconds || 0);
  return date;
}


}
