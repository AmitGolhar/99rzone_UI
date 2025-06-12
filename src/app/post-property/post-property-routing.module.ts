import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostPropertyComponent } from './post-property.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';

const routes: Routes = [
  { path: '', component: PostPropertyComponent },
  {path:'post-property/details', component:PropertyDetailsComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostPropertyRoutingModule { }
