 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AsyncFilterPipe } from './async-filter.pipe';

@NgModule({
  declarations: [LoaderComponent,LoginComponent,RegisterComponent,AsyncFilterPipe],
  imports: [CommonModule, FormsModule,RouterModule],
  exports: [LoaderComponent,LoginComponent,RegisterComponent,RouterModule,AsyncFilterPipe] 
})
export class SharedModule { }
