export interface Department {
  id?: string;
  name: string;
}

export interface DepartmentHistoryEntry {
  id: string;
  employee_id: string;
  old_department_id: string;
  new_department_id: string;
  timestamp: Date;
}
