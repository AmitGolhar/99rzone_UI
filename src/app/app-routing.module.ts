import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PropertyMapComponent } from './components/property-map/property-map.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { ExcelUploadComponent } from './components/excel-upload/excel-upload.component';
import { PricingPlansComponent } from './shared/pricing-plans/pricing-plans.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuard]},
  { path: 'buy', loadChildren: () => import('./buy/buy.module').then(m => m.BuyModule) ,canActivate: [AuthGuard]},
  { path: 'rent', loadChildren: () => import('./rent/rent.module').then(m => m.RentModule) ,canActivate: [AuthGuard]},
  { path: 'commercial', loadChildren: () => import('./commercial/commercial.module').then(m => m.CommercialModule),canActivate: [AuthGuard]},
  { path: 'post-property', loadChildren: () => import('./post-property/post-property.module').then(m => m.PostPropertyModule) ,canActivate: [AuthGuard]},
  { path: 'crm', loadChildren: () => import('./crm/crm.module').then(m => m.CrmModule) ,canActivate: [AuthGuard]},
  { path: 'check_on_map', component: PropertyMapComponent ,canActivate: [AuthGuard]},
  { path: 'excel-upload', component: ExcelUploadComponent },
  { path: 'pricing', component: PricingPlansComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
