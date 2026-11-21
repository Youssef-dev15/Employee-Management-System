import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepartmentFormComponent } from './pages/department-form/department-form.component';
import { DepartmentListComponent } from './pages/department-list/department-list.component';

const routes: Routes = [
  { path: '', component: DepartmentListComponent },
  { path: 'new', component: DepartmentFormComponent },
  { path: ':id/edit', component: DepartmentFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule {}
