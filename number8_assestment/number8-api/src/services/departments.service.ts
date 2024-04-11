import * as DepartmentModel from '../models/department.model';
import * as DepartmentHistoryModel from '../models/departmentHistory.model';
import { Department, DepartmentHistoryEntry } from '../types/department';

export const fetchAllDepartments = async (): Promise<Department[]> => {
  return await DepartmentModel.selectAllDepartments();
};

export const fetEmployeeDepartmentHistory = async (
  id: string
): Promise<DepartmentHistoryEntry[]> => {
  return await DepartmentHistoryModel.getDepartmentHistoryForEmployee(id);
};
