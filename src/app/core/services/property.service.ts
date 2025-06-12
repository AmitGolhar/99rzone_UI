import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Property } from 'src/app/models/property.model';
 
@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  constructor() {}

  getProperties(): Observable<Property[]> {
    // Dummy data for demonstration
    const properties: Property[] = [
      { id: 1, title: '2BHK in Pune', location: 'Baner', price: 4500000 },
      { id: 2, title: '3BHK in Mumbai', location: 'Andheri', price: 8500000 },
      { id: 3, title: '1BHK in Bangalore', location: 'Whitefield', price: 3500000 },
       { id: 4, title: '2BHK in Pune', location: 'Baner', price: 4500000 },
      { id: 5, title: '3BHK in Mumbai', location: 'Andheri', price: 8500000 },
      { id: 6, title: '1BHK in Bangalore', location: 'Whitefield', price: 3500000 },
       { id: 7, title: '2BHK in Pune', location: 'Baner', price: 4500000 },
      { id: 8, title: '3BHK in Mumbai', location: 'Andheri', price: 8500000 },
      { id: 9, title: '1BHK in Bangalore', location: 'Whitefield', price: 3500000 },
            { id: 10, title: '1BHK in Bangalore', location: 'Pune', price: 3500000 },
    ];
    return of(properties);
  }
}
