import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject, catchError, debounceTime, of, startWith, switchMap, takeUntil, tap } from 'rxjs';

import {
  DepartementResponse,
  DepartmentStat,
  EmployeeReport,
  GENDER_OPTIONS,
  Gender,
  ReportFilter
} from '../../../../core/models';
import { DepartmentService } from '../../../../core/services/department.service';
import { ReportService } from '../../../../core/services/report.service';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  standalone: false
})
export class EmployeeReportComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly reportService = inject(ReportService);
  private readonly departmentService = inject(DepartmentService);

  private readonly refresh$ = new Subject<void>();
  private readonly destroy$ = new Subject<void>();

  readonly genders = GENDER_OPTIONS;

  readonly filterForm = this.fb.group({
    keyword: this.fb.nonNullable.control(''),
    departementId: this.fb.control<string | null>(null),
    gender: this.fb.control<Gender | null>(null)
  });

  departments: DepartementResponse[] = [];
  report: EmployeeReport | null = null;
  loading = false;
  failed = false;

  page = 0;
  size = 10;
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.departmentService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: list => (this.departments = list) });

    // Tout changement de filtre : retour page 0, après 300 ms de pause de saisie.
    this.filterForm.valueChanges
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe(() => {
        this.page = 0;
        this.refresh$.next();
      });

    // switchMap annule la requête précédente si une nouvelle arrive.
    this.refresh$
      .pipe(
        startWith(undefined),
        tap(() => {
          this.loading = true;
          this.failed = false;
        }),
        switchMap(() =>
          this.reportService.getEmployeeReport(this.buildFilter()).pipe(
            catchError(() => {
              this.failed = true;
              return of(null);
            })
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(report => {
        this.report = report ?? this.report;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get maxDepartmentCount(): number {
    return Math.max(1, ...(this.report?.employeesByDepartment.map(s => s.employeeCount) ?? [0]));
  }

  barWidth(stat: DepartmentStat): number {
    return (stat.employeeCount / this.maxDepartmentCount) * 100;
  }

  get hasActiveFilters(): boolean {
    const v = this.filterForm.getRawValue();
    return !!(v.keyword.trim() || v.departementId || v.gender);
  }

  toggleSort(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.page = 0;
    this.refresh$.next();
  }

  goToPage(page: number): void {
    this.page = page;
    this.refresh$.next();
  }

  changeSize(size: number): void {
    this.size = size;
    this.page = 0;
    this.refresh$.next();
  }

  resetFilters(): void {
    this.filterForm.reset({ keyword: '', departementId: null, gender: null });
  }

  /** Clic sur une barre du graphique : filtre sur ce département. */
  filterByDepartment(stat: DepartmentStat): void {
    const department = this.departments.find(d => d.departementName === stat.departmentName);
    if (department) this.filterForm.patchValue({ departementId: department.departementId });
  }

  private buildFilter(): ReportFilter {
    const v = this.filterForm.getRawValue();
    return {
      keyword: v.keyword,
      departementId: v.departementId,
      gender: v.gender,
      page: this.page,
      size: this.size,
      sort: `name,${this.sortDirection}`
    };
  }
}
