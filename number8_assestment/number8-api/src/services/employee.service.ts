import { randomUUID } from 'crypto';
import * as EmployeeModel from '../models/employee.model';
import * as DepartmentHistoryModel from '../models/departmentHistory.model';
import { Employee } from '../types/employee';
import fs from 'fs/promises';
import path from 'path';
import { DepartmentHistoryEntry } from '../types/department';

const AVATAR_DIR = path.join(__dirname, '..', 'avatars');

fs.mkdir(AVATAR_DIR, { recursive: true });

export const fetchAllEmployees = async (): Promise<Employee[]> => {
  return EmployeeModel.selectAllEmployees();
};

export const fetchEmployeeById = async (
  id: string
): Promise<Employee | null> => {
  return EmployeeModel.selectEmployeeById(id);
};

export const registerNewEmployee = async (
  employee: Employee,
  avatar?: Express.Multer.File
): Promise<void> => {
  try {
    if (avatar) {
      const avatarFileName = `${employee.id}.jpg`;
      const avatarPath = path.join(AVATAR_DIR, avatarFileName);
      await fs.writeFile(avatarPath, avatar.buffer);
      employee.avatar_path = `avatars/${avatarFileName}`;
    }

    await EmployeeModel.insertNewEmployee(employee);
  } catch (error) {
    console.error('Error registering new employee:', error);
    throw error;
  }
};

export const modifyEmployeeDetails = async (
  id: string,
  employee: Partial<Employee>
): Promise<void> => {
  await EmployeeModel.updateEmployeeDetails(id, employee);
};

export const deleteExistingEmployee = async (id: string): Promise<void> => {
  await EmployeeModel.deleteEmployeeById(id);
};

export const updateEmployeeDepartment = async (
  employee_id: string,
  new_department_id: string
): Promise<void> => {
  try {
    const employee = await EmployeeModel.selectEmployeeById(employee_id);

    if (!employee) {
      throw new Error('Employee not found');
    }

    const old_department_id = employee.department_id;

    await EmployeeModel.updateEmployeeDetails(employee_id, {
      department_id: new_department_id
    });

    const departmentHistoryItem: DepartmentHistoryEntry = {
      id: randomUUID(),
      employee_id,
      old_department_id,
      new_department_id,
      timestamp: new Date()
    };

    await DepartmentHistoryModel.insertDepartmentHistoryEntry(
      departmentHistoryItem
    );
  } catch (error) {
    console.error(`Error updating employee department: ${error}`);
    throw error;
  }
};
