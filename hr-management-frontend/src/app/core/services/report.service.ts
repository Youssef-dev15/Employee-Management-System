import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { EmployeeReport, ReportFilter } from '../models';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/reports`;

  getEmployeeReport(filter: ReportFilter = {}): Observable<EmployeeReport> {
    let params = new HttpParams();

    const keyword = filter.keyword?.trim();
    if (filter.departementId) params = params.set('departementId', filter.departementId);
    if (filter.gender) params = params.set('gender', filter.gender);
    if (keyword) params = params.set('keyword', keyword);
    if (filter.page !== undefined) params = params.set('page', filter.page);
    if (filter.size !== undefined) params = params.set('size', filter.size);
    if (filter.sort) params = params.set('sort', filter.sort);

    return this.http.get<EmployeeReport>(`${this.baseUrl}/employees`, { params });
  }
}
