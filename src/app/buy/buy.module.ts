import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyRoutingModule } from './buy-routing.module';
import { BuyComponent } from './buy.component';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
 import { HttpClientModule } from '@angular/common/http';
 import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BuyComponent,
  ],
  imports: [
       CommonModule,
       FormsModule,
       BuyRoutingModule,
       InfiniteScrollModule,
       HttpClientModule,
       SharedModule
  ]
})
export class BuyModule { }
