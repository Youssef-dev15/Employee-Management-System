import { EmployeeResponse, Gender } from './employee.model';
import { SpringPage } from './page.model';

export interface DepartmentStat {
  departmentName: string;
  employeeCount: number;
}

export interface EmployeeReport {
  totalEmployees: number;
  employeesByDepartment: DepartmentStat[];
  filteredEmployees: SpringPage<EmployeeResponse>;
}

/** Paramètres (tous optionnels) de GET /api/reports/employees */
export interface ReportFilter {
  departementId?: string | null;
  gender?: Gender | null;
  keyword?: string | null;
  page?: number;
  size?: number;
  /** ex: "name,asc" ou "name,desc" */
  sort?: string;
}
