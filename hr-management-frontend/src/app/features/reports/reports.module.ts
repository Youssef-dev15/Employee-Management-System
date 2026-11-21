import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { EmployeeReportComponent } from './pages/employee-report/employee-report.component';

const routes: Routes = [{ path: '', component: EmployeeReportComponent }];

@NgModule({
  declarations: [EmployeeReportComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class ReportsModule {}
