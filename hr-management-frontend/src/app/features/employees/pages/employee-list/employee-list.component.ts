import { Component, OnInit, inject } from '@angular/core';
import { finalize } from 'rxjs';

import { EmployeeResponse } from '../../../../core/models';
import { EmployeeService } from '../../../../core/services/employee.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  standalone: false
})
export class EmployeeListComponent implements OnInit {
  private readonly employeeService = inject(EmployeeService);
  private readonly notifications = inject(NotificationService);

  employees: EmployeeResponse[] = [];
  search = '';
  loading = false;

  toDelete: EmployeeResponse | null = null;
  deleting = false;

  /** Filtrage local rapide (la recherche paginée côté serveur est dans « Rapports »). */
  get filtered(): EmployeeResponse[] {
    const term = this.search.trim().toLowerCase();
    if (!term) return this.employees;
    return this.employees.filter(e =>
      [e.name, e.email, e.departementName, e.city].some(v => v?.toLowerCase().includes(term))
    );
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.employeeService
      .getAll()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({ next: list => (this.employees = list) });
  }

  onSearch(event: Event): void {
    this.search = (event.target as HTMLInputElement).value;
  }

  askDelete(employee: EmployeeResponse): void {
    this.toDelete = employee;
  }

  cancelDelete(): void {
    if (!this.deleting) this.toDelete = null;
  }

  confirmDelete(): void {
    if (!this.toDelete) return;
    const target = this.toDelete;
    this.deleting = true;
    this.employeeService
      .delete(target.employeeID)
      .pipe(finalize(() => (this.deleting = false)))
      .subscribe({
        next: () => {
          this.notifications.success(`Employé « ${target.name} » supprimé.`);
          this.toDelete = null;
          this.load();
        },
        error: () => (this.toDelete = null)
      });
  }
}
