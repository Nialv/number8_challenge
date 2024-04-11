export interface Employee {
  id?: string;
  first_name: string;
  last_name: string;
  hire_date: Date;
  department_id: string;
  phone: string;
  address: string;
  active: boolean;
  department_history?: DepartmentHistoryItem[];
  avatar_path?: string;
}
