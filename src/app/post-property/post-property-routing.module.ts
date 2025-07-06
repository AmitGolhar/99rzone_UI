import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostPropertyComponent } from './post-property.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { ResidentialRentComponent } from './residential-rent/residential-rent.component';
import { ResidentialResellComponent } from './residential-resell/residential-resell.component';
import { CommercialRentComponent } from './commercial-rent/commercial-rent.component';
import { CommercialSellComponent } from './commercial-sell/commercial-sell.component';

const routes: Routes = [
  { path: '', component: PostPropertyComponent },
  { path: 'post-property/details', component: PropertyDetailsComponent },
  { path: 'post-property/residential_rent', component: ResidentialRentComponent },
  { path: 'post-property/residential_sell', component: ResidentialResellComponent },
  { path: 'post-property/commercial_rent', component: CommercialRentComponent },
  { path: 'post-property/commercial_sell', component: CommercialSellComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostPropertyRoutingModule { }
