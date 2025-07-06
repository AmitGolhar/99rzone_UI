import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostPropertiesService } from '@app/services/post-properties.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

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

  constructor(    private router: Router,
      private postPropertiesService:PostPropertiesService){
        
      }


  ngOnInit() {
       this.loadProperties();
  }

  loadProperties() {
  if (this.isLoading || !this.hasMore) return;

  this.isLoading = true;
  this.postPropertiesService.getRendedlistOfProperties(this.page, this.size).subscribe(
    (    data: { content: any; last: any; }) => {
      this.propertiesList.push(...data.content);
      this.hasMore = !data.last;
      this.page++;
      this.isLoading = false;
      console.log(this.propertiesList)
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

  getSelectedProperty(selectedProperty:any){
    this.currentSelectedProperty = selectedProperty;
     console.log(this.currentSelectedProperty);
  }

}
