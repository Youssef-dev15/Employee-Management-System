import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { DepartementRequest, DepartementResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/department`;

  getAll(): Observable<DepartementResponse[]> {
    return this.http.get<DepartementResponse[]>(`${this.baseUrl}/uploadAllDepartement`);
  }

  create(body: DepartementRequest): Observable<DepartementResponse> {
    return this.http.post<DepartementResponse>(`${this.baseUrl}/addDepartement`, body);
  }

  update(id: string, body: DepartementRequest): Observable<DepartementResponse> {
    return this.http.put<DepartementResponse>(`${this.baseUrl}/updateDepartement/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteDepartement/${id}`);
  }
}
