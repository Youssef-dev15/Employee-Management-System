import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { DepartmentFormComponent } from './pages/department-form/department-form.component';
import { DepartmentListComponent } from './pages/department-list/department-list.component';
import { DepartmentsRoutingModule } from './departments-routing.module';

@NgModule({
  declarations: [DepartmentListComponent, DepartmentFormComponent],
  imports: [SharedModule, DepartmentsRoutingModule]
})
export class DepartmentsModule {}
