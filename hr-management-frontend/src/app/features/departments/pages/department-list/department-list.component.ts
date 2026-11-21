import { Component, OnInit, inject } from '@angular/core';
import { finalize } from 'rxjs';

import { DepartementResponse } from '../../../../core/models';
import { DepartmentService } from '../../../../core/services/department.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  standalone: false
})
export class DepartmentListComponent implements OnInit {
  private readonly departmentService = inject(DepartmentService);
  private readonly notifications = inject(NotificationService);

  departments: DepartementResponse[] = [];
  loading = false;

  toDelete: DepartementResponse | null = null;
  deleting = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.departmentService
      .getAll()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({ next: list => (this.departments = list) });
  }

  askDelete(department: DepartementResponse): void {
    this.toDelete = department;
  }

  cancelDelete(): void {
    if (!this.deleting) this.toDelete = null;
  }

  confirmDelete(): void {
    if (!this.toDelete) return;
    const target = this.toDelete;
    this.deleting = true;
    this.departmentService
      .delete(target.departementId)
      .pipe(finalize(() => (this.deleting = false)))
      .subscribe({
        next: () => {
          this.notifications.success(`Département « ${target.departementName} » supprimé.`);
          this.toDelete = null;
          this.load();
        },
        error: () => (this.toDelete = null)
      });
  }
}
