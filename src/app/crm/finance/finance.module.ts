import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { AgingReportComponent } from './aging-report/aging-report.component';
import { RevenueDashboardComponent } from './revenue-dashboard/revenue-dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { FollowupAutomationComponent } from './followup-automation/followup-automation.component';
import { IncentiveComponent } from './incentive/incentive.component';
import { ExpenseTrackerComponent } from './expense-tracker/expense-tracker.component';



@NgModule({
  declarations: [
    PaymentListComponent,
    PaymentFormComponent,
    FilterPipe,
     AgingReportComponent,
    RevenueDashboardComponent,
    AttendanceComponent,
    FollowupAutomationComponent,
    IncentiveComponent,
    ExpenseTrackerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
     PaymentListComponent,
    PaymentFormComponent,
    FilterPipe,
    AgingReportComponent,
    RevenueDashboardComponent,
    AttendanceComponent,
    FollowupAutomationComponent,
    IncentiveComponent,
    ExpenseTrackerComponent
  ]
})
export class FinanceModule { }
