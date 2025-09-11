import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/environment/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class PostPropertiesService {
  constructor(private httpClient: HttpClient) {}

  
  postAds(formdata: any) {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient
      .post(environment.apiUrl + '/residential-rent', formdata,
        
      )
      
  }

  getpostAds() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get(
      environment.apiUrl + '/residential-rent'
    );
    //return this.httpClient.get('http://82.25.108.251:8082/api/post-ads')
  }

  getlistOfProperties(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(
      environment.apiUrl + `/post-ads/getAllProperties?page=${page}&size=${size}`
    );
  }
   getRendedlistOfProperties(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(
      environment.apiUrl + `/residential-rent/list/all?page=${page}&size=${size}`
    );
  }

  getSearchListData(data:any){
    console.log(data);
    const params = new HttpParams()
  .set('apartmentType', data.apartmentType)
  .set('bhkType', data.bhkType)  
  .set('localityCity', data.localityCity)
  .set('withinDays', data.withinDays);
  
    
return this.httpClient.get<any>( environment.apiUrl + '/residential-rent/property-search', {params}) 

  }
}
