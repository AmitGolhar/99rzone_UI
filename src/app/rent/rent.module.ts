import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentRoutingModule } from './rent-routing.module';
import { RentComponent } from './rent.component';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from '@app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    RentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RentRoutingModule,
        InfiniteScrollModule,
        HttpClientModule,
    
  ]
})
export class RentModule { }
