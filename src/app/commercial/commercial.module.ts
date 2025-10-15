import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommercialRoutingModule } from './commercial-routing.module';
import { CommercialComponent } from './commercial.component';
 import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    CommercialComponent,
     
  ],
  imports: [
    CommonModule,
      FormsModule,
      SharedModule,
      CommercialRoutingModule,
      InfiniteScrollModule,
      HttpClientModule,
       

  ]
})
export class CommercialModule { }
