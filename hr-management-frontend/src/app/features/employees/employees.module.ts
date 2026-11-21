import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';

@NgModule({
  declarations: [EmployeeListComponent, EmployeeFormComponent],
  imports: [SharedModule, EmployeesRoutingModule]
})
export class EmployeesModule {}
