import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../core/services/property.service';
import { Property } from '../models/property.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PostPropertiesService } from '../services/post-properties.service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //properties: Property[] = [];
  cities: string[] = ['Pune', 'Mumbai', 'Bangalore', 'Delhi', 'Chennai'];
  selectedCity: string = '';
  query: string = '';
  selectedTab: string = '';
  propertiesList:any = [];
  currentSelectedProperty:any;

  properties: any[] = [];
  page = 0;
  size = 3;
  isLoading = false;
  hasMore = true;

  constructor(
    private propertyService: PropertyService,
    private http: HttpClient,
    private router: Router,
    private postPropertiesService:PostPropertiesService
  ) {}

  ngOnInit(): void {
   
    this.loadProperties();
  }

  handleAddressChange(query: string) {

if (this.selectedTab === 'Buy') {
      this.router.navigate(['/buy']);
    } else if (this.selectedTab === 'Rent') {
      this.router.navigate(['/rent']);
    }else if (this.selectedTab === 'Commercial') {
      this.router.navigate(['/commercial']);
    }


    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&addressdetails=1`;

    return this.http.get(url).subscribe((data) => {
      
    });
  }

  onTabClick(tab: string) {
    this.selectedTab = tab;
   
    // You can now call any logic here based on selected tab
  }

  getListOfProperties(){
    this.postPropertiesService.getpostAds().subscribe(data => {
      this.propertiesList = data
      
    })
  }
  getSelectedProperty(selectedProperty:any){
    this.currentSelectedProperty = selectedProperty;
     console.log(this.currentSelectedProperty);
  }

  loadProperties() {
  if (this.isLoading || !this.hasMore) return;

  this.isLoading = true;
  this.postPropertiesService.getlistOfProperties(this.page, this.size).subscribe(
    (    data: { content: any; last: any; }) => {
      this.propertiesList.push(...data.content);
      this.hasMore = !data.last;
      this.page++;
      this.isLoading = false;
    },
    (    error: any) => {
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
