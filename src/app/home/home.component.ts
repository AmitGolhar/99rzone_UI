import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../core/services/property.service';
import { Property } from '../models/property.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  properties: Property[] = [];
  cities: string[] = ['Pune', 'Mumbai', 'Bangalore', 'Delhi', 'Chennai'];
  selectedCity: string = '';
  query: string = '';
  selectedTab: string = '';

  constructor(
    private propertyService: PropertyService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.propertyService.getProperties().subscribe((data) => {
      this.properties = data;
    });
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
      console.log(data);
    });
  }

  onTabClick(tab: string) {
    this.selectedTab = tab;
    console.log('Selected Tab:', tab);
    // You can now call any logic here based on selected tab
  }

}
