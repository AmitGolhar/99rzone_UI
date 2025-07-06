import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PostPropertyComponent } from './post-property.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PostPropertyRoutingModule } from './post-property-routing.module';
import { ResidentialRentComponent } from './residential-rent/residential-rent.component';
import { ResidentialResellComponent } from './residential-resell/residential-resell.component';
import { CommercialRentComponent } from './commercial-rent/commercial-rent.component';
import { CommercialSellComponent } from './commercial-sell/commercial-sell.component';
import { ResidentialPghostelComponent } from './residential-pghostel/residential-pghostel.component';
import { ResidentialFlatmatesComponent } from './residential-flatmates/residential-flatmates.component';
import { LandPlotSellComponent } from './land-plot-sell/land-plot-sell.component';
import { LandPlotResellComponent } from './land-plot-resell/land-plot-resell.component';
import { VillaSellComponent } from './villa-sell/villa-sell.component';
import { VillaResellComponent } from './villa-resell/villa-resell.component';
import { VillaRentComponent } from './villa-rent/villa-rent.component';
import { NewLaunchComponent } from './new-launch/new-launch.component';
import { ProjectsComponent } from './projects/projects.component';

 
@NgModule({
  declarations: [
    PostPropertyComponent, 
    PropertyDetailsComponent, ResidentialRentComponent, ResidentialResellComponent, CommercialRentComponent, CommercialSellComponent, ResidentialPghostelComponent, ResidentialFlatmatesComponent, LandPlotSellComponent, LandPlotResellComponent, VillaSellComponent, VillaResellComponent, VillaRentComponent, NewLaunchComponent, ProjectsComponent],
  imports: [
    CommonModule,
     FormsModule,
    PostPropertyRoutingModule
    ],
})
export class PostPropertyModule { }
