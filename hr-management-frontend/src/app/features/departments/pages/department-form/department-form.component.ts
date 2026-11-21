import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { DepartmentService } from '../../../../core/services/department.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  standalone: false
})
export class DepartmentFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly departmentService = inject(DepartmentService);
  private readonly notifications = inject(NotificationService);

  readonly form = this.fb.nonNullable.group({
    departementName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]]
  });

  departmentId: string | null = null;
  loading = false;
  saving = false;

  get isEdit(): boolean {
    return this.departmentId !== null;
  }

  ngOnInit(): void {
    this.departmentId = this.route.snapshot.paramMap.get('id');
    if (this.departmentId) this.loadDepartment(this.departmentId);
  }

  /** L'API n'expose pas de GET par id : on retrouve le département dans la liste. */
  private loadDepartment(id: string): void {
    this.loading = true;
    this.departmentService
      .getAll()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: list => {
          const found = list.find(d => d.departementId === id);
          if (!found) {
            this.notifications.error('Département introuvable.');
            this.router.navigate(['/departments']);
            return;
          }
          this.form.patchValue({ departementName: found.departementName });
        },
        error: () => this.router.navigate(['/departments'])
      });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const body = { departementName: this.form.controls.departementName.value.trim() };
    const request$ = this.departmentId
      ? this.departmentService.update(this.departmentId, body)
      : this.departmentService.create(body);

    this.saving = true;
    request$.pipe(finalize(() => (this.saving = false))).subscribe({
      next: () => {
        this.notifications.success(this.isEdit ? 'Département modifié.' : 'Département créé.');
        this.router.navigate(['/departments']);
      }
    });
  }
}
