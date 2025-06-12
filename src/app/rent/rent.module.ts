import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentRoutingModule } from './rent-routing.module';
import { RentComponent } from './rent.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RentRoutingModule
  ]
})
export class RentModule { }
