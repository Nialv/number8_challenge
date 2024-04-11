import { Department } from "./departments";
import { EmployeeResponse } from "./employee";

export interface AuthContextType {
  token: string | null;
  authenticate: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface EmployeesContextType {
  employees: EmployeeResponse[];
  getEmployeeById: (id: string) => Promise<EmployeeResponse | undefined>;
  getAllEmployees: () => Promise<EmployeeResponse[] | null>;
  insertNewEmployee: (
    employee: EmployeeResponse,
    avatar: File
  ) => Promise<void>;
  modifyExistingEmployee: (
    id: string,
    employee: EmployeeResponse
  ) => Promise<void>;
  deleteExistingEmployee: (id: string) => Promise<void>;
  modifyEmployeeDepartmentInHistory: (
    employeeId: string,
    newDepartmentId: string
  ) => Promise<void>;
}

export interface DepartmentsContextType {
  departments: Department[];
  getAllDepartments: () => Promise<void>;
  fetchEmployeeDepartmentHistory: (
    employeeId: string
  ) => Promise<DepartmentHistoryEntry[]>;
}

export interface ProviderProps {
  children: ReactNode;
}
