import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentRoutingModule } from './rent-routing.module';
import { RentComponent } from './rent.component';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from '@app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
 import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RentComponent],
  imports: [
    CommonModule,
    FormsModule,
    RentRoutingModule,
    InfiniteScrollModule,
    HttpClientModule,
    SharedModule
  ],
})
export class RentModule {}
