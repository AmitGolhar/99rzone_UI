import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmRoutingModule } from './crm-routing.module';
 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
 import { CrmDashboardComponent } from './components/dashboard/crm-dashboard.component';
import { FinanceModule } from './finance/finance.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TodoListComponent } from './components/todo-list/todo-list.component';
 import { AdminInternalComponent } from './components/admin-internal/admin-internal.component';
import { ClientInteractionComponent } from './components/client-interaction/client-interaction.component';
import { ClientSupportComponent } from './components/client-support/client-support.component';
import { CustomSmartComponent } from './components/custom-smart/custom-smart.component';
import { LeadManagementComponent } from './components/lead-management/lead-management.component';
import { LegalDocumentationComponent } from './components/legal-documentation/legal-documentation.component';
import { MarketingOutreachComponent } from './components/marketing-outreach/marketing-outreach.component';
import { PropertyListingComponent } from './components/property-listing/property-listing.component';
import { CrmLayoutComponent } from './crm-layout/crm-layout.component';
 import { SharedModule } from '@app/shared/shared.module';
 

@NgModule({
  declarations: [
    CrmLayoutComponent,
    LeadManagementComponent,
    PropertyListingComponent,
    ClientInteractionComponent,
    MarketingOutreachComponent,
    LegalDocumentationComponent,
    ClientSupportComponent,
    AdminInternalComponent,
    CustomSmartComponent,
    FilterPipe,
    CrmDashboardComponent,
    TodoListComponent,
     
    
  ],
  imports: [
 
    CommonModule,
 
    CrmRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FinanceModule,
    DragDropModule,
     SharedModule
  ]
})
export class CrmModule { }
