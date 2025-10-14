import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 import { Property2 } from '@app/models/property2.model';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  // change this to your backend endpoint if available
  private apiUrl = '/api/properties';

  constructor(private http: HttpClient) {}

  // If you have backend: return this.http.get<Property[]>(this.apiUrl);
  getProperties(): Observable<Property2[]> {
    // fallback mock data (replace with HTTP call if you have backend)
    const mock: Property2[] = [
  {
    id: 1,
    name: 'Amit Golhar',
    postedBy: 'Owner',
    propertyType: 'Apartment',
    propertyAdsType: 'Rent',
    apartmentName: 'Sky Tower',
    bhkType: '3 BHK',
    city: 'Pune',
    locality: 'Wakad',
    builtUpArea: '1100 sqft',
    expectedPrice: 25000,
    availableFrom: '2025-11-01',
    bathroom: 3,
    balcony: 2,
    availableAmenities: ['Lift', 'Club House', 'Garden'],
    latitude: 18.5975,
    longitude: 73.7529
  },
  {
    id: 2,
    name: 'Sunshine Realtors',
    postedBy: 'Broker',
    propertyType: 'Apartment',
    propertyAdsType: 'Sell',
    apartmentName: 'Green Heights',
    bhkType: '2 BHK',
    city: 'Pune',
    locality: 'Kharadi',
    builtUpArea: '880 sqft',
    expectedPrice: 8500000,
    availableFrom: '2025-10-01',
    bathroom: 2,
    balcony: 1,
    availableAmenities: ['Lift', 'Gym', 'Garden'],
    latitude: 18.5382,
    longitude: 73.9148
  },
  {
    id: 3,
    name: 'Elite Realty',
    postedBy: 'Agent',
    propertyType: 'Villa',
    propertyAdsType: 'Sell',
    apartmentName: 'Palm Meadows',
    bhkType: '4 BHK',
    city: 'Bengaluru',
    locality: 'Whitefield',
    builtUpArea: '3200 sqft',
    expectedPrice: 23000000,
    availableFrom: '2025-12-01',
    bathroom: 4,
    balcony: 3,
    availableAmenities: ['Garden', 'Swimming Pool', 'Gym', 'Parking'],
    latitude: 12.9698,
    longitude: 77.7499
  },
  {
    id: 4,
    name: 'Sai Properties',
    postedBy: 'Owner',
    propertyType: 'Apartment',
    propertyAdsType: 'Rent',
    apartmentName: 'Serene Residency',
    bhkType: '2 BHK',
    city: 'Hyderabad',
    locality: 'Gachibowli',
    builtUpArea: '950 sqft',
    expectedPrice: 28000,
    availableFrom: '2025-10-15',
    bathroom: 2,
    balcony: 1,
    availableAmenities: ['Lift', 'Power Backup', 'Club House'],
    latitude: 17.4401,
    longitude: 78.3489
  },
  {
    id: 5,
    name: 'Dream Homes Realty',
    postedBy: 'Broker',
    propertyType: 'Apartment',
    propertyAdsType: 'Sell',
    apartmentName: 'Ocean View',
    bhkType: '3 BHK',
    city: 'Mumbai',
    locality: 'Bandra West',
    builtUpArea: '1450 sqft',
    expectedPrice: 35000000,
    availableFrom: '2025-09-25',
    bathroom: 3,
    balcony: 2,
    availableAmenities: ['Gym', 'Lift', 'Security', 'Garden'],
    latitude: 19.0606,
    longitude: 72.8295
  },
  {
    id: 6,
    name: 'Modern Realtors',
    postedBy: 'Owner',
    propertyType: 'Apartment',
    propertyAdsType: 'Rent',
    apartmentName: 'Urban Nest',
    bhkType: '1 BHK',
    city: 'Mumbai',
    locality: 'Powai',
    builtUpArea: '600 sqft',
    expectedPrice: 32000,
    availableFrom: '2025-11-10',
    bathroom: 1,
    balcony: 1,
    availableAmenities: ['Lift', 'Power Backup'],
    latitude: 19.1176,
    longitude: 72.9042
  },
  {
    id: 7,
    name: 'Royal Developers',
    postedBy: 'Agent',
    propertyType: 'Villa',
    propertyAdsType: 'Sell',
    apartmentName: 'Golden Acres',
    bhkType: '5 BHK',
    city: 'Delhi',
    locality: 'Vasant Kunj',
    builtUpArea: '4000 sqft',
    expectedPrice: 55000000,
    availableFrom: '2026-01-01',
    bathroom: 5,
    balcony: 3,
    availableAmenities: ['Garden', 'Swimming Pool', 'Gym'],
    latitude: 28.5204,
    longitude: 77.1555
  },
  {
    id: 8,
    name: 'Home Connect',
    postedBy: 'Owner',
    propertyType: 'Apartment',
    propertyAdsType: 'Rent',
    apartmentName: 'Lakefront Residency',
    bhkType: '2 BHK',
    city: 'Bengaluru',
    locality: 'Hebbal',
    builtUpArea: '950 sqft',
    expectedPrice: 22000,
    availableFrom: '2025-10-20',
    bathroom: 2,
    balcony: 1,
    availableAmenities: ['Lift', 'Gym', 'Club House'],
    latitude: 13.0351,
    longitude: 77.5970
  },
  {
    id: 9,
    name: 'Metro Realty',
    postedBy: 'Broker',
    propertyType: 'Apartment',
    propertyAdsType: 'Sell',
    apartmentName: 'Silver Springs',
    bhkType: '3 BHK',
    city: 'Hyderabad',
    locality: 'Kondapur',
    builtUpArea: '1200 sqft',
    expectedPrice: 12000000,
    availableFrom: '2025-10-05',
    bathroom: 3,
    balcony: 2,
    availableAmenities: ['Lift', 'Garden', 'Parking'],
    latitude: 17.4696,
    longitude: 78.3570
  },
  {
    id: 10,
    name: 'Aarav Estates',
    postedBy: 'Owner',
    propertyType: 'Apartment',
    propertyAdsType: 'Rent',
    apartmentName: 'Blue Horizon',
    bhkType: '3 BHK',
    city: 'Delhi',
    locality: 'Dwarka Sector 12',
    builtUpArea: '1400 sqft',
    expectedPrice: 38000,
    availableFrom: '2025-12-10',
    bathroom: 3,
    balcony: 2,
    availableAmenities: ['Lift', 'Security', 'Gym'],
    latitude: 28.5922,
    longitude: 77.0498
  }
];

    // return mock for now
    return of(mock);
    // return this.http.get<Property[]>(this.apiUrl);
  }
}
