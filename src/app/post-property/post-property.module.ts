import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PostPropertyComponent } from './post-property.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PostPropertyRoutingModule } from './post-property-routing.module';

 
@NgModule({
  declarations: [
    PostPropertyComponent, 
    PropertyDetailsComponent],
  imports: [
    CommonModule,
     FormsModule,
      PostPropertyRoutingModule
    ],
})
export class PostPropertyModule { }
