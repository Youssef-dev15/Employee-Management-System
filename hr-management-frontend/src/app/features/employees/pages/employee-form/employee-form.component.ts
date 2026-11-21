import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';

import {
  DepartementResponse,
  EmployeeRequest,
  EmployeeResponse,
  GENDER_OPTIONS,
  Gender
} from '../../../../core/models';
import { DepartmentService } from '../../../../core/services/department.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { addressAllOrNothing } from '../../validators/address.validator';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  standalone: false
})
export class EmployeeFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly employeeService = inject(EmployeeService);
  private readonly departmentService = inject(DepartmentService);
  private readonly notifications = inject(NotificationService);

  readonly genders = GENDER_OPTIONS;

  readonly form = this.fb.group({
    name: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2)]),
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    gender: this.fb.nonNullable.control<Gender>('MALE', Validators.required),
    departementId: this.fb.control<string | null>(null),
    adresse: this.fb.group(
      {
        street: this.fb.nonNullable.control(''),
        city: this.fb.nonNullable.control(''),
        country: this.fb.nonNullable.control(''),
        postalCode: this.fb.control<number | null>(null)
      },
      { validators: addressAllOrNothing }
    )
  });

  departments: DepartementResponse[] = [];
  employeeId: string | null = null;
  /** Ville actuelle de l'employé (affichée en édition, le contrat ne renvoie pas le reste de l'adresse). */
  currentCity: string | null = null;
  loading = false;
  saving = false;

  get isEdit(): boolean {
    return this.employeeId !== null;
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.loading = true;

    forkJoin({
      departments: this.departmentService.getAll(),
      // En édition, l'API n'expose pas de GET par id : on retrouve l'employé dans la liste.
      employees: this.employeeId ? this.employeeService.getAll() : [[] as EmployeeResponse[]]
    })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: ({ departments, employees }) => {
          this.departments = departments;
          if (this.employeeId) this.prefill(employees, departments);
        },
        error: () => this.router.navigate(['/employees'])
      });
  }

  private prefill(employees: EmployeeResponse[], departments: DepartementResponse[]): void {
    const employee = employees.find(e => e.employeeID === this.employeeId);
    if (!employee) {
      this.notifications.error('Employé introuvable.');
      this.router.navigate(['/employees']);
      return;
    }

    // La réponse ne contient que le nom du département : on retrouve son id.
    const department = departments.find(d => d.departementName === employee.departementName);
    this.currentCity = employee.city ?? null;
    this.form.patchValue({
      name: employee.name,
      email: employee.email,
      gender: employee.gender,
      departementId: department?.departementId ?? null
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request$ = this.employeeId
      ? this.employeeService.update(this.employeeId, this.buildRequest())
      : this.employeeService.create(this.buildRequest());

    this.saving = true;
    request$.pipe(finalize(() => (this.saving = false))).subscribe({
      next: () => {
        this.notifications.success(this.isEdit ? 'Employé modifié.' : 'Employé créé.');
        this.router.navigate(['/employees']);
      }
    });
  }

  private buildRequest(): EmployeeRequest {
    const value = this.form.getRawValue();
    const a = value.adresse;
    const hasAddress = [a.street, a.city, a.country, a.postalCode].some(
      v => v !== null && String(v).trim() !== ''
    );

    return {
      name: value.name.trim(),
      email: value.email.trim(),
      gender: value.gender,
      departementId: value.departementId || null,
      adresse: hasAddress
        ? {
            street: a.street.trim(),
            city: a.city.trim(),
            country: a.country.trim(),
            postalCode: Number(a.postalCode)
          }
        : null
    };
  }
}
