import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'buy', loadChildren: () => import('./buy/buy.module').then(m => m.BuyModule) },
  { path: 'rent', loadChildren: () => import('./rent/rent.module').then(m => m.RentModule) },
  { path: 'commercial', loadChildren: () => import('./commercial/commercial.module').then(m => m.CommercialModule) },
  { path: 'post-property', loadChildren: () => import('./post-property/post-property.module').then(m => m.PostPropertyModule) },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
